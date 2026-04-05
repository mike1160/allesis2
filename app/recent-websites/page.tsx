import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent gemaakte websites — Vindbaarheid in AI & LLM",
  description:
    "Uitgelicht: Ren Ji Tang (renjitang.nl). Daarnaast o.a. Saved Souls Foundation en Shu Xin Haarlem — geoptimaliseerd voor Google en AI-assistenten.",
  alternates: { canonical: "https://allesis.nl/recent-websites" },
};

const featured = {
  title: "Ren Ji Tang",
  subtitle: "Acupunctuur & Traditionele Chinese Geneeskunde — 's-Hertogenbosch",
  url: "https://www.renjitang.nl",
  tech: ["Next.js", "Tailwind CSS"],
  features: [
    "Online boekingsmodule",
    "Google reviews-integratie",
    "Behandelingspagina's",
    "Volledig AVG-compliant",
  ],
  resultaat: "5 sterren op Google, volledig mobielvriendelijk, snel ladend",
};

const projects = [
  {
    title: "Saved Souls Foundation",
    subtitle: "Dierenopvang Thailand",
    url: "https://www.savedsouls-foundation.com/nl",
    image: "/savedsouls-screenshot.png",
    description: "Non-profit in Khon Kaen, Thailand, voor geredde en gehandicapte honden. Content en structuur zijn zo opgezet dat zoekmachines en AI-tools de missie en acties correct kunnen weergeven.",
  },
  {
    title: "Shu Xin Haarlem",
    subtitle: "Traditionele Chinese Geneeskunde & Acupunctuur",
    url: "https://shuxin.nl/",
    image: "/shuxin-screenshot.png",
    description: "Praktijk voor acupunctuur en TCG in het hart van Haarlem. Website afgestemd op zoekgedrag in Google én op hoe AI's en taalmodellen informatie over de praktijk ophalen en samenvatten.",
  },
];

export default function RecentWebsitesPage() {
  return (
    <>
      <section style={{ padding: "120px 24px 48px", background: "linear-gradient(180deg, #f8f9fc 0%, white 100%)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 16 }}>
            Portfolio & maart 2026
          </p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#0f172a", lineHeight: 1.25, marginBottom: 24 }}>
            Recent gemaakte websites aangepast aan vindbaarheid in AI en large language models
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", lineHeight: 1.7 }}>
            Steeds vaker zoeken mensen via AI-assistenten en grote taalmodellen. Wij bouwen en optimaliseren websites zodat ze niet alleen goed scoren in Google, maar ook correct worden weergegeven in ChatGPT, Perplexity en vergelijkbare tools. Hieronder ons uitgelichte project en meer recent werk.
          </p>
        </div>
      </section>

      {/* Uitgelicht: Ren Ji Tang */}
      <section style={{ padding: "0 24px 48px", background: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <article
            className="recent-website-card featured-renjitang"
            style={{
              border: "2px solid #1a3bcc",
              borderRadius: 16,
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 12px 48px rgba(26,59,204,0.18)",
            }}
          >
            <Link href={featured.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: 220,
                  background: "linear-gradient(135deg, #1a3bcc 0%, #2d54e8 45%, #0f172a 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 24px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "#a5b4fc",
                    marginBottom: 12,
                  }}
                >
                  Uitgelicht project
                </span>
                <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.25rem)", color: "white", marginBottom: 8 }}>
                  {featured.title}
                </h2>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#c7d2fe", maxWidth: 420, lineHeight: 1.5 }}>
                  {featured.subtitle}
                </p>
              </div>
              <div style={{ padding: "28px 32px 32px" }}>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>
                  Volledige Next.js-website voor de acupunctuurpraktijk in &apos;s-Hertogenbosch — gebouwd door allesis.nl. Tech stack:{" "}
                  <strong style={{ color: "#0f172a" }}>{featured.tech.join(" · ")}</strong>.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {featured.features.map((f) => (
                    <li key={f} style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#374151", display: "flex", gap: 10 }}>
                      <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#0f172a", fontWeight: 600, marginBottom: 20 }}>
                  Resultaat: {featured.resultaat}.
                </p>
                <span
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#1a3bcc",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Bezoek renjitang.nl →
                </span>
              </div>
            </Link>
          </article>
        </div>
      </section>

      {/* Overige projecten */}
      <section style={{ padding: "0 24px 80px", background: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 20, color: "#0f172a", marginBottom: 28, textAlign: "center" }}>
            Meer recente sites
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {projects.map((project) => (
              <article
                key={project.url}
                className="recent-website-card"
                style={{
                  border: "1px solid #e2e6f0",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <Link href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", background: "#f1f3f9" }}>
                    <Image
                      src={project.image}
                      alt={`Screenshot van ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 952px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "28px 32px" }}>
                    <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 6 }}>
                      {project.title}
                    </h3>
                    <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#1a3bcc", fontWeight: 600, marginBottom: 12 }}>
                      {project.subtitle}
                    </p>
                    <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#64748b", lineHeight: 1.65, marginBottom: 16 }}>
                      {project.description}
                    </p>
                    <span
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1a3bcc",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      Bezoek website →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#64748b", marginBottom: 24 }}>
            Ook uw site toekomstbestendig maken voor zoekmachines én AI? Wij helpen graag.
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
            Neem contact op →
          </Link>
        </div>
      </section>

      <style>{`
        .recent-website-card { transition: box-shadow 0.2s ease, border-color 0.2s ease; }
        .recent-website-card:hover { box-shadow: 0 8px 32px rgba(26, 59, 204, 0.14); border-color: #c7d2fe; }
        .featured-renjitang:hover { box-shadow: 0 16px 56px rgba(26, 59, 204, 0.22) !important; border-color: #4f46e5 !important; }
      `}</style>
    </>
  );
}
