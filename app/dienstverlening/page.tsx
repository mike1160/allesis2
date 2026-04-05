import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Zakelijke dienstverlening — Allesis",
  description:
    "Zakelijke dienstverlening voor MKB en particulieren: web, hosting en aanverwante digitale ondersteuning. Regio Haarlem, Amsterdam en verder.",
  alternates: pageAlternates("/dienstverlening"),
  openGraph: {
    title: "Dienstverlening | Allesis",
    description: "Digitale diensten voor ondernemers.",
    url: `${SITE_URL}/dienstverlening`,
    locale: "nl_NL",
    type: "website",
  },
};

export default function DienstverleningPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <p className="text-[#c8a96e] text-xs tracking-[0.3em] uppercase font-dm mb-4">Dienstverlening</p>
      <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white/90 mb-6">
        Bedrijfs&shy;dienstverlening
      </h1>
      <p className="text-white/50 text-lg max-w-2xl mb-16 font-dm font-light leading-relaxed">
        Naast web en vertalingen bieden wij ook diverse zakelijke diensten voor het MKB en particulieren in Amsterdam en omgeving.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: "🧹", titel: "Schoonmaak", tekst: "Professionele schoonmaakdiensten voor bedrijven en particulieren." },
          { icon: "📦", titel: "Ontruiming", tekst: "Snelle en betrouwbare woning- en bedrijfsontruiming." },
          { icon: "👷", titel: "ZZP Inhuur", tekst: "Flexibele inzet van vakmensen voor klussen en projecten." },
        ].map((d) => (
          <div key={d.titel} className="p-8 border border-white/8 hover:border-[#c8a96e]/40 transition-all">
            <div className="text-3xl mb-4">{d.icon}</div>
            <h2 className="font-playfair text-xl font-bold mb-3">{d.titel}</h2>
            <p className="text-white/40 text-sm font-dm leading-relaxed">{d.tekst}</p>
          </div>
        ))}
      </div>

      <div className="border border-white/8 p-8 max-w-xl">
        <h2 className="font-playfair text-2xl font-bold mb-3">Meer weten?</h2>
        <p className="text-white/50 font-dm mb-6">Neem contact op voor een vrijblijvend gesprek over wat wij voor u kunnen betekenen.</p>
        <Link href="/contact" className="inline-block px-6 py-3 bg-[#c8a96e] text-black font-dm hover:bg-[#d4b87e] transition-colors">
          Contact opnemen →
        </Link>
      </div>
    </div>
  );
}
