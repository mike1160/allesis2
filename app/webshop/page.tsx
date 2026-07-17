import type { Metadata } from "next";
import BrancheHero from "@/components/BrancheHero";
import FAQGrid from "@/components/FAQGrid";
import BrancheCTA from "@/components/BrancheCTA";
import FeatureGrid from "@/components/FeatureGrid";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Website & webshop laten maken | Allesis Haarlem",
  description: "Webshops en e-commerce websites met snelle checkout, veilig betalen, voorraadbeheer, SEO en AVG-compliance.",
  alternates: pageAlternates("/webshop"),
  openGraph: {
    title: "Webshops | Allesis",
    description: "Een professionele webshop gebouwd om online te verkopen.",
    url: `${SITE_URL}/webshop`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function WebshopPage() {
  return (
    <main>
      <BrancheHero
        eyebrow="🛒 Branche · Webshops & e-commerce"
        title="Uw webshop."
        titleAccent="Meer omzet online."
        description="Een professionele webshop met snelle checkout, veilig betalen en goede SEO. Gebouwd om te verkopen."
        foto="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=75"
        gradient="from-violet-900 via-violet-800/80 to-violet-700/20"
      />
      <FeatureGrid
        titel="Wat zit er in uw webshop?"
        gradient="from-violet-900/90 via-violet-900/50 to-transparent"
        features={[
          {
            icon: "🛒",
            titel: "Producten & categorieën",
            beschrijving: "Overzichtelijke productpagina's met foto's en varianten.",
            foto: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=70",
          },
          {
            icon: "💳",
            titel: "Veilig betalen",
            beschrijving: "iDEAL, creditcard en meer via Mollie integratie.",
            foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=70",
          },
          {
            icon: "📦",
            titel: "Voorraadbeheer",
            beschrijving: "Automatisch bijhouden van voorraad per product.",
            foto: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=70",
          },
          {
            icon: "🔍",
            titel: "E-commerce SEO",
            beschrijving: "Gevonden worden op productnamen en categorieën.",
            foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=70",
          },
          {
            icon: "📱",
            titel: "Mobiel winkelen",
            beschrijving: "Meer dan 60% koopt op mobiel. Uw shop is volledig geoptimaliseerd.",
            foto: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=70",
          },
          {
            icon: "🔒",
            titel: "AVG & beveiliging",
            beschrijving: "SSL, privacybeleid en cookiebanner standaard inbegrepen.",
            foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
          },
        ]}
      />
      <FAQGrid
        gradient="from-violet-900/95 via-violet-900/80 to-violet-800/60"
        items={[
          {
            vraag: "Welke betaalmethoden zijn mogelijk?",
            antwoord: "iDEAL, creditcard, PayPal en meer via Mollie — de meest gebruikte betaalprovider in Nederland.",
            foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=70",
          },
          {
            vraag: "Kan ik zelf producten toevoegen?",
            antwoord: "Ja. Via het CMS voegt u eenvoudig producten, foto's en prijzen toe.",
            foto: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=70",
          },
          {
            vraag: "Is er een gratis optie voor webshops?",
            antwoord: "Een gratis one-pager is mogelijk, maar een webshop heeft meer functionaliteit nodig. Starter vanaf €199.",
            foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=70",
          },
          {
            vraag: "Hoe lang duurt het bouwen van een webshop?",
            antwoord: "Een eenvoudige webshop is binnen 4 weken live. Grotere shops met veel producten kunnen meer tijd vragen.",
            foto: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=70",
          },
        ]}
      />
      <BrancheCTA branche="webshop" />
    </main>
  );
}
