import { createHmac, timingSafeEqual } from "node:crypto";
import type { HostingPakket } from "@/lib/hosting-pakketten";

/**
 * ING Checkout (technisch het Pay.-platform, connect.pay.nl).
 *
 * Env (Vercel):
 *  - ING_SL_CODE  → "Code" van de verkooplocatie in ING Checkout (SL-xxxx-xxxx)
 *  - ING_SECRET   → "Secret" van diezelfde verkooplocatie (ook voor de handtekening van meldingen)
 *  - ING_AT_CODE  → "Code" bij Token (AT-xxxx-xxxx), optioneel maar aanbevolen
 *  - ING_TOKEN    → de token zelf
 *  - ING_TEST     → "true" = testbetalingen (geen echt geld), weghalen voor live
 *
 * Docs: https://developer.pay.nl/reference/api_create_order-1 · /docs/signing-1 · /docs/use-our-sandbox-mode
 */
const API = "https://connect.pay.nl/v1/orders";
export const BTW = 0.21;

export function ingGeconfigureerd() {
  return Boolean(process.env.ING_SL_CODE?.trim() && process.env.ING_SECRET?.trim());
}

function testModus() {
  return process.env.ING_TEST?.trim().toLowerCase() === "true";
}

type AuthSoort = "token" | "verkooplocatie";

function basic(user: string, pass: string) {
  return `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
}

/** Beschikbare inlogcombinaties, in volgorde van voorkeur (AT-code + token, dan SL-code + secret). */
export function authOpties(): { soort: AuthSoort; header: string }[] {
  const opties: { soort: AuthSoort; header: string }[] = [];
  const at = process.env.ING_AT_CODE?.trim();
  const token = process.env.ING_TOKEN?.trim();
  if (at && token) opties.push({ soort: "token", header: basic(at, token) });
  const sl = process.env.ING_SL_CODE?.trim();
  const secret = process.env.ING_SECRET?.trim();
  if (sl && secret) opties.push({ soort: "verkooplocatie", header: basic(sl, secret) });
  return opties;
}

/** Eerste jaar vooruit, incl. btw, in centen. */
export function jaarBedragCenten(p: HostingPakket) {
  return Math.round(p.prijs * 12 * (1 + BTW) * 100);
}

export function euro(centen: number) {
  return `€ ${(centen / 100).toFixed(2).replace(".", ",")}`;
}

export type IngStatus = { code: number; action: string; name?: string };
export type IngOrder = {
  id: string;
  orderId?: string;
  reference?: string | null;
  description?: string | null;
  status: IngStatus;
  amount?: { value: number; currency?: string };
  integration?: { test?: boolean };
  customer?: { email?: string | null; firstName?: string | null; lastName?: string | null } | null;
  links?: { redirect?: string; status?: string };
};

export function isBetaald(s?: IngStatus) {
  return s?.action === "PAID" || s?.code === 100;
}

export function hostingOrderBody(opts: {
  pakket: HostingPakket;
  naam: string;
  email: string;
  referentie: string;
  siteUrl: string;
}) {
  const [voornaam, ...rest] = opts.naam.trim().split(/\s+/);
  return {
    serviceId: process.env.ING_SL_CODE!.trim(),
    description: `Allesis hosting ${opts.pakket.naam}`.slice(0, 32),
    reference: opts.referentie,
    amount: { value: jaarBedragCenten(opts.pakket), currency: "EUR" },
    returnUrl: `${opts.siteUrl}/hosting/betaald?ref=${encodeURIComponent(opts.referentie)}`,
    exchangeUrl: `${opts.siteUrl}/api/betalen/exchange`,
    customer: {
      email: opts.email,
      ...(voornaam ? { firstName: voornaam } : {}),
      ...(rest.length ? { lastName: rest.join(" ") } : {}),
    },
    ...(testModus() ? { integration: { test: true } } : {}),
  };
}

/** Stuurt de order naar ING; probeert bij 401/403 de andere inlogcombinatie. */
export async function verstuurOrder(body: object) {
  const pogingen: { soort: AuthSoort; status: number; antwoord: string }[] = [];
  for (const optie of authOpties()) {
    const res = await fetch(API, {
      method: "POST",
      headers: { Authorization: optie.header, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });
    const tekst = await res.text();
    pogingen.push({ soort: optie.soort, status: res.status, antwoord: tekst.slice(0, 1500) });
    let data: IngOrder | null = null;
    try {
      data = JSON.parse(tekst) as IngOrder;
    } catch {}
    if (res.ok && data?.links?.redirect) {
      werkendeAuth = optie.header;
      return { ok: true as const, data, pogingen };
    }
    if (res.status !== 401 && res.status !== 403) break;
  }
  return { ok: false as const, pogingen };
}

let werkendeAuth: string | null = null;

export async function maakHostingBetaling(opts: Parameters<typeof hostingOrderBody>[0]) {
  const body = hostingOrderBody(opts);
  const r = await verstuurOrder(body);
  if (!r.ok) {
    console.error("[ing] order aanmaken mislukt", JSON.stringify(r.pogingen));
    throw new Error("ING-betaling kon niet worden gestart");
  }
  return { id: r.data.id, redirectUrl: r.data.links!.redirect!, bedrag: body.amount.value };
}

export async function haalOrderStatus(id: string): Promise<IngOrder | null> {
  if (!/^[A-Za-z0-9-]{6,64}$/.test(id)) return null;
  const res = await fetch(`${API}/${id}/status`, {
    headers: { Authorization: werkendeAuth ?? authOpties()[0]?.header ?? "", Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    console.error("[ing] status ophalen mislukt", res.status);
    return null;
  }
  return (await res.json()) as IngOrder;
}

/** Controleert de HMAC-handtekening van een exchange-call (SIGNED JSON POST). */
export function handtekeningGeldig(rawBody: string, headers: Headers): boolean | null {
  const sig = headers.get("signature");
  if (!sig) return null; // niet ondertekend (oud formaat): status wordt sowieso via de API gecontroleerd
  const keyId = headers.get("signature-keyid")?.trim() || "";
  // Alleen ondertekend met onze verkooplocatie (SL-code) kunnen we hier controleren.
  if (keyId && keyId !== process.env.ING_SL_CODE?.trim()) return null;
  const alg = (headers.get("signature-algorithm") || "sha256").toLowerCase();
  if (!["sha256", "sha512"].includes(alg)) return false;
  const verwacht = createHmac(alg, process.env.ING_SECRET!.trim()).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(verwacht);
  const b = Buffer.from(sig.trim().toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
}
