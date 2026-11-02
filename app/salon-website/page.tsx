import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import BrowserMockup from "@/components/BrowserMockup";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

// Case: Voque Beauty Boutique. Hier komen bezoekers binnen via "Ook zo'n website? Allesis"
// onderaan de Voque-site (utm_source=voque). Na de overstap van Voque naar het eigen domein
// VOQUE_URL aanpassen naar https://voquebeautyboutique.com.
const VOQUE_URL = "https://voque-beauty-boutique.vercel.app";
const ACCENT = "#9a7b45";

// Quote van de klant: alleen tonen als Wendy een echte quote heeft gegeven (niet verzinnen).
const QUOTE: { text: string; name: string } | null = null;

export const metadata: Metadata = {
  title: "Website voor uw schoonheidssalon — met online boeken, cadeaubonnen en webshop",
  description:
    "Case Voque Beauty Boutique: salonwebsite met online afspraken, cadeaubonnen met QR-code, webshop met PostNL/DHL, facturen en lokale vindbaarheid in Google en AI. Gebouwd door Allesis.",
  alternates: pageAlternates("/salon-website"),
  openGraph: {
    title: "Website voor uw salon | Allesis",
    description: "Online boeken, cadeaubonnen, webshop en facturen in één salonwebsite. Bekijk de case Voque Beauty Boutique.",
    url: `${SITE_URL}/salon-website`,
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/cases/voque/home.webp", width: 1600, height: 1000, alt: "Homepage van Voque Beauty Boutique" }],
  },
};

const features = [
  { icon: "📅", title: "Online afspraken", desc: "Klanten kiezen hun behandeling en zien direct de vrije tijden. Bevestiging en herinnering per mail, zelf verzetten of annuleren — geen dubbele boekingen." },
  { icon: "🎁", title: "Cadeaubonnen met QR-code", desc: "Online kopen en betalen met iDEAL. De bon komt als mooie PDF in de mail; in de salon scant u de QR-code met uw telefoon en boekt u hem (deels) af." },
  { icon: "🛍️", title: "Webshop", desc: "Producten verkopen met online betalen of betalen bij ophalen. Verzendkosten voor PostNL en DHL worden berekend op gewicht en afmetingen." },
  { icon: "🧾", title: "Facturen met btw", desc: "Facturen na een behandeling of bestelling, met btw-specificatie, PDF en uw eigen nummerreeks. Export voor de boekhouder." },
  { icon: "💛", title: "Klanten & spaarprogramma", desc: "Een klantenbestand dat zich vanzelf vult, plus een eigen loyaliteitsclub: klanten sparen automatisch bij elke behandeling." },
  { icon: "✨", title: "Huid-check & keuzehulp", desc: "Een korte, interactieve vragenlijst die bezoekers naar de juiste behandeling leidt — en direct laat boeken." },
  { icon: "📍", title: "Gevonden in de regio", desc: "Pagina's per plaats in het werkgebied, structured data voor Google en een llms.txt zodat ChatGPT, Perplexity en Gemini de salon goed kennen." },
  { icon: "🔒", title: "Veilig en AVG-proof", desc: "Tweestapsverificatie voor het beheer, bescherming tegen bots, versleutelde verbindingen, cookiekeuze en automatisch opruimen van oude gegevens." },
];

const gallery = [
  { src: "/cases/voque/afspraak.webp", alt: "Online een afspraak maken bij Voque", label: "Online boeken" },
  { src: "/cases/voque/cadeaubon.webp", alt: "Cadeaubon bestellen met live voorbeeld", label: "Cadeaubon met live voorbeeld" },
  { src: "/cases/voque/huid-check.webp", alt: "Interactieve huid-check", label: "Huid-check" },
  { src: "/cases/voque/winkel.webp", alt: "Webshop van Voque", label: "Webshop" },
];

