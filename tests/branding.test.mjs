import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>readFileSync(resolve(root,p),'utf8');

test('Oiko v0.2: il claim coincide fra brand, dashboard e manifest',()=>{
 const index=read('index.html'),app=read('assets/app.mjs'),manifest=JSON.parse(read('manifest.webmanifest'));
 assert.match(index,/LA TUA CASA È OK\./);
 assert.match(app,/La tua casa è OK\./);
 assert.match(manifest.name,/La tua casa è OK\./);
});

test('Risorse installabili presenti e senza dipendenze remote',()=>{
 const html=read('index.html');
 for(const path of ['assets/logo.svg','assets/icon-180.png','assets/icon-192.png','assets/icon-512.png','manifest.webmanifest'])assert.ok(existsSync(resolve(root,path)),path);
 assert.match(html,/rel="manifest"/);
 assert.match(html,/apple-touch-icon/);
 const manifest=JSON.parse(read('manifest.webmanifest'));
 assert.equal(manifest.scope,'./');
 assert.equal(manifest.start_url,'./');
 assert.equal(manifest.display,'standalone');
});

test('Navigazione mobile e inserimento rapido realmente collegati',()=>{
 const html=read('index.html'), app=read('assets/app.mjs');
 assert.match(html,/id="mobile-quick-add"/);
 assert.match(app,/getElementById|querySelector\('#mobile-quick-add'\)/);
 assert.match(app,/addEventListener\('click',\(\)=>openExpense\(\)\)/);
 assert.match(app,/data-action="add-expense"/);
});

test('Restyling non cambia lo schema di archiviazione né il formato di backup',()=>{
 const db=read('assets/db.mjs'),app=read('assets/app.mjs');
 assert.match(db,/DB_NAME='oiko-local-v1', DB_VERSION=1/);
 assert.match(app,/format:'oiko-backup',version:1/);
 assert.match(app,/const expense=\{id:/);
});
