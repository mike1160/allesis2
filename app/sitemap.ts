import type { MetadataRoute } from "next";

type Entry = { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number };

const entries: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/webdesign", changeFrequency: "monthly", priority: 0.9 },
  { path: "/avg-regelgeving", changeFrequency: "monthly", priority: 0.9 },
  { path: "/avg-boetes", changeFrequency: "monthly", priority: 0.9 },
  { path: "/avg-check", changeFrequency: "monthly", priority: 0.9 },
  { path: "/hosting", changeFrequency: "monthly", priority: 0.9 },
  { path: "/domeinen", changeFrequency: "monthly", priority: 0.8 },
  { path: "/recent-websites", changeFrequency: "monthly", priority: 0.8 },
  { path: "/vertaling", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.5 },
  { path: "/dienstverlening", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://allesis.nl";
  const now = new Date();
  return entries.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
