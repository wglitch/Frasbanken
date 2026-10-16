import test from 'node:test';
import assert from 'node:assert/strict';
import { Deck } from '../lib/deck.js';
import { basketAt, dragDirection, releaseAction } from '../lib/gestures.js';
import { artworkSources, localArtwork } from '../lib/artwork.js';
import { matchingCards } from '../lib/repetition.js';
import { normalizeLibrary } from '../lib/library.js';

const cards = [{id:'A',category:'one'},{id:'B',category:'one'},{id:'C',category:'two'}];
function fixture(initial = {}) {
  const disk = structuredClone(initial);
  const writes = [];
  const deck = new Deck(cards,structuredClone(initial),async records => {
    writes.push(structuredClone(records));
    for (const [id,record] of Object.entries(records)) {
      if (record === null) delete disk[id];
      else disk[id] = structuredClone(record);
    }
  },() => 0);
  return {deck,disk,writes};
}

test('sort saves exact ID and timestamp and immediately deals a different card',async () => {
  const {deck,disk} = fixture();
  assert.equal(deck.current.id,'A');
  await deck.grade(3);
  assert.equal(disk.A.skav,3);
  assert.ok(Number.isFinite(Date.parse(disk.A.senast)));
  assert.equal(deck.current.id,'B');
  assert.equal(deck.trail.length,1);
});

test('back removes a new rating durably and regrading resumes the suspended card',async () => {
  const {deck,disk} = fixture();
  await deck.grade(3);
  await deck.back();
  assert.equal(deck.current.id,'A');
  assert.equal(disk.A,undefined);
  assert.equal(deck.history.A,undefined);
  await deck.grade(1);
  assert.equal(disk.A.skav,1);
  assert.equal(deck.current.id,'B');
});

test('back restores the original rating AND last-completed time',async () => {
  const old = {skav:2,senast:'2026-10-01T10:00:00Z'};
  const {deck,disk} = fixture({A:old});
  await deck.grade(3);
  await deck.back();
  assert.deepEqual(disk.A,old);
  assert.deepEqual(deck.history.A,old);
});

test('multiple corrections unwind in sequence and preserve other cards',async () => {
  const {deck,disk} = fixture({ARCHIVED:{skav:1,senast:'2026-01-01T00:00:00Z'}});
  await deck.grade(3); // A -> B
  await deck.grade(2); // B -> A (weighted selection)
  await deck.back(); // -> B
  assert.equal(deck.current.id,'B');
  await deck.back(); // -> A
  assert.equal(deck.current.id,'A');
  assert.equal(disk.A,undefined);
  assert.equal(disk.B,undefined);
  assert.ok(disk.ARCHIVED);
  assert.equal(await deck.back(),false);
});

test('failed writes and failed undo leave both the visible card and model unchanged',async () => {
  const {deck} = fixture();
  const persist = deck.persist;
  deck.persist = async () => {throw new Error('disk full');};
  await assert.rejects(deck.grade(3));
  assert.equal(deck.current.id,'A');
  assert.deepEqual(deck.history,{});
  assert.equal(deck.trail.length,0);
  deck.persist = persist;
  await deck.grade(2);
  const history = structuredClone(deck.history);
  deck.persist = async () => {throw new Error('disk full');};
  await assert.rejects(deck.back());
  assert.equal(deck.current.id,'B');
  assert.deepEqual(deck.history,history);
  assert.equal(deck.trail.length,1);
  assert.equal(deck.busy,false);
});

test('rapid repeated actions cannot save twice while storage is pending',async () => {
  const {deck,writes} = fixture();
  const persist = deck.persist;
  let finish;
  deck.persist = async records => {await new Promise(resolve => {finish=resolve;});await persist(records);};
  const first = deck.grade(1);
  assert.equal(await deck.grade(3),false);
  assert.equal(await deck.back(),false);
  finish();
  await first;
  assert.equal(writes.length,1);
});

