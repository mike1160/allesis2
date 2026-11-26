/**
 * Cloudflare Turnstile siteverify — gebruikt application/x-www-form-urlencoded (officiële API).
 * Logt bij een mislukte controle de foutcodes van Cloudflare (zonder token of geheim), zodat in de
 * Vercel-logs te zien is waarom: bijv. `invalid-input-secret` = verkeerde of ontbrekende geheime sleutel,
 * `invalid-input-response` = ongeldig/verlopen token, `timeout-or-duplicate` = token al gebruikt.
 */
const ALLOWED_HOSTS = ["allesis.nl", "www.allesis.nl", "localhost"];

export async function validateTurnstile(token: string, remoteip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY ontbreekt — siteverify wordt niet aangeroepen");
    return false;
  }
  if (!token?.trim()) return false;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token.trim());
  if (remoteip) {
    body.set("remoteip", remoteip);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await response.json()) as { success?: boolean; hostname?: string; "error-codes"?: string[] };
    if (data.success !== true) {
      console.warn("[turnstile] controle mislukt:", JSON.stringify({ errors: data["error-codes"] ?? [], hostname: data.hostname ?? null }));
      return false;
    }
    // Een token van een andere site (zelfde widget, ander domein) niet accepteren.
    if (data.hostname && !ALLOWED_HOSTS.includes(data.hostname) && !data.hostname.endsWith(".vercel.app")) {
      console.warn("[turnstile] token van onbekende host:", data.hostname);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[turnstile] siteverify niet bereikbaar:", e instanceof Error ? e.message : e);
    return false;
  }
}

export function getClientIp(request: Request): string | undefined {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim();
  return undefined;
}
