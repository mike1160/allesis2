import type { Metadata } from "next";
import BrancheHero from "@/components/BrancheHero";
import FAQGrid from "@/components/FAQGrid";
import BrancheCTA from "@/components/BrancheCTA";
import FeatureGrid from "@/components/FeatureGrid";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Website voor advocaten & juridisch | Allesis Haarlem",
  description: "Professionele websites voor advocaten en juridische kantoren met expertisepagina's, intakeformulieren en strenge AVG.",
  alternates: pageAlternates("/advocaat"),
  openGraph: {
    title: "Advocaten | Allesis",
    description: "Wek vertrouwen en genereer leads met een professionele juridische website.",
    url: `${SITE_URL}/advocaat`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function AdvocaatPage() {
  return (
    <main>
      <BrancheHero
        eyebrow="⚖️ Branche · Advocaten & juridisch"
        title="Uw praktijk."
        titleAccent="Professioneel online."
        description="Cliënten zoeken online naar juridische hulp. Een betrouwbare, professionele website wekt vertrouwen en genereert leads."
        foto="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=75"
        gradient="from-slate-900 via-slate-800/80 to-slate-700/20"
      />
      <FeatureGrid
        titel="Wat zit er in uw juridische website?"
        gradient="from-slate-900/90 via-slate-900/50 to-transparent"
        features={[
          {
            icon: "⚖️",
            titel: "Expertisepagina's",
            beschrijving: "Duidelijk overzicht van uw rechtsgebieden en specialisaties.",
            foto: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=70",
          },
          {
            icon: "👤",
            titel: "Team & profielen",
            beschrijving: "Professionele presentatie van advocaten en medewerkers.",
            foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=70",
          },
          {
            icon: "📋",
            titel: "Intakeformulier",
            beschrijving: "Cliënten beschrijven hun situatie vooraf online.",
            foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
          },
          {
            icon: "📰",
            titel: "Blog & kennisbank",
            beschrijving: "Juridische artikelen versterken uw autoriteit in Google.",
            foto: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=70",
          },
          {
            icon: "🔒",
            titel: "Extra streng AVG",
            beschrijving: "Juridische kantoren hebben extra AVG-verplichtingen. Wij regelen het.",
            foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
          },
          {
            icon: "⭐",
            titel: "Reviews & cases",
            beschrijving: "Anonieme succesverhalen wekken vertrouwen bij nieuwe cliënten.",
            foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
          },
        ]}
      />
      <FAQGrid
        gradient="from-slate-900/95 via-slate-900/80 to-slate-800/60"
        items={[
          {
            vraag: "Is een advocatenwebsite AVG-compliant?",
            antwoord: "Ja. Juridische kantoren hebben extra AVG-verplichtingen. Wij leveren volledig compliant op.",
            foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
          },
          {
            vraag: "Kan ik blogartikelen plaatsen?",
            antwoord: "Ja. Een kennisbank met juridische artikelen versterkt uw SEO en autoriteit.",
            foto: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=70",
          },
          {
            vraag: "Is er een gratis optie?",
            antwoord: "Ja. Gratis one-pager beschikbaar met SSF-donatie link en Allesis-branding.*",
            foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=70",
          },
          {
            vraag: "Wat kost een juridische website?",
            antwoord: "Starter vanaf €199 eenmalig. Maatwerk op aanvraag. Hosting v.a. €8,95/mnd.",
            foto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",
          },
        ]}
      />
      <BrancheCTA branche="advocaat" />
    </main>
  );
}
