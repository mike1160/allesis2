import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const ext = searchParams.get("ext");

  if (!name || !ext) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const zone = ext.replace(".", "");
  const domain = `${name}${ext}`;

  try {
    const res = await fetch(
      `https://api.domainsdb.info/v1/domains/search?domain=${name}&zone=${zone}&limit=5`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    const taken =
      data.domains &&
      data.domains.some((d: { domain: string }) => d.domain === domain);
    return NextResponse.json({ domain, available: !taken });
  } catch {
    return NextResponse.json({ domain, available: null, error: "API error" });
  }
}
