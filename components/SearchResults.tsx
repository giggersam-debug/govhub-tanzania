"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { dictionaries, type Lang } from "@/lib/i18n";
import FormRow from "@/components/FormRow";
import StampBadge from "@/components/StampBadge";
import type { Agency, Category, GovForm } from "@/lib/types";

export default function SearchResults({
  agencies,
  categories,
  initialQuery,
  initialCategory,
  lang,
}: {
  agencies: Agency[];
  categories: Category[];
  initialQuery: string;
  initialCategory: string | null;
  lang: Lang;
}) {
  const t = dictionaries[lang];
  const supabase = useMemo(() => createClient(), []);
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [agencyFilter, setAgencyFilter] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<(GovForm & { agency: Agency })[]>([]);
  const [loading, setLoading] = useState(true);

  const agencyByCode = useMemo(() => Object.fromEntries(agencies.map((a) => [a.code, a])), [agencies]);
  const activeCategoryObj = categories.find((c) => c.name === activeCategory);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function run() {
      let q = supabase.from("forms").select("*, agency:agencies(*)").eq("status", "published");

      if (query.trim()) {
        q = q.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }
      if (activeCategoryObj) {
        q = q.eq("category_id", activeCategoryObj.id);
      }
      if (agencyFilter.size > 0) {
        const ids = agencies.filter((a) => agencyFilter.has(a.code)).map((a) => a.id);
        q = q.in("agency_id", ids);
      }

      const { data } = await q.order("title");
      if (!cancelled) {
        setResults((data ?? []) as (GovForm & { agency: Agency })[]);
        setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [query, activeCategoryObj, agencyFilter, agencies, supabase]);

  function toggleAgency(code: string) {
    setAgencyFilter((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  }

  const resultsLabel = loading
    ? t.searching
    : `${results.length} ${results.length === 1 ? t.resultsWord : t.resultsWordPlural}${query ? ` ${t.forWord} “${query}”` : ""}`;

  return (
    <>
      <div className="max-w-[1140px] mx-auto px-6 pt-3.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(inputValue);
          }}
          className="flex gap-2 bg-paper border-[1.5px] border-line rounded-2xl shadow-md p-2 max-w-full"
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoComplete="off"
            className="flex-1 border-none outline-none text-[15.5px] px-3.5 py-3 bg-transparent"
          />
          <button type="submit" className="bg-green hover:bg-greendeep text-white rounded-xl px-6 font-semibold text-sm">
            {t.searchButton}
          </button>
        </form>
      </div>

      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-7 py-7 pb-16">
        <aside className="bg-paper border border-line rounded-card p-4 h-fit sticky top-[82px]">
          <h4 className="text-xs uppercase tracking-wide text-inksoft mb-2.5 font-semibold">{t.category}</h4>
          <FilterRadio label={t.allCategories} checked={!activeCategory} onChange={() => setActiveCategory(null)} />
          {categories.map((c) => (
            <FilterRadio
              key={c.id}
              label={c.name}
              checked={activeCategory === c.name}
              onChange={() => setActiveCategory(c.name)}
            />
          ))}

          <h4 className="text-xs uppercase tracking-wide text-inksoft mt-4.5 mb-2.5 font-semibold">{t.agency}</h4>
          {agencies.map((a) => (
            <label key={a.code} className="flex items-center gap-2 text-[13.5px] py-1">
              <input type="checkbox" checked={agencyFilter.has(a.code)} onChange={() => toggleAgency(a.code)} />
              {a.code}
            </label>
          ))}
        </aside>

        <div>
          <div className="text-[13.5px] text-inksoft mb-3.5">{resultsLabel}</div>
          <div className="flex flex-col gap-2.5">
            {!loading && results.length === 0 && (
              <div className="text-center py-14 px-5 text-inksoft">
                <div className="w-16 mx-auto mb-4">
                  <StampBadge color="#B94A1F" label="–" size={64} />
                </div>
                <div className="font-semibold mb-1.5">{t.noResultsTitle}</div>
                <div className="text-[13.5px]">{t.noResultsSubtitle}</div>
              </div>
            )}
            {results.map((f) => (
              <FormRow key={f.id} form={f} agencyCode={agencyByCode[f.agency?.code]?.code ?? f.agency.code} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function FilterRadio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-[13.5px] py-1">
      <input type="radio" name="catf" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
