import { createClient } from "@/lib/supabaseServer";
import { getDictionary } from "@/lib/getLang";
import Breadcrumb from "@/components/Breadcrumb";
import SearchResults from "@/components/SearchResults";
import type { Agency, Category } from "@/lib/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { lang, t } = await getDictionary();
  const [{ data: agencies }, { data: categories }] = await Promise.all([
    supabase.from("agencies").select("*").eq("status", "active").order("code"),
    supabase.from("categories").select("*"),
  ]);

  return (
    <>
      <div className="bg-greentint border-b border-line py-5">
        <div className="max-w-[1140px] mx-auto px-6">
          <Breadcrumb items={[[t.breadcrumbHome, "/"], [t.breadcrumbSearch, null]]} />
        </div>
      </div>
      <SearchResults
        agencies={(agencies ?? []) as Agency[]}
        categories={(categories ?? []) as Category[]}
        initialQuery={params.q ?? ""}
        initialCategory={params.cat ?? null}
        lang={lang}
      />
    </>
  );
}
