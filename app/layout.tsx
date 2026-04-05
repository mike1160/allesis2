import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BreadcrumbAuto from "@/components/seo/BreadcrumbAuto";
import { GLOBAL_KEYWORDS, ORGANIZATION_SAME_AS, SITE_URL } from "@/lib/seo-config";

const defaultTitle = "Allesis — Webdesign Haarlem | Hosting, SEO & AVG";
const defaultDescription =
  "Jouw digitale partner in Haarlem: webdesign, hosting, SEO en AVG-compliance. Ook Thaise websites, vertaling Thai–Nederlands–Engels en tolkdiensten. AVG-fix vanaf €69,99 ex btw.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Allesis — Webdesign Haarlem",
  },
  description: defaultDescription,
  keywords: [...GLOBAL_KEYWORDS],
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
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
    siteName: "Allesis",
    locale: "nl_NL",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Allesis",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        image: `${SITE_URL}/logo.svg`,
        email: "info@allesis.nl",
        description:
          "Full-service digitaal bureau in Haarlem: webdesign, hosting, SEO, AVG-compliance en Thaise web- en taaldiensten.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Haarlem",
          addressRegion: "Noord-Holland",
          addressCountry: "NL",
        },
        knowsLanguage: ["nl", "en", "th"],
        areaServed: [
          { "@type": "Country", name: "Nederland" },
          { "@type": "Country", name: "Thailand" },
          { "@type": "Place", name: "Worldwide" },
        ],
        sameAs: [...ORGANIZATION_SAME_AS],
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@allesis.nl",
          contactType: "customer service",
          areaServed: ["NL", "Worldwide"],
          availableLanguage: ["Dutch", "English", "Thai"],
        },
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${SITE_URL}/#localbusiness`,
        name: "Allesis",
        url: SITE_URL,
        image: `${SITE_URL}/logo.svg`,
        description: "Webdesign, hosting, SEO en AVG bureau in Haarlem — persoonlijk en all-in-one.",
        email: "info@allesis.nl",
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Haarlem",
          addressRegion: "Noord-Holland",
          addressCountry: "NL",
        },
        areaServed: ["Haarlem", "Amsterdam", "Alkmaar", "Noord-Holland", "Nederland"],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
        knowsLanguage: ["nl", "en", "th"],
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Allesis.nl",
        inLanguage: ["nl-NL", "en", "th"],
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/domeinen?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
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
        "@type": "Service",
        "@id": `${SITE_URL}/#service-thai-translation`,
        name: "Thai–Nederlands–Engels vertaling",
        description: "Professionele vertaling en lokalisatie Thai ↔ Nederlands ↔ Engels.",
        provider: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/vertaling`,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-interpretation`,
        name: "Tolkdiensten Thai / Nederlands / Engels",
        description: "Zakelijke en persoonlijke tolkdiensten.",
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
    ],
  };

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-lato text-lg antialiased">
        <BreadcrumbAuto />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
