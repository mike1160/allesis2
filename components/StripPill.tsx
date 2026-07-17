import type { StripItem } from "@/lib/strip-items";

type StripPillProps = {
  item: StripItem;
  linked?: boolean;
};

export default function StripPill({ item, linked = true }: StripPillProps) {
  const className =
    "flex flex-shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 transition-all";

  const content = (
    <>
      {item.kind === "emoji" ? (
        <span className="text-sm leading-none" aria-hidden>
          {item.emoji}
        </span>
      ) : (
        <svg
          role="img"
          aria-hidden
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 flex-shrink-0"
          style={{ fill: item.color }}
        >
          <path d={item.icon.path} />
        </svg>
      )}
      <span className="whitespace-nowrap text-xs font-bold text-gray-600">{item.naam}</span>
    </>
  );

  if (!linked) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hover:border-blue-300`}
    >
      {content}
    </a>
  );
}
