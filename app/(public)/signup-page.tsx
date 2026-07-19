"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";

function friendlyError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("already registered") || lower.includes("user already exists")) {
    return "An account with that email already exists — try logging in instead.";
  }
  if (lower.includes("password")) {
    return "Password must be at least 6 characters.";
  }
  return "We couldn't create your account just now. Please try again in a moment.";
}

export default function SignupPage() {
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);
    if (error) {
      setError(friendlyError(error.message));
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="bg-paper border border-line rounded-card p-8 w-full max-w-sm text-center">
          <h1 className="font-display font-bold text-xl mb-2">Check your email</h1>
          <p className="text-sm text-inksoft mb-6">
            We've sent a confirmation link to <b>{email}</b>. Click it to activate your account, then log in.
          </p>
          <Link href="/login" className="text-sm font-semibold text-greendeep hover:underline">
            Go to login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <form onSubmit={handleSignup} className="bg-paper border border-line rounded-card p-8 w-full max-w-sm">
        <h1 className="font-display font-bold text-xl mb-1">Create an account</h1>
        <p className="text-sm text-inksoft mb-6">Save forms and, if invited, manage GovHub content.</p>

        {error && <div className="bg-rust/10 text-rust text-sm rounded-lg px-3 py-2 mb-4">{error}</div>}

        <label className="text-xs font-semibold text-inksoft">Full name</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-line rounded-lg px-3 py-2 mt-1 mb-4 text-sm"
        />

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
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-line rounded-lg px-3 py-2 mt-1 mb-6 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green text-white font-semibold rounded-lg py-2.5 text-sm hover:bg-greendeep disabled:opacity-50 mb-4"
        >
          {loading ? "Creating account…" : "Sign up"}
        </button>

        <p className="text-xs text-inksoft text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-greendeep hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
