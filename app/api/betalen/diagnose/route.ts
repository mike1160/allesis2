import { NextResponse } from "next/server";
import { HOSTING_PAKKETTEN } from "@/lib/hosting-pakketten";
import { hostingOrderBody, verstuurOrder } from "@/lib/ing-checkout";
import { SITE_URL } from "@/lib/seo-config";

/**
 * TIJDELIJK: test de ING-koppeling. Werkt alleen als ING_TEST=true (testmodus, geen echt geld).
 * Geeft geen sleutels terug, alleen welke variabelen bestaan en het antwoord van ING.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.ING_TEST?.trim().toLowerCase() !== "true") {
    return NextResponse.json({ error: "Alleen beschikbaar in testmodus" }, { status: 404 });
  }
  const sl = process.env.ING_SL_CODE?.trim() || "";
  const secret = process.env.ING_SECRET?.trim() || "";
  const env = {
    ING_SL_CODE: sl
      ? /^SL-\d{4}-\d{4}$/.test(sl)
        ? "ok (SL-####-####)"
        : `aanwezig, formaat wijkt af (${sl.length} tekens, begint met "${sl.slice(0, 3)}")`
      : "ontbreekt",
    ING_SECRET: secret ? `aanwezig (${secret.length} tekens)` : "ontbreekt",
    ING_AT_CODE: process.env.ING_AT_CODE?.trim() ? "aanwezig" : "ontbreekt",
    ING_TOKEN: process.env.ING_TOKEN?.trim() ? "aanwezig" : "ontbreekt",
  };
  if (!sl || !secret) return NextResponse.json({ env });

  const body = hostingOrderBody({
    pakket: HOSTING_PAKKETTEN[0],
    naam: "Diagnose Test",
    email: "info@allesis.nl",
    referentie: `DIAG-${Date.now().toString(36).toUpperCase()}`,
    siteUrl: SITE_URL,
  });
  const r = await verstuurOrder(body);
  return NextResponse.json({
    env,
    verzonden: { ...body, serviceId: "SL-…" },
    resultaat: r.ok ? "OK" : "MISLUKT",
    pogingen: r.pogingen,
  });
}
