import BranchePageLayout from "@/components/branche/BranchePageLayout";
import { BRANCHES } from "@/lib/branche-data";

export const metadata = BRANCHES.bouw.metadata;

export default function BouwPage() {
  return <BranchePageLayout config={BRANCHES.bouw.config} />;
}
