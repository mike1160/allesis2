import Link from "next/link";

export const metadata = {
  title: "Hosting & Domeinen | Allesis",
  description: "Betrouwbare webhosting en domeinregistratie voor MKB en particulieren. Kies uit Lite, Start Up of Basic pakket.",
};

export default function HostingPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <p className="text-[#c8a96e] text-xs tracking-[0.3em] uppercase font-dm mb-4">Hosting & Domeinen</p>
      <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white/90 mb-6">
        Alles in één pakket
      </h1>
      <p className="text-white/50 text-lg max-w-2xl mb-16 font-dm font-light leading-relaxed">
        Eenvoudige domeinregistratie, hosting, hosted exchange, VPS, e-mailhosting, SSL en online opslag. Snel en betrouwbaar.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
          {
            naam: "Lite", prijs: "€ 4,95", highlight: false,
            features: ["1.000 MB schijfruimte", "20 GB dataverkeer", "5 e-mailaccounts", "Onbeperkt e-mail forwarding", "Onbeperkt subdomeinen", "1 MySQL database", "PHP / Perl CGI / SSI", "Statistieken", "FTP + Crontab", "SSL / SSH toegang", "Helpdesk"],
          },
          {
            naam: "Start Up", prijs: "€ 8,95", highlight: true,
            features: ["4.000 MB schijfruimte", "80 GB dataverkeer", "10 e-mailaccounts", "Onbeperkt e-mail forwarding", "Onbeperkt subdomeinen", "2 MySQL databases", "PHP / Perl CGI / SSI", "Statistieken", "FTP + Crontab", "SSL / SSH toegang", "Helpdesk"],
          },
          {
            naam: "Basic", prijs: "€ 14,95", highlight: false,
            features: ["8.000 MB schijfruimte", "320 GB dataverkeer", "50 e-mailaccounts", "Onbeperkt e-mail forwarding", "Onbeperkt subdomeinen", "2 MySQL databases", "PHP / Perl CGI / SSI", "Statistieken", "FTP + Crontab", "SSL / SSH toegang", "Helpdesk"],
          },
        ].map((p) => (
          <div key={p.naam} className={`p-8 border ${p.highlight ? "border-[#c8a96e]/60 bg-[#c8a96e]/5" : "border-white/8"}`}>
            {p.highlight && <div className="text-xs tracking-widest uppercase text-[#c8a96e] font-dm mb-4">Meest gekozen</div>}
            <h2 className="font-playfair text-2xl font-bold mb-1">{p.naam}</h2>
            <div className="text-3xl font-bold text-[#c8a96e] font-playfair mb-6">{p.prijs}<span className="text-white/30 text-sm font-dm font-normal">/mnd</span></div>
            <ul className="space-y-2 mb-8">
              {p.features.map((f) => (
                <li key={f} className="text-white/50 text-sm flex items-center gap-2 font-dm">
                  <span className="text-[#c8a96e]">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/contact" className={`block text-center py-3 text-sm font-dm transition-all ${p.highlight ? "bg-[#c8a96e] text-black hover:bg-[#d4b87e]" : "border border-white/20 text-white/60 hover:border-white/40 hover:text-white"}`}>
              Bestel nu
            </Link>
          </div>
        ))}
      </div>

      <div className="border border-white/8 p-8 max-w-2xl">
        <h2 className="font-playfair text-2xl font-bold mb-4">Domein checken</h2>
        <p className="text-white/50 font-dm mb-6">Wil je weten of jouw domeinnaam nog beschikbaar is? Neem contact op en we checken het direct voor je.</p>
        <Link href="/contact" className="inline-block px-6 py-3 bg-[#c8a96e] text-black font-dm hover:bg-[#d4b87e] transition-colors">
          Vraag domeinnaam aan →
        </Link>
      </div>
    </div>
  );
}
