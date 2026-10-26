import test from 'node:test';
import assert from 'node:assert/strict';
import {forecastBills} from '../assets/logic.mjs';
const b=(id,nextDue,amountCents,frequency='monthly',extra={})=>({id,name:id,nextDue,anchorDay:Number(nextDue.slice(8)),amountCents,frequency,active:true,categoryId:'casa-utenze',...extra});

test('mensile 31 gennaio: febbraio corto e ritorno al 31 marzo',()=>{
 const r=forecastBills([b('luce','2027-01-31',6800)],[],'2027-01-01',4);
 assert.deepEqual(r.months.map(x=>x.items.map(i=>i.date)),[['2027-01-31'],['2027-02-28'],['2027-03-31'],['2027-04-30']]);
 assert.equal(r.totalCents,27200);
});
test('data bisestile preservata',()=>{
 const r=forecastBills([b('luce','2028-01-31',5000)],[],'2028-01-01',3);
 assert.equal(r.months[1].items[0].date,'2028-02-29');
});
test('bimestrale, trimestrale, semestrale, annuale',()=>{
 for(const [frequency,expected] of [['bimonthly',['2026-10','2026-12','2027-02','2027-04']],['quarterly',['2026-10','2027-01','2027-04']],['semiannual',['2026-10','2027-04']],['yearly',['2026-10']]]){
  const r=forecastBills([b(frequency,'2026-10-29',100,frequency)],[],'2026-10-26',8);
  assert.deepEqual(r.months.filter(x=>x.count).map(x=>x.month),expected);
 }
});
test('bolletta una tantum solo in un mese',()=>{
 const r=forecastBills([b('spesa','2026-11-10',1500,'once')],[],'2026-10-26');
 assert.equal(r.totalCents,1500);assert.equal(r.months[1].count,1);
});
test('arretrati non entrano mai nei mesi futuri',()=>{
 const r=forecastBills([b('spotify','2026-10-23',1999),b('gas','2026-11-01',4000)],[],'2026-10-26');
 assert.equal(r.overdueCents,1999);assert.equal(r.overdue.length,1);assert.equal(r.months[0].cents,0);assert.equal(r.months[1].cents,4000);
});
test('pagamento confermato esclude l occorrenza ma non quella successiva',()=>{
 const r=forecastBills([b('luce','2026-10-29',7800)],[{billId:'luce',dueDate:'2026-10-29',date:'2026-10-29',amountCents:7800}],'2026-10-26',3);
 assert.deepEqual(r.months.map(x=>x.cents),[0,7800,7800]);
});
test('scadenza sospesa o conclusa ignorata',()=>{
 const r=forecastBills([b('old','2026-10-30',9999,'monthly',{active:false}),b('done','2026-11-10',100,'once',{active:false})],[],'2026-10-26');
 assert.equal(r.totalCents,0);
});
test('oggi è incluso, ieri è arretrato',()=>{
 const r=forecastBills([b('oggi','2026-10-26',300),b('ieri','2026-10-25',500)],[],'2026-10-26');
 assert.equal(r.months[0].cents,300);assert.equal(r.overdueCents,500);
});
test('date ISO e finestra non valide vengono rifiutate',()=>{
 assert.throws(()=>forecastBills([],[],'2026-13-20',6));
 assert.throws(()=>forecastBills([],[],'2026-10-26',0));
 assert.throws(()=>forecastBills([],[],'2026-10-26',13));
});
test('schema risultato immutabile dal punto di vista dei record',()=>{
 const bill=b('luce','2026-10-31',6800);const source=[bill];
 forecastBills(source,[],'2026-10-26',6);
 assert.equal(bill.nextDue,'2026-10-31');assert.equal(source.length,1);
});
test('ignora valori pericolosi e tipi non previsti',()=>{
 const r=forecastBills([b('invalid','2026-10-30',NaN),b('bad','2026-11-20',100,'daily')],[],'2026-10-26');
 assert.equal(r.totalCents,0);
});
test('importi e totali numericamente esatti in centesimi',()=>{
 const r=forecastBills([b('one','2026-10-27',101,'once'),b('two','2026-10-28',202,'once')],[],'2026-10-26');
 assert.equal(r.months[0].cents,303);assert.equal(r.totalCents,303);
});
