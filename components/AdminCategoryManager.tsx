"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { Category } from "@/lib/types";

export default function AdminCategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const supabase = createClient();
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    const { data, error } = await supabase.from("categories").insert({ name: name.trim() }).select().single();
    setSaving(false);
    if (!error && data) {
      setCategories((prev) => [...prev, data as Category].sort((a, b) => a.name.localeCompare(b.name)));
      setName("");
    }
  }

  async function removeCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    await supabase.from("categories").delete().eq("id", id);
  }

  return (
    <div className="space-y-5">
      <form onSubmit={addCategory} className="flex gap-2.5 max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1 border border-line rounded-lg px-3 py-2.5 text-sm"
        />
        <button disabled={saving} type="submit" className="bg-green hover:bg-greendeep text-white text-sm font-semibold rounded-lg px-4 py-2.5">
          Add
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
        {categories.map((c) => (
          <div key={c.id} className="bg-paper border border-line rounded-card px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold">{c.name}</span>
            <button onClick={() => removeCategory(c.id)} className="text-xs text-rust hover:underline">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
