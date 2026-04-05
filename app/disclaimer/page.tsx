import type { Metadata } from "next";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Disclaimer & privacybeleid",
  description: "Disclaimer, privacy- en cookiebeleid van Allesis.nl — transparant over gegevensverwerking en contact.",
  alternates: pageAlternates("/disclaimer"),
  openGraph: {
    title: "Disclaimer | Allesis",
    url: `${SITE_URL}/disclaimer`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <div style={{ paddingTop: 100, paddingBottom: 80, minHeight: "80vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
        <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "#0f172a", marginBottom: 8 }}>Disclaimer & Privacybeleid</h1>
        <p style={{ fontFamily: "Lato, sans-serif", color: "#94a3b8", fontSize: 14, marginBottom: 48 }}>Laatste update: {new Date().toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })}</p>

        {[
          { titel: "Algemeen", tekst: "Allesis is gevestigd in Haarlem, Nederland. Aan de informatie op deze website kunnen geen rechten worden ontleend. Allesis behoudt het recht om de inhoud van deze website op elk moment te wijzigen zonder kennisgeving." },
          { titel: "Prijzen", tekst: "Alle genoemde prijzen op deze website zijn exclusief BTW (21%), tenzij anders aangegeven. Prijzen worden jaarlijks gefactureerd. Allesis behoudt het recht om prijzen te wijzigen. Wijzigingen worden minimaal 30 dagen van tevoren gecommuniceerd aan bestaande klanten." },
          { titel: "Aansprakelijkheid", tekst: "Allesis is niet aansprakelijk voor schade die voortvloeit uit het gebruik van of vertrouwen op de informatie op deze website. Allesis geeft geen garanties met betrekking tot de juistheid, volledigheid of actualiteit van de informatie." },
          { titel: "Cookiebeleid", tekst: "Allesis.nl maakt gebruik van functionele cookies die nodig zijn voor het correct functioneren van de website (zoals het onthouden van uw cookievoorkeur). Wij gebruiken geen tracking- of advertentiecookies. U kunt uw browserinstellingen aanpassen om cookies te weigeren." },
          { titel: "Privacybeleid", tekst: "Allesis verwerkt alleen persoonsgegevens die u vrijwillig verstrekt via het contactformulier (naam en e-mailadres). Deze gegevens worden uitsluitend gebruikt voor het beantwoorden van uw vraag en worden nooit aan derden verstrekt. U heeft het recht uw gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact op via info@allesis.nl." },
          { titel: "Intellectueel eigendom", tekst: "Alle content op deze website, inclusief teksten, afbeeldingen en logo's, is eigendom van Allesis of wordt gebruikt met toestemming. Niets van deze website mag worden gekopieerd of verspreid zonder schriftelijke toestemming van Allesis." },
          { titel: "Contact", tekst: "Voor vragen over deze disclaimer of ons privacybeleid kunt u contact opnemen via info@allesis.nl." },
        ].map(s => (
          <div key={s.titel} style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#0f172a", marginBottom: 12 }}>{s.titel}</h2>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#374151", lineHeight: 1.8 }}>{s.tekst}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
