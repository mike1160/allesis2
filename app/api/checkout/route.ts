import { NextRequest, NextResponse } from "next/server";
import { domeinBeschikbaar, schoonDomeinNaam } from "@/lib/domein-check";
import { createOrder } from "@/lib/msp";
import { centen, domeinExtensieVan, getProduct } from "@/lib/producten";
import { SITE_URL } from "@/lib/seo-config";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(req: NextRequest) {
  let body: { slug?: unknown; email?: unknown; naam?: unknown; extra?: unknown; akkoord?: unknown };
  try {
    body = await req.json();
  } catch {
    return bad("Ongeldig verzoek.");
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const naam = typeof body.naam === "string" ? body.naam.trim() : "";
  let extra = typeof body.extra === "string" ? body.extra.trim().slice(0, 200) : "";

  if (!EMAIL_RE.test(email)) return bad("Vul een geldig e-mailadres in.");

  // Prijs komt uitsluitend uit lib/producten.ts, nooit uit de browser
  const product = getProduct(body.slug);
  if (!product) return bad("Onbekend product.");

  // Directe digitale levering: zonder expliciet akkoord geen bestelling
  if (product.directeLevering && body.akkoord !== true) {
    return bad("U moet akkoord gaan met de voorwaarden en met directe levering.");
  }

  // Domeinen: server-side opnieuw controleren of de naam écht vrij is
  const extensie = domeinExtensieVan(product.slug);
  if (extensie) {
    const naamDeel = schoonDomeinNaam(extra);
    if (naamDeel.length < 2) return bad("Vul de gewenste domeinnaam in.");

    const vrij = await domeinBeschikbaar(naamDeel, extensie);
    if (vrij === false) return bad(`${naamDeel}${extensie} is inmiddels bezet. Kies een andere naam.`);
    if (vrij !== true) return bad("We konden de beschikbaarheid nu niet controleren. Probeer het zo nog eens.");

    extra = `${naamDeel}${extensie}`;
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_URL).replace(/\/$/, "");

  try {
    const data = await createOrder({
      type: "redirect",
      order_id: `WEB-${product.slug}-${Date.now()}`,
      currency: "EUR",
      amount: centen(product),
      description: `${product.naam} — Allesis`,
      var1: product.slug,
      var2: email,
      var3: extra,
      payment_options: {
        notification_url: `${siteUrl}/api/msp-webhook`,
        notification_method: "POST",
        redirect_url: `${siteUrl}/betaling/bedankt`,
        cancel_url: `${siteUrl}/betaling/geannuleerd`,
        close_window: true,
      },
      customer: {
        email,
        ...(naam ? { first_name: naam.slice(0, 100) } : {}),
        locale: "nl_NL",
      },
    });

    if (!data.payment_url) throw new Error("Geen payment_url ontvangen");

    return NextResponse.json({ url: data.payment_url });
  } catch (err) {
    console.error("[api/checkout]", err);
    return bad("Betaling aanmaken mislukt. Probeer het opnieuw.", 500);
  }
}
