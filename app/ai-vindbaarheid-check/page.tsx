import type { Metadata } from "next";
import { Suspense } from "react";
import AiVindbaarheidCheckClient from "@/components/AiVindbaarheidCheckClient";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Gratis AI-vindbaarheidscheck — ChatGPT, Claude & Perplexity",
  description:
    "Controleer gratis of AI-crawlers uw site mogen lezen: robots.txt, llms.txt en schema markup. Direct rapport — geen registratie.",
  alternates: pageAlternates("/ai-vindbaarheid-check"),
  openGraph: {
    title: "Gratis AI-vindbaarheidscheck | Allesis",
    description: "Zichtbaar in ChatGPT, Perplexity en Google AI? Test uw domein direct.",
    url: `${SITE_URL}/ai-vindbaarheid-check`,
    locale: "nl_NL",
    type: "website",
  },
};

function Fallback() {
  return (
    <div className="font-lato flex min-h-screen items-center justify-center bg-gray-50 pt-24 text-gray-500">
      Laden…
    </div>
  );
}

export default function AiVindbaarheidCheckPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <AiVindbaarheidCheckClient />
    </Suspense>
  );
}
