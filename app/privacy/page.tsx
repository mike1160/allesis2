import type { Metadata } from "next";
import Link from "next/link";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Privacyverklaring (AVG)",
  description:
    "Privacyverklaring van Allesis: hoe wij persoonsgegevens verwerken volgens de AVG. Webdesignbureau Haarlem — info@allesis.nl",
  alternates: pageAlternates("/privacy"),
  openGraph: {
    title: "Privacyverklaring | Allesis",
    description: "AVG-conforme privacyverklaring van Allesis.nl",
    url: `${SITE_URL}/privacy`,
    locale: "nl_NL",
    type: "website",
  },
};

const sections: { titel: string; body: string[] }[] = [
  {
    titel: "1. Wie is verantwoordelijk?",
    body: [
      "Allesis is verantwoordelijk voor de verwerking van uw persoonsgegevens zoals beschreven in deze privacyverklaring.",
      "Contact: info@allesis.nl · Gevestigd te Haarlem, Nederland · KvK-nummer: 52339831.",
      "Wij zijn een webdesign- en digitaal bureau: onder meer websites, hosting, domeinen, SEO en AVG-diensten.",
    ],
  },
  {
    titel: "2. Welke gegevens verwerken wij?",
    body: [
      "Via contact-, offerte- en bestelformulieren: onder meer naam, e-mailadres, telefoonnummer en de door u ingevulde toelichting.",
      "Indien u een account aanmaakt: accountgegevens zoals e-mailadres en naam zoals door u opgegeven.",
      "Technische gegevens: IP-adres en browsergegevens (o.a. voor beveiliging, analytics en hostinglogs), voor zover noodzakelijk en rechtmatig.",
      "Cookies en vergelijkbare technieken: zie ons cookiebeleid op de pagina Disclaimer & privacy waar van toepassing.",
    ],
  },
  {
    titel: "3. Waarvoor gebruiken wij uw gegevens?",
    body: [
      "Het beantwoorden van vragen en het uitvoeren van offertes en opdrachten (uitvoering van een overeenkomst of voorbereiding daarvan).",
      "Het verzenden van de nieuwsbrief, uitsluitend als u daarvoor toestemming heeft gegeven.",
      "Het voldoen aan wettelijke verplichtingen (zoals administratie en belasting).",
      "Het waarborgen van de veiligheid en het voorkomen van misbruik van onze website en formulieren (gerechtvaardigd belang).",
    ],
  },
  {
    titel: "4. Grondslagen (AVG)",
    body: [
      "Toestemming: bijvoorbeeld voor de nieuwsbrief en waar wij u expliciet om toestemming vragen.",
      "Uitvoering van een overeenkomst: wanneer u een dienst afneemt of een aanvraag doet.",
      "Gerechtvaardigd belang: bijvoorbeeld beperkte analytics, beveiliging en het verbeteren van onze dienstverlening, zonder uw belangen te schenden.",
      "Wettelijke verplichting: waar de wet dat van ons verlangt.",
    ],
  },
  {
    titel: "5. Bewaartermijnen",
    body: [
      "Formulier- en correspondentiegegevens bewaren wij zolang nodig is voor de afhandeling van uw verzoek en daarna gedurende de wettelijke of fiscale bewaartermijn indien van toepassing.",
      "Nieuwsbriefgegevens tot u zich uitschrijft of toestemming intrekt.",
      "Daarna verwijderen of anonimiseren wij gegevens, tenzij langere bewaring wettelijk verplicht is.",
    ],
  },
  {
    titel: "6. Delen met derden",
    body: [
      "Wij verkopen uw gegevens niet. Wij delen gegevens alleen met verwerkers die wij nodig hebben voor onze dienstverlening, zoals hostingprovider, e-maildienst (voor het versturen van berichten), analytics- of beveiligingstools, en betaal- of boekhoudpartijen indien van toepassing.",
      "Met deze partijen sluiten wij waar nodig verwerkersovereenkomsten af conform de AVG.",
      "Buiten de EU: alleen als daarvoor een passende waarborg bestaat (bijv. adequaatheidsbesluit of standaardcontractbepalingen).",
    ],
  },
  {
    titel: "7. Uw rechten",
    body: [
      "U heeft recht op inzage, correctie en verwijdering van uw persoonsgegevens, op beperking van de verwerking, op dataportabiliteit (waar van toepassing) en om bezwaar te maken tegen verwerking op basis van gerechtvaardigd belang.",
      "Heeft u toestemming gegeven, dan kunt u deze te allen tijde intrekken zonder afbreuk aan eerdere rechtmatigheid.",
      "Klacht indienen kan bij de Autoriteit Persoonsgegevens (www.autoriteitpersoonsgegevens.nl).",
      "Voor uitoefening van uw rechten: stuur een e-mail naar info@allesis.nl. Wij reageren binnen de wettelijke termijn.",
    ],
  },
  {
    titel: "8. Beveiliging",
    body: [
      "Wij nemen passende technische en organisatorische maatregelen om misbruik, verlies en onbevoegde toegang tot persoonsgegevens te voorkomen.",
    ],
  },
  {
    titel: "9. Wijzigingen",
    body: [
      "Wij kunnen deze privacyverklaring aanpassen. De actuele versie staat altijd op allesis.nl/privacy. Bij ingrijpende wijzigingen informeren wij u waar dat nodig is.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SubpageHero
        eyebrow="AVG / Privacy"
        title="Privacyverklaring"
        subtitle="Allesis respecteert uw privacy. Deze verklaring legt uit hoe wij omgaan met persoonsgegevens in lijn met de Algemene verordening gegevensbescherming (AVG / GDPR)."
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          {sections.map((s) => (
            <PremiumCard key={s.titel} className="!p-6">
              <h2 className="font-sora text-lg font-bold text-neutral-dark">{s.titel}</h2>
              {s.body.map((p, i) => (
                <p key={`${s.titel}-${i}`} className="font-lato mt-3 text-[15px] leading-relaxed text-neutral-mid">
                  {p}
                </p>
              ))}
            </PremiumCard>
          ))}

          <p className="font-lato pt-6 text-center text-sm text-neutral-mid">
            Vragen?{" "}
            <a href="mailto:info@allesis.nl" className="font-semibold text-primary hover:underline">
              info@allesis.nl
            </a>
            {" · "}
            <Link href="/disclaimer" className="font-semibold text-primary hover:underline">
              Disclaimer &amp; overige juridische teksten
            </Link>
          </p>
        </div>
      </Reveal>
    </>
  );
}
