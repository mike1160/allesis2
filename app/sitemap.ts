import type { MetadataRoute } from "next";
import { discoverAppRoutes, getLastModified } from "@/lib/discover-app-routes";
import { SITE_URL, SITEMAP_EXCLUDE_PATHS, SITEMAP_PRIORITY } from "@/lib/seo-config";

function hrefAlternates(path: string): MetadataRoute.Sitemap[0]["alternates"] {
  const base = SITE_URL;
  const url = `${base}${path}`;
  return {
    languages: {
      nl: url,
      en: url,
      th: `${base}/thai`,
      "x-default": url,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const discovered = discoverAppRoutes();

  const rows: MetadataRoute.Sitemap = [];

  for (const { path, pageFile } of discovered) {
    if (SITEMAP_EXCLUDE_PATHS.has(path)) continue;
    if (path === "/th") continue;

    const cfg = SITEMAP_PRIORITY[path] ?? { priority: 0.6, changeFrequency: "monthly" as const };

    rows.push({
      url: `${base}${path}`,
      lastModified: getLastModified(pageFile),
      changeFrequency: cfg.changeFrequency,
      priority: cfg.priority,
      alternates: hrefAlternates(path),
    });
  }

  rows.sort((a, b) => a.url.localeCompare(b.url));
  return rows;
}
