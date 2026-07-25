import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";

export default function SubpageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  children,
  className = "",
  accentColor = "#3B6D11",
  backgroundImage,
  imageSrc,
  imageLayout,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
  accentColor?: string;
  backgroundImage?: string;
  imageSrc?: string;
  imageLayout?: "side" | "cloud";
  compact?: boolean;
  /** @deprecated */
  tint?: string;
  /** @deprecated */
  orchidOpacity?: number;
}) {
  const description = typeof subtitle === "string" ? subtitle : undefined;

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      titleAccent={titleAccent}
      description={description}
      accentColor={accentColor}
      backgroundImage={backgroundImage}
      imageSrc={imageSrc}
      imageLayout={imageLayout}
      compact={compact}
      className={className}
    >
      {typeof subtitle !== "string" && subtitle ? (
        <div className="font-lato mb-8 max-w-xl text-lg leading-relaxed text-gray-500">{subtitle}</div>
      ) : null}
      {children}
    </PageHero>
  );
}
