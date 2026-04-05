import { NextRequest, NextResponse } from "next/server";
import { sendAllesisEmail, type AllesisEmailPayload } from "@/lib/allesis-email";

export const dynamic = "force-dynamic";

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("Ongeldig verzoek.");
  }

  if (!body || typeof body !== "object" || !("type" in body)) {
    return bad("Type ontbreekt.");
  }

  const type = (body as { type: string }).type;

  let payload: AllesisEmailPayload;

  switch (type) {
    case "contact": {
      const b = body as {
        naam?: string;
        email?: string;
        onderwerp?: string;
        bericht?: string;
      };
      if (!b.naam?.trim() || !b.email?.trim() || !b.bericht?.trim()) {
        return bad("Vul naam, e-mailadres en bericht in.");
      }
      payload = {
        type: "contact",
        naam: b.naam.trim(),
        email: b.email.trim(),
        onderwerp: b.onderwerp?.trim(),
        bericht: b.bericht.trim(),
      };
      break;
    }
    case "offerte": {
      const b = body as {
        naam?: string;
        email?: string;
        telefoon?: string;
        bedrijf?: string;
        gewensteDienst?: string;
        hostingPakket?: string;
        bericht?: string;
      };
      if (!b.naam?.trim() || !b.email?.trim() || !b.telefoon?.trim()) {
        return bad("Vul naam, e-mailadres en telefoonnummer in.");
      }
      payload = {
        type: "offerte",
        naam: b.naam.trim(),
        email: b.email.trim(),
        telefoon: b.telefoon.trim(),
        bedrijf: b.bedrijf?.trim(),
        gewensteDienst: b.gewensteDienst?.trim(),
        hostingPakket: b.hostingPakket?.trim(),
        bericht: b.bericht?.trim(),
      };
      break;
    }
    case "avg_popup": {
      const b = body as {
        naam?: string;
        email?: string;
        telefoon?: string;
        domain?: string;
        score?: number;
        scanId?: string;
      };
      if (!b.naam?.trim() || !b.email?.trim() || b.domain === undefined || b.score === undefined) {
        return bad("Vul de verplichte velden in.");
      }
      payload = {
        type: "avg_popup",
        naam: b.naam.trim(),
        email: b.email.trim(),
        telefoon: b.telefoon?.trim(),
        domain: String(b.domain).trim(),
        score: Number(b.score),
        scanId: b.scanId?.trim(),
      };
      break;
    }
    case "hosting_order": {
      const b = body as {
        pakket?: string;
        naam?: string;
        email?: string;
        telefoon?: string;
        bericht?: string;
      };
      if (!b.pakket?.trim() || !b.naam?.trim() || !b.email?.trim() || !b.telefoon?.trim()) {
        return bad("Vul pakket, naam, e-mailadres en telefoonnummer in.");
      }
      payload = {
        type: "hosting_order",
        pakket: b.pakket.trim(),
        naam: b.naam.trim(),
        email: b.email.trim(),
        telefoon: b.telefoon.trim(),
        bericht: b.bericht?.trim(),
      };
      break;
    }
    default:
      return bad("Onbekend type.");
  }

  const result = await sendAllesisEmail(payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
