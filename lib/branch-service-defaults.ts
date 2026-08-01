import { LINE_URL } from "@/lib/translations";
import type { FeatureSlug } from "@/lib/th-features";

const P = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&q=80`;

type ServiceDefault = {
  img: string;
  /** internal feature slug, site path, or absolute URL */
  to: FeatureSlug | `/${string}` | `https://${string}`;
};

/**
 * Defaults per emoji — every photo ID must be unique so cards on the same
 * branch page never share the same background.
 */
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
  "🌍": { img: P(270408), to: "/seo" }, // laptop / search — not dictionary
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
  "🌐": { img: P(1181534), to: "multilang" }, // flags / languages — unique vs 🌍
  "💳": { img: P(4968391), to: "booking" },
  "👨‍🏫": { img: P(5212317), to: "team" },
  "🏆": { img: P(7005697), to: "packages" },
  "📝": { img: P(669615), to: "forms" },
  "🏢": { img: P(323780), to: "listings" },
  "🔑": { img: P(280221), to: "menu" },
  "🛏️": { img: P(261102), to: "packages" },
  "🏝️": { img: P(1174732), to: "packages" }, // beach/island — unique vs hotel hero 258154
  "✈️": { img: P(912050), to: "booking" }, // airport — unique vs taxi mid 1118448
  "🚕": { img: P(116675), to: "menu" },
  "🗺️": { img: P(346885), to: "search" }, // map — unique vs 📍 2422588
  "🤿": { img: P(1001682), to: "packages" },
  "🐠": { img: P(1666021), to: "gallery" },
  "🚤": { img: P(863988), to: "booking" }, // boat — unique vs divers 37530
};

/** Extra unique fallbacks if a page still collides after defaults */
const UNIQUE_POOL = [
  P(196644),
  P(3183150),
  P(3184292),
  P(3184360),
  P(3184418),
  P(3184435),
  P(3184460),
  P(3184611),
  P(3184650),
  P(3184298),
  P(3184311),
  P(3184338),
];

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

/** Ensure every service card on a page gets a distinct image URL */
export function uniquifyServiceImages<T extends { icon: string; img?: string }>(
  services: readonly T[],
): (T & { img: string })[] {
  const used = new Set<string>();
  let poolIdx = 0;

  return services.map((s) => {
    let img = resolveServiceImg(s.icon, s.img);
    if (used.has(img)) {
      while (poolIdx < UNIQUE_POOL.length && used.has(UNIQUE_POOL[poolIdx])) {
        poolIdx += 1;
      }
      img = UNIQUE_POOL[poolIdx] ?? `${img}&v=${used.size}`;
      poolIdx += 1;
    }
    used.add(img);
    return { ...s, img };
  });
}
