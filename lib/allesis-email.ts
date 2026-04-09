import { Resend } from "resend";
import { SITE_URL } from "@/lib/seo-config";

/**
 * Moet een adres op een in Resend geverifieerd domein zijn.
 * Standaard: Allesis <info@allesis.nl> (geen noreply — spamfilters / Resend-advies).
 * Overschrijf met RESEND_FROM, bijv. Allesis <info@allesis.nl>
 */
function getFromAddress(): string {
  const raw = process.env.RESEND_FROM?.trim();
  if (raw) return raw;
  return "Allesis <info@allesis.nl>";
}

type ResendErrorShape = { message: string; name?: string; statusCode?: number | null };

function logResendFailure(context: string, error: unknown): void {
  if (error && typeof error === "object" && "message" in error) {
    const e = error as ResendErrorShape;
    console.error(`[allesis-email] ${context}`, {
      message: e.message,
      code: e.name,
      statusCode: e.statusCode,
    });
    return;
  }
  console.error(`[allesis-email] ${context}`, error);
}

const BRAND = {
  primary: "#1a3bcc",
  text: "#0f172a",
  muted: "#64748b",
  subtle: "#94a3b8",
  surface: "#f8f9fc",
  border: "#e2e6f0",
  white: "#ffffff",
} as const;

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tableHtml(rows: { label: string; value: string }[]): string {
  const body = rows
    .filter((r) => r.value !== undefined && r.value !== null && String(r.value).trim() !== "")
    .map(
      (r) =>
        `<tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 140px; vertical-align: top;">${escapeHtml(r.label)}</td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(String(r.value))}</td></tr>`,
    )
    .join("");
  return `<table style="width: 100%; border-collapse: collapse;">${body}</table>`;
}

const PLAIN_LABEL_COL = 22;

/** Eén veldregel: "Label:" links uitgelijnd, waarde erachter (eigen regel per veld). */
function plainRow(label: string, value: string): string {
  const base = label.replace(/:\s*$/, "").trim();
  const left = `${base}:`;
  return `${left.padEnd(PLAIN_LABEL_COL)}${String(value)}`;
}

function plainDivider(): string {
  return "----------------------------------------";
}

