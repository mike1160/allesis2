export type Lang = "th" | "en" | "nl" | "ru" | "de";

export const LANGS: Lang[] = ["th", "en", "nl", "ru", "de"];

/** Officiële LINE — Mikeook (invite link) */
export const LINE_URL = "https://line.me/ti/p/Y0acAjifL9";
export const LINE_QR = "/images/line-qr.png";
export const LINE_ID = "Mikeook";

/** WhatsApp — Mike Kleinjans +31 6 43 05 78 72 */
export const WHATSAPP_URL = "https://wa.me/31643057872";
export const WHATSAPP_QR = "/images/whatsapp-qr.png?v=2";
export const WHATSAPP_TEL = "+31 643057872";

export function resolveLang(lang?: string | string[]): Lang {
  const value = Array.isArray(lang) ? lang[0] : lang;
  if (value && (LANGS as string[]).includes(value)) return value as Lang;
  return "th";
}

export const ui = {
  nav_back: { th: "← กลับ", en: "← Back", nl: "← Terug", ru: "← Назад", de: "← Zurück" },
  badge: {
    th: "🇪🇺 Allesis · คุณภาพยุโรป · เนเธอร์แลนด์",
    en: "🇪🇺 Allesis · European Quality · Netherlands",
    nl: "🇪🇺 Allesis · Europese Kwaliteit · Nederland",
    ru: "🇪🇺 Allesis · Европейское качество · Нидерланды",
    de: "🇪🇺 Allesis · Europäische Qualität · Niederlande",
  },
  what_you_get: {
    th: "สิ่งที่คุณจะได้รับ",
    en: "What you get",
    nl: "Wat je krijgt",
    ru: "Что вы получаете",
    de: "Was Sie bekommen",
  },
  why_website: {
    th: "ทำไมต้องมีเว็บไซต์",
    en: "Why a website?",
    nl: "Waarom een website?",
    ru: "Зачем сайт?",
    de: "Warum eine Website?",
  },
  pricing: { th: "ราคา", en: "Pricing", nl: "Prijzen", ru: "Цены", de: "Preise" },
  no_hidden: {
    th: "ไม่มีค่าใช้จ่ายซ่อนเร้น",
    en: "No hidden costs",
    nl: "Geen verborgen kosten",
    ru: "Без скрытых расходов",
    de: "Keine versteckten Kosten",
  },
  recommended: {
    th: "แนะนำ",
    en: "Recommended",
    nl: "Aanbevolen",
    ru: "Рекомендуем",
    de: "Empfohlen",
  },
  contact_cta: {
    th: "พร้อมเริ่มต้นแล้วหรือยัง?",
    en: "Ready to get started?",
    nl: "Klaar om te starten?",
    ru: "Готовы начать?",
    de: "Bereit anzufangen?",
  },
  free_consult: {
    th: "ปรึกษาฟรี ไม่มีข้อผูกมัด",
    en: "Free consultation — no obligation",
    nl: "Gratis consult — vrijblijvend",
    ru: "Бесплатная консультация",
    de: "Kostenlose Beratung",
  },
  line_cta: {
    th: "💬 ติดต่อผ่าน LINE",
    en: "💬 Contact via LINE",
    nl: "💬 Contact via LINE",
    ru: "💬 Связаться в LINE",
    de: "💬 Kontakt über LINE",
  },
  whatsapp_cta: {
    th: "📱 WhatsApp",
    en: "📱 WhatsApp",
    nl: "📱 WhatsApp",
    ru: "📱 WhatsApp",
    de: "📱 WhatsApp",
  },
  email_cta: {
    th: "✉️ อีเมล",
    en: "✉️ Email",
    nl: "✉️ E-mail",
    ru: "✉️ Эл. почта",
    de: "✉️ E-Mail",
  },
  ready: { th: "พร้อมแล้ว?", en: "Ready?", nl: "Klaar?", ru: "Готовы?", de: "Bereit?" },
  view_detail: {
    th: "ดูรายละเอียด →",
    en: "View details →",
    nl: "Bekijk →",
    ru: "Подробнее →",
    de: "Ansehen →",
  },
} as const;
