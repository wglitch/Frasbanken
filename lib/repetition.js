export function matchingCards(cards, history, mode = 'all', category = null) {
  return cards.filter(card => (!category || card.category === category) &&
    (mode === 'all' || (mode === 'rated' && history[card.id]?.skav != null) || (mode === 'high' && history[card.id]?.skav >= 2) ||
      (mode === 'unrated' && history[card.id]?.skav == null)));
}

export function weightFor(record, now = Date.now()) {
  const skav = record?.skav;
  const base = skav == null ? 8 : skav === 3 ? 6 : skav === 2 ? 4 : 1.5;
  const elapsed = record?.senast ? Math.max(0, now - Date.parse(record.senast)) : 0;
  return base + Math.min(elapsed / 86400000 / 14, 3);
}

export function pickNext(cards, history, previousId = null, random = Math.random, now = Date.now()) {
  if (!cards.length) return null;
  const pool = cards.length > 1 ? cards.filter(card => card.id !== previousId) : cards;
  const weights = pool.map(card => weightFor(history[card.id], now));
  let threshold = random() * weights.reduce((sum, weight) => sum + weight, 0);
  for (let i = 0; i < pool.length; i++) {
    threshold -= weights[i];
    if (threshold < 0) return pool[i];
  }
  return pool[pool.length - 1];
}

export function validateHistory(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Filen ska innehålla ett JSON-objekt med kort-ID:n.');
  const entries = Object.entries(value);
  if (entries.length > 50000) throw new Error('Filen innehåller för många poster.');
  const result = Object.create(null);
  for (const [id, record] of entries) {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(id) || ['__proto__', 'constructor', 'prototype'].includes(id)) throw new Error('Filen innehåller ett ogiltigt kort-ID.');
    if (!record || typeof record !== 'object' || Array.isArray(record) || ![null, 1, 2, 3].includes(record.skav)) throw new Error(`Ogiltig skavfaktor för ${id}.`);
    if (typeof record.senast !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)?$/.test(record.senast) || !Number.isFinite(Date.parse(record.senast))) throw new Error(`Ogiltigt datum för ${id}.`);
    result[id] = { skav: record.skav, senast: record.senast };
  }
  return result;
}

export function mergeHistory(current, incoming) {
  const merged = Object.assign(Object.create(null), current);
  for (const [id, record] of Object.entries(incoming)) {
    if (!merged[id] || Date.parse(record.senast) > Date.parse(merged[id].senast)) merged[id] = record;
  }
  return merged;
}

export function validateLibrary(cards, categories) {
  if (!Array.isArray(cards) || !Array.isArray(categories) || !categories.length) throw new Error('Kortbiblioteket saknas eller har fel format.');
  const categoryIds = new Set(categories.map(category => category.id));
  const ids = new Set();
  for (const card of cards) {
    if (!card || typeof card.id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(card.id) || ['constructor', 'prototype'].includes(card.id) || ids.has(card.id) || !categoryIds.has(card.category) || !['phrase', 'template', 'method'].includes(card.type) || typeof card.text !== 'string' || !card.text.trim() || !Array.isArray(card.functions) || !card.functions.every(item => typeof item === 'string') || (card.image != null && typeof card.image !== 'string') || (card.steps != null && (!Array.isArray(card.steps) || !card.steps.every(step => typeof step === 'string')))) throw new Error('Ett kort har fel format, saknar kategori eller har ett dubblerat ID.');
    ids.add(card.id);
  }
}
