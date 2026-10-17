import test from 'node:test';
import assert from 'node:assert/strict';
import { sortingMotion, CardMotion } from '../lib/card-motion.js';
import { Deck } from '../lib/deck.js';

const context = {width:390,height:844,origin:{x:180,y:400},target:{left:281,right:381,top:330,bottom:490},start:'translate3d(140px,0,0) rotate(4deg) scale(.94)'};

test('sort motions overlap, end within 300 ms and move the incoming art from the left', () => {
  const plan = sortingMotion(context);
  assert.equal(plan.outOptions.duration,200);
  assert.equal(plan.inOptions.duration,280);
  assert.equal(Math.max(plan.outOptions.duration,plan.inOptions.delay+plan.inOptions.duration),300);
  assert.equal(plan.outgoing[0].transform,context.start);
  assert.match(plan.outgoing[1].transform,/rotate\(10deg\) scale\(/);
  assert.equal(plan.outgoing[1].opacity,0);
  assert.equal(plan.incoming[0].transform,'translate3d(-100%,0,0)');
  assert.equal(plan.incoming[1].transform,'translate3d(0,0,0)');
});

test('reduced-motion mode only fades without translation, scaling or rotation', () => {
  const plan = sortingMotion({...context,reduced:true});
  assert.equal(plan.outOptions.duration,90);
  assert.equal(plan.inOptions.duration,90);
  for (const frame of [...plan.outgoing,...plan.incoming]) {
    assert.deepEqual(Object.keys(frame),['opacity']);
  }
});

function fakeElement(calls) {
  let resolve, reject;
  const finished = new Promise((yes,no) => {resolve=yes;reject=no;});
  return {
    removed:false,
    animate(frames,options) {
      calls.push({frames,options});
      return {finished,cancel:() => reject(new Error('cancelled'))};
    },
    finish:() => resolve(),
    remove() {this.removed=true;}
  };
}

test('transition holds its lock until BOTH animations finish and rejects duplicate play', async () => {
  const calls = [], outgoing = fakeElement(calls), incoming = fakeElement(calls);
  const motion = new CardMotion();
  const playing = motion.play(outgoing,incoming,context);
  assert.equal(calls.length,2); // Both are started synchronously, not sequentially.
  assert.equal(motion.busy,true);
  assert.equal(await motion.play(outgoing,incoming,context),false);
  outgoing.finish();
  await Promise.resolve();
  assert.equal(motion.busy,true);
  incoming.finish();
  await playing;
  assert.equal(motion.busy,false);
  assert.equal(outgoing.removed,true);
});

test('cancelled/backgrounded animation settles and removes the outgoing layer', async () => {
  const calls = [], outgoing = fakeElement(calls), incoming = fakeElement(calls);
  const motion = new CardMotion();
  const playing = motion.play(outgoing,incoming,context);
  motion.cancel();
  await playing;
  assert.equal(outgoing.removed,true);
  assert.equal(motion.busy,false);
  assert.deepEqual(motion.animations,[]);
});

test('peek uses the existing selection unchanged and does not mutate history or undo/forward', async () => {
  const cards = [{id:'A',category:'one'},{id:'B',category:'one'},{id:'C',category:'two'}];
  for (const mode of ['all','high','unrated','rated']) {
    for (const skav of [1,2,3,null]) {
      const deck = new Deck(cards,{A:{skav:3,senast:'2026-10-16T10:00:00Z'},B:{skav:1,senast:'2026-10-16T10:00:00Z'}},async () => {},() => .53);
      deck.select(mode);
      const before = JSON.stringify({current:deck.current,history:deck.history,forward:deck.forward,trail:deck.trail});
      const preview = deck.peek(skav);
      assert.equal(JSON.stringify({current:deck.current,history:deck.history,forward:deck.forward,trail:deck.trail}),before);
      await deck.grade(skav);
      assert.equal(deck.current?.id,preview?.id,`${mode}, ${skav}`);
    }
  }
});

test('preview respects the suspended card after undo and empty filtered decks', async () => {
  const cards = [{id:'A',category:'one'},{id:'B',category:'one'}];
  const deck = new Deck(cards,{},async () => {},() => 0);
  await deck.grade(2);
  await deck.back();
  assert.equal(deck.peek(1).id,'B');
  assert.equal(deck.forward.length,1);
  await deck.grade(1);
  assert.equal(deck.current.id,'B');
  deck.select('unrated');
  assert.equal(deck.peek(3),null);
  await deck.grade(3);
  assert.equal(deck.current,null);
});
