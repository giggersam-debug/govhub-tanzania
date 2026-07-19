import { createClient } from "@/lib/supabaseServer";
import AdminPageHeader from "@/components/AdminPageHeader";
import AnalyticsCharts from "@/components/AnalyticsCharts";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  const since = new Date();
  since.setDate(since.getDate() - 14);

  const { data: downloads } = await supabase
    .from("downloads")
    .select("created_at, form_id, forms(title)")
    .gte("created_at", since.toISOString());

  return (
    <div>
      <AdminPageHeader icon="📈" title="Analytics" subtitle="Download activity over the last 14 days" />
      <AnalyticsCharts downloads={downloads ?? []} />
    </div>
  );
}
