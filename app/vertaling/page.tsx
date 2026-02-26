import Link from "next/link";

export const metadata = {
  title: "Thais-Nederlands Vertaling & Tolk | Allesis",
  description: "Professionele Thais-Nederlandse vertaal- en tolkdiensten voor zakelijk en privé gebruik.",
};

export default function VertaaldPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <p className="text-[#c8a96e] text-xs tracking-[0.3em] uppercase font-dm mb-4">Vertaling & Tolk</p>
      <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white/90 mb-6">
        Thais ↔ Nederlands
      </h1>
      <p className="text-white/50 text-lg max-w-2xl mb-16 font-dm font-light leading-relaxed">
        Professionele vertaling en tolkdiensten tussen Thais en Nederlands. Voor zakelijke documenten, persoonlijke correspondentie, vergaderingen en meer.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          { icon: "📄", titel: "Documentvertaling", tekst: "Officiële documenten, contracten, aktes en persoonlijke documenten nauwkeurig vertaald." },
          { icon: "🎤", titel: "Tolkdiensten", tekst: "Live tolken bij vergaderingen, rechtszittingen, medische afspraken en zakelijke besprekingen." },
          { icon: "✉️", titel: "Correspondentie", tekst: "E-mails, brieven en communicatie professioneel vertaald en geformuleerd." },
          { icon: "🏢", titel: "Zakelijk", tekst: "Bedrijfspresentaties, marketingmateriaal en zakelijke correspondentie." },
        ].map((d) => (
          <div key={d.titel} className="p-8 border border-white/8 hover:border-[#c8a96e]/40 transition-all">
            <div className="text-3xl mb-4">{d.icon}</div>
            <h2 className="font-playfair text-xl font-bold mb-3">{d.titel}</h2>
            <p className="text-white/40 text-sm font-dm leading-relaxed">{d.tekst}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#c8a96e]/5 border border-[#c8a96e]/30 p-8">
        <h2 className="font-playfair text-2xl font-bold mb-3">Offerte aanvragen</h2>
        <p className="text-white/50 font-dm mb-6">Vertel ons wat u nodig heeft en we sturen u snel een offerte op maat.</p>
        <Link href="/contact" className="inline-block px-6 py-3 bg-[#c8a96e] text-black font-dm hover:bg-[#d4b87e] transition-colors">
          Neem contact op →
        </Link>
      </div>
    </div>
  );
}
