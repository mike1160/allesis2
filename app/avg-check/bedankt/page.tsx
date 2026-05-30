import { Suspense } from "react";
import BedanktClient from "./BedanktClient";

function BedanktFallback() {
  return (
    <div className="font-lato flex min-h-screen items-center justify-center bg-[#0a0f1e] pt-24 text-white/80">
      Laden…
    </div>
  );
}

export default function AvgCheckBedanktPage() {
  return (
    <Suspense fallback={<BedanktFallback />}>
      <BedanktClient />
    </Suspense>
  );
}
