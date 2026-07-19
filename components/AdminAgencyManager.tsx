"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { Agency } from "@/lib/types";

export default function AdminAgencyManager({ initialAgencies }: { initialAgencies: Agency[] }) {
  const supabase = createClient();
  const [agencies, setAgencies] = useState(initialAgencies);
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0B6E4F");
  const [saving, setSaving] = useState(false);

  async function toggleStatus(a: Agency) {
    const status = a.status === "active" ? "inactive" : "active";
    setAgencies((prev) => prev.map((x) => (x.id === a.id ? { ...x, status } : x)));
    await supabase.from("agencies").update({ status }).eq("id", a.id);
  }

  async function addAgency(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data, error } = await supabase
      .from("agencies")
      .insert({ code: code.toUpperCase(), name, accent_color: color, status: "active" })
      .select()
      .single();
    setSaving(false);
    if (!error && data) {
      setAgencies((prev) => [...prev, data as Agency].sort((a, b) => a.code.localeCompare(b.code)));
      setCode("");
      setName("");
      setShowForm(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-green hover:bg-greendeep text-white text-sm font-semibold rounded-lg px-4 py-2.5"
        >
          {showForm ? "Cancel" : "+ Add agency"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addAgency} className="bg-paper border border-line rounded-card p-5 flex gap-3 flex-wrap items-end">
          <label className="text-xs font-semibold text-inksoft">
            Code
            <input required value={code} onChange={(e) => setCode(e.target.value)} className="block border border-line rounded-lg px-3 py-2 mt-1 text-sm w-28" />
          </label>
          <label className="text-xs font-semibold text-inksoft flex-1 min-w-[220px]">
            Full name
            <input required value={name} onChange={(e) => setName(e.target.value)} className="block border border-line rounded-lg px-3 py-2 mt-1 text-sm w-full" />
          </label>
          <label className="text-xs font-semibold text-inksoft">
            Accent color
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="block border border-line rounded-lg h-[38px] w-16 mt-1" />
          </label>
          <button disabled={saving} type="submit" className="bg-ink text-white text-sm font-semibold rounded-lg px-4 py-2.5 h-[38px]">
            {saving ? "Adding…" : "Add"}
          </button>
        </form>
      )}

      <div className="bg-paper border border-line rounded-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sage text-xs uppercase tracking-wide text-inksoft">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Code</th>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((a) => (
              <tr key={a.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <span
                    className="inline-block w-5 h-5 rounded mr-2 align-middle"
                    style={{ background: a.accent_color }}
                  />
                  <span className="font-mono text-xs align-middle">{a.code}</span>
                </td>
                <td className="px-4 py-3 font-medium">{a.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      a.status === "active" ? "bg-greentint text-greendeep" : "bg-line text-inksoft"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleStatus(a)} className="text-xs font-semibold text-greendeep hover:underline">
                    {a.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
