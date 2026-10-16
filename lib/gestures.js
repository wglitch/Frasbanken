// Lock intent before exposing targets. Never infer a rating from a swipe alone.
export function dragDirection(dx, dy, threshold = 12) {
  if (Math.max(Math.abs(dx), Math.abs(dy)) < threshold) return null;
  if (Math.abs(dx) > Math.abs(dy) * 1.15) return dx > 0 ? 'right' : 'left';
  if (Math.abs(dy) > Math.abs(dx) * 1.15) return dy < 0 ? 'up' : 'cancel';
  return null;
}

export function basketAt(x, y, baskets) {
  return baskets.find(({ left, right, top, bottom }) => x >= left && x <= right && y >= top && y <= bottom)?.skav ?? null;
}

export function releaseAction(direction, dx, dy, target, cardWidth) {
  if (direction === 'right' && dx > 12 && target != null) return { type: 'grade', skav: target };
  if (direction === 'left' && dx < -Math.min(80, cardWidth * .2)) return { type: 'back' };
  if (direction === 'up' && dy < -70) return { type: 'library' };
  return { type: 'cancel' };
}
