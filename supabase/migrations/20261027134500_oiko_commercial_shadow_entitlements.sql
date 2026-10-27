-- Oiko Family commercial foundation: shadow-only entitlement registry.
-- STAGING ONLY. Does not gate expenses, open signup, or charge money.
-- IMPORTANT: current Family beta is never treated as a paid subscription.

create table if not exists oiko_private.oiko_plan_entitlements (
  household_id uuid primary key
    references public.oiko_households(id) on delete cascade,
  plan_code text not null default 'family'
    check (plan_code in ('family')),
  status text not null default 'private_beta'
    check (status in ('private_beta','trialing','active','past_due','canceled','expired')),
  billing_provider text,
  provider_subscription_ref text,
  current_period_end_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint oiko_plan_provider_identity
    check ((billing_provider is null and provider_subscription_ref is null)
        or (billing_provider is not null and provider_subscription_ref is not null))
);
create unique index if not exists oiko_plan_provider_subscription_unique
  on oiko_private.oiko_plan_entitlements (billing_provider, provider_subscription_ref)
  where provider_subscription_ref is not null;

alter table oiko_private.oiko_plan_entitlements enable row level security;
-- No client RLS policy: this is an administrative table in an unexposed schema.
revoke all on table oiko_private.oiko_plan_entitlements from public, anon, authenticated;
comment on table oiko_private.oiko_plan_entitlements
  is 'Commercial shadow registry. No browser writes or premium enforcement in private beta. Future signed provider webhook only.';

create or replace function public.oiko_family_plan_status(p_household uuid)
returns table (
  plan_code text,
  plan_status text,
  commercial_enabled boolean,
  current_period_end_at timestamptz
)
language plpgsql
security definer
set search_path to ''
as $$
declare v_entitlement oiko_private.oiko_plan_entitlements%rowtype;
begin
  if p_household is null
    or (select auth.uid()) is null
    or not (select oiko_private.is_member(p_household))
  then
    raise exception 'NOT_MEMBER' using errcode='42501';
  end if;

  select * into v_entitlement
    from oiko_private.oiko_plan_entitlements
    where household_id = p_household;
  if not found then
    return query select 'family'::text, 'private_beta'::text,
      false::boolean, null::timestamptz;
    return;
  end if;

  -- Explicit shadow mode: an entitlement row cannot activate checkout or premium.
  return query select v_entitlement.plan_code, v_entitlement.status,
    false::boolean, v_entitlement.current_period_end_at;
end;
$$;
revoke all on function public.oiko_family_plan_status(uuid)
  from public, anon, authenticated;
grant execute on function public.oiko_family_plan_status(uuid)
  to authenticated;
comment on function public.oiko_family_plan_status(uuid)
  is 'Authenticated family-only plan summary; commercial_enabled is forcibly false until separately approved launch.';
