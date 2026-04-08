import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";
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

const pakketten = [
  {
    naam: "Lite",
    prijs: "8,95",
    features: ["1.000 MB schijfruimte", "20 GB dataverkeer", "5 e-mailaccounts", "1 MySQL database", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
  {
    naam: "Start Up",
    prijs: "12,95",
    highlight: true,
    features: ["4.000 MB schijfruimte", "80 GB dataverkeer", "10 e-mailaccounts", "2 MySQL databases", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
  {
    naam: "Plus",
    prijs: "17,95",
    features: ["8.000 MB schijfruimte", "320 GB dataverkeer", "50 e-mailaccounts", "2 MySQL databases", "SSL certificaat", "Helpdesk"],
    disclaimer: "Prijzen excl. BTW. Jaarlijks gefactureerd.",
  },
];

const diensten = [
  {
    icon: "🎨",
    titel: "Webdesign",
    tekst: "Van idee tot live website in 4 weken. Modern, snel en mobielvriendelijk.",
    href: "/webdesign",
  },
  {
    icon: "🔒",
    titel: "AVG & Compliance",
    tekst: "Wij leveren elke website AVG-compliant op. Privacybeleid, cookiebanner, SSL.",
    href: "/avg-regelgeving",
  },
  {
    icon: "🌐",
    titel: "Hosting & Domeinen",
    tekst: "Snelle Nederlandse hosting vanaf €8,95/mnd. Alles onder één dak.",
    href: "/hosting",
  },
  {
    icon: "🔎",
    titel: "SEO & Vindbaarheid",
    tekst: "Gevonden worden in Google én door AI-assistenten zoals ChatGPT en Perplexity.",
    href: "/webdesign",
  },
];

const reviews = [
  {
    quote: "Dankzij Allesis staat mijn website al jaren bij de eerste 3 zoekresultaten van Google — zonder Google Adwords.",
    naam: "M. Kleinjans",
    bedrijf: "Snelontruiming",
  },
  {
    quote: "Mijn website werd geredesignd met mooie foto's, goed vindbaar op Google en alle sociale netwerken werden ook bijgehouden.",
    naam: "Runee",
    bedrijf: "Bangkokwellness",
  },
];

const renJiTags = ["Next.js", "Tailwind CSS", "AVG-compliant", "Online Boeking", "SEO"];

export default function Home() {
  return (
    <HomePageContent pakketten={pakketten} diensten={diensten} reviews={reviews} renJiTags={renJiTags} />
  );
}
