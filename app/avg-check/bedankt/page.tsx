import { Suspense } from "react";
import BedanktClient from "./BedanktClient";

function BedanktFallback() {
  return (
    <div className="font-lato flex min-h-screen items-center justify-center bg-gray-50 pt-24 text-gray-500">
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
