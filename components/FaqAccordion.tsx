"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="bg-paper border border-line rounded-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
              aria-expanded={isOpen}
            >
              <span className="text-[14.5px] font-semibold">{item.q}</span>
              <span
                className={`text-greendeep text-lg leading-none shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4.5 text-[14px] text-inksoft leading-relaxed border-t border-line pt-3.5">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
