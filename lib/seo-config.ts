export const SITE_URL = "https://allesis.nl";

export const ORGANIZATION_SAME_AS = [
  "https://www.linkedin.com/company/allesis",
  "https://www.facebook.com/allesis.nl",
  "https://www.instagram.com/allesis.nl",
] as const;

export const GLOBAL_KEYWORDS = [
  "webdesign Haarlem",
  "Thai website Nederland",
  "Thaise vertaaldienst",
  "Thai interpreter Netherlands",
  "เว็บไซต์ภาษาไทย",
  "Thai web design Netherlands",
  "Thai Dutch translation",
  "Thaise website laten maken",
  "AVG compliance",
  "SEO bureau Haarlem",
  "webhosting Nederland",
  "digitale partner Haarlem",
  "GDPR website",
] as const;

/** Pad → priority, changeFrequency (override voor sitemap) */
export const SITEMAP_PRIORITY: Record<
  string,
  { priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }
> = {
  "/": { priority: 1, changeFrequency: "daily" },
  "/webdesign": { priority: 0.9, changeFrequency: "weekly" },
  "/hosting": { priority: 0.9, changeFrequency: "weekly" },
  "/seo": { priority: 0.9, changeFrequency: "weekly" },
  "/avg": { priority: 0.9, changeFrequency: "weekly" },
  "/thai": { priority: 0.9, changeFrequency: "weekly" },
  "/contact": { priority: 0.8, changeFrequency: "weekly" },
  "/privacy": { priority: 0.55, changeFrequency: "yearly" },
  "/domeinen": { priority: 0.75, changeFrequency: "weekly" },
  "/vertaling": { priority: 0.75, changeFrequency: "weekly" },
  "/recent-websites": { priority: 0.7, changeFrequency: "weekly" },
  "/avg-check": { priority: 0.75, changeFrequency: "weekly" },
  "/pagespeed-check": { priority: 0.75, changeFrequency: "weekly" },
  "/ai-vindbaarheid-check": { priority: 0.75, changeFrequency: "weekly" },
  "/tools/website-monitor": { priority: 0.9, changeFrequency: "weekly" },
  "/avg-regelgeving": { priority: 0.7, changeFrequency: "monthly" },
  "/avg-boetes": { priority: 0.7, changeFrequency: "monthly" },
  "/dienstverlening": { priority: 0.6, changeFrequency: "monthly" },
  "/disclaimer": { priority: 0.5, changeFrequency: "yearly" },
  "/voorwaarden": { priority: 0.5, changeFrequency: "yearly" },
  "/gratis-website": { priority: 0.9, changeFrequency: "weekly" },
  "/branches": { priority: 0.8, changeFrequency: "monthly" },
  "/horeca": { priority: 0.8, changeFrequency: "monthly" },
  "/beauty": { priority: 0.8, changeFrequency: "monthly" },
  "/bouw": { priority: 0.8, changeFrequency: "monthly" },
  "/zorg": { priority: 0.8, changeFrequency: "monthly" },
  "/zzp": { priority: 0.8, changeFrequency: "monthly" },
  "/non-profit": { priority: 0.8, changeFrequency: "monthly" },
  "/webshop": { priority: 0.8, changeFrequency: "monthly" },
  "/tandarts": { priority: 0.8, changeFrequency: "monthly" },
  "/vastgoed": { priority: 0.8, changeFrequency: "monthly" },
  "/sport": { priority: 0.8, changeFrequency: "monthly" },
  "/advocaat": { priority: 0.8, changeFrequency: "monthly" },
  "/kappers": { priority: 0.8, changeFrequency: "monthly" },
  "/fotografie": { priority: 0.8, changeFrequency: "monthly" },
  "/coaching": { priority: 0.8, changeFrequency: "monthly" },
  "/accountant": { priority: 0.8, changeFrequency: "monthly" },
  "/architect": { priority: 0.8, changeFrequency: "monthly" },
  "/kinderopvang": { priority: 0.8, changeFrequency: "monthly" },
  "/garage": { priority: 0.8, changeFrequency: "monthly" },
  "/catering": { priority: 0.8, changeFrequency: "monthly" },
  "/reizen": { priority: 0.8, changeFrequency: "monthly" },
  "/it": { priority: 0.8, changeFrequency: "monthly" },
  "/marketing": { priority: 0.8, changeFrequency: "monthly" },
  "/onderwijs": { priority: 0.8, changeFrequency: "monthly" },
  "/notaris": { priority: 0.8, changeFrequency: "monthly" },
  "/psycholoog": { priority: 0.8, changeFrequency: "monthly" },
  "/dierenarts": { priority: 0.8, changeFrequency: "monthly" },
  "/schoonmaak": { priority: 0.8, changeFrequency: "monthly" },
  "/beveiliging": { priority: 0.8, changeFrequency: "monthly" },
  "/tuin": { priority: 0.8, changeFrequency: "monthly" },
  "/installateur": { priority: 0.8, changeFrequency: "monthly" },
  "/bruiloft": { priority: 0.8, changeFrequency: "monthly" },
  "/dierenwinkel": { priority: 0.8, changeFrequency: "monthly" },
  "/bouwmarkt": { priority: 0.8, changeFrequency: "monthly" },
  "/tuincentrum": { priority: 0.8, changeFrequency: "monthly" },
  "/groothandel": { priority: 0.8, changeFrequency: "monthly" },
  "/supermarkt": { priority: 0.8, changeFrequency: "monthly" },
  "/meubels": { priority: 0.8, changeFrequency: "monthly" },
  "/elektronica": { priority: 0.8, changeFrequency: "monthly" },
  "/kleding": { priority: 0.8, changeFrequency: "monthly" },
  "/speelgoed": { priority: 0.8, changeFrequency: "monthly" },
  "/boekhandel": { priority: 0.8, changeFrequency: "monthly" },
  "/juwelier": { priority: 0.8, changeFrequency: "monthly" },
  "/fietswinkel": { priority: 0.8, changeFrequency: "monthly" },
  "/slager": { priority: 0.8, changeFrequency: "monthly" },
  "/bloemist": { priority: 0.8, changeFrequency: "monthly" },
  "/apotheek": { priority: 0.8, changeFrequency: "monthly" },
  "/opticien": { priority: 0.8, changeFrequency: "monthly" },
  "/muziek": { priority: 0.9, changeFrequency: "weekly" },
  "/wijn": { priority: 0.8, changeFrequency: "monthly" },
};

export const SITEMAP_EXCLUDE_PATHS = new Set([
  "/login",
  "/registreren",
  "/dashboard",
  "/admin",
  "/api",
]);

/** Hreflang: NL/EN op dezelfde URL; `th` wijst naar de Thaise dienstenhub. */
export function pageAlternates(slug: string) {
  const canonical =
    slug === "/" || slug === ""
      ? SITE_URL
      : `${SITE_URL}${slug.startsWith("/") ? slug : `/${slug}`}`;
  return {
    canonical,
    languages: {
      nl: canonical,
      en: canonical,
      th: `${SITE_URL}/thai`,
      "x-default": canonical,
    },
  };
}
