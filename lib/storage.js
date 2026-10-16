import { validateHistory } from './repetition.js';
import { archivePrototypeHistory } from './history-migration.js';

const DATABASE = 'frasbanken';
const STORE = 'history';
const FALLBACK = 'frasbanken.history.v2';

export async function openHistoryStore() {
  try {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE, 2);
      request.onupgradeneeded = event => {
        if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
        if (event.oldVersion === 1) {
          const history = request.transaction.objectStore(STORE);
          const cursorRequest = history.openCursor();
          cursorRequest.onsuccess = () => {
            const cursor = cursorRequest.result;
            if (!cursor) return;
            const [id] = Object.keys(archivePrototypeHistory({ [cursor.key]: cursor.value }));
            if (id !== cursor.key) { history.put(cursor.value, id); cursor.delete(); }
            cursor.continue();
          };
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('Lagringen blockeras av en annan flik.'));
    });
    db.onversionchange = () => db.close();
    return {
      kind: 'indexeddb',
      async read() {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE, 'readonly');
          const result = Object.create(null);
          const request = transaction.objectStore(STORE).openCursor();
          request.onsuccess = () => {
            const cursor = request.result;
            if (cursor) { result[cursor.key] = cursor.value; cursor.continue(); }
          };
          transaction.oncomplete = () => {
            try { resolve(validateHistory(result)); } catch (error) { reject(error); }
          };
          transaction.onerror = () => reject(transaction.error);
          transaction.onabort = () => reject(transaction.error);
        });
      },
      async write(records) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE, 'readwrite');
          const store = transaction.objectStore(STORE);
          for (const [id, record] of Object.entries(records)) {
            if (record === null) store.delete(id);
            else store.put(record, id);
          }
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error);
          transaction.onabort = () => reject(transaction.error);
        });
      }
    };
  } catch {
    // A usable localStorage fallback still persists across reloads on this origin.
    const probe = `${FALLBACK}.probe`;
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    if (localStorage.getItem(FALLBACK) == null && localStorage.getItem('frasbanken.history.v1') != null) {
      const original = validateHistory(JSON.parse(localStorage.getItem('frasbanken.history.v1')));
      localStorage.setItem(FALLBACK, JSON.stringify(archivePrototypeHistory(original)));
    }
    return {
      kind: 'localstorage',
      async read() { return validateHistory(JSON.parse(localStorage.getItem(FALLBACK) || '{}')); },
      async write(records) {
        const current = validateHistory(JSON.parse(localStorage.getItem(FALLBACK) || '{}'));
        for (const [id, record] of Object.entries(records)) {
          if (record === null) delete current[id];
          else current[id] = record;
        }
        localStorage.setItem(FALLBACK, JSON.stringify(current));
      }
    };
  }
}
