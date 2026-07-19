import Link from "next/link";
import { createClient } from "@/lib/supabaseServer";
import AdminFormsTable from "@/components/AdminFormsTable";
import type { Agency, GovForm } from "@/lib/types";

export default async function AdminFormsPage() {
  const supabase = await createClient();
  const { data: forms } = await supabase
    .from("forms")
    .select("*, agency:agencies(*)")
    .order("last_updated", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl">Forms</h1>
        <Link
          href="/admin/forms/new"
          className="bg-green hover:bg-greendeep text-white text-sm font-semibold rounded-lg px-4 py-2.5"
        >
          + Upload form
        </Link>
      </div>
      <AdminFormsTable initialForms={(forms ?? []) as (GovForm & { agency: Agency })[]} />
    </div>
  );
}
