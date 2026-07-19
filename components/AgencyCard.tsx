import Link from "next/link";
import type { Agency } from "@/lib/types";

export default function AgencyCard({ agency, formCount }: { agency: Agency; formCount: number }) {
  return (
    <Link
      href={`/agency/${agency.code}`}
      className="flex items-center gap-3 bg-paper border border-line rounded-card p-4 hover:border-green hover:-translate-y-0.5 hover:shadow-md transition-all"
    >
      <div
        className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center font-display font-bold text-[13.5px] text-white shrink-0"
        style={{ background: agency.accent_color }}
      >
        {agency.code}
      </div>
      <div>
        <div className="text-sm font-semibold leading-tight">{agency.code}</div>
        <div className="text-xs text-inksoft font-mono">
          {formCount} form{formCount === 1 ? "" : "s"}
        </div>
      </div>
    </Link>
  );
}
