"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BrancheCTA from "@/components/BrancheCTA";
import FormConsentFields from "@/components/forms/FormConsentFields";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import { PRIVACY_CONSENT_ERROR } from "@/lib/form-consent";
import {
  siWordpress,
  siWix,
  siShopify,
  siSquarespace,
  siWebflow,
  siJoomla,
} from "simple-icons";

const VERIFY_SERVER = "Verificatie mislukt. Probeer het opnieuw.";
const VERIFY_CLIENT = "Verificatie mislukt. Vernieuw de pagina en probeer opnieuw.";

type SimpleIcon = { path: string; title: string; slug: string };

const platforms: {
  value: string;
  label: string;
  icon: SimpleIcon | null;
  color: string;
  issues: string[];
}[] = [
  {
    value: "wordpress",
    label: "WordPress",
    icon: siWordpress,
    color: "#21759B",
    issues: ["Trage laadtijden", "Beveiligingsproblemen", "Plugin conflicten", "Dure hosting"],
  },
  {
    value: "wix",
    label: "Wix",
    icon: siWix,
    color: "#FAAD00",
    issues: ["Niet overdraagbaar", "Duur abonnement", "Beperkt maatwerk", "Trage laadtijden"],
  },
  {
    value: "shopify",
    label: "Shopify",
    icon: siShopify,
    color: "#96BF48",
    issues: ["Te duur (€29-299/mnd)", "Transactiekosten", "Lock-in", "Beperkte maatwerk"],
  },
  {
    value: "squarespace",
    label: "Squarespace",
    icon: siSquarespace,
    color: "#000000",
    issues: ["Duur abonnement", "Beperkt maatwerk", "Trage laadtijden"],
  },
  {
    value: "webflow",
    label: "Webflow",
    icon: siWebflow,
    color: "#4353FF",
    issues: ["Te technisch", "Dure hosting", "Moeilijk te beheren"],
  },
  {
    value: "joomla",
    label: "Joomla/Drupal",
    icon: siJoomla,
    color: "#F4A818",
    issues: ["Verouderd", "Geen support meer", "Beveiligingslekken"],
  },
  { value: "anders", label: "Anders", icon: null, color: "#6366F1", issues: [] },
];

const platformVragen: Record<string, { label: string; placeholder: string }[]> = {
  wordpress: [
    { label: "Hoeveel pagina's heeft uw site?", placeholder: "bijv. 10 pagina's" },
    { label: "Heeft u een backup beschikbaar?", placeholder: "Ja / Nee / Weet ik niet" },
    { label: "Welke plugins gebruikt u?", placeholder: "bijv. WooCommerce, Yoast SEO..." },
  ],
  wix: [
    { label: "Wat is uw huidige Wix URL?", placeholder: "bijv. mijnbedrijf.wixsite.com/..." },
    { label: "Hoeveel betaalt u nu per maand?", placeholder: "bijv. €17/mnd" },
    { label: "Hoeveel pagina's heeft uw site?", placeholder: "bijv. 5 pagina's" },
  ],
  shopify: [
    { label: "Hoeveel producten heeft uw webshop?", placeholder: "bijv. 50 producten" },
    { label: "Hoeveel betaalt u nu per maand?", placeholder: "bijv. €79/mnd" },
    { label: "Welke betaalmethoden gebruikt u?", placeholder: "bijv. iDEAL, creditcard" },
  ],
  squarespace: [
    { label: "Wat is uw huidige Squarespace URL?", placeholder: "bijv. mijnbedrijf.squarespace.com" },
    { label: "Hoeveel betaalt u nu per maand?", placeholder: "bijv. €23/mnd" },
  ],
  anders: [
    { label: "Welk platform gebruikt u?", placeholder: "bijv. Weebly, Jimdo..." },
    { label: "Wat is het probleem met uw huidige site?", placeholder: "Beschrijf uw situatie" },
  ],
};

const FROSTED_ICON_COLORS: Record<string, string> = {
  wordpress: "#21759B",
  wix: "#FAAD00",
  shopify: "#96BF48",
  squarespace: "#888888",
  webflow: "#4353FF",
  joomla: "#F4A818",
};

const FROSTED_LOGO_ROW_1 = [siWordpress, siWix, siShopify, siSquarespace, siWebflow, siJoomla];
const FROSTED_LOGO_ROW_2 = [siShopify, siWordpress, siJoomla, siWix, siSquarespace, siWebflow];

function FrostedLogo({ icon, dark = false }: { icon: SimpleIcon; dark?: boolean }) {
  const color = FROSTED_ICON_COLORS[icon.slug] ?? "#64748B";
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-28 w-28 shrink-0 md:h-36 md:w-36"
      style={{ fill: color, opacity: dark ? 0.5 : 0.55 }}
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
}

