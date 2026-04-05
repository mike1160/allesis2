import type { Metadata } from "next";
import Link from "next/link";
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

export default function ThaiServicesPage() {
  return (
    <div className="pt-[100px]">
      <section className="bg-gradient-to-b from-[#0a0f1e] to-primary px-6 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-sora text-3xl font-extrabold md:text-5xl">Thaise websites en vertaaldiensten</h1>
          <p className="font-lato mt-4 text-xl font-light text-white/85">Thai websites and translation services</p>
          <p className="font-lato mt-2 text-2xl text-accent" lang="th">
            เว็บไซต์และบริการแปลภาษาไทย
          </p>
          <p className="font-lato mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            Allesis is de schakel tussen Nederlandse en Thaise ondernemers — web, taal en cultuur in één team.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-light bg-white p-8 shadow-sm">
            <h2 className="font-sora text-lg font-bold text-primary">Websites voor Thaise ondernemers</h2>
            <p className="font-lato mt-3 text-sm text-neutral-mid leading-relaxed" lang="nl">
              Restaurants, wellness, retail en ZZP: wij bouwen snelle sites die in Thai, Nederlands en Engels kunnen — met
              oog voor cultuur en conversie.
            </p>
            <p className="font-lato mt-4 text-sm text-neutral-mid leading-relaxed" lang="en">
              Restaurants, wellness, shops and freelancers: fast sites in Thai, Dutch and English — culturally aware.
            </p>
            <p className="font-lato mt-4 text-sm leading-relaxed text-neutral-mid" lang="th">
              ร้านอาหาร สปา ร้านค้า และฟรีแลนซ์: เว็บไซต์เร็ว รองรับไทย ดัตช์ และอังกฤษ
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-light bg-white p-8 shadow-sm">
            <h2 className="font-sora text-lg font-bold text-primary">Vertaal- en tolkdiensten</h2>
            <p className="font-lato mt-3 text-sm text-neutral-mid leading-relaxed" lang="nl">
              Documenten, websites, vergaderingen en persoonlijke trajecten — Thai ↔ Nederlands ↔ Engels.
            </p>
            <p className="font-lato mt-4 text-sm text-neutral-mid leading-relaxed" lang="en">
              Documents, websites, meetings and personal matters — Thai ↔ Dutch ↔ English.
            </p>
            <p className="font-lato mt-4 text-sm leading-relaxed text-neutral-mid" lang="th">
              เอกสาร เว็บไซต์ ประชุม และงานส่วนตัว — ไทย ↔ ดัตช์ ↔ อังกฤษ
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-light bg-white p-8 shadow-sm">
            <h2 className="font-sora text-lg font-bold text-primary">Waarom Allesis</h2>
            <p className="font-lato mt-3 text-sm text-neutral-mid leading-relaxed" lang="nl">
              Lokaal in Haarlem, persoonlijk contact, technische kwaliteit (o.a. Next.js) en AVG-bewuste oplevering.
            </p>
            <p className="font-lato mt-4 text-sm text-neutral-mid leading-relaxed" lang="en">
              Haarlem-based, personal service, solid tech stack and GDPR-aware delivery.
            </p>
            <p className="font-lato mt-4 text-sm leading-relaxed text-neutral-mid" lang="th">
              ทีมใน Haarlem บริการเป็นกันเอง เทคโนโลยีทันสมัย และคำนึงถึง GDPR
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-light/60 px-6 py-14 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sora text-2xl font-bold text-neutral-dark">Prijzen / Pricing / ราคา</h2>
          <p className="font-lato mt-4 text-neutral-mid" lang="nl">
            Maatwerk — offerte op aanvraag. Vertaling en tolken per uur of per project afgestemd op complexiteit.
          </p>
          <p className="font-lato mt-2 text-neutral-mid" lang="en">
            Custom quotes. Translation and interpretation billed per hour or per project.
          </p>
          <p className="font-lato mt-2 text-neutral-mid" lang="th">
            ราคาตามโปรเจกต์ — สอบถามใบเสนอราคา
          </p>
          <Link
            href="/contact#offerte"
            className="font-lato mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-10 font-bold text-white transition hover:bg-primary-dark"
          >
            Contact opnemen / Contact us / ติดต่อเรา
          </Link>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark">FAQ</h2>
        <div className="mx-auto mt-10 max-w-3xl space-y-10">
          {faqTri.map((f) => (
            <div key={f.nl} className="rounded-2xl border border-neutral-light bg-white p-6">
              <p className="font-bold text-neutral-dark" lang="nl">
                NL: {f.nl}
              </p>
              <p className="font-lato mt-2 text-sm text-neutral-mid" lang="nl">
                {f.aNl}
              </p>
              <p className="mt-4 font-bold text-neutral-dark" lang="en">
                EN: {f.en}
              </p>
              <p className="font-lato mt-2 text-sm text-neutral-mid" lang="en">
                {f.aEn}
              </p>
              <p className="mt-4 font-bold text-neutral-dark" lang="th">
                TH: {f.th}
              </p>
              <p className="font-lato mt-2 text-sm text-neutral-mid" lang="th">
                {f.aTh}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
