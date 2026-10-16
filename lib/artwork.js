export function artworkSources(card, category) {
  return [...new Set([card.image, category.image, category.fallbackImage, 'assets/placeholder.svg'].filter(Boolean))];
}

// Keep artwork on the same origin: no remote image services or tracking pixels.
export function localArtwork(path, base) {
  try {
    const origin = new URL(base);
    const url = new URL(path, base);
    return url.origin === origin.origin && ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
