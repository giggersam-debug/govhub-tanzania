import { createClient } from "@/lib/supabaseServer";
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
      <h1 className="font-display text-2xl mb-6">Upload a form</h1>
      <AdminFormEditor agencies={(agencies ?? []) as Agency[]} categories={(categories ?? []) as Category[]} />
    </div>
  );
}
