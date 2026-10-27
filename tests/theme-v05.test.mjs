import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('v0.5 palette includes violet, yellow and semantic colors',()=>{
 const css=read('assets/styles.css');
 for(const hex of ['#6945EE','#FFD04A','#16835B','#B43A50','#F7F7FC'])assert.ok(css.includes(hex),hex);
});
test('new style keeps paid/overdue states distinct',()=>{
 const css=read('assets/styles.css');
 for(const selector of ['.pill.done','.pill.overdue','.pill.today','.deadline-tabs .deadline-tab.active'])assert.ok(css.includes(selector));
});
test('home install icon and browser theme reflect purple brand',()=>{
 const index=read('index.html'),manifest=JSON.parse(read('manifest.webmanifest')),logo=read('assets/logo.svg');
 assert.equal(manifest.theme_color,'#241956');
 assert.match(index,/styles\.css\?v=0\.(?:5\.[01]|6\.[0-9]+)/);
 assert.match(index,/apple-touch-icon/);
 assert.match(logo,/#33206F/);
});
test('category visuals do not mutate accounting logic',()=>{
 const app=read('assets/app.mjs'),db=read('assets/db.mjs');
 assert.match(app,/const colors=\['#7651F0'/);
 assert.match(db,/DB_NAME='oiko-local-v1', DB_VERSION=1/);
 assert.match(app,/format:'oiko-backup',version:1/);
});
