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
