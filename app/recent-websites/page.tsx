import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Recent gemaakte websites — Vindbaarheid in AI & LLM | Allesis",
  description: "Websites van maart 2026, geoptimaliseerd voor vindbaarheid in zoekmachines, AI-assistenten en large language models. Shu Xin Haarlem en Saved Souls Foundation.",
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
    description: "Praktijk voor acupunctuur en TCG in het hart van Haarlem. Website afgestemd op zoekgedrag in Google én op hoe AI’s en taalmodellen informatie over de praktijk ophalen en samenvatten.",
  },
];

export default function RecentWebsitesPage() {
  return (
    <>
      {/* Hero / intro */}
      <section style={{ padding: "120px 24px 64px", background: "linear-gradient(180deg, #f8f9fc 0%, white 100%)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 16 }}>
            Maart 2026
          </p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#0f172a", lineHeight: 1.25, marginBottom: 24 }}>
            Recent gemaakte websites aangepast aan vindbaarheid in AI en large language models
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", lineHeight: 1.7 }}>
            Steeds vaker zoeken mensen via AI-assistenten en grote taalmodellen. Wij bouwen en optimaliseren websites zodat ze niet alleen goed scoren in Google, maar ook correct en volledig worden weergegeven in ChatGPT, Perplexity, Google AI Overviews en vergelijkbare tools. Hieronder twee recente projecten uit maart 2026.
          </p>
        </div>
      </section>

      {/* Project cards */}
      <section style={{ padding: "48px 24px 80px", background: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
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
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
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
                    <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 22, color: "#0f172a", marginBottom: 6 }}>
                      {project.title}
                    </h2>
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

      {/* CTA */}
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
      `}</style>
    </>
  );
}
