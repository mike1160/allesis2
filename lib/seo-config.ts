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
  "/avg-regelgeving": { priority: 0.7, changeFrequency: "monthly" },
  "/avg-boetes": { priority: 0.7, changeFrequency: "monthly" },
  "/dienstverlening": { priority: 0.6, changeFrequency: "monthly" },
  "/disclaimer": { priority: 0.5, changeFrequency: "yearly" },
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
