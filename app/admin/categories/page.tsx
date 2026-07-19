import { createClient } from "@/lib/supabaseServer";
import AdminCategoryManager from "@/components/AdminCategoryManager";
import type { Category } from "@/lib/types";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Categories</h1>
      <AdminCategoryManager initialCategories={(categories ?? []) as Category[]} />
    </div>
  );
}
