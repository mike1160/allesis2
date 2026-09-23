import { NextRequest, NextResponse } from "next/server";
import { sendAllesisEmail } from "@/lib/allesis-email";
import { leverAvgDocumenten } from "@/lib/avg-levering";
import { getOrder, type MspOrder } from "@/lib/msp";
import { formatEuro, getProduct, type Product } from "@/lib/producten";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

/** MultiSafepay verwacht altijd een 200, anders blijft het opnieuw proberen. */
const OK = () => new NextResponse("OK", { status: 200, headers: { "Content-Type": "text/plain" } });

/**
 * Levert het gekochte product af. Gooit een fout als er geen leverlogica is,
 * zodat de claim wordt vrijgegeven en de betaling nooit stil blijft liggen.
 */
async function lever(product: Product, order: MspOrder, orderId: string): Promise<void> {
  const email = (order.var2 || order.customer?.email || "").trim();
  const naam = order.customer?.first_name?.trim() || "";
  const extra = order.var3 || "";
  const bedrag = typeof order.amount === "number" ? formatEuro(order.amount / 100) : formatEuro(product.prijsInclBtw);

  if (!email) throw new Error(`geen e-mailadres bij order ${orderId}`);

  switch (product.levering) {
    case "avg-documenten": {
      // var3 bevat bij de AVG-fix "domein|platform"
      const [domain = "", platform = ""] = extra.split("|");
      const geleverd = await leverAvgDocumenten({
        domain: domain || "uw website",
        platform: platform || "Anders",
        email,
      });
      if (!geleverd) throw new Error(`AVG-documenten niet verstuurd voor ${orderId}`);

      // Allesis wil ook van deze verkoop een melding zien
      const melding = await sendAllesisEmail({
        type: "web_order",
        product: product.naam,
        naam,
        email,
        extra,
        bedrag,
        orderId,
      });
      if (!melding.ok) console.error("[msp-webhook] melding AVG-verkoop mislukt:", orderId, melding.message);
      return;
    }

    case "handmatig": {
      // Bevestiging naar de klant én melding naar ADMIN_EMAIL in één call
      const resultaat = await sendAllesisEmail({
        type: "web_order",
        product: product.naam,
        naam,
        email,
        extra,
        bedrag,
        orderId,
      });
      if (!resultaat.ok) throw new Error(`mail mislukt voor ${orderId}: ${resultaat.message}`);
      return;
    }

    default: {
      const onbekend: never = product.levering;
      throw new Error(`geen leverlogica voor ${String(onbekend)} (order ${orderId})`);
    }
  }
}

async function verwerk(req: NextRequest): Promise<NextResponse> {
  let orderId = req.nextUrl.searchParams.get("transactionid")?.trim() || "";

  if (!orderId) {
    try {
      const body = (await req.json()) as { order_id?: unknown };
      if (typeof body?.order_id === "string") orderId = body.order_id.trim();
    } catch {
      // Lege of niet-JSON body: geen probleem, we hebben dan gewoon geen id
    }
  }

  if (!orderId) return OK();

  // De body is niet te vertrouwen — haal de order zelf op bij MultiSafepay
  let order: MspOrder;
  try {
    order = await getOrder(orderId);
  } catch (err) {
    console.error("[msp-webhook] order ophalen mislukt:", orderId, err);
    return OK();
  }

  if (order.status !== "completed") return OK();

  const product = getProduct(order.var1);
  if (!product) {
    // Betaald voor iets dat wij niet kennen: nooit stil laten passeren
    console.error("[msp-webhook] betaling voor onbekend product:", order.var1, orderId);
    return OK();
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    console.error("[msp-webhook] Supabase niet geconfigureerd — levering overgeslagen voor", orderId);
    return OK();
  }

  // Claim de order. order_id is unique, dus een tweede notificatie botst hier
  // en wordt niet nog een keer geleverd.
  const { error: claimError } = await sb.from("web_orders").insert({
    order_id: orderId,
    slug: product.slug,
    email: order.var2 ?? order.customer?.email ?? null,
    extra: order.var3 || null,
    bedrag_centen: typeof order.amount === "number" ? order.amount : null,
    status: "verwerken",
  });

  if (claimError) {
    if (claimError.code === "23505") {
      console.info("[msp-webhook] order al verwerkt, overgeslagen:", orderId);
    } else {
      console.error("[msp-webhook] claim mislukt:", orderId, claimError);
    }
    return OK();
  }

  try {
    await lever(product, order, orderId);
    await sb.from("web_orders").update({ status: "geleverd" }).eq("order_id", orderId);
  } catch (err) {
    console.error("[msp-webhook] levering mislukt:", orderId, err);
    // Claim weer vrijgeven zodat een volgende notificatie het opnieuw probeert
    await sb.from("web_orders").delete().eq("order_id", orderId);
  }

  return OK();
}

export async function POST(req: NextRequest) {
  return verwerk(req);
}

// MultiSafepay stuurt bij sommige instellingen een GET met ?transactionid=
export async function GET(req: NextRequest) {
  return verwerk(req);
}
