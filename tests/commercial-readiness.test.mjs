import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const read=path=>JSON.parse(readFileSync(new URL('../'+path,import.meta.url),'utf8'));
const product=read('config/product-catalog.json');
const gates=read('config/release-gates.json');

test('Catalogo: Oiko gratuito e locale resta indipendente',()=>{
 assert.equal(product.modes.oiko.public_name,'Oiko');
 assert.equal(product.modes.oiko.price_model,'free');
 assert.equal(product.modes.oiko.account_required,false);
 assert.equal(product.modes.oiko.data_location,'browser-indexeddb');
 assert.equal(product.modes.oiko.family_sync,false);
 assert.equal(product.modes.family.automatic_local_data_migration,false);
});
test('Oiko Family è una beta per due adulti e senza checkout',()=>{
 assert.equal(product.modes.family.max_active_adults,2);
 assert.equal(product.modes.family.account_required,true);
 assert.equal(product.modes.family.commercial_status,'private_beta');
 assert.equal(product.deployment.consumer_checkout_enabled,false);
 assert.equal(product.modes.family.entitlements_implemented,false);
});
test('Rilascio commerciale è bloccato finché mancano le verifiche',()=>{
 assert.equal(gates.market_release_allowed,false);
 assert.ok(gates.gates.length>=12);
 assert.ok(gates.gates.some(x=>x.critical&&x.status!=='verified'));
 assert.ok(gates.gates.every(x=>x.status!=='verified'||x.evidence.length>0));
 const r=spawnSync(process.execPath,[new URL('../scripts/release-readiness.mjs',import.meta.url).pathname,'--strict'],{encoding:'utf8'});
 assert.equal(r.status,1);
 assert.match(r.stdout,/SaaS launch: NOT READY/);
});
test('Il controllo informativo resta eseguibile senza bloccare QA',()=>{
 const r=spawnSync(process.execPath,[new URL('../scripts/release-readiness.mjs',import.meta.url).pathname],{encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 assert.match(r.stdout,/Bloccanti aperti:/);
});

test('Anche la cessione è bloccata in assenza di IP, sorgenti e contratti',()=>{
 const r=spawnSync(process.execPath,[new URL('../scripts/release-readiness.mjs',import.meta.url).pathname,'--strict-transfer'],{encoding:'utf8'});
 assert.equal(r.status,1,r.stderr);
 assert.match(r.stdout,/Software transfer: NOT READY/);
});
