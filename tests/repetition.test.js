import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { matchingCards, pickNext, weightFor, validateHistory, mergeHistory, validateLibrary } from '../lib/repetition.js';
import { normalizeLibrary } from '../lib/library.js';
import { archivePrototypeHistory } from '../lib/history-migration.js';

const source = JSON.parse(await readFile(new URL('../data/cards.json', import.meta.url)));
const views = JSON.parse(await readFile(new URL('../data/categories.json', import.meta.url)));
const { cards, categories } = normalizeLibrary(source, views);
const date = '2026-10-16T14:30:00.000Z';

test('revised library preserves 151 cards, 12 category definitions and all three types', () => {
  validateLibrary(cards, categories);
  assert.equal(cards.length, 151);
  assert.ok(!cards.some(card => ['W001', 'N025'].includes(card.id)));
  assert.equal(categories.length, 12);
  assert.equal(new Set(cards.map(card => card.category)).size, 11);
  assert.deepEqual(new Set(cards.map(card => card.type)), new Set(['phrase', 'template', 'method']));
  assert.deepEqual(categories.filter(category => !cards.some(card => card.category === category.id)).map(category => category.id), ['delegera']);
  assert.deepEqual(cards.map(({category, ...card}) => card), source.cards);
  assert.throws(() => validateLibrary([...cards, cards[0]], categories));
});

test('every referenced image exists, including a Pages subpath', async () => {
  for (const category of categories) {
    const svg = await readFile(new URL(`../${category.image}`, import.meta.url), 'utf8');
    assert.match(svg, /<svg/);
    assert.equal(new URL(category.image, 'https://example.org/frasbanken/').pathname, `/frasbanken/${category.image}`);
  }
});

test('filters combine mode with category and regard null as unassessed', () => {
  const sample = [
    { id: 'F001', category: 'utforskaren' },
    { id: 'F002', category: 'utforskaren' },
    { id: 'F003', category: 'utforskaren' },
    { id: 'F004', category: 'spegeln' }
  ];
  const history = { F001: { skav: 1, senast: date }, F002: { skav: 3, senast: date }, F003: { skav: null, senast: date } };
  assert.equal(matchingCards(sample, history, 'all').length, 4);
  assert.deepEqual(matchingCards(sample, history, 'high', 'utforskaren').map(c => c.id), ['F002']);
  assert.deepEqual(matchingCards(sample, history, 'unrated', 'utforskaren').map(c => c.id), ['F003']);
  assert.equal(matchingCards(sample, history, 'high', 'spegeln').length, 0);
});

test('prototype ratings are archived without being applied to different phrases', () => {
  const record = {skav: 3, senast: date};
  const migrated = archivePrototypeHistory({F001: record, F018: record, F019: record, N001: record});
  assert.equal(migrated.F001, undefined);
  assert.deepEqual(migrated['DEMO-F001'], record);
  assert.deepEqual(migrated['DEMO-F018'], record);
  assert.deepEqual(migrated.F019, record);
  assert.deepEqual(migrated.N001, record);
});

test('supports methods with and without structured steps and flat prototype libraries', () => {
  const flat = [{id:'M1',type:'method',text:'Lyssna.',category:'pausa',functions:[]}];
  validateLibrary(flat, categories);
  validateLibrary([{...flat[0],steps:['Lyssna.','Vänta.']}],categories);
  assert.throws(() => validateLibrary([{...flat[0],steps:'fel'}],categories));
  assert.deepEqual(normalizeLibrary(flat, categories), {cards:flat,categories});
});

test('never immediately repeats a card when an alternative exists', () => {
  for (let i = 0; i < 1000; i++) assert.notEqual(pickNext(cards, {}, 'F001', () => i / 1000).id, 'F001');
  assert.equal(pickNext([cards[0]], {}, 'F001').id, 'F001');
  assert.equal(pickNext([], {}), null);
});

test('unassessed and higher friction receive priority while familiar cards remain eligible', () => {
  const now = Date.parse(date);
  const weights = [null, 3, 2, 1].map(skav => weightFor({ skav, senast: date }, now));
  assert.ok(weights.every((weight, index) => index === 0 || weights[index - 1] > weight));
  assert.ok(weights[3] > 0);
  assert.ok(weightFor({ skav: 2, senast: '2026-01-01T00:00:00Z' }, now) > weights[2]);
  const seen = new Set();
  for (let i = 0; i < 100; i++) seen.add(pickNext(cards.slice(0, 2), { F001: { skav: 3, senast: date }, F002: { skav: 1, senast: date } }, null, () => i / 100, now).id);
  assert.equal(seen.size, 2);
});

test('export/import round trip preserves unassessed and removed card records', () => {
  const history = { F001: { skav: null, senast: date }, REMOVED: { skav: 3, senast: date } };
  assert.deepEqual(JSON.parse(JSON.stringify(validateHistory(JSON.parse(JSON.stringify(history))))), history);
});

test('invalid imports rejected before writing, including prototype keys', () => {
  for (const value of [null, [], { F001: { skav: 4, senast: date } }, { F001: { skav: 1, senast: 'nonsense' } }, { F001: { skav: '2', senast: date } }, { F001: { skav: 1 } }, JSON.parse('{"__proto__":{"skav":1,"senast":"2026-10-16T14:30:00Z"}}')]) assert.throws(() => validateHistory(value));
});

test('merge uses latest timestamp and retains unknown IDs across library updates', () => {
  const old = { skav: 3, senast: '2026-01-01T00:00:00Z' };
  const recent = { skav: 1, senast: date };
  const merged = mergeHistory({ F001: recent, ARCHIVED: old }, { F001: old, F002: recent });
  assert.deepEqual(merged.F001, recent);
  assert.deepEqual(merged.ARCHIVED, old);
  assert.deepEqual(merged.F002, recent);
  assert.deepEqual(mergeHistory({ F001: old }, { F001: recent }).F001, recent);
});
