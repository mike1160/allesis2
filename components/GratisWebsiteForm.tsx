"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import FormConsentFields from "@/components/forms/FormConsentFields";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import PageHero from "@/components/PageHero";
import { PRIVACY_CONSENT_ERROR } from "@/lib/form-consent";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

const VERIFY_SERVER = "Verificatie mislukt. Probeer het opnieuw.";
const VERIFY_CLIENT = "Verificatie mislukt. Vernieuw de pagina en probeer opnieuw.";

const branches = [
  { value: "horeca", label: "🍽️ Horeca & restaurants" },
  { value: "beauty", label: "💆 Beauty & schoonheidssalons" },
  { value: "bouw", label: "🔨 Bouwbedrijven & vakmensen" },
  { value: "zorg", label: "🏥 Zorg & coaches" },
  { value: "zzp", label: "💼 ZZP'er & freelancer" },
  { value: "non-profit", label: "❤️ Non-profit & stichtingen" },
  { value: "webshop", label: "🛒 Webshop & e-commerce" },
  { value: "tandarts", label: "🦷 Tandarts / huisarts" },
  { value: "vastgoed", label: "🏠 Vastgoed & makelaars" },
  { value: "sport", label: "⚽ Sport & fitness" },
  { value: "advocaat", label: "⚖️ Advocaat / juridisch" },
  { value: "thai", label: "🇹🇭 Thaise ondernemer in NL" },
  { value: "anders", label: "🌐 Anders / nog niet zeker" },
];

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary";

