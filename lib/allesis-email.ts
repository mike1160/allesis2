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
  primary: "#3B6D11",
  markBlue: "#1e40af",
  text: "#0f172a",
  muted: "#64748b",
  subtle: "#94a3b8",
  surface: "#f8f9fc",
  border: "#e2e6f0",
  white: "#ffffff",
} as const;

export type MailLang = "nl" | "en" | "th" | "ru" | "de";

function resolveMailLang(raw?: string | null): MailLang {
  const l = (raw || "").trim().toLowerCase();
  if (l === "th" || l === "en" || l === "nl" || l === "ru" || l === "de") return l;
  return "nl";
}

/** Grote witte A op blauwe achtergrond — werkt in mailclients zonder externe afbeelding */
function emailBrandMarkHtml(): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr>
        <td width="72" height="72" align="center" valign="middle" style="width:72px;height:72px;background:${BRAND.markBlue};border:3px solid ${BRAND.white};border-radius:18px;font-family:Arial,Helvetica,sans-serif;font-size:40px;font-weight:800;color:${BRAND.white};letter-spacing:-0.02em;line-height:72px;">
          A
        </td>
      </tr>
    </table>`;
}

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
      <div style="background: #3B6D11; padding: 24px; border-radius: 8px 8px 0 0; color: #ffffff;">
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

type ContactCustomerPayload = {
  naam: string;
  email: string;
  onderwerp?: string;
  bericht: string;
  nieuwsbrief?: boolean;
  lang?: string;
};

const CONTACT_CONFIRM = {
  subject: {
    nl: "Bevestiging: we hebben uw bericht ontvangen — Allesis",
    en: "Confirmation: we received your message — Allesis",
    th: "ยืนยัน: เราได้รับข้อความของคุณแล้ว — Allesis",
    ru: "Подтверждение: мы получили ваше сообщение — Allesis",
    de: "Bestätigung: wir haben Ihre Nachricht erhalten — Allesis",
  },
  greeting: {
    nl: (n: string) => `Beste ${n},`,
    en: (n: string) => `Dear ${n},`,
    th: (n: string) => `สวัสดีคุณ ${n},`,
    ru: (n: string) => `Здравствуйте, ${n}!`,
    de: (n: string) => `Hallo ${n},`,
  },
  title: {
    nl: "Bedankt voor uw bericht",
    en: "Thank you for your message",
    th: "ขอบคุณสำหรับข้อความของคุณ",
    ru: "Спасибо за ваше сообщение",
    de: "Danke für Ihre Nachricht",
  },
  intro: {
    nl: "We hebben uw aanvraag veilig ontvangen. Ons team bekijkt uw bericht en neemt zo snel mogelijk contact met u op — meestal binnen één werkdag.",
    en: "We have safely received your request. Our team will review your message and get back to you as soon as possible — usually within one business day.",
    th: "เราได้รับข้อความของคุณเรียบร้อยแล้ว ทีมงานจะตรวจสอบและติดต่อกลับโดยเร็ว — โดยปกติภายใน 1 วันทำการ",
    ru: "Мы получили ваше сообщение. Наша команда ответит вам как можно скорее — обычно в течение одного рабочего дня.",
    de: "Wir haben Ihre Anfrage sicher erhalten. Unser Team prüft Ihre Nachricht und meldet sich so schnell wie möglich — meist innerhalb eines Werktages.",
  },
  summary: {
    nl: "Samenvatting van uw bericht",
    en: "Summary of your message",
    th: "สรุปข้อความของคุณ",
    ru: "Краткое содержание",
    de: "Zusammenfassung Ihrer Nachricht",
  },
  your_message: {
    nl: "Uw bericht",
    en: "Your message",
    th: "ข้อความของคุณ",
    ru: "Ваше сообщение",
    de: "Ihre Nachricht",
  },
  questions: {
    nl: "Heeft u nog vragen? Beantwoord gerust op deze e-mail of neem direct contact op via onderstaande gegevens.",
    en: "Any questions? Just reply to this email or contact us using the details below.",
    th: "มีคำถามเพิ่มเติม? ตอบกลับอีเมลนี้ได้เลย หรือติดต่อเราตามข้อมูลด้านล่าง",
    ru: "Есть вопросы? Просто ответьте на это письмо или свяжитесь с нами по контактам ниже.",
    de: "Noch Fragen? Antworten Sie einfach auf diese E-Mail oder kontaktieren Sie uns über die Angaben unten.",
  },
  footer: {
    nl: "U ontvangt deze e-mail omdat u het contactformulier op onze website heeft ingevuld. Dit is een automatische bevestiging; antwoorden op deze e-mail komen bij ons terecht indien uw mailclient dat ondersteunt.",
    en: "You received this email because you submitted the contact form on our website. This is an automatic confirmation; replies to this email reach us if your mail client supports it.",
    th: "คุณได้รับอีเมลนี้เนื่องจากกรอกแบบฟอร์มติดต่อบนเว็บไซต์ของเรา นี่คือการยืนยันอัตโนมัติ — การตอบกลับอีเมลนี้จะส่งถึงเราหากเมลของคุณรองรับ",
    ru: "Вы получили это письмо, потому что заполнили контактную форму на нашем сайте. Это автоматическое подтверждение; ответы на это письмо приходят к нам, если ваш почтовый клиент это поддерживает.",
    de: "Sie erhalten diese E-Mail, weil Sie das Kontaktformular auf unserer Website ausgefüllt haben. Dies ist eine automatische Bestätigung; Antworten auf diese E-Mail erreichen uns, sofern Ihr Mailclient das unterstützt.",
  },
  labels: {
    nl: { name: "Naam", email: "E-mail", subject: "Onderwerp", newsletter: "Nieuwsbrief", yes: "Ja, ik wil op de hoogte blijven", no: "Nee", general: "Algemeen contact", location: "Haarlem, Nederland" },
    en: { name: "Name", email: "Email", subject: "Subject", newsletter: "Newsletter", yes: "Yes, keep me updated", no: "No", general: "General enquiry", location: "Haarlem, Netherlands" },
    th: { name: "ชื่อ", email: "อีเมล", subject: "หัวข้อ", newsletter: "จดหมายข่าว", yes: "ใช่ ต้องการรับข่าวสาร", no: "ไม่", general: "ติดต่อทั่วไป", location: "ฮาร์เลม เนเธอร์แลนด์" },
    ru: { name: "Имя", email: "Эл. почта", subject: "Тема", newsletter: "Рассылка", yes: "Да, хочу получать новости", no: "Нет", general: "Общий запрос", location: "Харлем, Нидерланды" },
    de: { name: "Name", email: "E-Mail", subject: "Betreff", newsletter: "Newsletter", yes: "Ja, ich möchte Updates", no: "Nein", general: "Allgemeine Anfrage", location: "Haarlem, Niederlande" },
  },
} as const;

function contactCustomerConfirmationText(payload: ContactCustomerPayload): string {
  const lang = resolveMailLang(payload.lang);
  const L = CONTACT_CONFIRM.labels[lang];
  const onderwerpDisplay = payload.onderwerp?.trim() || L.general;
  const nl = payload.nieuwsbrief ? L.yes : L.no;
  return [
    CONTACT_CONFIRM.greeting[lang](payload.naam),
    "",
    CONTACT_CONFIRM.intro[lang],
    "",
    CONTACT_CONFIRM.summary[lang],
    "",
    plainRow(L.name, payload.naam),
    plainRow(L.email, payload.email),
    plainRow(L.subject, onderwerpDisplay),
    plainRow(L.newsletter, nl),
    "",
    `${CONTACT_CONFIRM.your_message[lang]}:`,
    "",
    payload.bericht,
    "",
    plainDivider(),
    "",
    `— Allesis · info@allesis.nl · ${L.location}`,
  ].join("\n");
}

function contactCustomerConfirmationHtml(payload: ContactCustomerPayload): string {
  const lang = resolveMailLang(payload.lang);
  const L = CONTACT_CONFIRM.labels[lang];
  const onderwerpDisplay = payload.onderwerp?.trim() || L.general;
  const summaryRows = tableHtml([
    { label: L.name, value: payload.naam },
    { label: L.email, value: payload.email },
    { label: L.subject, value: onderwerpDisplay },
    { label: L.newsletter, value: payload.nieuwsbrief ? L.yes : L.no },
  ]);

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${BRAND.surface};">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(180deg, #eef2ff 0%, ${BRAND.surface} 280px);padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:${BRAND.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(30,64,175,0.10);border:1px solid ${BRAND.border};">
          <tr>
            <td style="background:${BRAND.markBlue};padding:28px 32px;text-align:center;color:${BRAND.white};">
              ${emailBrandMarkHtml()}
              <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-size:11px;color:${BRAND.white};margin-top:14px;letter-spacing:0.1em;text-transform:uppercase;">
                <a href="${SITE_URL}" style="color:${BRAND.white};text-decoration:none;">allesis.nl</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 28px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
              <p style="margin:0 0 8px;font-size:15px;color:${BRAND.muted};">${escapeHtml(CONTACT_CONFIRM.greeting[lang](payload.naam))}</p>
              <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${BRAND.text};line-height:1.35;letter-spacing:-0.02em;">${escapeHtml(CONTACT_CONFIRM.title[lang])}</h1>
              <p style="margin:0 0 24px;font-size:15px;color:${BRAND.muted};line-height:1.7;">
                ${escapeHtml(CONTACT_CONFIRM.intro[lang])}
              </p>
              <div style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:10px;padding:20px 22px;margin-bottom:24px;">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:${BRAND.markBlue};text-transform:uppercase;letter-spacing:0.06em;">${escapeHtml(CONTACT_CONFIRM.summary[lang])}</p>
                ${summaryRows}
                <hr style="border:none;border-top:1px solid ${BRAND.border};margin:20px 0;" />
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:${BRAND.subtle};text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(CONTACT_CONFIRM.your_message[lang])}</p>
                <p style="margin:0;font-size:14px;color:${BRAND.text};line-height:1.65;white-space:pre-wrap;">${escapeHtml(payload.bericht)}</p>
              </div>
              <p style="margin:0;font-size:14px;color:${BRAND.muted};line-height:1.65;">
                ${escapeHtml(CONTACT_CONFIRM.questions[lang])}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;background:${BRAND.surface};border-top:1px solid ${BRAND.border};font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:${BRAND.text};">Allesis</p>
              <p style="margin:0 0 6px;font-size:14px;color:${BRAND.muted};line-height:1.6;">
                <a href="mailto:info@allesis.nl" style="color:${BRAND.markBlue};text-decoration:none;font-weight:600;">info@allesis.nl</a>
                &nbsp;·&nbsp; ${escapeHtml(L.location)}
              </p>
              <p style="margin:12px 0 0;font-size:14px;">
                <a href="${SITE_URL}" style="color:${BRAND.markBlue};text-decoration:none;font-weight:600;">allesis.nl</a>
              </p>
              <p style="margin:20px 0 0;font-size:11px;color:${BRAND.subtle};line-height:1.5;">
                ${escapeHtml(CONTACT_CONFIRM.footer[lang])}
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

function businessMigratieNotificationText(payload: {
  naam: string;
  email: string;
  bedrijf?: string;
  platform: string;
  platformLabel: string;
  huidigeUrl: string;
  extraAntwoorden?: Record<string, string>;
  bericht?: string;
  nieuwsbrief?: boolean;
}): string {
  const extraLines = Object.entries(payload.extraAntwoorden ?? {})
    .filter(([, value]) => value.trim())
    .flatMap(([label, value]) => [plainRow(label, value)]);

  return [
    "Nieuwe migratie-aanvraag",
    "",
    plainRow("Platform", payload.platformLabel),
    plainRow("Naam", payload.naam),
    plainRow("E-mail", payload.email),
    plainRow("Bedrijf", payload.bedrijf?.trim() || "—"),
    plainRow("Huidige URL", payload.huidigeUrl),
    plainRow("Privacyverklaring", "Akkoord (formulier)"),
    plainRow("Nieuwsbrief", payload.nieuwsbrief ? "Ja" : "Nee"),
    ...extraLines,
    "",
    "Opmerking:",
    "",
    payload.bericht?.trim() || "—",
    "",
    plainDivider(),
  ].join("\n");
}

function migratieCustomerConfirmationText(payload: {
  naam: string;
  platformLabel: string;
  huidigeUrl: string;
}): string {
  return [
    `Beste ${payload.naam},`,
    "",
    "Bedankt! Wij hebben uw migratie-aanvraag ontvangen en nemen binnen één werkdag contact op met een vrijblijvende offerte.",
    "",
    plainRow("Platform", payload.platformLabel),
    plainRow("Huidige website", payload.huidigeUrl),
    plainRow("Migratie naar", "Next.js via Allesis"),
    "",
    "— Allesis · info@allesis.nl · Haarlem",
  ].join("\n");
}

function migratieCustomerConfirmationHtml(payload: {
  naam: string;
  platformLabel: string;
  huidigeUrl: string;
}): string {
  const inner = `
    <p style="margin:0 0 16px;color:#374151;line-height:1.7;">Beste ${escapeHtml(payload.naam)},</p>
    <p style="margin:0 0 16px;color:#374151;line-height:1.7;">
      Bedankt! Wij hebben uw migratie-aanvraag ontvangen en nemen binnen één werkdag contact op met een vrijblijvende offerte.
    </p>
    ${tableHtml([
      { label: "Platform", value: payload.platformLabel },
      { label: "Huidige website", value: payload.huidigeUrl },
      { label: "Migratie naar", value: "Next.js via Allesis" },
    ])}
  `;
  return wrapEmail(inner, "Migratie-aanvraag ontvangen");
}

function businessGratisWebsiteNotificationText(payload: {
  naam: string;
  email: string;
  bedrijf: string;
  branche: string;
  domein?: string;
  beschrijving: string;
  nieuwsbrief?: boolean;
}): string {
  return [
    "Nieuwe gratis one-pager aanvraag",
    "",
    plainRow("Pakket", "🐾 Gratis one-pager"),
    plainRow("Naam", payload.naam),
    plainRow("E-mail", payload.email),
    plainRow("Bedrijf", payload.bedrijf),
    plainRow("Branche", payload.branche),
    plainRow("Domein", payload.domein?.trim() || "—"),
    plainRow("SSF-link + branding", "Akkoord"),
    plainRow("Nieuwsbrief", payload.nieuwsbrief ? "Ja" : "Nee"),
    "",
    "Beschrijving:",
    "",
    payload.beschrijving,
    "",
    plainDivider(),
  ].join("\n");
}

function gratisWebsiteCustomerConfirmationText(payload: { naam: string; bedrijf: string; branche: string }): string {
  return [
    `Beste ${payload.naam},`,
    "",
    "Bedankt! Wij hebben uw aanvraag voor een gratis one-pager ontvangen.",
    "We nemen binnen één werkdag contact met u op.",
    "",
    plainRow("Bedrijf", payload.bedrijf),
    plainRow("Branche", payload.branche),
    plainRow("Pakket", "🐾 Gratis one-pager"),
    "",
    "Op uw website komt een donatie-link naar Saved Souls Foundation en Allesis-branding in de footer.",
    "",
    "— Allesis · info@allesis.nl · Haarlem",
  ].join("\n");
}

function gratisWebsiteCustomerConfirmationHtml(payload: { naam: string; bedrijf: string; branche: string }): string {
  const inner = `
    <p style="margin:0 0 16px;color:#374151;line-height:1.7;">Beste ${escapeHtml(payload.naam)},</p>
    <p style="margin:0 0 16px;color:#374151;line-height:1.7;">
      Bedankt! Wij hebben uw aanvraag voor een <strong>gratis one-pager</strong> ontvangen.
      We nemen binnen één werkdag contact met u op.
    </p>
    ${tableHtml([
      { label: "Bedrijf", value: payload.bedrijf },
      { label: "Branche", value: payload.branche },
      { label: "Pakket", value: "🐾 Gratis one-pager" },
    ])}
    <div style="margin:20px 0;padding:16px;background:#FFF8F0;border:1px solid #FED7AA;border-radius:8px;">
      <p style="margin:0;color:#92400E;font-size:14px;line-height:1.6;">
        🐾 Op uw website komt een donatie-link naar
        <a href="https://www.savedsouls-foundation.org/nl" style="color:#E85D26;font-weight:700;">Saved Souls Foundation</a>
        en Allesis-branding in de footer.
      </p>
    </div>
  `;
  return wrapEmail(inner, "Aanvraag ontvangen");
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

type OfferteCustomerPayload = {
  naam: string;
  email: string;
  telefoon: string;
  bedrijf?: string;
  gewensteDienst?: string;
  hostingPakket?: string;
  bericht?: string;
  nieuwsbrief?: boolean;
};

function offerteCustomerConfirmationText(payload: OfferteCustomerPayload): string {
  const nl = payload.nieuwsbrief ? "Ja, ik wil op de hoogte blijven" : "Nee";
  const toelichting = payload.bericht?.trim();
  const lines = [
    `Beste ${payload.naam},`,
    "",
    `Bedankt ${payload.naam}, we hebben uw offerteaanvraag ontvangen en nemen binnen 1 werkdag contact met u op.`,
    "",
    "Samenvatting",
    "",
    plainRow("Naam", payload.naam),
    plainRow("E-mail", payload.email),
    plainRow("Telefoon", payload.telefoon),
    plainRow("Bedrijf", payload.bedrijf?.trim() || "—"),
    plainRow("Gewenste dienst", payload.gewensteDienst?.trim() || "—"),
    plainRow("Hostingpakket", payload.hostingPakket?.trim() || "—"),
    plainRow("Nieuwsbrief", nl),
  ];
  if (toelichting) {
    lines.push("", "Toelichting:", "", toelichting);
  }
  lines.push("", plainDivider(), "", "— Allesis · info@allesis.nl · Haarlem");
  return lines.join("\n");
}

function offerteCustomerConfirmationHtml(payload: OfferteCustomerPayload): string {
  const summaryRows = tableHtml([
    { label: "Naam", value: payload.naam },
    { label: "E-mail", value: payload.email },
    { label: "Telefoon", value: payload.telefoon },
    { label: "Bedrijf", value: payload.bedrijf?.trim() || "—" },
    { label: "Gewenste dienst", value: payload.gewensteDienst?.trim() || "—" },
    { label: "Hostingpakket", value: payload.hostingPakket?.trim() || "—" },
    { label: "Nieuwsbrief", value: payload.nieuwsbrief ? "Ja, ik wil op de hoogte blijven" : "Nee" },
  ]);
  const toelichting = payload.bericht?.trim();
  const introSecond = `Bedankt ${escapeHtml(payload.naam)}, we hebben uw offerteaanvraag ontvangen en nemen binnen 1 werkdag contact met u op.`;

  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${BRAND.surface};">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(180deg, #eef2ff 0%, ${BRAND.surface} 280px);padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:${BRAND.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(30,64,175,0.10);border:1px solid ${BRAND.border};">
          <tr>
            <td style="background:${BRAND.markBlue};padding:28px 32px;text-align:center;color:${BRAND.white};">
              ${emailBrandMarkHtml()}
              <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-size:11px;color:${BRAND.white};margin-top:14px;letter-spacing:0.1em;text-transform:uppercase;">
                <a href="${SITE_URL}" style="color:${BRAND.white};text-decoration:none;">allesis.nl</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 28px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
              <p style="margin:0 0 8px;font-size:15px;color:${BRAND.muted};">Beste ${escapeHtml(payload.naam)},</p>
              <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${BRAND.text};line-height:1.35;letter-spacing:-0.02em;">Bedankt voor uw offerteaanvraag</h1>
              <p style="margin:0 0 24px;font-size:15px;color:${BRAND.muted};line-height:1.7;">
                ${introSecond}
              </p>
              <div style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:10px;padding:20px 22px;margin-bottom:24px;">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:${BRAND.markBlue};text-transform:uppercase;letter-spacing:0.06em;">Samenvatting van uw aanvraag</p>
                ${summaryRows}
                ${
                  toelichting
                    ? `<hr style="border:none;border-top:1px solid ${BRAND.border};margin:20px 0;" />
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:${BRAND.subtle};text-transform:uppercase;letter-spacing:0.05em;">Uw toelichting</p>
                <p style="margin:0;font-size:14px;color:${BRAND.text};line-height:1.65;white-space:pre-wrap;">${escapeHtml(toelichting)}</p>`
                    : ""
                }
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
                <a href="mailto:info@allesis.nl" style="color:${BRAND.markBlue};text-decoration:none;font-weight:600;">info@allesis.nl</a>
                &nbsp;·&nbsp; Haarlem, Nederland
              </p>
              <p style="margin:12px 0 0;font-size:14px;">
                <a href="${SITE_URL}" style="color:${BRAND.markBlue};text-decoration:none;font-weight:600;">allesis.nl</a>
              </p>
              <p style="margin:20px 0 0;font-size:11px;color:${BRAND.subtle};line-height:1.5;">
                U ontvangt deze e-mail omdat u het offerteformulier op onze website heeft ingevuld. Dit is een automatische bevestiging; antwoorden op deze e-mail komen bij ons terecht indien uw mailclient dat ondersteunt.
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
  | { type: "contact"; naam: string; email: string; onderwerp?: string; bericht: string; nieuwsbrief?: boolean; lang?: string }
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
      type: "gratis_website";
      naam: string;
      email: string;
      bedrijf: string;
      branche: string;
      domein?: string;
      beschrijving: string;
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
  | {
      type: "migratie_aanvraag";
      naam: string;
      email: string;
      bedrijf?: string;
      platform: string;
      platformLabel: string;
      huidigeUrl: string;
      extraAntwoorden?: Record<string, string>;
      bericht?: string;
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
      const mailLang = resolveMailLang(payload.lang);
      subject = `[${mailLang.toUpperCase()}] Contact: ${payload.onderwerp?.trim() || "Bericht via allesis.nl"}`;
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
    case "gratis_website": {
      replyTo = payload.email;
      subject = `Gratis one-pager — ${payload.bedrijf} (${payload.branche})`;
      const inner = tableHtml([
        { label: "Pakket", value: "🐾 Gratis one-pager" },
        { label: "Naam", value: payload.naam },
        { label: "E-mail", value: payload.email },
        { label: "Bedrijf", value: payload.bedrijf },
        { label: "Branche", value: payload.branche },
        { label: "Domein", value: payload.domein || "—" },
        { label: "Beschrijving", value: payload.beschrijving },
        { label: "SSF-link + branding", value: "Akkoord" },
        { label: "Privacyverklaring", value: "Akkoord (formulier)" },
        { label: "Nieuwsbrief", value: payload.nieuwsbrief ? "Ja" : "Nee" },
      ]);
      html = wrapEmail(inner, "Nieuwe gratis one-pager aanvraag");
      text = businessGratisWebsiteNotificationText(payload);
      break;
    }
    case "migratie_aanvraag": {
      replyTo = payload.email;
      subject = `Migratie-aanvraag — ${payload.platformLabel}`;
      const extraRows = Object.entries(payload.extraAntwoorden ?? {})
        .filter(([, value]) => value.trim())
        .map(([label, value]) => ({ label, value }));
      const inner = `${tableHtml([
        { label: "Platform", value: payload.platformLabel },
        { label: "Naam", value: payload.naam },
        { label: "E-mail", value: payload.email },
        { label: "Bedrijf", value: payload.bedrijf || "—" },
        { label: "Huidige URL", value: payload.huidigeUrl },
        ...extraRows,
        { label: "Opmerking", value: payload.bericht || "—" },
        { label: "Privacyverklaring", value: "Akkoord (formulier)" },
        { label: "Nieuwsbrief", value: payload.nieuwsbrief ? "Ja" : "Nee" },
      ])}`;
      html = wrapEmail(inner, "Nieuwe migratie-aanvraag");
      text = businessMigratieNotificationText(payload);
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
   * Klantbevestiging vóór `businessSend.data?.id`-check, zodat een tweede Resend-call ook bij
   * contact/offerte wordt geprobeerd. Succes bedrijfsmail: `businessSend.data?.id`.
   */
  if (
    payload.type === "contact" ||
    payload.type === "offerte" ||
    payload.type === "gratis_website" ||
    payload.type === "migratie_aanvraag"
  ) {
    const customerEmail = payload.email.trim();
    console.log("[debug] sending to customer:", { type: payload.type, customerEmail });

    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      console.error("[allesis-email] klantbevestiging overgeslagen: ongeldig e-mailadres", { customerEmail });
    } else {
      const businessReply = process.env.BUSINESS_EMAIL || "info@allesis.nl";
      let confirmHtml: string;
      let confirmText: string;
      let confirmSubject: string;
      if (payload.type === "contact") {
        confirmHtml = contactCustomerConfirmationHtml(payload);
        confirmText = contactCustomerConfirmationText(payload);
        confirmSubject = CONTACT_CONFIRM.subject[resolveMailLang(payload.lang)];
      } else if (payload.type === "offerte") {
        confirmHtml = offerteCustomerConfirmationHtml(payload);
        confirmText = offerteCustomerConfirmationText(payload);
        confirmSubject = "Bedankt voor uw offerteaanvraag — Allesis.nl";
      } else if (payload.type === "migratie_aanvraag") {
        confirmHtml = migratieCustomerConfirmationHtml(payload);
        confirmText = migratieCustomerConfirmationText(payload);
        confirmSubject = "Uw migratie-aanvraag is ontvangen — Allesis";
      } else {
        confirmHtml = gratisWebsiteCustomerConfirmationHtml(payload);
        confirmText = gratisWebsiteCustomerConfirmationText(payload);
        confirmSubject = "Uw gratis website-aanvraag is ontvangen — Allesis";
      }

      try {
        const customerSend = await resend.emails.send({
          from,
          to: [customerEmail],
          replyTo: businessReply,
          subject: confirmSubject,
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
