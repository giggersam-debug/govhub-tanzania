import { createClient } from "@/lib/supabaseServer";
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
      <h1 className="font-display text-2xl mb-6">Analytics</h1>
      <AnalyticsCharts downloads={downloads ?? []} />
    </div>
  );
}
