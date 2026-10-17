import { matchingCards, validateHistory, mergeHistory, validateLibrary } from './lib/repetition.js';
import { openHistoryStore } from './lib/storage.js';
import { normalizeLibrary } from './lib/library.js';
import { Deck } from './lib/deck.js?v=2.1';
import { dragDirection, basketAt, releaseAction } from './lib/gestures.js';
import { artworkSources, localArtwork } from './lib/artwork.js';
import { CardMotion } from './lib/card-motion.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
let cards = [], categories = [], deck, store, gesture = null, working = false, noticeTimer;
let reservedRoll = Math.random(), previewId = null, previewReady = Promise.resolve(), currentReady = Promise.resolve(), holdTimer;
let lastOrigin = null;
const motion = new CardMotion();
const artworkLoads = new WeakMap();
const reducedMotion = () => $('#reduce-motion').checked || matchMedia('(prefers-reduced-motion: reduce)').matches;
const labels = {1:'Naturligt', 2:'Ovant', 3:'Motstånd'};
const INTRO_KEY = 'frasbanken.intro.v2';
const MOTION_KEY = 'frasbanken.reduce-motion';

function notice(message) {
  $('#notice').textContent = message;
  $('#notice').hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => { $('#notice').hidden = true; }, 4500);
}
function warn(message) {
  const warning = $('#storage-warning');
  warning.replaceChildren(document.createTextNode(message));
  const close = document.createElement('button');
  close.textContent = '×';
  close.setAttribute('aria-label', 'Stäng lagringsmeddelandet');
  close.addEventListener('click', () => { warning.hidden = true; });
  warning.append(close);
  warning.hidden = false;
}
function preference(key) { try { return localStorage.getItem(key); } catch { return null; } }
function setPreference(key, value) { try { localStorage.setItem(key, value); } catch { /* Rehearsal still works without preferences. */ } }
function openDialog(id) {
  if (working) return;
  cancelGesture();
  updateLibrary();
  if (!$(id).open) $(id).showModal();
}
function closeActions() { if ($('#actions-dialog').open) $('#actions-dialog').close(); }
function openLibrary() { closeActions(); openDialog('#library-dialog'); }
function focusCard() { if (deck?.current) $('#card').focus({preventScroll:true}); }

function showArtwork(image, sources, alt, exhausted = () => {}) {
  artworkLoads.get(image)?.resolve(false);
  return new Promise(resolve => {
    const job = {resolve};
    artworkLoads.set(image,job);
    const candidates = sources.map(path => localArtwork(path,document.baseURI)).filter(Boolean);
    let index = 0;
    const finish = success => {
      if (artworkLoads.get(image) !== job) return;
      image.onload = image.onerror = null;
      if (success) image.hidden = false;
      resolve(success);
    };
    const load = () => {
      if (index >= candidates.length) {
        image.hidden = true;
        exhausted();
        finish(false);
        return;
      }
      image.src = candidates[index++];
      if (image.complete && image.naturalWidth) finish(true);
    };
    image.alt = alt || '';
    image.hidden = false;
    image.onload = () => finish(true);
    image.onerror = load;
    load();
  });
}

function fitContent(root = $('#card')) {
  if (root.hidden) return;
  const content = root.querySelector('.phrase-content');
  const phrase = content.querySelector('h1,h2');
  const steps = content.querySelector('ol');
  root.classList.remove('overflowing');
  phrase.style.fontSize = '';
  steps.style.fontSize = '';
  let size = parseFloat(getComputedStyle(phrase).fontSize);
  let stepSize = parseFloat(getComputedStyle(steps).fontSize);
  while (content.scrollHeight > content.clientHeight + 2 && size > 20) {
    size -= 1;
    stepSize = Math.max(13,stepSize - .4);
    phrase.style.fontSize = `${size}px`;
    steps.style.fontSize = `${stepSize}px`;
  }
  if (content.scrollHeight > content.clientHeight + 2) root.classList.add('overflowing');
}

