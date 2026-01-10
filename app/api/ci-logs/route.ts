import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/utils";
import CiWebhookLog, { ICiWebHookLog } from "../../../lib/models/CiWebhookLog";
import { validateCiLogsQuery } from "@/lib/api/ciLogs.validation";


/*
* GET /api/ci-logs
* Fetch Logs with Pagination, filtering, sorting
*/
export async function GET(req: Request) {
    // connect to mongodb database
    await connectToDatabase();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");

    const status = url.searchParams.get("status") || "";
    const repo = url.searchParams.get("repo") || "";
    const branch = url.searchParams.get("branch") || "";

    //Validator
    const searchParams = new URL(req.url).searchParams;
    const validation = validateCiLogsQuery(searchParams);

    if (validation.ok === false) {
        const { error } = validation;
        return NextResponse.json(error, {status: 400});
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
        .skip(( page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean();

    return NextResponse.json({ logs, totalPages });
}

/*
 *POST /api/ci-logs
 * insert a new CI webhook log 
 */

 export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const body = await req.json();

        //runtime validation
        const required = ["eventType", "status", "repo", "branch", "commit"];
        for ( const key of required ) {
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
        return NextResponse.json({ success: true, log}, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid JSON payload", detail: String(error) },
            { status: 400 }
        );
    }
 }