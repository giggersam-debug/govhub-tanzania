import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-green text-white shadow-[0_2px_10px_rgba(6,67,47,0.25)]">
      <div className="max-w-[1140px] mx-auto px-6 h-[66px] flex items-center gap-7">
        <Link href="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-white">
          <svg width="30" height="30" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" stroke="#F0B429" strokeWidth="2" strokeDasharray="2 3" fill="none" />
            <circle cx="20" cy="20" r="12.5" fill="#F0B429" />
            <text x="20" y="24.5" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fontWeight="700" fill="#06432F">
              GH
            </text>
          </svg>
          <span className="flex flex-col leading-tight">
            GovHub Tanzania
            <small className="font-body font-medium text-[10.5px] tracking-[0.14em] text-gold uppercase">
              Jamhuri ya Muungano
            </small>
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 flex-1">
          <Link href="/" className="text-sm font-medium text-white/85 hover:text-white border-b-2 border-transparent hover:border-gold py-1.5">
            Home
          </Link>
          <Link href="/agencies" className="text-sm font-medium text-white/85 hover:text-white border-b-2 border-transparent hover:border-gold py-1.5">
            Agencies
          </Link>
          <Link href="/search" className="text-sm font-medium text-white/85 hover:text-white border-b-2 border-transparent hover:border-gold py-1.5">
            All Forms
          </Link>
        </nav>

        <span className="text-xs font-semibold border border-white/35 rounded-full px-2.5 py-1.5 tracking-wide">
          EN · SW
        </span>
      </div>
    </header>
  );
}
