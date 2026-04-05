import type { Metadata } from "next";
import DomainChecker from "@/components/DomainChecker";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Domeinnaam checken — .nl .com .eu en meer",
  description:
    "Controleer live beschikbaarheid van uw domein (.nl, .com, .net, .eu, .org, .be). Registratie en begeleiding via Allesis Haarlem.",
  alternates: pageAlternates("/domeinen"),
  openGraph: {
    title: "Domeinen | Allesis",
    description: "Domeincheck en registratie — meerdere extensies tegelijk.",
    url: `${SITE_URL}/domeinen`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function DomeinenPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ background: "linear-gradient(135deg, #f0f4ff, #ffffff)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Domeinnamen</p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0f172a", marginBottom: 16 }}>
            Is uw domeinnaam nog vrij?
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", marginBottom: 40, fontWeight: 300 }}>
            Controleer direct de beschikbaarheid van .nl, .com, .net, .eu, .org en .be tegelijk.
          </p>
          <DomainChecker />
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: "white", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#0f172a", marginBottom: 32, textAlign: "center" }}>Populaire extensies & prijzen</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {[
            { ext: ".nl", prijs: "€ 9,95/jr", omschrijving: "Nederlandstalig publiek" },
            { ext: ".com", prijs: "€ 12,95/jr", omschrijving: "Internationaal bereik" },
            { ext: ".net", prijs: "€ 13,95/jr", omschrijving: "Tech & netwerken" },
            { ext: ".eu", prijs: "€ 8,95/jr", omschrijving: "Europees bereik" },
            { ext: ".org", prijs: "€ 13,95/jr", omschrijving: "Non-profit & organisaties" },
            { ext: ".be", prijs: "€ 9,95/jr", omschrijving: "Belgisch publiek" },
          ].map(d => (
            <div key={d.ext} style={{ padding: 20, border: "1px solid #e2e6f0", borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#1a3bcc", marginBottom: 6 }}>{d.ext}</div>
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 4 }}>{d.prijs}</div>
              <div style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#94a3b8" }}>{d.omschrijving}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
