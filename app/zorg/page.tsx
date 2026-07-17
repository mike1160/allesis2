import BranchePageLayout from "@/components/branche/BranchePageLayout";
import { BRANCHES } from "@/lib/branche-data";

export const metadata = BRANCHES.zorg.metadata;

export default function ZorgPage() {
  return <BranchePageLayout config={BRANCHES.zorg.config} />;
}
