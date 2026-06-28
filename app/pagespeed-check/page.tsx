import type { Metadata } from "next";
import { Suspense } from "react";
import PageSpeedCheckClient from "@/components/PageSpeedCheckClient";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Gratis PageSpeed-check — snelheid & Core Web Vitals",
  description:
    "Test gratis de snelheid van uw website op mobiel en desktop. Scores, LCP, CLS, INP en concrete verbeterpunten — geen registratie.",
  alternates: pageAlternates("/pagespeed-check"),
  openGraph: {
    title: "Gratis PageSpeed-check | Allesis",
    description: "Direct inzicht in laadtijd en Core Web Vitals voor uw domein.",
    url: `${SITE_URL}/pagespeed-check`,
    locale: "nl_NL",
    type: "website",
  },
};

function Fallback() {
  return (
    <div className="font-lato flex min-h-screen items-center justify-center bg-[#0a0f1e] pt-24 text-white/80">
      Laden…
    </div>
  );
}

export default function PageSpeedCheckPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <PageSpeedCheckClient />
    </Suspense>
  );
}
