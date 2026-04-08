import type { Metadata } from "next";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Disclaimer & privacybeleid",
  description: "Disclaimer, privacy- en cookiebeleid van Allesis.nl — transparant over gegevensverwerking en contact.",
  alternates: pageAlternates("/disclaimer"),
  openGraph: {
    title: "Disclaimer | Allesis",
    url: `${SITE_URL}/disclaimer`,
    locale: "nl_NL",
    type: "website",
  },
};

const blokken = [
  {
    titel: "Algemeen",
    tekst: "Allesis is gevestigd in Haarlem, Nederland. Aan de informatie op deze website kunnen geen rechten worden ontleend. Allesis behoudt het recht om de inhoud van deze website op elk moment te wijzigen zonder kennisgeving.",
  },
  {
    titel: "Prijzen",
    tekst: "Alle genoemde prijzen op deze website zijn exclusief BTW (21%), tenzij anders aangegeven. Prijzen worden jaarlijks gefactureerd. Allesis behoudt het recht om prijzen te wijzigen. Wijzigingen worden minimaal 30 dagen van tevoren gecommuniceerd aan bestaande klanten.",
  },
  {
    titel: "Aansprakelijkheid",
    tekst: "Allesis is niet aansprakelijk voor schade die voortvloeit uit het gebruik van of vertrouwen op de informatie op deze website. Allesis geeft geen garanties met betrekking tot de juistheid, volledigheid of actualiteit van de informatie.",
  },
  {
    titel: "Cookiebeleid",
    tekst: "Allesis.nl maakt gebruik van functionele cookies die nodig zijn voor het correct functioneren van de website (zoals het onthouden van uw cookievoorkeur). Wij gebruiken geen tracking- of advertentiecookies. U kunt uw browserinstellingen aanpassen om cookies te weigeren.",
  },
  {
    titel: "Privacybeleid",
    tekst: "Allesis verwerkt alleen persoonsgegevens die u vrijwillig verstrekt via het contactformulier (naam en e-mailadres). Deze gegevens worden uitsluitend gebruikt voor het beantwoorden van uw vraag en worden nooit aan derden verstrekt. U heeft het recht uw gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact op via info@allesis.nl.",
  },
  {
    titel: "Intellectueel eigendom",
    tekst: "Alle content op deze website, inclusief teksten, afbeeldingen en logo's, is eigendom van Allesis of wordt gebruikt met toestemming. Niets van deze website mag worden gekopieerd of verspreid zonder schriftelijke toestemming van Allesis.",
  },
  {
    titel: "Contact",
    tekst: "Voor vragen over deze disclaimer of ons privacybeleid kunt u contact opnemen via info@allesis.nl.",
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Juridisch"
        title="Disclaimer & privacybeleid"
        subtitle={
          <p className="text-sm text-white/55">
            Laatste update: {new Date().toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        }
      />

      <Reveal className="bg-neutral-light/40 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          {blokken.map((s) => (
            <PremiumCard key={s.titel} className="!p-6">
              <h2 className="font-sora text-lg font-bold text-neutral-dark">{s.titel}</h2>
              <p className="font-lato mt-3 text-[15px] leading-relaxed text-neutral-mid">{s.tekst}</p>
            </PremiumCard>
          ))}
        </div>
      </Reveal>
    </>
  );
}
