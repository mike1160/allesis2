import { NextRequest, NextResponse } from "next/server";
import { sendAllesisEmail } from "@/lib/allesis-email";
import { HOSTING_PAKKETTEN } from "@/lib/hosting-pakketten";
import { euro, haalOrderStatus, handtekeningGeldig, ingGeconfigureerd, isBetaald } from "@/lib/ing-checkout";

/**
 * Exchange-URL van ING Checkout: ING meldt hier statuswijzigingen.
 * We vertrouwen de body niet blind: de handtekening wordt gecontroleerd én de status wordt
 * altijd opnieuw bij ING opgehaald voordat er iets gebeurt.
 * Antwoord {"result": true} = verwerkt; anders probeert ING het later opnieuw.
 */
export const dynamic = "force-dynamic";

const ok = (description: string) => NextResponse.json({ result: true, description });
const opnieuw = (description: string, status = 200) => NextResponse.json({ result: false, description }, { status });

export async function POST(req: NextRequest) {
  if (!ingGeconfigureerd()) return opnieuw("ING niet geconfigureerd", 503);

  const raw = await req.text();
  const geldig = handtekeningGeldig(raw, req.headers);
  if (geldig === false) {
    console.warn("[ing-exchange] ongeldige handtekening");
    return opnieuw("Signature verification failed", 401);
  }

  // Nieuw formaat: JSON { object: { id } }. Oud formaat: form/query met order_id.
  let id = "";
  try {
    const j = JSON.parse(raw) as { id?: string; object?: { id?: string } };
    id = j.object?.id || j.id || "";
  } catch {
    const params = new URLSearchParams(raw);
    id = params.get("id") || params.get("order_id") || "";
  }
  id ||= req.nextUrl.searchParams.get("id") || req.nextUrl.searchParams.get("order_id") || "";
  if (!id) return ok("Geen order-id, genegeerd");

  const order = await haalOrderStatus(id);
  if (!order) return opnieuw("Status ophalen mislukt");

  if (!isBetaald(order.status)) {
    console.log("[ing-exchange] status", order.status?.action, order.reference);
    return ok(`Status ${order.status?.action ?? "onbekend"}, geen actie`);
  }

  const referentie = order.reference || "";
  const pakketId = referentie.split("-")[1]?.toLowerCase();
  const pakket = HOSTING_PAKKETTEN.find((p) => p.id === pakketId);
  const email = order.customer?.email?.trim() || "";
  const naam = [order.customer?.firstName, order.customer?.lastName].filter(Boolean).join(" ");

  const result = await sendAllesisEmail({
    type: "hosting_betaald",
    naam,
    email: email || process.env.BUSINESS_EMAIL || "info@allesis.nl",
    pakket: pakket?.naam ?? (order.description || "Hosting"),
    bedrag: order.amount?.value != null ? euro(order.amount.value) : "—",
    referentie: referentie || "—",
    orderId: order.orderId || order.id,
    test: order.integration?.test === true,
  });
  if (!result.ok) return opnieuw("Mail versturen mislukt, graag opnieuw");

  console.log("[ing-exchange] betaald", referentie);
  return ok("Betaald, verwerkt");
}

// Oude exchange-variant (GET) ook afhandelen.
export const GET = POST;
