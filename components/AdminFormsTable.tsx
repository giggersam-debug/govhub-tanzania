"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import type { Agency, FormStatus, GovForm } from "@/lib/types";

const STATUS_STYLES: Record<FormStatus, string> = {
  published: "bg-greentint text-greendeep",
  draft: "bg-[#FBEFE3] text-golddeep",
  archived: "bg-line text-inksoft",
};

export default function AdminFormsTable({ initialForms }: { initialForms: (GovForm & { agency: Agency })[] }) {
  const supabase = createClient();
  const [forms, setForms] = useState(initialForms);

  async function setStatus(id: string, status: FormStatus) {
    setForms((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
    await supabase.from("forms").update({ status, last_updated: new Date().toISOString() }).eq("id", id);
  }

  return (
    <div className="bg-paper border border-line rounded-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-sage text-xs uppercase tracking-wide text-inksoft">
          <tr>
            <th className="text-left px-4 py-3 font-semibold">Title</th>
            <th className="text-left px-4 py-3 font-semibold">Agency</th>
            <th className="text-left px-4 py-3 font-semibold">Version</th>
            <th className="text-left px-4 py-3 font-semibold">Updated</th>
            <th className="text-left px-4 py-3 font-semibold">Status</th>
            <th className="text-left px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((f) => (
            <tr key={f.id} className="border-t border-line">
              <td className="px-4 py-3 font-medium">{f.title}</td>
              <td className="px-4 py-3 font-mono text-xs">{f.agency?.code}</td>
              <td className="px-4 py-3 font-mono text-xs">{f.version}</td>
              <td className="px-4 py-3 text-xs text-inksoft">{new Date(f.last_updated).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[f.status]}`}>
                  {f.status}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2 flex-wrap">
                {f.status !== "published" && (
                  <button onClick={() => setStatus(f.id, "published")} className="text-xs font-semibold text-greendeep hover:underline">
                    Publish
                  </button>
                )}
                {f.status !== "archived" && (
                  <button onClick={() => setStatus(f.id, "archived")} className="text-xs font-semibold text-rust hover:underline">
                    Archive
                  </button>
                )}
                {f.status === "archived" && (
                  <button onClick={() => setStatus(f.id, "draft")} className="text-xs font-semibold text-inksoft hover:underline">
                    Restore to draft
                  </button>
                )}
              </td>
            </tr>
          ))}
          {forms.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-inksoft text-sm">
                No forms uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
