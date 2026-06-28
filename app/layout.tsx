import type { Metadata } from "next";
import "./globals.css";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import BreadcrumbAuto from "@/components/seo/BreadcrumbAuto";
import { buildSiteGraphSchema } from "@/lib/json-ld";
import { GLOBAL_KEYWORDS, SITE_URL } from "@/lib/seo-config";

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
