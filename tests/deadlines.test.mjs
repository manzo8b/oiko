import test from 'node:test';
import assert from 'node:assert/strict';
import {daysUntilDue,deadlineOverview,openBillOccurrences,paidBillExpenses} from '../assets/logic.mjs';
import fs from 'node:fs';

const bill=(id,nextDue,amountCents=1000,active=true)=>({id,name:'Bolletta '+id,nextDue,amountCents,active});

test('Giorni di calendario invarianti nel cambio ora e a fine anno',()=>{
 assert.equal(daysUntilDue('2026-10-26','2026-10-26'),0);
 assert.equal(daysUntilDue('2026-11-02','2026-10-26'),7);
 assert.equal(daysUntilDue('2026-11-25','2026-10-26'),30);
 assert.equal(daysUntilDue('2026-11-26','2026-10-26'),31);
 assert.equal(daysUntilDue('2027-01-01','2026-12-31'),1);
 assert.equal(daysUntilDue('2028-03-01','2028-02-28'),2);
 assert.throws(()=>daysUntilDue('2026-02-30','2026-10-26'));
});

test('Riepilogo finestre 7 e 30 giorni, separazione scaduti',()=>{
 const bills=[bill('scaduto','2026-10-25',2500),bill('oggi','2026-10-26',3000),bill('7','2026-11-02',4000),bill('8','2026-11-03',5000),bill('30','2026-11-25',6000),bill('31','2026-11-26',7000),bill('sospeso','2026-10-27',9000,false)];
 const r=deadlineOverview(bills,'2026-10-26');
 assert.deepEqual(r.overdue,{count:1,cents:2500});
 assert.deepEqual(r.next7,{count:2,cents:7000});
 assert.deepEqual(r.next30,{count:4,cents:18000});
 assert.deepEqual(r.later,{count:1,cents:7000});
});

test('Doppio conteggio evitato se occorrenza già registrata pagata',()=>{
 const bills=[bill('luce','2026-11-01',7200),bill('gas','2026-11-02',4500)];
 const expenses=[{billId:'luce',dueDate:'2026-11-01',date:'2026-10-26',amountCents:7200,description:'Luce'}];
 const open=openBillOccurrences(bills,expenses);
 assert.deepEqual(open.map(b=>b.id),['gas']);
 assert.deepEqual(deadlineOverview(open,'2026-10-26').next7,{count:1,cents:4500});
});

test('Storico pagate solo dalle spese associate e confermate',()=>{
 const e=[{id:'1',billId:'luce',dueDate:'2026-10-10',date:'2026-10-15',amountCents:6000},
 {id:'2',billId:null,dueDate:null,date:'2026-10-20',amountCents:9000},
 {id:'3',billId:'net',dueDate:'2026-10-12',date:'2026-10-18',amountCents:2000}];
 assert.deepEqual(paidBillExpenses(e).map(x=>x.id),['3','1']);
});

test('Interfaccia filtri effettiva e compatibilità backup',()=>{
 const app=fs.readFileSync(new URL('../assets/app.mjs',import.meta.url),'utf8');
 const db=fs.readFileSync(new URL('../assets/db.mjs',import.meta.url),'utf8');
 for(const word of ['deadlineView','set-deadline-view','go-deadline-filter','deadlineOverview','paidBillExpenses','I totali sono','scadenza'])assert.ok(app.includes(word),word);
 assert.match(db,/DB_NAME='oiko-local-v1', DB_VERSION=1/);
 assert.match(app,/format:'oiko-backup',version:1/);
});
