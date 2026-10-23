import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('each active card has a unique complete local WebP matching the release manifest', async () => {
  const library = JSON.parse(await readFile(new URL('../data/cards.json', import.meta.url)));
  const manifest = JSON.parse(await readFile(new URL('../assets/art/manifest.json', import.meta.url)));
  assert.equal(manifest.total, library.cards.length);
  assert.equal(new Set(library.cards.map(card => card.image)).size, library.cards.length);
  let bytes = 0;
  for (const card of library.cards) {
    assert.match(card.image, /^assets\/art\/cards\/[A-Z]\d{3}\.webp$/);
    const image = await readFile(new URL(`../${card.image}`, import.meta.url));
    assert.equal(image.toString('ascii', 0, 4), 'RIFF');
    assert.equal(image.toString('ascii', 8, 12), 'WEBP');
    const record = manifest.cards.find(entry => entry.id === card.id);
    assert.ok(record);
    assert.equal(record.file, card.image);
    assert.equal(record.bytes, image.length);
    assert.equal(record.sha256, createHash('sha256').update(image).digest('hex'));
    bytes += image.length;
  }
  assert.equal(manifest.totalBytes, bytes);
  assert.ok(bytes < 90 * 1024 * 1024, '225 artworks must fit the 90 MiB release budget');
  const archived = JSON.parse(await readFile(new URL('../data/archive/cards-2026-10-18.json', import.meta.url)));
  assert.deepEqual(new Set(archived.parked.map(card => card.id)), new Set(['W001', 'N025']));
});
