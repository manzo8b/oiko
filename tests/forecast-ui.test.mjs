import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const app=fs.readFileSync(new URL('../assets/app.mjs',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../assets/styles.css',import.meta.url),'utf8');
test('la nuova previsione è in Report e collegata da Oggi',()=>{
 assert.match(app,/function renderForecast\(/);
 assert.match(app,/data-action="go-forecast"/);
 assert.match(app,/data-action="select-forecast-month"/);
 assert.match(app,/\+renderForecast\(\)/);
});
test('la previsione resta un grafico accessibile e reattivo',()=>{
 assert.match(app,/aria-pressed="\$\{active\}"/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/\.forecast-chart/);
});
