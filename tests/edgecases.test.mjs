import test from 'node:test';
import assert from 'node:assert/strict';
import {addMonthsClamped,afterPayment,categoryTotals,displayDate,dueStatus,estimatedYearly,escapeHtml,monthShift,parseEuros,safeExternalUrl} from '../assets/logic.mjs';

test('Ricorrenze trimestrali e semestrali mantengono il giorno di origine',()=>{
  assert.equal(afterPayment({frequency:'quarterly',nextDue:'2026-11-30',anchorDay:30}).nextDue,'2027-02-28');
  assert.equal(afterPayment({frequency:'semiannual',nextDue:'2026-08-31',anchorDay:31}).nextDue,'2027-02-28');
  assert.equal(addMonthsClamped('2028-02-29',12,29),'2029-02-28');
});
test('Passaggi di anno e giorni bisestili',()=>{
  assert.equal(monthShift('2026-01',-1),'2025-12');
  assert.equal(displayDate('2028-02-29'),'29/02/2028');
  assert.equal(displayDate('2027-02-29'),'—');
});
test('Gli importi invalidi non vengono accettati',()=>{
  for(const amount of ['0','-3','1,234','12,345','1e3','-0,01','abc','1,2,3'])assert.equal(Number.isNaN(parseEuros(amount)),true,amount);
  assert.equal(parseEuros('0,01'),1);
  assert.equal(parseEuros('1.234,56'),123456);
});
test('Le spese vengono raggruppate nelle categorie corrette',()=>{
 const rows=[{date:'2026-10-01',amountCents:1000,categoryId:'salute-farmacia'},{date:'2026-10-02',amountCents:2300,categoryId:'salute-farmacia'},{date:'2026-10-03',amountCents:500,categoryId:'cura-personale'},{date:'2026-09-30',amountCents:9000,categoryId:'salute-farmacia'}];
 assert.deepEqual(categoryTotals(rows,'2026-10'),{'salute-farmacia':3300,'cura-personale':500});
});
test('Siti esterni: HTTPS, niente URL con credenziali',()=>{
 assert.equal(safeExternalUrl('javascript:alert(1)'),'');
 assert.equal(safeExternalUrl('http://fornitore.it'),'');
 assert.equal(safeExternalUrl('https://utente:password@fornitore.it'),'');
 assert.equal(safeExternalUrl('https://fornitore.it/'),'https://fornitore.it/');
});
test('Scadenze con stato attivo o concluso',()=>{
 assert.equal(dueStatus({active:false,nextDue:'2026-01-01'},'2026-10-23'),'conclusa');
 assert.equal(dueStatus({active:true,nextDue:'2026-10-24'},'2026-10-23'),'in-arrivo');
 assert.equal(estimatedYearly({active:false,frequency:'monthly',amountCents:1200}),0);
});
test('Sanitizzazione dei dati testuali',()=>{
 assert.equal(escapeHtml('<img src=x onerror="alert(1)">'),'&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
});
