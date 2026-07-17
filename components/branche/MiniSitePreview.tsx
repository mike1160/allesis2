/**
 * Compacte "mini-website" preview die binnen een BrowserMockup past.
 * Mini-hero: Unsplash-foto + branchetint-overlay (geen effen kleur).
 */
export type MiniSiteTile = { icon: string; label: string };

export default function MiniSitePreview({
  foto,
  overlayClass,
  mutedClass,
  pillClass,
  kicker,
  heading,
  sub,
  primaryPill,
  secondaryPill,
  tiles,
}: {
  foto: string;
  /** Overlay over foto, bijv. bg-amber-900/75 */
  overlayClass: string;
  /** Gedempte tekst, bijv. text-amber-200/70 */
  mutedClass: string;
  /** Primaire pill, bijv. bg-amber-500 */
  pillClass: string;
  kicker: string;
  heading: string;
  sub: string;
  primaryPill: string;
  secondaryPill: string;
  tiles: MiniSiteTile[];
}) {
  return (
    <div>
      <div className="relative mb-3 overflow-hidden rounded-xl p-5">
        {/* Achtergrond foto */}
        <div
          className="absolute inset-0 rounded-xl bg-cover bg-center"
          style={{ backgroundImage: `url("${foto}")` }}
          aria-hidden
        />

        {/* Donkere overlay zodat tekst leesbaar blijft */}
        <div className={`absolute inset-0 rounded-xl ${overlayClass}`} aria-hidden />

        {/* Content */}
        <div className="relative z-10">
          <p className={`font-lato mb-2 text-xs font-bold uppercase tracking-wider ${mutedClass}`}>
            {kicker}
          </p>
          <h2 className="font-sora mb-1 text-xl font-black text-white">{heading}</h2>
          <p className={`font-lato mb-3 text-xs ${mutedClass.replace("/70", "/60")}`}>{sub}</p>
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1.5 text-xs font-black text-white ${pillClass}`}>
              {primaryPill} →
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
              {secondaryPill}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-lg border border-neutral-light bg-white p-3 text-center">
            <div className="text-lg" aria-hidden>
              {t.icon}
            </div>
            <div className="font-lato mt-1 text-[11px] font-bold text-neutral-dark">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#FED7AA] bg-[#FFF8F0] p-2">
        <span className="text-sm" aria-hidden>
          🐾
        </span>
        <span className="font-lato text-[11px] text-[#B45309]">Steunt Saved Souls Foundation</span>
      </div>
    </div>
  );
}
