import test from 'node:test';
import assert from 'node:assert/strict';
import { dragDirection, swipeGrade, releaseAction } from '../lib/gestures.js';

test('short northeast, east and southeast strokes select the same grade from any origin', () => {
  for (const start of [{x:20,y:200},{x:150,y:700},{x:250,y:350}]) {
    for (const [dx,dy,grade] of [[48,-48,3],[60,0,2],[48,48,1]]) {
      const end={x:start.x+dx,y:start.y+dy};
      const x=end.x-start.x,y=end.y-start.y;
      assert.equal(dragDirection(x,y),'right');
      assert.equal(swipeGrade(x,y),grade);
      assert.deepEqual(releaseAction('right',x,y,swipeGrade(x,y),390),{type:'grade',skav:grade});
    }
  }
});

test('taps, undersized strokes, return to origin and navigation never grade', () => {
  for (const [dx,dy] of [[0,0],[30,0],[35,35],[0,-80],[10,-100],[-80,0],[20,80],[45,0]]) {
    assert.equal(swipeGrade(dx,dy),null);
  }
  assert.equal(swipeGrade(70,-45),3);
  assert.equal(swipeGrade(20,-10),null);
  assert.deepEqual(releaseAction('right',20,-10,swipeGrade(20,-10),390),{type:'cancel'});
  assert.equal(dragDirection(4,-90),'up');
  assert.equal(dragDirection(-90,4),'left');
  assert.deepEqual(releaseAction('up',4,-90,null,390),{type:'library'});
  assert.deepEqual(releaseAction('left',-90,4,null,390),{type:'back'});
});

test('sector boundaries leave a generous east sector and reject mostly vertical strokes', () => {
  assert.equal(swipeGrade(80,-30),2);
  assert.equal(swipeGrade(80,-40),3);
  assert.equal(swipeGrade(80,30),2);
  assert.equal(swipeGrade(80,40),1);
  assert.equal(swipeGrade(30,-100),null);
});
