import type { Metadata } from "next";
import type { BrancheConfig } from "@/components/branche/BranchePageLayout";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

const ACCENT = {
  blue: "#1a3bcc",
  orchid: "#C2449F",
  amber: "#d97706",
  green: "#16a34a",
  cyan: "#0891b2",
  violet: "#7c3aed",
  stone: "#78716c",
} as const;

export type BrancheEntry = {
  slug: string;
  metadata: Metadata;
  config: BrancheConfig;
};

function meta(
  path: string,
  title: string,
  description: string,
  ogTitle: string,
  ogDescription: string,
  keywords?: string[]
): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: pageAlternates(path),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${SITE_URL}${path}`,
      locale: "nl_NL",
      type: "website",
    },
  };
}

export const BRANCHES: Record<string, BrancheEntry> = {
  horeca: {
    slug: "horeca",
    metadata: meta(
      "/horeca",
      "Website voor horeca & restaurants",
      "7,5 miljoen Nederlanders zoeken maandelijks naar restaurants. Staat u bovenaan? Allesis bouwt horecasites die converteren. Gratis one-pager beschikbaar.*",
      "Website voor horeca & restaurants",
      "7,5 miljoen Nederlanders zoeken maandelijks naar restaurants. Staat u bovenaan? Allesis bouwt horecasites die converteren.",
      ["website horeca", "restaurant website laten maken", "horecawebsite Haarlem", "online menu restaurant"]
    ),
    config: {
      eyebrow: "🍽️ Branche · Horeca & restaurants",
      headlineLead: "Uw restaurant.",
      headlineAccent: "Altijd gevonden.",
      intro: "7,5 miljoen zoekopdrachten per maand naar restaurants. Staat u bovenaan?",
      accent: "#ea580c",
      heroFoto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=75",
      heroGradient: "from-orange-900 via-orange-800/80 to-orange-700/20",
      featuresHeading: "Wat zit er in uw horecawebsite?",
      featuresOverlay: "from-orange-900/90 via-orange-900/50 to-transparent",
      features: [
        {
          icon: "🍽️",
          title: "Online menu",
          desc: "Digitaal menu dat u zelf aanpast. Altijd actueel, ook op mobiel.",
          foto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70",
        },
        {
          icon: "📅",
          title: "Reserveringssysteem",
          desc: "Integratie met OpenTable, Formitable of eigen formulier.",
          foto: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=70",
        },
        {
          icon: "🗺️",
          title: "Google Maps & openingstijden",
          desc: "Automatisch gesynchroniseerd met Google My Business.",
          foto: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=70",
        },
        {
          icon: "⭐",
          title: "Google reviews integratie",
          desc: "Toon uw beste reviews automatisch op uw site.",
          foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
        },
        {
          icon: "📸",
          title: "Foto galerie",
          desc: "Sfeervolle fotogalerie van uw gerechten en interieur.",
          foto: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=70",
        },
        {
          icon: "🔒",
          title: "AVG-compliant",
          desc: "Privacybeleid, cookiebanner en SSL standaard inbegrepen.",
          foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
        },
      ],
      faqGradient: "from-orange-900/95 via-orange-900/80 to-orange-800/60",
      faq: [
        {
          vraag: "Hoe lang duurt het bouwen van een horecawebsite?",
          antwoord:
            "Een gratis one-pager staat binnen 24 uur online**. Een volledige horecawebsite met reserveringssysteem duurt gemiddeld 2-3 weken.",
          foto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70",
        },
        {
          vraag: "Kan ik mijn menu zelf aanpassen?",
          antwoord:
            "Ja. U krijgt toegang tot een eenvoudig CMS waarmee u menu-items, prijzen en foto's zelf kunt aanpassen. Geen technische kennis nodig.",
          foto: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=70",
        },
        {
          vraag: "Werkt de website ook op mobiel?",
          antwoord:
            "Absoluut. Meer dan 70% van restaurantbezoekers zoekt op mobiel. Uw site is volledig mobielvriendelijk en snel.",
          foto: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=70",
        },
        {
          vraag: "Wat is de gratis one-pager precies?",
          antwoord:
            "Een professionele enkelvoudige pagina met uw naam, menu, contactgegevens en een SSF-donatie link. Bouw gratis, hosting v.a. €8,95/mnd.*",
          foto: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=70",
        },
      ],
      ctaTitle: "Klaar voor meer gasten?",
      ctaText: "Vraag vandaag uw horecawebsite aan. Snel online — vanaf 24 uur**. Gratis one-pager ook beschikbaar.*",
      pakketSlug: "horeca",
      mockup: {
        url: "restaurant-dehaven.nl",
        foto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70",
        kicker: "Restaurant De Haven · Haarlem",
        heading: "Verse vis. Elke dag.",
        sub: "Open di–zo vanaf 17:00",
        primaryPill: "Reserveren",
        secondaryPill: "Bekijk menu",
        overlayClass: "bg-orange-900/75",
        mutedClass: "text-orange-200/70",
        pillClass: "bg-orange-500",
        tiles: [
          { icon: "🍷", label: "Wijnkaart" },
          { icon: "📅", label: "Reserveren" },
          { icon: "⭐", label: "Reviews" },
        ],
      },
    },
  },

  beauty: {
    slug: "beauty",
    metadata: meta(
      "/beauty",
      "Website voor beauty & schoonheidssalons",
      "Online afspraken, behandelmenu en voor & na foto's. Allesis bouwt salonwebsites die volboeking opleveren. Gratis one-pager beschikbaar.*",
      "Website voor beauty & schoonheidssalons",
      "Online afspraken, behandelmenu en voor & na foto's. Allesis bouwt salonwebsites die volboeking opleveren.",
      ["website schoonheidssalon", "beauty salon website", "online afspraken salon"]
    ),
    config: {
      eyebrow: "💆 Branche · Beauty & schoonheidssalons",
      headlineLead: "Uw salon.",
      headlineAccent: "Altijd volgeboekt.",
      intro:
        "Klanten boeken het liefst online, op elk moment van de dag. Met een strakke salonwebsite met online agenda vult u uw week automatisch — zonder telefoontjes.",
      accent: ACCENT.orchid,
      heroFoto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=75",
      heroGradient: "from-pink-900 via-pink-800/80 to-purple-700/20",
      featuresHeading: "Wat zit er in uw salonwebsite?",
      featuresOverlay: "from-pink-900/90 via-pink-900/50 to-transparent",
      features: [
        {
          icon: "📅",
          title: "Online afspraken",
          desc: "Klanten boeken direct in uw agenda. 24/7 beschikbaar.",
          foto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=70",
        },
        {
          icon: "💅",
          title: "Behandelmenu",
          desc: "Overzichtelijk menu van al uw behandelingen met prijzen.",
          foto: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=70",
        },
        {
          icon: "📸",
          title: "Voor & na foto's",
          desc: "Laat resultaten zien die nieuwe klanten overtuigen.",
          foto: "https://images.unsplash.com/photo-1487412947147-5cebf100d293?w=600&q=70",
        },
        {
          icon: "⭐",
          title: "Reviews & testimonials",
          desc: "Tevreden klanten zijn uw beste reclame.",
          foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
        },
        {
          icon: "🎁",
          title: "Cadeaubonnen",
          desc: "Verkoop cadeaubonnen direct via uw website.",
          foto: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=70",
        },
        {
          icon: "🔒",
          title: "AVG-compliant",
          desc: "Privacybeleid, cookiebanner en SSL standaard inbegrepen.",
          foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
        },
      ],
      faqGradient: "from-pink-900/95 via-pink-900/80 to-pink-800/60",
      faq: [
        {
          vraag: "Kunnen klanten online een afspraak boeken?",
          antwoord:
            "Ja. Wij integreren een online boeking systeem in uw website. Klanten boeken direct in uw agenda, 24/7.",
          foto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=70",
        },
        {
          vraag: "Hoe toon ik mijn behandelingen en prijzen?",
          antwoord:
            "Via een overzichtelijk behandelmenu dat u zelf kunt aanpassen. Met foto's, beschrijvingen en prijzen per behandeling.",
          foto: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=70",
        },
        {
          vraag: "Kan ik voor & na foto's tonen?",
          antwoord:
            "Absoluut. Een interactieve before/after galerij laat uw resultaten zien en overtuigt nieuwe klanten.",
          foto: "https://images.unsplash.com/photo-1487412947147-5cebf100d293?w=600&q=70",
        },
        {
          vraag: "Wat kost een salonwebsite?",
          antwoord:
            "Gratis one-pager beschikbaar* of Starter pakket vanaf €199. Maatwerk op aanvraag. Hosting v.a. €8,95/mnd.",
          foto: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=70",
        },
      ],
      ctaTitle: "Klaar voor een volle agenda?",
      ctaText: "Vraag vandaag uw salonwebsite aan. Snel online — vanaf 24 uur**. Gratis one-pager ook beschikbaar.*",
      pakketSlug: "beauty",
      mockup: {
        url: "salon-bloom.nl",
        foto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=70",
        kicker: "Salon Bloom · Haarlem",
        heading: "Stralen begint hier.",
        sub: "Ma–za · online te boeken",
        primaryPill: "Afspraak maken",
        secondaryPill: "Behandelingen",
        overlayClass: "bg-pink-900/75",
        mutedClass: "text-pink-200/70",
        pillClass: "bg-pink-500",
        tiles: [
          { icon: "💆", label: "Behandelmenu" },
          { icon: "📅", label: "Boeken" },
          { icon: "🎁", label: "Cadeaubon" },
        ],
      },
    },
  },

  bouw: {
    slug: "bouw",
    metadata: meta(
      "/bouw",
      "Website voor bouwbedrijven & vakmensen",
      "Portfolio, offerte-aanvraag en werkgebied kaart. Allesis bouwt bouwwebsites die opdrachtgevers overtuigen. Gratis one-pager beschikbaar.*",
      "Website voor bouwbedrijven & vakmensen",
      "Portfolio, offerte-aanvraag en werkgebied kaart. Allesis bouwt bouwwebsites die opdrachtgevers overtuigen.",
      ["website bouwbedrijf", "aannemer website laten maken", "website loodgieter", "bouwwebsite Haarlem"]
    ),
    config: {
      eyebrow: "🔨 Branche · Bouwbedrijven & vakmensen",
      headlineLead: "Uw vakmanschap.",
      headlineAccent: "Online bewezen.",
      intro:
        "Klanten zoeken online naar bouwers. Staat u er niet? Dan gaan ze naar uw concurrent. Allesis bouwt bouwwebsites die opdrachtgevers overtuigen.",
      accent: ACCENT.amber,
      heroFoto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=75",
      heroGradient: "from-amber-900 via-amber-800/80 to-amber-700/20",
      featuresHeading: "Wat zit er in uw bouwwebsite?",
      featuresSub: "Alles wat een bouwbedrijf nodig heeft — direct inbegrepen.",
      featuresOverlay: "from-amber-900/90 via-amber-900/50 to-transparent",
      features: [
        {
          icon: "📸",
          title: "Portfolio met foto's",
          desc: "Laat afgeronde projecten zien met sfeervolle foto's.",
          foto: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=70",
        },
        {
          icon: "🗺️",
          title: "Werkgebied kaart",
          desc: "Toon in welke regio's u actief bent.",
          foto: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=70",
        },
        {
          icon: "⭐",
          title: "Referenties",
          desc: "Reviews en aanbevelingen van tevreden opdrachtgevers.",
          foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
        },
        {
          icon: "📋",
          title: "Offerte-aanvraag",
          desc: "Duidelijk formulier zodat klanten direct een offerte vragen.",
          foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
        },
        {
          icon: "📞",
          title: "Direct bellen",
          desc: "Klik-om-te-bellen knop, prominent op mobiel.",
          foto: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=70",
        },
        {
          icon: "🔒",
          title: "AVG-compliant",
          desc: "Privacybeleid, cookiebanner en SSL standaard inbegrepen.",
          foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
        },
      ],
      faqGradient: "from-amber-900/95 via-amber-900/80 to-amber-800/60",
      faq: [
        {
          vraag: "Hoe lang duurt het bouwen van een bouwwebsite?",
          antwoord:
            "Een gratis one-pager staat binnen 24 uur online**. Een volledige bouwwebsite met portfolio duurt gemiddeld 2-4 weken.",
          foto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=70",
        },
        {
          vraag: "Kan ik mijn projectfoto's zelf uploaden?",
          antwoord:
            "Ja. Via het CMS voegt u eenvoudig nieuwe projecten en foto's toe. Uw portfolio blijft altijd actueel.",
          foto: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=70",
        },
        {
          vraag: "Hoe werkt de offerte-aanvraag?",
          antwoord:
            "Bezoekers vullen een formulier in met hun wensen. U ontvangt direct een e-mail notificatie en kunt direct reageren.",
          foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
        },
        {
          vraag: "Is de website AVG-compliant?",
          antwoord:
            "Ja. Allesis levert standaard privacybeleid, cookiebanner en SSL mee. Volledig klaar voor de AVG/GDPR wetgeving.",
          foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
        },
      ],
      ctaTitle: "Klaar voor meer opdrachten?",
      ctaText: "Vraag vandaag uw bouwwebsite aan. Snel online — vanaf 24 uur**. Gratis one-pager ook beschikbaar.*",
      pakketSlug: "bouw",
      mockup: {
        url: "vanderbergbouw.nl",
        foto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=70",
        kicker: "Van der Berg Bouw · Haarlem",
        heading: "Vakwerk sinds 1998.",
        sub: "Verbouw · renovatie · onderhoud",
        primaryPill: "Offerte aanvragen",
        secondaryPill: "Ons werk",
        overlayClass: "bg-amber-900/75",
        mutedClass: "text-amber-200/70",
        pillClass: "bg-amber-500",
        tiles: [
          { icon: "🏗️", label: "Projecten" },
          { icon: "🗺️", label: "Werkgebied" },
          { icon: "⭐", label: "Reviews" },
        ],
      },
    },
  },

  zorg: {
    slug: "zorg",
    metadata: meta(
      "/zorg",
      "Website voor zorg & coaches | Allesis Haarlem",
      "Rustige, vertrouwenwekkende websites voor zorgverleners, therapeuten en coaches. Afsprakensysteem, GDPR-compliant. Vanaf €199 of gratis one-pager.*",
      "Website voor zorg & coaches | Allesis",
      "Vertrouwenwekkende websites voor zorgverleners en coaches, volledig AVG-proof."
    ),
    config: {
      eyebrow: "🏥 Branche · Zorg & coaches",
      headlineLead: "Uw praktijk.",
      headlineAccent: "Vertrouwen online.",
      intro:
        "In de zorg draait alles om vertrouwen. Een rustige, professionele website met een helder aanbod en makkelijke afspraakmogelijkheid zet de juiste toon.",
      accent: ACCENT.cyan,
      heroFoto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=75",
      heroGradient: "from-cyan-900 via-cyan-800/80 to-teal-700/20",
      featuresHeading: "Wat zit er in uw zorgwebsite?",
      featuresOverlay: "from-cyan-900/90 via-cyan-900/50 to-transparent",
      features: [
        {
          icon: "📅",
          title: "Afsprakensysteem",
          desc: "Cliënten boeken direct online een afspraak.",
          foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70",
        },
        {
          icon: "👤",
          title: "Over de praktijk",
          desc: "Persoonlijke kennismaking schept vertrouwen.",
          foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=70",
        },
        {
          icon: "📋",
          title: "Intakeformulier",
          desc: "Nieuwe cliënten vullen gegevens vooraf in.",
          foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
        },
        {
          icon: "🔒",
          title: "AVG & privacy",
          desc: "Extra streng AVG-beleid voor zorgpraktijken.",
          foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
        },
        {
          icon: "⭐",
          title: "Reviews",
          desc: "Tevreden cliënten overtuigen nieuwe bezoekers.",
          foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
        },
        {
          icon: "📱",
          title: "Mobielvriendelijk",
          desc: "Cliënten vinden u eenvoudig op hun telefoon.",
          foto: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=70",
        },
      ],
      faqGradient: "from-cyan-900/95 via-cyan-900/80 to-cyan-800/60",
      faq: [
        {
          vraag: "Is de website geschikt voor gevoelige medische gegevens?",
          antwoord:
            "Ja. Wij bouwen zorgwebsites met extra streng AVG-beleid. Intakeformulieren en afspraken worden veilig verwerkt.",
          foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70",
        },
        {
          vraag: "Kunnen cliënten online een afspraak maken?",
          antwoord:
            "Ja. Wij integreren een afsprakensysteem dat aansluit op uw agenda. Cliënten boeken direct online.",
          foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=70",
        },
        {
          vraag: "Hoe toon ik mijn specialisaties?",
          antwoord:
            "Via een overzichtelijke dienstenpagina met uw specialisaties, werkwijze en tarieven. Duidelijk en vertrouwenwekkend.",
          foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
        },
        {
          vraag: "Is de website mobielvriendelijk?",
          antwoord:
            "Absoluut. Cliënten zoeken vaak op mobiel. Uw site laadt snel en ziet er perfect uit op elk apparaat.",
          foto: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=70",
        },
      ],
      ctaTitle: "Klaar voor meer cliënten?",
      ctaText: "Vraag vandaag uw zorgwebsite aan. Snel online — vanaf 24 uur**. Gratis one-pager ook beschikbaar.*",
      pakketSlug: "zorg",
      mockup: {
        url: "praktijk-rust.nl",
        foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70",
        kicker: "Praktijk Rust · Haarlem",
        heading: "Ruimte om te herstellen.",
        sub: "Coaching · therapie · begeleiding",
        primaryPill: "Plan een intake",
        secondaryPill: "Werkwijze",
        overlayClass: "bg-cyan-900/75",
        mutedClass: "text-cyan-200/70",
        pillClass: "bg-cyan-500",
        tiles: [
          { icon: "📅", label: "Afspraak" },
          { icon: "📋", label: "Aanbod" },
          { icon: "💬", label: "Ervaringen" },
        ],
      },
    },
  },

  zzp: {
    slug: "zzp",
    metadata: meta(
      "/zzp",
      "Website voor ZZP'ers & freelancers | Allesis Haarlem",
      "Snelle, betaalbare websites voor ZZP'ers en freelancers. Portfolio, diensten, tarieven en contact. Online in een dag. Vanaf €199 of gratis one-pager.*",
      "Website voor ZZP'ers & freelancers | Allesis",
      "Professioneel online in een dag: portfolio, diensten, tarieven en contact."
    ),
    config: {
      eyebrow: "💼 Branche · ZZP'ers & freelancers",
      headlineLead: "Uw bedrijf.",
      headlineAccent: "Online in een dag.",
      intro:
        "Als ZZP'er bent u uw eigen visitekaartje. Een professionele one-pager met uw diensten en tarieven maakt direct indruk — en is gratis beschikbaar.*",
      accent: ACCENT.blue,
      heroFoto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=75",
      heroGradient: "from-blue-900 via-blue-800/80 to-indigo-700/20",
      featuresHeading: "Wat zit er in uw ZZP-website?",
      featuresOverlay: "from-blue-900/90 via-blue-900/50 to-transparent",
      features: [
        {
          icon: "💼",
          title: "Portfolio",
          desc: "Laat uw beste werk zien en overtuig potentiële klanten.",
          foto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70",
        },
        {
          icon: "💰",
          title: "Tarievenpagina",
          desc: "Transparante prijzen wekken vertrouwen.",
          foto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",
        },
        {
          icon: "✉️",
          title: "Contactformulier",
          desc: "Opdrachtgevers nemen direct contact op.",
          foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
        },
        {
          icon: "⭐",
          title: "Referenties",
          desc: "Aanbevelingen van tevreden opdrachtgevers.",
          foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
        },
        {
          icon: "🔍",
          title: "SEO-geoptimaliseerd",
          desc: "Gevonden worden op uw vakgebied in Google.",
          foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=70",
        },
        {
          icon: "🔒",
          title: "AVG-compliant",
          desc: "Privacybeleid, cookiebanner en SSL inbegrepen.",
          foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
        },
      ],
      faqGradient: "from-blue-900/95 via-blue-900/80 to-blue-800/60",
      faq: [
        {
          vraag: "Hoe snel kan mijn ZZP-website online staan?",
          antwoord:
            "Een gratis one-pager staat binnen 24 uur online** bij tijdige aanlevering van uw logo en tekst.",
          foto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70",
        },
        {
          vraag: "Kan ik mijn portfolio zelf bijhouden?",
          antwoord:
            "Ja. Via een eenvoudig CMS voegt u zelf nieuwe projecten, foto's en referenties toe.",
          foto: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=70",
        },
        {
          vraag: "Wat is het verschil tussen gratis en betaald?",
          antwoord:
            "Gratis = one-pager met SSF-donatielink en Allesis-branding*. Betaald = meerdere pagina's, eigen stijl, geen branding.",
          foto: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",
        },
        {
          vraag: "Word ik gevonden in Google?",
          antwoord:
            "Ja. Alle websites van Allesis worden SEO-geoptimaliseerd opgeleverd. U wordt gevonden op uw naam en vakgebied.",
          foto: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=70",
        },
      ],
      ctaTitle: "Klaar om online te gaan?",
      ctaText: "Vraag vandaag uw ZZP-website aan. Gratis one-pager beschikbaar, online binnen 24 uur.**",
      pakketSlug: "zzp",
      mockup: {
        url: "jouwnaam.nl",
        foto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70",
        kicker: "Jouw Naam · Freelance",
        heading: "Ik help u verder.",
        sub: "Beschikbaar voor nieuwe opdrachten",
        primaryPill: "Neem contact op",
        secondaryPill: "Portfolio",
        overlayClass: "bg-blue-900/75",
        mutedClass: "text-blue-200/70",
        pillClass: "bg-blue-500",
        tiles: [
          { icon: "🎯", label: "Portfolio" },
          { icon: "🧰", label: "Diensten" },
          { icon: "💶", label: "Tarieven" },
        ],
      },
    },
  },

  "non-profit": {
    slug: "non-profit",
    metadata: meta(
      "/non-profit",
      "Website voor non-profits & stichtingen | Allesis Haarlem",
      "Websites voor stichtingen en non-profits: missie, donaties, impact en vrijwilligers. Vanaf €199 of gratis one-pager.*",
      "Website voor non-profits | Allesis",
      "Meer impact online: missie, donaties en verhalen die raken."
    ),
    config: {
      eyebrow: "❤️ Branche · Non-profit & stichtingen",
      headlineLead: "Uw missie.",
      headlineAccent: "Meer impact online.",
      intro:
        "Donateurs en vrijwilligers zoeken u online. Een heldere website met uw missie, impact en een makkelijke donatieknop maakt het verschil.",
      accent: ACCENT.green,
      heroFoto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=75",
      heroGradient: "from-green-900 via-green-800/80 to-emerald-700/20",
      featuresHeading: "Wat zit er in uw non-profit website?",
      featuresOverlay: "from-green-900/90 via-green-900/50 to-transparent",
      features: [
        {
          icon: "❤️",
          title: "Donatieformulier",
          desc: "Donateurs geven direct via uw website.",
          foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=70",
        },
        {
          icon: "👥",
          title: "Vrijwilligers werven",
          desc: "Aanmeldformulier voor nieuwe vrijwilligers.",
          foto: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=70",
        },
        {
          icon: "📰",
          title: "Nieuws & updates",
          desc: "Houd donateurs op de hoogte van uw werk.",
          foto: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=70",
        },
        {
          icon: "📸",
          title: "Foto galerie",
          desc: "Toon de impact van uw werk in beeld.",
          foto: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=70",
        },
        {
          icon: "🤝",
          title: "Partners & sponsors",
          desc: "Toon uw samenwerkingspartners prominent.",
          foto: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=70",
        },
        {
          icon: "🔒",
          title: "AVG-compliant",
          desc: "Privacybeleid, cookiebanner en SSL inbegrepen.",
          foto: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=70",
        },
      ],
      ctaTitle: "Klaar voor meer impact?",
      ctaText: "Vraag vandaag uw non-profit website aan. Snel online — vanaf 24 uur**. Gratis one-pager ook beschikbaar.*",
      pakketSlug: "non-profit",
      mockup: {
        url: "stichting-impact.nl",
        foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=70",
        kicker: "Stichting Impact · Nederland",
        heading: "Samen maken we verschil.",
        sub: "Doneren · vrijwilligen · meedoen",
        primaryPill: "Doneer nu",
        secondaryPill: "Onze missie",
        overlayClass: "bg-green-900/75",
        mutedClass: "text-emerald-200/70",
        pillClass: "bg-emerald-500",
        tiles: [
          { icon: "💚", label: "Doneren" },
          { icon: "🙋", label: "Vrijwilligen" },
          { icon: "📸", label: "Impact" },
        ],
      },
    },
  },

  webshop: {
    slug: "webshop",
    metadata: meta(
      "/webshop",
      "Website & webshop laten maken | Allesis Haarlem",
      "Webshops en e-commerce sites: productpagina's, betaalintegratie, SEO. Vanaf €199 of gratis one-pager.*",
      "Webshop & e-commerce | Allesis",
      "Meer omzet online: snelle webshops die verkopen."
    ),
    config: {
      eyebrow: "🛒 Branche · Webshops & e-commerce",
      headlineLead: "Uw webshop.",
      headlineAccent: "Meer omzet online.",
      intro:
        "Een snelle, betrouwbare webshop die eruitziet als uw merk — met betalen, voorraad en SEO die werkt. Allesis bouwt shops die verkopen.",
      accent: ACCENT.violet,
      heroFoto: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=75",
      heroGradient: "from-violet-900 via-violet-800/80 to-purple-700/20",
      featuresHeading: "Wat zit er in uw webshop?",
      features: [
        { icon: "🛍️", title: "Productcatalogus", desc: "Overzichtelijke productpagina's met foto's en prijzen." },
        { icon: "💳", title: "Betaalintegratie", desc: "iDEAL, creditcard en meer via Mollie of vergelijkbaar." },
        { icon: "📦", title: "Voorraad & verzending", desc: "Duidelijke flow van bestelling tot bezorging." },
        { icon: "📱", title: "Mobiel-first", desc: "De meeste aankopen gebeuren op de telefoon — uw shop ook." },
        { icon: "🔍", title: "SEO-basis", desc: "Vindbaar in Google vanaf de eerste dag." },
        { icon: "🔒", title: "AVG & SSL", desc: "Privacybeleid, cookiebanner en veilige checkout." },
      ],
      ctaTitle: "Klaar voor meer omzet?",
      ctaText: "Vraag vandaag uw webshop aan. Snel online — vanaf 24 uur**. Gratis one-pager ook beschikbaar.*",
      pakketSlug: "webshop",
      mockup: {
        url: "shop-example.nl",
        foto: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=70",
        kicker: "Shop Example · Haarlem",
        heading: "Nieuwe collectie.",
        sub: "Gratis verzending vanaf €50",
        primaryPill: "Shop nu",
        secondaryPill: "Collectie",
        overlayClass: "bg-violet-900/75",
        mutedClass: "text-violet-200/70",
        pillClass: "bg-violet-500",
        tiles: [
          { icon: "🛍️", label: "Producten" },
          { icon: "💳", label: "Afrekenen" },
          { icon: "⭐", label: "Reviews" },
        ],
      },
    },
  },

  tandarts: {
    slug: "tandarts",
    metadata: meta(
      "/tandarts",
      "Website voor tandartsen & huisartsen | Allesis Haarlem",
      "Praktijkwebsites voor tandartsen en huisartsen: afspraken, team, behandelingen. AVG-proof. Vanaf €199 of gratis one-pager.*",
      "Website voor tandartsen & huisartsen | Allesis",
      "Patiënten vinden u: afspraken, team en behandelingen online."
    ),
    config: {
      eyebrow: "🦷 Branche · Tandartsen & huisartsen",
      headlineLead: "Uw praktijk.",
      headlineAccent: "Patiënten vinden u.",
      intro:
        "Nieuwe patiënten zoeken online naar een praktijk bij hen in de buurt. Een rustige, betrouwbare website met online afspraken maakt het verschil.",
      accent: ACCENT.cyan,
      heroFoto: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=75",
      heroGradient: "from-cyan-900 via-sky-800/80 to-blue-700/20",
      featuresHeading: "Wat zit er in uw praktijkwebsite?",
      features: [
        { icon: "📅", title: "Online afspraken", desc: "Patiënten plannen zelf een afspraak of intake." },
        { icon: "👨‍⚕️", title: "Team & specialismen", desc: "Stel uw team en behandelingen voor." },
        { icon: "📍", title: "Locatie & bereikbaarheid", desc: "Kaart, parkeren en openingstijden helder." },
        { icon: "📋", title: "Behandelingen", desc: "Duidelijke uitleg van wat u aanbiedt." },
        { icon: "🔐", title: "AVG-proof", desc: "Zorgvuldige omgang met patiëntgegevens." },
        { icon: "🔒", title: "SSL & privacybeleid", desc: "Veilige verbinding en compleet privacybeleid." },
      ],
      ctaTitle: "Klaar voor meer patiënten?",
      ctaText: "Vraag vandaag uw praktijkwebsite aan. Snel online — vanaf 24 uur**. Gratis one-pager ook beschikbaar.*",
      pakketSlug: "tandarts",
      mockup: {
        url: "praktijk-glimlach.nl",
        foto: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=70",
        kicker: "Praktijk Glimlach · Haarlem",
        heading: "Welkom in onze praktijk.",
        sub: "Ma–vr · online afspraak maken",
        primaryPill: "Afspraak maken",
        secondaryPill: "Behandelingen",
        overlayClass: "bg-sky-900/75",
        mutedClass: "text-sky-200/70",
        pillClass: "bg-sky-500",
        tiles: [
          { icon: "📅", label: "Afspraak" },
          { icon: "👨‍⚕️", label: "Team" },
          { icon: "📍", label: "Locatie" },
        ],
      },
    },
  },

  vastgoed: {
    slug: "vastgoed",
    metadata: meta(
      "/vastgoed",
      "Website voor vastgoed & makelaars | Allesis Haarlem",
      "Makelaar- en vastgoedwebsites: objecten, zoeken, contact. Vanaf €199 of gratis one-pager.*",
      "Website voor vastgoed & makelaars | Allesis",
      "Uw panden online gepresenteerd: objecten, foto's en leads."
    ),
    config: {
      eyebrow: "🏠 Branche · Vastgoed & makelaars",
      headlineLead: "Uw panden.",
      headlineAccent: "Online gepresenteerd.",
      intro:
        "Kopers en huurders beginnen online. Een strakke vastgoedwebsite met objecten, foto's en een duidelijk contactformulier levert betere leads.",
      accent: ACCENT.stone,
      heroFoto: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=75",
      heroGradient: "from-stone-900 via-stone-800/80 to-amber-700/20",
      featuresHeading: "Wat zit er in uw vastgoedwebsite?",
      features: [
        { icon: "🏡", title: "Objectoverzicht", desc: "Panden met foto's, prijs en kenmerken." },
        { icon: "🔍", title: "Zoeken & filteren", desc: "Bezoekers vinden snel het juiste object." },
        { icon: "📸", title: "Fotogalerie", desc: "Grote, sfeervolle beelden die verkopen." },
        { icon: "📬", title: "Bezichtiging aanvragen", desc: "Formulier dat leads direct naar u stuurt." },
        { icon: "🗺️", title: "Kaart & buurt", desc: "Locatie en omgeving in één oogopslag." },
        { icon: "🔒", title: "AVG-compliant", desc: "Privacybeleid, cookiebanner en SSL standaard inbegrepen." },
      ],
      ctaTitle: "Klaar voor meer bezichtigingen?",
      ctaText: "Vraag vandaag uw vastgoedwebsite aan. Snel online — vanaf 24 uur**. Gratis one-pager ook beschikbaar.*",
      pakketSlug: "vastgoed",
      mockup: {
        url: "makelaar-haarlem.nl",
        foto: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70",
        kicker: "Makelaar Haarlem",
        heading: "Uw volgende adres.",
        sub: "Koop · huur · taxatie",
        primaryPill: "Bekijk objecten",
        secondaryPill: "Contact",
        overlayClass: "bg-stone-900/75",
        mutedClass: "text-stone-200/70",
        pillClass: "bg-stone-500",
        tiles: [
          { icon: "🏡", label: "Objecten" },
          { icon: "🔍", label: "Zoeken" },
          { icon: "📬", label: "Bezichtiging" },
        ],
      },
    },
  },
};
