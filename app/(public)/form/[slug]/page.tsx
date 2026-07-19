import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getDictionary } from "@/lib/getLang";
import Breadcrumb from "@/components/Breadcrumb";
import StampBadge from "@/components/StampBadge";
import DownloadCard from "@/components/DownloadCard";
import type { Agency, GovForm } from "@/lib/types";

export default async function FormDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { lang, t } = await getDictionary();

  const { data: form } = await supabase
    .from("forms")
    .select("*, agency:agencies(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!form) notFound();

  const f = form as GovForm & { agency: Agency };

  const steps = [
    t.stepGather,
    t.stepDownload(f.title),
    t.stepSubmit(f.submission_office ?? t.relevantOffice),
    t.stepPay,
    t.stepTrack(f.processing_time ?? t.variesByOffice),
  ];

  return (
    <>
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="pt-4.5">
          <Breadcrumb items={[[t.breadcrumbHome, "/"], [f.agency.code, `/agency/${f.agency.code}`], [f.title, null]]} />
        </div>
        <div className="flex justify-between items-start gap-5 flex-wrap py-5">
          <div>
            <div className="text-[13px] font-semibold text-greendeep mb-1.5">{f.agency.name}</div>
            <h1 className="font-display text-[28px] max-w-[26ch]">{f.title}</h1>
          </div>
          <StampBadge color={f.agency.accent_color} label="✓" size={62} />
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-7 items-start pb-16">
        <div>
          <Panel title={t.description}><p>{f.description}</p></Panel>
          {f.purpose && <Panel title={t.purpose}><p>{f.purpose}</p></Panel>}
          {f.eligibility && <Panel title={t.eligibility}><p>{f.eligibility}</p></Panel>}
          {f.requirements?.length > 0 && (
            <Panel title={t.requirements}>
              <ul className="list-disc pl-4.5 space-y-1.5">
                {f.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Panel>
          )}
          <Panel title={t.howToApply}>
            <div>
              {steps.map((s, i) => (
                <div key={s} className={`flex gap-3 py-2.5 ${i > 0 ? "border-t border-dashed border-line" : ""}`}>
                  <div className="w-6 h-6 rounded-full bg-greentint text-greendeep font-mono text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div className="text-[14.5px]">{s}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <DownloadCard form={f} lang={lang} />
      </div>
    </>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-paper border border-line rounded-card px-6 py-5.5 mb-4">
      <h3 className="text-xs uppercase tracking-wide text-inksoft mb-3 font-semibold">{title}</h3>
      <div className="text-[14.5px] leading-relaxed">{children}</div>
    </div>
  );
}
