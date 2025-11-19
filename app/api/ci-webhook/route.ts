import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {
    const body = await req.json();

    console.log("Received CI Webhook:", body)

    // We can enhance this later:
    // - Save to DB
    // - Trigger Discord/Slack via your own formatting
    // - Add email notifications
    // - Add internal analytics
    // - Show these logs on your admin dashboard
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(" Webhook Error:", error);
    return NextResponse.json({ error: "Invalid JSON"}, {status: 400});
  }
}