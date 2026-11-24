/**
 * Hostingpakketten. Opzet met "decoy pricing": Basis mist e-mail en is maar €2,50 goedkoper,
 * Pro is fors duurder. Daardoor voelt Zorgeloos (€20) als de logische, voordelige keuze.
 */
export type HostingPakket = {
  id: "basis" | "zorgeloos" | "pro";
  naam: string;
  prijs: number;
  /** Weergaveprijs, bv. "17,50". */
  prijsTekst: string;
  tagline: string;
  /** Label voor het bestelformulier. */
  formLabel: string;
  aanbevolen?: boolean;
  kenmerken: { tekst: string; inbegrepen: boolean }[];
};

export const HOSTING_PAKKETTEN: HostingPakket[] = [
  {
    id: "basis",
    naam: "Basis",
    prijs: 17.5,
    prijsTekst: "17,50",
    tagline: "Alleen uw website online.",
    formLabel: "Basis (€17,50 p/m ex btw)",
    kenmerken: [
      { tekst: "Snelle websitehosting", inbegrepen: true },
      { tekst: "SSL-certificaat", inbegrepen: true },
      { tekst: "Wekelijkse back-ups", inbegrepen: true },
      { tekst: "Support per e-mail (binnen 2 werkdagen)", inbegrepen: true },
      { tekst: "Zakelijke e-mail op eigen domein", inbegrepen: false },
      { tekst: "Dagelijkse back-ups", inbegrepen: false },
      { tekst: "Persoonlijke helpdesk", inbegrepen: false },
    ],
  },
  {
    id: "zorgeloos",
    naam: "Zorgeloos",
    prijs: 20,
    prijsTekst: "20",
    tagline: "Website én e-mail. Alles geregeld.",
    formLabel: "Zorgeloos (€20 p/m ex btw)",
    aanbevolen: true,
    kenmerken: [
      { tekst: "Snelle websitehosting", inbegrepen: true },
      { tekst: "SSL-certificaat", inbegrepen: true },
      { tekst: "Aparte mailhosting op eigen domein", inbegrepen: true },
      { tekst: "SPF, DKIM & DMARC ingesteld", inbegrepen: true },
      { tekst: "Dagelijkse back-ups", inbegrepen: true },
      { tekst: "Beveiliging & updates", inbegrepen: true },
      { tekst: "Persoonlijke helpdesk", inbegrepen: true },
    ],
  },
  {
    id: "pro",
    naam: "Pro",
    prijs: 35,
    prijsTekst: "35",
    tagline: "Voor wie online écht draait.",
    formLabel: "Pro (€35 p/m ex btw)",
    kenmerken: [
      { tekst: "Alles uit Zorgeloos", inbegrepen: true },
      { tekst: "Extra mailboxen & meer opslag", inbegrepen: true },
      { tekst: "Voorrang: reactie dezelfde werkdag", inbegrepen: true },
      { tekst: "1 uur kleine wijzigingen per maand", inbegrepen: true },
      { tekst: "24/7 uptime-bewaking", inbegrepen: true },
      { tekst: "Maandrapport bezoekers & snelheid", inbegrepen: true },
    ],
  },
];

export const HOSTING_FORM_LABELS = HOSTING_PAKKETTEN.map((p) => p.formLabel);
export const HOSTING_STANDAARD = HOSTING_PAKKETTEN.find((p) => p.aanbevolen)!;

/** Zoekt een pakket op id of (deel van) de naam, bv. ?pakket=pro of ?pakket=Zorgeloos. */
export function vindHostingPakket(q: string | null | undefined) {
  if (!q) return undefined;
  const s = q.trim().toLowerCase();
  return HOSTING_PAKKETTEN.find((p) => p.id === s || s.startsWith(p.naam.toLowerCase()) || p.formLabel.toLowerCase() === s);
}
