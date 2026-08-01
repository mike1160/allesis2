import type { MetadataRoute } from "next";
import { EXTRA_BRANCH_SLUGS } from "@/lib/extra-branches";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://allesis.nl";
  const lastModified = new Date("2026-07-25");

  const coreBranches = [
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

  const branches = [...coreBranches, ...EXTRA_BRANCH_SLUGS].filter(
    (slug) => slug !== "muziek",
  );

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
    "dienstverlening",
  ];

  const tools = [
    "recent-websites",
    "pagespeed-check",
    "ai-vindbaarheid-check",
    "tools/website-monitor",
  ];

  return [
    // Homepage
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },

    // Pakketten
    { url: `${baseUrl}/gratis-website`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },

    // Migratie
    { url: `${baseUrl}/migratie-aanvragen`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/wordpress-naar-nextjs`, lastModified, changeFrequency: "monthly", priority: 0.85 },

    // Featured case study — Nene Royal
    {
      url: `${baseUrl}/muziek`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      videos: [
        {
          title: "Nene Royal Live @ Naka Market Phuket",
          thumbnail_loc: "https://img.youtube.com/vi/9LDEYSnRl6M/maxresdefault.jpg",
          description:
            "Nene Royal live concert bij Naka Market Phuket Thailand — 18 juli 2026",
          player_loc: "https://www.youtube.com/embed/9LDEYSnRl6M",
        },
      ],
    },

    // Thailand / Phuket — Thai Unicode URLs (SEO) + ASCII aliases
    { url: `${baseUrl}/th`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...[
      ["garage", "อู่ซ่อมรถ"],
      ["restaurant", "ร้านอาหาร"],
      ["spa", "สปา"],
      ["clinic", "คลินิก"],
      ["school", "โรงเรียน"],
      ["realestate", "อสังหาริมทรัพย์"],
      ["propertymanagement", "บริหารอสังหา"],
      ["hotel", "โรงแรม"],
      ["taxi", "แท็กซี่"],
      ["watersport", "กีฬาทางน้ำ"],
      ["tours", "ทัวร์"],
    ].flatMap(([ascii, thai]) => [
      {
        url: `${baseUrl}/th/${encodeURI(thai)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/th/${ascii}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      },
    ]),

    // Branches overzicht + individuele branches
    { url: `${baseUrl}/branches`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...branches.map((branch) => ({
      url: `${baseUrl}/${branch}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Diensten
    ...diensten.map((dienst) => ({
      url: `${baseUrl}/${dienst}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Tools
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),

    // Juridisch
    { url: `${baseUrl}/voorwaarden`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
