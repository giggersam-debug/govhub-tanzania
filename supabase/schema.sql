-- ============================================================
-- GovHub Tanzania — Supabase schema (Phase 1: Forms Repository)
-- Run once in your Supabase project's SQL editor
-- (Project → SQL Editor → New query → paste → Run)
--
-- Design note: unlike Fedha Tracker, most tables here are PUBLIC READ
-- (anyone can browse forms without an account) but WRITE-restricted
-- to admins/editors only. Only favorites/downloads are user-scoped.
-- ============================================================

-- Profiles: one row per signed-up user, extends Supabase's built-in auth.users.
-- role drives access to the Admin Portal — see middleware.ts + app/admin/layout.tsx
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text default 'public' check (role in ('public', 'admin', 'editor')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Helper: is the current user an admin or editor?
create or replace function is_staff()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$ language sql security definer stable;

-- ------------------------------------------------------------
-- Agencies
-- ------------------------------------------------------------
create table if not exists agencies (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,              -- e.g. 'TRA', 'BRELA'
  name text not null,
  description text,
  logo_url text,
  website text,
  email text,
  phone text,
  address text,
  accent_color text default '#0B6E4F',
  status text default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz default now()
);

alter table agencies enable row level security;

create policy "Anyone can view active agencies"
  on agencies for select using (status = 'active' or is_staff());
create policy "Staff manage agencies"
  on agencies for insert with check (is_staff());
create policy "Staff update agencies"
  on agencies for update using (is_staff());
create policy "Staff delete agencies"
  on agencies for delete using (is_staff());

-- ------------------------------------------------------------
-- Categories
-- ------------------------------------------------------------
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  icon text,
  description text
);

alter table categories enable row level security;

create policy "Anyone can view categories"
  on categories for select using (true);
create policy "Staff manage categories"
  on categories for all using (is_staff()) with check (is_staff());

-- ------------------------------------------------------------
-- Forms
-- ------------------------------------------------------------
create table if not exists forms (
  id uuid default gen_random_uuid() primary key,
  agency_id uuid references agencies on delete cascade not null,
  category_id uuid references categories on delete set null,
  title text not null,
  slug text unique not null,
  description text,
  purpose text,
  eligibility text,
  requirements text[] default '{}',
  attachments text[] default '{}',
  processing_time text,
  fee text,
  submission_office text,
  file_url text,
  preview_url text,
  language text default 'en',
  version text default 'v1.0',
  reference_code text,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  last_updated timestamptz default now(),
  created_at timestamptz default now()
);

alter table forms enable row level security;

create policy "Anyone can view published forms"
  on forms for select using (status = 'published' or is_staff());
create policy "Staff manage forms"
  on forms for insert with check (is_staff());
create policy "Staff update forms"
  on forms for update using (is_staff());
create policy "Staff delete forms"
  on forms for delete using (is_staff());

create index if not exists idx_forms_agency on forms (agency_id);
create index if not exists idx_forms_category on forms (category_id);
create index if not exists idx_forms_status on forms (status);
-- Full-text search across title + description, used by the public Search page
-- before/instead of a dedicated search service (see Phase 1 doc's "Search" stack notes)
create index if not exists idx_forms_search on forms
  using gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')));

-- ------------------------------------------------------------
-- Downloads (analytics + download history)
-- ------------------------------------------------------------
create table if not exists downloads (
  id uuid default gen_random_uuid() primary key,
  form_id uuid references forms on delete cascade not null,
  user_id uuid references auth.users on delete set null,
  ip text,
  device text,
  created_at timestamptz default now()
);

alter table downloads enable row level security;

create policy "Anyone can log a download"
  on downloads for insert with check (true);
create policy "Users view own download history"
  on downloads for select using (auth.uid() = user_id or is_staff());

create index if not exists idx_downloads_form on downloads (form_id);
create index if not exists idx_downloads_user on downloads (user_id);

-- ------------------------------------------------------------
-- Favorites (saved forms — registered users only)
-- ------------------------------------------------------------
create table if not exists favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  form_id uuid references forms on delete cascade not null,
  created_at timestamptz default now(),
  unique (user_id, form_id)
);

alter table favorites enable row level security;

create policy "Users manage own favorites"
  on favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- Seed: starter categories (matches Phase 1 doc's category list)
-- ------------------------------------------------------------
insert into categories (name, icon) values
  ('Tax', 'receipt'),
  ('Business', 'briefcase'),
  ('Identity', 'id-card'),
  ('Immigration', 'passport'),
  ('Lands', 'map'),
  ('Environment', 'leaf'),
  ('Health', 'heart-pulse')
on conflict (name) do nothing;
