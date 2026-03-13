import RateLimit from "@/lib/models/RateLimit";

type RateLimitResult =
    | { allowed: true; remaining: number; resetAt: number }
    | { allowed: false; retryAfter: number }

interface RateLimitOptions {
    limit: number;
    windowMs: number;
}

const DEFAULT_OPTIONS: RateLimitOptions = {
    limit: 30,
    windowMs: 60_000
};

export async function requestRateLimiter(
    req: Request,
    options: Partial<RateLimitOptions> = {}
): Promise<RateLimitResult> {

    const { limit, windowMs } = { ...DEFAULT_OPTIONS, ...options };

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] ??
        "unknown";

    const key = `ip:${ip}`

    const now = Date.now();
    const windowStart = new Date(now - windowMs);

    // Insert request record
    await RateLimit.updateOne(
        { key },
        { $push: { createdAt: now } },
        { upsert: true }
    );

    // Count requests in window
    const count = await RateLimit.countDocuments({
        key,
        createdAt: { $gt: windowStart }
    });

    if (count > limit) {
        return {
            allowed: false,
            retryAfter: Math.ceil(windowMs / 1000)
        };
    }

    return {
        allowed: true,
        remaining: limit - count,
        resetAt: now + windowMs
    };
}