/**
 * Centrale prijslijst voor alles wat direct afrekenbaar is.
 *
 * Prijzen komen ALLEEN hier vandaan — nooit uit de browser, nooit uit een
 * request body. De bedragen op de dienstpagina's staan exclusief btw;
 * hieronder staat het bedrag inclusief 21% btw, dat is wat er wordt geïncasseerd.
 */

/**
 * Hoe een betaald product geleverd wordt. Verplicht veld: een nieuw product
 * kan niet worden toegevoegd zonder te kiezen wie het levert, zodat de
 * webhook nooit stilzwijgend een betaling accepteert die niemand oppakt.
 */
export type Levering =
  /** Claude + Resend sturen de documenten direct, zie lib/avg-levering.ts */
  | "avg-documenten"
  /** Bevestiging naar de klant + melding naar ADMIN_EMAIL; Allesis pakt het op */
  | "handmatig";

export type Product = {
  slug: string;
  naam: string;
  /** Wat de klant daadwerkelijk betaalt, in euro's inclusief 21% btw. */
  prijsInclBtw: number;
  omschrijving: string;
  levering: Levering;
  /**
   * Digitale levering start meteen na betaling, dus de klant moet expliciet
   * afstand doen van het herroepingsrecht voordat er afgerekend kan worden.
   */
  directeLevering?: boolean;
};

export const PRODUCTEN: Product[] = [
  {
    slug: "avg-fix",
    naam: "AVG-fix",
    prijsInclBtw: 84.69, // € 69,99 ex btw
    omschrijving: "Privacyverklaring en cookiebanner-instructies op maat, binnen enkele minuten per e-mail.",
    levering: "avg-documenten",
    directeLevering: true,
  },

  // Hosting — maandprijs ex btw × 12 maanden, jaarlijks gefactureerd
  {
    slug: "hosting-lite",
    naam: "Hosting Lite (1 jaar)",
    prijsInclBtw: 71.87, // € 4,95 p/mnd ex btw
    omschrijving: "Instappakket webhosting voor één jaar, inclusief SSL en e-mail.",
    levering: "handmatig",
  },
  {
    slug: "hosting-start-up",
    naam: "Hosting Start Up (1 jaar)",
    prijsInclBtw: 129.95, // € 8,95 p/mnd ex btw
    omschrijving: "Ons meest gekozen hostingpakket voor één jaar.",
    levering: "handmatig",
  },
  {
    slug: "hosting-basic",
    naam: "Hosting Basic (1 jaar)",
    prijsInclBtw: 217.07, // € 14,95 p/mnd ex btw
    omschrijving: "Ruim hostingpakket voor één jaar, voor drukkere websites.",
    levering: "handmatig",
  },

  // Domeinregistratie — jaarprijs ex btw
  { slug: "domein-nl", naam: "Domeinnaam .nl (1 jaar)", prijsInclBtw: 12.04, omschrijving: "Registratie van een .nl-domein voor één jaar.", levering: "handmatig" },
  { slug: "domein-com", naam: "Domeinnaam .com (1 jaar)", prijsInclBtw: 15.67, omschrijving: "Registratie van een .com-domein voor één jaar.", levering: "handmatig" },
  { slug: "domein-net", naam: "Domeinnaam .net (1 jaar)", prijsInclBtw: 16.88, omschrijving: "Registratie van een .net-domein voor één jaar.", levering: "handmatig" },
  { slug: "domein-eu", naam: "Domeinnaam .eu (1 jaar)", prijsInclBtw: 10.83, omschrijving: "Registratie van een .eu-domein voor één jaar.", levering: "handmatig" },
  { slug: "domein-org", naam: "Domeinnaam .org (1 jaar)", prijsInclBtw: 16.88, omschrijving: "Registratie van een .org-domein voor één jaar.", levering: "handmatig" },
  { slug: "domein-be", naam: "Domeinnaam .be (1 jaar)", prijsInclBtw: 12.04, omschrijving: "Registratie van een .be-domein voor één jaar.", levering: "handmatig" },

  {
    slug: "webshop-starter",
    naam: "Webshop Starter",
    prijsInclBtw: 361.79, // € 299 ex btw
    omschrijving: "Starterswebshop met productbeheer, betaalkoppeling en verzendopties.",
    levering: "handmatig",
  },
];

export function getProduct(slug: unknown): Product | null {
  if (typeof slug !== "string") return null;
  return PRODUCTEN.find((p) => p.slug === slug.trim()) ?? null;
}

/** Bedrag in hele centen, zoals MultiSafepay het wil. */
export function centen(product: Product): number {
  return Math.round(product.prijsInclBtw * 100);
}

/** Extensie die bij een domein-slug hoort, bijv. "domein-nl" → ".nl". */
export function domeinExtensieVan(slug: string): string | null {
  if (!slug.startsWith("domein-")) return null;
  return "." + slug.slice("domein-".length);
}

/** "€ 84,69" — voor knoppen en bevestigingsmails. */
export function formatEuro(bedrag: number): string {
  return "€ " + bedrag.toFixed(2).replace(".", ",");
}
