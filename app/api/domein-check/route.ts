import { NextRequest, NextResponse } from "next/server";

// WHOIS XML API - gratis tier, 500/mnd
// Fallback: RDAP (volledig gratis, officieel IANA protocol)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const ext = searchParams.get("ext");

  if (!name || !ext) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const domain = `${name}${ext}`;
  const apiKey = process.env.WHOISXML_API_KEY;

  try {
    // Methode 1: WHOIS XML API (als key beschikbaar)
    if (apiKey) {
      const res = await fetch(
        `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${apiKey}&domainName=${domain}&credits=DA`,
        { next: { revalidate: 300 } }
      );
      const data = await res.json();
      const available = data.DomainInfo?.domainAvailability === "AVAILABLE";
      return NextResponse.json({ domain, available });
    }

    // Methode 2: RDAP (gratis, officieel protocol van IANA)
    // Werkt voor .com .net .org .info .biz en meer
    const rdapRes = await fetch(
      `https://rdap.org/domain/${domain}`,
      { next: { revalidate: 300 } }
    );

    if (rdapRes.status === 404) {
      // 404 = domein bestaat NIET in registry = beschikbaar
      return NextResponse.json({ domain, available: true });
    } else if (rdapRes.status === 200) {
      // 200 = domein bestaat = bezet
      return NextResponse.json({ domain, available: false });
    } else {
      return NextResponse.json({ domain, available: null });
    }
  } catch {
    // Laatste fallback bij netwerk error
    return NextResponse.json({ domain, available: null, error: "Check failed" });
  }
}
