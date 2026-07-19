import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import Breadcrumb from "@/components/Breadcrumb";
import FormRow from "@/components/FormRow";
import type { Agency, GovForm } from "@/lib/types";

export default async function AgencyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const supabase = await createClient();

  const { data: agency } = await supabase
    .from("agencies")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("status", "active")
    .maybeSingle();

  if (!agency) notFound();

  const { data: forms } = await supabase
    .from("forms")
    .select("*")
    .eq("agency_id", agency.id)
    .eq("status", "published")
    .order("title");

  const a = agency as Agency;
  const formList = (forms ?? []) as GovForm[];

  return (
    <>
      <div className="bg-paper border-b border-line py-8">
        <div className="max-w-[1140px] mx-auto px-6">
          <Breadcrumb items={[["Home", "/"], ["Agencies", "/agencies"], [a.code, null]]} />
          <div className="flex gap-4.5 items-center mt-4">
            <div
              className="w-[66px] h-[66px] rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white shrink-0"
              style={{ background: a.accent_color }}
            >
              {a.code}
            </div>
            <div>
              <h1 className="font-display text-[26px]">{a.name}</h1>
              <p className="text-inksoft text-sm mt-1 max-w-[60ch]">{a.description}</p>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap mt-4.5 text-[13px] text-inksoft font-mono">
            {a.phone && <span>☎ {a.phone}</span>}
            {a.email && <span>✉ {a.email}</span>}
            {a.address && <span>⚑ {a.address}</span>}
          </div>
        </div>
      </div>

      <section className="max-w-[1140px] mx-auto px-6 py-11">
        <h2 className="font-display text-2xl mb-5">Forms from {a.code}</h2>
        <div className="flex flex-col gap-2.5">
          {formList.length ? (
            formList.map((f) => <FormRow key={f.id} form={f} agencyCode={a.code} />)
          ) : (
            <p className="text-inksoft text-sm">No forms listed yet for this agency.</p>
          )}
        </div>
      </section>
    </>
  );
}
