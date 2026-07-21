import Link from "next/link";
import { getDictionary } from "@/lib/getLang";

export default async function SiteFooter() {
  const { t } = await getDictionary();

  return (
    <footer className="bg-greendeep text-white/80 mt-10 pt-11 pb-8">
      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-display text-white text-sm mb-3">GovHub Tanzania</h4>
          <p className="text-[13px] leading-relaxed max-w-[38ch] text-white/70">{t.footerTagline}</p>
        </div>
        <FooterCol title={t.footerBrowse} links={[[t.footerAgencies, "/agencies"], [t.footerAllForms, "/search"]]} />
        <FooterCol title={t.footerAccount} links={[[t.footerSavedForms, "/login"], [t.footerDownloadHistory, "/login"]]} />
        <FooterCol title={t.footerSupport} links={[[t.footerHelpCentre, "/help"], [t.footerContact, "/contact"]]} />
      </div>
      <div className="max-w-[1140px] mx-auto px-6 mt-8 pt-5 border-t border-white/15 flex justify-between flex-wrap gap-2 text-xs text-white/55">
        <span>{t.footerCopyright}</span>
        <span className="font-mono">{t.footerPhase}</span>
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
