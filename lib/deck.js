import { matchingCards, pickNext } from './repetition.js';

export class Deck {
  constructor(cards, history, persist, random = Math.random) {
    this.cards = cards;
    this.history = history;
    this.persist = persist;
    this.random = random;
    this.mode = 'all';
    this.category = null;
    this.trail = [];
    this.forward = [];
    this.current = null;
    this.busy = false;
    this.next();
  }
  get pool() { return matchingCards(this.cards, this.history, this.mode, this.category); }
  peek(skav = 2) {
    if (!this.current) return null;
    // Read-only projection through the existing next() algorithm. The view
    // supplies a reserved random roll so previewing never changes the order.
    const projected = Object.assign(Object.create(Deck.prototype), this, {
      history: { ...this.history, [this.current.id]: { skav, senast: new Date().toISOString() } },
      forward: [...this.forward]
    });
    projected.next(this.current.id);
    return projected.current;
  }
  next(previousId = this.current?.id) {
    const pool = this.pool;
    // After going back, resume the sequence where possible, respecting filters.
    this.current = null;
    while (this.forward.length) {
      const candidate = this.forward.shift();
      if (pool.some(card => card.id === candidate.id) && (pool.length === 1 || candidate.id !== previousId)) {
        this.current = candidate;
        break;
      }
    }
    this.current ||= pickNext(pool, this.history, previousId, this.random);
  }
  select(mode = this.mode, category = this.category) {
    if (this.busy) return;
    this.mode = mode;
    this.category = category;
    this.forward = [];
    this.next();
  }
  replaceHistory(history) {
    if (this.busy) return;
    this.history = history;
    this.trail = [];
    this.forward = [];
    if (!this.current || !this.pool.some(card => card.id === this.current.id)) this.next();
  }
  async grade(skav) {
    if (this.busy || !this.current) return false;
    if (![1, 2, 3, null].includes(skav)) throw new Error('Ogiltig skavfaktor.');
    this.busy = true;
    const card = this.current;
    const previous = this.history[card.id] ? { ...this.history[card.id] } : null;
    const record = { skav, senast: new Date().toISOString() };
    try {
      await this.persist({ [card.id]: record });
      this.history[card.id] = record;
      this.trail.push({ card, previous });
      this.next(card.id);
      return true;
    } finally { this.busy = false; }
  }
  async back() {
    if (this.busy || !this.trail.length) return false;
    this.busy = true;
    const entry = this.trail[this.trail.length - 1];
    try {
      // null means delete the entry, not an unassessed repetition.
      await this.persist({ [entry.card.id]: entry.previous });
      if (entry.previous) this.history[entry.card.id] = entry.previous;
      else delete this.history[entry.card.id];
      if (this.current) this.forward.unshift(this.current);
      this.trail.pop();
      this.current = entry.card;
      return true;
    } finally { this.busy = false; }
  }
}
