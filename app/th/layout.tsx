import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: {
    default: "เว็บไซต์คุณภาพยุโรปสำหรับภูเก็ต | European Web Design Phuket — Allesis",
    template: "%s | Allesis Phuket",
  },
  description:
    "European-quality Next.js websites for Phuket businesses — Thai, English, Dutch, Russian & German. Garages, restaurants, spas, clinics, schools & real estate. Fast, Google-ready, LINE & WhatsApp. เว็บไซต์ Next.js สำหรับธุรกิจในภูเก็ต — เร็ว ปลอดภัย พบได้ใน Google",
  keywords: [
    "website Phuket",
    "web design Phuket",
    "Next.js Phuket",
    "restaurant website Phuket",
    "spa website Phuket",
    "garage website Phuket",
    "clinic website Phuket",
    "real estate website Phuket",
    "web design Patong",
    "website Kata Phuket",
    "website Chalong",
    "เว็บไซต์ภูเก็ต",
    "ทำเว็บไซต์ภูเก็ต",
    "เว็บไซต์ร้านอาหาร ภูเก็ต",
    "เว็บไซต์สปา ภูเก็ต",
    "เว็บไซต์อู่ซ่อมรถ ภูเก็ต",
    "เว็บไซต์คลินิก ภูเก็ต",
    "เว็บไซต์อสังหาริมทรัพย์ ภูเก็ต",
    "รับทำเว็บไซต์ ภูเก็ต",
    "SEO ภูเก็ต",
    "Allesis Phuket",
  ],
  alternates: {
    canonical: `${SITE_URL}/th`,
    languages: {
      th: `${SITE_URL}/th?lang=th`,
      en: `${SITE_URL}/th?lang=en`,
      nl: `${SITE_URL}/th?lang=nl`,
      ru: `${SITE_URL}/th?lang=ru`,
      de: `${SITE_URL}/th?lang=de`,
      "x-default": `${SITE_URL}/th`,
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US", "nl_NL", "ru_RU", "de_DE"],
    url: `${SITE_URL}/th`,
    siteName: "Allesis",
    title: "European Web Design for Phuket — Allesis",
    description:
      "Fast Next.js websites for Phuket businesses. Thai · English · Dutch · Russian · German. Found on Google.",
  },
  twitter: {
    card: "summary_large_image",
    title: "European Web Design for Phuket — Allesis",
    description: "Next.js websites for garages, restaurants, spas, clinics, schools & real estate in Phuket.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/th#webpage`,
      url: `${SITE_URL}/th`,
      name: "European Web Design for Phuket — Allesis",
      description:
        "Next.js websites for Phuket businesses in Thai, English, Dutch, Russian and German.",
      inLanguage: ["th", "en", "nl", "ru", "de"],
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/th#service` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/th#service`,
      name: "Web design for Phuket businesses",
      alternateName: "รับทำเว็บไซต์ภูเก็ต",
      description:
        "European-quality Next.js websites for local businesses in Phuket and surrounding areas — mobile-first, multilingual, Google-ready, LINE & WhatsApp.",
      provider: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/th`,
      areaServed: [
        { "@type": "City", name: "Phuket" },
        { "@type": "Place", name: "Patong" },
        { "@type": "Place", name: "Kata" },
        { "@type": "Place", name: "Karon" },
        { "@type": "Place", name: "Chalong" },
        { "@type": "Place", name: "Rawai" },
        { "@type": "Place", name: "Phuket Town" },
        { "@type": "Place", name: "Thalang" },
        { "@type": "AdministrativeArea", name: "Phang Nga" },
        { "@type": "AdministrativeArea", name: "Krabi" },
        { "@type": "Country", name: "Thailand" },
      ],
      serviceType: [
        "Web design",
        "SEO",
        "Multilingual websites",
        "WordPress to Next.js migration",
      ],
      availableLanguage: ["Thai", "English", "Dutch", "Russian", "German"],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "THB",
        lowPrice: "15000",
        highPrice: "45000",
        offerCount: "3",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/th#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you build websites for businesses in Phuket?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Allesis builds European-quality Next.js websites for garages, restaurants, spas, clinics, schools and real estate agents in Phuket and nearby areas — in Thai, English and more.",
          },
        },
        {
          "@type": "Question",
          name: "ทำเว็บไซต์สำหรับธุรกิจในภูเก็ตไหม?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ใช่ Allesis สร้างเว็บไซต์ Next.js คุณภาพยุโรปสำหรับอู่ซ่อมรถ ร้านอาหาร สปา คลินิก โรงเรียน และอสังหาริมทรัพย์ในภูเก็ตและพื้นที่ใกล้เคียง — ภาษาไทย อังกฤษ และอื่นๆ",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Allesis in Thailand?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Contact via LINE, WhatsApp or the form on https://allesis.nl/th — reply within 1 business day.",
          },
        },
      ],
    },
  ],
};

export default function ThLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
