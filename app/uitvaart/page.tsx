import SectorLayout from "@/components/branche/SectorLayout";
import { getSector, sectorMetadata } from "@/lib/sector-branches";

const sector = getSector("uitvaart");

export const metadata = sectorMetadata(sector);

export default function Page() {
  return <SectorLayout sector={sector} />;
}
