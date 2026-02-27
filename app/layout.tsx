import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://allesis.nl"),
  title: {
    default: "Allesis | Webhosting, Domeinen & Thais-Nederlands Vertaling",
    template: "%s | Allesis.nl",
  },
  description: "Allesis.nl biedt webhosting, domeinregistratie, webdesign, SEO en Thais-Nederlands-Engels vertaal- en tolkdiensten voor MKB en particulieren. Gevestigd in Haarlem.",
  keywords: ["webhosting", "domeinregistratie", "webdesign", "SEO", "Thais vertaling", "tolk", "BOSIET", "offshore tolk", "hosting nederland", "allesis"],
  authors: [{ name: "Allesis", url: "https://allesis.nl" }],
  creator: "Allesis",
  publisher: "Allesis",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://allesis.nl",
    siteName: "Allesis.nl",
    title: "Allesis | Webhosting, Domeinen & Thais-Nederlands Vertaling",
    description: "Webhosting, domeinregistratie, webdesign, SEO en Thais-Nederlands vertaalservice voor MKB en particulieren.",
  },
  twitter: {
    card: "summary",
    title: "Allesis.nl — Hosting, Domeinen & Vertaling",
    description: "Webhosting, domeinregistratie, webdesign, SEO en Thais-Nederlands vertaalservice.",
  },
  alternates: { canonical: "https://allesis.nl" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
        {/* JSON-LD Structured Data voor Google & AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://allesis.nl/#business",
                  name: "Allesis",
                  url: "https://allesis.nl",
                  email: "info@allesis.nl",
                  description: "Webhosting, domeinregistratie, webdesign, SEO en Thais-Nederlands-Engels vertaal- en tolkdiensten voor MKB en particulieren.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Haarlem",
                    addressCountry: "NL",
                  },
                  areaServed: ["NL", "BE", "Worldwide"],
                  foundingDate: "2010",
                  knowsLanguage: ["nl", "th", "en"],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Allesis diensten",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webhosting", description: "Webhosting pakketten vanaf €8,95/mnd" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Domeinregistratie", description: "Domeinregistratie voor .nl, .com, .net en meer" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thais-Nederlands vertaling", description: "Professionele vertaal- en tolkdiensten Thais-Nederlands-Engels, specialist BOSIET offshore" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webdesign & SEO", description: "Professioneel webdesign met SEO optimalisatie" } },
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
            }),
          }}
        />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
