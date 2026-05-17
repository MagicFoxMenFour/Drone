-- Supabase schema + RLS for admin panel
-- Apply this in Supabase SQL editor (or migrations) for the project.

-- Extensions
create extension if not exists pgcrypto;

-- Profiles: map auth.users -> role info
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tr_profiles_updated_at on public.profiles;
create trigger tr_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Helper: check admin role for current user
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = uid), false);
$$;

-- Services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_desc text not null,
  full_desc text not null,
  icon text not null default '',
  color text not null default 'cyan',
  use_cases jsonb not null default '[]'::jsonb,
  process jsonb not null default '[]'::jsonb,
  results jsonb not null default '[]'::jsonb,
  industries text[] not null default array[]::text[],
  price text not null default '',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists tr_services_updated_at on public.services;
create trigger tr_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

-- Cases
create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  title text not null,
  client text not null default '',
  location text not null default '',
  year text not null default '',
  short_desc text not null,
  challenge text not null default '',
  solution text not null default '',
  results jsonb not null default '[]'::jsonb,
  tags text[] not null default array[]::text[],
  gradient text not null default '',
  accent_color text not null default '',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists tr_cases_updated_at on public.cases;
create trigger tr_cases_updated_at
before update on public.cases
for each row execute function public.set_updated_at();

-- Blog posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  date text not null,
  read_time text not null default '',
  title text not null,
  excerpt text not null default '',
  tags text[] not null default array[]::text[],
  accent text not null default 'bg-blue-600',
  content jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists tr_blog_posts_updated_at on public.blog_posts;
create trigger tr_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- About page singleton
create table if not exists public.about_page (
  id uuid primary key default gen_random_uuid(),
  hero_title text not null default 'О компании',
  hero_text text not null default '',
  mission_title text not null default 'Наша миссия',
  mission_text text not null default '',
  principles jsonb not null default '[]'::jsonb,
  partners jsonb not null default '[]'::jsonb,
  licenses jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists tr_about_page_updated_at on public.about_page;
create trigger tr_about_page_updated_at
before update on public.about_page
for each row execute function public.set_updated_at();

-- Employees
create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  bio text not null default '',
  initials text not null default '',
  color text not null default 'bg-blue-600',
  active boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists tr_employees_updated_at on public.employees;
create trigger tr_employees_updated_at
before update on public.employees
for each row execute function public.set_updated_at();

-- Leads (contact form submissions)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null default '',
  phone text not null default '',
  email text not null default '',
  service text not null default '',
  message text not null default '',
  status text not null default 'new',
  source text not null default 'site'
);

-- Ensure a profile row exists on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.cases enable row level security;
alter table public.blog_posts enable row level security;
alter table public.about_page enable row level security;
alter table public.employees enable row level security;
alter table public.leads enable row level security;

-- Policies: profiles
drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_admin_update" on public.profiles;
create policy "profiles_admin_update"
on public.profiles
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Policies: services/cases/blog_posts are public-readable when published
drop policy if exists "services_public_read" on public.services;
create policy "services_public_read"
on public.services
for select
to anon, authenticated
using (published = true);

drop policy if exists "cases_public_read" on public.cases;
create policy "cases_public_read"
on public.cases
for select
to anon, authenticated
using (published = true);

drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read"
on public.blog_posts
for select
to anon, authenticated
using (published = true);

-- About & employees: readable for everyone (public site)
drop policy if exists "about_page_public_read" on public.about_page;
create policy "about_page_public_read"
on public.about_page
for select
to anon, authenticated
using (true);

drop policy if exists "employees_public_read" on public.employees;
create policy "employees_public_read"
on public.employees
for select
to anon, authenticated
using (active = true);

-- Admin write policies (services/cases/blog/about/employees/leads)
drop policy if exists "services_admin_all" on public.services;
create policy "services_admin_all"
on public.services
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "cases_admin_all" on public.cases;
create policy "cases_admin_all"
on public.cases
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "blog_posts_admin_all" on public.blog_posts;
create policy "blog_posts_admin_all"
on public.blog_posts
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "about_page_admin_all" on public.about_page;
create policy "about_page_admin_all"
on public.about_page
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "employees_admin_all" on public.employees;
create policy "employees_admin_all"
on public.employees
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "leads_admin_all" on public.leads;
create policy "leads_admin_all"
on public.leads
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

