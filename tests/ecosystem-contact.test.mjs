import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

test('Oiko public product has actionable contact and original MANZO AI emblem',()=>{
 const html=readFileSync('index.html','utf8');
 const css=readFileSync('assets/styles.css','utf8');
 assert.ok(html.includes('mailto:marcelo2020.it@gmail.com'));
 assert.ok(html.includes('Contatti e servizi'));
 assert.ok(html.includes('class="oiko-contact-strip"'));
 assert.ok(html.includes('class="oiko-manzo-signature"'));
 assert.ok(html.includes('https://manzo8b.github.io/manzo-ai/it/'));
 assert.ok(existsSync('assets/manzo-ai-mark.svg'));
 assert.ok(css.includes('.oiko-contact-strip'));
 assert.ok(css.includes('.oiko-manzo-signature'));
});
