import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import OfferteForm from "@/components/OfferteForm";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

const contactFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe neem ik contact op met Allesis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vul het offerteformulier of contactformulier in op allesis.nl/contact, of mail direct naar info@allesis.nl.",
      },
    },
    {
      "@type": "Question",
      name: "Binnen hoeveel tijd reageren jullie?",
      acceptedAnswer: { "@type": "Answer", text: "Meestal binnen één werkdag op werkdagen." },
    },
    {
      "@type": "Question",
      name: "Do you offer Thai language services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — websites, translation and interpretation in Thai, Dutch and English. See allesis.nl/thai.",
      },
    },
    {
      "@type": "Question",
      name: "Waar is Allesis gevestigd?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Allesis is gevestigd in Haarlem, Noord-Holland, en werkt voor klanten in heel Nederland en internationaal.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Contact & offerte — webdesign Haarlem",
  description:
    "Neem contact op voor webdesign, hosting, SEO, AVG of Thaise web- en vertaaldiensten. Offerte binnen één werkdag. info@allesis.nl",
  alternates: pageAlternates("/contact"),
  openGraph: {
    title: "Contact | Allesis Haarlem",
    description: "Offerte aanvragen of een vraag stellen — wij helpen u graag.",
    url: `${SITE_URL}/contact`,
    locale: "nl_NL",
    type: "website",
  },
};

function FormSkeleton() {
  return (
    <div className="font-lato min-h-[200px] rounded-2xl border border-neutral-light bg-white px-8 py-10 text-center text-neutral-mid">
      Formulier laden…
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqLd) }} />

      <SubpageHero
        eyebrow="Contact"
        title="Offerte of bericht"
        subtitle="Vraag een vrijblijvende offerte aan of stuur een algemene vraag. Wij reageren binnen één werkdag."
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <PremiumCard className="!p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="font-lato text-xs font-bold uppercase tracking-wider text-neutral-mid">E-mail</div>
              <a href="mailto:info@allesis.nl" className="font-sora mt-1 inline-block text-sm font-semibold text-primary hover:underline">
                info@allesis.nl
              </a>
            </PremiumCard>
            <PremiumCard className="!p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="font-lato text-xs font-bold uppercase tracking-wider text-neutral-mid">Locatie</div>
              <span className="font-sora mt-1 block text-sm font-semibold text-neutral-dark">Haarlem, Nederland</span>
            </PremiumCard>
          </div>

          <section id="offerte" className="mt-14 scroll-mt-28">
            <h2 className="font-sora text-xl font-bold text-neutral-dark">Offerte aanvragen</h2>
            <div className="mt-4">
              <Suspense fallback={<FormSkeleton />}>
                <OfferteForm />
              </Suspense>
            </div>
          </section>

          <section id="contact-form" className="mt-14 scroll-mt-28">
            <h2 className="font-sora text-xl font-bold text-neutral-dark">Algemeen contact</h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </section>
        </div>
      </Reveal>
    </>
  );
}
