import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "AVG-boetes — risico’s voor ondernemers",
  description:
    "Wat u riskeert bij AVG-overtredingen en hoe u uw site compliant maakt. Allesis: scan, beleid en techniek — vanaf €69,99 ex btw.",
  alternates: pageAlternates("/avg-boetes"),
  openGraph: {
    title: "AVG boetes | Allesis",
    description: "Inzicht in handhaving en stappen naar compliance.",
    url: `${SITE_URL}/avg-boetes`,
    locale: "nl_NL",
    type: "website",
  },
};

const bedragen = [
  "Lichte overtredingen: tot €10 miljoen of 2% jaaromzet",
  "Zware overtredingen: tot €20 miljoen of 4% jaaromzet",
  "Informele handhaving (waarschuwing, last onder dwangsom) is ook mogelijk",
];

const overtredingen = [
  "Geen of onvolledig privacybeleid",
  "Cookiebanner die geen echte keuze biedt",
  "Google Analytics zonder correcte configuratie",
  "Contactformulieren zonder vermelding van gegevensverwerking",
];

const voorkomen = [
  "Laat uw website controleren op AVG-compliance",
  "Allesis levert bij elke nieuwe website een volledig compliant pakket",
];

export default function AvgBoetesPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 24px 40px", background: "linear-gradient(180deg, #fef2f2 0%, #ffffff 100%)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#dc2626", marginBottom: 16 }}>
            AVG handhaving
          </p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(1.85rem, 4vw, 2.5rem)", color: "#0f172a", lineHeight: 1.25, marginBottom: 16 }}>
            AVG-boetes: wat riskeert u als ondernemer?
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", lineHeight: 1.7 }}>
            Inzicht in maxima, veelgemaakte fouten op websites en hoe u risico beperkt.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 24px 48px", background: "white" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 20 }}>
            Hoeveel kan een AVG-boete bedragen?
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {bedragen.map((item) => (
              <li key={item} style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#374151", display: "flex", gap: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#dc2626", fontWeight: 700 }}>€</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ padding: "48px 24px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 20 }}>
            Meest voorkomende overtredingen op websites
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {overtredingen.map((item) => (
              <li key={item} style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#374151", display: "flex", gap: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#1a3bcc", fontWeight: 700 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ padding: "48px 24px 72px", background: "white" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 20 }}>
            Hoe voorkomt u een boete?
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
            {voorkomen.map((item) => (
              <li key={item} style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#374151", display: "flex", gap: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", lineHeight: 1.65, marginBottom: 24 }}>
            Zie ook:{" "}
            <Link href="/avg-regelgeving" style={{ color: "#1a3bcc", fontWeight: 700, textDecoration: "none" }}>
              AVG-regelgeving voor websites
            </Link>
            .
          </p>
          {/* AVG Check widget */}
          <div
            style={{
              background: "#f7f8fc",
              border: "2px solid #1a3bcc",
              borderRadius: "1rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Check uw eigen website direct:</p>
            <form action="/avg-check" method="GET" style={{ display: "flex", gap: "0.5rem" }}>
              <input
                name="domain"
                type="text"
                placeholder="uwbedrijf.nl"
                style={{
                  flex: 1,
                  padding: "0.5rem 1rem",
                  border: "1px solid #cbd5e0",
                  borderRadius: "0.5rem",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#1a3bcc",
                  color: "white",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Check gratis →
              </button>
            </form>
          </div>
          <div style={{ textAlign: "center" }}>
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
              Vraag een AVG-check aan →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
