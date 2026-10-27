-- Oiko commercial staging hardening: privileged logic stays private.
-- The public API function is an INVOKER-only wrapper, matching existing Oiko RPC design.
create or replace function oiko_private.family_plan_status(p_household uuid)
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
 then raise exception 'NOT_MEMBER' using errcode='42501';
 end if;

 select * into v_entitlement
   from oiko_private.oiko_plan_entitlements
   where household_id=p_household;
 if not found then
   return query select 'family'::text,'private_beta'::text,
      false::boolean,null::timestamptz;
   return;
 end if;
 return query select v_entitlement.plan_code,v_entitlement.status,
   false::boolean,v_entitlement.current_period_end_at;
end;
$$;
revoke all on function oiko_private.family_plan_status(uuid) from public,anon,authenticated;
grant execute on function oiko_private.family_plan_status(uuid) to authenticated;

create or replace function public.oiko_family_plan_status(p_household uuid)
returns table (
 plan_code text,
 plan_status text,
 commercial_enabled boolean,
 current_period_end_at timestamptz
)
language sql
security invoker
set search_path to ''
as $$
 select * from oiko_private.family_plan_status(p_household);
$$;
revoke all on function public.oiko_family_plan_status(uuid) from public,anon,authenticated;
grant execute on function public.oiko_family_plan_status(uuid) to authenticated;
comment on function public.oiko_family_plan_status(uuid)
  is 'INVOCER-only wrapper: membership-checked shadow commercial state; payments always disabled.';
