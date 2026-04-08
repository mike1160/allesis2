import type { Metadata } from "next";
import Link from "next/link";
import { Globe2, Languages, Sparkles } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
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

const cards = [
  {
    icon: Globe2,
    title: "Websites voor Thaise ondernemers",
    nl: "Restaurants, wellness, retail en ZZP: wij bouwen snelle sites die in Thai, Nederlands en Engels kunnen — met oog voor cultuur en conversie.",
    en: "Restaurants, wellness, shops and freelancers: fast sites in Thai, Dutch and English — culturally aware.",
    th: "ร้านอาหาร สปา ร้านค้า และฟรีแลนซ์: เว็บไซต์เร็ว รองรับไทย ดัตช์ และอังกฤษ",
  },
  {
    icon: Languages,
    title: "Vertaal- en tolkdiensten",
    nl: "Documenten, websites, vergaderingen en persoonlijke trajecten — Thai ↔ Nederlands ↔ Engels.",
    en: "Documents, websites, meetings and personal matters — Thai ↔ Dutch ↔ English.",
    th: "เอกสาร เว็บไซต์ ประชุม และงานส่วนตัว — ไทย ↔ ดัตช์ ↔ อังกฤษ",
  },
  {
    icon: Sparkles,
    title: "Waarom Allesis",
    nl: "Lokaal in Haarlem, persoonlijk contact, technische kwaliteit (o.a. Next.js) en AVG-bewuste oplevering.",
    en: "Haarlem-based, personal service, solid tech stack and GDPR-aware delivery.",
    th: "ทีมใน Haarlem บริการเป็นกันเอง เทคโนโลยีทันสมัย และคำนึงถึง GDPR",
  },
];

export default function ThaiServicesPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Thaise web- & taaldiensten"
        title="Thaise websites en vertaaldiensten"
        subtitle={
          <>
            <p className="text-white/80">Thai websites and translation services</p>
            <p className="mt-3 text-xl font-medium text-white/90" lang="th">
              เว็บไซต์และบริการแปลภาษาไทย
            </p>
            <p className="font-lato mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              Allesis is de schakel tussen Nederlandse en Thaise ondernemers — web, taal en cultuur in één team.
            </p>
          </>
        }
      />

      <Reveal className="bg-neutral-light/50 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {cards.map((c) => (
            <PremiumCard key={c.title}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </div>
              <h2 className="font-sora text-lg font-bold text-primary">{c.title}</h2>
              <p className="font-lato mt-3 text-sm leading-relaxed text-neutral-dark" lang="nl">
                {c.nl}
              </p>
              <p className="font-lato mt-4 text-sm leading-relaxed text-neutral-mid" lang="en">
                {c.en}
              </p>
              <p className="font-lato mt-4 text-sm leading-relaxed text-[#0f172a]" lang="th">
                {c.th}
              </p>
            </PremiumCard>
          ))}
        </div>
      </Reveal>

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sora text-2xl font-bold text-neutral-dark md:text-3xl">Prijzen / Pricing / ราคา</h2>
          <p className="font-lato mt-4 text-neutral-mid" lang="nl">
            Maatwerk — offerte op aanvraag. Vertaling en tolken per uur of per project afgestemd op complexiteit.
          </p>
          <p className="font-lato mt-2 text-neutral-mid" lang="en">
            Custom quotes. Translation and interpretation billed per hour or per project.
          </p>
          <p className="font-lato mt-2 text-[#0f172a]" lang="th">
            ราคาตามโปรเจกต์ — สอบถามใบเสนอราคา
          </p>
          <Link
            href="/contact#offerte"
            className="font-lato mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-10 font-bold text-white transition hover:bg-primary-dark"
          >
            Contact opnemen / Contact us / ติดต่อเรา
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
    </>
  );
}
