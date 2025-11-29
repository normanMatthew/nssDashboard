import fetch from "node-fetch";

async function seed() {
    const url = "http://localhost:3000/api/ci-logs";

    for ( let i = 1; i <= 50; i++ ) {
        const payload = {
            eventType: "push",
            status: i % 2 === 0 ? "success" : "failure",
            repo: `user/repo-${Math.ceil(i / 5)}`,
            branch: i % 3 === 0 ? "main": "dev",
            commit: `commit-${i}`,
            raw: { index: i }
        };

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(payload)
        });

        console.log(`Inserted Log ${i} - status: ${res.status}`)
    }
    console.log("Seeding complete");
}
seed();