function paintCard(root, card) {
  const group = categories.find(item => item.id === card.category);
  const image = root.querySelector('.artwork img');
  const fallback = root.querySelector('.art-fallback');
  root.dataset.cardId = card.id;
  root.dataset.cardType = card.type;
  image.style.objectFit = 'cover';
  image.style.objectPosition = card.imagePosition || group.imagePosition || '50% 50%';
  fallback.hidden = true;
  const ready = showArtwork(image,artworkSources(card,group),card.image ? card.imageAlt : group.alt,() => {fallback.hidden = false;});
  root.querySelector('h1,h2').textContent = card.text;
  const steps = root.querySelector('ol');
  steps.replaceChildren();
  steps.hidden = !card.steps?.length;
  for (const step of card.steps || []) {
    const li = document.createElement('li');
    li.textContent = step;
    steps.append(li);
  }
  root.querySelector('.phrase-content').scrollTop = 0;
  fitContent(root);
  return ready;
}

function preparePreview(skav = 2) {
  const next = deck?.peek(skav);
  $('#next-card').hidden = !next;
  if (!next) {previewId = null; return;}
  if (previewId !== next.id) {
    previewId = next.id;
    previewReady = paintCard($('#next-card'),next);
  }
}
function prepareNext() {
  reservedRoll = Math.random();
  previewId = null;
  preparePreview();
}

function render(announce = false, prepare = true) {
  cancelGesture();
  $('#loading').hidden = true;
  $('#card').hidden = !deck.current;
  $('#empty').hidden = !!deck.current;
  $('#empty-back').hidden = !deck.trail.length;
  updateLibrary();
  if (!deck.current) {
    if (announce) $('#announcement').textContent = 'Inga kort i urvalet. Öppna biblioteket eller ångra sorteringen.';
    if (prepare) prepareNext();
    return;
  }
  currentReady = paintCard($('#card'),deck.current);
  if (announce) $('#announcement').textContent = deck.current.text;
  if (prepare) prepareNext();
}

function updateLibrary() {
  if (!deck) return;
  const history = deck.history;
  for (const mode of ['all', 'high', 'unrated', 'rated']) {
    $(`#${mode}-count`).textContent = matchingCards(cards, history, mode).length;
  }
  $$('[data-mode]').forEach(button => button.setAttribute('aria-pressed', button.dataset.mode === deck.mode));
  $$('[data-category]').forEach(button => button.setAttribute('aria-pressed', button.dataset.category === deck.category));
  $('#all-categories').setAttribute('aria-pressed', deck.category == null);
  $('#resume-button').firstChild.textContent = `Till kortleken · ${deck.pool.length} kort `;
  const ratings = cards.map(card => history[card.id]?.skav ?? null);
  $('#natural-count').textContent = ratings.filter(value => value === 1).length;
  $('#unfamiliar-count').textContent = ratings.filter(value => value === 2).length;
  $('#resistance-count').textContent = ratings.filter(value => value === 3).length;
  $('#new-count').textContent = ratings.filter(value => value == null).length;
  const completed = cards.filter(card => history[card.id]).length;
  const archived = Object.keys(history).filter(id => !cards.some(card => card.id === id)).length;
  $('#history-summary').textContent = `${completed} av ${cards.length} kort har repetitionshistorik.${archived ? ` Dessutom sparas ${archived} ${archived === 1 ? 'äldre post' : 'äldre poster'} i säkerhetskopian.` : ''}`;
  $('#back-button').disabled = working || !deck.trail.length;
  $('#empty-back').disabled = working || !deck.trail.length;
  $$('[data-grade],#skip-button').forEach(button => { button.disabled = working || !deck.current; });
  const previous = deck.current && history[deck.current.id];
  $('#previous-rating').textContent = previous ? `Senaste bedömning: ${labels[previous.skav] || 'Obedömd'}. Sortera igen för att ändra.` : '';
}

function setWorking(value) {
  working = value;
  $('#card').setAttribute('aria-busy', String(value));
  $$('[data-mode],[data-category],#all-categories,#export-button,#import-file').forEach(control => { control.disabled = value; });
  updateLibrary();
}

