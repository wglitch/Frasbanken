import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {normalizeLibrary} from '../lib/library.js';
import {matchingCards,mergeHistory} from '../lib/repetition.js';
const json=async path=>JSON.parse(await readFile(new URL(path,import.meta.url)));
test('all 151 existing cards and artworks survive the expansion unchanged',async()=>{
 const before=await json('./fixtures/library-before-2.7.json');
 const current=await json('../data/cards.json');
 assert.deepEqual(current.cards.slice(0,151),before.cards);
 for(const item of before.artwork){
  const bytes=await readFile(new URL(`../${item.file}`,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256);
 }
});
test('74 approved additions have fresh IDs and their reviewed text and artwork mapping',async()=>{
 const current=await json('../data/cards.json');
 const {approvedNewCards}=await json('../reviews/2026-10-23-tillskott.json');
 assert.equal(approvedNewCards.length,74);
 assert.equal(new Set(approvedNewCards.map(c=>c.reviewNumber)).size,74);
 assert.ok(!approvedNewCards.some(c=>['NY038','NY065'].includes(c.reviewNumber)));
 for(const entry of approvedNewCards){
  const card=current.cards.find(c=>c.id===entry.id);
  assert.match(card.id,/^A\d{3}$/);
  assert.equal(card.text,entry.text);
  assert.equal(card.image,entry.image);
  assert.equal(card.primaryCategory,entry.category);
  assert.ok(card.sourceLocation.includes(entry.reviewNumber));
 }
 const archives=await Promise.all(['2026-10-17','2026-10-18'].map(d=>json(`../data/archive/cards-${d}.json`)));
 const collect=value=>Array.isArray(value)?value.flatMap(collect):value&&typeof value==='object'?[...(value.id?[value.id]:[]),...Object.values(value).flatMap(collect)]:[];
 const oldIds=new Set(archives.flatMap(collect));
 assert.ok(approvedNewCards.every(c=>!oldIds.has(c.id)));
});
test('category rename and new cards preserve existing history while additions start unassessed',async()=>{
 const source=await json('../data/cards.json'),views=await json('../data/categories.json');
 const {cards,categories}=normalizeLibrary(source,views);
 assert.equal(categories.find(c=>c.id==='aterkoppla').name,'Spiraltrappan');
 assert.equal(categories.find(c=>c.id==='ledarskap').name,'Schackbrädet');
 const history={F001:{skav:1,senast:'2026-10-22T12:00:00Z'},N037:{skav:3,senast:'2026-10-22T12:00:00Z'}};
 assert.deepEqual(mergeHistory(history,{}).N037,history.N037);
 assert.equal(matchingCards(cards,history,'unrated').filter(c=>c.id.startsWith('A')).length,74);
});
