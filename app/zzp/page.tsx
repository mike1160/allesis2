import BranchePageLayout from "@/components/branche/BranchePageLayout";
import { BRANCHES } from "@/lib/branche-data";

export const metadata = BRANCHES.zzp.metadata;

export default function ZzpPage() {
  return <BranchePageLayout config={BRANCHES.zzp.config} />;
}
