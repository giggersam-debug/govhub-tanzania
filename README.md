# GovHub Tanzania

Phase 1 MVP: a public directory of official Tanzanian government forms, plus an Admin
Portal for staff to publish and manage them. Built on the same stack and component
patterns as **Fedha Tracker** (Next.js 15 + Supabase + Tailwind), adapted for a public
content site instead of a subscription SaaS.

## What's reused from Fedha Tracker vs. new

| Reused as-is | Adapted | New |
|---|---|---|
| `lib/supabaseServer.ts` / `supabaseClient.ts` | `middleware.ts` — gates `/admin` only, no paywall | Public site (`app/(public)/…`) |
| Tailwind theme convention (named color tokens + Space Grotesk/mono pairing) | `AdminChrome`/`AdminSidebar` — same shell as `DashboardChrome`/`Sidebar`, GovHub nav items | `supabase/schema.sql` — agencies/categories/forms/downloads/favorites |
| RLS-per-table pattern | `SignOutButton` — same, redirects to `/login` | Full-text search on forms (`idx_forms_search`) |
| | Login page — same flow, honors `redirectTo` from middleware | Admin CRUD: Forms, Agencies, Categories, Analytics (recharts) |

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a Supabase project**, then copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. **Run the schema**, then the seed data, in Supabase's SQL editor:
   - `supabase/schema.sql` — tables, RLS policies, starter categories
   - `supabase/seed.sql` — the same 13 agencies and 20 forms used in the design
     prototype, so the real app and the prototype match

4. **Promote yourself to admin.** Sign up once through `/login` (Supabase's default
   sign-up flow, or add a `/signup` page), then in the SQL editor:
   ```sql
   update profiles set role = 'admin' where id = 'YOUR-USER-UUID';
   ```
   Find your UUID under Supabase → Authentication → Users.

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   - Public site: `http://localhost:3000`
   - Admin Portal: `http://localhost:3000/admin` (redirects to `/login` if signed out
     or not admin/editor)

## Structure

```
app/
  (public)/         → public site: home, search, agencies, form detail, login
  admin/            → gated Admin Portal: dashboard, forms, agencies, categories, analytics
components/          → shared UI (public + admin)
lib/                 → Supabase clients + shared types
supabase/            → schema.sql + seed.sql
```

## Not yet built (next phases, per the Phase docs)

- File upload to Supabase Storage for form PDFs (the admin form editor currently takes
  a `file_url` — wire this to Storage next)
- Phase 2: payment integration for forms with government fees
- Phase 3: AI Government Assistant (the `AssistantWidget` shell from Fedha Tracker is a
  natural starting point for this)
- Signup page (only login is scaffolded — add `/signup` using the same Supabase pattern)
