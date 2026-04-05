export const PRIVACY_CONSENT_ERROR = "U dient akkoord te gaan met de privacyverklaring";

export function parsePrivacyAccepted(value: unknown): boolean {
  return value === true || value === "true";
}

export function parseNieuwsbrief(value: unknown): boolean {
  return value === true || value === "true";
}
