export default function CheckMarkList({ items }: { items: string[] }) {
  return (
    <ul className="font-lato mt-5 space-y-3.5 text-neutral-dark">
      {items.map((x) => (
        <li key={x} className="flex gap-3 leading-relaxed">
          <span className="font-sora shrink-0 font-bold text-primary" aria-hidden>
            ✓
          </span>
          <span className="text-neutral-mid">{x}</span>
        </li>
      ))}
    </ul>
  );
}