export default function GratisWebsiteForm() {
  const searchParams = useSearchParams();
  const brancheParam = searchParams.get("branche") || "";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [nieuwsbrief, setNieuwsbrief] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [akkoordSsf, setAkkoordSsf] = useState(false);
  const [akkoordVoorwaarden, setAkkoordVoorwaarden] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    if (!akkoordSsf || !akkoordVoorwaarden) {
      setError("Vink beide akkoordverklaringen aan om door te gaan.");
      return;
    }
    if (!turnstileToken) return;

    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "gratis_website",
          turnstileToken,
          privacyAccepted: true,
          nieuwsbrief,
          naam: formData.get("naam"),
          email: formData.get("email"),
          bedrijf: formData.get("bedrijf"),
          branche: formData.get("branche"),
          domein: formData.get("domein"),
          beschrijving: formData.get("beschrijving"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setTurnstileToken(null);
        if (data.error === PRIVACY_CONSENT_ERROR) {
          setPrivacyError(true);
          setError("");
        } else {
          setError(data.error === VERIFY_SERVER ? VERIFY_CLIENT : data.error || "Er ging iets mis. Probeer het opnieuw.");
        }
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-24">
        <div className="max-w-md text-center">
          <div className="mb-6 text-6xl" aria-hidden>
            🐾
          </div>
          <h1 className="font-sora mb-4 text-3xl font-black text-neutral-dark">Aanvraag ontvangen!</h1>
          <p className="font-lato mb-6 leading-relaxed text-gray-500">
            Bedankt! U ontvangt direct een bevestiging per e-mail. We nemen binnen één werkdag contact op.
          </p>
          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-left">
            <Image
              src="/images/logo1024x1024.png"
              alt="Saved Souls Foundation"
              width={40}
              height={40}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority={false}
              className="h-10 w-10 flex-shrink-0 object-contain"
            />
            <p className="font-lato text-sm leading-relaxed text-green-800">
              Uw gratis website steunt <strong>Saved Souls Foundation</strong> — dierenopvang in Thailand. Bedankt dat u
              bijdraagt! 🐶🐱
            </p>
          </div>
          <Link href="/" className="font-lato mt-6 inline-block font-semibold text-primary hover:underline">
            ← Terug naar homepage
          </Link>
        </div>
      </div>
    );
  }

  const submitDisabled = loading || !turnstileToken;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        eyebrow="🐾 Gratis one-pager aanvragen"
        title="Gratis website."
        titleAccent="Voor een goed doel."
        description="Allesis bouwt uw one-pager gratis. Op uw site komt een donatie-link naar Saved Souls Foundation — dierenopvang in Thailand. Eerlijk en transparant."
        backgroundImage="https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg"
        accentColor="#3B6D11"
      >
        <div className="flex max-w-xl items-center gap-4 rounded-2xl border border-green-200 bg-green-50/95 p-5 text-left shadow-sm backdrop-blur-sm">
          <Image
            src="/images/logo1024x1024.png"
            alt="Saved Souls Foundation"
            width={64}
            height={64}
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority={false}
            className="h-16 w-16 flex-shrink-0 object-contain"
          />
          <div>
            <p className="mb-1 font-bold text-green-800">Saved Souls Foundation</p>
            <p className="font-lato text-sm leading-relaxed text-green-700">
              Wij redden honden en katten in Thailand — ook verlamde dieren die andere opvangen weigeren. 350+ honden, 98
              katten in zorg.
            </p>
            <a
              href="https://www.savedsouls-foundation.org/nl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-bold text-green-600 hover:underline"
            >
              Bezoek savedsouls-foundation.org →
            </a>
          </div>
        </div>
      </PageHero>

      {/* FORMULIER */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: "⚡", label: "Online binnen 24u**" },
              { icon: "📱", label: "Mobielvriendelijk" },
              { icon: "🔒", label: "AVG-compliant" },
              { icon: "✉️", label: "Contactformulier" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                <div className="mb-2 text-2xl" aria-hidden>
                  {item.icon}
                </div>
                <p className="font-lato text-xs font-bold text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="mb-3 font-bold text-amber-800">📋 Wat verschijnt er op uw gratis website?</h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 font-bold text-amber-500" aria-hidden>
                  🐾
                </span>
                Een donatie-link naar Saved Souls Foundation — als klein bannetje en in de footer
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 font-bold text-primary" aria-hidden>
                  A
                </span>
                Allesis-branding in de footer: &quot;Webdesign door Allesis.nl&quot;
              </li>
            </ul>
            <p className="mt-3 text-xs text-amber-600">
              Wilt u dit niet? Kies dan voor het{" "}
              <Link href="/contact" className="font-bold underline">
                Starter pakket (€299)
              </Link>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8">
            <h2 className="font-sora mb-6 text-xl font-black text-neutral-dark">Uw gegevens</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="gratis-naam" className="mb-1 block text-sm font-bold text-gray-700">
                  Voornaam *
                </label>
                <input id="gratis-naam" name="naam" required placeholder="Jan" className={inputClass} />
              </div>
              <div>
                <label htmlFor="gratis-email" className="mb-1 block text-sm font-bold text-gray-700">
                  E-mailadres *
                </label>
                <input
                  id="gratis-email"
                  name="email"
                  type="email"
                  required
                  placeholder="jan@uwbedrijf.nl"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="gratis-bedrijf" className="mb-1 block text-sm font-bold text-gray-700">
                Bedrijfsnaam *
              </label>
              <input id="gratis-bedrijf" name="bedrijf" required placeholder="Uw Bedrijf" className={inputClass} />
            </div>

            <div>
              <label htmlFor="gratis-branche" className="mb-1 block text-sm font-bold text-gray-700">
                Branche *
              </label>
              <select
                id="gratis-branche"
                name="branche"
                required
                defaultValue={brancheParam}
                className={inputClass}
              >
                <option value="">Kies uw branche...</option>
                {branches.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="gratis-domein" className="mb-1 block text-sm font-bold text-gray-700">
                Gewenste domeinnaam
              </label>
              <input
                id="gratis-domein"
                name="domein"
                placeholder="uwbedrijf.nl (optioneel, wij kunnen helpen)"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="gratis-beschrijving" className="mb-1 block text-sm font-bold text-gray-700">
                Korte omschrijving van uw bedrijf *
              </label>
              <textarea
                id="gratis-beschrijving"
                name="beschrijving"
                required
                rows={3}
                placeholder="Wat doet u? Voor wie? Wat moet er op de website?"
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={akkoordSsf}
                  onChange={(e) => setAkkoordSsf(e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 flex-shrink-0 accent-primary"
                />
                <span className="font-lato text-sm text-gray-600">
                  Ik ga akkoord dat op mijn gratis website een{" "}
                  <strong>donatie-link naar Saved Souls Foundation</strong> en Allesis-branding in de footer verschijnt.
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={akkoordVoorwaarden}
                  onChange={(e) => setAkkoordVoorwaarden(e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 flex-shrink-0 accent-primary"
                />
                <span className="font-lato text-sm text-gray-600">
                  Ik heb de{" "}
                  <Link href="/voorwaarden" target="_blank" className="font-bold text-primary hover:underline">
                    voorwaarden
                  </Link>{" "}
                  gelezen, inclusief het capaciteitsvoorbehoud.*
                </span>
              </label>
            </div>

            <FormConsentFields
              privacyAccepted={privacyAccepted}
              onPrivacyChange={(v) => {
                setPrivacyAccepted(v);
                if (v) setPrivacyError(false);
              }}
              nieuwsbrief={nieuwsbrief}
              onNieuwsbriefChange={setNieuwsbrief}
              showPrivacyError={privacyError}
            />

            <TurnstileWidget onToken={setTurnstileToken} onVerificationFailed={() => setError(VERIFY_CLIENT)} />

            {error ? (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitDisabled}
              className="w-full rounded-xl bg-primary py-4 text-base font-black text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {loading ? "Versturen..." : !turnstileToken ? "Bezig met verificatie..." : "🐾 Gratis website aanvragen →"}
            </button>

            <p className="text-center text-xs text-gray-400">
              ** Online binnen 24 uur bij tijdige aanlevering van content en logo.{" "}
              <Link href="/voorwaarden" className="text-primary hover:underline">
                Volledige voorwaarden →
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
