import { NextRequest, NextResponse } from "next/server";
import { sendAllesisEmail, type AllesisEmailPayload } from "@/lib/allesis-email";
import { PRIVACY_CONSENT_ERROR, parseNieuwsbrief, parsePrivacyAccepted } from "@/lib/form-consent";
import { getClientIp, validateTurnstile } from "@/lib/validate-turnstile";

export const dynamic = "force-dynamic";

const VERIFY_FAIL = "Verificatie mislukt. Probeer het opnieuw.";

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return bad("Ongeldig verzoek.");
  }

  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  delete body.turnstileToken;

  if (!turnstileToken.trim()) {
    return bad(VERIFY_FAIL);
  }

  const ip = getClientIp(request);
  if (!(await validateTurnstile(turnstileToken, ip))) {
    return bad(VERIFY_FAIL);
  }

  if (!body || typeof body !== "object" || typeof body.type !== "string") {
    return bad("Type ontbreekt.");
  }

  const privacyOk = parsePrivacyAccepted(body.privacyAccepted);
  const nieuwsbrief = parseNieuwsbrief(body.nieuwsbrief);
  delete body.privacyAccepted;
  delete body.nieuwsbrief;

  if (!privacyOk) {
    return bad(PRIVACY_CONSENT_ERROR);
  }

  const type = body.type;

  let payload: AllesisEmailPayload;

  switch (type) {
    case "contact": {
      const b = body as {
        naam?: string;
        email?: string;
        onderwerp?: string;
        bericht?: string;
        type?: string;
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
        nieuwsbrief,
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
        type?: string;
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
        nieuwsbrief,
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
        type?: string;
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
        nieuwsbrief,
      };
      break;
    }
    default:
      return bad("Onbekend type.");
  }

  if (payload.type === "contact") {
    console.log("[api] body:", {
      type: payload.type,
      naam: payload.naam,
      email: payload.email,
      onderwerp: payload.onderwerp,
      berichtLen: payload.bericht.length,
      nieuwsbrief: payload.nieuwsbrief,
    });
  } else if (payload.type === "offerte") {
    console.log("[api] body:", {
      type: payload.type,
      naam: payload.naam,
      email: payload.email,
      telefoon: payload.telefoon,
      gewensteDienst: payload.gewensteDienst,
    });
  } else {
    console.log("[api] body:", {
      type: payload.type,
      naam: payload.naam,
      email: payload.email,
      pakket: payload.pakket,
    });
  }

  try {
    const result = await sendAllesisEmail(payload);
    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/send-email] onverwachte fout bij verzenden", err);
    return NextResponse.json(
      { error: "Verzenden mislukt. Probeer het later opnieuw." },
      { status: 500 },
    );
  }
}
