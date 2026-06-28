import { NextRequest, NextResponse } from "next/server";
import type { Payment } from "@mollie/api-client";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { getMollieClient } from "@/lib/mollie-client";

function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  return apiKey ? new Anthropic({ apiKey }) : null;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

// Mollie stuurt id als form-urlencoded body
export async function POST(req: NextRequest) {
  let paymentId: string;
  try {
    const text = await req.text();
    const params = new URLSearchParams(text);
    paymentId = params.get("id") ?? "";
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  if (!paymentId) {
    return new NextResponse("ok", { status: 200 }); // Mollie verwacht altijd 200
  }

  // Haal betaling op bij Mollie
  const mollie = getMollieClient();
  if (!mollie) {
    console.error("[webhook] MOLLIE_API_KEY ontbreekt");
    return new NextResponse("ok", { status: 200 });
  }

  let payment: Payment;
  try {
    payment = await mollie.payments.get(paymentId);
  } catch (err) {
    console.error("[webhook] Mollie get payment fout:", err);
    return new NextResponse("ok", { status: 200 });
  }

  // Alleen verwerken als écht betaald
  if (payment.status !== "paid") {
    return new NextResponse("ok", { status: 200 });
  }

  const meta = payment.metadata as {
    scanId?: string;
    domain?: string;
    platform?: string;
    email?: string;
  };

  const domain = meta.domain ?? "uw website";
  const platform = meta.platform ?? "Anders";
  const email = meta.email ?? "";
  const scanId = meta.scanId ?? "";

  if (!email) {
    console.error("[webhook] geen email in metadata, scanId:", scanId);
    return new NextResponse("ok", { status: 200 });
  }

  // Claude genereert privacyverklaring + cookiesnippet
  let privacyText = "";
  let snippetText = "";

  const anthropic = getAnthropicClient();
  const resend = getResendClient();

  try {
    if (!anthropic) throw new Error("ANTHROPIC_API_KEY ontbreekt");

    const [privacyRes, snippetRes] = await Promise.all([
      anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: `Schrijf een volledige Nederlandse privacyverklaring voor de website ${domain}. 
De verklaring moet voldoen aan de AVG/GDPR. 
Platform: ${platform}.
Gebruik een professionele maar toegankelijke toon.
Structuur: 1. Wie zijn wij, 2. Welke gegevens verzamelen wij, 3. Waarvoor gebruiken wij uw gegevens, 4. Cookies, 5. Uw rechten, 6. Contact.
Gebruik [BEDRIJFSNAAM] als placeholder voor de bedrijfsnaam.
Geef alleen de verklaring terug, geen uitleg eromheen.`,
          },
        ],
      }),
      anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: `Geef een kant-en-klare installatie-instructie voor een AVG-conforme cookiebanner op een ${platform} website (domein: ${domain}).
Gebruik CookieYes (gratis tier, werkt op alle platforms).
Geef:
1. Stap-voor-stap installatie-instructie specifiek voor ${platform} (max 5 stappen)
2. De exacte script-tag die in de <head> moet (placeholder API-key: CY-XXXXXXXX)
3. Hoe te controleren of het werkt
Schrijf in begrijpelijk Nederlands voor een niet-technische gebruiker.
Geef alleen de instructie terug, geen uitleg eromheen.`,
          },
        ],
      }),
    ]);

    privacyText =
      privacyRes.content[0].type === "text" ? privacyRes.content[0].text : "";
    snippetText =
      snippetRes.content[0].type === "text" ? snippetRes.content[0].text : "";
  } catch (err) {
    console.error("[webhook] Claude API fout:", err);
    // Ga toch door met mail sturen, ook al is generatie mislukt
    privacyText = "Er is een fout opgetreden bij het genereren. Neem contact op via support@allesis.nl";
    snippetText = privacyText;
  }

  // Stuur mail via Resend
  const htmlBody = `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a2e">
  <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="Allesis" style="height:36px;margin-bottom:24px">
  <h1 style="font-size:22px;font-weight:700;margin-bottom:8px">Uw AVG-documenten zijn klaar</h1>
  <p style="color:#555;margin-bottom:24px">Hieronder vindt u uw privacyverklaring en de cookiebanner-instructies voor <strong>${domain}</strong>.</p>

  <div style="background:#f4f4f8;border-radius:8px;padding:20px;margin-bottom:24px">
    <h2 style="font-size:16px;font-weight:700;margin-bottom:12px">1. Privacyverklaring</h2>
    <p style="font-size:13px;color:#333;white-space:pre-wrap">${privacyText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
  </div>

  <div style="background:#f4f4f8;border-radius:8px;padding:20px;margin-bottom:24px">
    <h2 style="font-size:16px;font-weight:700;margin-bottom:12px">2. Cookiebanner installeren (${platform})</h2>
    <p style="font-size:13px;color:#333;white-space:pre-wrap">${snippetText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
  </div>

  <div style="background:#fff3cd;border-radius:8px;padding:16px;margin-bottom:24px;border:1px solid #ffc107">
    <p style="margin:0;font-size:13px"><strong>Wij kunnen het ook voor u installeren</strong> — neem contact op via <a href="mailto:support@allesis.nl">support@allesis.nl</a> voor een offerte.</p>
  </div>

  <p style="font-size:12px;color:#999;margin-top:32px">Allesis · support@allesis.nl · <a href="https://allesis.nl">allesis.nl</a><br>
  Heeft u vragen? Wij helpen u graag verder.</p>
</body>
</html>`;

  try {
    if (!resend) throw new Error("RESEND_API_KEY ontbreekt");

    await resend.emails.send({
      from: "Allesis AVG <noreply@allesis.nl>",
      to: email,
      subject: `Uw AVG-documenten voor ${domain}`,
      html: htmlBody,
    });
  } catch (err) {
    console.error("[webhook] Resend fout:", err);
    // Niet fataal — Mollie moet altijd 200 krijgen
  }

  return new NextResponse("ok", { status: 200 });
}
