export const FREQUENCIES = Object.freeze({once:0,monthly:1,bimonthly:2,quarterly:3,semiannual:6,yearly:12});
export const FREQ_LABELS = Object.freeze({once:'Una volta',monthly:'Mensile',bimonthly:'Bimestrale',quarterly:'Trimestrale',semiannual:'Semestrale',yearly:'Annuale'});
export const TYPE_LABELS = Object.freeze({occasionale:'Occasionale',periodica:'Periodica',ricorrente:'Ricorrente'});
export function isoToday(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function monthNow(d=new Date()){return isoToday(d).slice(0,7);}
export function isIsoDate(s){ if(typeof s !=='string'|| !/^\d{4}-\d{2}-\d{2}$/.test(s))return false; const [y,m,d]=s.split('-').map(Number);return m>=1&&m<=12&&d>=1&&d<=new Date(y,m,0).getDate();}
export function addMonthsClamped(iso, months, anchorDay=+iso.slice(8)){
 if(!isIsoDate(iso) || !Number.isInteger(months))throw new Error('Data non valida');
 const [year,month]=iso.slice(0,7).split('-').map(Number);const index=year*12+(month-1)+months;const targetYear=Math.floor(index/12);const targetMonth=index%12+1;
 const max=new Date(targetYear,targetMonth,0).getDate();const day=Math.min(Math.max(1,Number(anchorDay)||1),max);
 return `${targetYear}-${String(targetMonth).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}
export function parseEuros(value){let s=String(value).trim().replace(/\s/g,'').replace('€','');if(!s)return NaN;
 if(s.includes(',')&&s.includes('.'))s=s.replaceAll('.','').replace(',','.');else if(s.includes(','))s=s.replace(',','.');
 if(!/^\d+(\.\d{1,2})?$/.test(s))return NaN;const [a,b='']=s.split('.');const result=Number(a)*100+Number((b+'00').slice(0,2));return Number.isSafeInteger(result)&&result>0&&result<=999999999?result:NaN;
}
export function euro(cents){return new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format((cents||0)/100);}
export function displayDate(iso){if(!isIsoDate(iso))return '—';const [y,m,d]=iso.split('-');return `${d}/${m}/${y}`;}
export function monthTitle(month){ if(!/^\d{4}-\d{2}$/.test(month)) return month; const [y,m]=month.split('-').map(Number);return new Intl.DateTimeFormat('it-IT',{month:'long',year:'numeric'}).format(new Date(y,m-1,1)); }
export function monthShift(month,offset){return addMonthsClamped(`${month}-01`,offset).slice(0,7);}
export function monthlyTotal(expenses,month){return expenses.filter(e=>e.date.slice(0,7)===month).reduce((sum,e)=>sum+e.amountCents,0);}
export function categoryTotals(expenses,month){const out={};for(const e of expenses){if(e.date.slice(0,7)!==month)continue;out[e.categoryId]=(out[e.categoryId]||0)+e.amountCents;}return out;}
export function dueStatus(bill,today=isoToday()){
 if(!bill.active||!bill.nextDue)return 'conclusa';
 if(bill.nextDue<today)return 'scaduta';
 if(bill.nextDue===today)return 'oggi';
 return 'in-arrivo';
}
export function afterPayment(bill){if(!(bill.frequency in FREQUENCIES))throw new Error('Frequenza sconosciuta');const months=FREQUENCIES[bill.frequency];if(months===0)return {...bill,active:false,nextDue:null};return {...bill,nextDue:addMonthsClamped(bill.nextDue,months,bill.anchorDay || Number(bill.nextDue.slice(8)))};}
export function estimatedYearly(bill){if(!bill.active || bill.frequency==='once')return 0;return Math.round(bill.amountCents*12/FREQUENCIES[bill.frequency]);}
export function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function safeExternalUrl(s){if(!s)return '';try{const url=new URL(s);return url.protocol==='https:' && url.hostname && !url.username && !url.password ? url.href : '';}catch{return '';}}
