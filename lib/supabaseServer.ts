import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Use this inside Server Components, Server Actions, and Route Handlers.
// Next.js 15's cookies() returns a Promise, so every caller must
// `await createClient()`.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component — safe to ignore since
            // middleware.ts refreshes the session.
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // see note above
          }
        },
      },
    }
  );
}

// Admin client — SERVICE ROLE key, server-only, bypasses row-level security.
// Only import this in server code (admin routes, upload handlers). Never
// in anything that ships to the browser.
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
