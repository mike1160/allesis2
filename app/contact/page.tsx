import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import OfferteForm from "@/components/OfferteForm";
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
    <div
      style={{
        background: "white",
        border: "1px solid #e2e6f0",
        borderRadius: 16,
        padding: "36px 32px",
        minHeight: 200,
        fontFamily: "Lato, sans-serif",
        color: "#94a3b8",
        textAlign: "center",
      }}
    >
      Formulier laden…
    </div>
  );
}

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqLd) }} />
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #f0f4ff, #ffffff)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "#1a3bcc",
              marginBottom: 12,
            }}
          >
            Contact
          </p>
          <h1
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#0f172a",
              marginBottom: 16,
            }}
          >
            Offerte of bericht
          </h1>
          <p
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: 17,
              color: "#64748b",
              marginBottom: 48,
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Vraag een vrijblijvende offerte aan of stuur een algemene vraag. Wij reageren binnen één werkdag.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
            {[
              { icon: "✉️", label: "E-mail", waarde: "info@allesis.nl", href: "mailto:info@allesis.nl" },
              { icon: "📍", label: "Locatie", waarde: "Haarlem, Nederland", href: null },
            ].map((c) => (
              <div key={c.label} style={{ padding: "20px 24px", background: "white", border: "1px solid #e2e6f0", borderRadius: 12 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                <div
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: 12,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    marginBottom: 4,
                  }}
                >
                  {c.label}
                </div>
                {c.href ? (
                  <a
                    href={c.href}
                    style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: "#1a3bcc", textDecoration: "none" }}
                  >
                    {c.waarde}
                  </a>
                ) : (
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{c.waarde}</span>
                )}
              </div>
            ))}
          </div>

          <section id="offerte" style={{ scrollMarginTop: 100, marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "#0f172a",
                marginBottom: 16,
              }}
            >
              Offerte aanvragen
            </h2>
            <Suspense fallback={<FormSkeleton />}>
              <OfferteForm />
            </Suspense>
          </section>

          <section id="contact-form" style={{ scrollMarginTop: 100 }}>
            <h2
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "#0f172a",
                marginBottom: 16,
              }}
            >
              Algemeen contact
            </h2>
            <ContactForm />
          </section>
        </div>
      </section>
    </div>
  );
}
