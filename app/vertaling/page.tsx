import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Thais-Nederlands-Engels Vertaling & Tolk | Allesis",
  description: "Professionele Thais-Nederlandse en Engelse vertaal- en tolkdiensten. Specialist in offshore BOSIET training tolken.",
};

export default function VertaaldPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #f0f4ff, #ffffff)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Vertaling & Tolk</p>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0f172a", marginBottom: 16 }}>
            Thais · Nederlands · Engels
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", marginBottom: 16, fontWeight: 300, lineHeight: 1.8 }}>
            Allesis biedt vertaal- en tolkdiensten voor Thaise, Nederlandse en Engelse diensten voor bedrijven en particulieren in Nederland en wereldwijd. Of u nu een multinational vertegenwoordigt of een particulier bent — wij helpen u graag.
          </p>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#64748b", marginBottom: 32, fontWeight: 300, lineHeight: 1.8 }}>
            Allesis vertaalbureau is gevestigd in Haarlem, Nederland. Onze tolkdiensten kunnen u helpen ongeacht waar u zich bevindt.
          </p>
          <Link href="/contact" style={{ display: "inline-block", padding: "14px 32px", background: "#1a3bcc", color: "white", fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none" }}>
            Offerte aanvragen →
          </Link>
        </div>
      </section>

      {/* BOSIET specialist sectie */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a3bcc", marginBottom: 12 }}>Specialisme</p>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#0f172a", marginBottom: 16 }}>
              Interpreter — Thai · Dutch · English<br />
              <span style={{ color: "#1a3bcc" }}>Offshore Safety Training (BOSIET)</span>
            </h2>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#64748b", maxWidth: 700, lineHeight: 1.8, fontWeight: 300 }}>
              Specialist als tolk bij Basic Offshore Safety Induction and Emergency Training (BOSIET). Wij leveren persoonlijkheden vol vertrouwen met het vermogen gedachten duidelijk en beknopt in beide talen te uiten — naar internationale standaard.
            </p>
          </div>

          {/* Foto's */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 16 }}>
            {[
              { src: "/tolk-bosiet-1.png", titel: "Thais-Ned-Eng Tolk bij offshore survival training BOSIET", locatie: "Falck Safety, Den Oever" },
              { src: "/tolk-bosiet-2.png", titel: "Thais-Ned Tolk bij offshore training BOSIET", locatie: "STC-SAIO, Rotterdam" },
              { src: "/tolk-bosiet-3.png", titel: "Thais-Ned-Engels Tolk bij Safety training", locatie: "Falck Safety / Maasvlakte" },
            ].map((foto) => (
              <div key={foto.src} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e2e6f0" }}>
                <div style={{ position: "relative", width: "100%", height: 240 }}>
                  <Image src={foto.src} alt={foto.titel} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "16px 20px", background: "#f8f9fc" }}>
                  <p style={{ fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 4 }}>— {foto.titel}</p>
                  <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#64748b" }}>- {foto.locatie}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diensten */}
      <section style={{ padding: "80px 24px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#0f172a", marginBottom: 48, textAlign: "center" }}>Onze vertaal- en tolkdiensten</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { icon: "🎤", titel: "Tolkdiensten voor bedrijven", tekst: "Zakelijke bijeenkomsten, seminars, persoonlijk gesprek, trainingen en offshore safety. Wij leveren naar internationale standaard." },
              { icon: "📄", titel: "Documentvertaling", tekst: "Zakelijke documenten, huwelijkse voorwaarden, arbeidsovereenkomst, commerciële flyers, menu's en meer. Thais–Nederlands–Engels." },
              { icon: "🎬", titel: "Ondertiteling & Transcriptie", tekst: "Ondertiteling voor Nederlandse televisie en video content. Transcriptie van audio- en videomateriaal." },
              { icon: "⚓", titel: "Offshore & Technisch", tekst: "Specialist als tolk bij BOSIET en andere offshore safety trainingen. Ervaring met technische en maritieme terminologie." },
              { icon: "📝", titel: "Officiële documenten", tekst: "Persoonlijke en officiële documenten: financiën, boekhouding, juridische stukken. In HTML, MS Word, Excel en PDF." },
              { icon: "🌍", titel: "Wereldwijd", tekst: "Gevestigd in Haarlem maar actief in Nederland en internationaal. Native speakers in de doeltaal voor elk project." },
            ].map(d => (
              <div key={d.titel} style={{ padding: 28, border: "1px solid #e2e6f0", borderRadius: 12, background: "white" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{d.icon}</div>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 8 }}>{d.titel}</h3>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{d.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kwaliteit */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#0f172a", marginBottom: 24 }}>Ervaring & kwaliteit</h2>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.9, marginBottom: 16, fontWeight: 300 }}>
            Allesis heeft jarenlange ervaring en hoge kwaliteit in vertalingen voor redelijke prijzen. Dat is waarom wij het vertrouwen genieten van zowel binnenlandse als internationale klanten uit de particuliere en bedrijfssectoren.
          </p>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.9, marginBottom: 32, fontWeight: 300 }}>
            Met een team van native speakers bieden wij vertaaldiensten met behulp van een schat aan woordenboeken en naslagwerken. Onze vertalers en tolken zijn native speaker in de doeltaal en ervaren in het onderwerp van uw project. Onze vertaaldienst accepteert originele documenten in papiervorm of als elektronisch bestand: HTML, MS Word, MS Excel en PDF.
          </p>
          <Link href="/contact" style={{ display: "inline-block", padding: "14px 32px", background: "#1a3bcc", color: "white", fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 15, borderRadius: 8, textDecoration: "none" }}>
            Neem contact op →
          </Link>
        </div>
      </section>
    </div>
  );
}
