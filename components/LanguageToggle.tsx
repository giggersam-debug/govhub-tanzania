"use client";

import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n";

export default function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();

  function toggle() {
    const next: Lang = lang === "en" ? "sw" : "en";
    document.cookie = `lang=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="text-xs font-semibold text-white border border-white/35 rounded-full px-2.5 py-1.5 tracking-wide hover:bg-white/10"
    >
      <span className={lang === "en" ? "opacity-100" : "opacity-50"}>EN</span>
      <span className="opacity-50"> · </span>
      <span className={lang === "sw" ? "opacity-100" : "opacity-50"}>SW</span>
    </button>
  );
}
