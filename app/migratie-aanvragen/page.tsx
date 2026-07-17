import type { Metadata } from "next";
import { Suspense } from "react";
import MigratieAanvragenClient from "@/components/MigratieAanvragenClient";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Website migreren | Van WordPress, Wix of Shopify naar Next.js",
  description:
    "Migreer uw WordPress, Wix of Shopify site naar een snelle Next.js website. Behoud van SEO, content en domeinnaam. Vanaf €299. Allesis Haarlem.",
  alternates: pageAlternates("/migratie-aanvragen"),
  openGraph: {
    title: "Website migreren naar Next.js | Allesis",
    description:
      "Migreer uw WordPress, Wix of Shopify site naar Next.js. Behoud van SEO, content en domeinnaam. Vanaf €299.",
    url: `${SITE_URL}/migratie-aanvragen`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function MigratieAanvragenPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-gray-50 px-6 py-24">
          <p className="font-lato text-sm text-gray-500">Formulier laden…</p>
        </div>
      }
    >
      <MigratieAanvragenClient />
    </Suspense>
  );
}
