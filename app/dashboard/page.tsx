import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Mijn dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch klant data
  const { data: klant } = await supabase
    .from("klanten")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: pakketten } = await supabase
    .from("hosting_pakketten")
    .select("*")
    .eq("user_id", user.id);

  const { data: domeinen } = await supabase
    .from("domeinen")
    .select("*")
    .eq("user_id", user.id);

  return (
    <DashboardClient
      user={{ email: user.email!, naam: klant?.naam || user.user_metadata?.naam || "Klant" }}
      pakketten={pakketten || []}
      domeinen={domeinen || []}
    />
  );
}
export const dynamic = 'force-dynamic';
