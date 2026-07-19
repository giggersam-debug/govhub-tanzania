"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/forms", label: "Forms", icon: "📄" },
  { href: "/admin/agencies", label: "Agencies", icon: "🏛️" },
  { href: "/admin/categories", label: "Categories", icon: "🗂️" },
  { href: "/admin/analytics", label: "Analytics", icon: "📈" },
];

export default function AdminSidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const navLinks = (
    <nav className="space-y-0.5">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active ? "bg-white/10 text-gold" : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="w-60 shrink-0 bg-greendeep text-white min-h-screen py-6 px-3 hidden md:block">
        <div className="flex items-center gap-2 font-display font-bold text-lg px-3 mb-8">
          <span className="w-2.5 h-5 rounded-sm bg-gold inline-block" />
          GovHub Admin
        </div>
        {navLinks}
      </aside>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <aside
          className={`absolute left-0 top-0 bottom-0 w-72 max-w-[80vw] bg-greendeep text-white py-6 px-3 overflow-y-auto transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-3 mb-8">
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="w-2.5 h-5 rounded-sm bg-gold inline-block" />
              GovHub Admin
            </div>
            <button onClick={onClose} aria-label="Close menu" className="text-white/70 hover:text-white p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {navLinks}
        </aside>
      </div>
    </>
  );
}
