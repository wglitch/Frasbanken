// A receipt belongs to the completed card, not the next card's animation.
export class CloudFeedback {
  constructor(present, {schedule = setTimeout, unschedule = clearTimeout} = {}) {
    this.present = present;
    this.schedule = schedule;
    this.unschedule = unschedule;
    this.phase = 'hidden';
    this.timer = null;
    this.generation = 0;
  }
  set(phase, target = null) {
    if (this.timer !== null) this.unschedule(this.timer);
    this.timer = null;
    this.generation += 1;
    this.phase = phase;
    this.present({phase, target});
  }
  preview(target) { this.set('preview', target); }
  hold(target) { this.set('pending', target); }
  confirm(target) {
    this.set('confirmed', target);
    const generation = this.generation;
    this.timer = this.schedule(() => {
      if (this.generation === generation) this.clear();
    }, 1000);
  }
  reset() {
    if (this.phase !== 'pending' && this.phase !== 'confirmed') this.clear();
  }
  clear() { this.set('hidden'); }
}
