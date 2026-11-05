import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

// Allesis Geboekt: onze eigen boekingsapp. De app zelf draait op geboekt.allesis.nl (repo ~/salon-app).
const APP_URL = "https://geboekt.allesis.nl";
const ACCENT = "#D45D79";
const PLUM = "#3F2554";

export const metadata: Metadata = {
  title: "Allesis Geboekt — de nieuwe boekingsapp, zonder PHP en plug-ins",
  description:
    "Klanten boeken zelf, dag en nacht. Agenda, herinneringen, afrekenen en groepslessen in één app. Gebouwd zonder PHP en plug-ins. 4 weken gratis, daarna €24,95 per maand excl. btw. Geen commissie.",
  alternates: pageAlternates("/geboekt"),
  openGraph: {
    title: "Allesis Geboekt | Jij doet je vak, je agenda vult zichzelf",
    description: "De nieuwe boekingsapp voor iedereen die op afspraak werkt. Zonder PHP, zonder plug-ins, zonder commissie.",
    url: `${SITE_URL}/geboekt`,
    locale: "nl_NL",
    type: "website",
  },
};

const compare: [string, string, string][] = [
  ["Techniek", "Vaak WordPress met PHP", "Nieuw gebouwd, zonder PHP"],
  ["Plug-ins", "Elke plug-in is een extra deur die u moet bijhouden", "Geen plug-ins: alles zit er al in"],
  ["Uw gegevens", "Vaak één database voor de hele site", "Elke zaak afgeschermd in de database zelf"],
  ["Inloggen", "Vaak alleen een wachtwoord", "Tweestapsverificatie (2FA) en een slot op raden"],
  ["Kosten", "Soms commissie per boeking", "Eén vaste prijs, geen commissie"],
];

const features = [
  { icon: "📅", title: "Een agenda die zichzelf vult", desc: "Klanten kiezen zelf een tijd, ook 's avonds op de bank. Dubbel boeken kan niet, ook niet met meer medewerkers." },
  { icon: "🔔", title: "Minder mensen die niet komen", desc: "Herinneringen gaan vanzelf. Wilt u zekerheid? Vraag een aanbetaling." },
  { icon: "🪑", title: "Lege plekken vullen", desc: "Korting op rustige momenten, en een wachtlijst die vanzelf een seintje geeft als iemand afzegt." },
  { icon: "🔁", title: "Vaste afspraken", desc: "Elke vier weken dezelfde klant? In één keer vooruit gepland, tot een half jaar." },
  { icon: "🧘", title: "Groepslessen", desc: "Yoga, bootcamp of sauna: een maximum aantal plekken, en de wachtlijst schuift vanzelf door." },
  { icon: "🧾", title: "Afrekenen en facturen", desc: "Contant, pin, bank of online. De bon gaat vanzelf naar uw klant, en het geld rechtstreeks naar u." },
  { icon: "🎟️", title: "Strippenkaart en kortingscodes", desc: "Tien lessen vooruit, een spaarkaart, of een code voor Instagram. Afboeken doet u met één tik." },
  { icon: "📱", title: "Op uw telefoon, in gewone taal", desc: "Gemaakt voor tussen twee klanten door: grote knoppen en één vraag tegelijk." },
];

const safety = [
  ["Geen PHP en geen plug-ins", "Veel aanvallen op websites gaan via oude plug-ins. Die zitten hier niet in, dus dat risico valt weg."],
  ["Elke zaak apart", "De database zelf houdt zaken uit elkaar. Dat testen we bij elke wijziging."],
  ["2FA bij het inloggen", "Naast uw wachtwoord ook een code uit een app op uw telefoon. Een gestolen wachtwoord is dan niet genoeg."],
  ["Data in de EU", "Uw gegevens staan in een datacenter in Frankfurt, over een versleutelde verbinding."],
  ["U ziet wie wat deed", "Een logboek laat zien wie wat heeft gedaan. Medewerkers zien alleen wat ze nodig hebben."],
  ["Altijd meenemen", "U downloadt uw klanten en facturen wanneer u wilt. Uw gegevens blijven van u."],
];

