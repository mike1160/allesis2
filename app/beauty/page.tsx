import BranchePageLayout from "@/components/branche/BranchePageLayout";
import { BRANCHES } from "@/lib/branche-data";

export const metadata = BRANCHES.beauty.metadata;

export default function BeautyPage() {
  return <BranchePageLayout config={BRANCHES.beauty.config} />;
}
