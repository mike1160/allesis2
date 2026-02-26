import Link from "next/link";

export default function Home() {
  const pakketten = [
    {
      naam: "Lite",
      prijs: "€ 4,95",
      per: "/mnd",
      features: [
        "1.000 MB schijfruimte",
        "20 GB dataverkeer",
        "5 e-mailaccounts",
        "1 MySQL database",
        "PHP, Perl CGI, SSI",
        "SSL / SSH toegang",
        "Helpdesk",
      ],
    },
    {
      naam: "Start Up",
      prijs: "€ 8,95",
      per: "/mnd",
      highlight: true,
      features: [
        "4.000 MB schijfruimte",
        "80 GB dataverkeer",
        "10 e-mailaccounts",
        "2 MySQL databases",
        "PHP, Perl CGI, SSI",
        "SSL / SSH toegang",
        "Helpdesk",
      ],
    },
    {
      naam: "Basic",
      prijs: "€ 14,95",
      per: "/mnd",
      features: [
        "8.000 MB schijfruimte",
        "320 GB dataverkeer",
        "50 e-mailaccounts",
        "2 MySQL databases",
        "PHP, Perl CGI, SSI",
        "SSL / SSH toegang",
        "Helpdesk",
      ],
    },
  ];

  const diensten = [
    {
      icon: "🌐",
      titel: "Hosting & Domein",
      tekst:
        "Snel, betrouwbaar en alles in één pakket. Van domeinnaam tot hosting, e-mail en SSL.",
    },
    {
      icon: "🎨",
      titel: "Webdesign",
      tekst:
        "Professioneel webdesign vanaf € 599,– inclusief fotoservice en NL-domeinnaam.",
    },
    {
      icon: "📈",
      titel: "SEO & Google",
      tekst:
        "Hoog in Google komen en blijven? Wij zijn gespecialiseerd in zoekmachine optimalisatie.",
    },
    {
      icon: "🇹🇭",
      titel: "Thais-NL Vertaling",
      tekst:
        "Professionele vertaal- en tolkdiensten Thais–Nederlands voor zakelijk en privé.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#f0ede6 1px, transparent 1px), linear-gradient(90deg, #f0ede6 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #c8a96e 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="fade-up-1 text-xs tracking-[0.3em] uppercase text-[#c8a96e] mb-6 font-dm">
            Amsterdam & omgeving · Sinds 2010
          </p>
          <h1 className="fade-up-2 font-playfair text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8">
            <span className="text-shimmer">Alles</span>
            <br />
            <span className="text-white/90">voor uw website.</span>
          </h1>
          <p className="fade-up-3 text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 font-dm font-light">
            Domeinregistratie, hosting, webdesign, SEO en Thais-Nederlands vertaalservice — allemaal onder één dak.
          </p>
          <div className="fade-up-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hosting"
              className="px-8 py-4 bg-[#c8a96e] text-black font-medium hover:bg-[#d4b87e] transition-colors font-dm"
            >
              Bekijk hostingpakketten
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all font-dm"
            >
              Neem contact op
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-xs font-dm">
          <span>scroll</span>
          <div className="w-px h-8 bg-white/10" />
        </div>
      </section>

      {/* Diensten */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-[#c8a96e] text-xs tracking-[0.3em] uppercase font-dm mb-4">Wat wij doen</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white/90">
            Onze diensten
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diensten.map((d) => (
            <div
              key={d.titel}
              className="p-6 border border-white/8 hover:border-[#c8a96e]/40 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4">{d.icon}</div>
              <h3 className="font-playfair text-xl font-bold text-white/90 mb-3 group-hover:text-[#c8a96e] transition-colors">
                {d.titel}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-dm">{d.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pakketten */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[#c8a96e] text-xs tracking-[0.3em] uppercase font-dm mb-4">Hosting</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white/90">
              Kies uw pakket
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pakketten.map((p) => (
              <div
                key={p.naam}
                className={`p-8 border transition-all duration-300 ${
                  p.highlight
                    ? "border-[#c8a96e]/60 bg-[#c8a96e]/5"
                    : "border-white/8 hover:border-white/20"
                }`}
              >
                {p.highlight && (
                  <div className="text-xs tracking-widest uppercase text-[#c8a96e] font-dm mb-4">
                    Meest gekozen
                  </div>
                )}
                <h3 className="font-playfair text-2xl font-bold text-white/90 mb-1">{p.naam}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-[#c8a96e] font-playfair">{p.prijs}</span>
                  <span className="text-white/30 text-sm font-dm">{p.per}</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="text-white/50 text-sm flex items-center gap-2 font-dm">
                      <span className="text-[#c8a96e] text-xs">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 text-sm font-dm transition-all ${
                    p.highlight
                      ? "bg-[#c8a96e] text-black hover:bg-[#d4b87e]"
                      : "border border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                  }`}
                >
                  Bestel nu
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-[#c8a96e] text-xs tracking-[0.3em] uppercase font-dm mb-4">Klanten</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white/90">
            Wat zij zeggen
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <blockquote className="p-8 border border-white/8">
            <p className="text-white/60 leading-relaxed font-dm font-light mb-6">
              &ldquo;Dankzij Allesis staat mijn website al jaren bij de eerste 3 zoekresultaten van Google — zonder Google Adwords.&rdquo;
            </p>
            <footer className="text-sm font-dm">
              <span className="text-[#c8a96e]">M. Kleinjans</span>
              <span className="text-white/30"> / Snelontruiming</span>
            </footer>
          </blockquote>
          <blockquote className="p-8 border border-white/8">
            <p className="text-white/60 leading-relaxed font-dm font-light mb-6">
              &ldquo;Mijn website werd geredesignd met mooie foto&apos;s, goed vindbaar op Google en alle sociale netwerken werden ook bijgehouden.&rdquo;
            </p>
            <footer className="text-sm font-dm">
              <span className="text-[#c8a96e]">Runee</span>
              <span className="text-white/30"> / Bangkokwellness</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white/90 mb-6">
            Klaar om te starten?
          </h2>
          <p className="text-white/40 text-lg mb-10 font-dm font-light">
            Bel ons of stuur een e-mail — we helpen u van begin tot eind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0888040355"
              className="px-8 py-4 bg-[#c8a96e] text-black font-medium hover:bg-[#d4b87e] transition-colors font-dm"
            >
              📞 088 80 40 355
            </a>
            <a
              href="mailto:info@allesis.nl"
              className="px-8 py-4 border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all font-dm"
            >
              ✉️ info@allesis.nl
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
