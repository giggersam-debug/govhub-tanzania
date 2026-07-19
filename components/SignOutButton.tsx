"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="border border-white/20 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
    >
      Sign out
    </button>
  );
}
