import type { Metadata } from "next";
import Link from "next/link";
import FaqSection from "@/components/seo/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import PremiumCard from "@/components/subpage/PremiumCard";
import CheckMarkList from "@/components/subpage/CheckMarkList";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { AVG_FAQ } from "@/lib/faq-data";
import { buildFaqPageSchema, buildServiceSchema } from "@/lib/json-ld";
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

const serviceSchema = buildServiceSchema({
  id: `${SITE_URL}/avg#service`,
  name: "AVG-compliance & privacy",
  description:
    "AVG-check, privacybeleid, cookiebanner en compliance-trajecten voor websites. Instappakket vanaf €69,99 excl. btw.",
  url: `${SITE_URL}/avg`,
});

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "AVG-compliance fix — instappakket",
  description: "Basis AVG-compliance voor uw website, vanaf €69,99 exclusief btw.",
  price: "69.99",
  priceCurrency: "EUR",
  availability: "https://schema.org/InStock",
  url: `${SITE_URL}/avg`,
  seller: { "@id": `${SITE_URL}/#organization` },
};

export default function AvgLandingPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, offerSchema, buildFaqPageSchema(AVG_FAQ)]} />

      <SubpageHero
        eyebrow="AVG / GDPR"
        title="Is uw website"
        titleAccent="AVG-compliant?"
        backgroundImage="https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg"
        subtitle={
          <>
            <p>
              Wij controleren uw website en lossen de belangrijkste privacy- en cookieproblemen op — helder en uitvoerbaar.
            </p>
            <p className="font-lato mt-6 max-w-xl rounded-xl border border-primary/15 bg-primary/5 px-5 py-4 text-lg font-bold text-neutral-dark">
              Vanaf €69,99 ex btw · <span className="font-semibold text-neutral-mid">From €69.99 excl. VAT</span>
            </p>
            <Link
              href="/contact#offerte"
              className="font-lato mt-8 inline-flex min-h-[52px] items-center justify-center rounded-xl px-10 text-base font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#3B6D11" }}
            >
              Offerte aanvragen
            </Link>
          </>
        }
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-start">
          <PremiumCard>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Wat zit er in de AVG-fix?</h2>
            <CheckMarkList items={checklist} />
          </PremiumCard>
          <PremiumCard>
            <h2 className="font-sora text-2xl font-bold text-neutral-dark">Waarom dit belangrijk is</h2>
            <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
              Toezichthouders controleren websites steeds vaker. Naast boetes en sancties schaadt non-compliance vertrouwen bij klanten en
              partners. Een nette privacy-inrichting hoort bij professioneel ondernemerschap — net als SSL en een werkend contactformulier.
            </p>
            <p lang="en" className="font-lato mt-4 text-sm leading-relaxed text-neutral-mid">
              GDPR compliance reduces legal risk and builds trust with customers and partners.
            </p>
          </PremiumCard>
        </div>
      </Reveal>

      <FaqSection items={AVG_FAQ} id="avg-faq" />

      <section className="px-6 py-16 text-center md:px-10">
        <Link href="/avg-check" className="font-lato text-base font-semibold text-primary underline-offset-2 hover:underline">
          Start met de gratis AVG-check →
        </Link>
      </section>
    </>
  );
}