function outgoingSnapshot() {
  const clone = $('#card').cloneNode(true);
  clone.removeAttribute('id');
  clone.removeAttribute('tabindex');
  clone.removeAttribute('aria-describedby');
  clone.setAttribute('aria-hidden','true');
  clone.inert = true;
  clone.classList.remove('dragging');
  clone.classList.add('swoosh-ghost','lifted');
  clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  return clone;
}

async function grade(skav) {
  if (working || !deck?.current) return;
  clearTimeout(holdTimer);
  preparePreview(skav);
  const outgoing = outgoingSnapshot();
  const width = $('#table').clientWidth, height = $('#table').clientHeight;
  const context = {
    width,height,origin:lastOrigin || {x:width/2,y:height/2},
    start:$('#card').style.transform || 'none',
    target:basketRects().find(target => target.skav === (skav ?? 2)),
    reduced:reducedMotion()
  };
  // A button sort has no pointer-origin transform; use the visual centre.
  if (!$('#card').style.transform) outgoing.style.transformOrigin = `${width/2}px ${height/2}px`;
  setWorking(true);
  let saved = false;
  try {
    if (await deck.grade(skav)) {
      saved = true;
      closeActions();
      // Keep the already decoded next artwork behind both moving layers.
      // A slow image must never leave a white/empty frame or block interaction.
      $('#table').append(outgoing);
      render(true,false);
      if (skav != null) {
        $('#baskets').classList.add('visible');
        $$('[data-basket]').forEach(element => element.classList.toggle('active',Number(element.dataset.basket) === skav));
      }
      await Promise.race([Promise.all([previewReady,currentReady]),new Promise(resolve => requestAnimationFrame(resolve))]);
      if (!context.reduced && typeof navigator.vibrate === 'function') {
        try { navigator.vibrate(8); } catch { /* Optional haptics must not interrupt sorting. */ }
      }
      await motion.play(outgoing,deck.current ? $('#card') : null,context);
      focusCard();
    }
  } catch {
    if (!saved) warn('Sorteringen kunde inte sparas. Kortet ligger kvar. Försök igen eller exportera din befintliga historik i biblioteket.');
    else render(true,false); // History is committed even if a browser cancels animation.
  } finally {
    outgoing.remove();
    resetSurface();
    if (saved) prepareNext();
    setWorking(false);
  }
}

async function goBack() {
  if (working || !deck) return;
  cancelGesture();
  if (!deck.trail.length) { notice('Inget tidigare sorterat kort i den här kortleken ännu.'); return; }
  setWorking(true);
  try {
    if (await deck.back()) {
      closeActions();
      render(true);
      focusCard();
      $('#announcement').textContent = `Sorteringen är ångrad. ${deck.current.text}`;
    }
  } catch { warn('Sorteringen kunde inte återställas. Historiken är oförändrad. Försök igen.'); }
  finally { setWorking(false); }
}

