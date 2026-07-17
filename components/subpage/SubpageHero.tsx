import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";

export default function SubpageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  children,
  className = "",
  tint,
  orchidOpacity = 0.25,
  accentColor,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
  tint?: string;
  orchidOpacity?: number;
  accentColor?: string;
}) {
  const description = typeof subtitle === "string" ? subtitle : undefined;

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      titleAccent={titleAccent}
      description={description}
      tint={tint}
      orchidOpacity={orchidOpacity}
      accentColor={accentColor}
      className={`pt-28 md:pt-32 ${className}`}
    >
      {typeof subtitle !== "string" && subtitle ? (
        <div className="font-lato mb-8 max-w-xl text-lg leading-relaxed text-gray-500">{subtitle}</div>
      ) : null}
      {children}
    </PageHero>
  );
}
