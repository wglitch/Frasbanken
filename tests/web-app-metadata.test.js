import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('home screen manifest, Apple icon and sharing thumbnail resolve under the Pages subpath', async () => {
  const base = 'https://wglitch.github.io/Frasbanken/';
  const manifest = JSON.parse(await readFile(new URL('../manifest.webmanifest', import.meta.url)));
  assert.equal(new URL(manifest.start_url, base).href, base);
  assert.equal(new URL(manifest.scope, base).href, base);
  assert.equal(manifest.display, 'fullscreen');
  for (const [file, width, height] of [...manifest.icons.map(icon => [icon.src, ...icon.sizes.split('x').map(Number)]),
    ['assets/apple-touch-icon.png',180,180], ['assets/share-preview.png',1200,630]]) {
    assert.ok(new URL(file,base).pathname.startsWith('/Frasbanken/assets/'));
    const png = await readFile(new URL(`../${file}`,import.meta.url));
    assert.equal(png.subarray(1,4).toString(),'PNG');
    assert.equal(png.readUInt32BE(16),width);
    assert.equal(png.readUInt32BE(20),height);
  }
  const page = await readFile(new URL('../index.html', import.meta.url),'utf8');
  assert.match(page,/rel="manifest" href="manifest.webmanifest"/);
  assert.match(page,/rel="apple-touch-icon"[^>]*href="assets\/apple-touch-icon.png"/);
  assert.match(page,/name="apple-mobile-web-app-capable" content="yes"/);
  assert.match(page,/property="og:image" content="https:\/\/wglitch.github.io\/Frasbanken\/assets\/share-preview.png"/);
  const workflow = await readFile(new URL('../.github/workflows/pages.yml', import.meta.url),'utf8');
  assert.match(workflow,/cp index.html styles.css app.js manifest.webmanifest public\//);
});
