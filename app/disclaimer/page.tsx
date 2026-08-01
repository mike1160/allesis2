import type { Metadata } from "next";
import PremiumCard from "@/components/subpage/PremiumCard";
import { Reveal } from "@/components/subpage/Reveal";
import SubpageHero from "@/components/subpage/SubpageHero";
import { pageAlternates, SITE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Disclaimer & privacybeleid",
  description:
    "Disclaimer van Allesis.nl: aansprakelijkheid, intellectueel eigendom, AVG/GDPR en Thaise wetgeving (PDPA, Computer Crimes Act, Electronic Transactions Act) bij webdiensten in Thailand.",
  alternates: pageAlternates("/disclaimer"),
  openGraph: {
    title: "Disclaimer | Allesis",
    url: `${SITE_URL}/disclaimer`,
    locale: "nl_NL",
    type: "website",
  },
};

type Blok = {
  titel: string;
  tekst: string | string[];
};

const blokken: Blok[] = [
  {
    titel: "Algemeen",
    tekst: [
      "Allesis is gevestigd in Haarlem, Nederland (KvK 52339831). Aan de informatie op deze website en op onderliggende pagina’s (waaronder /th — Phuket & Thailand) kunnen geen rechten worden ontleend.",
      "Allesis behoudt het recht om de inhoud van deze website, dienstenbeschrijvingen en prijzen op elk moment te wijzigen zonder voorafgaande kennisgeving, behoudens dwingend recht en bestaande contractuele afspraken met klanten.",
      "Deze disclaimer is van toepassing op het gebruik van allesis.nl, gerelateerde subdomeinen, contactformulieren, demo’s en geleverde websites, ongeacht of de bezoeker of klant zich in Nederland, Thailand of elders bevindt.",
    ],
  },
  {
    titel: "Geen juridisch advies",
    tekst: [
      "De informatie op deze website — inclusief teksten over wetgeving in Nederland en Thailand — is algemeen van aard en vormt geen juridisch, fiscaal of compliance-advies.",
      "Voor bindende vragen over Thaise of Nederlandse wetgeving raadpleegt u een gekwalificeerde advocaat of adviseur in het betreffende rechtsgebied. Allesis is geen advocatenkantoor.",
    ],
  },
  {
    titel: "Prijzen",
    tekst:
      "Alle genoemde prijzen op deze website zijn exclusief BTW (21%), tenzij anders aangegeven. Prijzen in THB of andere valuta zijn indicatief. Allesis behoudt het recht om prijzen te wijzigen. Wijzigingen worden minimaal 30 dagen van tevoren gecommuniceerd aan bestaande klanten met een lopende overeenkomst.",
  },
  {
    titel: "Aansprakelijkheid — websites & diensten",
    tekst: [
      "Allesis is niet aansprakelijk voor schade die voortvloeit uit het gebruik van of vertrouwen op informatie op deze website, demo-sites of voorbeelden die mogelijk niet (meer) werken.",
      "Voor geleverde websites en digitale diensten beperkt de aansprakelijkheid van Allesis zich — voor zover wettelijk toegestaan — tot het bedrag dat de klant voor de betreffende opdracht heeft betaald in de twaalf maanden voorafgaand aan de schadeveroorzakende gebeurtenis. Allesis is niet aansprakelijk voor indirecte schade, gederfde omzet, dataverlies, reputatieschade of claims van derden, behoudens opzet of bewuste roekeloosheid.",
      "Allesis garandeert niet dat een website altijd beschikbaar is, 100% foutloos is, of specifieke zoekresultaten, conversies of omzet oplevert. Resultaten van SEO, AI-vindbaarheid en marketing zijn afhankelijk van derden (o.a. Google, hosting, netwerken) en van content en medewerking van de klant.",
    ],
  },
  {
    titel: "Verantwoordelijkheid van de klant (content & gebruik)",
    tekst: [
      "De klant blijft volledig verantwoordelijk voor alle content die op de website wordt geplaatst of aangeleverd (teksten, foto’s, prijzen, claims, persoonsgegevens van derden, landtitels, medische of financiële claims, enzovoort).",
      "De klant garandeert dat content rechtmatig is, geen rechten van derden schendt, en voldoet aan toepasselijke wetgeving in de landen waar de site wordt aangeboden of gebruikt — inclusief Thailand indien de doelgroep of activiteit zich daar bevindt.",
      "Allesis is niet verplicht content te controleren op juistheid of legaliteit, tenzij schriftelijk anders overeengekomen. Onrechtmatige, misleidende of verboden content kan Allesis verplichten de site (tijdelijk) offline te zetten of medewerking te weigeren.",
    ],
  },
  {
    titel: "Thaise wetgeving — Computer Crimes Act",
    tekst: [
      "Voor zover diensten of websites betrekking hebben op Thailand of gebruikers in Thailand, wijst Allesis op de Computer Crimes Act B.E. 2550 (2007) en latere wijzigingen. Deze wet verbiedt onder meer ongeoorloofde toegang tot computersystemen, het verspreiden van valse of schadelijke data via computersystemen, en bepaalde vormen van online fraude of belastering via elektronische middelen.",
      "De klant is verantwoordelijk dat de website en het gebruik daarvan niet in strijd zijn met deze wet. Allesis is niet aansprakelijk voor boetes, strafrechtelijke of civiele claims die voortvloeien uit content of gedragingen van de klant of diens bezoekers.",
    ],
  },
  {
    titel: "Thaise wetgeving — Personal Data Protection Act (PDPA)",
    tekst: [
      "De Personal Data Protection Act B.E. 2562 (2019) (PDPA) reguleert de verwerking van persoonsgegevens in Thailand. Als een website persoonsgegevens van personen in Thailand verzamelt of verwerkt (formulieren, cookies, nieuwsbrieven, booking, CRM), kan de PDPA van toepassing zijn — naast of naast de EU-AVG/GDPR wanneer Allesis als Nederlandse verwerker of verwerkingsverantwoordelijke optreedt.",
      "De klant is in beginsel zelf verwerkingsverantwoordelijke voor gegevens die via diens website worden verzameld, tenzij schriftelijk anders overeengekomen. De klant zorgt voor een passend privacybeleid, toestemmingsmechanismen, bewaartermijnen en rechten van betrokkenen volgens PDPA en/of AVG.",
      "Allesis kan technische maatregelen leveren (formulieren, Turnstile, hostingconfiguratie), maar geeft geen garantie dat de klant daarmee volledig PDPA- of AVG-compliant is zonder eigen juridische toetsing.",
    ],
  },
  {
    titel: "Thaise wetgeving — Electronic Transactions Act & e-handel",
    tekst: [
      "De Electronic Transactions Act B.E. 2544 (2001) en gerelateerde regelgeving erkennen elektronische berichten en handtekeningen onder voorwaarden. Online overeenkomsten, boekingen en betalingen die via door Allesis gebouwde sites lopen, blijven de verantwoordelijkheid van de klant wat betreft geldigheid, consumentenbescherming en fiscale verplichtingen in Thailand.",
      "Allesis is geen partij bij transacties tussen de klant en diens eindgebruikers, tenzij uitdrukkelijk schriftelijk anders bepaald.",
    ],
  },
  {
    titel: "Thaise wetgeving — auteursrecht & merken",
    tekst: [
      "Thaise Copyright Act B.E. 2537 (1994) en merkenrecht beschermen creatieve werken en merken. De klant garandeert dat aangeleverde logo’s, foto’s, teksten en softwarecomponenten rechtmatig mogen worden gebruikt.",
      "Inbreukclaims van derden die voortvloeien uit door de klant aangeleverde of zelf geplaatste content komen voor rekening van de klant. Allesis behoudt intellectuele eigendomsrechten op eigen frameworks, ontwerpsystemen en code, tenzij schriftelijk overgedragen.",
    ],
  },
  {
    titel: "Internetverkeer, hosting & beveiliging",
    tekst: [
      "Websites kunnen worden gehost via derden (o.a. Vercel, Cloudflare of andere providers). Allesis is niet aansprakelijk voor storingen, DDoS, DNS-problemen, of wijzigingen bij die derden.",
      "Geen enkel systeem is 100% veilig. Allesis treft redelijke technische maatregelen, maar garandeert niet dat een site immuun is voor hacks, malware of datalekken. De klant is verantwoordelijk voor sterke wachtwoorden, toegang tot CMS/admin, tijdig doorgeven van beveiligingsincidenten, en naleving van meldplichten onder AVG/PDPA.",
      "Misbruik van contactformulieren, spam of frauduleus verkeer (bots) kan leiden tot tijdelijke beperking van diensten.",
    ],
  },
  {
    titel: "Grensoverschrijdende dienstverlening (NL ↔ TH)",
    tekst: [
      "Allesis levert diensten vanuit Nederland aan klanten wereldwijd, inclusief Phuket en overig Thailand. Toepasselijk recht en forumkeuze volgen de algemene voorwaarden of offerte van Allesis, in beginsel Nederlands recht en bevoegde rechter in Nederland, voor zover dwingend recht in Thailand of elders dat toelaat.",
      "Lokale vergunningen, bedrijfsregistratie in Thailand, toerismevergunningen, medische of vastgoedvergunningen, en naleving van sectorspecifieke Thaise regels blijven uitsluitend voor rekening van de klant.",
    ],
  },
  {
    titel: "Cookiebeleid",
    tekst:
      "Allesis.nl maakt gebruik van functionele cookies die nodig zijn voor het correct functioneren van de website (zoals het onthouden van uw cookievoorkeur) en waar van toepassing Cloudflare Turnstile voor spampreventie. Wij gebruiken geen tracking- of advertentiecookies tenzij u daar via de cookiebanner mee instemt. U kunt uw browserinstellingen aanpassen om cookies te weigeren.",
  },
  {
    titel: "Privacybeleid (Allesis.nl)",
    tekst: [
      "Allesis verwerkt persoonsgegevens die u vrijwillig verstrekt via formulieren (naam, e-mail, telefoon/LINE, bericht) om uw vraag te beantwoorden en — met toestemming — voor nieuwsbrieven. Gegevens worden niet verkocht aan derden.",
      "Verwerking gebeurt onder de AVG/GDPR. Voor meer details zie onze privacyverklaring. U heeft het recht op inzage, correctie en verwijdering via info@allesis.nl.",
    ],
  },
  {
    titel: "Intellectueel eigendom",
    tekst:
      "Alle content op deze website, inclusief teksten, afbeeldingen en logo’s, is eigendom van Allesis of wordt gebruikt met toestemming. Niets van deze website mag worden gekopieerd of verspreid zonder schriftelijke toestemming van Allesis, behoudens dwingende uitzonderingen in de Auteurswet.",
  },
  {
    titel: "Links naar derden & portfolio",
    tekst:
      "Deze site kan linken naar externe websites (portfolio, partners, Saved Souls Foundation, ThaiPlot, enz.). Allesis is niet verantwoordelijk voor de inhoud, privacypraktijken of beschikbaarheid van die sites. Portfolio- en demosites kunnen offline gaan of wijzigen zonder aankondiging.",
  },
  {
    titel: "Contact",
    tekst:
      "Voor vragen over deze disclaimer, privacy of Thaise/Nederlandse compliance in relatie tot onze diensten: info@allesis.nl · allesis.nl/th (Phuket hub).",
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <SubpageHero
        eyebrow="Juridisch"
        title="Disclaimer &"
        titleAccent="privacybeleid"
        subtitle={`Laatste update: ${new Date().toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })} · NL + Thailand`}
      />

      <Reveal className="bg-neutral-light/40 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="font-lato text-sm leading-relaxed text-neutral-mid">
            Deze pagina beschermt Allesis en verduidelijkt verantwoordelijkheden bij webdesign,
            hosting en sites voor klanten in Nederland en Thailand. Geen vervanging van juridisch advies.
          </p>
          {blokken.map((s) => (
            <PremiumCard key={s.titel} className="!p-6">
              <h2 className="font-sora text-lg font-bold text-neutral-dark">{s.titel}</h2>
              {Array.isArray(s.tekst) ? (
                <div className="mt-3 space-y-3">
                  {s.tekst.map((p) => (
                    <p key={p.slice(0, 48)} className="font-lato text-[15px] leading-relaxed text-neutral-mid">
                      {p}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="font-lato mt-3 text-[15px] leading-relaxed text-neutral-mid">{s.tekst}</p>
              )}
            </PremiumCard>
          ))}
        </div>
      </Reveal>
    </>
  );
}
