import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../assets/app.mjs', import.meta.url), 'utf8');
const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const db = readFileSync(new URL('../assets/db.mjs', import.meta.url), 'utf8');

test('Oiko locale continua senza account e mantiene IndexedDB', () => {
  assert.match(app, /state\.db\s*=\s*await openDatabase\(\)/);
  assert.doesNotMatch(app, /signInWithPassword|signInWithOtp|createClient\(/);
  assert.match(db, /indexedDB/);
});

test('La sezione Family è raggiungibile su mobile e desktop', () => {
  assert.match(index, /topbar-family-link/);
  assert.match(index, /sidebar-family-link/);
  assert.match(app, /case 'family':renderFamily\(\)/);
  assert.match(app, /slug==='family'/);
});

test('La beta Family non importa silenziosamente il registro locale', () => {
  assert.match(app, /non vengono trasferite automaticamente/i);
  assert.match(app, /beta privata/i);
  assert.match(app, /target="_blank" rel="noopener noreferrer"/);
});

test('La modalità senza account mantiene una politica CSP chiusa', () => {
  assert.match(index, /connect-src 'self'/);
  assert.match(index, /form-action 'none'/);
  assert.doesNotMatch(index, /supabase\.co/);
});

test('La navigazione mobile conserva le cinque sezioni principali', () => {
  const sectionLine = app.match(/const sections=\[.*?\];/s)?.[0] ?? '';
  assert.equal((sectionLine.match(/\['(?:oggi|spese|scadenze|report|impostazioni)'/g) ?? []).length, 5);
  assert.doesNotMatch(sectionLine, /'family'/);
});

test('La sidebar presenta la privacy in una card visiva con la promessa esplicita', () => {
  const css = readFileSync(new URL('../assets/styles.css', import.meta.url), 'utf8');
  assert.match(index, /oiko-trust-card/);
  assert.match(index, /oiko-trust-smile/);
  assert.match(index, /Più ordine,/);
  assert.match(index, /Solo sul tuo dispositivo/);
  assert.match(index, /Nessun conto collegato/);
  assert.match(index, /Nessun dato personale viene inviato ai server Oiko\./);
  assert.match(css, /\.oiko-trust-card\s*\{/);
  assert.match(index, /styles\.css\?v=0\.6\.3/);
  assert.doesNotMatch(index, /Nessun dato inviato a Oiko\./);
});

test('La dashboard presenta Oiko come micro-app pratica senza forzare un account',()=>{
 assert.match(app,/OIKO · LA MICRO-APP DI CASA/);
 assert.match(app,/La micro-app pratica per registrare le spese di casa/);
 assert.match(app,/Gratis, senza account/);
 assert.match(app,/Dati sul tuo dispositivo/);
 assert.match(app,/Disponibile ora in beta privata/);
 assert.match(index,/styles\.css\?v=0\.6\.3/);
 assert.match(index,/app\.mjs\?v=0\.6\.3/);
 assert.match(index,/Con Oiko Family puoi condividere la gestione in due/);
});
