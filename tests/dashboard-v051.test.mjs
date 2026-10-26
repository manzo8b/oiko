import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read = p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('category shares are calculated from month total instead of top expense',()=>{
 const app=read('assets/app.mjs');
 assert.match(app,/value\*100\/total/);
 assert.match(app,/shareLabel\(value,total\)/);
 assert.match(app,/pct\.toFixed\(4\)/);
});
test('dashboard includes readable donut and four leading categories plus others',()=>{
 const app=read('assets/app.mjs');
 assert.match(app,/function spendingDonut/);
 assert.match(app,/ranked\.slice\(0,4\)/);
 assert.match(app,/Altre categorie/);
 assert.match(app,/conic-gradient/);
 assert.match(app,/spendingDonut\(month\)/);
});
test('six month trend labels real zero and visible amounts',()=>{
 const app=read('assets/app.mjs');
 assert.match(app,/function trendChart/);
 assert.match(app,/cents\?Math\.max\(4/);
 assert.match(app,/trend-amount/);
 assert.match(app,/trendChart\(months\)/);
});
test('quick add does not cover dashboard or graphs',()=>{
 const app=read('assets/app.mjs');
 assert.match(app,/quickAdd\.hidden=state\.section!==\x27spese\x27/);
});
test('database and backup are unchanged',()=>{
 assert.match(read('assets/db.mjs'),/DB_NAME=\x27oiko-local-v1\x27, DB_VERSION=1/);
 assert.match(read('assets/app.mjs'),/format:\x27oiko-backup\x27,version:1/);
});
