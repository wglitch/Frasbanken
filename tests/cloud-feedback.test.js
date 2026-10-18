import test from 'node:test';
import assert from 'node:assert/strict';
import { CloudFeedback } from '../lib/cloud-feedback.js';

function fixture() {
  const states = [], scheduled = [], cancelled = [];
  const feedback = new CloudFeedback(state => states.push(state), {
    schedule(callback, delay) { const timer = {callback, delay}; scheduled.push(timer); return timer; },
    unschedule(timer) { cancelled.push(timer); }
  });
  return {feedback, states, scheduled, cancelled};
}

test('release keeps its starting emphasis through the card transition and cleans up automatically', () => {
  const {feedback, states, scheduled} = fixture();
  const weights = {1:0,2:.4,3:.6};
  feedback.preview(3,weights);
  feedback.hold(3);
  feedback.reset(); // render() resets the card while storage/animation runs.
  assert.deepEqual(states.at(-1), {phase:'pending', target:3, weights});
  feedback.confirm(3);
  feedback.reset(); // outgoing animation finishes at 300 ms, receipt must remain.
  assert.deepEqual(states.at(-1), {phase:'confirmed', target:3, weights});
  assert.equal(scheduled[0].delay,760);
  scheduled[0].callback();
  assert.deepEqual(states.at(-1), {phase:'hidden', target:null, weights:{1:0,2:0,3:0}});
});

test('a new drag replaces the old receipt and its old timer cannot hide the new choice', () => {
  const {feedback, states, scheduled, cancelled} = fixture();
  feedback.confirm(1);
  const old = scheduled[0];
  feedback.clear();
  feedback.preview(2);
  assert.ok(cancelled.includes(old));
  old.callback(); // Even an already queued callback must be harmless.
  assert.deepEqual(states.at(-1), {phase:'preview', target:2, weights:{1:0,2:1,3:0}});
});

test('an abandoned drag or failed save can be cleared without a confirmation', () => {
  const {feedback, states, scheduled} = fixture();
  feedback.preview(2);
  feedback.reset();
  assert.equal(states.at(-1).phase,'hidden');
  feedback.hold(1);
  feedback.clear();
  assert.equal(states.at(-1).phase,'hidden');
  assert.equal(states.some(state => state.phase === 'confirmed'),false);
  assert.equal(scheduled.length,0);
});

test('native timers are called without binding them to the feedback instance', () => {
  const originalSet = globalThis.setTimeout, originalClear = globalThis.clearTimeout;
  let feedback, scheduled = false, cancelled = false;
  try {
    globalThis.setTimeout = function(callback, delay) {
      assert.notEqual(this, feedback, 'browser timers reject a custom receiver');
      assert.equal(delay,760);
      scheduled = true;
      return 7;
    };
    globalThis.clearTimeout = function(timer) {
      assert.notEqual(this, feedback);
      assert.equal(timer,7);
      cancelled = true;
    };
    feedback = new CloudFeedback(() => {});
    feedback.confirm(2);
    feedback.clear();
    assert.ok(scheduled && cancelled);
  } finally {
    globalThis.setTimeout = originalSet;
    globalThis.clearTimeout = originalClear;
  }
});
