import { useEffect, useRef } from "react";

interface UsePollingOptions {
    callback: () => Promise<void>;
    intervalMs: number | (() => number);
    enabled?: boolean;
}

export function usePolling({
    callback,
    intervalMs,
    enabled = true,
}: UsePollingOptions) {
    const isRunningRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        if (!enabled) return;
        const resolveInterval = () =>
            typeof intervalMs === "function" ? intervalMs() : intervalMs;

        let cancelled = false;

        const run = async () => {
            if (cancelled || isRunningRef.current) return;

            try {
                isRunningRef.current = true;
                await callback();
            } finally {
                isRunningRef.current = false;

                if (!cancelled && !document.hidden) {
                    timeoutRef.current = setTimeout(run, resolveInterval());
                }
            }
        };

        const handleVisibility = () => {
            if (document.hidden) {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
            } else {
                run(); //resume immediately
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
}