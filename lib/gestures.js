// Rightward diagonals belong to grading; near-vertical gestures retain navigation.
export function dragDirection(dx, dy, threshold = 12) {
  if (Math.max(Math.abs(dx), Math.abs(dy)) < threshold) return null;
  if (dx > 0 && dx >= Math.abs(dy) * .364) return 'right';
  if (Math.abs(dx) > Math.abs(dy) * 1.15) return dx > 0 ? 'right' : 'left';
  if (Math.abs(dy) > Math.abs(dx) * 1.15) return dy < 0 ? 'up' : 'cancel';
  return null;
}

// Selection is relative to the initial touch, never an absolute screen position.
// A deliberate 56 px stroke is required; returning inside that radius cancels.
export function swipeGrade(dx, dy) {
  if (dx < 24 || Math.hypot(dx, dy) < 56) return null;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  if (Math.abs(angle) > 70) return null;
  return angle < -22.5 ? 3 : angle > 22.5 ? 1 : 2;
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
