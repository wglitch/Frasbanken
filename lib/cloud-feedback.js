// Drag emphasis and release decay have their own life, independent of card motion.
export class CloudFeedback {
  constructor(present, {
    schedule = (callback, delay) => setTimeout(callback, delay),
    unschedule = timer => clearTimeout(timer)
  } = {}) {
    this.present = present;
    this.schedule = schedule;
    this.unschedule = unschedule;
    this.phase = 'hidden';
    this.timer = null;
    this.generation = 0;
    this.weights = {1:0, 2:0, 3:0};
  }
  set(phase, target = null) {
    if (this.timer !== null) this.unschedule(this.timer);
    this.timer = null;
    this.generation += 1;
    this.phase = phase;
    this.present({phase, target, weights:{...this.weights}});
  }
  preview(target, weights = null) {
    this.weights = weights || {1:Number(target === 1), 2:Number(target === 2), 3:Number(target === 3)};
    this.set('preview', target);
  }
  hold(target) {
    if (!Object.values(this.weights).some(Boolean)) {
      this.weights = {1:Number(target === 1), 2:Number(target === 2), 3:Number(target === 3)};
    }
    this.set('pending', target);
  }
  confirm(target) {
    this.set('confirmed', target);
    const generation = this.generation;
    this.timer = this.schedule(() => {
      if (this.generation === generation) this.clear();
    }, 760);
  }
  reset() {
    if (this.phase !== 'pending' && this.phase !== 'confirmed') this.clear();
  }
  clear() { this.weights = {1:0, 2:0, 3:0}; this.set('hidden'); }
}
