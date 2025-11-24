import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/utils";
import CiWebhookLog, { ICiWebHookLog } from "../../../lib/models/CiWebhookLog";

export async function GET(req: Request) {
    // connect to mongodb database
    await connectToDatabase();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");

    const status = url.searchParams.get("status") || "";
    const repo = url.searchParams.get("repo") || "";
    const branch = url.searchParams.get("branch") || "";

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
        .skip(( page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean();

    return NextResponse.json({ logs, totalPages });
}