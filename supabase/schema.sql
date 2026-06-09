create table if not exists public.sites (
  id uuid primary key,
  slug text not null unique,
  owner_id uuid,
  business_name text not null,
  industry text not null,
  one_liner text not null,
  style_json jsonb not null,
  content_json jsonb not null,
  contact text,
  address text,
  business_hours text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  name text not null,
  contact text not null,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists sites_slug_idx on public.sites(slug);
create index if not exists leads_site_id_idx on public.leads(site_id);
