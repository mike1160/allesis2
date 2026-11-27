import { NextRequest, NextResponse } from "next/server";
import { sendAllesisEmail, type AllesisEmailPayload } from "@/lib/allesis-email";
import { PRIVACY_CONSENT_ERROR, parseNieuwsbrief, parsePrivacyAccepted } from "@/lib/form-consent";
import { getClientIp, validateTurnstile } from "@/lib/validate-turnstile";
import { vindHostingPakket } from "@/lib/hosting-pakketten";
import { euro, ingGeconfigureerd, maakHostingBetaling } from "@/lib/ing-checkout";
import { SITE_URL } from "@/lib/seo-config";

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
  let redirectUrl: string | undefined;
  let betalingMislukt = false;

  switch (type) {
    case "contact": {
      const b = body as {
        naam?: string;
        email?: string;
        onderwerp?: string;
        bericht?: string;
        lang?: string;
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
        lang: typeof b.lang === "string" ? b.lang.trim() : "nl",
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
    case "opzegging": {
      const b = body as Record<string, unknown>;
      const str = (k: string, max = 300) => (typeof b[k] === "string" ? (b[k] as string).trim().slice(0, max) : "");
      const naam = str("naam");
      const email = str("email");
      const dienst = str("dienst");
      const domein = str("domein");
      const ingangsdatum = str("ingangsdatum");
      const domeinWens = str("domeinWens");
      if (!naam || !email || !dienst || !domein || !ingangsdatum || !domeinWens) {
        return bad("Vul naam, e-mailadres, dienst, domein, einddatum en de domeinkeuze in.");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return bad("Vul een geldig e-mailadres in.");
      }
      payload = {
        type: "opzegging",
        naam,
        email,
        bedrijf: str("bedrijf") || undefined,
        dienst,
        domein,
        ingangsdatum,
        domeinWens,
        reden: str("reden", 2000) || undefined,
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
        betalen?: boolean;
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
      // Direct betalen via ING Checkout (eerste jaar vooruit) als ING is ingesteld.
      const pakket = vindHostingPakket(b.pakket);
      if (pakket && ingGeconfigureerd() && b.betalen !== false) {
        const referentie = `HOST-${pakket.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
        try {
          const betaling = await maakHostingBetaling({
            pakket,
            naam: payload.naam,
            email: payload.email,
            referentie,
            siteUrl: SITE_URL,
          });
          payload.betaling = { referentie, bedrag: euro(betaling.bedrag) };
          redirectUrl = betaling.redirectUrl;
        } catch (err) {
          // Bestelling gaat gewoon door als aanvraag; wij sturen dan een betaalverzoek.
          console.error("[api/send-email] ING-betaling starten mislukt", err);
          betalingMislukt = true;
          payload.bericht = `${payload.bericht ? `${payload.bericht}\n\n` : ""}⚠️ Online betalen via ING mislukt: stuur de klant een betaalverzoek.`;
        }
      }
      break;
    }
    case "gratis_website": {
      const b = body as {
        naam?: string;
        email?: string;
        bedrijf?: string;
        branche?: string;
        domein?: string;
        beschrijving?: string;
        type?: string;
      };
      if (!b.naam?.trim() || !b.email?.trim() || !b.bedrijf?.trim() || !b.branche?.trim() || !b.beschrijving?.trim()) {
        return bad("Vul naam, e-mail, bedrijf, branche en omschrijving in.");
      }
      payload = {
        type: "gratis_website",
        naam: b.naam.trim(),
        email: b.email.trim(),
        bedrijf: b.bedrijf.trim(),
        branche: b.branche.trim(),
        domein: b.domein?.trim(),
        beschrijving: b.beschrijving.trim(),
        nieuwsbrief,
      };
      break;
    }
    case "migratie_aanvraag": {
      const b = body as {
        naam?: string;
        email?: string;
        bedrijf?: string;
        platform?: string;
        platformLabel?: string;
        huidigeUrl?: string;
        extraAntwoorden?: Record<string, string>;
        bericht?: string;
        type?: string;
      };
      if (!b.naam?.trim() || !b.email?.trim() || !b.platform?.trim() || !b.huidigeUrl?.trim()) {
        return bad("Vul naam, e-mail, platform en huidige website URL in.");
      }
      payload = {
        type: "migratie_aanvraag",
        naam: b.naam.trim(),
        email: b.email.trim(),
        bedrijf: b.bedrijf?.trim(),
        platform: b.platform.trim(),
        platformLabel: b.platformLabel?.trim() || b.platform.trim(),
        huidigeUrl: b.huidigeUrl.trim(),
        extraAntwoorden: b.extraAntwoorden ?? {},
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
  } else if (payload.type === "gratis_website") {
    console.log("[api] body:", {
      type: payload.type,
      naam: payload.naam,
      email: payload.email,
      bedrijf: payload.bedrijf,
      branche: payload.branche,
    });
  } else if (payload.type === "migratie_aanvraag") {
    console.log("[api] body:", {
      type: payload.type,
      naam: payload.naam,
      email: payload.email,
      platform: payload.platform,
      huidigeUrl: payload.huidigeUrl,
    });
  } else {
    console.log("[api] body:", {
      type: payload.type,
      naam: payload.naam,
      email: payload.email,
      pakket: payload.type === "hosting_order" ? payload.pakket : payload.dienst,
    });
  }

  try {
    const result = await sendAllesisEmail(payload);
    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, ...(redirectUrl ? { redirectUrl } : {}), ...(betalingMislukt ? { betalingMislukt } : {}) });
  } catch (err) {
    console.error("[api/send-email] onverwachte fout bij verzenden", err);
    return NextResponse.json(
      { error: "Verzenden mislukt. Probeer het later opnieuw." },
      { status: 500 },
    );
  }
}
