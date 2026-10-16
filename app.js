import { matchingCards, pickNext, validateHistory, mergeHistory, validateLibrary } from './lib/repetition.js';
import { openHistoryStore } from './lib/storage.js';
import { normalizeLibrary } from './lib/library.js';

const $ = selector => document.querySelector(selector);
let cards = [], categories = [], history = Object.create(null), store = null;
let current = null, draft = null, mode = 'all', category = null, busy = false, noticeTimer;
const names = { phrase: 'Fras', template: 'Meningsstomme', method: 'Metod' };

function notice(message) {
  $('#status').textContent = message;
  $('#status').hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => { $('#status').hidden = true; }, 4500);
}

function warn(message) {
  $('#storage-warning').textContent = message;
  $('#storage-warning').hidden = false;
}

function updateCounts() {
  $('#all-count').textContent = cards.length;
  $('#high-count').textContent = matchingCards(cards, history, 'high').length;
  $('#unrated-count').textContent = matchingCards(cards, history, 'unrated').length;
  document.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed', button.dataset.mode === mode));
  document.querySelectorAll('[data-category]').forEach(button => button.setAttribute('aria-pressed', button.dataset.category === category));
  $('#clear-category').hidden = !category;
  const categoryName = categories.find(item => item.id === category)?.name;
  const modeName = { all: 'Alla bildvärldar', high: 'Ovant & motstånd', unrated: 'Ännu inte bedömda' }[mode];
  $('#selection-label').textContent = categoryName ? `${categoryName} · ${mode === 'all' ? 'Alla kort' : modeName}` : modeName;
  $('#history-summary').textContent = `${Object.keys(history).length} kort har repetitionshistorik.`;
}

function showCard(previousId = current?.id, moveFocus = false) {
  updateCounts();
  const pool = matchingCards(cards, history, mode, category);
  current = pickNext(pool, history, previousId);
  draft = current ? history[current.id]?.skav ?? null : null;
  $('#loading').hidden = true;
  $('#card').hidden = !current;
  $('#practice-controls').hidden = !current;
  $('#empty').hidden = !!current;
  $('#mix-label').hidden = !current;
  if (!current) {
    $('#empty-title').textContent = mode === 'high' ? 'Lite mindre skav här.' : mode === 'unrated' ? 'Alla de här orden är bekanta.' : 'Här finns inga kort ännu.';
    $('#empty-text').textContent = mode === 'high' ? 'Inga kort i det här urvalet är markerade som ovant eller motstånd. Du kan alltid utforska alla kort.' : mode === 'unrated' ? 'Alla kort i det här urvalet har en bedömning. Fortsätt gärna i din egen takt med alla kort.' : 'Prova en annan bildvärld eller visa alla kort.';
    if (moveFocus) $('#show-all').focus();
    return;
  }
  const group = categories.find(item => item.id === current.category);
  const image = $('#card-image');
  image.onerror = () => {
    image.onerror = null;
    image.src = group.image;
    image.alt = group.alt;
  };
  image.src = current.image || group.image;
  image.alt = current.image ? current.imageAlt || '' : group.alt;
  $('#category-badge').textContent = `${group.icon}  ${group.name}`;
  $('#card-type').textContent = names[current.type];
  $('#card-invitation').textContent = { phrase: 'EN FRAS ATT PROVA', template: 'FYLL I MED DINA EGNA ORD', method: current.steps?.length ? 'PROVA STEGEN HÖGT, MED EGNA ORD' : 'EN METOD ATT PROVA' }[current.type];
  $('#phrase').textContent = current.type === 'method' ? current.text : `”${current.text}”`;
  $('#card-id').textContent = current.id;
  $('#method-steps').replaceChildren();
  $('#method-steps').hidden = current.type !== 'method' || !current.steps?.length;
  for (const step of current.steps || []) {
    const li = document.createElement('li');
    li.textContent = step;
    $('#method-steps').append(li);
  }
  $('#save-hint').textContent = pool.length === 1 ? 'Ett kort i urvalet. Repetera i din egen takt.' : 'Stanna så länge du vill.';
  updateRating();
  if (moveFocus) {
    $('#phrase').focus({ preventScroll: true });
    if ($('#card').getBoundingClientRect().top < 0) $('#card').scrollIntoView({ block: 'start', behavior: 'auto' });
  }
}

function updateRating() {
  document.querySelectorAll('[data-skav]').forEach(button => button.setAttribute('aria-pressed', Number(button.dataset.skav) === draft));
}

