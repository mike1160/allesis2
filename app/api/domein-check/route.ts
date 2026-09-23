import { NextRequest, NextResponse } from "next/server";
import { domeinBeschikbaar } from "@/lib/domein-check";

// WHOIS XML API - gratis tier, 500/mnd
// Fallback: RDAP (volledig gratis, officieel IANA protocol)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const ext = searchParams.get("ext");

  if (!name || !ext) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const available = await domeinBeschikbaar(name, ext);
  return NextResponse.json({ domain: `${name}${ext}`, available });
}
