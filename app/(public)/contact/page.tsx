import Link from "next/link";
import { createClient } from "@/lib/supabaseServer";
import { getDictionary } from "@/lib/getLang";
import Breadcrumb from "@/components/Breadcrumb";
import type { Agency } from "@/lib/types";

export const metadata = { title: "Contact — GovHub Tanzania" };

export default async function ContactPage() {
  const supabase = await createClient();
  const { t } = await getDictionary();

  const { data: agencies } = await supabase.from("agencies").select("*").eq("status", "active").order("code");
  const agencyList = (agencies ?? []) as Agency[];

  return (
    <>
      <div className="bg-greentint border-b border-line py-6">
        <div className="max-w-[1140px] mx-auto px-6">
          <Breadcrumb items={[[t.breadcrumbHome, "/"], [t.breadcrumbContact, null]]} />
          <h1 className="font-display text-[26px] mt-2.5">{t.contactTitle}</h1>
          <p className="text-inksoft text-sm mt-1.5 max-w-[62ch]">{t.contactSubtitle}</p>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-6 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agencyList.map((a) => {
            const hasInfo = a.phone || a.email || a.address;
            return (
              <div key={a.id} className="bg-paper border border-line rounded-card p-5">
                <div className="flex items-center gap-3 mb-3.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white shrink-0"
                    style={{ background: a.accent_color }}
                  >
                    {a.code}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold leading-tight">{a.name}</div>
                    <Link href={`/agency/${a.code}`} className="text-xs font-semibold text-greendeep hover:underline">
                      {t.contactViewForms}
                    </Link>
                  </div>
                </div>

                {hasInfo ? (
                  <div className="flex flex-col gap-1.5 text-[13.5px] text-inksoft font-mono">
                    {a.phone && <span>☎ {a.phone}</span>}
                    {a.email && <span>✉ {a.email}</span>}
                    {a.address && <span>⚑ {a.address}</span>}
                  </div>
                ) : (
                  <p className="text-[13px] text-inksoft italic">{t.contactNoInfo}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
