import { createClient } from "@/lib/supabaseServer";

export default async function AdminOverview() {
  const supabase = await createClient();

  const [{ count: totalForms }, { count: published }, { count: draft }, { count: agencyCount }, { count: downloadsToday }] =
    await Promise.all([
      supabase.from("forms").select("*", { count: "exact", head: true }),
      supabase.from("forms").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("forms").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("agencies").select("*", { count: "exact", head: true }),
      supabase
        .from("downloads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
    ]);

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Published forms" value={published ?? 0} />
        <StatCard label="Draft forms" value={draft ?? 0} />
        <StatCard label="Agencies" value={agencyCount ?? 0} />
        <StatCard label="Downloads today" value={downloadsToday ?? 0} />
      </div>
      <div className="bg-paper border border-line rounded-card p-6">
        <h2 className="font-display text-lg mb-2">Total forms on file</h2>
        <p className="text-inksoft text-sm">
          {totalForms ?? 0} forms across all statuses. Head to{" "}
          <a href="/admin/forms" className="text-greendeep font-semibold hover:underline">
            Forms
          </a>{" "}
          to review, publish, or archive them.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-paper border border-line rounded-card p-4">
      <div className="text-2xl font-display font-semibold text-greendeep">{value}</div>
      <div className="text-xs text-inksoft mt-1">{label}</div>
    </div>
  );
}
