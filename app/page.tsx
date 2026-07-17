import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";
import JsonLd from "@/components/seo/JsonLd";
import { HOME_FAQ } from "@/lib/faq-data";
import { buildFaqPageSchema } from "@/lib/json-ld";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Allesis — Webdesign Haarlem | Jouw digitale partner",
  description:
    "Webdesign, hosting, SEO & AVG in Haarlem. Thaise websites, vertaling Thai–NL–EN. Persoonlijk bureau voor MKB. AVG-fix vanaf €69,99 ex btw.",
  alternates: pageAlternates("/"),
  openGraph: {
    title: "Allesis — Jouw digitale partner in Haarlem",
    description:
      "Professionele websites, hosting, SEO, AVG-compliance en Thaise web- & taaldiensten. info@allesis.nl",
    url: SITE_URL,
    locale: "nl_NL",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={buildFaqPageSchema(HOME_FAQ)} />
      <HomePageContent />
    </>
  );
}
