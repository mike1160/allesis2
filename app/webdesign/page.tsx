import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Webdesign & Nieuwe Website Laten Maken",
  description:
    "Professioneel webdesign voor het MKB. Allesis bouwt snelle, moderne websites inclusief SEO, AVG-compliance en hosting. Vraag een vrijblijvende offerte aan.",
  alternates: { canonical: "https://allesis.nl/webdesign" },
};

const watKrijgJe = [
  "Professioneel design op maat",
  "Mobielvriendelijk (responsive)",
  "SEO-geoptimaliseerd vanaf dag één",
  "AVG-compliant — privacybeleid, cookiebanner, verwerkersregister",
  "SSL-certificaat inbegrepen",
  "Koppeling met Google Analytics / Search Console",
];

export default function WebdesignPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 24px 48px", background: "linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 16 }}>
            Webdesign Haarlem
          </p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#0f172a", lineHeight: 1.2, marginBottom: 20 }}>
            Nieuwe website laten maken?
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 18, color: "#64748b", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Wij bouwen snelle, moderne websites voor het MKB — inclusief SEO, hosting en AVG-compliant privacybeleid.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 24px 64px", background: "white" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 24, color: "#0f172a", marginBottom: 24, textAlign: "center" }}>
            Wat krijg je?
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {watKrijgJe.map((item) => (
              <li
                key={item}
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: 16,
                  color: "#374151",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  lineHeight: 1.55,
                }}
              >
                <span style={{ color: "#16a34a", fontWeight: 700, flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ padding: "48px 24px 64px", background: "#f8f9fc" }}>
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            border: "2px solid #1a3bcc",
            borderRadius: 16,
            padding: 36,
            background: "white",
            boxShadow: "0 8px 40px rgba(26,59,204,0.12)",
          }}
        >
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>
            Laatste project
          </p>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 1.85rem)", color: "#0f172a", marginBottom: 16 }}>
            Ren Ji Tang — acupunctuur &apos;s-Hertogenbosch
          </h2>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.75, marginBottom: 20 }}>
            Allesis.nl heeft <strong style={{ color: "#0f172a" }}>renjitang.nl</strong> gebouwd: een moderne Next.js-website voor een acupunctuurpraktijk in &apos;s-Hertogenbosch. Met online boekingsmodule, integratie van Google-reviews, uitgebreide behandelingspagina&apos;s en volledige AVG-compliance. Resultaat:{" "}
            <strong style={{ color: "#0f172a" }}>5 sterren op Google</strong>, volledig mobielvriendelijk en snel ladend.
          </p>
          <Link
            href="https://www.renjitang.nl"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#1a3bcc",
              textDecoration: "none",
              marginBottom: 28,
            }}
          >
            Bekijk renjitang.nl live →
          </Link>
          <div style={{ borderTop: "1px solid #e2e6f0", paddingTop: 28, textAlign: "center" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                background: "#1a3bcc",
                color: "white",
                fontFamily: "Lato, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Vraag een vrijblijvende offerte aan →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
