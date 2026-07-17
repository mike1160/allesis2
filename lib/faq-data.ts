import type { FaqItem } from "@/lib/json-ld";
import type { FAQGridItem } from "@/components/FAQGrid";

/** Homepage FAQ als foto-grid — ook bron voor JSON-LD. */
export const HOME_FAQ_GRID: FAQGridItem[] = [
  {
    vraag: "Wat doet Allesis?",
    antwoord:
      "Allesis is een digitaal bureau in Haarlem voor het MKB. Wij bouwen websites, leveren hosting, verbeteren SEO en zorgen voor AVG-compliance — vaak alles via één aanspreekpunt.",
    foto: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    vraag: "Hoe lang duurt het bouwen van een website?",
    antwoord:
      "Een gratis one-pager kan vanaf 24 uur** online zijn bij tijdige aanlevering van content en logo. Maatwerk is meestal binnen vier weken live.",
    foto: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
  {
    vraag: "Wat kost een AVG-compliant website?",
    antwoord:
      "Een nieuwe website is op maat geprijsd. AVG-inrichting is standaard onderdeel van onze oplevering. Een losse AVG-fix voor bestaande sites start vanaf €69,99 excl. btw.",
    foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
  },
  {
    vraag: "Biedt Allesis ook hosting en SEO aan?",
    antwoord:
      "Ja. Allesis levert Nederlandse hosting vanaf €8,95 per maand excl. btw en SEO-trajecten op maat voor lokale en landelijke vindbaarheid.",
    foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
  },
  {
    vraag: "Wat is de gratis one-pager precies?",
    antwoord:
      "Een professionele enkelvoudige pagina met uw bedrijfsinfo, contactformulier en SSF-donatie link. Bouw gratis, hosting v.a. €8,95/mnd. Zie voorwaarden.*",
    foto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    vraag: "Werkt Allesis ook voor Thaise ondernemers?",
    antwoord:
      "Ja. Wij bouwen websites in Thai, Nederlands en Engels en bieden vertaling en tolkdiensten voor ondernemers in Nederland en internationaal.",
    foto: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
  },
];

/** FAQ-items per pagina — gedeeld tussen zichtbare sectie en JSON-LD. */
export const HOME_FAQ: FaqItem[] = HOME_FAQ_GRID.map((item) => ({
  question: item.vraag,
  answer: item.antwoord,
}));

export const WEBDESIGN_FAQ: FaqItem[] = [
  {
    question: "Hoe lang duurt het bouwen van een website?",
    answer:
      "Een gratis one-pager kan vanaf 24 uur** online zijn bij tijdige aanlevering van content en logo. Maatwerk duurt gemiddeld vier weken; complexere projecten kunnen meer tijd vragen.",
  },
  {
    question: "Wat kost een nieuwe website bij Allesis?",
    answer:
      "Prijzen zijn maatwerk en afhankelijk van scope, design en functionaliteit. Na een korte intake ontvangt u een vrijblijvende offerte met vaste afspraken.",
  },
  {
    question: "Is elke website AVG-compliant?",
    answer:
      "Ja. Allesis levert standaard privacybeleid, cookie-inrichting en technische basismaatregelen mee, zodat uw site voldoet aan de AVG/GDPR.",
  },
  {
    question: "Bouwt Allesis met Next.js?",
    answer:
      "Ja. Wij werken met modern framework Next.js voor snelle, schaalbare websites die goed scoren op performance en SEO.",
  },
  {
    question: "Kan ik later zelf content aanpassen?",
    answer:
      "Dat hangt af van het gekozen CMS of beheeromgeving. Tijdens oplevering leggen wij uit hoe u teksten en afbeeldingen zelf kunt bijwerken.",
  },
];

export const HOSTING_FAQ: FaqItem[] = [
  {
    question: "Waar staat de hosting van Allesis?",
    answer:
      "De hosting draait in Nederlandse datacenters voor lage latency en betrouwbaarheid voor Nederlandse bezoekers.",
  },
  {
    question: "Wat kost webhosting bij Allesis?",
    answer:
      "Pakketten starten vanaf €4,95 per maand excl. btw (Lite). Prijzen worden jaarlijks gefactureerd; zie allesis.nl/hosting voor actuele pakketten.",
  },
  {
    question: "Zit een SSL-certificaat inbegrepen?",
    answer:
      "Ja. Elk hostingpakket bevat een SSL-certificaat voor een beveiligde HTTPS-verbinding.",
  },
  {
    question: "Kan ik mijn bestaande domeinnaam meenemen?",
    answer:
      "Ja. U kunt een bestaand domein laten verhuizen of DNS door ons laten beheren; wij helpen bij de technische overstap.",
  },
  {
    question: "Is er helpdesk bij problemen?",
    answer:
      "Ja. Alle pakketten omvatten helpdesk-ondersteuning bij hosting-, e-mail- of SSL-vragen.",
  },
];

export const SEO_FAQ: FaqItem[] = [
  {
    question: "Wat houdt SEO bij Allesis in?",
    answer:
      "SEO omvat technische optimalisatie, zoekwoordenonderzoek, on-page structuur, lokale vindbaarheid en monitoring via Google Search Console.",
  },
  {
    question: "Hoe snel zie ik SEO-resultaat?",
    answer:
      "Eerste verbeteringen in indexering en rankings zijn vaak binnen enkele weken zichtbaar; structureel resultaat vraagt meestal drie tot zes maanden doorlopend werk.",
  },
  {
    question: "Doen jullie ook lokale SEO?",
    answer:
      "Ja. Wij optimaliseren voor regionale zoekopdrachten, Google Bedrijfsprofiel en consistente bedrijfsgegevens (NAP) op uw site.",
  },
  {
    question: "Is SEO relevant voor AI-zoekmachines?",
    answer:
      "Ja. Duidelijke contentstructuur, schema markup en snelle sites helpen ook bij AI-overzichten zoals Google AI Overviews, ChatGPT en Perplexity.",
  },
  {
    question: "Wat kost SEO bij Allesis?",
    answer:
      "SEO is maatwerk via maandelijkse trajecten. Na een korte intake ontvangt u een voorstel op basis van uw markt en concurrentie.",
  },
];

export const AVG_FAQ: FaqItem[] = [
  {
    question: "Is mijn website verplicht AVG-proof?",
    answer:
      "Ja, zodra u persoonsgegevens verwerkt (formulieren, nieuwsbrief, analytics) moet u kunnen aantonen dat u aan de AVG voldoet met onder meer informatie aan bezoekers en een rechtmatige grondslag.",
  },
  {
    question: "Wat kost een AVG-fix?",
    answer:
      "Het instappakket start vanaf €69,99 excl. btw voor kleinere sites. Grotere of complexe websites ontvangen een offerte na scan.",
  },
  {
    question: "Hoe snel is mijn site compliant?",
    answer:
      "Vaak binnen enkele werkdagen na akkoord, afhankelijk van uw CMS, analytics-tools en het aantal integraties.",
  },
  {
    question: "Wat zit er in het AVG-instappakket?",
    answer:
      "Privacy- en cookiebeleid, cookiebanner-instellingen, formuliertransparantie en concrete technische aanbevelingen voor analytics en embeds.",
  },
  {
    question: "Is er een gratis AVG-check?",
    answer:
      "Ja. Via allesis.nl/avg-check voert u een gratis eerste scan uit op veelvoorkomende privacy- en cookieproblemen.",
  },
];
