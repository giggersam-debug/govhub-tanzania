"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { dictionaries, type Lang } from "@/lib/i18n";
import type { Agency, GovForm } from "@/lib/types";

export default function DownloadCard({ form, lang }: { form: GovForm & { agency: Agency }; lang: Lang }) {
  const t = dictionaries[lang];
  const supabase = createClient();
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const uid = data.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        supabase
          .from("favorites")
          .select("id")
          .eq("user_id", uid)
          .eq("form_id", form.id)
          .maybeSingle()
          .then(({ data }) => setSaved(!!data));
      }
    });
  }, [form.id, supabase]);

  function flash(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2200);
  }

  async function handleDownload() {
    await supabase.from("downloads").insert({ form_id: form.id, user_id: userId });
    flash(`${lang === "sw" ? "Upakuaji umeanza" : "Download started"} — ${form.title}.pdf`);
    if (form.file_url) window.open(form.file_url, "_blank");
  }

  async function handleSave() {
    if (!userId) {
      flash(lang === "sw" ? "Ingia ili kuhifadhi fomu kwenye vipendwa" : "Log in to save forms to your favourites");
      return;
    }
    if (saved) {
      await supabase.from("favorites").delete().eq("user_id", userId).eq("form_id", form.id);
      setSaved(false);
      flash(lang === "sw" ? "Imeondolewa kwenye fomu zilizohifadhiwa" : "Removed from saved forms");
    } else {
      await supabase.from("favorites").insert({ user_id: userId, form_id: form.id });
      setSaved(true);
      flash(lang === "sw" ? "Imehifadhiwa kwenye vipendwa vyako" : "Saved to your favourites");
    }
  }

  return (
    <div className="bg-paper border-[1.5px] border-green rounded-card p-5.5 sticky top-[82px]">
      <div className="flex items-center gap-2.5 bg-sage rounded-xl p-3 mb-3.5">
        <div className="w-[34px] h-[34px] rounded-lg bg-rust text-white flex items-center justify-center text-[10px] font-bold font-mono shrink-0">
          PDF
        </div>
        <div>
          <div className="text-[13px] font-semibold">{form.title.replace(/\s+/g, "_")}.pdf</div>
          <div className="text-[11px] text-inksoft font-mono">
            {form.version} · {new Date(form.last_updated).toLocaleDateString()}
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full bg-green hover:bg-greendeep text-white rounded-xl py-3 font-semibold text-[14.5px] mb-2 flex items-center justify-center gap-2"
      >
        ⬇ {t.downloadPdf}
      </button>
      <button className="w-full bg-paper border border-line hover:border-green rounded-xl py-2.5 font-semibold text-[13.5px] mb-2">
        {t.print}
      </button>
      <button
        onClick={handleSave}
        className="w-full bg-paper border border-line hover:border-green rounded-xl py-2.5 font-semibold text-[13.5px] mb-2"
      >
        {saved ? `♥ ${t.saved}` : `♡ ${t.saveToFavourites}`}
      </button>

      {message && <div className="text-xs text-center text-inksoft mt-1 mb-2">{message}</div>}

      <div className="grid grid-cols-2 gap-3.5 mt-4">
        <Fact label={t.processingTime} value={form.processing_time ?? "—"} />
        <Fact label={t.fee} value={form.fee ?? "—"} />
        <Fact label={t.reference} value={form.reference_code ?? "—"} mono />
        <Fact label={t.submission} value={form.submission_office ?? "—"} small />
      </div>

      <span
        className={`inline-block mt-2.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
          form.fee === "Free" ? "bg-greentint text-greendeep" : "bg-[#FBEFE3] text-golddeep"
        }`}
      >
        {form.fee === "Free" ? t.noFeeRequired : t.feeApplies}
      </span>
    </div>
  );
}

function Fact({ label, value, mono, small }: { label: string; value: string; mono?: boolean; small?: boolean }) {
  return (
    <div>
      <div className="text-[11.5px] uppercase tracking-wide text-inksoft">{label}</div>
      <div className={`font-semibold mt-0.5 ${mono ? "font-mono font-medium" : ""} ${small ? "text-[12.5px]" : "text-sm"}`}>
        {value}
      </div>
    </div>
  );
}
