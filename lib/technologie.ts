import {
  siNextdotjs,
  siCloudflare,
  siResend,
  siTailwindcss,
  siSupabase,
  siVercel,
  siTypescript,
  siGooglegemini,
  siAnthropic,
  siPerplexity,
  siMeta,
  type SimpleIcon,
} from "simple-icons";

export type TechGroep = "gebouwd" | "ai" | "standaard";

export const GROEP_LABEL: Record<TechGroep, string> = {
  gebouwd: "Gebouwd met",
  ai: "Vindbaar in AI",
  standaard: "Gecertificeerd",
};

export const GROEP_TITEL: Record<TechGroep, string> = {
  gebouwd: "De techniek onder uw website",
  ai: "Gevonden door AI-assistenten",
  standaard: "Standaarden, veiligheid en vindbaarheid",
};

export type Tech = {
  slug: string;
  naam: string;
  groep: TechGroep;
  icon?: SimpleIcon;
  kleur?: string;
  emoji?: string;
  /** Eén zin: wat levert het u op. */
  kort: string;
  /** Wat is het, in gewone taal. */
  watIs: string;
  voordelen: { titel: string; tekst: string }[];
  /** Hoe Allesis het inzet. */
  bijAllesis: string;
  url?: string;
};

export const TECHNOLOGIE: Tech[] = [
  // ── Gebouwd met ─────────────────────────────────────────────
  {
    slug: "nextjs",
    naam: "Next.js",
    groep: "gebouwd",
    icon: siNextdotjs,
    kleur: "#000000",
    kort: "Het moderne fundament onder uw website: razendsnel en zonder PHP-gaten.",
    watIs:
      "Next.js is een webframework van Vercel, gebouwd op React. Grote merken als Nike, Netflix en TikTok draaien erop. Pagina's worden vooraf klaargezet en direct geserveerd, in plaats van bij elk bezoek opnieuw in elkaar gezet zoals bij WordPress.",
    voordelen: [
      { titel: "Supersnel", tekst: "Pagina's staan klaar voordat de bezoeker klikt. Dat merkt uw klant én Google." },
      { titel: "Geen plugin-gedoe", tekst: "Geen tientallen plugins die elke week een update vragen of elkaar breken." },
      { titel: "Veel kleiner aanvalsoppervlak", tekst: "Geen PHP, geen wp-admin, geen database die openstaat voor inbraakpogingen." },
    ],
    bijAllesis:
      "Elke website die wij bouwen draait op Next.js. Stapt u over van WordPress, dan zetten wij uw inhoud om naar een snelle, veilige Next.js-site.",
    url: "https://nextjs.org",
  },
  {
    slug: "cloudflare",
    naam: "Cloudflare",
    groep: "gebouwd",
    icon: siCloudflare,
    kleur: "#F97316",
    kort: "Een schild en een snelweg vóór uw website en e-mail.",
    watIs:
      "Cloudflare beheert een van de grootste netwerken ter wereld. Het regelt uw DNS (het adresboek van internet), houdt aanvallen en spam-bots tegen en levert onze spambeveiliging voor formulieren (Turnstile).",
    voordelen: [
      { titel: "Aanvallen tegengehouden", tekst: "Overbelastingsaanvallen en kwaadaardig verkeer worden gestopt voordat ze uw site bereiken." },
      { titel: "Minder formulierspam", tekst: "Turnstile filtert bots zonder irritante puzzeltjes voor uw klanten." },
      { titel: "Betrouwbare DNS", tekst: "Wijzigingen zijn binnen seconden wereldwijd actief." },
    ],
    bijAllesis:
      "Wij zetten uw domein bij Cloudflare, regelen DNS, e-mailrecords en spambescherming op uw contactformulier.",
    url: "https://www.cloudflare.com",
  },
  {
    slug: "resend",
    naam: "Resend",
    groep: "gebouwd",
    icon: siResend,
    kleur: "#000000",
    kort: "Mails vanuit uw website die gewoon aankomen, niet in de spam.",
    watIs:
      "Resend is een moderne dienst voor het versturen van e-mail vanuit websites: bevestigingen van formulieren, offerte-aanvragen en meldingen.",
    voordelen: [
      { titel: "Komt aan", tekst: "Ondertekend met DKIM en SPF, dus mailproviders vertrouwen de afzender." },
      { titel: "Netjes opgemaakt", tekst: "Uw klant krijgt een verzorgde bevestiging in uw huisstijl." },
      { titel: "Inzicht", tekst: "We zien of een mail is afgeleverd, en kunnen dus snel helpen als het misgaat." },
    ],
    bijAllesis:
      "Elk contactformulier stuurt via Resend een melding naar u én een bevestiging naar uw klant, vanaf uw eigen domein.",
    url: "https://resend.com",
  },
  {
    slug: "tailwind",
    naam: "Tailwind",
    groep: "gebouwd",
    icon: siTailwindcss,
    kleur: "#06B6D4",
    kort: "Strak, consistent design dat op elk scherm klopt.",
    watIs:
      "Tailwind CSS is een manier om het uiterlijk van een website op te bouwen. Alleen de stijlen die echt gebruikt worden, komen in de site terecht.",
    voordelen: [
      { titel: "Lichte pagina's", tekst: "Geen overbodige stijlbestanden, dus snellere laadtijden." },
      { titel: "Mobiel eerst", tekst: "Elk onderdeel wordt ontworpen voor telefoon, tablet en desktop." },
      { titel: "Snel aan te passen", tekst: "Een kleur of lettertype wijzigen gaat in minuten, niet in uren." },
    ],
    bijAllesis: "Al onze ontwerpen worden met Tailwind gebouwd, op maat van uw huisstijl.",
    url: "https://tailwindcss.com",
  },
  {
    slug: "supabase",
    naam: "Supabase",
    groep: "gebouwd",
    icon: siSupabase,
    kleur: "#3ECF8E",
    kort: "Een veilige database voor inloggen, boekingen en klantgegevens.",
    watIs:
      "Supabase is een open-source database-platform (PostgreSQL) met inloggen, opslag en beveiliging per rij. Ideaal als uw website meer moet doen dan alleen informatie tonen.",
    voordelen: [
      { titel: "Inloggen voor klanten", tekst: "Een klantportaal of ledenomgeving zonder losse plugins." },
      { titel: "Beveiliging per record", tekst: "Iedere gebruiker ziet alleen zijn eigen gegevens." },
      { titel: "Data in de EU", tekst: "Opslag in een Europese regio, belangrijk voor de AVG." },
    ],
    bijAllesis:
      "Voor boekingssystemen, klantportalen en webshops gebruiken wij Supabase. Ook ‘Mijn Allesis’ draait erop.",
    url: "https://supabase.com",
  },
  {
    slug: "vercel",
    naam: "Vercel",
    groep: "gebouwd",
    icon: siVercel,
    kleur: "#000000",
    kort: "Hosting op een wereldwijd netwerk, altijd online.",
    watIs:
      "Vercel is het hostingplatform van de makers van Next.js. Uw website staat niet op één server, maar wordt vanaf tientallen locaties wereldwijd geserveerd.",
    voordelen: [
      { titel: "Geen serverbeheer", tekst: "Geen verouderde servers, geen PHP-versies, geen updates die u moet regelen." },
      { titel: "Altijd bereikbaar", tekst: "Valt één locatie uit, dan neemt een andere het direct over." },
      { titel: "Veilige updates", tekst: "Elke wijziging wordt eerst getest; terugdraaien kan met één klik." },
    ],
    bijAllesis: "Uw website draait op Vercel als onderdeel van onze zorgeloze hosting van €20 per maand ex btw.",
    url: "https://vercel.com",
  },
  {
    slug: "typescript",
    naam: "TypeScript",
    groep: "gebouwd",
    icon: siTypescript,
    kleur: "#3178C6",
    kort: "Code die fouten vangt voordat uw bezoeker ze ziet.",
    watIs:
      "TypeScript is JavaScript met een ingebouwde controle. Veel fouten worden al tijdens het bouwen gevonden in plaats van pas live op uw website.",
    voordelen: [
      { titel: "Minder bugs", tekst: "Fouten worden automatisch gesignaleerd voordat iets online gaat." },
      { titel: "Betrouwbare formulieren", tekst: "Gegevens worden gecontroleerd voordat ze verstuurd worden." },
      { titel: "Toekomstbestendig", tekst: "Uitbreiden later is veiliger en sneller." },
    ],
    bijAllesis: "Alle code die wij schrijven is TypeScript en wordt bij elke wijziging automatisch gecontroleerd.",
    url: "https://www.typescriptlang.org",
  },

  // ── Vindbaar in AI ─────────────────────────────────────────
  {
    slug: "chatgpt",
    naam: "ChatGPT",
    groep: "ai",
    emoji: "💬",
    kort: "Steeds meer klanten vragen ChatGPT om een aanbeveling. Wordt u genoemd?",
    watIs:
      "ChatGPT van OpenAI is de bekendste AI-assistent. Mensen vragen er dagelijks dingen als ‘goede loodgieter in Haarlem’. ChatGPT zoekt dan op het web en vat samen wat het vindt.",
    voordelen: [
      { titel: "Een nieuwe zoekmachine", tekst: "Een deel van uw klanten googelt niet meer, maar vraagt het aan een AI." },
      { titel: "Duidelijke feiten winnen", tekst: "AI noemt bedrijven waarvan diensten, prijzen en locatie helder op de site staan." },
      { titel: "Toegang voor de crawler", tekst: "Wij laten de zoekrobot van OpenAI (OAI-SearchBot) bewust toe." },
    ],
    bijAllesis:
      "Wij schrijven uw site zo dat AI de feiten makkelijk vindt: gestructureerde data, een llms.txt-bestand en heldere antwoorden op veelgestelde vragen. Een plek in het antwoord kan niemand garanderen, maar de kans wordt flink groter.",
    url: "https://chatgpt.com",
  },
  {
    slug: "gemini",
    naam: "Gemini",
    groep: "ai",
    icon: siGooglegemini,
    kleur: "#4285F4",
    kort: "Google's AI-antwoorden bovenaan de zoekresultaten.",
    watIs:
      "Gemini is de AI van Google. Het maakt ook de ‘AI-overzichten’ die bovenaan Google verschijnen, nog vóór de gewone zoekresultaten.",
    voordelen: [
      { titel: "Bovenaan Google", tekst: "AI-overzichten nemen de beste plek in de zoekresultaten in." },
      { titel: "Bouwt op goede SEO", tekst: "Gemini gebruikt Google's index: een technisch sterke site is de basis." },
      { titel: "Lokaal relevant", tekst: "Met uw Google-bedrijfsprofiel en gestructureerde data weet Gemini waar u zit." },
    ],
    bijAllesis:
      "Wij combineren klassieke SEO met Schema.org-data, zodat Google en Gemini precies begrijpen wat u doet en waar.",
    url: "https://gemini.google.com",
  },
  {
    slug: "claude",
    naam: "Claude",
    groep: "ai",
    icon: siAnthropic,
    kleur: "#D4A27F",
    kort: "De AI-assistent van Anthropic, populair bij professionals.",
    watIs:
      "Claude is een AI-assistent van Anthropic. Veel ondernemers en kantoren gebruiken het voor onderzoek en het vergelijken van leveranciers.",
    voordelen: [
      { titel: "Zakelijk publiek", tekst: "Juist inkopers en professionals gebruiken Claude om aanbieders te vinden." },
      { titel: "Leest llms.txt", tekst: "Een korte samenvatting van uw bedrijf helpt AI om u correct te beschrijven." },
      { titel: "Welkom op uw site", tekst: "Wij laten de crawlers van Anthropic toe in robots.txt." },
    ],
    bijAllesis: "Uw site krijgt een llms.txt en een robots.txt die AI-zoekrobots toelaat.",
    url: "https://claude.ai",
  },
  {
    slug: "perplexity",
    naam: "Perplexity",
    groep: "ai",
    icon: siPerplexity,
    kleur: "#20808D",
    kort: "De AI-zoekmachine die bronnen noemt, en dus naar uw site linkt.",
    watIs:
      "Perplexity is een zoekmachine die antwoorden geeft mét bronvermelding. Wordt uw site als bron gebruikt, dan krijgt u een directe link en bezoekers.",
    voordelen: [
      { titel: "Directe links", tekst: "Perplexity verwijst altijd naar zijn bronnen. Dat levert gericht verkeer op." },
      { titel: "Actuele informatie", tekst: "Het zoekt live, dus actuele prijzen en openingstijden tellen mee." },
      { titel: "Snel te lezen", tekst: "Snelle, schone pagina's worden makkelijker gelezen dan trage WordPress-sites." },
    ],
    bijAllesis: "Wij zorgen voor heldere pagina's per dienst en per vraag, precies wat Perplexity als bron wil gebruiken.",
    url: "https://www.perplexity.ai",
  },
  {
    slug: "meta-ai",
    naam: "Meta AI",
    groep: "ai",
    icon: siMeta,
    kleur: "#0866FF",
    kort: "AI in WhatsApp, Instagram en Facebook.",
    watIs:
      "Meta AI zit ingebouwd in WhatsApp, Instagram en Facebook. Miljoenen Nederlanders kunnen het direct in hun chat vragen stellen, ook over lokale bedrijven.",
    voordelen: [
      { titel: "Waar uw klant al is", tekst: "Geen aparte app nodig: de vraag wordt in WhatsApp gesteld." },
      { titel: "Mooie previews", tekst: "Met Open Graph ziet een gedeelde link er verzorgd uit, met foto en titel." },
      { titel: "Consistente info", tekst: "Dezelfde gegevens op site en socials geven AI vertrouwen." },
    ],
    bijAllesis: "Wij zorgen dat uw site goed leesbaar is voor Meta's crawler en dat gedeelde links er professioneel uitzien.",
    url: "https://www.meta.ai",
  },
  {
    slug: "copilot",
    naam: "Copilot",
    groep: "ai",
    emoji: "🤖",
    kort: "Microsoft's AI in Bing, Windows en Office.",
    watIs:
      "Microsoft Copilot zit in Bing, Edge, Windows en Microsoft 365. Op veel kantoren is het de eerste plek waar iemand een vraag stelt.",
    voordelen: [
      { titel: "Zakelijke gebruikers", tekst: "Copilot zit standaard in de werkomgeving van veel bedrijven." },
      { titel: "Gebruikt Bing", tekst: "Via IndexNow en een goede sitemap staat uw site snel in Bing." },
      { titel: "Dezelfde basis", tekst: "Goede SEO en gestructureerde data werken ook hier." },
    ],
    bijAllesis: "Wij melden uw site aan bij Bing en houden de sitemap automatisch actueel.",
    url: "https://copilot.microsoft.com",
  },

  // ── Standaarden ────────────────────────────────────────────
  {
    slug: "ssl-tls",
    naam: "SSL/TLS",
    groep: "standaard",
    emoji: "🔒",
    kort: "Het slotje in de adresbalk: versleutelde verbinding, altijd.",
    watIs:
      "SSL/TLS versleutelt alles wat tussen uw website en de bezoeker gaat. Zonder slotje toont de browser ‘Niet veilig’, en dat kost vertrouwen en klanten.",
    voordelen: [
      { titel: "Vertrouwen", tekst: "Geen waarschuwing in de browser, maar een slotje." },
      { titel: "Beter in Google", tekst: "HTTPS is al jaren een rankingfactor." },
      { titel: "Automatisch vernieuwd", tekst: "Het certificaat verloopt nooit ongemerkt." },
    ],
    bijAllesis: "Inbegrepen in onze hosting van €20 per maand ex btw. Wij regelen en vernieuwen het automatisch.",
  },
  {
    slug: "dkim-spf",
    naam: "DKIM & SPF",
    groep: "standaard",
    emoji: "📧",
    kort: "Uw e-mail komt aan en kan niet zomaar worden nagemaakt.",
    watIs:
      "SPF, DKIM en DMARC zijn instellingen die aan mailproviders vertellen welke servers namens uw domein mogen mailen. Gmail en Outlook eisen dit inmiddels.",
    voordelen: [
      { titel: "Niet in de spam", tekst: "Correct ingestelde mail komt veel vaker in de inbox." },
      { titel: "Bescherming tegen phishing", tekst: "Oplichters kunnen veel moeilijker mailen ‘namens’ u." },
      { titel: "Professioneel", tekst: "Mail vanaf uw eigen domein, betrouwbaar ondertekend." },
    ],
    bijAllesis: "Bij onze aparte mailhosting stellen wij SPF, DKIM en DMARC voor u in en controleren wij ze.",
  },
  {
    slug: "waf",
    naam: "WAF",
    groep: "standaard",
    emoji: "🛡️",
    kort: "Een firewall die aanvallen op uw website blokkeert.",
    watIs:
      "Een Web Application Firewall (WAF) bekijkt elk verzoek aan uw site en blokkeert bekende aanvalspatronen, zoals inbraakpogingen en geautomatiseerde scans.",
    voordelen: [
      { titel: "Bots buiten de deur", tekst: "Scanners die naar zwakke plekken zoeken worden geweerd." },
      { titel: "Overbelasting voorkomen", tekst: "Verdacht veel verzoeken worden afgeremd." },
      { titel: "Rust", tekst: "U hoeft er niets voor te doen; het draait op de achtergrond." },
    ],
    bijAllesis: "Uw site staat achter de firewall van ons hostingplatform en Cloudflare.",
  },
  {
    slug: "avg-gdpr",
    naam: "AVG/GDPR",
    groep: "standaard",
    emoji: "✅",
    kort: "Netjes omgaan met persoonsgegevens, zoals de wet vraagt.",
    watIs:
      "De AVG (in Europa GDPR) bepaalt hoe u met persoonsgegevens omgaat. Denk aan een privacyverklaring, cookietoestemming en zorgvuldige formulieren.",
    voordelen: [
      { titel: "Geen boetes", tekst: "De Autoriteit Persoonsgegevens kan boetes opleggen bij fouten." },
      { titel: "Eerlijke cookies", tekst: "Geen tracking zonder toestemming van de bezoeker." },
      { titel: "Vertrouwen", tekst: "Klanten zien dat u zorgvuldig met hun gegevens omgaat." },
    ],
    bijAllesis:
      "Wij leveren een privacyverklaring, cookiebanner en AVG-proof formulieren mee. Met onze gratis AVG-check ziet u waar uw huidige site staat.",
  },
  {
    slug: "cdn",
    naam: "CDN",
    groep: "standaard",
    emoji: "⚡",
    kort: "Uw website wordt geladen vanaf een server dicht bij de bezoeker.",
    watIs:
      "Een Content Delivery Network (CDN) bewaart kopieën van uw site op servers over de hele wereld. Een bezoeker in Haarlem krijgt de site uit Amsterdam, een bezoeker in Bangkok uit Azië.",
    voordelen: [
      { titel: "Sneller laden", tekst: "Korte afstand betekent korte laadtijd." },
      { titel: "Piekbestendig", tekst: "Ook bij veel bezoekers tegelijk blijft de site snel." },
      { titel: "Minder storingen", tekst: "Er is geen enkele server die uw hele site plat kan leggen." },
    ],
    bijAllesis: "Elke site die wij hosten draait standaard via een wereldwijd CDN.",
  },
  {
    slug: "core-web-vitals",
    naam: "Core Web Vitals",
    groep: "standaard",
    emoji: "📊",
    kort: "Google's meetlat voor snelheid en gebruiksgemak.",
    watIs:
      "Core Web Vitals zijn drie metingen van Google: hoe snel de belangrijkste inhoud laadt (LCP), hoe snel de site reageert (INP) en of de pagina niet verspringt (CLS).",
    voordelen: [
      { titel: "Hoger in Google", tekst: "Google gebruikt deze scores bij het rangschikken." },
      { titel: "Minder afhakers", tekst: "Elke seconde extra laadtijd kost bezoekers." },
      { titel: "Meetbaar", tekst: "Met onze gratis PageSpeed-check ziet u direct hoe uw site scoort." },
    ],
    bijAllesis: "Wij bouwen met het doel op groene scores, met geoptimaliseerde afbeeldingen, lettertypes en code.",
  },
  {
    slug: "webp",
    naam: "WebP",
    groep: "standaard",
    emoji: "🖼️",
    kort: "Scherpe foto's in een fractie van de bestandsgrootte.",
    watIs:
      "WebP (en het nog nieuwere AVIF) zijn moderne beeldformaten. Een foto is vaak 30 tot 50% kleiner dan als JPG, zonder zichtbaar kwaliteitsverlies.",
    voordelen: [
      { titel: "Snellere pagina's", tekst: "Afbeeldingen zijn meestal het zwaarste deel van een site." },
      { titel: "Minder mobiele data", tekst: "Fijn voor bezoekers op hun telefoon." },
      { titel: "Automatisch", tekst: "U uploadt gewoon een foto; de site maakt er de juiste formaten van." },
    ],
    bijAllesis: "Al uw afbeeldingen worden automatisch omgezet en in het juiste formaat per scherm geleverd.",
  },
  {
    slug: "wcag",
    naam: "WCAG",
    groep: "standaard",
    emoji: "♿",
    kort: "Een website die iedereen kan gebruiken.",
    watIs:
      "WCAG zijn de internationale richtlijnen voor digitale toegankelijkheid: voor mensen met een visuele beperking, kleurenblindheid of die met het toetsenbord navigeren. Vanaf 2025 geldt de Europese toegankelijkheidswet (EAA) voor veel bedrijven.",
    voordelen: [
      { titel: "Meer bereik", tekst: "Ongeveer 1 op de 5 mensen heeft baat bij een toegankelijke site." },
      { titel: "Klaar voor de wet", tekst: "De European Accessibility Act stelt eisen aan veel webshops en diensten." },
      { titel: "Beter voor SEO", tekst: "Duidelijke koppen en alt-teksten helpen ook zoekmachines." },
    ],
    bijAllesis: "Wij letten op contrast, toetsenbordbediening, alt-teksten en een logische opbouw van elke pagina.",
  },
  {
    slug: "schema-org",
    naam: "Schema.org",
    groep: "standaard",
    emoji: "🔍",
    kort: "Onzichtbare labels die Google en AI precies vertellen wie u bent.",
    watIs:
      "Schema.org is een gestandaardiseerde manier om informatie te labelen: bedrijfsnaam, adres, openingstijden, diensten, prijzen en veelgestelde vragen. Bezoekers zien het niet, zoekmachines en AI wel.",
    voordelen: [
      { titel: "Rijke zoekresultaten", tekst: "Kans op sterren, FAQ's en extra informatie in Google." },
      { titel: "AI begrijpt u", tekst: "Assistenten halen feiten het liefst uit gestructureerde data." },
      { titel: "Lokaal gevonden", tekst: "Adres en werkgebied worden ondubbelzinnig doorgegeven." },
    ],
    bijAllesis: "Elke site krijgt complete Schema.org-data: organisatie, lokaal bedrijf, diensten en FAQ.",
    url: "https://schema.org",
  },
  {
    slug: "llms-txt",
    naam: "llms.txt",
    groep: "standaard",
    emoji: "🤖",
    kort: "Een korte samenvatting van uw bedrijf, speciaal voor AI.",
    watIs:
      "llms.txt is een nieuwe, opkomende standaard: een tekstbestand op uw website dat AI-modellen in een paar alinea's vertelt wie u bent, wat u doet en welke pagina's belangrijk zijn.",
    voordelen: [
      { titel: "Juist beschreven", tekst: "Minder kans dat een AI verkeerde of verouderde informatie over u geeft." },
      { titel: "Voorsprong", tekst: "Nog maar weinig MKB-sites hebben dit. U valt op." },
      { titel: "Geen onderhoud", tekst: "Wij houden het bij wanneer uw diensten veranderen." },
    ],
    bijAllesis: "Wij schrijven en publiceren een llms.txt voor uw site. Bekijk die van ons op allesis.nl/llms.txt.",
    url: "https://llmstxt.org",
  },
  {
    slug: "sitemap-xml",
    naam: "Sitemap XML",
    groep: "standaard",
    emoji: "🗺️",
    kort: "Een plattegrond van uw site voor zoekmachines.",
    watIs:
      "Een XML-sitemap is een lijst van alle pagina's op uw website, met de datum van de laatste wijziging. Zoekmachines gebruiken die om niets over het hoofd te zien.",
    voordelen: [
      { titel: "Sneller geïndexeerd", tekst: "Nieuwe pagina's staan eerder in Google en Bing." },
      { titel: "Altijd actueel", tekst: "De sitemap wordt automatisch bijgewerkt bij elke wijziging." },
      { titel: "Search Console", tekst: "Wij melden de sitemap aan en houden de status in de gaten." },
    ],
    bijAllesis: "Automatisch gegenereerd en aangemeld bij Google Search Console en Bing.",
  },
  {
    slug: "open-graph",
    naam: "Open Graph",
    groep: "standaard",
    emoji: "📈",
    kort: "Mooie previews als uw link gedeeld wordt in WhatsApp of LinkedIn.",
    watIs:
      "Open Graph-tags bepalen hoe een link eruitziet als iemand die deelt: welke foto, titel en omschrijving verschijnen in WhatsApp, LinkedIn, Facebook of Slack.",
    voordelen: [
      { titel: "Meer kliks", tekst: "Een link met foto en duidelijke titel wordt veel vaker geopend." },
      { titel: "Professioneel", tekst: "Geen kale URL of willekeurige afbeelding." },
      { titel: "Per pagina", tekst: "Elke dienst of branche krijgt een eigen passende preview." },
    ],
    bijAllesis: "Elke pagina krijgt eigen Open Graph-tags en een deelafbeelding.",
    url: "https://ogp.me",
  },
];

export const TECH_SLUGS = TECHNOLOGIE.map((t) => t.slug);

export function getTech(slug: string) {
  return TECHNOLOGIE.find((t) => t.slug === slug);
}

export function techPerGroep(groep: TechGroep) {
  return TECHNOLOGIE.filter((t) => t.groep === groep);
}
