import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";

const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY! });

const ALLOWED_PLATFORMS = ["WordPress", "Wix", "Squarespace", "Shopify", "Webflow", "Anders"] as const;

export async function POST(req: NextRequest) {
  let body: { scanId?: unknown; domain?: unknown; platform?: unknown; email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const scanId = typeof body.scanId === "string" ? body.scanId.trim() : "";
  const domain = typeof body.domain === "string" ? body.domain.trim() : "";
  const platform = typeof body.platform === "string" ? body.platform.trim() : "Anders";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!scanId || !domain) {
    return NextResponse.json({ error: "scanId en domain zijn verplicht." }, { status: 400 });
  }

  const resolvedPlatform = ALLOWED_PLATFORMS.includes(platform as typeof ALLOWED_PLATFORMS[number])
    ? platform
    : "Anders";

  if (!email) {
    return NextResponse.json({ error: "E-mailadres is verplicht." }, { status: 400 });
  }

  try {
    const payment = await mollie.payments.create({
      amount: { currency: "EUR", value: "79.00" },
      description: `AVG-fix voor ${domain}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/avg-check/bedankt?scanId=${scanId}&domain=${encodeURIComponent(domain)}`,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/webhook`,
      metadata: {
        scanId,
        domain,
        platform: resolvedPlatform,
        email,
      },
    });

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (err) {
    console.error("[api/payment/create]", err);
    return NextResponse.json({ error: "Betaling aanmaken mislukt." }, { status: 500 });
  }
}
