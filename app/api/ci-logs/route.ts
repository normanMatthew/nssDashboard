import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/utils";
import CiWebhookLog, { ICiWebHookLog } from "../../../lib/models/CiWebhookLog";
import { validateCiLogsQuery } from "@/lib/api/ciLogs.validation";
import { requestRateLimiter } from "@/lib/api/infrastructure/requestRateLimiter";


/*
* GET /api/ci-logs
* Fetch Logs with Pagination, filtering, sorting
* Preferred order: connect to database -> rate limiter -> validation -> query.
*/
export async function GET(req: Request) {
    // connect to mongodb database
    await connectToDatabase();

    // Rate Limiting
    const rate = await requestRateLimiter(req, {
        limit: 30,
        windowMs: 60_000
    });

    if (rate.allowed === false) {
        return NextResponse.json(
            { error: "RATE_LIMITED", retryAfter: rate.retryAfter },
            { status: 429 }
        );
    }

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");

    const status = url.searchParams.get("status") || "";
    const repo = url.searchParams.get("repo") || "";
    const branch = url.searchParams.get("branch") || "";

    //Validator
    const searchParams = url.searchParams;
    const validation = validateCiLogsQuery(searchParams);

    if (validation.ok === false) {
        const { error } = validation;
        return NextResponse.json(error, { status: 400 });
    }

    //build dynamic query object
    const query: Partial<Record<keyof ICiWebHookLog, unknown>> = {};

    if (status) query.status = status;
    if (repo) query.repo = { $regex: repo, $options: "i" };
    if (branch) query.branch = { $regex: branch, $options: "i" };

    const PAGE_SIZE = 10;

    const total = await CiWebhookLog.countDocuments(query);
    const totalPages = Math.ceil(total / PAGE_SIZE);

    const sortField = url.searchParams.get("sortField") || "timestamp";
    const sortOrder = url.searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const logs = await CiWebhookLog.find(query)
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean();

    const response = NextResponse.json({ logs, totalPages });

    response.headers.set("X-RateLimit-Limit", "30");
    response.headers.set("X-RateLimit-Remaining", String(rate.remaining));
    response.headers.set("X-RateLimit-Reset", String(rate.resetAt));

    return response;
}

/*
 *POST /api/ci-logs
 * insert a new CI webhook log 
 */

export async function POST(req: Request) {
    //Connect to database.
    await connectToDatabase();

    // Rate Limiting
    const rate = await requestRateLimiter(req, {
        limit: 10,
        windowMs: 30_000
    });

    if (rate.allowed === false) {
        return NextResponse.json(
            { error: "RATE_LIMITED", retryAfter: rate.retryAfter },
            { status: 429 }
        );
    }

    try {
        const body = await req.json();

        //runtime validation
        const required = ["eventType", "status", "repo", "branch", "commit"];
        for (const key of required) {
            if (!body[key]) {
                return NextResponse.json(
                    { error: `Missing required field: ${key}` },
                    { status: 400 }
                );
            }
        }

        const log = await CiWebhookLog.create({
            eventType: body.eventType,
            status: body.status,
            repo: body.repo,
            branch: body.branch,
            commit: body.commit,
            raw: body.raw || {},
            timestamp: new Date()
        });
        const response = NextResponse.json({ success: true, log }, { status: 201 });

        response.headers.set("X-RateLimit-Limit", "10");
        response.headers.set("X-RateLimit-Remaining", String(rate.remaining));
        response.headers.set("X-RateLimit-Reset", String(rate.resetAt));
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid JSON payload", detail: String(error) },
            { status: 400 }
        );
    }
}