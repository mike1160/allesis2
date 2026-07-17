import type { Metadata } from "next";
import Link from "next/link";
import BrancheCTA from "@/components/BrancheCTA";
import FeatureGrid from "@/components/FeatureGrid";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import TriLingualFaqItem from "@/components/subpage/TriLingualFaqItem";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Thaise websites, vertaling & tolkdiensten | Thai NL EN",
  description:
    "Websites voor Thaise ondernemers in NL en wereldwijd. Vertaling Thai–Nederlands–Engels en tolkdiensten. Allesis spreekt NL, EN en TH. บริการเว็บไซต์และแปลภาษาไทย",
  alternates: pageAlternates("/thai"),
  openGraph: {
    title: "Thaise webdiensten | Allesis",
    description: "Thai websites, translation & interpretation — Dutch, English & Thai speaking team in Haarlem.",
    url: `${SITE_URL}/thai`,
    locale: "nl_NL",
    alternateLocale: ["en_US", "th_TH"],
    type: "website",
  },
};

const thaiFeatures = [
  {
    icon: "🌐",
    titel: "Websites voor Thaise ondernemers",
    beschrijving:
      "Restaurants, wellness, retail en ZZP: snelle sites in Thai, Nederlands én Engels — met oog voor cultuur en conversie.",
    foto: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=70",
  },
  {
    icon: "🗣️",
    titel: "Vertaal- en tolkdiensten",
    beschrijving: "Documenten, websites, vergaderingen en persoonlijke trajecten — Thai ↔ Nederlands ↔ Engels.",
    foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=70",
  },
  {
    icon: "⭐",
    titel: "Waarom Allesis?",
    beschrijving:
      "Lokaal in Haarlem, persoonlijk contact, technische kwaliteit en AVG-bewuste oplevering. Wij begrijpen beide culturen.",
    foto: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=70",
  },
  {
    icon: "🇹🇭",
    titel: "Thai webdesign",
    beschrijving:
      "Snelle websites met ondersteuning voor Thai, Nederlands én Engels — afgestemd op uw doelgroep.",
    foto: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=70",
  },
  {
    icon: "📄",
    titel: "Documentvertaling",
    beschrijving: "Officiële documenten, contracten, certificaten — professioneel vertaald Thai ↔ NL ↔ EN.",
    foto: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=70",
  },
  {
    icon: "🤝",
    titel: "Culturele brugfunctie",
    beschrijving:
      "Meer dan vertalen — wij begrijpen de nuances van beide culturen en communiceren dat in uw website.",
    foto: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=70",
  },
];

const faqTri = [
  {
    nl: "Maken jullie websites volledig in het Thai?",
    en: "Do you build full Thai-language websites?",
    th: "คุณทำเว็บไซต์ภาษาไทยเต็มรูปแบบไหม?",
    aNl: "Ja. We combineren Thai met Nederlands en/of Engels waar dat past bij uw doelgroep.",
    aEn: "Yes. We combine Thai with Dutch and/or English depending on your audience.",
    aTh: "ได้ เราผสมผสานไทยกับดัตช์และ/หรืออังกฤษตามกลุ่มเป้าหมาย",
  },
  {
    nl: "Zijn tolkdiensten ook voor de gemeente of ziekenhuis?",
    en: "Do you interpret for municipalities or hospitals?",
    th: "มีบริการล่ามสำหรับเทศบาลหรือโรงพยาบาลไหม?",
    aNl: "Ja, voor zakelijke én persoonlijke situaties — vraag naar beschikbaarheid en tarief.",
    aEn: "Yes, for business and personal contexts — ask us for availability and rates.",
    aTh: "มีทั้งงานธุรกิจและส่วนตัว — สอบถามคิวและราคา",
  },
  {
    nl: "Hoe vraag ik een offerte aan?",
    en: "How do I request a quote?",
    th: "ขอใบเสนอราคาอย่างไร?",
    aNl: "Via het offerteformulier op /contact#offerte of per e-mail naar info@allesis.nl.",
    aEn: "Use the quote form at /contact#offerte or email info@allesis.nl.",
    aTh: "กรอกแบบฟอร์มที่ /contact#offerte หรืออีเมล info@allesis.nl",
  },
];

export default function ThaiServicesPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Thaise web- & taaldiensten"
        title="Thaise websites en"
        titleAccent="vertaaldiensten"
        subtitle={
          <>
            <p className="font-lato max-w-xl text-lg leading-relaxed text-gray-500">
              Allesis is de schakel tussen Nederlandse en Thaise ondernemers — web, taal en cultuur in één team.
            </p>
            <p className="mt-2 text-sm text-gray-500">Thai websites and translation services</p>
            <p className="text-sm text-gray-400" lang="th">
              เว็บไซต์และบริการแปลภาษาไทย
            </p>
          </>
        }
      />

      <FeatureGrid
        titel="Wat bieden wij aan?"
        gradient="from-red-900/90 via-red-900/50 to-transparent"
        features={thaiFeatures}
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sora text-2xl font-bold text-neutral-dark md:text-3xl">Prijzen</h2>
          <p className="font-lato mt-4 text-neutral-mid">
            Maatwerk — offerte op aanvraag. Vertaling en tolken per uur of per project afgestemd op complexiteit.
          </p>
          <p className="mt-2 text-sm text-gray-500">Custom quotes — translation and interpretation per hour or per project.</p>
          <p className="text-sm text-gray-400" lang="th">
            ราคาตามโปรเจกต์ — สอบถามใบเสนอราคา
          </p>
          <Link
            href="/contact#offerte"
            className="font-lato mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-10 font-bold text-white transition hover:bg-primary-dark"
          >
            Contact opnemen →
          </Link>
        </div>
      </Reveal>

      <Reveal className="bg-neutral-light/40 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl">FAQ</h2>
          <p className="font-lato mx-auto mt-2 max-w-xl text-center text-sm text-neutral-mid">
            Kies een taal per vraag — NL · EN · TH
          </p>
          <div className="mt-10 space-y-6">
            {faqTri.map((f) => (
              <TriLingualFaqItem key={f.nl} {...f} />
            ))}
          </div>
        </div>
      </Reveal>
      <BrancheCTA branche="thai" />
    </>
  );
}
