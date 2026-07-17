import type { Metadata } from "next";
import { Suspense } from "react";
import GratisWebsiteForm from "@/components/GratisWebsiteForm";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Gratis website aanvragen — one-pager voor een goed doel",
  description:
    "Vraag een gratis one-pager aan bij Allesis. Online binnen 24 uur**. Uw site steunt Saved Souls Foundation. Capaciteitsvoorbehoud van toepassing.*",
  alternates: pageAlternates("/gratis-website"),
  openGraph: {
    title: "Gratis website aanvragen | Allesis",
    description: "Gratis one-pager in ruil voor steun aan Saved Souls Foundation. Eerlijk en transparant.",
    url: `${SITE_URL}/gratis-website`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function GratisWebsitePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-gray-50 px-6 py-24">
          <p className="font-lato text-sm text-gray-500">Formulier laden…</p>
        </div>
      }
    >
      <GratisWebsiteForm />
    </Suspense>
  );
}
