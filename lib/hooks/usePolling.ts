import { useEffect, useRef, useState } from "react";

interface UsePollingOptions {
    callback: () => Promise<void>;
    intervalMs: number | (() => number);
    enabled?: boolean;
}

export type PollingStatus =
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
    const [, forceRender] = useState(0);

    const notify = () => {
        forceRender(x => x + 1);
    };


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
                notify();

                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                return;
            }

            try {
                isRunningRef.current = true;

                statusRef.current = "running";
                notify();

                await callback();

                failureCountRef.current = 0;
                lastSuccessAtRef.current = Date.now();
                statusRef.current = "idle";
                notify();
            } catch {
                failureCountRef.current += 1;
                statusRef.current = "error";
                notify();
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
                notify();
                return;
            }
            /*
            stopped remains terminal, and visibility changes can't override a hard stop.
            terminal: polling does not resume automatically, visibility change does not restart it.
            only a remount, 'enable' toggle, or manual reset restarts it.
            */
            if(statusRef.current !== "stopped") {
                failureCountRef.current = 0;
                statusRef.current = "idle";
                notify();
                run();
            }

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