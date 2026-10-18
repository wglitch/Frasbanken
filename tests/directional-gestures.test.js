import test from 'node:test';
import assert from 'node:assert/strict';
import { dragDirection, swipeGrade, releaseAction, cloudWeights } from '../lib/gestures.js';

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

test('small release movements keep the highlighted sector while deliberate changes still work', () => {
  assert.equal(swipeGrade(80,-36,2),2);
  assert.equal(swipeGrade(80,-28,3),3);
  assert.equal(swipeGrade(80,36,2),2);
  assert.equal(swipeGrade(80,28,1),1);
  assert.equal(swipeGrade(80,-55,2),3);
  assert.equal(swipeGrade(80,55,2),1);
  assert.equal(swipeGrade(80,0,3),2);
  assert.equal(swipeGrade(20,-10,3),null);
});

test('cloud emphasis blends only adjacent choices smoothly across the whole rightward arc', () => {
  assert.deepEqual(cloudWeights(100,0),{1:0,2:1,3:0});
  assert.deepEqual(cloudWeights(100,100),{1:1,2:0,3:0});
  assert.deepEqual(cloudWeights(100,-100),{1:0,2:0,3:1});
  for(const sign of [-1,1]) {
    const w=cloudWeights(100,sign*100*Math.tan(Math.PI/8));
    assert.ok(Math.abs(w[2]-.5)<1e-10);
    assert.ok(Math.abs(w[sign<0?3:1]-.5)<1e-10);
    assert.equal(w[sign<0?1:3],0);
  }
  const before=cloudWeights(100,41.3),after=cloudWeights(100,41.5);
  assert.ok(Math.abs(before[1]-after[1])<.01,'no visual size jump at the choice boundary');
  assert.deepEqual(cloudWeights(-100,0),{1:0,2:0,3:0});
  assert.deepEqual(cloudWeights(0,0),{1:0,2:0,3:0});
  assert.ok(cloudWeights(30,0)[2]<cloudWeights(56,0)[2]);
});