function basketRects() {
  return $$('[data-basket]').map(element => {
    const rect = element.getBoundingClientRect();
    return {left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,skav:Number(element.dataset.basket)};
  });
}
function resetSurface() {
  $('#card').classList.remove('dragging','lifted');
  $('#card').style.transform = '';
  lastOrigin = null;
  $('#baskets').classList.remove('visible');
  $$('[data-basket]').forEach(element => element.classList.remove('active'));
}
function cancelGesture(reset = true) {
  clearTimeout(holdTimer);
  const active = gesture;
  gesture = null;
  if (active && $('#card').hasPointerCapture(active.id)) $('#card').releasePointerCapture(active.id);
  if (reset) resetSurface();
}
const surface = $('#card');
surface.addEventListener('pointerdown',event => {
  if (!event.isPrimary) {cancelGesture();return;}
  if (working || !deck?.current || event.button !== 0 || $$('dialog').some(dialog => dialog.open)) return;
  const rect = surface.getBoundingClientRect();
  lastOrigin = {x:event.clientX - rect.left,y:event.clientY - rect.top};
  surface.style.transformOrigin = `${lastOrigin.x}px ${lastOrigin.y}px`;
  gesture = {id:event.pointerId,x:event.clientX,y:event.clientY,direction:null,width:surface.offsetWidth};
  surface.setPointerCapture(event.pointerId);
  holdTimer = setTimeout(() => {if (gesture && !working) openDialog('#actions-dialog');},550);
});
surface.addEventListener('pointermove',event => {
  if (!gesture || event.pointerId !== gesture.id) return;
  const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
  if (Math.hypot(dx,dy) > 8) clearTimeout(holdTimer);
  gesture.direction ||= dragDirection(dx,dy);
  const direction = gesture.direction;
  if (direction === 'cancel') return;
  if (event.cancelable) event.preventDefault();
  surface.classList.add('dragging');
  if (!direction) {
    surface.style.transform = `translate3d(${dx}px,${dy}px,0)`;
    return;
  }
  const rotation = reducedMotion() ? 0 : Math.max(-7,Math.min(7,dx/34));
  if (direction === 'right') {
    surface.classList.add('lifted');
    surface.style.transform = `translate3d(${dx}px,${dy}px,0) rotate(${rotation}deg) scale(.94)`;
    $('#baskets').classList.add('visible');
    const target = dx > 12 ? basketAt(event.clientX,event.clientY,basketRects()) : null;
    $$('[data-basket]').forEach(element => element.classList.toggle('active',Number(element.dataset.basket) === target));
    preparePreview(target ?? 2);
  } else if (direction === 'left') {
    surface.style.transform = `translate3d(${Math.min(0,dx)*.5}px,${dy*.15}px,0) rotate(${rotation*.5}deg)`;
  } else if (direction === 'up') {
    surface.style.transform = `translate3d(${dx*.15}px,${Math.min(0,dy)*.45}px,0)`;
  }
},{passive:false});
surface.addEventListener('pointerup',event => {
  if (!gesture || event.pointerId !== gesture.id) return;
  const active = gesture;
  const dx = event.clientX - active.x, dy = event.clientY - active.y;
  const direction = active.direction || dragDirection(dx,dy);
  const target = direction === 'right' ? basketAt(event.clientX,event.clientY,basketRects()) : null;
  const action = releaseAction(direction,dx,dy,target,active.width);
  cancelGesture(action.type !== 'grade');
  if (action.type === 'grade') void grade(action.skav);
  else if (action.type === 'back') void goBack();
  else if (action.type === 'library') openLibrary();
});
surface.addEventListener('pointercancel',() => cancelGesture());
surface.addEventListener('lostpointercapture',() => {if (gesture) cancelGesture();});
surface.addEventListener('contextmenu',event => {event.preventDefault();openDialog('#actions-dialog');});
window.addEventListener('blur',() => {cancelGesture();motion.cancel();});
document.addEventListener('visibilitychange',() => {if (document.hidden) {cancelGesture();motion.cancel();}});
window.addEventListener('resize',() => {cancelGesture();motion.cancel();fitContent();fitContent($('#next-card'));});

$('#menu-button').addEventListener('click', () => openDialog('#actions-dialog'));
$('#open-library').addEventListener('click', openLibrary);
$('#empty-library').addEventListener('click', openLibrary);
$('#back-button').addEventListener('click', goBack);
$('#empty-back').addEventListener('click', goBack);
$('#skip-button').addEventListener('click', () => grade(null));
$$('[data-grade]').forEach(button => button.addEventListener('click', () => grade(Number(button.dataset.grade))));
$$('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
$('#resume-button').addEventListener('click', () => { $('#library-dialog').close(); focusCard(); });
$$('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
$$('[data-mode]').forEach(button => button.addEventListener('click', () => {
  if (!deck || working) return;
  deck.select(button.dataset.mode,deck.category);
  render();
}));
$('#all-categories').addEventListener('click', () => { if (deck && !working) { deck.select(deck.mode,null); render(); } });
$('#intro-button').addEventListener('click', () => openDialog('#intro-dialog'));
function dismissIntro() { $('#intro-dialog').close(); }
$('#dismiss-intro').addEventListener('click', dismissIntro);
$('#start-button').addEventListener('click', dismissIntro);
$('#intro-dialog').addEventListener('close', () => { setPreference(INTRO_KEY,'seen'); if (!$('#library-dialog').open) focusCard(); });
$('#reduce-motion').checked = preference(MOTION_KEY) === 'true';
document.body.classList.toggle('reduce-motion',$('#reduce-motion').checked);
$('#reduce-motion').addEventListener('change', event => {
  setPreference(MOTION_KEY,String(event.target.checked));
  document.body.classList.toggle('reduce-motion',event.target.checked);
});
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || $$('dialog').some(dialog => dialog.open) || ['INPUT','TEXTAREA','SELECT','BUTTON'].includes(event.target.tagName)) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); void goBack(); }
  if (event.key === 'ArrowUp') { event.preventDefault(); openLibrary(); }
  if (event.key === 'ArrowRight') { event.preventDefault(); openDialog('#actions-dialog'); }
});

