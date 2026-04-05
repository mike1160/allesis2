import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "AVG-compliance voor uw website — vanaf €69,99 ex btw",
  description:
    "Is uw website AVG-compliant? Allesis controleert en lost privacybeleid, cookies, formulieren en verwerkers af. Fix vanaf €69,99 ex btw. From €69.99 excl. VAT.",
  alternates: pageAlternates("/avg"),
  openGraph: {
    title: "AVG-compliance | Allesis Haarlem",
    description: "Website AVG-proof maken: check, beleid en techniek. Vaste instapprijs vanaf €69,99 ex btw.",
    url: `${SITE_URL}/avg`,
    locale: "nl_NL",
    type: "website",
  },
};

const checklist = [
  "Privacybeleid en cookiebeleid op orde",
  "Cookiebanner met juiste voorkeuren (waar nodig)",
  "Contact- en offerteformulieren: transparante verwerking",
  "Verwerkersovereenkomst en subverwerkers in beeld",
  "Technische tips: analytics, embeds, fonts",
];

const faq = [
  {
    q: "Is mijn website verplicht AVG-proof?",
    a: "Verwerkt u persoonsgegevens (formulieren, nieuwsbrief, analytics)? Dan moet u kunnen aantonen dat u voldoet aan de AVG: o.a. informatie aan bezoekers en rechtmatige grondslag.",
  },
  {
    q: "Wat houdt de instap-fix vanaf €69,99 ex btw in?",
    a: "Een vast pakket met de belangrijkste documenten en instellingen om kleine sites compliant te maken. Grotere sites of maatwerk krijgen een offerte op basis van scan en wensen.",
  },
  {
    q: "Do you offer GDPR fixes for English-only sites?",
    a: "Yes. We provide GDPR-compliant policies and implementations for Dutch and international audiences; documentation can be delivered in Dutch and/or English.",
  },
  {
    q: "Hoe snel kan ik live met een compliant site?",
    a: "Vaak binnen enkele werkdagen na akkoord, afhankelijk van uw CMS, analytics en het aantal integraties.",
  },
  {
    q: "Werkt Allesis samen met mijn bestaande webbouwer?",
    a: "Ja. Wij leveren beleid en concrete aanwijzingen; uw bouwer of wij voeren technische wijzigingen door.",
  },
  {
    q: "What fines apply if I ignore GDPR?",
    a: "Supervisory authorities can impose significant fines; reputational damage and blocked campaigns are also common risks.",
  },
  {
    q: "Is een gratis AVG-check beschikbaar?",
    a: "Ja, gebruik onze online AVG-check op allesis.nl/avg-check voor een eerste risicoscan.",
  },
  {
    q: "Maken jullie ook websites in het Thai?",
    a: "Ja, Allesis bouwt professionele websites in het Thai, Nederlands en Engels voor Thaise ondernemers wereldwijd.",
  },
  {
    q: "Do you make websites for Thai businesses?",
    a: "Yes, Allesis specializes in websites for Thai entrepreneurs in the Netherlands and worldwide. We speak Thai, Dutch and English.",
  },
  {
    q: "คุณสร้างเว็บไซต์ภาษาไทยได้ไหม?",
    a: "ได้ Allesis สร้างเว็บไซต์ภาษาไทย ดัตช์ และอังกฤษ สำหรับผู้ประกอบการไทยทั่วโลก",
  },
];

const offerLd = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "AVG-compliance fix — instappakket",
  description: "Basis AVG-compliance voor uw website, vanaf €69,99 exclusief btw.",
  price: "69.99",
  priceCurrency: "EUR",
  availability: "https://schema.org/InStock",
  url: `${SITE_URL}/avg`,
  seller: {
    "@type": "Organization",
    name: "Allesis",
    url: SITE_URL,
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function AvgLandingPage() {
  return (
    <div className="pt-[100px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="bg-gradient-to-b from-[#eef2ff] to-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-lato mb-3 text-xs font-bold tracking-[0.12em] text-primary uppercase">AVG / GDPR</p>
          <h1 className="font-sora text-4xl font-extrabold text-neutral-dark md:text-5xl">Is uw website AVG-compliant?</h1>
          <p className="font-lato mx-auto mt-5 max-w-2xl text-xl font-light leading-relaxed text-neutral-mid">
            Wij controleren uw website en lossen de belangrijkste privacy- en cookieproblemen op — helder en uitvoerbaar.
          </p>
          <p className="font-lato mx-auto mt-4 max-w-xl rounded-xl bg-accent/30 px-4 py-3 text-lg font-bold text-neutral-dark">
            Vanaf €69,99 ex btw &nbsp;·&nbsp; <span className="font-semibold">From €69.99 excl. VAT</span>
          </p>
          <Link
            href="/contact#offerte"
            className="font-lato mt-10 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-10 text-base font-bold text-white transition hover:bg-primary-dark"
          >
            Offerte aanvragen
          </Link>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Wat zit er in de AVG-fix?</h2>
            <ul className="font-lato mt-5 space-y-3 text-neutral-mid">
              {checklist.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Waarom dit belangrijk is</h2>
            <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
              Toezichthouders controleren websites steeds vaker. Naast boetes en sancties schaadt non-compliance vertrouwen bij
              klanten en partners. Een nette privacy-inrichting hoort bij professioneel ondernemerschap — net als SSL en
              een werkend contactformulier.
            </p>
            <p className="font-lato mt-4 text-sm text-neutral-mid">
              <span className="font-semibold text-neutral-dark">EN:</span> GDPR compliance reduces legal risk and builds trust
              with customers and partners.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-light bg-neutral-light/50 px-6 py-14 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-sora text-center text-2xl font-bold text-neutral-dark">Veelgestelde vragen</h2>
          <dl className="font-lato mt-10 space-y-8">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-bold text-neutral-dark">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-neutral-mid">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-6 py-16 text-center md:px-10">
        <Link href="/avg-check" className="font-lato font-semibold text-primary underline-offset-2 hover:underline">
          Start met de gratis AVG-check →
        </Link>
      </section>
    </div>
  );
}
