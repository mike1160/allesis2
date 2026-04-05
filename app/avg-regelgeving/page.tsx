import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AVG Regelgeving voor Websites | Wat bent u verplicht?",
  description:
    "Wat verplicht de AVG voor uw website? Privacybeleid, cookiebanner, verwerkersregister — Allesis regelt het voor u. Voorkom boetes van de Autoriteit Persoonsgegevens.",
  alternates: { canonical: "https://allesis.nl/avg-regelgeving" },
};

const verplichtingen = [
  "Privacybeleid (verplicht bij elk contactformulier of analytics)",
  "Cookiebanner met expliciete toestemming",
  "Verwerkersovereenkomst met uw hostingprovider",
  "Recht op inzage, correctie en verwijdering van persoonsgegevens",
  "Beveiligde verbinding (HTTPS/SSL) verplicht",
];

const boetes = [
  "De Autoriteit Persoonsgegevens (AP) kan boetes opleggen tot €20 miljoen of 4% van de wereldwijde jaaromzet",
  "Ook kleine bedrijven en ZZP'ers zijn niet vrijgesteld",
  "In 2023 en 2024 zijn meerdere Nederlandse MKB-bedrijven beboet",
];

export default function AvgRegelgevingPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: "80px 24px 40px", background: "linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 16 }}>
            AVG & compliance
          </p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(1.85rem, 4vw, 2.5rem)", color: "#0f172a", lineHeight: 1.25, marginBottom: 16 }}>
            AVG en uw website — wat bent u verplicht?
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", lineHeight: 1.7 }}>
            Een duidelijk overzicht van de belangrijkste verplichtingen — en hoe wij u helpen compliant te blijven.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 24px 48px", background: "white" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 20 }}>
            De belangrijkste AVG-verplichtingen voor websites
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {verplichtingen.map((item) => (
              <li key={item} style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#374151", display: "flex", gap: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#1a3bcc", fontWeight: 700 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ padding: "48px 24px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 20 }}>
            Wat zijn de boetes?
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {boetes.map((item) => (
              <li key={item} style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#374151", display: "flex", gap: 12, lineHeight: 1.6 }}>
                <span style={{ color: "#dc2626", fontWeight: 700 }}>!</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", marginTop: 20, lineHeight: 1.65 }}>
            Meer over tarieven en risico&apos;s? Lees ook onze pagina over{" "}
            <Link href="/avg-boetes" style={{ color: "#1a3bcc", fontWeight: 700, textDecoration: "none" }}>
              AVG-boetes
            </Link>
            .
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 24px 72px", background: "white" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 16 }}>
            Wij regelen het voor u
          </h2>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.75, marginBottom: 28 }}>
            Allesis levert standaard een AVG-compliant pakket bij elke nieuwe website: privacybeleid, cookiebanner, SSL en verwerkersovereenkomst — afgestemd op uw situatie.
          </p>
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
            Laat uw huidige website AVG-keuren →
          </Link>
        </div>
      </section>
    </div>
  );
}
