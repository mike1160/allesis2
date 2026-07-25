import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Websites per branche — Allesis",
  description:
    "Websites die passen bij uw vak: horeca, beauty, bouw, zorg, ZZP, webshop en meer. Gevonden door klanten én AI.",
  alternates: pageAlternates("/branches"),
  openGraph: {
    title: "Websites voor uw branche | Allesis",
    description: "Allesis bouwt websites die passen bij uw vak — gevonden door klanten én AI.",
    url: `${SITE_URL}/branches`,
    locale: "nl_NL",
    type: "website",
  },
};

type BranchCard = {
  naam: string;
  href: string;
  icon: string;
  foto?: string;
};

const BRANCH_CARDS: BranchCard[] = [
  // Bestaande pagina's — hero-foto's
  {
    naam: "Horeca & Restaurants",
    href: "/horeca",
    icon: "🍽️",
    foto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=70",
  },
  {
    naam: "Beauty & Salons",
    href: "/beauty",
    icon: "💆",
    foto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=70",
  },
  {
    naam: "Bouw & Vakmensen",
    href: "/bouw",
    icon: "🔨",
    foto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=70",
  },
  {
    naam: "Zorg & Coaches",
    href: "/zorg",
    icon: "🏥",
    foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=70",
  },
  {
    naam: "ZZP'ers & Freelancers",
    href: "/zzp",
    icon: "💼",
    foto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=70",
  },
  {
    naam: "Non-profit & Stichtingen",
    href: "/non-profit",
    icon: "❤️",
    foto: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=70",
  },
  {
    naam: "Webshops & E-commerce",
    href: "/webshop",
    icon: "🛒",
    foto: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=70",
  },
  {
    naam: "Tandartsen & Huisartsen",
    href: "/tandarts",
    icon: "🦷",
    foto: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=70",
  },
  {
    naam: "Vastgoed & Makelaars",
    href: "/vastgoed",
    icon: "🏠",
    foto: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=70",
  },
  {
    naam: "Sport & Fitness",
    href: "/sport",
    icon: "⚽",
    foto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=70",
  },
  {
    naam: "Advocaten",
    href: "/advocaat",
    icon: "⚖️",
    foto: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=70",
  },
  {
    naam: "Thaise Ondernemers",
    href: "/thai",
    icon: "🇹🇭",
    foto: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=70",
  },
  // Nieuwe branches — Pexels
  {
    naam: "Kappers & Barbiers",
    href: "/kappers",
    icon: "✂️",
    foto: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg",
  },
  {
    naam: "Fotografie & Video",
    href: "/fotografie",
    icon: "📷",
    foto: "https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg",
  },
  {
    naam: "Coaching & Training",
    href: "/coaching",
    icon: "🎯",
    foto: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
  {
    naam: "Accountants & Boekhouders",
    href: "/accountant",
    icon: "📊",
    foto: "https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg",
  },
  {
    naam: "Architecten & Interieur",
    href: "/architect",
    icon: "📐",
    foto: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
  },
  {
    naam: "Kinderopvang & BSO",
    href: "/kinderopvang",
    icon: "🧒",
    foto: "https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg",
  },
  {
    naam: "Autogarages & Mobiliteit",
    href: "/garage",
    icon: "🔧",
    foto: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg",
  },
  {
    naam: "Catering & Evenementen",
    href: "/catering",
    icon: "🎉",
    foto: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
  },
  {
    naam: "Reizen & Toerisme",
    href: "/reizen",
    icon: "✈️",
    foto: "https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg",
  },
  {
    naam: "IT & Technologie",
    href: "/it",
    icon: "💻",
    foto: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
  },
  {
    naam: "Marketing & Communicatie",
    href: "/marketing",
    icon: "📣",
    foto: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
  },
  {
    naam: "Onderwijs & Bijles",
    href: "/onderwijs",
    icon: "📚",
    foto: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg",
  },
  {
    naam: "Notarissen & Juristen",
    href: "/notaris",
    icon: "📜",
    foto: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg",
  },
  {
    naam: "Psychologen & Therapeuten",
    href: "/psycholoog",
    icon: "🧠",
    foto: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
  },
  {
    naam: "Dierenkliniek & Dierenarts",
    href: "/dierenarts",
    icon: "🐾",
    foto: "https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg",
  },
  {
    naam: "Schoonmaak & Facilitair",
    href: "/schoonmaak",
    icon: "✨",
    foto: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg",
  },
  {
    naam: "Beveiliging & Toezicht",
    href: "/beveiliging",
    icon: "🛡️",
    foto: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg",
  },
  {
    naam: "Tuiniers & Hoveniers",
    href: "/tuin",
    icon: "🌿",
    foto: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg",
  },
  {
    naam: "Installateurs & Elektriciens",
    href: "/installateur",
    icon: "⚡",
    foto: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
  },
  {
    naam: "Bruidsparen & Trouwdiensten",
    href: "/bruiloft",
    icon: "💍",
    foto: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
  },
  {
    naam: "Dierenwinkels & Dierenspeciaalzaken",
    href: "/dierenwinkel",
    icon: "🐕",
    foto: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
  },
  {
    naam: "Bouwmarkten & Doe-het-zelf",
    href: "/bouwmarkt",
    icon: "🛠️",
    foto: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg",
  },
  {
    naam: "Tuincentra & Kwekerijen",
    href: "/tuincentrum",
    icon: "🪴",
    foto: "https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg",
  },
  {
    naam: "Groothandel & Importeurs",
    href: "/groothandel",
    icon: "📦",
    foto: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg",
  },
  {
    naam: "Supermarkten & Delicatessen",
    href: "/supermarkt",
    icon: "🛒",
    foto: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg",
  },
  {
    naam: "Meubelzaken & Woonwinkels",
    href: "/meubels",
    icon: "🛋️",
    foto: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
  },
  {
    naam: "Elektronica & Witgoed",
    href: "/elektronica",
    icon: "📺",
    foto: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
  },
  {
    naam: "Kledingwinkels & Boetiekjes",
    href: "/kleding",
    icon: "👗",
    foto: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg",
  },
  {
    naam: "Speelgoedwinkels & Kindermode",
    href: "/speelgoed",
    icon: "🧸",
    foto: "https://images.pexels.com/photos/163036/mario-luigi-yoshi-figures-163036.jpeg",
  },
  {
    naam: "Boekhandels & Kantoorartikelen",
    href: "/boekhandel",
    icon: "📖",
    foto: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg",
  },
  {
    naam: "Juweliers & Cadeauwinkels",
    href: "/juwelier",
    icon: "💎",
    foto: "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg",
  },
  {
    naam: "Fietsenmakers & Sportwinkel",
    href: "/fietswinkel",
    icon: "🚲",
    foto: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg",
  },
  {
    naam: "Slagers & Bakkers",
    href: "/slager",
    icon: "🥖",
    foto: "https://images.pexels.com/photos/618773/pexels-photo-618773.jpeg",
  },
  {
    naam: "Bloemisten & Cadeaushops",
    href: "/bloemist",
    icon: "💐",
    foto: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg",
  },
  {
    naam: "Apothekers & Drogisterijen",
    href: "/apotheek",
    icon: "💊",
    foto: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
  },
  {
    naam: "Opticiëns & Brillenwinkels",
    href: "/opticien",
    icon: "👓",
    foto: "https://images.pexels.com/photos/975250/pexels-photo-975250.jpeg",
  },
  {
    naam: "Muziekwinkels & Instrumenten",
    href: "/muziek",
    icon: "🎸",
    foto: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg",
  },
  {
    naam: "Wijnhandel & Slijterijen",
    href: "/wijn",
    icon: "🍷",
    foto: "https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg",
  },
];

export default function BranchesPage() {
  return (
    <main>
      <section className="bg-white px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32" style={{ minHeight: "auto" }}>
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-lato mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "#3B6D11" }}>
            Branches
          </p>
          <h1 className="font-sora text-4xl font-black tracking-tight text-neutral-dark md:text-5xl">
            Websites voor uw branche
          </h1>
          <p className="font-lato mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-500">
            Allesis bouwt websites die passen bij uw vak — gevonden door klanten én AI
          </p>
        </div>
      </section>

      <section className="bg-white px-6 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRANCH_CARDS.map((branch) => (
            <Link
              key={branch.href}
              href={branch.href}
              className="group relative block aspect-[4/3] overflow-hidden no-underline transition duration-300 hover:brightness-110"
              style={{
                borderRadius: 12,
                ...(branch.foto
                  ? {
                      backgroundImage: `url(${branch.foto})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : { backgroundColor: "#EAF3DE" }),
              }}
            >
              {branch.foto && (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: "rgba(0,0,0,0.42)" }}
                  aria-hidden
                />
              )}

              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="mb-2 text-2xl" aria-hidden>
                  {branch.icon}
                </span>
                <h2
                  className={`font-sora text-base font-bold leading-snug md:text-lg ${
                    branch.foto ? "text-white" : ""
                  }`}
                  style={branch.foto ? undefined : { color: "#3B6D11" }}
                >
                  {branch.naam}
                </h2>
                <span
                  className={`mt-2 text-xs font-semibold transition group-hover:translate-x-0.5 ${
                    branch.foto ? "text-white" : ""
                  }`}
                  style={branch.foto ? undefined : { color: "#3B6D11" }}
                >
                  Bekijk →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
