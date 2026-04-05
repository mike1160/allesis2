import { Suspense } from "react";
import AvgCheckClient from "@/components/AvgCheckClient";

export const metadata = {
  title: "Gratis AVG-Check voor uw Website | Allesis",
  description:
    "Controleer in 30 seconden of uw website AVG-compliant is. Gratis rapport — geen registratie vereist.",
  alternates: { canonical: "https://allesis.nl/avg-check" },
};

function AvgCheckFallback() {
  return (
    <div className="font-lato flex min-h-screen items-center justify-center bg-[#0a0f1e] pt-24 text-white/80">
      Laden…
    </div>
  );
}

export default function AvgCheckPage() {
  return (
    <Suspense fallback={<AvgCheckFallback />}>
      <AvgCheckClient />
    </Suspense>
  );
}
