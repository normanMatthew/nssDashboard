import { useEffect, useRef } from "react";

interface UsePollingOptions {
    callback: () => Promise<void>;
    intervalMs: number;
    enabled?: boolean;
}

export function usePolling({
    callback,
    intervalMs,
    enabled = true,
}: UsePollingOptions) {
    const isRunningRef = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const run = async () => {
            if (isRunningRef.current) return;

            try {
                isRunningRef.current = true;
                await callback();
            } finally {
                isRunningRef.current = false;
            }
        };

        const start = () => {
            if (intervalRef.current) return;
            intervalRef.current = setInterval(run, intervalMs);
            run(); //immediate first run
        };

        const stop = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        const handleVisibility = () => {
            document.hidden ? stop() : run();
        };

        document.addEventListener("visibilitychange", handleVisibility);
        start();

        return () => {
            stop();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [callback, intervalMs, enabled]);
}