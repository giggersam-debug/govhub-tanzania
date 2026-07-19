import { createClient } from "@/lib/supabaseServer";
import AdminAgencyManager from "@/components/AdminAgencyManager";
import type { Agency } from "@/lib/types";

export default async function AdminAgenciesPage() {
  const supabase = await createClient();
  const { data: agencies } = await supabase.from("agencies").select("*").order("code");

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Agencies</h1>
      <AdminAgencyManager initialAgencies={(agencies ?? []) as Agency[]} />
    </div>
  );
}
