import { createBrowserClient } from "@supabase/ssr";

// Use this in any Client Component ("use client") that needs to read/write data.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
