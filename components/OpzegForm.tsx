"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import TurnstileWidget from "@/components/forms/TurnstileWidget";

export const OPZEG_DIENSTEN = [
  "Hosting (website + e-mail)",
  "Alleen e-mailhosting",
  "Domeinnaam",
  "Allesis Geboekt",
  "Website-onderhoud / SEO",
  "Anders",
] as const;

const EINDE_OPTIES = ["Per einde van de lopende contractperiode", "Zo snel mogelijk", "Op een specifieke datum"] as const;

const DOMEIN_OPTIES = [
  "Ik wil mijn domein verhuizen (stuur mij de verhuiscode)",
  "Domein mag worden opgeheven",
  "Niet van toepassing",
] as const;

const VERIFY_SERVER = "Verificatie mislukt. Probeer het opnieuw.";
const VERIFY_CLIENT = "Verificatie mislukt. Vernieuw de pagina en probeer opnieuw.";

const input =
  "font-lato w-full rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-[15px] text-neutral-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
const label = "font-lato mb-1.5 block text-[13px] font-bold text-gray-700";

export default function OpzegForm() {
  const sp = useSearchParams();
  const startDienst = sp.get("dienst") ?? "";
  const [form, setForm] = useState({
    naam: "",
    email: sp.get("email") ?? "",
    bedrijf: "",
    dienst: (OPZEG_DIENSTEN as readonly string[]).includes(startDienst) ? startDienst : OPZEG_DIENSTEN[0],
    domein: sp.get("domein") ?? "",
    einde: EINDE_OPTIES[0] as string,
    datum: "",
    domeinWens: DOMEIN_OPTIES[0] as string,
    reden: "",
  });
  const [bevestigd, setBevestigd] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [klaar, setKlaar] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    if (!bevestigd || !privacy) {
      setError("Vink beide vakjes aan om uw opzegging te versturen.");
      return;
    }
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const ingangsdatum =
        form.einde === "Op een specifieke datum" && form.datum
          ? `Op ${new Date(form.datum).toLocaleDateString("nl-NL")}`
          : form.einde;
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "opzegging",
          turnstileToken: token,
          privacyAccepted: true,
          naam: form.naam,
          email: form.email,
          bedrijf: form.bedrijf,
          dienst: form.dienst,
          domein: form.domein,
          ingangsdatum,
          domeinWens: form.domeinWens,
          reden: form.reden,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToken(null);
        setError(data.error === VERIFY_SERVER ? VERIFY_CLIENT : data.error || "Er ging iets mis. Probeer het opnieuw.");
        return;
      }
      setKlaar(true);
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw of mail naar info@allesis.nl.");
    } finally {
      setLoading(false);
    }
  }

  if (klaar) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center" role="status">
        <p className="text-4xl" aria-hidden>
          ✅
        </p>
        <h2 className="font-sora mt-3 text-xl font-bold text-neutral-dark">Uw opzegging is ontvangen</h2>
        <p className="font-lato mx-auto mt-2 max-w-md text-gray-600">
          U ontvangt direct een ontvangstbevestiging per e-mail. Binnen één werkdag bevestigen wij de definitieve einddatum
          {form.domeinWens.startsWith("Ik wil") ? " en sturen wij de verhuiscode van uw domein" : ""}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={verstuur} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="o-naam">
            Naam *
          </label>
          <input id="o-naam" required className={input} value={form.naam} onChange={set("naam")} autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="o-email">
            E-mailadres *
          </label>
          <input id="o-email" type="email" required className={input} value={form.email} onChange={set("email")} autoComplete="email" />
          <p className="font-lato mt-1 text-xs text-gray-500">Graag het adres dat bij ons bekend is.</p>
        </div>
        <div>
          <label className={label} htmlFor="o-bedrijf">
            Bedrijfsnaam
          </label>
          <input id="o-bedrijf" className={input} value={form.bedrijf} onChange={set("bedrijf")} autoComplete="organization" />
        </div>
        <div>
          <label className={label} htmlFor="o-domein">
            Domeinnaam / website *
          </label>
          <input id="o-domein" required placeholder="bijv. uwbedrijf.nl" className={input} value={form.domein} onChange={set("domein")} />
        </div>
        <div>
          <label className={label} htmlFor="o-dienst">
            Welke dienst wilt u opzeggen? *
          </label>
          <select id="o-dienst" className={input} value={form.dienst} onChange={set("dienst")}>
            {OPZEG_DIENSTEN.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="o-einde">
            Per wanneer? *
          </label>
          <select id="o-einde" className={input} value={form.einde} onChange={set("einde")}>
            {EINDE_OPTIES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          {form.einde === "Op een specifieke datum" && (
            <input type="date" required aria-label="Gewenste einddatum" className={`${input} mt-2`} value={form.datum} onChange={set("datum")} />
          )}
        </div>
      </div>

      <fieldset>
        <legend className={label}>Wat moet er met uw domeinnaam gebeuren? *</legend>
        <div className="space-y-2">
          {DOMEIN_OPTIES.map((d) => (
            <label key={d} className="font-lato flex cursor-pointer items-start gap-2.5 text-[15px] text-gray-700">
              <input
                type="radio"
                name="domeinWens"
                value={d}
                checked={form.domeinWens === d}
                onChange={set("domeinWens")}
                className="mt-1 h-4 w-4 accent-[#3B6D11]"
              />
              {d}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={label} htmlFor="o-reden">
          Mogen we vragen waarom? (optioneel)
        </label>
        <textarea
          id="o-reden"
          rows={3}
          className={`${input} resize-y`}
          value={form.reden}
          onChange={set("reden")}
          placeholder="Uw feedback helpt ons beter te worden."
        />
      </div>

      <div className="space-y-3 rounded-xl bg-neutral-light p-4">
        <label className="font-lato flex cursor-pointer items-start gap-2.5 text-sm text-gray-700">
          <input type="checkbox" checked={bevestigd} onChange={(e) => setBevestigd(e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#3B6D11]" />
          Ik wil bovenstaande dienst opzeggen en begrijp dat de website en/of e-mail na de einddatum niet meer bereikbaar zijn.
        </label>
        <label className="font-lato flex cursor-pointer items-start gap-2.5 text-sm text-gray-700">
          <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[#3B6D11]" />
          <span>
            Ik ga akkoord met de verwerking van mijn gegevens volgens de{" "}
            <Link href="/privacy" className="font-semibold text-primary underline-offset-2 hover:underline">
              privacyverklaring
            </Link>
            .
          </span>
        </label>
      </div>

      {error && (
        <p className="font-lato rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <TurnstileWidget onToken={setToken} onVerificationFailed={() => setError(VERIFY_CLIENT)} />

      <button
        type="submit"
        disabled={loading || !token}
        className="font-lato min-h-[52px] w-full rounded-xl bg-neutral-dark px-6 font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Verzenden…" : !token ? "Bezig met verificatie…" : "Opzegging versturen"}
      </button>
    </form>
  );
}
