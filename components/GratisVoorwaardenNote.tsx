import Link from "next/link";

/**
 * Verplichte `*`-voetnoot bij elke vermelding van het gratis pakket.
 * Bevat het capaciteitsvoorbehoud + link naar de volledige voorwaarden.
 * `variant="dark"` voor gebruik op donkere achtergronden.
 */
export default function GratisVoorwaardenNote({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const base = variant === "dark" ? "text-white/70" : "text-neutral-mid/80";
  const link =
    variant === "dark"
      ? "text-blue-300 underline underline-offset-2 hover:text-white"
      : "text-primary hover:underline";

  return (
    <p className={`font-lato text-xs leading-relaxed ${base} ${className}`}>
      * Allesis behoudt zich het recht voor een gratis website te weigeren wanneer de capaciteit dit niet toelaat of de
      inhoud niet past binnen onze waarden.{" "}
      <Link href="/voorwaarden" className={`font-semibold ${link}`}>
        Lees de volledige voorwaarden →
      </Link>
    </p>
  );
}