function wrapEmail(inner: string, title: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a3bcc; padding: 24px; border-radius: 8px 8px 0 0; color: #ffffff;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">${escapeHtml(title)}</h1>
      </div>
      <div style="background: #f8f9fc; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e2e6f0;">
        ${inner}
        <hr style="border: none; border-top: 1px solid #e2e6f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">Beantwoord via Reply in uw e-mailclient waar van toepassing.</p>
      </div>
    </div>
  `;
}

function contactCustomerConfirmationText(payload: {
  naam: string;
  email: string;
  onderwerp?: string;
  bericht: string;
  nieuwsbrief?: boolean;
}): string {
  const onderwerpDisplay = payload.onderwerp?.trim() || "Algemeen contact";
  const nl = payload.nieuwsbrief ? "Ja, ik wil op de hoogte blijven" : "Nee";
  return [
    `Beste ${payload.naam},`,
    "",
    "Bedankt voor uw bericht. We hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact met u op (meestal binnen één werkdag).",
    "",
    "Samenvatting",
    "",
    plainRow("Naam", payload.naam),
    plainRow("E-mail", payload.email),
    plainRow("Onderwerp", onderwerpDisplay),
    plainRow("Nieuwsbrief", nl),
    "",
    "Bericht:",
    "",
    payload.bericht,
    "",
    plainDivider(),
    "",
    "— Allesis · info@allesis.nl · Haarlem",
  ].join("\n");
}

function businessContactNotificationText(payload: {
  naam: string;
  email: string;
  onderwerp?: string;
  bericht: string;
  nieuwsbrief?: boolean;
}): string {
  return [
    "Nieuw bericht via allesis.nl",
    "",
    plainRow("Naam", payload.naam),
    plainRow("E-mail", payload.email),
    plainRow("Onderwerp", payload.onderwerp?.trim() || "—"),
    plainRow("Privacyverklaring", "Akkoord (formulier)"),
    plainRow("Nieuwsbrief", payload.nieuwsbrief ? "Ja" : "Nee"),
    "",
    "Bericht:",
    "",
    payload.bericht,
    "",
    plainDivider(),
  ].join("\n");
}

function businessOfferteNotificationText(payload: {
  naam: string;
  email: string;
  telefoon: string;
  bedrijf?: string;
  gewensteDienst?: string;
  hostingPakket?: string;
  bericht?: string;
  nieuwsbrief?: boolean;
}): string {
  const toelichting = payload.bericht?.trim() || "—";
  return [
    "Nieuwe offerteaanvraag",
    "",
    plainRow("Naam", payload.naam),
    plainRow("E-mail", payload.email),
    plainRow("Telefoon", payload.telefoon),
    plainRow("Bedrijf", payload.bedrijf?.trim() || "—"),
    plainRow("Gewenste dienst", payload.gewensteDienst?.trim() || "—"),
    plainRow("Hostingpakket", payload.hostingPakket?.trim() || "—"),
    plainRow("Privacyverklaring", "Akkoord (formulier)"),
    plainRow("Nieuwsbrief", payload.nieuwsbrief ? "Ja" : "Nee"),
    "",
    "Toelichting:",
    "",
    toelichting,
    "",
    plainDivider(),
  ].join("\n");
}

function businessHostingOrderNotificationText(payload: {
  pakket: string;
  naam: string;
  email: string;
  telefoon: string;
  bericht?: string;
  nieuwsbrief?: boolean;
}): string {
  const opmerking = payload.bericht?.trim() || "—";
  return [
    "Hostingbestelling via allesis.nl",
    "",
    plainRow("Pakket", payload.pakket),
    plainRow("Naam", payload.naam),
    plainRow("E-mail", payload.email),
    plainRow("Telefoon", payload.telefoon),
    plainRow("Privacyverklaring", "Akkoord (formulier)"),
    plainRow("Nieuwsbrief", payload.nieuwsbrief ? "Ja" : "Nee"),
    "",
    "Opmerking:",
    "",
    opmerking,
    "",
    plainDivider(),
  ].join("\n");
}

function businessAvgPopupNotificationText(payload: {
  naam: string;
  email: string;
  telefoon?: string;
  domain: string;
  score: number;
  scanId?: string;
  nieuwsbrief?: boolean;
}): string {
  return [
    "AVG-check: contactaanvraag (popup)",
    "",
    plainRow("Domein", payload.domain),
    plainRow("Score", String(payload.score)),
    plainRow("Scan-ID", payload.scanId?.trim() || "—"),
    plainRow("Naam", payload.naam),
    plainRow("E-mail", payload.email),
    plainRow("Telefoon", payload.telefoon?.trim() || "—"),
    plainRow("Privacyverklaring", "Akkoord (formulier)"),
    plainRow("Nieuwsbrief", payload.nieuwsbrief ? "Ja" : "Nee"),
    "",
    plainDivider(),
  ].join("\n");
}

function contactCustomerConfirmationHtml(payload: {
  naam: string;
  email: string;
  onderwerp?: string;
  bericht: string;
  nieuwsbrief?: boolean;
}): string {
  const onderwerpDisplay = payload.onderwerp?.trim() || "Algemeen contact";
  const summaryRows = tableHtml([
    { label: "Naam", value: payload.naam },
    { label: "E-mail", value: payload.email },
    { label: "Onderwerp", value: onderwerpDisplay },
    { label: "Nieuwsbrief", value: payload.nieuwsbrief ? "Ja, ik wil op de hoogte blijven" : "Nee" },
  ]);
  const logoUrl = `${SITE_URL}/logo.png`;

  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${BRAND.surface};">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(180deg, #f0f4ff 0%, ${BRAND.surface} 280px);padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:${BRAND.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(26,59,204,0.08);border:1px solid ${BRAND.border};">
          <tr>
            <td style="background:${BRAND.primary};padding:28px 32px;text-align:center;color:${BRAND.white};">
              <img src="${logoUrl}" alt="Allesis — webdesign Haarlem" width="160" style="display:block;margin:0 auto;max-width:160px;height:auto;border:0;" />
              <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-size:11px;color:${BRAND.white};margin-top:14px;letter-spacing:0.1em;text-transform:uppercase;">
                <a href="${SITE_URL}" style="color:${BRAND.white};text-decoration:none;">allesis.nl</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 28px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
              <p style="margin:0 0 8px;font-size:15px;color:${BRAND.muted};">Beste ${escapeHtml(payload.naam)},</p>
              <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${BRAND.text};line-height:1.35;letter-spacing:-0.02em;">Bedankt voor uw bericht</h1>
              <p style="margin:0 0 24px;font-size:15px;color:${BRAND.muted};line-height:1.7;">
                We hebben uw aanvraag veilig ontvangen. Ons team bekijkt uw bericht en neemt zo snel mogelijk contact met u op — meestal binnen <strong style="color:${BRAND.text};">één werkdag</strong>.
              </p>
              <div style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:10px;padding:20px 22px;margin-bottom:24px;">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:${BRAND.primary};text-transform:uppercase;letter-spacing:0.06em;">Samenvatting van uw bericht</p>
                ${summaryRows}
                <hr style="border:none;border-top:1px solid ${BRAND.border};margin:20px 0;" />
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:${BRAND.subtle};text-transform:uppercase;letter-spacing:0.05em;">Uw bericht</p>
                <p style="margin:0;font-size:14px;color:${BRAND.text};line-height:1.65;white-space:pre-wrap;">${escapeHtml(payload.bericht)}</p>
              </div>
              <p style="margin:0;font-size:14px;color:${BRAND.muted};line-height:1.65;">
                Heeft u nog vragen? Beantwoord gerust op deze e-mail of neem direct contact op via onderstaande gegevens.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;background:${BRAND.surface};border-top:1px solid ${BRAND.border};font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:${BRAND.text};">Allesis</p>
              <p style="margin:0 0 6px;font-size:14px;color:${BRAND.muted};line-height:1.6;">
                <a href="mailto:info@allesis.nl" style="color:${BRAND.primary};text-decoration:none;font-weight:600;">info@allesis.nl</a>
                &nbsp;·&nbsp; Haarlem, Nederland
              </p>
              <p style="margin:12px 0 0;font-size:14px;">
                <a href="${SITE_URL}" style="color:${BRAND.primary};text-decoration:none;font-weight:600;">allesis.nl</a>
              </p>
              <p style="margin:20px 0 0;font-size:11px;color:${BRAND.subtle};line-height:1.5;">
                U ontvangt deze e-mail omdat u het contactformulier op onze website heeft ingevuld. Dit is een automatische bevestiging; antwoorden op deze e-mail komen bij ons terecht indien uw mailclient dat ondersteunt.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export type AllesisEmailPayload =
  | { type: "contact"; naam: string; email: string; onderwerp?: string; bericht: string; nieuwsbrief?: boolean }
  | {
      type: "offerte";
      naam: string;
      email: string;
      telefoon: string;
      bedrijf?: string;
      gewensteDienst?: string;
      hostingPakket?: string;
      bericht?: string;
      nieuwsbrief?: boolean;
    }
  | {
      type: "avg_popup";
      naam: string;
      email: string;
      telefoon?: string;
      domain: string;
      score: number;
      scanId?: string;
      nieuwsbrief?: boolean;
    }
  | { type: "hosting_order"; pakket: string; naam: string; email: string; telefoon: string; bericht?: string; nieuwsbrief?: boolean };

export async function sendAllesisEmail(
  payload: AllesisEmailPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    console.error(
      "[allesis-email] RESEND_API_KEY ontbreekt of is leeg — zet RESEND_API_KEY in .env.local (lokaal) en in de hosting-omgeving (bijv. Vercel).",
    );
    return { ok: false, message: "E-mail is niet geconfigureerd op de server." };
  }

  const resend = new Resend(key);
  const from = getFromAddress();
  const to = process.env.BUSINESS_EMAIL || "info@allesis.nl";

  let subject: string;
  let html: string;
  let text: string;
  let replyTo: string | undefined;

  switch (payload.type) {
    case "contact": {
      replyTo = payload.email;
      subject = `Contact: ${payload.onderwerp?.trim() || "Bericht via allesis.nl"}`;
      const inner = `${tableHtml([
        { label: "Naam", value: payload.naam },
        { label: "E-mail", value: payload.email },
        { label: "Onderwerp", value: payload.onderwerp || "—" },
        { label: "Privacyverklaring", value: "Akkoord (formulier)" },
        { label: "Nieuwsbrief", value: payload.nieuwsbrief ? "Ja" : "Nee" },
      ])}<hr style="border: none; border-top: 1px solid #e2e6f0; margin: 20px 0;" /><h3 style="color: #0f172a; margin: 0 0 12px;">Bericht</h3><p style="color: #374151; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(payload.bericht)}</p>`;
      html = wrapEmail(inner, "Nieuw bericht via allesis.nl");
      text = businessContactNotificationText(payload);
      break;
    }
    case "offerte": {
      replyTo = payload.email;
      subject = `Offerteaanvraag — ${payload.gewensteDienst?.trim() || "Algemeen"}`;
      const inner = tableHtml([
        { label: "Naam", value: payload.naam },
        { label: "E-mail", value: payload.email },
        { label: "Telefoon", value: payload.telefoon },
        { label: "Bedrijf", value: payload.bedrijf || "—" },
        { label: "Gewenste dienst", value: payload.gewensteDienst || "—" },
        { label: "Hostingpakket", value: payload.hostingPakket || "—" },
        { label: "Toelichting", value: payload.bericht || "—" },
        { label: "Privacyverklaring", value: "Akkoord (formulier)" },
        { label: "Nieuwsbrief", value: payload.nieuwsbrief ? "Ja" : "Nee" },
      ]);
      html = wrapEmail(inner, "Nieuwe offerteaanvraag");
      text = businessOfferteNotificationText(payload);
      break;
    }
    case "avg_popup": {
      replyTo = payload.email;
      subject = `AVG-hulp aanvraag — ${payload.domain} (${payload.score}/100)`;
      const inner = tableHtml([
        { label: "Domein", value: payload.domain },
        { label: "Score", value: String(payload.score) },
        { label: "Scan-ID", value: payload.scanId || "—" },
        { label: "Naam", value: payload.naam },
        { label: "E-mail", value: payload.email },
        { label: "Telefoon", value: payload.telefoon || "—" },
        { label: "Privacyverklaring", value: "Akkoord (formulier)" },
        { label: "Nieuwsbrief", value: payload.nieuwsbrief ? "Ja" : "Nee" },
      ]);
      html = wrapEmail(inner, "AVG-check: contactaanvraag (popup)");
      text = businessAvgPopupNotificationText(payload);
      break;
    }
    case "hosting_order": {
      replyTo = payload.email;
      subject = `Hostingbestelling — ${payload.pakket}`;
      const inner = tableHtml([
        { label: "Pakket", value: payload.pakket },
        { label: "Naam", value: payload.naam },
        { label: "E-mail", value: payload.email },
        { label: "Telefoon", value: payload.telefoon },
        { label: "Opmerking", value: payload.bericht || "—" },
        { label: "Privacyverklaring", value: "Akkoord (formulier)" },
        { label: "Nieuwsbrief", value: payload.nieuwsbrief ? "Ja" : "Nee" },
      ]);
      html = wrapEmail(inner, "Hostingbestelling via allesis.nl");
      text = businessHostingOrderNotificationText(payload);
      break;
    }
    default:
      return { ok: false, message: "Onbekend berichttype." };
  }

  const businessSend = await resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    html,
    text,
  });

  console.log("[debug] businessSend result:", JSON.stringify(businessSend));

  /**
   * Guard die voorheen de klantmail blokkeerde: bij `payload.type === "contact"` werd de tweede
   * send() alleen bereikt als we hier níét returnden. De check was:
   *   if (businessSend.error) { return { ok: false }; }
   * Als de SDK `error` anders invult dan verwacht (terwijl `data.id` wél bestaat), werd nooit
   * een tweede API-call gedaan. Succes wordt nu afgeleid van `businessSend.data?.id`.
   *
   * TEMP: klantbevestiging altijd proberen vóór die return, zodat Resend altijd 2× wordt
   * aangeroepen voor contact. Later: alleen klantmail na geslaagde bedrijfsmail indien gewenst.
   */
  if (payload.type === "contact") {
    const customerEmail = payload.email.trim();
    console.log("[debug] sending to customer:", customerEmail);

    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      console.error("[allesis-email] klantbevestiging overgeslagen: ongeldig e-mailadres", { customerEmail });
    } else {
      const confirmHtml = contactCustomerConfirmationHtml(payload);
      const confirmText = contactCustomerConfirmationText(payload);
      const businessReply = process.env.BUSINESS_EMAIL || "info@allesis.nl";

      try {
        const customerSend = await resend.emails.send({
          from,
          to: [customerEmail],
          replyTo: businessReply,
          subject: "Bevestiging: we hebben uw bericht ontvangen — Allesis",
          html: confirmHtml,
          text: confirmText,
        });
        console.log("[debug] customerSend:", JSON.stringify(customerSend));

        if (!customerSend.data?.id) {
          if (customerSend.error) {
            console.error("[allesis-email] customer mail error:", customerSend.error);
            logResendFailure("Resend API (bevestiging naar klant)", customerSend.error);
          } else {
            console.error("[allesis-email] klantbevestiging zonder data.id", customerSend);
          }
        } else {
          console.info("[allesis-email] klantbevestiging verzonden", {
            resendId: customerSend.data.id,
            to: customerEmail,
            from,
          });
        }
      } catch (error) {
        console.error("[allesis-email] customer mail error:", error);
        logResendFailure("Resend API (bevestiging naar klant) uitzondering", error);
      }
    }
  }

  if (!businessSend.data?.id) {
    if (businessSend.error) {
      logResendFailure("Resend API (notificatie naar bedrijf)", businessSend.error);
    } else {
      console.error("[allesis-email] bedrijfsmail zonder data.id", businessSend);
    }
    return { ok: false, message: "Verzenden mislukt. Probeer het later opnieuw." };
  }

  console.info("[allesis-email] notificatie verzonden", {
    resendId: businessSend.data?.id ?? null,
    to,
    from,
  });

  return { ok: true };
}
