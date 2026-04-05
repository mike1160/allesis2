import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://allesis.nl"),
  title: {
    default: "Allesis | Webdesign, Hosting & AVG-advies voor MKB — Haarlem",
    template: "%s | Allesis.nl",
  },
  description:
    "Allesis verzorgt professioneel webdesign, snelle hosting en AVG-compliance voor het MKB. Nieuwe website nodig? Wij regelen alles — van domein tot privacybeleid. Gevestigd in Haarlem.",
  keywords: [
    "webdesign Haarlem",
    "nieuwe website laten maken",
    "website laten bouwen MKB",
    "webhosting Nederland",
    "AVG regelgeving website",
    "AVG boetes",
    "privacybeleid website verplicht",
    "hosting MKB",
    "domeinregistratie Nederland",
    "Thais vertaling",
    "BOSIET tolk",
  ],
  authors: [{ name: "Allesis", url: "https://allesis.nl" }],
  creator: "Allesis",
  publisher: "Allesis",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "Allesis | Webdesign, Hosting & AVG-advies voor MKB",
    description:
      "Professioneel webdesign, hosting en AVG-compliance voor het MKB. Gevestigd in Haarlem.",
    url: "https://allesis.nl",
    siteName: "Allesis",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Allesis | Webdesign, Hosting & AVG-advies — Haarlem",
    description:
      "Webdesign, webhosting en AVG-compliance voor het MKB. Nieuwe website laten maken? Wij regelen het van domein tot privacybeleid.",
  },
  alternates: { canonical: "https://allesis.nl" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://allesis.nl/#business",
        name: "Allesis",
        url: "https://allesis.nl",
        logo: "https://allesis.nl/logo.png",
        image: "https://allesis.nl/logo.png",
        description:
          "Professioneel webdesign, hosting en AVG-compliance voor het MKB. Gevestigd in Haarlem.",
        email: "info@allesis.nl",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Haarlem",
          addressCountry: "NL",
        },
        areaServed: ["NL", "BE", "Worldwide"],
        serviceType: ["Webdesign", "Webhosting", "AVG Compliance", "Domeinregistratie"],
        sameAs: [] as string[],
        foundingDate: "2010",
        knowsLanguage: ["nl", "th", "en"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Allesis diensten",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webdesign & SEO", description: "Professioneel webdesign met SEO en AVG-compliance" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webhosting", description: "Webhosting pakketten voor MKB, Nederland" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Domeinregistratie", description: "Domeinregistratie voor .nl, .com, .net en meer" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AVG-compliance", description: "Privacybeleid, cookiebanner en verwerkersovereenkomst voor uw website" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thais-Nederlands vertaling", description: "Professionele vertaal- en tolkdiensten Thais-Nederlands-Engels, specialist BOSIET offshore" } },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://allesis.nl/#website",
        url: "https://allesis.nl",
        name: "Allesis.nl",
        inLanguage: "nl-NL",
        publisher: { "@id": "https://allesis.nl/#business" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://allesis.nl/domeinen?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-lato text-lg antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
