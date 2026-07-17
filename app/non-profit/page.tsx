import BranchePageLayout from "@/components/branche/BranchePageLayout";
import { BRANCHES } from "@/lib/branche-data";

export const metadata = BRANCHES["non-profit"].metadata;

export default function NonProfitPage() {
  return <BranchePageLayout config={BRANCHES["non-profit"].config} />;
}