$('#export-button').addEventListener('click', () => {
  if (!deck) return;
  const url = URL.createObjectURL(new Blob([JSON.stringify(deck.history,null,2)],{type:'application/json'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = `frasbanken-historik-${new Date().toISOString().slice(0,10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url),60000);
  $('#backup-status').textContent = 'Säkerhetskopian är skapad. Spara JSON-filen på en trygg plats.';
});
$('#import-file').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file || working || !deck) return;
  setWorking(true);
  try {
    if (!store) throw new Error('Lokal lagring är inte tillgänglig.');
    if (file.size > 5*1024*1024) throw new Error('Filen är för stor. Maximal storlek är 5 MB.');
    const incoming = validateHistory(JSON.parse(await file.text()));
    const merged = mergeHistory(deck.history,incoming);
    await store.write(merged);
    deck.replaceHistory(merged);
    render();
    $('#backup-status').textContent = `Importen är klar. ${Object.keys(incoming).length} poster lästes in. Senaste repetitionen per kort behölls.`;
  } catch (error) {
    $('#backup-status').textContent = `Importen avbröts. ${error instanceof SyntaxError ? 'Filen är inte giltig JSON.' : error.message}`;
  } finally { event.target.value = ''; setWorking(false); }
});

async function start() {
  try {
    const [library,views] = await Promise.all(['data/cards.json','data/categories.json'].map(async path => {
      const response = await fetch(path, {cache:'no-cache'});
      if (!response.ok) throw new Error('Kortbiblioteket kunde inte hämtas.');
      return response.json();
    }));
    ({cards,categories} = normalizeLibrary(library,views));
    validateLibrary(cards,categories);
    let history = Object.create(null);
    try {
      store = await openHistoryStore();
      history = await store.read();
      if (store.kind === 'localstorage') warn('IndexedDB är inte tillgängligt. Historiken sparas i webbläsarens reservlagring. Exportera gärna en säkerhetskopia.');
    } catch {
      store = null;
      warn('Lokal lagring kunde inte öppnas. Du kan läsa korten men inte spara sorteringar. Kontrollera webbläsarens lagringsinställningar och ladda om.');
    }
    deck = new Deck(cards,history,async records => {
      if (!store) throw new Error('Lagring saknas.');
      await store.write(records);
    },() => reservedRoll);
    for (const item of categories) {
      const button = document.createElement('button');
      button.className = 'category-button';
      button.dataset.category = item.id;
      button.setAttribute('aria-pressed','false');
      const image = document.createElement('img');
      image.alt = '';
      image.loading = 'lazy';
      showArtwork(image,artworkSources({},item),'');
      const label = document.createElement('span');
      label.append(document.createTextNode(item.name));
      const count = document.createElement('small');
      count.textContent = cards.filter(card => card.category === item.id).length;
      label.append(count);
      button.append(image,label);
      button.addEventListener('click', () => {
        if (working) return;
        deck.select(deck.mode,deck.category === item.id ? null : item.id);
        render();
      });
      $('#categories').append(button);
    }
    render();
    if (preference(INTRO_KEY) !== 'seen') openDialog('#intro-dialog');
  } catch (error) {
    $('#loading').textContent = `${error.message} Kontrollera anslutningen och ladda om sidan. Öppna appen via en webbserver, inte som lokal HTML-fil.`;
  }
}
start();
