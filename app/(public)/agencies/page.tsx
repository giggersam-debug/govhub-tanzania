import { createClient } from "@/lib/supabaseServer";
import { getDictionary } from "@/lib/getLang";
import AgencyCard from "@/components/AgencyCard";
import Breadcrumb from "@/components/Breadcrumb";
import type { Agency } from "@/lib/types";

export const metadata = { title: "Agencies — GovHub Tanzania" };

export default async function AgenciesPage() {
  const supabase = await createClient();
  const { t } = await getDictionary();
  const [{ data: agencies }, { data: forms }] = await Promise.all([
    supabase.from("agencies").select("*").eq("status", "active").order("code"),
    supabase.from("forms").select("agency_id").eq("status", "published"),
  ]);

  const agencyList = (agencies ?? []) as Agency[];
  const countByAgency: Record<string, number> = {};
  (forms ?? []).forEach((f: { agency_id: string }) => {
    countByAgency[f.agency_id] = (countByAgency[f.agency_id] ?? 0) + 1;
  });

  return (
    <>
      <div className="bg-greentint border-b border-line py-6">
        <div className="max-w-[1140px] mx-auto px-6">
          <Breadcrumb items={[[t.breadcrumbHome, "/"], [t.breadcrumbAgencies, null]]} />
          <h1 className="font-display text-[26px] mt-2.5">{t.govAgenciesTitle}</h1>
          <p className="text-inksoft text-sm mt-1.5">
            {agencyList.length} {t.agenciesCountSuffix}
          </p>
        </div>
      </div>
      <div className="max-w-[1140px] mx-auto px-6 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {agencyList.map((a) => (
            <AgencyCard key={a.id} agency={a} formCount={countByAgency[a.id] ?? 0} />
          ))}
        </div>
      </div>
    </>
  );
}
