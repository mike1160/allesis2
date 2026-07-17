/**
 * SSF-bannetje — verschijnt op elke gratis website die Allesis bouwt.
 * Steunt Saved Souls Foundation (dierenopvang Khon Kaen, Thailand).
 * Gestyled in de Allesis-huisstijl met SSF-oranje accent (var --ssf-orange).
 */
export default function SSFBanner() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-[#3b1e0f] px-4 py-2 text-center text-xs text-amber-100">
      <span aria-hidden>🐾</span>
      <span>
        Deze website steunt{" "}
        <a
          href="https://www.savedsouls-foundation.org/nl"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline underline-offset-2 hover:text-white"
        >
          Saved Souls Foundation
        </a>{" "}
        — dierenopvang Thailand
      </span>
      <a
        href="https://www.savedsouls-foundation.org/nl/donate"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 rounded-full bg-ssf-orange px-3 py-1 text-xs font-bold text-white transition-colors hover:brightness-95"
      >
        Doneer →
      </a>
    </div>
  );
}
