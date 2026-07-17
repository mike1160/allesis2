import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://allesis.nl";

  const branches = [
    "horeca",
    "beauty",
    "bouw",
    "zorg",
    "zzp",
    "non-profit",
    "webshop",
    "tandarts",
    "vastgoed",
    "sport",
    "advocaat",
    "thai",
  ];

  const diensten = [
    "webdesign",
    "hosting",
    "seo",
    "avg",
    "avg-regelgeving",
    "avg-boetes",
    "avg-check",
    "domeinen",
    "vertaling",
  ];

  return [
    // Homepage
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },

    // Pakketten
    { url: `${baseUrl}/gratis-website`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // Migratie
    { url: `${baseUrl}/migratie-aanvragen`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/wordpress-naar-nextjs`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/wix-naar-eigen-website`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${baseUrl}/shopify-alternatief`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 },

    // Branches
    ...branches.map((branch) => ({
      url: `${baseUrl}/${branch}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Diensten
    ...diensten.map((dienst) => ({
      url: `${baseUrl}/${dienst}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Juridisch
    { url: `${baseUrl}/voorwaarden`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