function lock(value) {
  busy = value;
  document.querySelectorAll('[data-mode],[data-category],[data-skav],#next-button,#clear-category,#import-file,#export-button').forEach(button => { button.disabled = value; });
}

async function finishCard() {
  if (!current || busy) return;
  lock(true);
  const record = { skav: draft, senast: new Date().toISOString() };
  const id = current.id;
  try {
    if (!store) throw new Error('Ingen lagring tillgänglig');
    await store.write({ [id]: record });
    history[id] = record;
    showCard(id, true);
  } catch {
    warn('Repetitionen kunde inte sparas. Kortet ligger kvar så att du kan försöka igen. Exportera gärna din befintliga historik innan du lämnar sidan.');
  } finally { lock(false); }
}

document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
  mode = button.dataset.mode;
  showCard();
}));
document.querySelectorAll('[data-skav]').forEach(button => button.addEventListener('click', () => {
  draft = Number(button.dataset.skav);
  updateRating();
  $('#save-hint').textContent = 'Sparas när du går vidare. Ingen brådska.';
}));
$('#next-button').addEventListener('click', finishCard);
$('#clear-category').addEventListener('click', () => { category = null; showCard(); });
$('#show-all').addEventListener('click', () => { mode = 'all'; category = null; showCard(null, true); });
$('#about-button').addEventListener('click', () => $('#about-dialog').showModal());
$('#backup-button').addEventListener('click', () => { updateCounts(); $('#backup-status').textContent = ''; $('#backup-dialog').showModal(); });
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
}));

$('#export-button').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `frasbanken-historik-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
  $('#backup-status').textContent = 'Säkerhetskopian är skapad. Spara JSON-filen på en trygg plats.';
});

$('#import-file').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file || busy) return;
  lock(true);
  try {
    if (!store) throw new Error('Lokal lagring är inte tillgänglig. Importen har inte genomförts.');
    if (file.size > 5 * 1024 * 1024) throw new Error('Filen är för stor. Maximal storlek är 5 MB.');
    const incoming = validateHistory(JSON.parse(await file.text()));
    const merged = mergeHistory(history, incoming);
    await store.write(merged);
    history = merged;
    // Preserve a currently rehearsed phrase and its pending rating across import.
    const pending = draft;
    updateCounts();
    if (!current) showCard();
    else { draft = pending; updateRating(); }
    $('#backup-status').textContent = `Importen är klar. ${Object.keys(incoming).length} poster lästes in; den senaste repetitionen per kort behölls.`;
    notice('Historiken har importerats.');
  } catch (error) {
    $('#backup-status').textContent = `Importen avbröts. ${error instanceof SyntaxError ? 'Filen är inte giltig JSON.' : error.message}`;
  } finally {
    event.target.value = '';
    lock(false);
  }
});

async function start() {
  try {
    [cards, categories] = await Promise.all(['data/cards.json', 'data/categories.json'].map(async url => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Kunde inte läsa kortbiblioteket.');
      return response.json();
    }));
    ({ cards, categories } = normalizeLibrary(cards, categories));
    validateLibrary(cards, categories);
    try {
      store = await openHistoryStore();
      history = await store.read();
      if (store.kind === 'localstorage') warn('IndexedDB är inte tillgängligt. Historiken sparas i stället i webbläsarens lokala lagring. Gör gärna en säkerhetskopia.');
    } catch {
      store = null;
      warn('Lokal lagring kunde inte öppnas. Du kan läsa och öva korten, men inga repetitioner kan sparas. Kontrollera webbläsarens lagringsinställningar och ladda om sidan.');
    }
    for (const item of categories) {
      const button = document.createElement('button');
      button.className = 'category';
      button.dataset.category = item.id;
      button.title = item.description;
      button.setAttribute('aria-pressed', 'false');
      const icon = document.createElement('span');
      icon.className = 'category-icon';
      icon.style.setProperty('--category-tint', item.tint);
      icon.textContent = item.icon;
      icon.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.textContent = item.name;
      const count = document.createElement('span');
      count.className = 'count';
      count.textContent = cards.filter(card => card.category === item.id).length;
      button.append(icon, label, count);
      button.addEventListener('click', () => { category = category === item.id ? null : item.id; showCard(); });
      $('#categories').append(button);
    }
    showCard(null);
  } catch (error) {
    $('#loading').textContent = `${error.message} Kontrollera anslutningen och ladda om sidan. Använd en webbserver i stället för att öppna HTML-filen direkt.`;
    lock(true);
  } finally { $('.practice').setAttribute('aria-busy', 'false'); }
}
start();
