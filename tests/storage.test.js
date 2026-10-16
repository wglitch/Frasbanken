import test from 'node:test';
import assert from 'node:assert/strict';
import { openHistoryStore } from '../lib/storage.js';

test('localStorage fallback persists ratings and truly deletes new records on undo', async () => {
  const values = new Map();
  const original = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key,value) => values.set(key,value),
    removeItem: key => values.delete(key)
  };
  try {
    const store = await openHistoryStore();
    assert.equal(store.kind,'localstorage');
    const record = {skav:3,senast:'2026-10-16T10:00:00Z'};
    await store.write({F100:record});
    assert.deepEqual((await store.read()).F100,record);
    await store.write({F100:null});
    assert.equal((await store.read()).F100,undefined);
    assert.equal(JSON.parse(values.get('frasbanken.history.v2')).F100,undefined);
  } finally {
    if (original === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = original;
  }
});