test('undo works after a filtered deck becomes empty, including one-card decks',async () => {
  const {deck,disk} = fixture();
  deck.select('unrated','two');
  assert.equal(deck.current.id,'C');
  await deck.grade(1);
  assert.equal(deck.current,null);
  await deck.back();
  assert.equal(deck.current.id,'C');
  assert.equal(disk.C,undefined);
  await deck.grade(null);
  assert.equal(disk.C.skav,null);
  assert.equal(deck.current.id,'C');
});

test('filter changes preserve undo, while import clears the trail without erasing history',async () => {
  const {deck,disk} = fixture();
  await deck.grade(2);
  deck.select('all','two');
  assert.equal(deck.trail.length,1);
  assert.equal(disk.A.skav,2);
  await deck.back();
  assert.equal(deck.current.id,'A');
  assert.equal(disk.A,undefined);
  deck.select('all','two');
  await deck.grade(3);
  deck.replaceHistory({C:{skav:1,senast:'2026-10-16T10:00:00Z'}});
  assert.equal(deck.trail.length,0);
  assert.equal(deck.history.C.skav,1);
});

const baskets = [
  {left:280,right:380,top:100,bottom:200,skav:3},
  {left:280,right:380,top:220,bottom:320,skav:2},
  {left:280,right:380,top:340,bottom:440,skav:1}
];
test('target geometry distinguishes all baskets and rejects gaps and outside drops', () => {
  assert.equal(basketAt(330,150,baskets),3);
  assert.equal(basketAt(330,250,baskets),2);
  assert.equal(basketAt(330,390,baskets),1);
  assert.equal(basketAt(330,210,baskets),null);
  assert.equal(basketAt(279,150,baskets),null);
  assert.equal(basketAt(381,150,baskets),null);
});

test('gesture intent prevents left and up swipes from registering any rating', () => {
  assert.equal(dragDirection(5,4),null);
  assert.equal(dragDirection(60,60),null);
  assert.equal(dragDirection(30,2),'right');
  assert.equal(dragDirection(-30,2),'left');
  assert.equal(dragDirection(2,-30),'up');
  assert.equal(dragDirection(2,30),'cancel');
  assert.deepEqual(releaseAction('left',-100,0,3,350),{type:'back'});
  assert.deepEqual(releaseAction('up',0,-100,3,350),{type:'library'});
  assert.deepEqual(releaseAction('right',100,0,null,350),{type:'cancel'});
  assert.deepEqual(releaseAction('right',100,50,2,350),{type:'grade',skav:2});
  assert.deepEqual(releaseAction('right',-20,50,2,350),{type:'cancel'});
  assert.deepEqual(releaseAction('left',-15,0,3,350),{type:'cancel'});
});

test('rated and unassessed filters use explicit ratings, including null', () => {
  const history = {A:{skav:1},B:{skav:null}};
  assert.deepEqual(matchingCards(cards,history,'rated').map(c=>c.id),['A']);
  assert.deepEqual(matchingCards(cards,history,'unrated').map(c=>c.id),['B','C']);
});

test('new categories appear automatically and artwork falls back without remote requests', () => {
  const library = {schemaVersion:1,cards:[],categories:[{id:'new',name:'Ny värld',image:'assets/new.webp'}]};
  const {categories} = normalizeLibrary(library,[]);
  assert.equal(categories[0].name,'Ny värld');
  assert.equal(categories[0].image,'assets/new.webp');
  assert.deepEqual(artworkSources({image:'assets/card.webp'},{image:'assets/world.webp'}),['assets/card.webp','assets/world.webp','assets/placeholder.svg']);
  const base = 'https://wglitch.github.io/Frasbanken/';
  assert.equal(localArtwork('assets/card.webp',base),base+'assets/card.webp');
  assert.equal(localArtwork('https://tracking.example/pixel',base),null);
  assert.equal(localArtwork('javascript:alert(1)',base),null);
  assert.equal(localArtwork('data:image/svg+xml,test',base),null);
});
