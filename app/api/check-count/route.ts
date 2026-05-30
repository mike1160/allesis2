import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { KV_TOTAL_CHECKS_KEY } from "@/lib/website-monitor-types";

export async function GET() {
  try {
    const count = (await kv.get<number>(KV_TOTAL_CHECKS_KEY)) ?? 0;
    return NextResponse.json({ count, available: true });
  } catch (err) {
    console.error("[api/check-count] KV fout:", err);
    return NextResponse.json({ count: 0, available: false }, { status: 503 });
  }
}
