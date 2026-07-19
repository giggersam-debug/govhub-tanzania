import { createClient } from "@/lib/supabaseServer";
import AdminPageHeader from "@/components/AdminPageHeader";

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
      <AdminPageHeader icon="📊" title="Dashboard" subtitle="An overview of GovHub's content and activity." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="✅" label="Published forms" value={published ?? 0} accent="text-greendeep" />
        <StatCard icon="📝" label="Draft forms" value={draft ?? 0} accent="text-golddeep" />
        <StatCard icon="🏛️" label="Agencies" value={agencyCount ?? 0} accent="text-greendeep" />
        <StatCard icon="⬇️" label="Downloads today" value={downloadsToday ?? 0} accent="text-greendeep" />
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

function StatCard({ icon, label, value, accent }: { icon: string; label: string; value: number; accent: string }) {
  return (
    <div className="bg-paper border border-line rounded-card p-4 hover:border-green/40 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">{icon}</span>
      </div>
      <div className={`text-2xl font-display font-semibold ${accent}`}>{value}</div>
      <div className="text-xs text-inksoft mt-1">{label}</div>
    </div>
  );
}
