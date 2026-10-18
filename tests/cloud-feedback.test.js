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

test('committed cloud survives card reset for one second and then disappears', () => {
  const {feedback, states, scheduled} = fixture();
  feedback.preview(3);
  feedback.hold(3);
  feedback.reset(); // render() resets the card while storage/animation runs.
  assert.deepEqual(states.at(-1), {phase:'pending', target:3});
  feedback.confirm(3);
  feedback.reset(); // outgoing animation finishes at 300 ms, receipt must remain.
  assert.deepEqual(states.at(-1), {phase:'confirmed', target:3});
  assert.equal(scheduled[0].delay,1000);
  scheduled[0].callback();
  assert.deepEqual(states.at(-1), {phase:'hidden', target:null});
});

test('a new drag replaces the old receipt and its old timer cannot hide the new choice', () => {
  const {feedback, states, scheduled, cancelled} = fixture();
  feedback.confirm(1);
  const old = scheduled[0];
  feedback.clear();
  feedback.preview(2);
  assert.ok(cancelled.includes(old));
  old.callback(); // Even an already queued callback must be harmless.
  assert.deepEqual(states.at(-1), {phase:'preview', target:2});
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
