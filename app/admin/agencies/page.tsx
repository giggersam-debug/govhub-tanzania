import { createClient } from "@/lib/supabaseServer";
import AdminPageHeader from "@/components/AdminPageHeader";
import AdminAgencyManager from "@/components/AdminAgencyManager";
import type { Agency } from "@/lib/types";

export default async function AdminAgenciesPage() {
  const supabase = await createClient();
  const { data: agencies } = await supabase.from("agencies").select("*").order("code");
  const agencyList = (agencies ?? []) as Agency[];

  return (
    <div>
      <AdminPageHeader icon="🏛️" title="Agencies" subtitle={`${agencyList.length} agencies on file`} />
      <AdminAgencyManager initialAgencies={agencyList} />
    </div>
  );
}
