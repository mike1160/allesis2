import type { Metadata } from "next";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export type ExtraBrancheCard = {
  icon: string;
  titel: string;
  tekst: string;
  foto: string;
};

export type ExtraBrancheConfig = {
  slug: string;
  label: string;
  h1: string;
  stat: string;
  heroFoto: string;
  cards: ExtraBrancheCard[];
  metadata: Metadata;
};

function meta(slug: string, label: string, h1: string, stat: string): Metadata {
  const path = `/${slug}`;
  const title = `Website voor ${label.toLowerCase()} laten maken`;
  const description = `${h1} ${stat} Allesis bouwt snelle, vindbare websites voor ${label.toLowerCase()}.`;
  return {
    title,
    description,
    alternates: pageAlternates(path),
    openGraph: {
      title: `${label} website | Allesis`,
      description,
      url: `${SITE_URL}${path}`,
      locale: "nl_NL",
      type: "website",
    },
  };
}

function branch(
  slug: string,
  label: string,
  h1: string,
  stat: string,
  heroFoto: string,
  cards: [ExtraBrancheCard, ExtraBrancheCard, ExtraBrancheCard],
): ExtraBrancheConfig {
  return {
    slug,
    label,
    h1,
    stat,
    heroFoto,
    cards,
    metadata: meta(slug, label, h1, stat),
  };
}

