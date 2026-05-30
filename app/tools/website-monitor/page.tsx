import type { Metadata } from "next";
import MonitorCounter from "@/components/MonitorCounter";
import WebsiteMonitor from "@/components/WebsiteMonitor";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Website Monitor",
  url: `${SITE_URL}/tools/website-monitor`,
  description:
    "Controleer websites gratis op bereikbaarheid, HTTPS, laadtijd, dode links, contactformulieren en donatie-buttons. AI-powered door allesis.nl.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  provider: {
    "@type": "Organization",
    name: "allesis.nl",
    url: SITE_URL,
  },
  featureList: [
    "Online status check",
    "HTTPS / SSL controle",
    "Laadtijd meting",
    "404 en foutpagina detectie",
    "Dode links opsporen",
    "Contactformulier detectie",
    "Donatie-button detectie",
    "CSV en PDF export",
    "Geschiedenis van checks",
  ],
  datePublished: "2026-05-30",
  inLanguage: "nl-NL",
};

export const metadata: Metadata = {
  title: {
    absolute: "Website Monitor — Controleer je website gratis | allesis.nl",
  },
  description:
    "Controleer elke website gratis op bereikbaarheid, HTTPS, laadtijd, dode links, contactformulieren en donatie-buttons. Powered by AI. Door allesis.nl.",
  keywords: [
    "website monitor",
    "website checker",
    "dode links controleren",
    "website online check",
    "HTTPS checker",
    "laadtijd meten",
    "contactformulier check",
    "website fouten vinden",
    "gratis website analyse",
    "allesis",
  ],
  openGraph: {
    title: "Website Monitor — Controleer je website gratis",
    description:
      "AI-powered check op bereikbaarheid, HTTPS, laadtijd, dode links en meer. Gratis op allesis.nl.",
    url: `${SITE_URL}/tools/website-monitor`,
    siteName: "allesis.nl",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Monitor — allesis.nl",
    description:
      "Gratis AI-powered website check. Bereikbaarheid, HTTPS, links, formulieren en meer.",
  },
  alternates: pageAlternates("/tools/website-monitor"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function WebsiteMonitorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WebsiteMonitor counter={<MonitorCounter />} />
    </>
  );
}
