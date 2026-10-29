import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const packageInfo = JSON.parse(read('package.json'));
const index = read('index.html');
const manifest = JSON.parse(read('manifest.webmanifest'));
const catalog = JSON.parse(read('config/product-catalog.json'));

test('The published entry references versioned existing app assets', () => {
  assert.match(index, /<main id="content"/);
  assert.match(index, /id="side-nav"/);
  assert.match(index, /id="bottom-nav"/);
  assert.ok(index.includes(`./assets/styles.css?v=${packageInfo.version}`));
  assert.ok(index.includes(`./assets/app.mjs?v=${packageInfo.version}`));
  assert.ok(existsSync(new URL('assets/styles.css', root)));
  assert.ok(existsSync(new URL('assets/app.mjs', root)));
});

test('All manifest icon files exist and the app is scoped locally', () => {
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  assert.equal(manifest.display, 'standalone');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);
  for (const icon of manifest.icons) {
    assert.match(icon.src, /^\.\/assets\//);
    assert.ok(existsSync(new URL(icon.src.split('?')[0], root)), icon.src);
  }
});

test('Oiko Solo retains its independent local storage boundary', () => {
  const db = read('assets/db.mjs');
  assert.match(db, /DB_NAME='oiko-local-v1', DB_VERSION=1/);
  assert.match(db, /indexedDB\.open\(DB_NAME,DB_VERSION\)/);
  assert.equal(catalog.modes.oiko.price_model, 'free');
  assert.equal(catalog.modes.oiko.account_required, false);
  assert.equal(catalog.modes.oiko.data_location, 'browser-indexeddb');
  assert.equal(catalog.modes.oiko.cloud_backup, false);
});

test('Backup identity stays compatible with existing user files', () => {
  const app = read('assets/app.mjs');
  assert.ok(app.includes("format:'oiko-backup',version:1"));
  assert.ok(app.includes("raw.format!=='oiko-backup'||raw.version!==1"));
});

test('Family beta remains distinct and no checkout is enabled', () => {
  assert.equal(catalog.modes.family.automatic_local_data_migration, false);
  assert.equal(catalog.modes.family.checkout_enabled, false);
  assert.equal(catalog.deployment.consumer_checkout_enabled, false);
});
