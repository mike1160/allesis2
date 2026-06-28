import PremiumCard from "@/components/subpage/PremiumCard";
import type { FaqItem } from "@/lib/json-ld";

type Props = {
  items: FaqItem[];
  title?: string;
  id?: string;
  className?: string;
};

/**
 * Server-side FAQ-sectie — volledig in HTML zonder client-side hydratie.
 * Geschikt voor AI-crawlers en zoekmachines die geen JavaScript uitvoeren.
 */
export default function FaqSection({
  items,
  title = "Veelgestelde vragen",
  id = "faq",
  className = "border-t border-neutral-light bg-neutral-light/50 px-6 py-16 md:px-10 md:py-20",
}: Props) {
  return (
    <section id={id} className={className} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-3xl">
        <h2 id={`${id}-heading`} className="font-sora text-center text-2xl font-bold text-neutral-dark md:text-3xl">
          {title}
        </h2>
        <div className="mt-10 space-y-6">
          {items.map((item) => (
            <PremiumCard key={item.question} className="!p-6">
              <h3 className="font-sora text-lg font-bold text-neutral-dark">{item.question}</h3>
              <p className="font-lato mt-3 leading-relaxed text-neutral-mid">{item.answer}</p>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  );
}
