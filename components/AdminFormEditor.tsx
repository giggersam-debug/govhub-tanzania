"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import type { Agency, Category } from "@/lib/types";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminFormEditor({ agencies, categories }: { agencies: Agency[]; categories: Category[] }) {
  const supabase = createClient();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [agencyId, setAgencyId] = useState(agencies[0]?.id ?? "");
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [requirements, setRequirements] = useState("");
  const [processingTime, setProcessingTime] = useState("");
  const [fee, setFee] = useState("Free");
  const [submissionOffice, setSubmissionOffice] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await supabase.from("forms").insert({
      title,
      slug: slugify(title),
      agency_id: agencyId,
      category_id: categoryId || null,
      description,
      purpose,
      eligibility,
      requirements: requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      processing_time: processingTime,
      fee,
      submission_office: submissionOffice,
      file_url: fileUrl || null,
      reference_code: referenceCode || null,
      status: "draft",
      version: "v1.0",
    });

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/forms");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-paper border border-line rounded-card p-6 max-w-2xl space-y-4">
      {error && <div className="bg-rust/10 text-rust text-sm rounded-lg px-3 py-2">{error}</div>}

      <Field label="Form title">
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Agency">
          <select value={agencyId} onChange={(e) => setAgencyId(e.target.value)} className="input">
            {agencies.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code} — {a.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Category">
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="input">
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Description">
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="input" rows={2} />
      </Field>
      <Field label="Purpose">
        <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} className="input" rows={2} />
      </Field>
      <Field label="Eligibility">
        <textarea value={eligibility} onChange={(e) => setEligibility(e.target.value)} className="input" rows={2} />
      </Field>
      <Field label="Requirements (one per line)">
        <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} className="input" rows={3} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Processing time">
          <input value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} className="input" placeholder="e.g. 3–5 business days" />
        </Field>
        <Field label="Fee">
          <input value={fee} onChange={(e) => setFee(e.target.value)} className="input" placeholder="Free or TZS amount" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Submission office">
          <input value={submissionOffice} onChange={(e) => setSubmissionOffice(e.target.value)} className="input" />
        </Field>
        <Field label="Reference code">
          <input value={referenceCode} onChange={(e) => setReferenceCode(e.target.value)} className="input" placeholder="e.g. TRA-TIN-001" />
        </Field>
      </div>

      <Field label="File URL (PDF, hosted in Supabase Storage or elsewhere)">
        <input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} className="input" placeholder="https://…" />
      </Field>

      <p className="text-xs text-inksoft">
        Saved as a <b>draft</b> — publish it from the Forms list once you've checked it.
      </p>

      <button
        type="submit"
        disabled={saving}
        className="bg-green hover:bg-greendeep text-white font-semibold rounded-lg px-5 py-2.5 text-sm disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save as draft"}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #dbe3d6;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 13.5px;
          font-family: inherit;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-inksoft block mb-1">{label}</span>
      {children}
    </label>
  );
}
