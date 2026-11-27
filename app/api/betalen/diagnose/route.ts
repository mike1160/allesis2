import { NextResponse } from "next/server";
import { HOSTING_PAKKETTEN } from "@/lib/hosting-pakketten";
import { API_HOSTS, authOpties, hostingOrderBody, verstuurOrder } from "@/lib/ing-checkout";
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
  const perServer = [];
  for (const host of API_HOSTS) {
    const r = await verstuurOrder(body, host).catch((e: unknown) => ({
      ok: false as const,
      pogingen: [{ soort: "fout", status: 0, antwoord: String(e) }],
    }));
    perServer.push({ server: host, resultaat: r.ok ? "OK" : "MISLUKT", pogingen: r.pogingen });
  }
  // Status van de betaalmethodes (boarding) van deze verkooplocatie.
  const betaalmethodes = [];
  for (const optie of authOpties()) {
    try {
      const res = await fetch(`https://gms.pay.nl/v2/services/${sl}/paymentmethods`, {
        headers: { Authorization: optie.header, Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      const tekst = await res.text();
      let samenvatting: unknown = tekst.slice(0, 800);
      try {
        const j = JSON.parse(tekst) as {
          paymentMethods?: { id: number; name: string; active: boolean; boarding?: { status?: string } | null }[];
        };
        if (j.paymentMethods) {
          samenvatting = j.paymentMethods.map((m) => `${m.name} (${m.id}): ${m.active ? "actief" : "NIET actief"}, boarding ${m.boarding?.status ?? "—"}`);
        }
      } catch {}
      betaalmethodes.push({ soort: optie.soort, status: res.status, resultaat: samenvatting });
    } catch (e) {
      betaalmethodes.push({ soort: optie.soort, status: 0, resultaat: String(e) });
    }
  }

  return NextResponse.json({
    env: { ...env, ING_API_HOST: process.env.ING_API_HOST?.trim() || "(standaard connect.pay.nl)" },
    verzonden: { ...body, serviceId: "SL-…" },
    perServer,
    betaalmethodes,
  });
}
