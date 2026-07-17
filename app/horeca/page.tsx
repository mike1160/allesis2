import BranchePageLayout from "@/components/branche/BranchePageLayout";
import { BRANCHES } from "@/lib/branche-data";

export const metadata = BRANCHES.horeca.metadata;

export default function HorecaPage() {
  return <BranchePageLayout config={BRANCHES.horeca.config} />;
}
