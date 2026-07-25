import ExtraBrancheLayout from "@/components/branche/ExtraBrancheLayout";
import { EXTRA_BRANCHES } from "@/lib/extra-branches";

const data = EXTRA_BRANCHES.bouwmarkt;

export const metadata = data.metadata;

export default function Page() {
  return <ExtraBrancheLayout data={data} />;
}
