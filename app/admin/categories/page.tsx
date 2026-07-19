import { createClient } from "@/lib/supabaseServer";
import AdminPageHeader from "@/components/AdminPageHeader";
import AdminCategoryManager from "@/components/AdminCategoryManager";
import type { Category } from "@/lib/types";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("name");
  const categoryList = (categories ?? []) as Category[];

  return (
    <div>
      <AdminPageHeader icon="🗂️" title="Categories" subtitle={`${categoryList.length} categories on file`} />
      <AdminCategoryManager initialCategories={categoryList} />
    </div>
  );
}
