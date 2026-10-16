// Accept both the original flat prototype and the supplied versioned library.
// Text and stable source IDs are never rewritten.
export function normalizeLibrary(document, categoryViews) {
  if (Array.isArray(document)) return { cards: document, categories: categoryViews };
  if (!document || document.schemaVersion !== 1 || !Array.isArray(document.cards) || !Array.isArray(document.categories)) {
    throw new Error('Kortbibliotekets format stöds inte.');
  }
  return {
    cards: document.cards.map(card => ({ ...card, category: card.primaryCategory })),
    categories: document.categories.map(category => {
      const view = categoryViews.find(item => item.id === category.id);
      return { ...category, ...view, id: category.id, name: category.name,
        image: view?.image || 'assets/placeholder.svg',
        alt: view?.alt || `Tillfällig illustration för ${category.name}.`,
        icon: view?.icon || '✳', tint: view?.tint || '#dce3ce' };
    })
  };
}
