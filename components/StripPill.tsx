import type { StripItem } from "@/lib/strip-items";

export default function StripPill({ item }: { item: StripItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
    >
      {item.kind === "emoji" ? (
        <span className="text-sm leading-none" aria-hidden>
          {item.emoji}
        </span>
      ) : (
        <svg
          role="img"
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4 flex-shrink-0"
          style={{ fill: item.color }}
        >
          <path d={item.icon.path} />
        </svg>
      )}
      <span className="whitespace-nowrap text-xs font-bold text-gray-600">{item.naam}</span>
    </a>
  );
}
