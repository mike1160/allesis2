import type { Metadata } from "next";
import BrancheHero from "@/components/BrancheHero";
import FAQGrid from "@/components/FAQGrid";
import BrancheCTA from "@/components/BrancheCTA";
import FeatureGrid from "@/components/FeatureGrid";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Website voor vastgoed & makelaars | Allesis Haarlem",
  description:
    "Professionele websites voor vastgoed en makelaars met woningpresentatie, plattegronden, contactformulieren en lokale SEO.",
  alternates: pageAlternates("/vastgoed"),
  openGraph: {
    title: "Vastgoed & makelaars | Allesis",
    description: "Presenteer panden professioneel online en genereer meer leads.",
    url: `${SITE_URL}/vastgoed`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function VastgoedPage() {
  return (
    <main>
      <BrancheHero
        eyebrow="🏠 Branche · Vastgoed & makelaars"
        title="Uw panden."
        titleAccent="Online gepresenteerd."
        description="Kopers en huurders zoeken online. Een professionele website met mooie foto's, plattegronden en contactformulier maakt het verschil."
        foto="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
        gradient="from-stone-900 via-stone-800/80 to-stone-700/20"
      />
      <FeatureGrid
        titel="Wat zit er in uw vastgoedwebsite?"
        gradient="from-stone-900/90 via-stone-900/50 to-transparent"
        features={[
          {
            icon: "🏠",
            titel: "Woningpresentatie",
            beschrijving: "Prachtige fotogalerijen per woning of pand.",
            foto: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
          },
          {
            icon: "📐",
            titel: "Plattegronden",
            beschrijving: "Overzichtelijke plattegronden bij elk object.",
            foto: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
          },
          {
            icon: "📞",
            titel: "Direct contact",
            beschrijving: "Bezoekers nemen direct contact op via formulier of telefoon.",
            foto: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
          },
          {
            icon: "🔍",
            titel: "Lokale SEO",
            beschrijving: 'Gevonden worden op "makelaar [stad]" in Google.',
            foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
          },
          {
            icon: "⭐",
            titel: "Reviews & referenties",
            beschrijving: "Tevreden klanten zijn uw beste visitekaartje.",
            foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
          },
          {
            icon: "🔒",
            titel: "AVG-compliant",
            beschrijving: "Privacybeleid, cookiebanner en SSL standaard inbegrepen.",
            foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
          },
        ]}
      />
      <FAQGrid
        gradient="from-stone-900/95 via-stone-900/80 to-stone-800/60"
        items={[
          {
            vraag: "Kan ik zelf objecten toevoegen?",
            antwoord: "Ja. Via het CMS voegt u eenvoudig nieuwe woningen, foto's en details toe.",
            foto: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
          },
          {
            vraag: "Werkt de site ook op mobiel?",
            antwoord: "Absoluut. Kopers zoeken vaak op telefoon. Uw site is volledig mobielvriendelijk.",
            foto: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
          },
          {
            vraag: "Is er een gratis optie?",
            antwoord: "Ja. Gratis one-pager beschikbaar met SSF-donatie link en Allesis-branding.*",
            foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
          },
          {
            vraag: "Wat kost een vastgoedwebsite?",
            antwoord: "Starter vanaf €199 eenmalig. Maatwerk op aanvraag. Hosting v.a. €8,95/mnd.",
            foto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
          },
        ]}
      />
      <BrancheCTA branche="vastgoed" />
    </main>
  );
}
