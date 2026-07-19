import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import AdminChrome from "@/components/AdminChrome";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/admin");

  // Role check: only admin/editor profiles get past this gate. Unlike Fedha's
  // dashboard layout (which checks subscriptions.status for a paywall), GovHub
  // has no billing here — Phase 1 is free for the public, and this guard is
  // purely about who's allowed to publish/edit content.
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).maybeSingle();

  if (!profile || !["admin", "editor"].includes(profile.role)) {
    redirect("/?adminAccessRequired=1");
  }

  return (
    <AdminChrome userEmail={user.email ?? ""} role={profile.role}>
      {children}
    </AdminChrome>
  );
}
