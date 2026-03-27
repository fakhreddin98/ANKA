create extension if not exists pgcrypto;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email' = 'fakher.abewe@gmail.com', false);
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  location text,
  scope text,
  summary text not null,
  tags text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('Uppdragstagare', 'Uppdragsgivare')),
  name text not null,
  phone text not null,
  email text not null,
  address text,
  company text,
  message text,
  consent boolean not null default false,
  file_name text,
  file_path text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_content (
  id integer primary key default 1 check (id = 1),
  hero jsonb not null default '{}'::jsonb,
  partners jsonb not null default '{}'::jsonb,
  offer jsonb not null default '{}'::jsonb,
  jobs jsonb not null default '{}'::jsonb,
  contact jsonb not null default '{}'::jsonb,
  visibility jsonb not null default '{"partners": true, "jobs": true, "contact": true}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row
execute function public.set_updated_at();

alter table public.jobs enable row level security;
alter table public.inquiries enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "Public can read published jobs" on public.jobs;
create policy "Public can read published jobs"
on public.jobs
for select
using (published = true);

drop policy if exists "Admin full access to jobs" on public.jobs;
create policy "Admin full access to jobs"
on public.jobs
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can insert inquiries" on public.inquiries;
create policy "Public can insert inquiries"
on public.inquiries
for insert
with check (true);

drop policy if exists "Admin can read inquiries" on public.inquiries;
create policy "Admin can read inquiries"
on public.inquiries
for select
using (public.is_admin());

drop policy if exists "Admin can update inquiries" on public.inquiries;
create policy "Admin can update inquiries"
on public.inquiries
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admin can delete inquiries" on public.inquiries;
create policy "Admin can delete inquiries"
on public.inquiries
for delete
using (public.is_admin());

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
using (true);

drop policy if exists "Admin full access to site content" on public.site_content;
create policy "Admin full access to site content"
on public.site_content
for all
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('intake-files', 'intake-files', false)
on conflict (id) do nothing;

drop policy if exists "Public can upload intake files" on storage.objects;
create policy "Public can upload intake files"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'intake-files');

drop policy if exists "Admin can view intake files" on storage.objects;
create policy "Admin can view intake files"
on storage.objects
for select
to authenticated
using (bucket_id = 'intake-files' and public.is_admin());

drop policy if exists "Admin can delete intake files" on storage.objects;
create policy "Admin can delete intake files"
on storage.objects
for delete
to authenticated
using (bucket_id = 'intake-files' and public.is_admin());

insert into public.site_content (id)
values (1)
on conflict (id) do nothing;