const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?w=${w}&q=75`;
const c = (id: string) => u(id, 800);

export const EXTRA_BRANCHES: Record<string, ExtraBrancheConfig> = {
  kappers: branch(
    "kappers",
    "Kappers & Barbiers",
    "Uw kapsalon altijd volgeboekt",
    "Meer dan 8 miljoen zoekopdrachten per maand naar kappers in Nederland",
    u("photo-1560066984-138dadb4c035"),
    [
      { icon: "📅", titel: "Online afspraken", tekst: "Klanten boeken zelf een knipbeurt — 24/7.", foto: c("photo-1560066984-138dadb4c035") },
      { icon: "📸", titel: "Voor & na foto's", tekst: "Toon uw beste werk in een sfeervolle gallerij.", foto: c("photo-1522337360788-8b13dee7a37e") },
      { icon: "⭐", titel: "Google Reviews", tekst: "Reviews automatisch op uw site — meer vertrouwen.", foto: c("photo-1600880292203-757bb62b4baf") },
    ],
  ),
  fotografie: branch(
    "fotografie",
    "Fotografie & Video",
    "Uw portfolio. Altijd gevonden.",
    "80% van klanten zoekt een fotograaf online",
    u("photo-1452587925148-ce544e77e70d"),
    [
      { icon: "🖼️", titel: "Portfolio gallerij", tekst: "Laat uw beste shots zien in een snelle gallerij.", foto: c("photo-1452587925148-ce544e77e70d") },
      { icon: "📅", titel: "Boekingsmodule", tekst: "Klanten plannen shoots direct via uw site.", foto: c("photo-1516035069371-29a1b244cc32") },
      { icon: "📱", titel: "Instagram koppeling", tekst: "Feed automatisch synchroon met uw website.", foto: c("photo-1611162616305-c69b3fa7fbe0") },
    ],
  ),
  coaching: branch(
    "coaching",
    "Coaching & Training",
    "Meer coachingklanten via uw website",
    "Coaching markt groeit 15% per jaar",
    u("photo-1552664730-d307ca884978"),
    [
      { icon: "📝", titel: "Intake formulier", tekst: "Nieuwe klanten melden zich met één klik.", foto: c("photo-1552664730-d307ca884978") },
      { icon: "💻", titel: "Online sessies", tekst: "Koppel Zoom of Teams voor virtuele coaching.", foto: c("photo-1588196749597-9ff075ee6b5b") },
      { icon: "💬", titel: "Testimonials", tekst: "Resultaten van klanten zichtbaar op uw site.", foto: c("photo-1600880292203-757bb62b4baf") },
    ],
  ),
  accountant: branch(
    "accountant",
    "Accountants & Boekhouders",
    "Vertrouwen begint online",
    "73% zoekt een accountant via Google",
    u("photo-1554224155-6726b3ff858f"),
    [
      { icon: "🔒", titel: "AVG-proof", tekst: "Privacy en veiligheid standaard inbegrepen.", foto: c("photo-1614064641938-3bbee52942c7") },
      { icon: "📧", titel: "Beveiligd contact", tekst: "Veilig contactformulier voor gevoelige vragen.", foto: c("photo-1554224155-6726b3ff858f") },
      { icon: "✅", titel: "KvK verificatie", tekst: "Toon uw registratie en certificeringen.", foto: c("photo-1450101499163-c8848c66ca85") },
    ],
  ),
  architect: branch(
    "architect",
    "Architecten & Interieur",
    "Uw ontwerpen verdienen een prachtige website",
    "Architecten met website krijgen 3x meer aanvragen",
    u("photo-1503387762-592deb58ef4e"),
    [
      { icon: "🏗️", titel: "Portfolio showcase", tekst: "Projecten in een strak, beeldend overzicht.", foto: c("photo-1503387762-592deb58ef4e") },
      { icon: "📐", titel: "3D renders", tekst: "Toon renders en visualisaties in hoge kwaliteit.", foto: c("photo-1487958449943-2429e8be8625") },
      { icon: "📂", titel: "Projectpagina's", tekst: "Elk project met eigen verhaal en foto's.", foto: c("photo-1497366216548-37526070297c") },
    ],
  ),
  kinderopvang: branch(
    "kinderopvang",
    "Kinderopvang & BSO",
    "Ouders vinden u — dag en nacht",
    "Ouders zoeken 24/7 naar opvang",
    u("photo-1503454537195-1dcabb73ffb9"),
    [
      { icon: "📋", titel: "Wachtlijst module", tekst: "Ouders schrijven zich online in op de wachtlijst.", foto: c("photo-1503454537195-1dcabb73ffb9") },
      { icon: "🗓️", titel: "Dagschema", tekst: "Duidelijk overzicht van activiteiten en tijden.", foto: c("photo-1587654780291-39c9404d746b") },
      { icon: "🔐", titel: "AVG-proof ouderportaal", tekst: "Veilige communicatie met ouders.", foto: c("photo-1614064641938-3bbee52942c7") },
    ],
  ),
  garage: branch(
    "garage",
    "Autogarages & Mobiliteit",
    "Meer auto's binnen via Google",
    "65% zoekt een garage online voor een afspraak",
    u("photo-1486262715619-67b85e0b08d3"),
    [
      { icon: "📅", titel: "Online afspraken", tekst: "Klanten plannen onderhoud zelf in.", foto: c("photo-1486262715619-67b85e0b08d3") },
      { icon: "🚗", titel: "Kenteken check", tekst: "Snelle intake via kenteken.", foto: c("photo-1492144534655-ae79c964c9d7") },
      { icon: "⭐", titel: "Reviews integratie", tekst: "Google-reviews prominent op uw site.", foto: c("photo-1600880292203-757bb62b4baf") },
    ],
  ),
  catering: branch(
    "catering",
    "Catering & Evenementen",
    "Uw catering. Overal gevonden.",
    "Evenementen markt groeit explosief",
    u("photo-1555244162-803834f70033"),
    [
      { icon: "🍽️", titel: "Menukaart online", tekst: "Altijd actueel menu voor uw gasten.", foto: c("photo-1555244162-803834f70033") },
      { icon: "📝", titel: "Offerte aanvragen", tekst: "Directe aanvragen via een slim formulier.", foto: c("photo-1414235077428-338989a2e8c0") },
      { icon: "📸", titel: "Foto gallerij", tekst: "Sfeerbeelden van buffetten en events.", foto: c("photo-1466978913421-dad2ebd01d17") },
    ],
  ),
  reizen: branch(
    "reizen",
    "Reizen & Toerisme",
    "Reizigers vinden u — niet de concurrent",
    "92% boekt reizen via internet",
    u("photo-1488646953014-85cb44e25828"),
    [
      { icon: "✈️", titel: "Reisaanbod showcase", tekst: "Bestemmingen en pakketten overzichtelijk.", foto: c("photo-1488646953014-85cb44e25828") },
      { icon: "📅", titel: "Boekingsmodule", tekst: "Aanvragen en reserveringen online.", foto: c("photo-1436491865332-7a61a109cc05") },
      { icon: "⭐", titel: "Reviews", tekst: "Ervaringen van reizigers op uw site.", foto: c("photo-1600880292203-757bb62b4baf") },
    ],
  ),
  it: branch(
    "it",
    "IT & Technologie",
    "Laat zien wat u kunt — online",
    "IT bedrijven zonder goede site missen 60% van leads",
    u("photo-1518770660439-4636190af475"),
    [
      { icon: "📁", titel: "Case studies", tekst: "Toon resultaten en tech-cases.", foto: c("photo-1518770660439-4636190af475") },
      { icon: "⚙️", titel: "Tech stack showcase", tekst: "Uw expertise zichtbaar en vindbaar.", foto: c("photo-1558494949-ef010cbdcc31") },
      { icon: "📨", titel: "Contactformulier", tekst: "Kwalitatieve leads via uw site.", foto: c("photo-1467232004584-a241de8bcf5d") },
    ],
  ),
  marketing: branch(
    "marketing",
    "Marketing & Communicatie",
    "Uw marketingbureau verdient een topwebsite",
    "Bureaus met sterke site winnen meer pitches",
    u("photo-1552664730-d307ca884978"),
    [
      { icon: "💼", titel: "Portfolio cases", tekst: "Campagnes en resultaten in beeld.", foto: c("photo-1552664730-d307ca884978") },
      { icon: "👥", titel: "Team pagina", tekst: "Laat zien wie er achter uw bureau staat.", foto: c("photo-1522071820081-009f0129c71c") },
      { icon: "📋", titel: "Diensten overzicht", tekst: "Duidelijke dienstenpagina's die converteren.", foto: c("photo-1432888498266-38ffec3eaf0a") },
    ],
  ),
  onderwijs: branch(
    "onderwijs",
    "Onderwijs & Bijles",
    "Meer leerlingen via een professionele website",
    "Ouders vergelijken scholen online",
    u("photo-1509062522246-3755977927d7"),
    [
      { icon: "📚", titel: "Cursus overzicht", tekst: "Lesaanbod helder en up-to-date.", foto: c("photo-1509062522246-3755977927d7") },
      { icon: "✍️", titel: "Inschrijfmodule", tekst: "Inschrijven zonder gedoe.", foto: c("photo-1427504494785-3a9ca7044f45") },
      { icon: "🏆", titel: "Resultaten showcase", tekst: "Succesverhalen van leerlingen.", foto: c("photo-1523240795612-9a054b0db644") },
    ],
  ),
  notaris: branch(
    "notaris",
    "Notarissen & Juristen",
    "Vertrouwen en autoriteit — online",
    "Notarissen zonder website verliezen cliënten",
    u("photo-1589829545856-d10d557cf95f"),
    [
      { icon: "⚖️", titel: "Diensten overzicht", tekst: "Heldere uitleg van uw specialismen.", foto: c("photo-1589829545856-d10d557cf95f") },
      { icon: "🔒", titel: "AVG-proof", tekst: "Maximale privacy voor gevoelige zaken.", foto: c("photo-1614064641938-3bbee52942c7") },
      { icon: "📅", titel: "Afspraak plannen", tekst: "Cliënten boeken een intake online.", foto: c("photo-1450101499163-c8848c66ca85") },
    ],
  ),
  psycholoog: branch(
    "psycholoog",
    "Psychologen & Therapeuten",
    "Veilig. Vindbaar. Vertrouwd.",
    "70% zoekt online naar een psycholoog",
    u("photo-1573497019940-1c28c88b4f3e"),
    [
      { icon: "🕊️", titel: "Anoniem contact", tekst: "Laagdrempelig en discreet bereikbaar.", foto: c("photo-1573497019940-1c28c88b4f3e") },
      { icon: "🔒", titel: "AVG-proof", tekst: "Privacy first — zoals het hoort.", foto: c("photo-1614064641938-3bbee52942c7") },
      { icon: "📝", titel: "Intake formulier", tekst: "Veilige eerste stap voor cliënten.", foto: c("photo-1516321318423-f06f85e504b3") },
    ],
  ),
  dierenarts: branch(
    "dierenarts",
    "Dierenkliniek & Dierenarts",
    "Elke diereneigenaar vindt u online",
    "Diereneigenaren zoeken 24/7 naar zorg",
    u("photo-1628009368231-7bb7cfcb0def"),
    [
      { icon: "📅", titel: "Online afspraken", tekst: "Consulten plannen zonder telefoontje.", foto: c("photo-1628009368231-7bb7cfcb0def") },
      { icon: "🚨", titel: "Spoedlijn", tekst: "Duidelijke spoedinfo op de homepage.", foto: c("photo-1548199973-03cce0bbc87b") },
      { icon: "💊", titel: "Behandelingen", tekst: "Overzicht van zorg en specialismen.", foto: c("photo-1583337130417-3346a1be7dee") },
    ],
  ),
  schoonmaak: branch(
    "schoonmaak",
    "Schoonmaak & Facilitair",
    "Meer schoonmaakopdrachten via Google",
    "MKB schoonmaak groeit 20% per jaar",
    u("photo-1581578731548-c64695cc6952"),
    [
      { icon: "📝", titel: "Offerte aanvragen", tekst: "Directe leads via een duidelijk formulier.", foto: c("photo-1581578731548-c64695cc6952") },
      { icon: "🏅", titel: "Referenties", tekst: "Tevreden klanten zichtbaar op uw site.", foto: c("photo-1600880292203-757bb62b4baf") },
      { icon: "🗺️", titel: "Werkgebied kaart", tekst: "Laat zien waar u actief bent.", foto: c("photo-1524661135-423995f22d0b") },
    ],
  ),
  beveiliging: branch(
    "beveiliging",
    "Beveiliging & Toezicht",
    "Betrouwbaar. Professioneel. Vindbaar.",
    "Beveiliging markt groeit door stijgende vraag",
    u("photo-1557597774-9d273605dfa9"),
    [
      { icon: "🛡️", titel: "Diensten overzicht", tekst: "Bewaking, camera's, alarm — helder uitgelegd.", foto: c("photo-1557597774-9d273605dfa9") },
      { icon: "✅", titel: "Certificeringen", tekst: "Toon uw keurmerken en vergunningen.", foto: c("photo-1450101499163-c8848c66ca85") },
      { icon: "📞", titel: "24/7 contact", tekst: "Altijd bereikbaar voor spoed.", foto: c("photo-1423666639041-f56000c27a9a") },
    ],
  ),
  tuin: branch(
    "tuin",
    "Tuiniers & Hoveniers",
    "Meer tuinopdrachten — het hele jaar",
    "Tuiniers met website krijgen 4x meer aanvragen",
    u("photo-1416879595882-3373a0480b5b"),
    [
      { icon: "🌿", titel: "Portfolio voor & na", tekst: "Laat resultaten zien die overtuigen.", foto: c("photo-1416879595882-3373a0480b5b") },
      { icon: "📝", titel: "Offerte aanvragen", tekst: "Nieuwe klanten melden zich online.", foto: c("photo-1466692476866-aef1dfb1e735") },
      { icon: "🗺️", titel: "Werkgebied", tekst: "Duidelijk waar u tuinen aanlegt.", foto: c("photo-1524661135-423995f22d0b") },
    ],
  ),
  installateur: branch(
    "installateur",
    "Installateurs & Elektriciens",
    "Meer klussen via uw eigen website",
    "80% zoekt een installateur via Google",
    u("photo-1621905251189-08b45d6a269e"),
    [
      { icon: "⚡", titel: "Spoedreparatie knop", tekst: "Direct zichtbaar bij storing.", foto: c("photo-1621905251189-08b45d6a269e") },
      { icon: "✅", titel: "Certificeringen", tekst: "VCA, NEN — toon wat u waard bent.", foto: c("photo-1504307651254-35680f356dfd") },
      { icon: "🗺️", titel: "Werkgebied kaart", tekst: "Klanten zien direct of u in de buurt bent.", foto: c("photo-1524661135-423995f22d0b") },
    ],
  ),
  bruiloft: branch(
    "bruiloft",
    "Bruidsparen & Trouwdiensten",
    "Maak elke bruiloft onvergetelijk — begin online",
    "Stellen vergelijken leveranciers online",
    u("photo-1519741497674-611481863552"),
    [
      { icon: "💍", titel: "Portfolio gallerij", tekst: "Sfeerbeelden die verliefd maken.", foto: c("photo-1519741497674-611481863552") },
      { icon: "📦", titel: "Pakketten", tekst: "Duidelijke pakketten en prijzen.", foto: c("photo-1465495976277-4387d4b0b4c6") },
      { icon: "📅", titel: "Beschikbaarheid check", tekst: "Stellen checken of hun datum vrij is.", foto: c("photo-1520854221256-17451cc331bf") },
    ],
  ),
  dierenwinkel: branch(
    "dierenwinkel",
    "Dierenwinkels & Dierenspeciaalzaken",
    "Elk huisdier verdient de beste winkel",
    "Dierenwinkel zoekopdrachten stijgen elk jaar",
    u("photo-1583337130417-3346a1be7dee"),
    [
      { icon: "🦴", titel: "Productaanbod", tekst: "Assortiment overzichtelijk online.", foto: c("photo-1583337130417-3346a1be7dee") },
      { icon: "🕒", titel: "Openingstijden", tekst: "Altijd actueel — ook op mobiel.", foto: c("photo-1548199973-03cce0bbc87b") },
      { icon: "🎁", titel: "Loyaliteitsprogramma", tekst: "Stamklanten belonen via uw site.", foto: c("photo-1450778869180-41d0601e046e") },
    ],
  ),
  bouwmarkt: branch(
    "bouwmarkt",
    "Bouwmarkten & Doe-het-zelf",
    "Van schroef tot dakpan — altijd vindbaar",
    "DIY markt groeit explosief online",
    u("photo-1504307651254-35680f356dfd"),
    [
      { icon: "🔩", titel: "Productcatalogus", tekst: "Assortiment zoekbaar en up-to-date.", foto: c("photo-1504307651254-35680f356dfd") },
      { icon: "🕒", titel: "Openingstijden", tekst: "Klanten weten wanneer u open bent.", foto: c("photo-1581094794329-adeeebd7dd31") },
      { icon: "💬", titel: "Klantenservice", tekst: "Vragen via chat of formulier.", foto: c("photo-1423666639041-f56000c27a9a") },
    ],
  ),
  tuincentrum: branch(
    "tuincentrum",
    "Tuincentra & Kwekerijen",
    "Meer klanten — elk seizoen",
    "Tuincentra zoekopdrachten pieken in voorjaar",
    u("photo-1416879595882-3373a0480b5b"),
    [
      { icon: "🌸", titel: "Seizoensaanbod", tekst: "Highlight wat nu in bloei staat.", foto: c("photo-1416879595882-3373a0480b5b") },
      { icon: "🕒", titel: "Openingstijden", tekst: "Duidelijk zichtbaar op elke pagina.", foto: c("photo-1466692476866-aef1dfb1e735") },
      { icon: "🎓", titel: "Workshops", tekst: "Agenda voor workshops en events.", foto: c("photo-1464226184884-fa280b87c399") },
    ],
  ),
  groothandel: branch(
    "groothandel",
    "Groothandel & Importeurs",
    "Uw groothandel. Online. Professioneel.",
    "B2B inkopers zoeken online naar leveranciers",
    u("photo-1553413077-190dd305871c"),
    [
      { icon: "📦", titel: "Productcatalogus", tekst: "Assortiment voor zakelijke klanten.", foto: c("photo-1553413077-190dd305871c") },
      { icon: "🛒", titel: "Bestelportaal", tekst: "Herhaalbestellingen eenvoudig online.", foto: c("photo-1586528116311-ad8dd3c8310d") },
      { icon: "🔐", titel: "Klantenlogin", tekst: "Persoonlijke prijzen en historie.", foto: c("photo-1454165804606-c3d57bc86b40") },
    ],
  ),
  supermarkt: branch(
    "supermarkt",
    "Supermarkten & Delicatessen",
    "Uw lokale winkel — altijd online",
    "Lokale supermarkten winnen van ketens met goede site",
    u("photo-1542838132-92c53300491e"),
    [
      { icon: "🏷️", titel: "Weekaanbiedingen", tekst: "Acties die klanten terugbrengen.", foto: c("photo-1542838132-92c53300491e") },
      { icon: "🕒", titel: "Openingstijden", tekst: "Altijd actueel voor buurtklanten.", foto: c("photo-1578916171728-46686eac8d58") },
      { icon: "🚚", titel: "Bezorging info", tekst: "Duidelijk wanneer en waar u bezorgt.", foto: c("photo-1604719312566-8912e9227c6a") },
    ],
  ),
  meubels: branch(
    "meubels",
    "Meubelzaken & Woonwinkels",
    "Uw collectie verdient een prachtige etalage",
    "80% oriënteert zich online voor meubels",
    u("photo-1555041469-a586c61ea9bc"),
    [
      { icon: "🛋️", titel: "Collectie showcase", tekst: "Meubels in sfeervolle presentatie.", foto: c("photo-1555041469-a586c61ea9bc") },
      { icon: "📅", titel: "Showroom afspraak", tekst: "Klanten boeken een bezoek online.", foto: c("photo-1493663284031-b7e3aefcae8e") },
      { icon: "🛠️", titel: "Maatwerk configurator", tekst: "Laat opties en materialen zien.", foto: c("photo-1618221195710-dd6b41faaea6") },
    ],
  ),
  elektronica: branch(
    "elektronica",
    "Elektronica & Witgoed",
    "Techniek verkopen begint online",
    "Elektronica is de snelst groeiende online categorie",
    u("photo-1498049860654-af1a5c566876"),
    [
      { icon: "📱", titel: "Productoverzicht", tekst: "Assortiment helder en vergelijkbaar.", foto: c("photo-1498049860654-af1a5c566876") },
      { icon: "🔧", titel: "Reparatieservice", tekst: "Service aanvragen via de site.", foto: c("photo-1581092918056-0c4c3acd3789") },
      { icon: "✅", titel: "Garantie info", tekst: "Vertrouwen met duidelijke voorwaarden.", foto: c("photo-1460925895917-afdab827c52f") },
    ],
  ),
  kleding: branch(
    "kleding",
    "Kledingwinkels & Boetiekjes",
    "Uw collectie. Altijd in de etalage.",
    "Mode zoekopdrachten groeien 30% per jaar",
    u("photo-1441984904996-e0b6ba687e04"),
    [
      { icon: "👗", titel: "Collectie gallerij", tekst: "Nieuwe items direct online.", foto: c("photo-1441984904996-e0b6ba687e04") },
      { icon: "🪞", titel: "Paskamer afspraak", tekst: "Persoonlijk advies inplannen.", foto: c("photo-1558769132-cb1aea1f1cb9") },
      { icon: "🔔", titel: "Nieuwe collectie alerts", tekst: "Klanten blijven op de hoogte.", foto: c("photo-1483985988355-763728e1935b") },
    ],
  ),
  speelgoed: branch(
    "speelgoed",
    "Speelgoedwinkels & Kindermode",
    "Elk kind verdient de beste speelgoedwinkel",
    "Ouders vergelijken speelgoed online",
    u("photo-1515488042361-ee00e0ddd4e4"),
    [
      { icon: "🧸", titel: "Leeftijdscategorieën", tekst: "Snel het juiste speelgoed vinden.", foto: c("photo-1515488042361-ee00e0ddd4e4") },
      { icon: "❤️", titel: "Verlanglijstje", tekst: "Ouders en kids sparen favorieten.", foto: c("photo-1566576912321-d58ddd7a6088") },
      { icon: "🎁", titel: "Cadeautips", tekst: "Inspiratie voor elke gelegenheid.", foto: c("photo-1545558014-8692077e9b5c") },
    ],
  ),
  boekhandel: branch(
    "boekhandel",
    "Boekhandels & Kantoorartikelen",
    "Lezers vinden u — online en in de winkel",
    "Lokale boekhandels winnen van bol.com met goede site",
    u("photo-1507842217343-583bb7270b66"),
    [
      { icon: "📖", titel: "Boekentips", tekst: "Persoonlijke aanbevelingen online.", foto: c("photo-1507842217343-583bb7270b66") },
      { icon: "🎤", titel: "Evenementen", tekst: "Signeringen en lezingen in de agenda.", foto: c("photo-1524995997946-a1c2e315a42f") },
      { icon: "📦", titel: "Reserveer & afhalen", tekst: "Boeken reserveren en ophalen in de winkel.", foto: c("photo-1481627834876-b7833e8f5040") },
    ],
  ),
  juwelier: branch(
    "juwelier",
    "Juweliers & Cadeauwinkels",
    "Elk moment begint met de juiste keuze",
    "Juweliers met website verkopen 60% meer",
    u("photo-1515562141207-7a88fb7ce338"),
    [
      { icon: "💎", titel: "Collectie showcase", tekst: "Sieraden in een elegante presentatie.", foto: c("photo-1515562141207-7a88fb7ce338") },
      { icon: "✍️", titel: "Afspraak graveren", tekst: "Persoonlijke service online boeken.", foto: c("photo-1605100804763-247f67b3557e") },
      { icon: "✅", titel: "Certificeringen", tekst: "Echtheid en vakmanschap tonen.", foto: c("photo-1573408301185-9146fe634ad0") },
    ],
  ),
  fietswinkel: branch(
    "fietswinkel",
    "Fietsenmakers & Sportwinkel",
    "Meer fietsers — meer omzet",
    "Fietsmarkt groeit explosief in Nederland",
    u("photo-1485965120184-e09297345077"),
    [
      { icon: "🚲", titel: "Fietsen overzicht", tekst: "Modellen en merken overzichtelijk.", foto: c("photo-1485965120184-e09297345077") },
      { icon: "🔧", titel: "Reparatie afspraak", tekst: "Service snel online inplannen.", foto: c("photo-1558618666-fcd25c85f82e") },
      { icon: "⚡", titel: "Elektrische fietsen", tekst: "E-bikes prominent in de spotlight.", foto: c("photo-1571068316344-75bc76f77890") },
    ],
  ),
  slager: branch(
    "slager",
    "Slagers & Bakkers",
    "Vers. Lokaal. Altijd vindbaar.",
    "Lokale slagers winnen van supermarkten online",
    u("photo-1607623814075-e51df1bdc82f"),
    [
      { icon: "🥩", titel: "Weekaanbod", tekst: "Verse specials elke week online.", foto: c("photo-1607623814075-e51df1bdc82f") },
      { icon: "📦", titel: "Bestelservice", tekst: "Bestellen en ophalen of bezorgen.", foto: c("photo-1559847844-5315695dadae") },
      { icon: "🏡", titel: "Ambachtelijk verhaal", tekst: "Uw vakmanschap en herkomst vertellen.", foto: c("photo-1509440159596-0249088772ff") },
    ],
  ),
  bloemist: branch(
    "bloemist",
    "Bloemisten & Cadeaushops",
    "Elk boeket begint met een zoekopdracht",
    "Bloemen zoekopdrachten pieken rond feestdagen",
    u("photo-1490750967868-88aa4486c946"),
    [
      { icon: "💐", titel: "Boeket configurator", tekst: "Klanten stellen zelf een boeket samen.", foto: c("photo-1490750967868-88aa4486c946") },
      { icon: "🚚", titel: "Bezorging", tekst: "Bezorginfo en tijdslots duidelijk.", foto: c("photo-1487530811176-3780de880c1d") },
      { icon: "🔁", titel: "Abonnementen", tekst: "Wekelijkse bloemen voor stamklanten.", foto: c("photo-1463936573439-b4dbd2b1cbaa") },
    ],
  ),
  apotheek: branch(
    "apotheek",
    "Apothekers & Drogisterijen",
    "Vertrouwen begint online",
    "Patiënten zoeken online naar apothekers",
    u("photo-1585435557343-3b092031a831"),
    [
      { icon: "💊", titel: "Herhaalrecept", tekst: "Recepten digitaal aanvragen.", foto: c("photo-1585435557343-3b092031a831") },
      { icon: "🕒", titel: "Openingstijden", tekst: "Inclusief dienstapotheek-info.", foto: c("photo-1576091160399-112ba8d25d1d") },
      { icon: "🔒", titel: "AVG-proof", tekst: "Medische privacy standaard.", foto: c("photo-1614064641938-3bbee52942c7") },
    ],
  ),
  opticien: branch(
    "opticien",
    "Opticiëns & Brillenwinkels",
    "Scherp zien begint met gevonden worden",
    "70% zoekt online naar een opticien",
    u("photo-1574258495973-f010dfed44ce"),
    [
      { icon: "👓", titel: "Brillen collectie", tekst: "Monturen en merken in beeld.", foto: c("photo-1574258495973-f010dfed44ce") },
      { icon: "👁️", titel: "Oogmeting afspraak", tekst: "Meetafspraken online boeken.", foto: c("photo-1505751172876-fa1923c5c528") },
      { icon: "🔁", titel: "Lenzen abonnement", tekst: "Herhaalbestellingen eenvoudig.", foto: c("photo-1591076482161-42ce2a9d3a39") },
    ],
  ),
  muziek: branch(
    "muziek",
    "Muziekwinkels & Instrumenten",
    "Uw muziekwinkel — altijd in de maat",
    "Muzikanten kopen steeds meer online",
    u("photo-1511379938547-c1f69419868d"),
    [
      { icon: "🎸", titel: "Instrumenten overzicht", tekst: "Assortiment voor elke muzikant.", foto: c("photo-1511379938547-c1f69419868d") },
      { icon: "🎹", titel: "Les afspraken", tekst: "Muzieklessen online plannen.", foto: c("photo-1507838153414-b4b7134c7dba") },
      { icon: "🔧", titel: "Reparatie service", tekst: "Service-aanvragen via de site.", foto: c("photo-1514320291840-3092125aee05") },
    ],
  ),
  wijn: branch(
    "wijn",
    "Wijnhandel & Slijterijen",
    "De beste wijnen — altijd vindbaar",
    "Wijn online markt groeit 25% per jaar",
    u("photo-1510812431401-41d2bd2722f3"),
    [
      { icon: "🍷", titel: "Wijnselectie", tekst: "Collectie met filters op regio en smaak.", foto: c("photo-1510812431401-41d2bd2722f3") },
      { icon: "🥂", titel: "Proeverij afspraak", tekst: "Proeverijen online inplannen.", foto: c("photo-1506377247377-2a5b3b417ebb") },
      { icon: "🚚", titel: "Bezorgservice", tekst: "Wijn thuis laten bezorgen.", foto: c("photo-1474722883778-792e7990302f") },
    ],
  ),
};

export const EXTRA_BRANCH_SLUGS = Object.keys(EXTRA_BRANCHES);
