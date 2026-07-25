import type { Metadata } from "next";
import Link from "next/link";
import SubpageHero from "@/components/subpage/SubpageHero";
import { Reveal } from "@/components/subpage/Reveal";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Voorwaarden & Disclaimer — gratis one-pager",
  description:
    "Voorwaarden van Allesis: capaciteitsvoorbehoud voor het gratis one-pager pakket, de 24-uurs belofte, SSF-link en algemene disclaimer.",
  alternates: pageAlternates("/voorwaarden"),
  openGraph: {
    title: "Voorwaarden & Disclaimer | Allesis",
    description: "Volledige voorwaarden rondom het gratis pakket, de 24-uurs belofte en de algemene disclaimer.",
    url: `${SITE_URL}/voorwaarden`,
    locale: "nl_NL",
    type: "website",
  },
};

function HighlightBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-[#FED7AA] bg-[#FFF8F0] p-6">
      <h3 className="font-sora text-base font-extrabold text-[#92400E]">{title}</h3>
      <div className="font-lato mt-2 text-sm leading-relaxed text-[#B45309]">{children}</div>
    </div>
  );
}

function BlueBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 p-6" style={{ borderColor: "#C5D9A8", backgroundColor: "#F4F8EC" }}>
      <p className="font-lato text-sm leading-relaxed" style={{ color: "#2F5610" }}>{children}</p>
    </div>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="font-lato mt-4 space-y-2.5 text-neutral-mid">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function VoorwaardenPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Allesis.nl · KvK 52339831 · Versie juli 2026"
        title="Voorwaarden &"
        titleAccent="Disclaimer"
        subtitle="De volledige voorwaarden rondom ons gratis one-pager pakket, de 24-uurs belofte en de algemene disclaimer."
        backgroundImage="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg"
        accentColor="#3B6D11"
      />

      <Reveal className="bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          {/* 1. GRATIS PAKKET */}
          <section>
            <h2 className="font-sora text-2xl font-extrabold text-neutral-dark">1. Het gratis one-pager pakket*</h2>

            <div className="mt-6">
              <HighlightBox title="* Capaciteitsvoorbehoud — lees dit goed">
                Allesis biedt een gratis one-pager aan onder de volgende voorwaarden. Door een gratis website aan te
                vragen gaat u akkoord met deze voorwaarden. Bij twijfel kunt u contact opnemen via{" "}
                <a href="mailto:info@allesis.nl" className="font-bold text-ssf-orange underline">
                  info@allesis.nl
                </a>
                .
              </HighlightBox>
            </div>

            <h3 className="font-sora mt-8 text-base font-bold text-neutral-dark">1.1 Wat is inbegrepen</h3>
            <Bullets
              items={[
                "Bouw van een professionele one-pager (enkelvoudige pagina)",
                "Mobielvriendelijk en AVG-compliant basisopzet",
                "SSL-certificaat",
                "Contactformulier",
                "Online binnen 24 uur na tijdige aanlevering van content en logo**",
              ]}
            />

            <h3 className="font-sora mt-8 text-base font-bold text-neutral-dark">1.2 Wat op uw site verschijnt</h3>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Op elke gratis website van Allesis verschijnen de volgende elementen, waar u bij aanvraag expliciet mee
              akkoord gaat:
            </p>
            <Bullets
              items={[
                <>
                  Een donatie-link naar{" "}
                  <a
                    href="https://www.savedsouls-foundation.org/nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    Saved Souls Foundation
                  </a>{" "}
                  (dierenopvang Thailand) — zichtbaar als klein bannetje en in de footer
                </>,
                'Allesis-branding in de footer: "Webdesign door Allesis.nl"',
              ]}
            />
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Deze elementen zijn niet verwijderbaar binnen het gratis pakket. Wenst u een website zonder deze
              elementen? Kies dan voor het Starter pakket (€299 eenmalig).
            </p>

            <h3 className="font-sora mt-8 text-base font-bold text-neutral-dark">1.3 Hosting</h3>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              De bouw is gratis. Hosting wordt apart gefactureerd vanaf €8,95 per maand exclusief BTW. Hosting is
              jaarlijks opzegbaar na het eerste jaar.
            </p>

            <div className="mt-8">
              <HighlightBox title="⚠️ Recht tot weigering*">
                Allesis behoudt zich uitdrukkelijk het recht voor om een aanvraag voor een gratis website te weigeren in
                de volgende gevallen:
              </HighlightBox>
            </div>
            <Bullets
              items={[
                <>
                  <strong className="text-neutral-dark">Capaciteit:</strong> Wanneer de beschikbare capaciteit het niet
                  toelaat om binnen een redelijke termijn te leveren
                </>,
                <>
                  <strong className="text-neutral-dark">Inhoud:</strong> Wanneer de gewenste website-inhoud in strijd is
                  met onze waarden, de wet, of de AVG-regelgeving
                </>,
                <>
                  <strong className="text-neutral-dark">Werkwijze:</strong> Wanneer de aanvraag niet past binnen onze
                  werkwijze of kwaliteitsstandaarden
                </>,
                <>
                  <strong className="text-neutral-dark">Misbruik:</strong> Bij herhaalde of misbruik-gerelateerde
                  aanvragen
                </>,
              ]}
            />
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Bij weigering ontvangt u hiervan bericht per e-mail, zonder verdere opgave van reden. Er bestaat geen recht
              op compensatie bij weigering van het gratis pakket.
            </p>
          </section>

          <hr className="my-12 border-neutral-light" />

          {/* 2. 24 UUR */}
          <section>
            <h2 className="font-sora text-2xl font-extrabold text-neutral-dark">2. Online binnen 24 uur**</h2>
            <div className="mt-6">
              <BlueBox>
                ** &quot;Online binnen 24 uur&quot; is een streefdoel dat geldt onder specifieke voorwaarden. Er kunnen
                geen rechten worden ontleend aan deze termijn.
              </BlueBox>
            </div>
            <p className="font-lato mt-6 leading-relaxed text-neutral-mid">
              De 24-uurs termijn geldt uitsluitend wanneer aan alle volgende voorwaarden is voldaan:
            </p>
            <Bullets
              items={[
                "De aanvraag wordt ingediend op een Nederlandse werkdag (ma–vr, uitgezonderd feestdagen)",
                "Alle benodigde content wordt tijdig aangeleverd: logo (PNG/SVG), teksten, contactgegevens en eventuele foto's",
                "Er zijn geen technische complicaties met domein of hosting",
                "Er is geen wachtrij door hoge capaciteitsvraag",
              ]}
            />
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Bij aanvragen in het weekend of op feestdagen geldt de eerstvolgende werkdag als startpunt. Bij
              onvolledige aanlevering van content wordt de termijn opgeschort.
            </p>
          </section>

          <hr className="my-12 border-neutral-light" />

          {/* 3. ALGEMEEN */}
          <section>
            <h2 className="font-sora text-2xl font-extrabold text-neutral-dark">3. Algemene disclaimer</h2>

            <h3 className="font-sora mt-6 text-base font-bold text-neutral-dark">3.1 Aansprakelijkheid</h3>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Allesis spant zich in om nauwkeurige en actuele informatie op allesis.nl te plaatsen. Ondanks deze
              zorgvuldigheid kan Allesis niet garanderen dat alle informatie te allen tijde correct, volledig of actueel
              is. Allesis aanvaardt geen aansprakelijkheid voor schade die voortvloeit uit het gebruik van of het
              vertrouwen op de informatie op deze website.
            </p>

            <h3 className="font-sora mt-6 text-base font-bold text-neutral-dark">3.2 Externe links</h3>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Allesis.nl bevat links naar externe websites, waaronder savedsouls-foundation.org. Allesis is niet
              verantwoordelijk voor de inhoud van externe websites en aanvaardt hiervoor geen aansprakelijkheid.
            </p>

            <h3 className="font-sora mt-6 text-base font-bold text-neutral-dark">3.3 Intellectueel eigendom</h3>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Alle inhoud op allesis.nl — teksten, ontwerpen, logo&apos;s en afbeeldingen — is eigendom van Allesis of
              wordt gebruikt met toestemming. Niets mag worden overgenomen zonder schriftelijke toestemming.
            </p>

            <h3 className="font-sora mt-6 text-base font-bold text-neutral-dark">3.4 Beschikbaarheid</h3>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Allesis streeft naar maximale beschikbaarheid van haar diensten maar kan geen 100% uptime garanderen.
              Gepland onderhoud wordt waar mogelijk vooraf aangekondigd.
            </p>
          </section>

          <hr className="my-12 border-neutral-light" />

          {/* 4. AVG */}
          <section>
            <h2 className="font-sora text-2xl font-extrabold text-neutral-dark">4. Privacy & AVG</h2>
            <p className="font-lato mt-6 leading-relaxed text-neutral-mid">
              Allesis verwerkt persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG). Via het
              contactformulier ingediende gegevens worden uitsluitend gebruikt voor het afhandelen van uw aanvraag en
              worden nooit aan derden verkocht.
            </p>
            <p className="font-lato mt-3 leading-relaxed text-neutral-mid">
              Lees onze volledige{" "}
              <Link href="/privacy" className="font-semibold text-primary hover:underline">
                Privacyverklaring
              </Link>{" "}
              voor meer informatie.
            </p>
          </section>

          <hr className="my-12 border-neutral-light" />

          {/* 5. CONTACT */}
          <section>
            <h2 className="font-sora text-2xl font-extrabold text-neutral-dark">5. Contact</h2>
            <p className="font-lato mt-6 leading-relaxed text-neutral-mid">Vragen over deze voorwaarden? Neem contact op:</p>
            <Bullets
              items={[
                <>
                  E-mail:{" "}
                  <a href="mailto:info@allesis.nl" className="font-semibold text-primary hover:underline">
                    info@allesis.nl
                  </a>
                </>,
                "KvK: 52339831",
                "Gevestigd in: Haarlem, Noord-Holland",
              ]}
            />
          </section>
        </div>
      </Reveal>
    </>
  );
}