export default function SalonWebsitePage() {
  return (
    <>
      <SubpageHero
        eyebrow="Case · Voque Beauty Boutique"
        title="Een salonwebsite die"
        titleAccent="voor u werkt"
        subtitle="Terwijl u behandelt, boekt de website afspraken, verkoopt hij cadeaubonnen en producten en maakt hij facturen. Zo bouwden we het voor Voque Beauty Boutique in Boesingheliede — en zo kunnen we het ook voor uw salon doen."
        accentColor={ACCENT}
        compact
      />

      {/* Groot beeld: desktop + mobiel */}
      <Reveal className="bg-white px-6 py-14 md:px-10 md:py-20">
        <div className="relative mx-auto max-w-5xl">
          <BrowserMockup url="voquebeautyboutique.com" className="[&>div:last-child]:p-0">
            <Image src="/cases/voque/home.webp" alt="Homepage van Voque Beauty Boutique" width={1600} height={1000} priority className="h-auto w-full" sizes="(max-width: 1024px) 100vw, 1024px" />
          </BrowserMockup>
          <div className="absolute -right-2 -bottom-10 hidden w-44 overflow-hidden rounded-[2rem] border-[6px] border-[#1E293B] shadow-2xl md:block lg:-right-10 lg:w-52">
            <Image src="/cases/voque/mobiel-home.webp" alt="Voque op de telefoon" width={390} height={844} className="h-auto w-full" />
          </div>
        </div>
        <p className="font-lato mx-auto mt-16 max-w-2xl text-center text-sm text-neutral-mid">
          Rustig, warm en snel — en helemaal ingericht op de salon. De eigenaar past teksten, foto&apos;s, prijzen en acties zelf aan in een overzichtelijk beheer.
        </p>
      </Reveal>

      {/* Functies */}
      <Reveal className="bg-neutral-light/40 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-sora text-center text-3xl font-bold text-neutral-dark">Wat zit er in de website?</h2>
          <p className="font-lato mx-auto mt-3 max-w-2xl text-center text-neutral-mid">Geen losse plug-ins of abonnementen bij vijf partijen: alles zit in één website, gebouwd op maat.</p>
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

      {/* Beelden */}
      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-sora text-center text-3xl font-bold text-neutral-dark">Een kijkje in de site</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {gallery.map((g) => (
              <figure key={g.src}>
                <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
                  <Image src={g.src} alt={g.alt} width={1600} height={1000} className="h-auto w-full" sizes="(max-width: 768px) 100vw, 500px" />
                </div>
                <figcaption className="font-lato mt-3 text-sm font-semibold" style={{ color: ACCENT }}>{g.label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
            <div className="mx-auto max-w-xs overflow-hidden rounded-xl shadow-xl ring-1 ring-black/10">
              <Image src="/cases/voque/cadeaubon-pdf.png" alt="Cadeaubon als PDF met QR-code" width={565} height={800} className="h-auto w-full" />
            </div>
            <div>
              <h3 className="font-sora text-2xl font-bold text-neutral-dark">De cadeaubon: mooi én slim</h3>
              <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
                Rood met een gouden strik, met de naam van de ontvanger en een persoonlijk bericht. Op het cadeaulabel staat een QR-code: de salon scant hem met de gewone telefooncamera, ziet direct of de bon geldig is en boekt hem helemaal of voor een deel af. Twee keer gebruiken kan niet.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {QUOTE && (
        <Reveal className="bg-neutral-light/40 px-6 py-16 md:px-10">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-sora text-2xl leading-snug text-neutral-dark">“{QUOTE.text}”</p>
            <footer className="font-lato mt-4 text-sm text-neutral-mid">— {QUOTE.name}, Voque Beauty Boutique</footer>
          </blockquote>
        </Reveal>
      )}

      {/* CTA */}
      <Reveal className="px-6 py-16 md:px-10 md:py-20" >
        <div className="mx-auto max-w-3xl rounded-3xl px-8 py-12 text-center text-white" style={{ background: "linear-gradient(135deg,#2a1d16,#4a3328)" }}>
          <h2 className="font-sora text-3xl font-bold">Ook zo&apos;n website voor uw salon?</h2>
          <p className="font-lato mx-auto mt-4 max-w-xl text-white/80">
            Schoonheidssalon, nagelstudio, kapper of praktijk: we bouwen een site die past bij uw zaak, met de functies die u echt gebruikt. Vertel ons wat u nodig heeft, dan maken we een voorstel.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="font-lato inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-8 font-bold text-[#2a1d16] transition hover:opacity-90">
              Vraag een voorstel aan →
            </Link>
            <a href={VOQUE_URL} target="_blank" rel="noopener noreferrer" className="font-lato inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/40 px-8 font-bold text-white transition hover:border-white">
              Bekijk Voque live <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </Reveal>
    </>
  );
}
