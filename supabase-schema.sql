-- ============================================================
-- Tennis Coffee Table — Supabase schema (prefix tct_)
-- Run this in the Supabase SQL Editor of your project.
-- Designed to coexist with other projects in the same database
-- and to be easy to migrate to a dedicated project later.
-- ============================================================

-- 1) CATEGORIES (dynamic — admin can add/edit/delete)
create table if not exists public.tct_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

insert into public.tct_categories (slug, name, position) values
  ('stil', 'Стіл', 1),
  ('stilchyk', 'Стільчик', 2)
on conflict (slug) do nothing;

-- 2) PRODUCTS
create table if not exists public.tct_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text default '',
  price numeric not null default 0,
  category_slug text references public.tct_categories(slug) on update cascade,
  image text default '',
  images jsonb default '[]'::jsonb,
  in_stock boolean default true,
  discount numeric default 0,
  size_options jsonb default '[]'::jsonb,
  color_options jsonb default '[]'::jsonb,
  archived boolean default false,
  created_at timestamptz not null default now()
);

-- 3) PROFILES (admin role decoupled from auth for easy migration)
create table if not exists public.tct_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text default '',
  phone text default '',
  discount numeric default 0,
  is_admin boolean default false,
  created_at timestamptz not null default now()
);

-- 4) ORDERS
create table if not exists public.tct_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text default '',
  total numeric not null default 0,
  items jsonb not null default '[]'::jsonb,
  delivery text default '',
  payment_method text default '',
  comment text default '',
  status text default 'new',
  archived boolean default false,
  created_at timestamptz not null default now()
);

-- 5) SITE SETTINGS (editable texts/contacts)
create table if not exists public.tct_site_settings (
  key text primary key,
  value text default ''
);

insert into public.tct_site_settings (key, value) values
  ('hero_title', 'Кавові столики зі старих тенісних мʼячів та скла'),
  ('hero_subtitle', 'Ми перетворюємо відпрацьовані тенісні мʼячі на скульптурні кавові столики зі скляною стільницею.'),
  ('phone', '+380 00 000 00 00'),
  ('email', 'hello@tenniscoffeetable.com'),
  ('instagram_url', 'https://instagram.com'),
  ('instagram_label', 'Ми в Instagram')
on conflict (key) do nothing;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.tct_categories enable row level security;
alter table public.tct_products enable row level security;
alter table public.tct_profiles enable row level security;
alter table public.tct_orders enable row level security;
alter table public.tct_site_settings enable row level security;

-- helper: is current user an admin?
create or replace function public.tct_is_admin() returns boolean
language sql security definer stable as $$
  select coalesce((select is_admin from public.tct_profiles where id = auth.uid()), false);
$$;

-- CATEGORIES: public read, admin write
drop policy if exists tct_cat_read on public.tct_categories;
create policy tct_cat_read on public.tct_categories for select using (true);
drop policy if exists tct_cat_admin on public.tct_categories;
create policy tct_cat_admin on public.tct_categories for all using (public.tct_is_admin()) with check (public.tct_is_admin());

-- PRODUCTS: public read, admin write
drop policy if exists tct_prod_read on public.tct_products;
create policy tct_prod_read on public.tct_products for select using (true);
drop policy if exists tct_prod_admin on public.tct_products;
create policy tct_prod_admin on public.tct_products for all using (public.tct_is_admin()) with check (public.tct_is_admin());

-- PROFILES: user reads/updates own; admin reads all
drop policy if exists tct_prof_self on public.tct_profiles;
create policy tct_prof_self on public.tct_profiles for select using (auth.uid() = id or public.tct_is_admin());
drop policy if exists tct_prof_upd on public.tct_profiles;
create policy tct_prof_upd on public.tct_profiles for update using (auth.uid() = id or public.tct_is_admin());
drop policy if exists tct_prof_ins on public.tct_profiles;
create policy tct_prof_ins on public.tct_profiles for insert with check (auth.uid() = id);
drop policy if exists tct_prof_admin on public.tct_profiles;
create policy tct_prof_admin on public.tct_profiles for all using (public.tct_is_admin()) with check (public.tct_is_admin());

-- ORDERS: user sees own; admin sees all; anyone can insert (guest checkout)
drop policy if exists tct_ord_read on public.tct_orders;
create policy tct_ord_read on public.tct_orders for select using (auth.uid() = user_id or public.tct_is_admin());
drop policy if exists tct_ord_ins on public.tct_orders;
create policy tct_ord_ins on public.tct_orders for insert with check (true);
drop policy if exists tct_ord_admin on public.tct_orders;
create policy tct_ord_admin on public.tct_orders for all using (public.tct_is_admin()) with check (public.tct_is_admin());

-- SITE SETTINGS: public read, admin write
drop policy if exists tct_set_read on public.tct_site_settings;
create policy tct_set_read on public.tct_site_settings for select using (true);
drop policy if exists tct_set_admin on public.tct_site_settings;
create policy tct_set_admin on public.tct_site_settings for all using (public.tct_is_admin()) with check (public.tct_is_admin());

-- auto-create profile on signup
create or replace function public.tct_handle_new_user() returns trigger
language plpgsql security definer as $$
begin
  insert into public.tct_profiles (id, full_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), coalesce(new.raw_user_meta_data->>'phone', ''))
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists tct_on_auth_user_created on auth.users;
create trigger tct_on_auth_user_created after insert on auth.users
  for each row execute function public.tct_handle_new_user();

-- ============================================================
-- STORAGE: create a bucket named "tct-product-images" (public)
-- via Dashboard > Storage, then these policies apply:
-- ============================================================
drop policy if exists tct_img_read on storage.objects;
create policy tct_img_read on storage.objects for select using (bucket_id = 'tct-product-images');
drop policy if exists tct_img_admin on storage.objects;
create policy tct_img_admin on storage.objects for all
  using (bucket_id = 'tct-product-images' and public.tct_is_admin())
  with check (bucket_id = 'tct-product-images' and public.tct_is_admin());

-- ============================================================
-- MAKE YOURSELF ADMIN (run AFTER you register on the site):
-- update public.tct_profiles set is_admin = true where id = 
--   (select id from auth.users where email = 'YOUR_EMAIL_HERE');
-- ============================================================
