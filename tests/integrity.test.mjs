import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function text(file){return readFileSync(path.join(root,file),'utf8');}
test('Risorse necessarie per GitHub Pages presenti',()=>{
 for(const file of ['index.html','.nojekyll','assets/app.mjs','assets/logic.mjs','assets/db.mjs','assets/styles.css','assets/logo.svg','data/categories.json'])assert.ok(existsSync(path.join(root,file)),file);
 const index=text('index.html');assert.match(index,/\.\/assets\/app\.mjs/);assert.match(index,/\.\/assets\/styles\.css/);assert.match(index,/Content-Security-Policy/);
 assert.ok(!/https?:\/\//.test(index.match(/<script[^>]*src=["'][^"']+/)?.[0]||''),'Nessuno script terzo incluso');
});
test('Categorie e sottocategorie sono uniche e complete',()=>{
 const raw=JSON.parse(text('data/categories.json'));
 assert.ok(raw.categories.length===12,'12 categorie');
 const ids=new Set();let n=0;
 for(const cat of raw.categories){assert.ok(cat.id && cat.label);assert.ok(!ids.has(cat.id));ids.add(cat.id);const subs=new Set();for(const sub of cat.subcategories){assert.ok(sub.id&&sub.label);assert.ok(!subs.has(sub.id));subs.add(sub.id);n++;}}
 assert.ok(n>=70,`Attese almeno 70 sottocategorie, trovate ${n}`);
 const labels=raw.categories.map(c=>c.label.toLowerCase()).join(' ');
 for(const expected of ['supermercato','abbigliamento','farmacia','cura personale']) assert.ok(labels.includes(expected),expected);
});
test('App usa percorsi relativi per funzionare in /oiko/',()=>{
 const js=text('assets/app.mjs');assert.match(js,/fetch\('\.\/data\/categories\.json'\)/);
 assert.ok(!js.includes('window.location.origin +'));assert.ok(!js.includes('fetch("https://'));
});
