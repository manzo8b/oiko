#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const base=new URL('../',import.meta.url);
const read=path=>JSON.parse(readFileSync(new URL(path,base),'utf8'));
const product=read('config/product-catalog.json');
const release=read('config/release-gates.json');
const strict=process.argv.includes('--strict');
const fail=message=>{throw new Error('Release audit: '+message);};
if(product.product!=='Oiko'||release.product!=='Oiko')fail('invalid product identity');
if(product.modes.oiko.account_required!==false||product.modes.oiko.price_model!=='free')fail('local Oiko must remain free and independent');
if(product.modes.oiko.data_location!=='browser-indexeddb')fail('local Oiko data boundary changed');
if(product.modes.family.max_active_adults!==2||product.modes.family.account_required!==true)fail('Family account policy changed');
if(product.modes.family.automatic_local_data_migration!==false)fail('unapproved automatic local-to-cloud migration');
if(product.modes.family.checkout_enabled!==product.deployment.consumer_checkout_enabled)fail('checkout flags inconsistent between mode and deployment');
if(!Array.isArray(release.gates)||release.gates.length<12)fail('incomplete gate registry');
const ids=new Set();
for(const g of release.gates){
 if(!/^[A-Z_]+$/.test(g.id)||ids.has(g.id))fail('duplicate or invalid gate ID '+g.id);
 ids.add(g.id);
 if(!release.statuses_allowed.includes(g.status))fail('invalid gate status '+g.id);
 if(g.status==='verified'&&(!Array.isArray(g.evidence)||g.evidence.length===0))fail('verified without evidence '+g.id);
}
const required=['OPERATOR','IP','SOURCE','LEGAL','PROD_HOST','PROD_DB','SECURITY','BACKUP','ERASURE','ISOLATION','BILLING','ENTITLEMENTS','UX','TRANSFER'];
if(required.some(x=>!ids.has(x)))fail('mandatory release gate missing');
const blockers=release.gates.filter(g=>g.critical&&g.status!=='verified');
const criticalPassed=blockers.length===0&&release.market_release_allowed===true;
const checkoutEnabled=product.deployment.consumer_checkout_enabled===true;
if(checkoutEnabled&&!criticalPassed)fail('checkout cannot be enabled while critical release gates are open');
if(checkoutEnabled&&(
  product.modes.family.commercial_status!=='commercial'||
  product.modes.family.entitlements_implemented!==true||
  product.deployment.production_domain==='NOT_SELECTED'||
  product.deployment.production_host==='NOT_SELECTED'||
  product.deployment.production_supabase_project==='NOT_CREATED'
))fail('commercial checkout needs production infrastructure and entitlements');
const approved=criticalPassed&&checkoutEnabled;
if(approved && (release.business_handover_ready!==true)) {
 console.log('Nota: vendita attivabile; cessione completa non ancora approvata');
}
console.log('Oiko | Commercial release audit');
console.log('Modalità: Oiko gratuito + Oiko Family (beta)');
console.log('Bloccanti aperti: '+blockers.length+' / '+release.gates.length);
for(const g of blockers)console.log(' - '+g.id+': '+g.status+' — '+g.label);
console.log(approved?'Commercial release gate: READY':'Commercial release gate: NOT READY (nessuna vendita attiva)');
if(strict&&!approved)process.exitCode=1;
