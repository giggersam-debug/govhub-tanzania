import Link from "next/link";
import { createClient } from "@/lib/supabaseServer";
import SearchBar from "@/components/SearchBar";
import AgencyCard from "@/components/AgencyCard";
import FormRow from "@/components/FormRow";
import type { Agency, Category, GovForm } from "@/lib/types";

const POPULAR_SEARCHES = ["Passport", "TIN Registration", "Birth Certificate", "Business License", "Land Transfer", "Visa"];

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: agencies }, { data: categories }, { data: recentForms }, { data: allPublished }] = await Promise.all([
    supabase.from("agencies").select("*").eq("status", "active").order("code").limit(8),
    supabase.from("categories").select("*"),
    supabase
      .from("forms")
      .select("*, agency:agencies(*)")
      .eq("status", "published")
      .order("last_updated", { ascending: false })
      .limit(6),
    supabase.from("forms").select("agency_id").eq("status", "published"),
  ]);

  const agencyList = (agencies ?? []) as Agency[];
  const categoryList = (categories ?? []) as Category[];
  const recent = (recentForms ?? []) as (GovForm & { agency: Agency })[];
  const formCount = allPublished?.length ?? 0;
  const countByAgency: Record<string, number> = {};
  (allPublished ?? []).forEach((f: { agency_id: string }) => {
    countByAgency[f.agency_id] = (countByAgency[f.agency_id] ?? 0) + 1;
  });

  return (
    <>
      <div className="bg-gradient-to-b from-greentint to-sage pt-16">
        <div className="max-w-[1140px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-greendeep bg-green/10 border border-green/25 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-golddeep" />
            Rasmi · Official Forms Portal
          </span>
          <h1 className="font-display font-semibold text-[44px] leading-[1.08] mt-5 mb-1.5 max-w-[15ch]">
            Every official form. One trusted place.
          </h1>
          <div className="font-display font-semibold text-greendeep text-lg mb-4">
            Kila fomu rasmi, sehemu moja.
          </div>
          <p className="text-inksoft text-[16.5px] max-w-[52ch] mb-7">
            Search, understand, and download the correct government form the first time — with clear
            requirements, fees, and where to submit it.
          </p>

          <SearchBar />

          <div className="flex flex-wrap gap-2.5 items-center mt-4 mb-11">
            <span className="text-xs text-inksoft mr-0.5">Popular:</span>
            {POPULAR_SEARCHES.map((p) => (
              <Link
                key={p}
                href={`/search?q=${encodeURIComponent(p)}`}
                className="text-[13px] font-medium px-3 py-1.5 rounded-full border border-line bg-paper hover:border-green hover:text-greendeep"
              >
                {p}
              </Link>
            ))}
          </div>
        </div>
        <div className="tear" />
        <div className="max-w-[1140px] mx-auto px-6 py-5 flex justify-between flex-wrap gap-2.5 font-mono text-[13px] text-inksoft">
          <span><b className="text-greendeep text-[15px]">{agencyList.length}</b> agencies covered</span>
          <span><b className="text-greendeep text-[15px]">{formCount ?? 0}+</b> official forms</span>
          <span>Sourced directly from official agency releases</span>
        </div>
      </div>

      <section className="max-w-[1140px] mx-auto px-6 py-11">
        <div className="flex items-baseline justify-between mb-5 flex-wrap gap-4">
          <h2 className="font-display text-2xl">Browse by agency</h2>
          <Link href="/agencies" className="text-[13.5px] font-semibold text-greendeep hover:underline">
            All agencies →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {agencyList.map((a) => (
            <AgencyCard key={a.id} agency={a} formCount={countByAgency[a.id] ?? 0} />
          ))}
        </div>
      </section>

      <section className="max-w-[1140px] mx-auto px-6 py-11">
        <h2 className="font-display text-2xl mb-5">Browse by category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categoryList.map((c) => (
            <Link
              key={c.id}
              href={`/search?cat=${encodeURIComponent(c.name)}`}
              className="text-center bg-paper border border-dashed border-line rounded-card px-3.5 py-4 hover:border-golddeep hover:bg-[#FFFBEF]"
            >
              <div className="text-[13.5px] font-semibold">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1140px] mx-auto px-6 py-11">
        <div className="flex items-baseline justify-between mb-5 flex-wrap gap-4">
          <h2 className="font-display text-2xl">Recently updated</h2>
          <Link href="/search" className="text-[13.5px] font-semibold text-greendeep hover:underline">
            View all →
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {recent.length ? (
            recent.map((f) => <FormRow key={f.id} form={f} agencyCode={f.agency.code} />)
          ) : (
            <p className="text-inksoft text-sm">
              No forms published yet — add some from the Admin Portal.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
