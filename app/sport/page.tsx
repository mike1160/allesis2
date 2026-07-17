import type { Metadata } from "next";
import BrancheHero from "@/components/BrancheHero";
import FAQGrid from "@/components/FAQGrid";
import BrancheCTA from "@/components/BrancheCTA";
import FeatureGrid from "@/components/FeatureGrid";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Website voor sportclubs & fitness | Allesis Haarlem",
  description: "Moderne websites voor sportclubs en fitnesscentra met ledenwerving, schema's, nieuws en AVG-compliance.",
  alternates: pageAlternates("/sport"),
  openGraph: {
    title: "Sport & fitness | Allesis",
    description: "Meer leden online met een snelle website voor uw club of fitnesscentrum.",
    url: `${SITE_URL}/sport`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function SportPage() {
  return (
    <main>
      <BrancheHero
        eyebrow="⚽ Branche · Sport & fitness"
        title="Uw club."
        titleAccent="Meer leden online."
        description="Nieuwe leden zoeken online naar sportclubs en fitnesscentra. Een moderne website met schema's, inschrijfformulier en nieuws maakt het makkelijk."
        foto="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
        gradient="from-lime-900 via-lime-800/80 to-lime-700/20"
      />
      <FeatureGrid
        titel="Wat zit er in uw sportwebsite?"
        gradient="from-lime-900/90 via-lime-900/50 to-transparent"
        features={[
          {
            icon: "👥",
            titel: "Ledenwerving",
            beschrijving: "Online inschrijfformulier voor nieuwe leden.",
            foto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
          },
          {
            icon: "📅",
            titel: "Trainingsschema's",
            beschrijving: "Overzichtelijke roosters en evenementen kalender.",
            foto: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800&q=80",
          },
          {
            icon: "📰",
            titel: "Nieuws & updates",
            beschrijving: "Wedstrijduitslagen, nieuws en clubberichten.",
            foto: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
          },
          {
            icon: "📸",
            titel: "Foto galerie",
            beschrijving: "Sfeervolle foto's van trainingen en wedstrijden.",
            foto: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
          },
          {
            icon: "🏆",
            titel: "Uitslagen & standen",
            beschrijving: "Actuele competitiestanden en resultaten.",
            foto: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&q=80",
          },
          {
            icon: "🔒",
            titel: "AVG-compliant",
            beschrijving: "Privacybeleid, cookiebanner en SSL inbegrepen.",
            foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
          },
        ]}
      />
      <FAQGrid
        gradient="from-lime-900/95 via-lime-900/80 to-lime-800/60"
        items={[
          {
            vraag: "Kunnen leden online inschrijven?",
            antwoord: "Ja. Via een inschrijfformulier melden nieuwe leden zich direct aan.",
            foto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
          },
          {
            vraag: "Kan ik zelf nieuws plaatsen?",
            antwoord: "Ja. Via het CMS plaatst u eenvoudig nieuws, uitslagen en foto's.",
            foto: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
          },
          {
            vraag: "Is er een gratis optie?",
            antwoord: "Ja. Gratis one-pager beschikbaar met SSF-donatie link en Allesis-branding.*",
            foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
          },
          {
            vraag: "Wat kost een sportwebsite?",
            antwoord: "Starter vanaf €199 eenmalig. Maatwerk op aanvraag. Hosting v.a. €8,95/mnd.",
            foto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
          },
        ]}
      />
      <BrancheCTA branche="sport" />
    </main>
  );
}