function FrostedPlatformLogos({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pb-16 md:gap-6 md:pb-20">
          <div className="flex w-full max-w-5xl justify-around px-2 md:px-4">
            {FROSTED_LOGO_ROW_1.map((icon) => (
              <FrostedLogo key={icon.slug} icon={icon} dark />
            ))}
          </div>
          <div className="flex w-full max-w-5xl translate-x-4 justify-around px-2 md:translate-x-8 md:px-4">
            {FROSTED_LOGO_ROW_2.map((icon) => (
              <FrostedLogo key={`${icon.slug}-row2`} icon={icon} dark />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute top-0 right-0 left-0 flex justify-around px-4">
        {FROSTED_LOGO_ROW_1.map((icon) => (
          <FrostedLogo key={icon.slug} icon={icon} />
        ))}
      </div>
      <div className="absolute top-28 right-0 left-8 flex justify-around px-4 md:top-32 md:left-16">
        {FROSTED_LOGO_ROW_2.map((icon) => (
          <FrostedLogo key={`${icon.slug}-row2`} icon={icon} />
        ))}
      </div>
      <div className="absolute inset-0 z-[1] bg-white/15 backdrop-blur-[1px]" />
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-neutral-dark focus:outline-none focus:ring-2 focus:ring-blue-500";

function PlatformIcon({ icon, color, size = 28 }: { icon: SimpleIcon | null; color: string; size?: number }) {
  if (!icon) {
    return <span className="text-2xl">🌐</span>;
  }
  return (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} style={{ fill: color }} aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}

const PLATFORM_ALIASES: Record<string, string> = {
  wordpress: "wordpress",
  wix: "wix",
  shopify: "shopify",
  squarespace: "squarespace",
  jimdo: "jimdo",
  weebly: "jimdo",
  "jimdo/weebly": "jimdo",
  webflow: "webflow",
  joomla: "joomla",
  drupal: "joomla",
  anders: "anders",
};

export default function MigratieAanvragenClient() {
  const searchParams = useSearchParams();
  const [platform, setPlatform] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [nieuwsbrief, setNieuwsbrief] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);

  useEffect(() => {
    const raw = searchParams.get("platform")?.trim().toLowerCase() ?? "";
    const mapped = PLATFORM_ALIASES[raw];
    if (mapped) setPlatform(mapped);
  }, [searchParams]);

  const gekozenPlatform = platforms.find((p) => p.value === platform);
  const extraVragen = platformVragen[platform] ?? platformVragen.anders;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    if (!turnstileToken) return;

    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const extraAntwoorden: Record<string, string> = {};

    extraVragen.forEach((vraag, i) => {
      const value = String(formData.get(`extra_${i}`) ?? "").trim();
      if (value) extraAntwoorden[vraag.label] = value;
    });

    const bericht = String(formData.get("bericht") ?? "").trim();
    const platformLabel = gekozenPlatform?.label ?? platform;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "migratie_aanvraag",
          turnstileToken,
          privacyAccepted: true,
          nieuwsbrief,
          naam: formData.get("naam"),
          email: formData.get("email"),
          bedrijf: formData.get("bedrijf"),
          platform,
          platformLabel,
          huidigeUrl: formData.get("huidigeUrl"),
          extraAntwoorden,
          bericht,
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
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mb-6 text-6xl">⚡</div>
          <h1 className="font-sora mb-4 text-3xl font-black">Migratie aanvraag ontvangen!</h1>
          <p className="font-lato mb-6 leading-relaxed text-gray-500">
            Wij nemen binnen één werkdag contact op met een vrijblijvende offerte voor uw migratie van{" "}
            {gekozenPlatform?.label ?? "uw huidige platform"}.
          </p>
          <Link href="/" className="font-bold text-blue-600 hover:underline">
            ← Terug naar homepage
          </Link>
        </div>
      </main>
    );
  }

  const platformParts = gekozenPlatform ?? null;

  return (
    <main>
      <section className="relative flex min-h-[500px] items-center overflow-hidden px-6 py-24 md:px-16">
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=70"
          alt="Code migratie"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/60" />

        <FrostedPlatformLogos dark />

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-400">⚡ Migratie service</p>
          <h1 className="font-sora mb-6 text-5xl font-black leading-tight text-white">
            Weg van uw huidige platform.
            <br />
            <span className="text-[#C8FF00]">Naar iets beters.</span>
          </h1>
          <p className="font-lato mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-200">
            WordPress, Wix, Shopify of iets anders — Allesis migreert uw website naar Next.js. Razendsnel, veilig en
            met behoud van al uw content en SEO-waarde.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { getal: "€299", label: "Vanaf", kleur: "text-[#C8FF00]" },
              { getal: "<3s", label: "Laadtijd", kleur: "text-green-400" },
              { getal: "95+", label: "PageSpeed", kleur: "text-blue-400" },
              { getal: "100%", label: "SEO behoud", kleur: "text-white" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl font-black ${stat.kleur}`}>{stat.getal}</div>
                <div className="mt-1 text-xs text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 md:px-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-sora mb-3 text-center text-3xl font-black">Van welk platform migreert u?</h2>
          <p className="mb-10 text-center text-gray-500">Kies uw huidige platform — wij regelen de rest</p>

          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {platforms.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPlatform(p.value)}
                className={`rounded-2xl border-2 p-4 text-left transition-all ${
                  platform === p.value
                    ? "scale-105 border-blue-600 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="mb-2">
                  <PlatformIcon icon={p.icon} color={p.color} />
                </div>
                <div className="text-sm font-bold text-gray-900">{p.label}</div>
                {p.issues.length > 0 && (
                  <p className="mt-2 text-xs font-semibold text-red-500">{p.issues[0]}</p>
                )}
              </button>
            ))}
          </div>

          {platform && (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-6">
                <PlatformIcon icon={platformParts?.icon ?? null} color={platformParts?.color ?? "#6366F1"} size={36} />
                <div>
                  <h3 className="text-xl font-black">Migratie van {platformParts?.label}</h3>
                  <p className="text-sm text-gray-500">Vul uw gegevens in voor een vrijblijvende offerte</p>
                </div>
              </div>

              {gekozenPlatform && gekozenPlatform.issues.length > 0 && (
                <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-red-600">
                    Herkent u deze problemen?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {gekozenPlatform.issues.map((issue) => (
                      <span
                        key={issue}
                        className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                      >
                        ❌ {issue}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs font-bold text-green-700">
                    ✅ Allesis lost dit allemaal op — behoud van content, SEO en domeinnaam
                  </p>
                </div>
              )}

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">Naam *</label>
                  <input name="naam" required placeholder="Jan de Vries" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">E-mailadres *</label>
                  <input name="email" type="email" required placeholder="jan@uwbedrijf.nl" className={inputClass} />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-bold text-gray-700">Bedrijfsnaam</label>
                <input name="bedrijf" placeholder="Uw Bedrijf" className={inputClass} />
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-bold text-gray-700">Huidige website URL *</label>
                <input name="huidigeUrl" required placeholder="https://uwhuidigesite.nl" className={inputClass} />
              </div>

              {extraVragen.map((vraag, i) => (
                <div key={vraag.label} className="mb-4">
                  <label className="mb-1 block text-sm font-bold text-gray-700">{vraag.label}</label>
                  <input name={`extra_${i}`} placeholder={vraag.placeholder} className={inputClass} />
                </div>
              ))}

              <div className="mb-6">
                <label className="mb-1 block text-sm font-bold text-gray-700">Aanvullende opmerkingen</label>
                <textarea
                  name="bericht"
                  rows={3}
                  placeholder="Wat wilt u nog laten weten?"
                  className={`${inputClass} resize-none`}
                />
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

              <div className="my-6">
                <TurnstileWidget onToken={setTurnstileToken} />
              </div>

              {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={loading || !turnstileToken}
                className="w-full rounded-xl bg-blue-600 py-4 text-base font-black text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
              >
                {loading
                  ? "Versturen..."
                  : `⚡ Migratie aanvragen van ${platformParts?.label ?? "platform"} →`}
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Vrijblijvende offerte binnen één werkdag ·
                <Link href="/voorwaarden" className="ml-1 text-blue-500 hover:underline">
                  Voorwaarden
                </Link>
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-sora mb-12 text-center text-3xl font-black">Wat kost u dat platform écht?</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold">Platform</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Maandkosten</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Jaarkosten</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Grootste probleem</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    platform: "🔵 WordPress",
                    mnd: "€20-100",
                    jaar: "€240-1200",
                    probleem: "Traag & onveilig",
                  },
                  {
                    platform: "🟡 Wix",
                    mnd: "€17-49",
                    jaar: "€204-588",
                    probleem: "Lock-in, niet van u",
                  },
                  {
                    platform: "🟢 Shopify",
                    mnd: "€29-299",
                    jaar: "€348-3588",
                    probleem: "Transactiekosten",
                  },
                  {
                    platform: "⬛ Squarespace",
                    mnd: "€16-49",
                    jaar: "€192-588",
                    probleem: "Beperkt maatwerk",
                  },
                  {
                    platform: "🔴 Jimdo/Weebly",
                    mnd: "€9-39",
                    jaar: "€108-468",
                    probleem: "Verouderd & traag",
                  },
                ].map((row, i) => (
                  <tr key={row.platform} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-sm font-bold">{row.platform}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-red-600">{row.mnd}</td>
                    <td className="px-6 py-4 text-sm font-bold text-red-600">{row.jaar}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.probleem}</td>
                  </tr>
                ))}
                <tr className="bg-blue-600 text-white">
                  <td className="px-6 py-4 font-black">⚡ Next.js via Allesis</td>
                  <td className="px-6 py-4 font-black">v.a. €8,95</td>
                  <td className="px-6 py-4 font-black">v.a. €107</td>
                  <td className="px-6 py-4 font-semibold">Geen problemen ✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-gray-400">
            * Hostingprijzen zijn afhankelijk van uw pakket. Maatwerk projecten worden apart geprijsd.
          </p>
          <p className="mt-6 text-center text-gray-600">
            Klaar met betalen?
            <Link href="/migratie-aanvragen" className="ml-1 font-bold text-blue-600 hover:underline">
              Migratie vanaf €299 eenmalig →
            </Link>
          </p>
        </div>
      </section>

      <BrancheCTA branche="migratie" />
    </main>
  );
}
