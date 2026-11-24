import type { Metadata } from "next";
import type { FaqItem } from "@/lib/json-ld";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

/**
 * Uitgebreide branchepagina's (sectorpagina's) met voorbeeldwebsite, AI-vindbaarheid en FAQ.
 * Voorbeelden gebruiken fictieve bedrijfsnamen.
 */

export type SectorVoorbeeld = {
  naam: string;
  domein: string;
  tagline: string;
  nav: [string, string, string, string];
  kop: string;
  sub: string;
  cta: string;
  blokken: [Blok, Blok, Blok];
};

type Blok = { titel: string; tekst: string };

export type Sector = {
  slug: string;
  label: string;
  /** Korte naam voor menu's en kaarten. */
  kort: string;
  icon: string;
  accent: string;
  heroFoto: string;
  voorbeeldFoto: string;
  h1: string;
  h1Accent: string;
  intro: string;
  problemen: [string, string, string];
  oplossingen: [Blok, Blok, Blok, Blok, Blok, Blok];
  voorbeeld: SectorVoorbeeld;
  vragen: [string, string, string];
  faq: FaqItem[];
  keywords: string[];
};

const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;

export const SECTORS: Sector[] = [
  {
    slug: "uitvaart",
    label: "Uitvaartondernemers",
    kort: "Uitvaart",
    icon: "🕊️",
    accent: "#4b5563",
    heroFoto: u("photo-1470252649378-9c29740c9fa8"),
    voorbeeldFoto: u("photo-1473177104440-ffee2f376098", 1000),
    h1: "Rust en houvast,",
    h1Accent: "ook online.",
    intro:
      "Nabestaanden zoeken vaak midden in de nacht, op hun telefoon en in verwarring. Uw website moet dan direct laten zien wie u bent, wat u doet en hoe ze u nu bereiken.",
    problemen: [
      "Het 24-uursnummer staat onderaan een lange pagina, of alleen op de contactpagina.",
      "Een verouderde site op een telefoon: kleine letters, trage pagina's, onduidelijke kosten.",
      "Condoleanceregisters en rouwberichten lopen via losse externe diensten.",
    ],
    oplossingen: [
      { titel: "Altijd bereikbaar", tekst: "Uw 24-uursnummer bovenaan elke pagina, met één tik te bellen." },
      { titel: "Rustig en warm ontwerp", tekst: "Ingetogen kleuren, grote letters, geen afleiding. Ook voor oudere bezoekers." },
      { titel: "Online condoleanceregister", tekst: "Rouwberichten en condoleances op uw eigen site, met moderatie." },
      { titel: "Heldere kostenindicatie", tekst: "Transparante pakketten en wat er wel en niet inbegrepen is." },
      { titel: "Lokale vindbaarheid", tekst: "Gevonden op 'uitvaartondernemer + uw plaats' in Google en AI-assistenten." },
      { titel: "Privacy op orde", tekst: "AVG-proof formulieren voor gevoelige gegevens van nabestaanden." },
    ],
    voorbeeld: {
      naam: "Uitvaartzorg De Linde",
      domein: "uitvaartzorgdelinde.nl",
      tagline: "Persoonlijke uitvaartzorg in Haarlem en omgeving",
      nav: ["Overlijden melden", "Werkwijze", "Kosten", "Condoleances"],
      kop: "Wij zijn er, dag en nacht.",
      sub: "Bel 023 000 00 00. Wij komen naar u toe en nemen de tijd.",
      cta: "Direct bellen",
      blokken: [
        { titel: "Overlijden melden", tekst: "Wat u nu moet doen, stap voor stap." },
        { titel: "Afscheid op maat", tekst: "Begrafenis, crematie of iets eigens." },
        { titel: "Condoleanceregister", tekst: "Laat een persoonlijk bericht achter." },
      ],
    },
    vragen: [
      "Welke uitvaartondernemer in Haarlem is 's nachts bereikbaar?",
      "Wat kost een eenvoudige crematie bij mij in de buurt?",
      "Wat moet ik doen als iemand thuis overlijdt?",
    ],
    faq: [
      { question: "Kan het 24-uursnummer op elke pagina staan?", answer: "Ja. We zetten het vast bovenin beeld, met een belknop die op mobiel direct belt." },
      { question: "Kunnen nabestaanden online condoleren?", answer: "Ja, met een condoleanceregister op uw eigen website. U keurt berichten eerst goed voordat ze zichtbaar worden." },
      { question: "Hoe gaan jullie om met privacy?", answer: "Formulieren zijn versleuteld, gegevens worden niet voor marketing gebruikt en de website voldoet aan de AVG." },
      { question: "Moet ik zelf teksten schrijven?", answer: "Nee. Wij schrijven de teksten in een rustige, respectvolle toon. U leest mee en keurt goed." },
    ],
    keywords: ["website uitvaartondernemer", "uitvaartwebsite laten maken", "condoleanceregister website", "website uitvaartcentrum"],
  },
  {
    slug: "binnenvaart",
    label: "Binnenvaart & vrachtvaart",
    kort: "Binnenvaart",
    icon: "🚢",
    accent: "#1e3a8a",
    heroFoto: u("photo-1578575437130-527eed3abbec"),
    voorbeeldFoto: u("photo-1494412519320-aa613dfb7738", 1000),
    h1: "Uw schip vol,",
    h1Accent: "uw ruim gevuld.",
    intro:
      "Verladers en bevrachters zoeken steeds vaker zelf online naar capaciteit. Laat zien welk schip u vaart, wat u vervoert en waar u ligt, zodat ze u direct kunnen benaderen.",
    problemen: [
      "Alleen vindbaar via het netwerk of een bevrachtingskantoor, niet via Google.",
      "Geen overzicht van scheepsgegevens: laadvermogen, afmetingen, certificaten.",
      "Aanvragen komen binnen via losse telefoontjes en zijn moeilijk terug te vinden.",
    ],
    oplossingen: [
      { titel: "Scheepsprofiel", tekst: "Laadvermogen, afmetingen, diepgang en certificaten overzichtelijk op één pagina." },
      { titel: "Vrachtaanvraag", tekst: "Een helder formulier voor lading, laad- en loshaven en gewenste datum." },
      { titel: "Vaargebied in beeld", tekst: "Een kaart met uw vaste routes en havens." },
      { titel: "Gevonden door verladers", tekst: "Structured data en teksten die Google en AI begrijpen." },
      { titel: "Meertalig", tekst: "Nederlands, Duits en Engels voor de Rijn- en Europese vaart." },
      { titel: "Snel aan boord", tekst: "Werkt prima op een trage mobiele verbinding onderweg." },
    ],
    voorbeeld: {
      naam: "MS Rijnvaart",
      domein: "msrijnvaart.nl",
      tagline: "Droge lading op Rijn, Maas en Waal",
      nav: ["Ons schip", "Lading", "Vaargebied", "Vracht aanvragen"],
      kop: "2.800 ton capaciteit, vanaf volgende week vrij.",
      sub: "Familiebedrijf in de derde generatie. Betrouwbaar, op tijd en rechtstreeks bereikbaar.",
      cta: "Vracht aanvragen",
      blokken: [
        { titel: "Laadvermogen", tekst: "2.800 ton · 110 × 11,45 m" },
        { titel: "Lading", tekst: "Agribulk, zand, grind en containers." },
        { titel: "Vaargebied", tekst: "Rotterdam · Duisburg · Basel" },
      ],
    },
    vragen: [
      "Welk binnenvaartschip heeft volgende week ruimte voor 2.000 ton agribulk?",
      "Binnenvaart Rotterdam naar Duisburg rechtstreeks bij de schipper",
      "Containerbinnenvaart Rijn familiebedrijf",
    ],
    faq: [
      { question: "Kan ik mijn beschikbaarheid zelf bijwerken?", answer: "Ja. U past de vrije capaciteit zelf aan via een eenvoudig beheerscherm, ook vanaf uw telefoon." },
      { question: "Kan de site in het Duits en Engels?", answer: "Ja, wij leveren de website meertalig op, inclusief vertaling." },
      { question: "Werkt de website met slechte verbinding?", answer: "Onze websites zijn licht en snel, dus ze laden ook goed op 4G langs de rivier." },
      { question: "Wat als ik een tweede schip erbij krijg?", answer: "Dan voegen we een extra scheepsprofiel toe. De website groeit met uw bedrijf mee." },
    ],
    keywords: ["website binnenvaart", "website schipper", "binnenvaartbedrijf website", "vrachtaanvraag binnenvaart"],
  },
  {
    slug: "rederij",
    label: "Rederijen & rondvaart",
    kort: "Rederijen",
    icon: "⛴️",
    accent: "#0e7490",
    heroFoto: u("photo-1534351590666-13e3e96b5017"),
    voorbeeldFoto: u("photo-1567899378494-47b22a2ae96a", 1000),
    h1: "Elke vaart",
    h1Accent: "vol geboekt.",
    intro:
      "Toeristen en bedrijven boeken een rondvaart, overtocht of groepsuitje op hun telefoon, vaak op het laatste moment. Met online tickets verdient u ook als het kantoor dicht is.",
    problemen: [
      "Tickets alleen te koop aan de kade of via platforms die flink commissie rekenen.",
      "Vaartijden staan in een pdf die op een telefoon niet te lezen is.",
      "Groepsaanvragen gaan via e-mail heen en weer, zonder overzicht.",
    ],
    oplossingen: [
      { titel: "Online tickets", tekst: "Vaste afvaarten, beschikbare plaatsen en direct betalen. Zonder commissie." },
      { titel: "Dienstregeling", tekst: "Vaartijden en seizoenen duidelijk op elk scherm." },
      { titel: "Groepen & arrangementen", tekst: "Offertes voor bedrijfsuitjes, bruiloften en schoolreisjes." },
      { titel: "Meertalig voor toeristen", tekst: "Nederlands, Engels en Duits." },
      { titel: "Reviews in beeld", tekst: "Uw Google-reviews zichtbaar op de site." },
      { titel: "Gevonden in AI", tekst: "Zodat ChatGPT en Google uw rondvaart noemen bij 'wat te doen in…'." },
    ],
    voorbeeld: {
      naam: "Rederij Het Spaarne",
      domein: "rederijhetspaarne.nl",
      tagline: "Rondvaarten en groepsvaarten door Haarlem",
      nav: ["Rondvaarten", "Groepen", "Vaartijden", "Tickets"],
      kop: "Haarlem vanaf het water.",
      sub: "Dagelijks elk uur een rondvaart van 75 minuten, met live uitleg aan boord.",
      cta: "Tickets bestellen",
      blokken: [
        { titel: "Rondvaart", tekst: "Elk uur vanaf 11:00 · €17,50 p.p." },
        { titel: "Groepsvaart", tekst: "Privé tot 40 personen, met catering." },
        { titel: "Kaasvaart", tekst: "Proeverij aan boord · vr en za." },
      ],
    },
    vragen: [
      "Leuke rondvaart in Haarlem met kinderen",
      "Boot huren voor een bedrijfsuitje met 30 personen",
      "Boat tour Haarlem tickets online",
    ],
    faq: [
      { question: "Kunnen klanten online betalen?", answer: "Ja, via iDEAL, creditcard of Apple Pay, rechtstreeks op uw eigen rekening." },
      { question: "Kan ik zelf afvaarten blokkeren bij slecht weer?", answer: "Ja. U sluit een afvaart met één klik af en geboekte klanten krijgen automatisch bericht." },
      { question: "Is de site meertalig?", answer: "Ja, wij leveren Nederlands, Engels en desgewenst Duits." },
      { question: "Kunnen jullie ook een QR-ticket maken?", answer: "Ja. Klanten krijgen een ticket met QR-code dat u aan boord scant." },
    ],
    keywords: ["website rederij", "rondvaart website online tickets", "boekingssysteem rondvaart", "website partyschip"],
  },
  {
    slug: "havens",
    label: "Havens & jachthavens",
    kort: "Havens",
    icon: "⚓",
    accent: "#155e75",
    heroFoto: u("photo-1494412574643-ff11b0a5c1c3"),
    voorbeeldFoto: u("photo-1540946485063-a40da27545f8", 1000),
    h1: "Uw haven,",
    h1Accent: "helder op de kaart.",
    intro:
      "Watersporters plannen hun route online en kiezen de haven waar ze snel zien wat er kan. Havenbedrijven willen dat verladers en bezoekers direct de juiste informatie vinden.",
    problemen: [
      "Liggeld, faciliteiten en havenregels zijn lastig te vinden of verouderd.",
      "Passanten bellen voor een ligplaats in plaats van online te reserveren.",
      "Nieuws over werkzaamheden of brugtijden bereikt bezoekers niet.",
    ],
    oplossingen: [
      { titel: "Ligplaats reserveren", tekst: "Passanten reserveren online een plek voor één of meer nachten." },
      { titel: "Tarieven & faciliteiten", tekst: "Liggeld, stroom, water, sanitair en wifi overzichtelijk." },
      { titel: "Havenkaart", tekst: "Steigers, aanmeldsteiger, tankstation en walstroom in beeld." },
      { titel: "Actueel nieuws", tekst: "Brugtijden, werkzaamheden en evenementen zelf plaatsen." },
      { titel: "Meertalig", tekst: "Voor Duitse, Belgische en Engelse watersporters." },
      { titel: "Gevonden in vaarapps en AI", tekst: "Gestructureerde gegevens die Google, AI en routeplanners kunnen lezen." },
    ],
    voorbeeld: {
      naam: "Jachthaven De Kaag",
      domein: "jachthavendekaag.nl",
      tagline: "Ruime passantenhaven aan de Kagerplassen",
      nav: ["Passanten", "Vaste ligplaats", "Faciliteiten", "Reserveren"],
      kop: "Vanavond nog een plek? Reserveer online.",
      sub: "65 passantenplaatsen, walstroom, sanitair en een restaurant aan de haven.",
      cta: "Ligplaats reserveren",
      blokken: [
        { titel: "Liggeld", tekst: "Vanaf €2,10 per meter per nacht" },
        { titel: "Faciliteiten", tekst: "Walstroom · wifi · tankstation" },
        { titel: "Havenmeester", tekst: "VHF 31 · dagelijks 08:00–20:00" },
      ],
    },
    vragen: [
      "Jachthaven Kagerplassen met plek voor een boot van 12 meter",
      "Passantenhaven met walstroom en restaurant bij Leiden",
      "Liggeld jachthaven per nacht vergelijken",
    ],
    faq: [
      { question: "Kunnen passanten online betalen?", answer: "Ja, bij het reserveren of via een betaallink. De havenmeester ziet alles in één overzicht." },
      { question: "Kan ik zelf brugtijden en nieuws plaatsen?", answer: "Ja, via een eenvoudig beheerscherm dat ook op een telefoon werkt." },
      { question: "Is dit ook geschikt voor een havenbedrijf?", answer: "Ja. Voor commerciële havens maken we pagina's over kades, diepgang, opslag en havengelden." },
      { question: "Werkt het samen met mijn huidige administratie?", answer: "Vaak wel. We kijken samen welke koppelingen nodig zijn en geven vooraf een prijs." },
    ],
    keywords: ["website jachthaven", "ligplaats online reserveren", "website havenbedrijf", "passantenhaven website"],
  },
  {
    slug: "fotografie",
    label: "Fotografen & videografen",
    kort: "Fotografie",
    icon: "📷",
    accent: "#111827",
    heroFoto: u("photo-1452587925148-ce544e77e70d"),
    voorbeeldFoto: u("photo-1554048612-b6a482bc67e5", 1000),
    h1: "Uw werk spreekt.",
    h1Accent: "Laat het gevonden worden.",
    intro:
      "Een mooi portfolio is pas waardevol als klanten het vinden en het snel laadt. Wij bouwen een site waar uw foto's scherp, groot en razendsnel in beeld komen.",
    problemen: [
      "Zware foto's maken de site traag, en trage sites zakken weg in Google.",
      "Instagram brengt likes, maar weinig boekingen.",
      "Prijzen en beschikbaarheid ontbreken, dus klanten haken af of mailen eindeloos.",
    ],
    oplossingen: [
      { titel: "Snelle galerijen", tekst: "Automatisch geoptimaliseerde foto's in topkwaliteit, ook op mobiel." },
      { titel: "Pakketten & prijzen", tekst: "Bruiloft, portret, zakelijk: duidelijk wat klanten krijgen." },
      { titel: "Shoot boeken", tekst: "Klanten kiezen een datum en betalen een aanbetaling online." },
      { titel: "Klantgalerij", tekst: "Afgeschermde galerij om foto's te leveren en te laten kiezen." },
      { titel: "Lokaal gevonden", tekst: "'Bruidsfotograaf + regio' in Google en AI-assistenten." },
      { titel: "Beeldrechten beschermd", tekst: "Geen rechtsklik-downloads en nette metadata in uw foto's." },
    ],
    voorbeeld: {
      naam: "Studio Licht & Lijn",
      domein: "studiolichtenlijn.nl",
      tagline: "Bruiloft- en portretfotografie in Noord-Holland",
      nav: ["Portfolio", "Bruiloft", "Pakketten", "Boek een shoot"],
      kop: "Momenten die blijven.",
      sub: "Ongedwongen bruiloft- en portretfotografie. Beschikbaar in 2027.",
      cta: "Beschikbaarheid bekijken",
      blokken: [
        { titel: "Bruiloft", tekst: "Hele dag vanaf €1.450" },
        { titel: "Portret", tekst: "Studio of op locatie, 1 uur" },
        { titel: "Zakelijk", tekst: "Teamfoto's en profielfoto's" },
      ],
    },
    vragen: [
      "Bruidsfotograaf in Haarlem met natuurlijke stijl",
      "Wat kost een fotograaf voor een hele trouwdag?",
      "Zakelijke profielfoto's laten maken op kantoor",
    ],
    faq: [
      { question: "Worden mijn foto's niet onscherp door het verkleinen?", answer: "Nee. We leveren automatisch het juiste formaat per scherm, zodat foto's scherp blijven en toch snel laden." },
      { question: "Kan ik zelf nieuwe series toevoegen?", answer: "Ja, u uploadt nieuwe foto's zelf. De optimalisatie gebeurt automatisch." },
      { question: "Kunnen klanten een aanbetaling doen?", answer: "Ja, bij het boeken van een shoot kan een aanbetaling via iDEAL." },
      { question: "Kan mijn Instagram erbij?", answer: "Ja, we tonen uw nieuwste posts op de site en linken naar uw profiel." },
    ],
    keywords: ["website fotograaf laten maken", "portfolio website fotograaf", "website trouwfotograaf", "website videograaf"],
  },
  {
    slug: "fysiotherapie",
    label: "Fysiotherapeuten",
    kort: "Fysiotherapie",
    icon: "🩺",
    accent: "#0f766e",
    heroFoto: u("photo-1571019613454-1cb2f99b2d8b"),
    voorbeeldFoto: u("photo-1576091160550-2173dba999ef", 1000),
    h1: "Minder telefoon,",
    h1Accent: "meer behandelen.",
    intro:
      "Patiënten met klachten zoeken eerst online: wat is het, wat kan ik doen, wie helpt me snel? Een goede praktijksite beantwoordt die vragen en laat ze direct een afspraak maken.",
    problemen: [
      "De telefoon gaat de hele dag en de assistente is druk met afspraken verzetten.",
      "Vergoedingen en directe toegankelijkheid zijn niet uitgelegd.",
      "Specialisaties, zoals sport, bekken of oedeem, worden niet gevonden.",
    ],
    oplossingen: [
      { titel: "Online afspraken", tekst: "Patiënten plannen zelf een intake, gekoppeld aan uw agenda." },
      { titel: "Specialisaties apart", tekst: "Eigen pagina per behandeling, zodat u op elke klacht gevonden wordt." },
      { titel: "Vergoeding uitgelegd", tekst: "Helder wat de verzekering vergoedt en dat een verwijzing niet nodig is." },
      { titel: "Team in beeld", tekst: "Therapeuten met BIG-registratie en specialisatie." },
      { titel: "Klachtenwijzer", tekst: "Korte uitleg per klacht, die Google en AI graag citeren." },
      { titel: "Medische AVG", tekst: "Veilige formulieren, geen gezondheidsgegevens in gewone e-mail." },
    ],
    voorbeeld: {
      naam: "Fysio Kennemerland",
      domein: "fysiokennemerland.nl",
      tagline: "Fysiotherapie en sportrevalidatie in Heemstede",
      nav: ["Klachten", "Behandelingen", "Team", "Afspraak maken"],
      kop: "Snel van uw klacht af.",
      sub: "Binnen 3 werkdagen terecht, zonder verwijzing. Ook 's avonds.",
      cta: "Afspraak maken",
      blokken: [
        { titel: "Rug & nek", tekst: "Pijn, stijfheid en hernia" },
        { titel: "Sportblessures", tekst: "Revalidatie en preventie" },
        { titel: "Vergoeding", tekst: "Wat uw verzekering betaalt" },
      ],
    },
    vragen: [
      "Fysiotherapeut in Heemstede met avondspreekuur",
      "Heb ik een verwijzing nodig voor fysiotherapie?",
      "Fysio gespecialiseerd in hardloopblessures bij mij in de buurt",
    ],
    faq: [
      { question: "Werkt online plannen met mijn praktijksoftware?", answer: "Vaak wel. We koppelen met gangbare agendasystemen of gebruiken Allesis Geboekt." },
      { question: "Mag een patiënt klachten via de site doorgeven?", answer: "Ja, via een beveiligd formulier. Gezondheidsgegevens gaan niet via gewone e-mail." },
      { question: "Kunnen we per therapeut een profiel tonen?", answer: "Ja, met foto, specialisaties en BIG-registratie." },
      { question: "Hoe word ik gevonden op specifieke klachten?", answer: "Met een korte, deskundige pagina per klacht en behandeling, plus structured data die zoekmachines begrijpen." },
    ],
    keywords: ["website fysiotherapeut", "fysiotherapie website laten maken", "online afspraak fysio", "website praktijk fysiotherapie"],
  },
  {
    slug: "rijschool",
    label: "Rijscholen",
    kort: "Rijschool",
    icon: "🚗",
    accent: "#b45309",
    heroFoto: u("photo-1449965408869-eaa3f722e40d"),
    voorbeeldFoto: u("photo-1580273916550-e323be2ae537", 1000),
    h1: "Meer leerlingen,",
    h1Accent: "minder appjes.",
    intro:
      "Jongeren en hun ouders vergelijken rijscholen online op prijs, slagingspercentage en reviews. Wie dat helder laat zien en een proefles direct laat boeken, wint de leerling.",
    problemen: [
      "Pakketprijzen verschillen per pagina of staan er niet op.",
      "Proeflessen worden via WhatsApp geregeld en raken zoek.",
      "Reviews staan op Google, maar niet op de eigen site.",
    ],
    oplossingen: [
      { titel: "Pakketten vergelijken", tekst: "Lespakketten met prijs per les, inclusief examen." },
      { titel: "Proefles boeken", tekst: "Leerlingen kiezen zelf een moment in uw agenda." },
      { titel: "Reviews & slagingen", tekst: "Ervaringen van geslaagde leerlingen op de site." },
      { titel: "Rijbewijzen", tekst: "Auto, automaat, motor of aanhanger, elk met eigen pagina." },
      { titel: "Lokaal bovenaan", tekst: "Gevonden op 'rijschool + plaats' en 'automaat rijles + plaats'." },
      { titel: "Voor ouders", tekst: "Heldere info over 2toDrive, betalen en voortgang." },
    ],
    voorbeeld: {
      naam: "Rijschool Groen Licht",
      domein: "rijschoolgroenlicht.nl",
      tagline: "Rijles auto en automaat in Haarlem",
      nav: ["Pakketten", "Automaat", "Reviews", "Proefles"],
      kop: "In één keer geslaagd? Begin met een proefles.",
      sub: "Geduldige instructeurs, vaste lesauto en flexibele tijden, ook in het weekend.",
      cta: "Proefles plannen",
      blokken: [
        { titel: "Pakket 20 lessen", tekst: "Inclusief examen" },
        { titel: "Automaat", tekst: "Rustig leren rijden" },
        { titel: "Spoedcursus", tekst: "Rijbewijs in 3 weken" },
      ],
    },
    vragen: [
      "Goedkope rijschool in Haarlem met automaat",
      "Rijschool met goede reviews en proefles",
      "Hoeveel rijlessen heb je gemiddeld nodig?",
    ],
    faq: [
      { question: "Kunnen leerlingen zelf lessen plannen?", answer: "Ja, een proefles direct. Voor vervolglessen kunt u per leerling toegang geven." },
      { question: "Kunnen reviews automatisch op de site?", answer: "Ja, we tonen uw Google-reviews op de site en vragen geslaagde leerlingen om een review." },
      { question: "Hebben meerdere instructeurs elk een agenda?", answer: "Ja, per instructeur een eigen agenda en profiel." },
      { question: "Kan ik pakketten zelf aanpassen?", answer: "Ja, prijzen en pakketten wijzigt u zelf in een simpel beheerscherm." },
    ],
    keywords: ["website rijschool", "rijschool website laten maken", "proefles online boeken", "website rijinstructeur"],
  },
  {
    slug: "verhuisbedrijf",
    label: "Verhuisbedrijven",
    kort: "Verhuizers",
    icon: "📦",
    accent: "#9a3412",
    heroFoto: u("photo-1600518464441-9154a4dea21b"),
    voorbeeldFoto: u("photo-1600585152220-90363fe7e115", 1000),
    h1: "Offerte-aanvragen",
    h1Accent: "die echt binnenkomen.",
    intro:
      "Wie gaat verhuizen, vraagt binnen een uur meerdere offertes aan. Een site die direct een indicatie geeft en vertrouwen uitstraalt, wint de klus voordat de concurrent terugbelt.",
    problemen: [
      "Afhankelijk van offerteplatforms die per lead betalen.",
      "Klanten weten niet wat het ongeveer kost en haken af.",
      "Geen bewijs van betrouwbaarheid: verzekering, keurmerk, reviews.",
    ],
    oplossingen: [
      { titel: "Verhuiscalculator", tekst: "Kamers, verdieping en afstand invullen geeft direct een prijsindicatie." },
      { titel: "Eigen offerteaanvragen", tekst: "Leads rechtstreeks in uw mailbox, zonder kosten per aanvraag." },
      { titel: "Vertrouwen", tekst: "Keurmerken, verzekering en reviews zichtbaar." },
      { titel: "Diensten apart", tekst: "Particulier, zakelijk, opslag, inpakservice en verhuislift." },
      { titel: "Lokaal gevonden", tekst: "Per werkgebied een pagina, voor 'verhuisbedrijf + plaats'." },
      { titel: "Foto's van echte klussen", tekst: "Uw team en wagens, geen stockfoto's." },
    ],
    voorbeeld: {
      naam: "Van Dijk Verhuizingen",
      domein: "vandijkverhuizingen.nl",
      tagline: "Particuliere en zakelijke verhuizingen in de Randstad",
      nav: ["Particulier", "Zakelijk", "Opslag", "Offerte"],
      kop: "Wat kost uw verhuizing? Weet het in 1 minuut.",
      sub: "Vaste prijs, verzekerd en met eigen ervaren verhuizers.",
      cta: "Bereken uw prijs",
      blokken: [
        { titel: "Verhuislift", tekst: "Tot de 10e verdieping" },
        { titel: "Inpakservice", tekst: "Wij pakken alles in en uit" },
        { titel: "Opslag", tekst: "Droog en beveiligd, per maand" },
      ],
    },
    vragen: [
      "Wat kost een verhuizing van een driekamerappartement in Haarlem?",
      "Betrouwbaar verhuisbedrijf met verhuislift en vaste prijs",
      "Verhuisbedrijf met opslag in de Randstad",
    ],
    faq: [
      { question: "Hoe werkt de prijsindicatie?", answer: "De klant vult een paar gegevens in en ziet een richtprijs. U bepaalt zelf de rekenregels." },
      { question: "Kan ik stoppen met offerteplatforms?", answer: "Dat kan steeds meer, omdat u met een goed gevonden site uw eigen aanvragen krijgt." },
      { question: "Kunnen klanten foto's van hun inboedel meesturen?", answer: "Ja, het formulier ondersteunt foto-uploads." },
      { question: "Werkt dit voor meerdere vestigingen?", answer: "Ja, met een pagina per vestiging en werkgebied." },
    ],
    keywords: ["website verhuisbedrijf", "verhuiscalculator website", "verhuizer website laten maken", "offerte verhuizing website"],
  },
  {
    slug: "schilder",
    label: "Schilders & stukadoors",
    kort: "Schilders",
    icon: "🖌️",
    accent: "#1d4ed8",
    heroFoto: u("photo-1562259949-e8e7689d7828"),
    voorbeeldFoto: u("photo-1595814433015-e6f5ce69614e", 1000),
    h1: "Uw vakmanschap,",
    h1Accent: "eindelijk zichtbaar.",
    intro:
      "Huiseigenaren zoeken een schilder op vakmanschap en betrouwbaarheid. Laat foto's van uw werk zien, leg uit hoe u werkt en maak een offerte aanvragen makkelijk.",
    problemen: [
      "Werk komt alleen via mond-tot-mond, met pieken en dalen.",
      "Geen foto's van eigen projecten online.",
      "Offerteaanvragen zonder maten of foto's, dus eerst langs voor een opname.",
    ],
    oplossingen: [
      { titel: "Projectgalerij", tekst: "Voor- en na-foto's van uw eigen klussen." },
      { titel: "Slimme offerteaanvraag", tekst: "Klanten sturen foto's en afmetingen mee." },
      { titel: "Diensten per pagina", tekst: "Binnen, buiten, houtrot, stucwerk en spuitwerk." },
      { titel: "Werkgebied", tekst: "Gevonden in elke plaats waar u werkt." },
      { titel: "Keurmerken", tekst: "Garantie en certificeringen duidelijk in beeld." },
      { titel: "Planning", tekst: "Laat zien wanneer u weer ruimte heeft." },
    ],
    voorbeeld: {
      naam: "Schildersbedrijf Kwast & Co",
      domein: "kwastenco.nl",
      tagline: "Binnen- en buitenschilderwerk in Zuid-Kennemerland",
      nav: ["Diensten", "Projecten", "Werkwijze", "Offerte"],
      kop: "Strak geschilderd, netjes opgeleverd.",
      sub: "Vakwerk met 5 jaar garantie. Stuur foto's mee en ontvang binnen 2 dagen een offerte.",
      cta: "Offerte aanvragen",
      blokken: [
        { titel: "Buitenschilderwerk", tekst: "Kozijnen, deuren en gevels" },
        { titel: "Binnen", tekst: "Muren, plafonds en trappen" },
        { titel: "Houtrot", tekst: "Herstel met garantie" },
      ],
    },
    vragen: [
      "Betrouwbare schilder in Haarlem voor kozijnen buiten",
      "Wat kost het om een huis buiten te laten schilderen?",
      "Schilder met garantie en goede reviews",
    ],
    faq: [
      { question: "Kan ik zelf projecten toevoegen?", answer: "Ja, u uploadt foto's vanaf uw telefoon, direct vanaf de klus." },
      { question: "Hoe krijg ik meer werk in mijn eigen regio?", answer: "Met pagina's per plaats en dienst, plus een goed ingericht Google Bedrijfsprofiel." },
      { question: "Kunnen klanten foto's meesturen?", answer: "Ja, zo kunt u vaak al een prijs geven zonder langs te gaan." },
      { question: "Moet ik zelf teksten schrijven?", answer: "Nee, wij schrijven ze. U levert foto's van uw werk aan." },
    ],
    keywords: ["website schilder", "schildersbedrijf website laten maken", "website stukadoor", "offerte schilder online"],
  },
  {
    slug: "dakdekker",
    label: "Dakdekkers",
    kort: "Dakdekkers",
    icon: "🏠",
    accent: "#7f1d1d",
    heroFoto: u("photo-1632759145351-1d592919f522"),
    voorbeeldFoto: u("photo-1600585154340-be6161a56a0c", 1000),
    h1: "Lekkage? Dan bellen",
    h1Accent: "ze ú.",
    intro:
      "Bij lekkage zoekt men direct op de telefoon. De dakdekker die bovenaan staat, duidelijk bereikbaar is en vertrouwen uitstraalt, krijgt de klus.",
    problemen: [
      "Spoedklanten vinden geen telefoonnummer of zien geen spoedservice.",
      "Concurrentie van malafide dakdekkers maakt klanten wantrouwig.",
      "Grote klussen, zoals een nieuw dak of isolatie, worden niet goed uitgelegd.",
    ],
    oplossingen: [
      { titel: "Spoedknop", tekst: "Groot belnummer en een spoedformulier met foto-upload." },
      { titel: "Echt en vertrouwd", tekst: "KvK, keurmerken, garantie en eigen projecten in beeld." },
      { titel: "Diensten uitgelegd", tekst: "Bitumen, pannen, EPDM, dakgoten en isolatie." },
      { titel: "Werkgebied", tekst: "Gevonden in elke gemeente waar u werkt." },
      { titel: "Reviews", tekst: "Ervaringen van klanten op uw eigen site." },
      { titel: "Subsidie-info", tekst: "Uitleg over isolatiesubsidies, die mensen vaak zoeken." },
    ],
    voorbeeld: {
      naam: "Dakwerken Kennemer",
      domein: "dakwerkenkennemer.nl",
      tagline: "Dakreparatie, renovatie en isolatie",
      nav: ["Spoed", "Plat dak", "Pannendak", "Offerte"],
      kop: "Lekkage? Vandaag nog iemand op uw dak.",
      sub: "Spoedservice 7 dagen per week. Vakkundig, verzekerd en met garantie.",
      cta: "Bel spoed",
      blokken: [
        { titel: "Plat dak", tekst: "Bitumen en EPDM" },
        { titel: "Pannendak", tekst: "Herstel en vervanging" },
        { titel: "Isolatie", tekst: "Inclusief subsidie-advies" },
      ],
    },
    vragen: [
      "Dakdekker spoed lekkage Haarlem",
      "Wat kost een nieuw plat dak met isolatie?",
      "Betrouwbare dakdekker herkennen",
    ],
    faq: [
      { question: "Kan een klant foto's van de lekkage sturen?", answer: "Ja, via het spoedformulier, direct vanaf de telefoon." },
      { question: "Hoe laat ik zien dat ik betrouwbaar ben?", answer: "Met uw KvK-gegevens, keurmerken, garantie, echte projectfoto's en reviews op de site." },
      { question: "Word ik ook buiten mijn eigen plaats gevonden?", answer: "Ja, met aparte pagina's per werkgebied." },
      { question: "Kunnen jullie mijn Google Bedrijfsprofiel inrichten?", answer: "Ja, dat nemen we mee zodat u ook op Google Maps goed zichtbaar bent." },
    ],
    keywords: ["website dakdekker", "dakdekker website laten maken", "website dakdekkersbedrijf", "spoed lekkage website"],
  },
  {
    slug: "zonnepanelen",
    label: "Zonnepanelen & installatie",
    kort: "Zonnepanelen",
    icon: "☀️",
    accent: "#ca8a04",
    heroFoto: u("photo-1509391366360-2e959784a276"),
    voorbeeldFoto: u("photo-1613665813446-82a78c468a1d", 1000),
    h1: "Van twijfel",
    h1Accent: "naar offerte.",
    intro:
      "Huiseigenaren hebben veel vragen over zonnepanelen, thuisbatterijen en warmtepompen. Wie die vragen eerlijk beantwoordt, krijgt hun vertrouwen en hun aanvraag.",
    problemen: [
      "Klanten zijn in de war door wisselende regels, zoals het einde van de salderingsregeling.",
      "Afhankelijk van leadplatforms en dure advertenties.",
      "Lange formulieren waardoor bezoekers afhaken.",
    ],
    oplossingen: [
      { titel: "Terugverdiencheck", tekst: "Postcode en verbruik invullen geeft een indicatie van besparing." },
      { titel: "Eerlijke uitleg", tekst: "Kennisbank over saldering, batterijen en subsidies." },
      { titel: "Kort aanvraagformulier", tekst: "In drie stappen een offerte aanvragen." },
      { titel: "Projecten in de buurt", tekst: "Laat zien waar u al installeerde." },
      { titel: "Gevonden in AI", tekst: "AI-assistenten citeren duidelijke antwoorden op energievragen." },
      { titel: "Certificeringen", tekst: "InstallQ, garantie en merken waarmee u werkt." },
    ],
    voorbeeld: {
      naam: "ZonWijs Installaties",
      domein: "zonwijs.nl",
      tagline: "Zonnepanelen, thuisbatterijen en laadpalen",
      nav: ["Zonnepanelen", "Thuisbatterij", "Kennisbank", "Offerte"],
      kop: "Wat levert zonne-energie ú op?",
      sub: "Vul uw postcode in en zie direct een eerlijke indicatie. Zonder verplichtingen.",
      cta: "Bereken besparing",
      blokken: [
        { titel: "Zonnepanelen", tekst: "Installatie binnen 4 weken" },
        { titel: "Thuisbatterij", tekst: "Slim opslaan, minder terugleveren" },
        { titel: "Laadpaal", tekst: "Laden met eigen stroom" },
      ],
    },
    vragen: [
      "Zijn zonnepanelen nog rendabel nu de salderingsregeling stopt?",
      "Installateur zonnepanelen en thuisbatterij in Noord-Holland",
      "Hoeveel zonnepanelen heb ik nodig voor 3.500 kWh?",
    ],
    faq: [
      { question: "Kan de calculator met mijn eigen prijzen rekenen?", answer: "Ja, u bepaalt de aannames en prijzen. Klanten zien een indicatie, geen bindende offerte." },
      { question: "Kunnen jullie een kennisbank maken?", answer: "Ja, met heldere artikelen die we samen actueel houden als regels veranderen." },
      { question: "Werkt de site met mijn CRM?", answer: "Aanvragen kunnen naar uw mail of CRM. We kijken vooraf welke koppeling nodig is." },
      { question: "Hoe snel staat de site online?", answer: "Een standaardsite is meestal binnen enkele weken live, afhankelijk van uw aanlevering." },
    ],
    keywords: ["website zonnepanelen installateur", "zonnepanelen website laten maken", "website installatiebedrijf energie", "besparingscalculator website"],
  },
  {
    slug: "transport",
    label: "Transport & logistiek",
    kort: "Transport",
    icon: "🚚",
    accent: "#0f172a",
    heroFoto: u("photo-1601584115197-04ecc0da31d7"),
    voorbeeldFoto: u("photo-1586528116311-ad8dd3c8310d", 1000),
    h1: "Nieuwe opdrachtgevers,",
    h1Accent: "nieuwe chauffeurs.",
    intro:
      "Een transportbedrijf zoekt twee dingen online: ladingen en mensen. Een goede website levert allebei op, met een duidelijk dienstenaanbod en een vacaturepagina die werkt.",
    problemen: [
      "Een visitekaartje-site uit 2012 die opdrachtgevers niets vertelt.",
      "Vacatures voor chauffeurs staan alleen op vacaturesites.",
      "Geen duidelijk beeld van wagenpark, certificeringen en specialisaties.",
    ],
    oplossingen: [
      { titel: "Diensten & specialisaties", tekst: "Koel, ADR, groupage, warehousing en meer, elk met eigen pagina." },
      { titel: "Vacaturepagina", tekst: "Chauffeursvacatures die in Google for Jobs verschijnen." },
      { titel: "Wagenpark & certificaten", tekst: "ISO, GDP en Lean & Green in beeld." },
      { titel: "Transportaanvraag", tekst: "Opdrachtgevers vragen direct een tarief aan." },
      { titel: "Meertalig", tekst: "Voor internationale klanten en chauffeurs." },
      { titel: "Track & trace-link", tekst: "Koppeling met uw bestaande systeem." },
    ],
    voorbeeld: {
      naam: "Kennemer Transport",
      domein: "kennemertransport.nl",
      tagline: "Geconditioneerd vervoer en warehousing",
      nav: ["Diensten", "Warehousing", "Vacatures", "Tarief aanvragen"],
      kop: "Uw lading, op tijd en op temperatuur.",
      sub: "40 eigen trucks, dagelijks door de Benelux en Duitsland.",
      cta: "Tarief aanvragen",
      blokken: [
        { titel: "Koeltransport", tekst: "GDP-gecertificeerd" },
        { titel: "Warehousing", tekst: "12.000 m² opslag" },
        { titel: "Werken bij", tekst: "Chauffeurs CE gezocht" },
      ],
    },
    vragen: [
      "Koeltransport naar Duitsland vanuit Noord-Holland",
      "Vacature vrachtwagenchauffeur CE in de regio Haarlem",
      "Transportbedrijf met warehousing en ADR",
    ],
    faq: [
      { question: "Verschijnen vacatures in Google for Jobs?", answer: "Ja, we voegen de juiste structured data toe zodat vacatures daar zichtbaar worden." },
      { question: "Kan ik vacatures zelf plaatsen?", answer: "Ja, u plaatst en sluit ze zelf via een eenvoudig beheerscherm." },
      { question: "Is meertaligheid mogelijk?", answer: "Ja, bijvoorbeeld Nederlands, Engels, Duits en Pools." },
      { question: "Kunnen jullie aansluiten op ons TMS?", answer: "We bekijken de mogelijkheden en geven vooraf een vaste prijs voor eventuele koppelingen." },
    ],
    keywords: ["website transportbedrijf", "website logistiek bedrijf", "vacaturepagina chauffeurs", "website koeltransport"],
  },
  {
    slug: "vakantieverhuur",
    label: "B&B's & vakantieverhuur",
    kort: "Vakantieverhuur",
    icon: "🛏️",
    accent: "#be185d",
    heroFoto: u("photo-1505693416388-ac5ce068fe85"),
    voorbeeldFoto: u("photo-1566073771259-6a8506099945", 1000),
    h1: "Direct geboekt,",
    h1Accent: "zonder commissie.",
    intro:
      "Gasten vinden u misschien via Booking of Airbnb, maar boeken de volgende keer graag direct. Met een eigen site met boekingsmodule houdt u die commissie zelf.",
    problemen: [
      "15 tot 20 procent van elke boeking gaat naar platforms.",
      "Geen eigen klantrelatie: het platform bezit uw gasten.",
      "Een losse agenda per platform, met risico op dubbele boekingen.",
    ],
    oplossingen: [
      { titel: "Direct boeken", tekst: "Beschikbaarheid, prijzen en betalen op uw eigen site." },
      { titel: "Agenda-sync", tekst: "Gekoppeld met Booking en Airbnb via iCal, dus geen dubbele boekingen." },
      { titel: "Sfeer in beeld", tekst: "Grote foto's van kamers, ontbijt en omgeving." },
      { titel: "Omgevingstips", tekst: "Pagina's over de regio die Google en AI graag tonen." },
      { titel: "Meertalig", tekst: "Nederlands, Engels en Duits voor buitenlandse gasten." },
      { titel: "Direct-boekvoordeel", tekst: "Laat zien waarom direct boeken goedkoper of fijner is." },
    ],
    voorbeeld: {
      naam: "B&B De Duinroos",
      domein: "bnbdeduinroos.nl",
      tagline: "Bed & breakfast aan de rand van de duinen in Bloemendaal",
      nav: ["Kamers", "Ontbijt", "Omgeving", "Boeken"],
      kop: "Slapen tussen duin en zee.",
      sub: "Drie sfeervolle kamers en een uitgebreid ontbijt. Direct boeken is altijd voordeliger.",
      cta: "Beschikbaarheid bekijken",
      blokken: [
        { titel: "Duinkamer", tekst: "Vanaf €115 per nacht" },
        { titel: "Ontbijt", tekst: "Lokaal en vers" },
        { titel: "Omgeving", tekst: "5 min fietsen naar het strand" },
      ],
    },
    vragen: [
      "Romantische B&B bij de duinen in Bloemendaal",
      "Vakantiehuis direct boeken zonder Booking",
      "Bed and breakfast near Haarlem beach",
    ],
    faq: [
      { question: "Voorkomt de koppeling dubbele boekingen?", answer: "Ja, de agenda synchroniseert met Booking en Airbnb via iCal." },
      { question: "Kunnen gasten direct betalen?", answer: "Ja, via iDEAL of creditcard, of met een aanbetaling." },
      { question: "Kan ik zelf prijzen per seizoen instellen?", answer: "Ja, inclusief minimale verblijfsduur en speciale periodes." },
      { question: "Is de site meertalig?", answer: "Ja, wij leveren Nederlands, Engels en Duits." },
    ],
    keywords: ["website bed and breakfast", "vakantiewoning website direct boeken", "website B&B laten maken", "boekingssysteem vakantieverhuur"],
  },
  {
    slug: "camping",
    label: "Campings & glamping",
    kort: "Campings",
    icon: "⛺",
    accent: "#166534",
    heroFoto: u("photo-1504280390367-361c6d9f38f4"),
    voorbeeldFoto: u("photo-1523987355523-c7b5b0dd90a7", 1000),
    h1: "Plaatsen vol,",
    h1Accent: "seizoen na seizoen.",
    intro:
      "Kampeerders kiezen hun camping op foto's, faciliteiten en hoe makkelijk ze kunnen reserveren. Een mooie site met online boeken maakt het verschil met de camping verderop.",
    problemen: [
      "Reserveren via e-mail en telefoon kost u in het hoogseizoen uren per dag.",
      "Foto's en faciliteiten zijn verouderd.",
      "Geen idee welke plaatsen vrij zijn, voor de gast én voor uzelf.",
    ],
    oplossingen: [
      { titel: "Plaats kiezen", tekst: "Een plattegrond waarop gasten hun eigen plek kiezen." },
      { titel: "Online reserveren", tekst: "Beschikbaarheid, prijzen per seizoen en aanbetaling." },
      { titel: "Accommodaties", tekst: "Kampeerplaats, safaritent, chalet of glamping-lodge." },
      { titel: "Faciliteiten & regio", tekst: "Sanitair, zwembad, honden welkom en uitjes in de buurt." },
      { titel: "Meertalig", tekst: "Voor Duitse, Belgische en Engelse gasten." },
      { titel: "Gevonden in AI", tekst: "Bij vragen als 'rustige camping met kinderen aan het water'." },
    ],
    voorbeeld: {
      naam: "Camping Het Wilde Duin",
      domein: "campinghetwildeduin.nl",
      tagline: "Natuurcamping en glamping aan de kust",
      nav: ["Kamperen", "Glamping", "Faciliteiten", "Reserveren"],
      kop: "Wakker worden in de natuur.",
      sub: "Ruime plaatsen, ecologisch sanitair en lodges met eigen badkamer. Honden welkom.",
      cta: "Kies uw plek",
      blokken: [
        { titel: "Kampeerplaats", tekst: "Vanaf €29 per nacht" },
        { titel: "Safaritent", tekst: "Volledig ingericht" },
        { titel: "Lodge", tekst: "Met eigen badkamer" },
      ],
    },
    vragen: [
      "Rustige natuurcamping aan zee met kinderen",
      "Glamping in Noord-Holland met eigen badkamer",
      "Camping waar honden welkom zijn bij de duinen",
    ],
    faq: [
      { question: "Kunnen gasten zelf een plek kiezen op de kaart?", answer: "Ja, met een interactieve plattegrond die de vrije plaatsen toont." },
      { question: "Werkt het met mijn campingsoftware?", answer: "We bekijken de koppeling met uw systeem, of gebruiken een eenvoudige eigen module." },
      { question: "Kan ik seizoensprijzen instellen?", answer: "Ja, inclusief hoogseizoen, acties en minimale verblijfsduur." },
      { question: "Is de site snel genoeg voor veel foto's?", answer: "Ja, foto's worden automatisch geoptimaliseerd zodat de site snel blijft." },
    ],
    keywords: ["website camping", "camping online reserveren", "website glamping laten maken", "boekingssysteem camping"],
  },
  {
    slug: "bakkerij",
    label: "Bakkerijen & patisserie",
    kort: "Bakkerijen",
    icon: "🥐",
    accent: "#92400e",
    heroFoto: u("photo-1509440159596-0249088772ff"),
    voorbeeldFoto: u("photo-1517433670267-08bbd4be890f", 1000),
    h1: "Vers uit de oven,",
    h1Accent: "vooraf besteld.",
    intro:
      "Taarten, broodjes voor de lunch, gebak voor een verjaardag: klanten willen het online bestellen en op tijd ophalen. Zo maakt u minder misbaksels en meer omzet.",
    problemen: [
      "Bestellingen komen via telefoon en briefjes, met fouten als gevolg.",
      "Openingstijden op Google kloppen niet met de site.",
      "Speciale taarten en zakelijke lunches zijn onzichtbaar online.",
    ],
    oplossingen: [
      { titel: "Bestellen & afhalen", tekst: "Klanten kiezen product, datum en afhaaltijd." },
      { titel: "Taartconfigurator", tekst: "Formaat, smaak en tekst kiezen, met een foto-upload." },
      { titel: "Zakelijke lunch", tekst: "Bestelformulier voor kantoren en vergaderingen." },
      { titel: "Altijd juiste openingstijden", tekst: "Eén plek die ook Google voedt." },
      { titel: "Lokaal gevonden", tekst: "'Verjaardagstaart bestellen + plaats'." },
      { titel: "Smakelijke foto's", tekst: "Groot, scherp en snel geladen." },
    ],
    voorbeeld: {
      naam: "Bakkerij Korenbloem",
      domein: "bakkerijkorenbloem.nl",
      tagline: "Ambachtelijke bakker sinds 1968",
      nav: ["Assortiment", "Taarten", "Zakelijk", "Bestellen"],
      kop: "Morgen vers op tafel? Bestel vóór 16:00.",
      sub: "Dagelijks vers desembrood, gebak en taarten op maat. Afhalen of bezorgen.",
      cta: "Bestellen",
      blokken: [
        { titel: "Desembrood", tekst: "Lang gerezen, elke dag vers" },
        { titel: "Taart op maat", tekst: "Met foto of eigen tekst" },
        { titel: "Lunch", tekst: "Bezorgd op kantoor" },
      ],
    },
    vragen: [
      "Verjaardagstaart met foto bestellen in Haarlem",
      "Ambachtelijke bakker met desembrood bij mij in de buurt",
      "Lunch laten bezorgen op kantoor Haarlem",
    ],
    faq: [
      { question: "Kunnen klanten vooraf betalen?", answer: "Ja, met iDEAL bij het bestellen, of betalen bij het afhalen." },
      { question: "Kan ik een besteltermijn instellen?", answer: "Ja, bijvoorbeeld taarten minimaal 2 dagen vooruit en brood voor 16:00 de dag ervoor." },
      { question: "Krijg ik een overzicht van de bestellingen?", answer: "Ja, een dagoverzicht per afhaalmoment, ook op een tablet in de bakkerij." },
      { question: "Kunnen jullie mijn Google-openingstijden kloppend maken?", answer: "Ja, we richten uw Google Bedrijfsprofiel mee in." },
    ],
    keywords: ["website bakkerij", "online bestellen bakker", "taart bestellen website", "website patisserie laten maken"],
  },
];

export const SECTOR_SLUGS = SECTORS.map((s) => s.slug);

export function getSector(slug: string): Sector {
  const s = SECTORS.find((x) => x.slug === slug);
  if (!s) throw new Error(`Onbekende sector: ${slug}`);
  return s;
}

export function sectorMetadata(s: Sector): Metadata {
  const path = `/${s.slug}`;
  const title = `Website voor ${s.label.toLowerCase()}`;
  const description = `${s.h1} ${s.h1Accent} ${s.intro}`.slice(0, 158).replace(/\s+\S*$/, "") + "…";
  return {
    title,
    description,
    keywords: s.keywords,
    alternates: pageAlternates(path),
    openGraph: {
      title: `${title} | Allesis`,
      description,
      url: `${SITE_URL}${path}`,
      locale: "nl_NL",
      type: "website",
      images: [{ url: s.heroFoto.replace("w=1600", "w=1200"), width: 1200, height: 630, alt: s.label }],
    },
  };
}
