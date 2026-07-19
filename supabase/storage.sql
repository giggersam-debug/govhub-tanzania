-- ============================================================
-- GovHub Tanzania — Supabase Storage setup
-- Run once in the SQL editor, AFTER schema.sql
-- Creates a public 'forms' bucket for hosting form PDFs, with
-- RLS policies matching the rest of the schema: anyone can read,
-- only staff (admin/editor) can upload, replace, or delete.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('forms', 'forms', true)
on conflict (id) do nothing;

-- Anyone can read/download files in the forms bucket (it's a public directory)
create policy "Public read access to forms bucket"
on storage.objects for select
using (bucket_id = 'forms');

-- Only staff can upload new files
create policy "Staff can upload to forms bucket"
on storage.objects for insert
with check (bucket_id = 'forms' and is_staff());

-- Only staff can replace/update files
create policy "Staff can update forms bucket"
on storage.objects for update
using (bucket_id = 'forms' and is_staff());

-- Only staff can delete files
create policy "Staff can delete from forms bucket"
on storage.objects for delete
using (bucket_id = 'forms' and is_staff());
