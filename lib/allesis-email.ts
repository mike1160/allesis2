import { Resend } from "resend";

const FROM = "Allesis <noreply@allesis.nl>";

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

function wrapEmail(inner: string, title: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a3bcc; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">${escapeHtml(title)}</h1>
      </div>
      <div style="background: #f8f9fc; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e2e6f0;">
        ${inner}
        <hr style="border: none; border-top: 1px solid #e2e6f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">Beantwoord via Reply in uw e-mailclient waar van toepassing.</p>
      </div>
    </div>
  `;
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
    console.error("RESEND_API_KEY ontbreekt");
    return { ok: false, message: "E-mail is niet geconfigureerd op de server." };
  }

  const resend = new Resend(key);
  const to = process.env.BUSINESS_EMAIL || "info@allesis.nl";

  let subject: string;
  let html: string;
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
      break;
    }
    default:
      return { ok: false, message: "Onbekend berichttype." };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo,
    subject,
    html,
  });

  if (error) {
    console.error("Resend:", error);
    return { ok: false, message: "Verzenden mislukt. Probeer het later opnieuw." };
  }

  return { ok: true };
}
