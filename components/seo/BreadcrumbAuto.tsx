"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { SITE_URL } from "@/lib/seo-config";

const LABELS: Record<string, string> = {
  webdesign: "Webdesign",
  hosting: "Hosting",
  seo: "SEO",
  avg: "AVG-compliance",
  "avg-check": "AVG-check",
  "avg-regelgeving": "AVG-regelgeving",
  "avg-boetes": "AVG-boetes",
  contact: "Contact",
  domeinen: "Domeinen",
  vertaling: "Vertaling",
  thai: "Thaise webdiensten",
  disclaimer: "Disclaimer",
  dienstverlening: "Dienstverlening",
  "recent-websites": "Recent websites",
  login: "Inloggen",
  registreren: "Registreren",
};

export default function BreadcrumbAuto() {
  const pathname = usePathname() || "/";

  const jsonLd = useMemo(() => {
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);
    const items: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
    let acc = "";
    for (const seg of segments) {
      acc += `/${seg}`;
      items.push({
        name: LABELS[seg] ?? seg.replace(/-/g, " "),
        path: acc,
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
      })),
    };
  }, [pathname]);

  if (!jsonLd) return null;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
