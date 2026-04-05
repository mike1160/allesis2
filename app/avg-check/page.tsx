import type { Metadata } from "next";
import { Suspense } from "react";
import AvgCheckClient from "@/components/AvgCheckClient";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Gratis AVG-check voor uw website",
  description:
    "Direct inzicht in SSL, privacybeleid, cookies en meer. Gratis rapport — geen registratie. Allesis helpt bij het oplossen van bevindingen.",
  alternates: pageAlternates("/avg-check"),
  openGraph: {
    title: "Gratis AVG-check | Allesis",
    description: "Controleer uw site op privacy en techniek.",
    url: `${SITE_URL}/avg-check`,
    locale: "nl_NL",
    type: "website",
  },
};

function AvgCheckFallback() {
  return (
    <div className="font-lato flex min-h-screen items-center justify-center bg-[#0a0f1e] pt-24 text-white/80">
      Laden…
    </div>
  );
}

export default function AvgCheckPage() {
  return (
    <Suspense fallback={<AvgCheckFallback />}>
      <AvgCheckClient />
    </Suspense>
  );
}
