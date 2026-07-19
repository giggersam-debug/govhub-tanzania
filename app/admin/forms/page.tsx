import Link from "next/link";
import { createClient } from "@/lib/supabaseServer";
import AdminPageHeader from "@/components/AdminPageHeader";
import AdminFormsTable from "@/components/AdminFormsTable";
import type { Agency, GovForm } from "@/lib/types";

export default async function AdminFormsPage() {
  const supabase = await createClient();
  const { data: forms } = await supabase
    .from("forms")
    .select("*, agency:agencies(*)")
    .order("last_updated", { ascending: false });

  const formList = (forms ?? []) as (GovForm & { agency: Agency })[];

  return (
    <div>
      <AdminPageHeader
        icon="📄"
        title="Forms"
        subtitle={`${formList.length} form${formList.length === 1 ? "" : "s"} on file`}
        action={
          <Link
            href="/admin/forms/new"
            className="bg-green hover:bg-greendeep text-white text-sm font-semibold rounded-lg px-4 py-2.5"
          >
            + Upload form
          </Link>
        }
      />
      <AdminFormsTable initialForms={formList} />
    </div>
  );
}
