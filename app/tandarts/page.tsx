import type { Metadata } from "next";
import BrancheHero from "@/components/BrancheHero";
import FAQGrid from "@/components/FAQGrid";
import BrancheCTA from "@/components/BrancheCTA";
import FeatureGrid from "@/components/FeatureGrid";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Website voor tandartsen & huisartsen | Allesis Haarlem",
  description: "Praktijkwebsites voor tandartsen en huisartsen met online afspraken, behandelingen, bereikbaarheid en medische AVG.",
  alternates: pageAlternates("/tandarts"),
  openGraph: {
    title: "Tandartsen & huisartsen | Allesis",
    description: "Zorg dat patiënten uw praktijk online vinden en eenvoudig contact opnemen.",
    url: `${SITE_URL}/tandarts`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function TandartsPage() {
  return (
    <main>
      <BrancheHero
        eyebrow="🦷 Branche · Tandartsen & huisartsen"
        title="Uw praktijk."
        titleAccent="Patiënten vinden u."
        description="Patiënten zoeken online naar een tandarts of huisarts in hun buurt. Een professionele website met online afspraken maakt het verschil."
        foto="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=75"
        gradient="from-cyan-900 via-cyan-800/80 to-cyan-700/20"
      />
      <FeatureGrid
        titel="Wat zit er in uw praktijkwebsite?"
        gradient="from-cyan-900/90 via-cyan-900/50 to-transparent"
        features={[
          {
            icon: "📅",
            titel: "Online afspraken",
            beschrijving: "Patiënten boeken direct een afspraak via uw website.",
            foto: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=70",
          },
          {
            icon: "👨‍⚕️",
            titel: "Team & specialisaties",
            beschrijving: "Professionele presentatie van uw zorgteam.",
            foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=70",
          },
          {
            icon: "📋",
            titel: "Behandelingen overzicht",
            beschrijving: "Duidelijk overzicht van alle behandelingen en tarieven.",
            foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70",
          },
          {
            icon: "🗺️",
            titel: "Locatie & bereikbaarheid",
            beschrijving: "Google Maps, parkeerinformatie en openingstijden.",
            foto: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=70",
          },
          {
            icon: "🔒",
            titel: "Medische AVG",
            beschrijving: "Extra strenge AVG voor medische praktijken — wij regelen alles.",
            foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
          },
          {
            icon: "⭐",
            titel: "Google reviews",
            beschrijving: "Tevreden patiënten automatisch getoond op uw site.",
            foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
          },
        ]}
      />
      <FAQGrid
        gradient="from-cyan-900/95 via-cyan-900/80 to-cyan-800/60"
        items={[
          {
            vraag: "Voldoet de website aan medische AVG?",
            antwoord: "Ja. Wij hebben ervaring met medische praktijken en leveren volledig AVG-compliant op inclusief verwerkersovereenkomst.",
            foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
          },
          {
            vraag: "Kunnen patiënten online afspraken maken?",
            antwoord: "Ja. Wij integreren een afsprakensysteem dat aansluit op uw agenda.",
            foto: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=70",
          },
          {
            vraag: "Is er een gratis optie?",
            antwoord: "Ja. Gratis one-pager beschikbaar met SSF-donatie link en Allesis-branding.*",
            foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=70",
          },
          {
            vraag: "Wat kost een praktijkwebsite?",
            antwoord: "Starter vanaf €199 eenmalig. Maatwerk op aanvraag. Hosting v.a. €8,95/mnd.",
            foto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",
          },
        ]}
      />
      <BrancheCTA branche="tandarts" />
    </main>
  );
}
