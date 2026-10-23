import test from 'node:test';
import assert from 'node:assert/strict';
import {matchingCards} from '../lib/repetition.js';
import {Deck} from '../lib/deck.js';
const cards=[{id:'one',category:'storm'},{id:'two',category:'wall'},{id:'three',category:'bridge'}];
test('multiple categories form a union combined with repetition mode, without duplicates',()=>{
 const history={one:{skav:3,senast:'2026-10-23T10:00:00Z'},two:{skav:1,senast:'2026-10-23T10:00:00Z'}};
 assert.deepEqual(matchingCards(cards,history,'all',['wall','storm','wall']).map(c=>c.id),['one','two']);
 assert.deepEqual(matchingCards(cards,history,'high',['wall','storm']).map(c=>c.id),['one']);
 assert.equal(matchingCards(cards,history,'all',[]).length,3);
 assert.deepEqual(matchingCards(cards,history,'unrated',['bridge','wall']).map(c=>c.id),['three']);
});
test('multi-category preview, grading and undo retain filters and previous records',async()=>{
 const deck=new Deck(cards,{},async()=>{},()=>0);
 const selection=['storm','wall'];deck.select('all',selection);selection.push('bridge');
 assert.deepEqual(deck.pool.map(c=>c.id),['one','two']);
 const id=deck.current.id;assert.notEqual(deck.peek().id,id);assert.equal(deck.current.id,id);
 await deck.grade(2);assert.notEqual(deck.current.id,id);
 await deck.back();assert.equal(deck.current.id,id);assert.equal(deck.history[id],undefined);
 deck.select('unrated',deck.category);assert.equal(deck.pool.length,2);
 deck.select('all',null);assert.equal(deck.pool.length,3);
});
