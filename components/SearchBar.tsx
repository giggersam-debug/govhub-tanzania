"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search${value ? `?q=${encodeURIComponent(value)}` : ""}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 bg-paper border-[1.5px] border-line rounded-2xl shadow-md p-2 max-w-[640px]">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for a form — TIN, Passport, Business License…"
        autoComplete="off"
        className="flex-1 border-none outline-none text-[15.5px] px-3.5 py-3 bg-transparent"
      />
      <button
        type="submit"
        className="bg-green hover:bg-greendeep text-white rounded-xl px-6 font-semibold text-sm"
      >
        Search
      </button>
    </form>
  );
}