const trades = ["Kapper", "Barbier", "Schoonheidssalon", "Nagelstudio", "Tattoo", "Massage", "Personal trainer", "Sportschool", "Yoga en dans", "Hondentrimsalon", "Dierentrainer", "Rijschool", "Autodetailing", "Tandarts", "Huisarts", "Fysiotherapie", "Psycholoog"];

export default function GeboektPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Nieuw van Allesis"
        title="Alles is"
        titleAccent="geboekt."
        subtitle="Jij doet je vak, je agenda vult zichzelf. De nieuwe boekingsapp voor iedereen die op afspraak werkt: klanten boeken zelf, dag en nacht. Zonder PHP, zonder plug-ins en zonder commissie."
        accentColor={ACCENT}
        compact
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={APP_URL} className="font-lato inline-flex min-h-[52px] items-center justify-center rounded-xl px-8 font-bold text-white transition hover:opacity-90" style={{ background: PLUM }}>Probeer 4 weken gratis →</a>
          <a href="#veilig" className="font-lato inline-flex min-h-[52px] items-center justify-center rounded-xl border border-neutral-300 bg-white px-8 font-bold text-neutral-dark transition hover:opacity-90">Waarom veiliger?</a>
        </div>
      </SubpageHero>

      {/* Voorbeeld van de app */}
      <Reveal className="bg-white px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-sora text-3xl font-bold text-neutral-dark">De telefoon gaat. Net nu u bezig bent.</h2>
            <p className="font-lato mt-4 leading-relaxed text-neutral-mid">
              Een gemiste oproep is vaak een gemiste klant. Met Allesis Geboekt boeken klanten zelf, ook als u aan het werk bent of allang thuis zit. U opent de app en ziet: de dag staat vol.
            </p>
            <p className="font-lato mt-4 font-bold" style={{ color: PLUM }}>Geen handleiding nodig. Wel een volle agenda.</p>
          </div>
          <div aria-hidden="true" className="mx-auto w-full max-w-[280px] rounded-[2.5rem] border-8 border-[#231C2E] bg-[#FAF7F4] p-4 shadow-2xl">
            <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${PLUM}, ${ACCENT})` }}>
              <p className="font-lato text-sm opacity-90">Goedemorgen</p>
              <p className="font-sora text-2xl font-bold">8 afspraken vandaag</p>
            </div>
            <div className="font-lato mt-3 rounded-2xl bg-[#E6F0F9] p-3 text-sm text-[#1D4F7E]"><strong>Over 30 minuten</strong><br />Anna: knippen en kleuren</div>
            <div className="font-lato mt-3 rounded-2xl bg-[#E7F5EC] p-3 text-sm text-[#1E6B45]"><strong>Net geboekt</strong><br />Bram: morgen om 10:00</div>
            <div className="font-lato mt-3 grid grid-cols-2 gap-2 text-center text-sm font-semibold text-neutral-dark">
              {["Afspraak erbij", "Agenda", "Afrekenen", "Klanten"].map((t) => <div key={t} className="rounded-2xl bg-white p-4 shadow-sm">{t}</div>)}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Vergelijking */}
      <Reveal className="bg-neutral-light/40 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-sora text-center text-3xl font-bold text-neutral-dark">Nieuw gebouwd. Niet opgelapt.</h2>
          <p className="font-lato mx-auto mt-3 max-w-2xl text-center text-neutral-mid">Veel boekingssites draaien op oudere techniek met losse uitbreidingen. Wij zijn helemaal opnieuw begonnen.</p>
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="font-sora hidden grid-cols-3 gap-4 bg-neutral-light/60 px-5 py-3 text-sm font-bold text-neutral-dark sm:grid"><span /><span>Vaak bij oudere systemen</span><span style={{ color: PLUM }}>Allesis Geboekt</span></div>
            {compare.map(([k, old, ours]) => (
              <div key={k} className="font-lato grid gap-1 border-t border-black/5 px-5 py-4 text-sm sm:grid-cols-3 sm:gap-4">
                <strong className="text-neutral-dark">{k}</strong>
                <span className="text-neutral-mid">{old}</span>
                <span className="font-bold" style={{ color: PLUM }}>✓ {ours}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Functies */}
      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-sora text-center text-3xl font-bold text-neutral-dark">Alles zit erin. Echt alles.</h2>
          <p className="font-lato mx-auto mt-3 max-w-2xl text-center text-neutral-mid">Geen losse pakketten en geen verrassingen. En mist u toch iets? Dan maken we het erbij.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <PremiumCard key={f.title} className="flex gap-4">
                <span className="text-3xl" aria-hidden>{f.icon}</span>
                <div>
                  <h3 className="font-sora text-lg font-bold text-neutral-dark">{f.title}</h3>
                  <p className="font-lato mt-1 text-sm leading-relaxed text-neutral-mid">{f.desc}</p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Veiligheid */}
      <Reveal className="px-6 py-16 text-white md:px-10 md:py-20" >
        <div id="veilig" className="mx-auto max-w-5xl scroll-mt-24 rounded-3xl px-8 py-12" style={{ background: PLUM }}>
          <h2 className="font-sora text-3xl font-bold">Veiliger dan een systeem vol plug-ins</h2>
          <p className="font-lato mt-3 max-w-2xl text-white/85">U vertrouwt ons de gegevens van uw klanten toe. Daarom is veiligheid het begin van de bouw, en niet iets wat er later bij is gezet.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {safety.map(([t, d]) => <div key={t} className="rounded-2xl bg-white/10 p-5"><h3 className="font-sora font-bold">{t}</h3><p className="font-lato mt-1 text-sm text-white/85">{d}</p></div>)}
          </div>
          <p className="font-lato mt-6 text-sm text-white/85">We zijn er eerlijk over: er is nog geen ISO 27001- of NEN 7510-certificaat en nog geen onafhankelijke beveiligingstest. <a href={`${APP_URL}/veiligheid`} className="underline">Lees alles over onze veiligheid</a>.</p>
        </div>
      </Reveal>

      {/* Branches */}
      <Reveal className="bg-white px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-sora text-3xl font-bold text-neutral-dark">Werkt u op afspraak? Dan is dit voor u.</h2>
          <ul className="font-lato mt-6 flex flex-wrap justify-center gap-2 text-sm">{trades.map((t) => <li key={t} className="rounded-full border border-black/10 bg-neutral-light/40 px-4 py-2 text-neutral-dark">{t}</li>)}</ul>
          <p className="font-lato mx-auto mt-5 max-w-2xl text-xs text-neutral-mid">Voor zorgpraktijken is er een aparte zorgstand. Dat is een afsprakenagenda, geen patiëntendossier.</p>
        </div>
      </Reveal>

      {/* Prijs en actie */}
      <Reveal className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl px-8 py-12 text-center text-white" style={{ background: `linear-gradient(135deg, ${PLUM}, ${ACCENT})` }}>
          <h2 className="font-sora text-3xl font-bold">Uw agenda kan morgen al voller zijn</h2>
          <p className="font-sora mt-5 text-5xl font-bold">€24,95</p>
          <p className="font-lato mt-1 text-white/85">per maand excl. btw, plus €5 per extra medewerker. Geen commissie.</p>
          <p className="font-lato mt-3 text-white/85">De eerste 4 weken zijn gratis, zonder betaalgegevens. Daarna krijgt u een factuur die u gewoon overmaakt.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={APP_URL} className="font-lato inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-8 font-bold transition hover:opacity-90" style={{ color: PLUM }}>Probeer 4 weken gratis <ExternalLink className="h-4 w-4" aria-hidden /></a>
            <Link href="/contact" className="font-lato inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/40 px-8 font-bold text-white transition hover:bg-white/10">Liever eerst even bellen?</Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
