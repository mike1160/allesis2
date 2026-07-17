import type { Metadata } from "next";
import "./globals.css";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import BreadcrumbAuto from "@/components/seo/BreadcrumbAuto";
import { buildSiteGraphSchema } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/seo-config";

const defaultTitle = "Allesis — Webdesign Haarlem | Hosting, SEO & AVG";
const defaultDescription =
  "Allesis bouwt snelle websites voor het MKB — hosting, SEO en AVG inbegrepen. Gratis one-pager beschikbaar. Persoonlijk bureau uit Haarlem.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Allesis.nl",
  },
  description: defaultDescription,
  keywords: [
    "webdesign Haarlem",
    "website laten maken",
    "AVG compliant",
    "SEO bureau Haarlem",
    "gratis website",
    "Next.js webbureau",
  ],
  authors: [{ name: "Allesis", url: SITE_URL }],
  creator: "Allesis",
  publisher: "Allesis",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // Vervang door je Google Search Console-verificatiecode
    google: "VOEG_HIER_GOOGLE_SEARCH_CONSOLE_CODE_IN",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      nl: SITE_URL,
      en: SITE_URL,
      th: `${SITE_URL}/thai`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "Allesis.nl",
    title: "Allesis — Webdesign Haarlem",
    description: "Snelle websites voor het MKB — hosting, SEO en AVG inbegrepen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allesis — Webdesign Haarlem",
    description: "Snelle websites voor het MKB — hosting, SEO en AVG inbegrepen.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildSiteGraphSchema([
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-webdesign`,
      name: "Webdesign & nieuwe website",
      description: "Professioneel webdesign voor MKB, inclusief SEO en AVG-compliance.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@id": `${SITE_URL}/#localbusiness` },
      url: `${SITE_URL}/webdesign`,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-hosting`,
      name: "Webhosting",
      description: "Snelle en veilige Nederlandse hosting met SSL en e-mail.",
      provider: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/hosting`,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-seo`,
      name: "SEO & vindbaarheid",
      description: "Lokale en nationale zoekmachineoptimalisatie.",
      provider: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/seo`,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-avg`,
      name: "AVG-compliance & privacy",
      description: "AVG-check, privacybeleid, cookiebanner en compliance trajecten.",
      provider: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/avg`,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-thai-web`,
      name: "Thaise webdiensten",
      description: "Websites in Thai, Nederlands en Engels voor Thaise ondernemers wereldwijd.",
      provider: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/thai`,
    },
    {
      "@type": "Offer",
      "@id": `${SITE_URL}/#offer-avg-fix`,
      name: "AVG-compliance fix",
      description: "Basis AVG-compliance pakket voor uw website.",
      price: "69.99",
      priceCurrency: "EUR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/avg`,
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  ]);

  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" hrefLang="nl" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="th" href={`${SITE_URL}/thai`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Allesis",
              description: "Webdesign bureau in Haarlem voor het MKB — hosting, SEO en AVG-compliance.",
              url: "https://allesis.nl",
              email: "info@allesis.nl",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Haarlem",
                addressRegion: "Noord-Holland",
                addressCountry: "NL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 52.3873878,
                longitude: 4.6462194,
              },
              priceRange: "€0 - €€€",
              openingHours: "Mo-Fr 09:00-17:00",
              sameAs: ["https://www.savedsouls-foundation.org/nl"],
              knowsLanguage: ["nl", "en", "th"],
              areaServed: "Nederland",
              serviceType: ["Webdesign", "SEO", "AVG-compliance", "Hosting", "Thaise webdiensten"],
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-lato text-lg antialiased">
        <BreadcrumbAuto />
        <MainNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
