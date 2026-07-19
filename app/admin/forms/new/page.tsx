import { createClient } from "@/lib/supabaseServer";
import AdminPageHeader from "@/components/AdminPageHeader";
import AdminFormEditor from "@/components/AdminFormEditor";
import type { Agency, Category } from "@/lib/types";

export default async function NewFormPage() {
  const supabase = await createClient();
  const [{ data: agencies }, { data: categories }] = await Promise.all([
    supabase.from("agencies").select("*").order("code"),
    supabase.from("categories").select("*").order("name"),
  ]);

  return (
    <div>
      <AdminPageHeader icon="📤" title="Upload a form" subtitle="Saved as a draft — publish it once you've checked it." />
      <AdminFormEditor agencies={(agencies ?? []) as Agency[]} categories={(categories ?? []) as Category[]} />
    </div>
  );
}
