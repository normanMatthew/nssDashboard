import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/utils";
import CiWebhookLog from "@/lib/models/CiWebhookLog";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    console.log("Received CI Webhook:", body);

    // Normalize minimal fields (safe even if GitHub changes structure)
    const status =
      body?.status ||
      body?.conclusion ||
      body?.workflow_run?.conclusion ||
      "unknown";
    const repo = 
      body?.repository?.full_name ||
      body?.repository ||
      "unknown-repo";
    const branch =
      body?.branch ||
      body?.workflow_run?.head_branch ||
      "unknown-branch";
    const commit = 
      body?.commit ||
      body?.head_sha ||
      body?.workflow_run?.head_sha ||
      "unknown-commit";

    await CiWebhookLog.create({
      eventType: "ci_status",
      status,
      repo,
      branch,
      commit,
      raw: body,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Storage Error:", error);
    return NextResponse.json({ error: "Failed to store webhook" }, { status: 400 });
  }
}
