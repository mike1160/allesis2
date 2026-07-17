/**
 * Herbruikbaar browser-frame voor mini website-previews op branchepagina's.
 * Donkere chrome + lichte body (tekst blijft leesbaar).
 */
export default function BrowserMockup({
  url,
  children,
  className = "",
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/10 ${className}`}>
      {/* Browser chrome — donker maar niet zwart */}
      <div className="flex h-10 items-center gap-2 bg-[#1E293B] px-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
        {/* URL-balk — lichtgrijs tekst op donker */}
        <div className="mx-3 flex h-5 flex-1 items-center rounded bg-[#334155] px-3">
          <span className="font-lato truncate text-xs text-[#94A3B8]">{url}</span>
        </div>
      </div>
      {/* Body — licht, donkere tekst */}
      <div className="bg-[#F8FAFC] p-4 text-[#0F172A]">{children}</div>
    </div>
  );
}
