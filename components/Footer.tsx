import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-playfair text-lg font-bold mb-3">
            <span style={{ color: "#c8a96e" }}>ALLESIS</span>
            <span className="text-white/30">.NL</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed font-dm">
            Domeinregistratie, webhosting, webdesign, SEO en Thais-Nederlands vertaalservice voor MKB en particulieren.
          </p>
        </div>
        <div>
          <h4 className="text-white/80 text-sm font-medium mb-3 font-dm">Menu</h4>
          <ul className="space-y-2 text-sm font-dm">
            {[
              { href: "/hosting", label: "Hosting & Domeinen" },
              { href: "/vertaling", label: "Vertaling & Tolk" },
              { href: "/dienstverlening", label: "Dienstverlening" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/40 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white/80 text-sm font-medium mb-3 font-dm">Contact</h4>
          <ul className="space-y-2 text-sm text-white/40 font-dm">
            <li>📞 <a href="tel:0888040355" className="hover:text-white transition-colors">088 80 40 355</a></li>
            <li>✉️ <a href="mailto:info@allesis.nl" className="hover:text-white transition-colors">info@allesis.nl</a></li>
            <li>📍 Amsterdam & omgeving</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 text-center text-white/20 text-xs font-dm">
        © {new Date().getFullYear()} Allesis. All rights reserved.
      </div>
    </footer>
  );
}
