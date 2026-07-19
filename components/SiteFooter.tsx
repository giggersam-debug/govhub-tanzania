import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-greendeep text-white/80 mt-10 pt-11 pb-8">
      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-display text-white text-sm mb-3">GovHub Tanzania</h4>
          <p className="text-[13px] leading-relaxed max-w-[38ch] text-white/70">
            An independent directory of official Tanzanian government forms — built to save citizens and
            businesses a trip to the counter. Not a government agency.
          </p>
        </div>
        <FooterCol title="Browse" links={[["Agencies", "/agencies"], ["All forms", "/search"]]} />
        <FooterCol title="Account" links={[["Saved forms", "/login"], ["Download history", "/login"]]} />
        <FooterCol title="Support" links={[["Help centre", "/"], ["Contact", "/"]]} />
      </div>
      <div className="max-w-[1140px] mx-auto px-6 mt-8 pt-5 border-t border-white/15 flex justify-between flex-wrap gap-2 text-xs text-white/55">
        <span>© 2026 GovHub Tanzania</span>
        <span className="font-mono">Phase 1 · Forms Repository MVP</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-white text-sm mb-3">{title}</h4>
      {links.map(([label, href]) => (
        <Link key={label} href={href} className="block text-[13px] text-white/70 hover:text-white mb-2">
          {label}
        </Link>
      ))}
    </div>
  );
}
