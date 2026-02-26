export const metadata = {
  title: "Contact | Allesis",
  description: "Neem contact op met Allesis voor hosting, webdesign, vertaling of dienstverlening.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <p className="text-[#c8a96e] text-xs tracking-[0.3em] uppercase font-dm mb-4">Contact</p>
      <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white/90 mb-6">
        Neem contact op
      </h1>
      <p className="text-white/50 text-lg max-w-xl mb-16 font-dm font-light leading-relaxed">
        Heeft u vragen of wilt u een offerte? Bel ons of stuur een e-mail — we reageren snel.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div className="space-y-8">
          <div>
            <h2 className="font-playfair text-xl font-bold mb-4">Directe contactgegevens</h2>
            <ul className="space-y-4 font-dm">
              <li className="flex items-center gap-4 text-white/60">
                <span className="text-2xl">📞</span>
                <div>
                  <div className="text-xs text-white/30 mb-1">Telefoon</div>
                  <a href="tel:0888040355" className="hover:text-[#c8a96e] transition-colors">088 80 40 355</a>
                </div>
              </li>
              <li className="flex items-center gap-4 text-white/60">
                <span className="text-2xl">✉️</span>
                <div>
                  <div className="text-xs text-white/30 mb-1">E-mail</div>
                  <a href="mailto:info@allesis.nl" className="hover:text-[#c8a96e] transition-colors">info@allesis.nl</a>
                </div>
              </li>
              <li className="flex items-center gap-4 text-white/60">
                <span className="text-2xl">📍</span>
                <div>
                  <div className="text-xs text-white/30 mb-1">Werkgebied</div>
                  <span>Amsterdam, Haarlem & omgeving</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="border border-white/8 p-6">
            <h3 className="font-playfair text-lg font-bold mb-2">Openingstijden</h3>
            <ul className="text-white/40 text-sm space-y-1 font-dm">
              <li className="flex justify-between"><span>Maandag – Vrijdag</span><span>9:00 – 18:00</span></li>
              <li className="flex justify-between"><span>Zaterdag</span><span>Op afspraak</span></li>
              <li className="flex justify-between"><span>Zondag</span><span>Gesloten</span></li>
            </ul>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="font-playfair text-xl font-bold mb-6">Stuur een bericht</h2>
          <form className="space-y-4" action="mailto:info@allesis.nl" method="get">
            <div>
              <label className="text-xs text-white/30 uppercase tracking-widest font-dm block mb-2">Naam</label>
              <input
                type="text"
                name="naam"
                placeholder="Uw naam"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/80 placeholder-white/20 focus:outline-none focus:border-[#c8a96e]/60 font-dm text-sm transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-white/30 uppercase tracking-widest font-dm block mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="uw@email.nl"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/80 placeholder-white/20 focus:outline-none focus:border-[#c8a96e]/60 font-dm text-sm transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-white/30 uppercase tracking-widest font-dm block mb-2">Bericht</label>
              <textarea
                name="body"
                rows={5}
                placeholder="Hoe kunnen wij u helpen?"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/80 placeholder-white/20 focus:outline-none focus:border-[#c8a96e]/60 font-dm text-sm transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#c8a96e] text-black font-medium hover:bg-[#d4b87e] transition-colors font-dm"
            >
              Verstuur bericht
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
