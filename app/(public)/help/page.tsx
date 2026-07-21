import Link from "next/link";
import { getDictionary } from "@/lib/getLang";
import { faqData } from "@/lib/faq";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = { title: "Help Centre — GovHub Tanzania" };

export default async function HelpPage() {
  const { lang, t } = await getDictionary();
  const items = faqData[lang];

  return (
    <>
      <div className="bg-greentint border-b border-line py-6">
        <div className="max-w-[1140px] mx-auto px-6">
          <Breadcrumb items={[[t.breadcrumbHome, "/"], [t.breadcrumbHelp, null]]} />
          <h1 className="font-display text-[26px] mt-2.5">{t.helpTitle}</h1>
          <p className="text-inksoft text-sm mt-1.5">{t.helpSubtitle}</p>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-8 pb-10">
        <FaqAccordion items={items} />
      </div>

      <div className="max-w-[720px] mx-auto px-6 pb-16">
        <div className="bg-paper border border-dashed border-line rounded-card p-5 text-center">
          <div className="text-[15px] font-semibold mb-1">{t.helpStillNeed}</div>
          <p className="text-[13.5px] text-inksoft mb-3">{t.helpStillNeedBody}</p>
          <Link href="/contact" className="text-sm font-semibold text-greendeep hover:underline">
            {t.helpContactCta}
          </Link>
        </div>
      </div>
    </>
  );
}
