export function sortingMotion({ width, height, origin, target, start = 'none', reduced = false }) {
  if (reduced) return {
    outgoing: [{ opacity: 1 }, { opacity: 0 }],
    incoming: [{ opacity: .7 }, { opacity: 1 }],
    outOptions: { duration: 90, easing: 'ease-out', fill: 'both' },
    inOptions: { duration: 90, delay: 0, easing: 'ease-out', fill: 'both' }
  };
  const scale = Math.min(.24, Math.max(.08, (target.right - target.left) / width * .8));
  const angle = 10 * Math.PI / 180;
  const x = width / 2 - origin.x, y = height / 2 - origin.y;
  const dx = (target.left + target.right) / 2 - origin.x - scale * (x * Math.cos(angle) - y * Math.sin(angle));
  const dy = (target.top + target.bottom) / 2 - origin.y - scale * (x * Math.sin(angle) + y * Math.cos(angle));
  return {
    outgoing: [
      { transform: start, opacity: 1, borderRadius: '18px' },
      { transform: `translate3d(${dx}px,${dy}px,0) rotate(10deg) scale(${scale})`, opacity: 0, borderRadius: '24px' }
    ],
    incoming: [
      { transform: 'translate3d(-100%,0,0)', borderRadius: '18px' },
      { transform: 'translate3d(0,0,0)', borderRadius: '0px' }
    ],
    outOptions: { duration: 200, easing: 'cubic-bezier(.45,0,1,.6)', fill: 'both' },
    inOptions: { duration: 280, delay: 20, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }
  };
}

export class CardMotion {
  constructor() { this.busy = false; this.animations = []; }
  cancel() { this.animations.forEach(animation => animation.cancel()); }
  async play(outgoing, incoming, context) {
    if (this.busy) return false;
    this.busy = true;
    try {
      const plan = sortingMotion(context);
      // Start both before awaiting either: total 300 ms, not 480 ms.
      if (outgoing.animate) this.animations.push(outgoing.animate(plan.outgoing, plan.outOptions));
      if (incoming?.animate) this.animations.push(incoming.animate(plan.incoming, plan.inOptions));
      await Promise.allSettled(this.animations.map(animation => animation.finished));
      return true;
    } finally {
      outgoing.remove();
      this.cancel();
      this.animations = [];
      this.busy = false;
    }
  }
}
