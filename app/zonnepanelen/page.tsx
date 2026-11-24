import SectorLayout from "@/components/branche/SectorLayout";
import { getSector, sectorMetadata } from "@/lib/sector-branches";

const sector = getSector("zonnepanelen");

export const metadata = sectorMetadata(sector);

export default function Page() {
  return <SectorLayout sector={sector} />;
}
