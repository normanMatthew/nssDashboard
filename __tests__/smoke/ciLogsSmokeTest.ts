import fetch from "node-fetch";

async function run() {
    const url = "http://localhost:3000/api/ci-logs";

    try {
        const res = await fetch(url);

        if (res.status !== 200) {
            console.error(`Smoke Test Failed: Expected 200, got ${res.status}`);
            process.exit(1);
        }

        const raw = await res.json();
        if ( typeof raw !== "object" || raw === null || !("logs" in raw)) {
            throw new Error("Invalid response");
        }
        const json = raw as { logs: unknown[] };

        console.log("Smoke Test Passed");
        process.exit(0);
    } catch (error) {
        console.error("Smoke Test Error:", error);
        process.exit(1);
    }
}

run();
