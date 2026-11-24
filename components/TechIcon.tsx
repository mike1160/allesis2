import type { Tech } from "@/lib/technologie";

export default function TechIcon({ tech, className = "h-3 w-3" }: { tech: Tech; className?: string }) {
  if (tech.icon) {
    return (
      <svg viewBox="0 0 24 24" className={`${className} flex-shrink-0`} style={{ fill: tech.kleur }} aria-hidden>
        <path d={tech.icon.path} />
      </svg>
    );
  }
  return (
    <span className="leading-none" aria-hidden>
      {tech.emoji}
    </span>
  );
}
