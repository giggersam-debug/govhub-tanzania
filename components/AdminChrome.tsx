"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import SignOutButton from "@/components/SignOutButton";

export default function AdminChrome({
  userEmail,
  role,
  children,
}: {
  userEmail: string;
  role: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sage flex">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 min-w-0">
        <header className="bg-greendeep text-white px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="text-white/80 hover:text-white p-1 -ml-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2 font-display font-bold text-sm">
              <span className="w-2 h-4 rounded-sm bg-gold inline-block" />
              GovHub Admin
            </div>
          </div>

          <div className="hidden md:block" />

          <div className="flex items-center gap-3 md:gap-4 text-sm">
            <span className="text-xs font-mono text-white/70 hidden sm:inline">
              {userEmail} · {role}
            </span>
            <SignOutButton />
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">{children}</main>
      </div>
    </div>
  );
}
