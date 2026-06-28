const DOMAIN_RE =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

export function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/:[0-9]+$/, "")
    .replace(/\.$/, "");
}

export function validateDomain(input: string): { ok: true; domain: string } | { ok: false; error: string } {
  const domain = normalizeDomain(input);

  if (!domain || domain.length < 3 || !domain.includes(".")) {
    return { ok: false, error: "Voer een geldige domeinnaam in, bijvoorbeeld uwbedrijf.nl." };
  }

  if (!DOMAIN_RE.test(domain)) {
    return { ok: false, error: "Dit domein ziet er ongeldig uit. Controleer spelling en extensie (.nl, .com, enz.)." };
  }

  if (domain === "localhost" || domain.endsWith(".local") || domain.endsWith(".internal")) {
    return { ok: false, error: "Alleen publieke domeinnamen kunnen worden gecontroleerd." };
  }

  return { ok: true, domain };
}

export function domainToUrl(domain: string): string {
  return `https://${domain}`;
}
