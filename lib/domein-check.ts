/**
 * Beschikbaarheidscheck voor domeinnamen.
 *
 * Gedeeld door /api/domein-check (de checker op de site) en /api/checkout,
 * zodat de server bij het afrekenen nog een keer zelf controleert of de
 * gekozen naam echt vrij is.
 */

export const DOMEIN_EXTENSIES = [".nl", ".com", ".net", ".eu", ".org", ".be"] as const;

/** "Mijn Bedrijf.nl" → "mijnbedrijf" */
export function schoonDomeinNaam(waarde: string): string {
  let clean = waarde.toLowerCase().trim();
  for (const ext of DOMEIN_EXTENSIES) {
    if (clean.endsWith(ext)) clean = clean.slice(0, -ext.length);
  }
  return clean.replace(/[^a-z0-9-]/g, "");
}

/** true = vrij, false = bezet, null = niet vast te stellen. */
export async function domeinBeschikbaar(name: string, ext: string): Promise<boolean | null> {
  const domain = `${name}${ext}`;
  const apiKey = process.env.WHOISXML_API_KEY;

  try {
    // Methode 1: WHOIS XML API (als key beschikbaar)
    if (apiKey) {
      const res = await fetch(
        `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${apiKey}&domainName=${domain}&credits=DA`,
        { next: { revalidate: 300 } },
      );
      const data = await res.json();
      const beschikbaarheid = data.DomainInfo?.domainAvailability;
      if (beschikbaarheid === "AVAILABLE") return true;
      if (beschikbaarheid === "UNAVAILABLE") return false;
      return null;
    }

    // Methode 2: RDAP (gratis, officieel protocol van IANA)
    const rdapRes = await fetch(`https://rdap.org/domain/${domain}`, { next: { revalidate: 300 } });

    if (rdapRes.status === 404) return true; // bestaat niet in registry = vrij
    if (rdapRes.status === 200) return false; // bestaat = bezet
    return null;
  } catch {
    return null;
  }
}
