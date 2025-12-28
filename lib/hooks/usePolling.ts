import { useEffect, useRef } from "react";

interface UsePollingOptions {
    callback: () => Promise<void>;
    intervalMs: number | (() => number);
    enabled?: boolean;
}

type PollingStatus =
    | "idle"
    | "running"
    | "paused"
    | "error"
    | "stopped";

export function usePolling({
    callback,
    intervalMs,
    enabled = true,
}: UsePollingOptions) {
    const isRunningRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const failureCountRef = useRef(0);
    const lastSuccessAtRef = useRef<number | null>(null);
    const statusRef = useRef<PollingStatus>("idle");


    useEffect(() => {
        if (!enabled) return;
        const resolveInterval = () =>
            typeof intervalMs === "function" ? intervalMs() : intervalMs;

        let cancelled = false;

        const MAX_FAILURES = 10;

        const run = async () => {
            if (cancelled || isRunningRef.current) return;

            if (failureCountRef.current >= MAX_FAILURES) {
                statusRef.current = "stopped";

                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                return;
            }

            try {
                isRunningRef.current = true;

                statusRef.current = "running";

                await callback();

                failureCountRef.current = 0;
                lastSuccessAtRef.current = Date.now();
                statusRef.current = "idle";
            } catch {
                failureCountRef.current += 1;
                statusRef.current = "error";
            } finally {
                isRunningRef.current = false;

                if (!cancelled && !document.hidden) {
                    timeoutRef.current = setTimeout(run, resolveInterval());
                }
            }
        };

        const handleVisibility = () => {
            if (document.hidden) {
                statusRef.current = "paused";
                return;
            }

            failureCountRef.current = 0;
            statusRef.current = "idle";
            run();
        };

        document.addEventListener("visibilitychange", handleVisibility);
        run(); //initial start

        return () => {
            cancelled = true;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [callback, intervalMs, enabled]);

    return {
        get status() {
            return statusRef.current;
        },
        get failureCount() {
            return failureCountRef.current;
        },
        get lastSuccessAt() {
            return lastSuccessAtRef.current;
        },
    };
}