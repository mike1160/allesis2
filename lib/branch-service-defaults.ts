import { LINE_URL } from "@/lib/translations";
import type { FeatureSlug } from "@/lib/th-features";

const P = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&q=80`;

type ServiceDefault = {
  img: string;
  /** internal feature slug, site path, or absolute URL */
  to: FeatureSlug | `/${string}` | `https://${string}`;
};

/** Defaults per emoji — makes every branch service card clickable + illustrated */
export const SERVICE_DEFAULTS: Record<string, ServiceDefault> = {
  "📅": { img: P(3184465), to: "booking" },
  "🔧": { img: P(3807517), to: "menu" },
  "📍": { img: P(2422588), to: "/seo" },
  "🚗": { img: P(1409999), to: "menu" },
  "⭐": { img: P(3184291), to: "reviews" },
  "🛞": { img: P(3807277), to: "menu" },
  "🔌": { img: P(4489793), to: "menu" },
  "💬": { img: P(267350), to: LINE_URL as `https://${string}` },
  "🍽️": { img: P(958545), to: "menu" },
  "📸": { img: P(1571460), to: "gallery" },
  "🌍": { img: P(267669), to: "/seo" },
  "📱": { img: P(607812), to: "mobile" },
  "🍸": { img: P(1283219), to: "menu" },
  "🛵": { img: P(4393668), to: "booking" },
  "💅": { img: P(3997993), to: "menu" },
  "🛁": { img: P(3764568), to: "packages" },
  "🌺": { img: P(3865792), to: "menu" },
  "👨‍⚕️": { img: P(3259629), to: "team" },
  "🏥": { img: P(263402), to: "menu" },
  "🔒": { img: P(60504), to: "trust" },
  "📋": { img: P(590022), to: "forms" },
  "💊": { img: P(3683074), to: "menu" },
  "🏫": { img: P(256395), to: "menu" },
  "📚": { img: P(159711), to: "menu" },
  "🎓": { img: P(267885), to: "packages" },
  "👩‍🏫": { img: P(5212345), to: "team" },
  "🏡": { img: P(1396122), to: "listings" },
  "🔍": { img: P(106399), to: "search" },
  "🌐": { img: P(267669), to: "multilang" },
  "💳": { img: P(4968391), to: "booking" },
  "👨‍🏫": { img: P(5212345), to: "team" },
  "🏆": { img: P(267885), to: "packages" },
  "📝": { img: P(590022), to: "forms" },
};

const FALLBACK: ServiceDefault = {
  img: P(196644),
  to: "mobile",
};

export function resolveServiceLink(
  icon: string,
  lang: string,
  existingHref?: string,
): string {
  if (existingHref) return existingHref;
  const def = SERVICE_DEFAULTS[icon] ?? FALLBACK;
  const { to } = def;
  if (to.startsWith("http")) return to;
  if (to.startsWith("/")) return to;
  return `/th/features/${to}?lang=${lang}`;
}

export function resolveServiceImg(icon: string, existingImg?: string): string {
  if (existingImg) return existingImg;
  return (SERVICE_DEFAULTS[icon] ?? FALLBACK).img;
}
