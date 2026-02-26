import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminClient from "@/components/dashboard/AdminClient";

export const metadata = { title: "Admin Dashboard | Allesis" };

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Only allow admin email
  if (user.email !== process.env.ADMIN_EMAIL && user.email !== "info@allesis.nl") {
    redirect("/dashboard");
  }

  const { data: klanten } = await supabase
    .from("klanten")
    .select("*, hosting_pakketten(*), domeinen(*)");

  return <AdminClient klanten={klanten || []} />;
}
export const dynamic = 'force-dynamic';
