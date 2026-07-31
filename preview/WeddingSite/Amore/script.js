const WEDDING_CONFIG = {
  date: '2027-09-18T16:30:00-04:00',
  title: 'Clara & Noah Wedding',
  location: 'Jekyll Island, Georgia',
  calendarDescription: 'Ceremony at Driftwood Beach followed by cocktails and reception at Jekyll Island Club.'
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const header = $('#siteHeader');
const progress = $('.page-progress span');
const cursor = $('.cursor-orbit');
const menuToggle = $('.menu-toggle');
const mainNav = $('#mainNav');

function updateScrollUI() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  header.classList.toggle('scrolled', y > 30);

  const sections = $$('main section[id]');
  let current = '';
  sections.forEach(section => {
    if (y >= section.offsetTop - 170) current = section.id;
  });
  $$('.main-nav a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mainNav.classList.toggle('open', !open);
  document.body.classList.toggle('nav-open', !open);
});
$$('.main-nav a').forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  mainNav.classList.remove('open');
  document.body.classList.remove('nav-open');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.setProperty('--delay', `${entry.target.dataset.delay || 0}ms`);
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });
$$('.reveal').forEach(el => revealObserver.observe(el));

function updateCountdown() {
  const diff = Math.max(0, new Date(WEDDING_CONFIG.date).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  $('#days').textContent = String(days).padStart(3, '0');
  $('#hours').textContent = String(hours).padStart(2, '0');
  $('#minutes').textContent = String(minutes).padStart(2, '0');
  $('#seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', event => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  $$('a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });

  $$('.magnetic').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * .12}px, ${y * .18}px)`;
    });
    button.addEventListener('pointerleave', () => button.style.transform = '');
  });

  $$('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - .5) * -7;
      const ry = ((event.clientX - rect.left) / rect.width - .5) * 7;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}

let rafId;
window.addEventListener('scroll', () => {
  if (rafId || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  rafId = requestAnimationFrame(() => {
    const y = window.scrollY;
    const image = $('.hero-image-wrap img');
    if (image && y < window.innerHeight * 1.2) image.style.transform = `scale(1.06) translateY(${y * .045}px)`;
    rafId = null;
  });
}, { passive: true });

$('.calendar-button').addEventListener('click', () => {
  const start = new Date(WEDDING_CONFIG.date);
  const end = new Date(start.getTime() + 7 * 60 * 60 * 1000);
  const fmt = date => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Terra Amore//Wedding//EN','BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,
    `SUMMARY:${WEDDING_CONFIG.title}`,`LOCATION:${WEDDING_CONFIG.location}`,
    `DESCRIPTION:${WEDDING_CONFIG.calendarDescription}`,'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const anchor = Object.assign(document.createElement('a'), { href: url, download: 'clara-noah-wedding.ics' });
  anchor.click();
  URL.revokeObjectURL(url);
});

const galleryData = $$('.gallery-item').map(item => ({
  src: $('img', item).src,
  alt: $('img', item).alt,
  caption: item.dataset.caption
}));
let activeGallery = 0;
const lightbox = $('#lightbox');
function showGallery(index) {
  activeGallery = (index + galleryData.length) % galleryData.length;
  const current = galleryData[activeGallery];
  $('figure img', lightbox).src = current.src;
  $('figure img', lightbox).alt = current.alt;
  $('figcaption', lightbox).textContent = current.caption;
}
function openLightbox(index) {
  showGallery(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
$$('.gallery-item').forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
$('.lightbox-close').addEventListener('click', closeLightbox);
$('.lightbox-nav.prev').addEventListener('click', () => showGallery(activeGallery - 1));
$('.lightbox-nav.next').addEventListener('click', () => showGallery(activeGallery + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
window.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showGallery(activeGallery - 1);
  if (event.key === 'ArrowRight') showGallery(activeGallery + 1);
});

function validateForm(form) {
  let valid = true;
  $$('[required]', form).forEach(field => {
    const label = field.closest('label');
    const invalid = !field.value.trim();
    label?.classList.toggle('invalid', invalid);
    if (invalid) valid = false;
  });
  return valid;
}
function setupModal(modal) {
  const close = () => modal.close();
  $('.modal-close', modal).addEventListener('click', close);
  $('.modal-confirm', modal).addEventListener('click', close);
  modal.addEventListener('click', event => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) close();
  });
}
setupModal($('#successModal'));
setupModal($('#giftModal'));

$('#rsvpForm').addEventListener('submit', event => {
  event.preventDefault();
  if (!validateForm(event.currentTarget)) return;
  $('#successModal').showModal();
  event.currentTarget.reset();
});
$$('#rsvpForm input, #rsvpForm select').forEach(field => field.addEventListener('input', () => field.closest('label')?.classList.remove('invalid')));

const STORAGE_KEY = 'terra-amore-guest-gifts-v1';
const starterGifts = [
  { id: 'starter-1', giver: 'Mia & Daniel', gift: 'Handcrafted dinnerware set', category: 'Home', value: 180, note: 'For your first dinners as newlyweds.' },
  { id: 'starter-2', giver: 'Ava', gift: 'Weekend getaway fund', category: 'Travel', value: 250, note: 'A little adventure for two.' },
  { id: 'starter-3', giver: 'Theo', gift: 'Espresso machine', category: 'Kitchen', value: 210, note: 'For slow Sunday mornings.' }
];
let giftMemory = starterGifts.map(gift => ({ ...gift }));
function getGifts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    giftMemory = saved || giftMemory;
    return giftMemory;
  } catch {
    return giftMemory;
  }
}
function saveGifts(gifts) {
  giftMemory = gifts;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts)); }
  catch { /* Local demo fallback: keep gifts in memory for this page session. */ }
}
function currency(value) { return value ? new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(value) : 'With love'; }
function renderGifts() {
  const gifts = getGifts();
  const grid = $('#giftGrid');
  grid.innerHTML = '';
  gifts.forEach(gift => {
    const card = document.createElement('article');
    card.className = 'gift-card';
    card.dataset.category = gift.category;
    card.innerHTML = `<div><p>Added by ${escapeHTML(gift.giver)}</p><h3>${escapeHTML(gift.gift)}</h3><p>${escapeHTML(gift.note || 'A thoughtful gift for the couple.')}</p></div><div class="gift-value">${currency(Number(gift.value))}</div><button type="button" aria-label="Remove ${escapeHTML(gift.gift)}" data-id="${gift.id}">×</button>`;
    grid.appendChild(card);
  });
  $('#emptyGifts').hidden = gifts.length > 0;
  $$('[data-id]', grid).forEach(button => button.addEventListener('click', () => {
    saveGifts(getGifts().filter(gift => gift.id !== button.dataset.id));
    renderGifts();
  }));
}
function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
renderGifts();

$('#giftForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validateForm(form)) return;
  const data = Object.fromEntries(new FormData(form));
  const gifts = getGifts();
  gifts.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    giver: data.giver.trim(),
    gift: data.gift.trim(),
    category: data.category,
    value: Number(data.value || 0),
    note: data.note.trim()
  });
  saveGifts(gifts);
  renderGifts();
  form.reset();
  $('#giftModal').showModal();
});
$('#giftModal .modal-confirm').addEventListener('click', () => $('#giftListTitle').scrollIntoView({ behavior: 'smooth', block: 'start' }));
$('#clearGifts').addEventListener('click', () => {
  if (!confirm('Clear all gift entries in this browser demo?')) return;
  saveGifts([]);
  renderGifts();
});

const storyVideo = $('#storyVideo');
$('.story-trigger').addEventListener('click', () => {
  storyVideo.classList.add('open');
  storyVideo.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
});
$('#storyVideo > button').addEventListener('click', () => {
  storyVideo.classList.remove('open');
  storyVideo.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
});
storyVideo.addEventListener('click', event => {
  if (event.target !== storyVideo) return;
  $('#storyVideo > button').click();
});
