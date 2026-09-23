-- Losse webbestellingen via MultiSafepay.
-- Draai dit in Supabase → SQL Editor. Raakt geen bestaande tabellen aan.

create table if not exists web_orders (
  id bigint primary key generated always as identity,
  order_id text not null unique,
  slug text,
  email text,
  extra text,
  bedrag_centen integer,
  status text default 'verwerken',
  created_at timestamptz default now()
);

-- Alleen de service role (API routes) mag hierbij; geen anon-policy.
alter table web_orders enable row level security;
