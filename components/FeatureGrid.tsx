import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image-placeholders";

export type FeatureGridItem = {
  icon: string;
  titel: string;
  beschrijving: string;
  foto: string;
};

export type FeatureGridProps = {
  titel: string;
  ondertitel?: string;
  features: FeatureGridItem[];
  /** bijv. `from-orange-900/90 via-orange-900/50` (to-transparent wordt toegevoegd) */
  gradient: string;
};

export default function FeatureGrid({
  titel,
  ondertitel = "Alles wat u nodig heeft — direct inbegrepen.",
  features,
  gradient,
}: FeatureGridProps) {
  const overlay = gradient.includes("to-") ? gradient : `${gradient} to-transparent`;

  return (
    <section className="bg-gray-50 px-6 py-20 md:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-sora mb-3 text-4xl font-black text-neutral-dark">{titel}</h2>
        <p className="font-lato mb-10 text-gray-500">{ondertitel}</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.titel} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={feature.foto}
                alt={feature.titel}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                priority={false}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${overlay}`} aria-hidden />
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                <span className="mb-2 text-2xl" aria-hidden>
                  {feature.icon}
                </span>
                <h3 className="font-sora mb-1 text-sm font-black text-white md:text-base">{feature.titel}</h3>
                <p className="font-lato text-xs leading-relaxed text-white/70 md:text-sm">{feature.beschrijving}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FeatureGrid };
