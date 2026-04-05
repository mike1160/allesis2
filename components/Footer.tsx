import Link from "next/link";

const dienstenLinks = [
  { href: "/webdesign", label: "Webdesign" },
  { href: "/hosting", label: "Hosting" },
  { href: "/domeinen", label: "Domeinen" },
  { href: "/vertaling", label: "Vertaling" },
];

const avgLinks = [
  { href: "/avg-regelgeving", label: "AVG Regelgeving" },
  { href: "/avg-boetes", label: "AVG Boetes" },
  { href: "/avg-check", label: "AVG Check" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-dark px-6 py-20 pb-10 text-white md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-sora text-[15px] font-extrabold text-white">A</span>
              </div>
              <span className="font-sora text-xl font-bold">Allesis.nl</span>
            </div>
            <p className="font-lato max-w-xs text-base font-light leading-relaxed text-white/65">
              Webdesign, hosting en AVG-compliance voor het MKB — duidelijk, snel en betrouwbaar.
            </p>
            <p className="font-lato mt-6 text-sm font-light text-white/50">Gevestigd in Haarlem, Nederland</p>
          </div>

          <div>
            <h4 className="font-sora mb-5 text-xs font-bold uppercase tracking-[0.12em] text-white/45">Diensten</h4>
            <ul className="space-y-3">
              {dienstenLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-lato text-base font-normal text-white/70 no-underline transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sora mb-5 text-xs font-bold uppercase tracking-[0.12em] text-white/45">AVG &amp; Juridisch</h4>
            <ul className="space-y-3">
              {avgLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-lato text-base font-normal text-white/70 no-underline transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sora mb-5 text-xs font-bold uppercase tracking-[0.12em] text-white/45">Contact</h4>
            <a href="mailto:info@allesis.nl" className="font-lato block text-base text-white/70 no-underline transition hover:text-white">
              info@allesis.nl
            </a>
            <Link href="/contact" className="font-lato mt-4 inline-block text-base font-semibold text-accent no-underline transition hover:brightness-95">
              Contactpagina →
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="font-lato text-sm text-white/45">© 2026 Allesis</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/disclaimer" className="font-lato text-sm text-white/45 no-underline transition hover:text-white">
              Disclaimer &amp; Privacy
            </Link>
            <span className="font-lato text-sm text-white/45">KvK 52339831</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
