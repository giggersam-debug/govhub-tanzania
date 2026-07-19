"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

function friendlyError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) {
    return "That email or password doesn't match our records. Double-check them and try again.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email first — check your inbox for the link we sent.";
  }
  return "We couldn't log you in just now. Please try again in a moment.";
}

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(friendlyError(error.message));
      return;
    }
    router.push(searchParams.get("redirectTo") || "/");
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <form onSubmit={handleLogin} className="bg-paper border border-line rounded-card p-8 w-full max-w-sm">
        <h1 className="font-display font-bold text-xl mb-1">Welcome back</h1>
        <p className="text-sm text-inksoft mb-6">Log in to save forms and manage GovHub content.</p>

        {error && <div className="bg-rust/10 text-rust text-sm rounded-lg px-3 py-2 mb-4">{error}</div>}

        <label className="text-xs font-semibold text-inksoft">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-line rounded-lg px-3 py-2 mt-1 mb-4 text-sm"
        />

        <label className="text-xs font-semibold text-inksoft">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-line rounded-lg px-3 py-2 mt-1 mb-6 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green text-white font-semibold rounded-lg py-2.5 text-sm hover:bg-greendeep disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
