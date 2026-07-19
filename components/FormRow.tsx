import Link from "next/link";
import type { GovForm } from "@/lib/types";

export default function FormRow({ form, agencyCode }: { form: GovForm; agencyCode: string }) {
  const recentlyUpdated =
    Date.now() - new Date(form.last_updated).getTime() < 1000 * 60 * 60 * 24 * 14; // 14 days

  return (
    <Link
      href={`/form/${form.slug}`}
      className="flex items-center gap-3.5 bg-paper border border-line rounded-xl px-4 py-3.5 hover:border-green transition-colors"
    >
      <span className="text-[10.5px] font-bold tracking-wide text-greendeep bg-greentint px-2 py-0.5 rounded shrink-0">
        {agencyCode}
      </span>
      <span className="text-[14.5px] font-semibold flex-1">
        {form.title}
        {recentlyUpdated && <span className="ml-2 text-[11px] font-mono text-rust">● updated</span>}
      </span>
      <span className="text-[11.5px] text-inksoft font-mono whitespace-nowrap">
        {form.fee === "Free" ? "Free" : "Fee applies"} · {form.processing_time}
      </span>
    </Link>
  );
}
