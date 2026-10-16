// Prototype F001–F018 meant different phrases than the supplied library.
// Archive those ratings under distinct IDs instead of applying them to new text.
export function archivePrototypeHistory(records) {
  const migrated = Object.create(null);
  for (const [id, record] of Object.entries(records)) {
    const number = /^F(\d{3})$/.exec(id);
    const archivedId = number && Number(number[1]) >= 1 && Number(number[1]) <= 18 ? `DEMO-${id}` : id;
    migrated[archivedId] = record;
  }
  return migrated;
}
