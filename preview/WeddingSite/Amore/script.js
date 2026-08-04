const WEDDING_CONFIG = {
  date: '2028-08-12T15:30:00+08:00',
  title: 'Adrian & Camille Wedding',
  location: 'Farm Hills Garden and Hillcreek Gardens, Tagaytay',
  calendarDescription: 'Wedding ceremony at Farm Hills Garden followed by the reception at Hillcreek Gardens Tagaytay.'
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const header = $('#siteHeader');
const progress = $('.page-progress span');
const cursor = $('.cursor-orbit');
const menuToggle = $('.menu-toggle');
const mainNav = $('#mainNav');

document.documentElement.classList.add('js-ready');
window.addEventListener('load', () => document.body.classList.add('page-loaded'));
setTimeout(() => $$('.hero .reveal').forEach(element => element.classList.add('is-visible')), 100);

function updateScrollUI() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  header?.classList.toggle('scrolled', y > 30);

  let current = '';
  $$('main section[id]').forEach(section => {
    if (y >= section.offsetTop - 170) current = section.id;
  });
  $$('.main-nav a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mainNav?.classList.toggle('open', !open);
  document.body.classList.toggle('nav-open', !open);
});
$$('.main-nav a').forEach(link => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  mainNav?.classList.remove('open');
  document.body.classList.remove('nav-open');
}));

const revealElements = $$('.reveal');

// Show the hero immediately so the page can never appear blank while the
// observer is starting. The remaining sections still animate on scroll.
$$('.hero .reveal').forEach(element => {
  element.classList.add('reveal-ready', 'is-visible');
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty('--delay', `${entry.target.dataset.delay || 0}ms`);
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px' });

  revealElements.forEach(element => {
    if (!element.classList.contains('is-visible')) revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => element.classList.add('is-visible'));
}

function updateCountdown() {
  const target = new Date(WEDDING_CONFIG.date).getTime();
  if (!Number.isFinite(target)) return;
  const diff = Math.max(0, target - Date.now());
  $('#days').textContent = String(Math.floor(diff / 86400000)).padStart(3, '0');
  $('#hours').textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
  $('#minutes').textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
  $('#seconds').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

if (window.matchMedia('(pointer:fine)').matches && cursor) {
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
      button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .18}px)`;
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
const heroImage = $('.hero-image-wrap img');
const parallaxItems = $$('[data-parallax]');
window.addEventListener('scroll', () => {
  if (rafId || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  rafId = requestAnimationFrame(() => {
    const y = window.scrollY;
    if (heroImage && y < window.innerHeight * 1.2) heroImage.style.transform = `scale(1.055) translateY(${y * .04}px)`;
    parallaxItems.forEach(item => {
      const rate = Number(item.dataset.parallax || 0.06);
      const rect = item.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * rate;
      item.style.transform = `translate3d(0, ${Math.max(-30, Math.min(30, offset - 30))}px, 0)`;
    });
    rafId = null;
  });
}, { passive: true });

function setupModal(modal) {
  if (!modal) return;
  const close = () => modal.close();
  $('.modal-close', modal)?.addEventListener('click', close);
  $('.modal-confirm', modal)?.addEventListener('click', close);
  modal.addEventListener('click', event => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) close();
  });
}
['#successModal', '#giftModal', '#calendarModal'].forEach(selector => setupModal($(selector)));

$('.calendar-button')?.addEventListener('click', () => {
  const start = new Date(WEDDING_CONFIG.date);
  const end = new Date(start.getTime() + 7 * 60 * 60 * 1000);
  const fmt = date => {
    const pad = n => String(n).padStart(2, '0');
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  };
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Adrian and Camille//Wedding//EN','BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,
    `SUMMARY:${WEDDING_CONFIG.title}`,`LOCATION:${WEDDING_CONFIG.location}`,
    `DESCRIPTION:${WEDDING_CONFIG.calendarDescription}`,'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const anchor = Object.assign(document.createElement('a'), { href: url, download: 'adrian-camille-wedding.ics' });
  anchor.click();
  URL.revokeObjectURL(url);
});

$$('.entourage-tab').forEach(tab => tab.addEventListener('click', () => {
  const targetId = tab.dataset.panel;
  $$('.entourage-tab').forEach(button => {
    const active = button === tab;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  $$('.entourage-panel').forEach(panel => {
    const active = panel.id === targetId;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}));

const galleryData = $$('.gallery-item').map(item => ({
  src: $('img', item).src,
  alt: $('img', item).alt,
  caption: item.dataset.caption
}));
let activeGallery = 0;
const lightbox = $('#lightbox');
function showGallery(index) {
  if (!lightbox || !galleryData.length) return;
  activeGallery = (index + galleryData.length) % galleryData.length;
  const current = galleryData[activeGallery];
  $('figure img', lightbox).src = current.src;
  $('figure img', lightbox).alt = current.alt;
  $('figcaption', lightbox).textContent = current.caption;
}
function openLightbox(index) {
  showGallery(index);
  lightbox?.classList.add('open');
  lightbox?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closeLightbox() {
  lightbox?.classList.remove('open');
  lightbox?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
$$('.gallery-item').forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
$('.lightbox-close')?.addEventListener('click', closeLightbox);
$('.lightbox-nav.prev')?.addEventListener('click', () => showGallery(activeGallery - 1));
$('.lightbox-nav.next')?.addEventListener('click', () => showGallery(activeGallery + 1));
lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
window.addEventListener('keydown', event => {
  if (!lightbox?.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showGallery(activeGallery - 1);
  if (event.key === 'ArrowRight') showGallery(activeGallery + 1);
});

function validateForm(form) {
  let valid = true;
  $$('[required]', form).forEach(field => {
    const invalid = !field.value.trim();
    field.closest('label')?.classList.toggle('invalid', invalid);
    if (invalid) valid = false;
  });
  return valid;
}

$('#rsvpForm')?.addEventListener('submit', event => {
  event.preventDefault();
  if (!validateForm(event.currentTarget)) return;
  $('#successModal')?.showModal();
  event.currentTarget.reset();
});
$$('#rsvpForm input, #rsvpForm select').forEach(field => field.addEventListener('input', () => field.closest('label')?.classList.remove('invalid')));

const STORAGE_KEY = 'adrian-camille-guest-gifts-v2';
const starterGifts = [
  { id: 'starter-1', giver: 'Sample Guest', gift: 'Espresso machine', category: 'Kitchen', value: 7200, note: 'For cozy mornings together.' },
  { id: 'starter-2', giver: 'Sample Guest', gift: 'Weekend getaway fund', category: 'Travel', value: 10000, note: 'For your first adventure as newlyweds.' },
  { id: 'starter-3', giver: 'Sample Guest', gift: 'Dinnerware set', category: 'Home', value: 4800, note: 'For the table where new memories begin.' }
];
let giftMemory = starterGifts.map(gift => ({ ...gift }));
function getGifts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    giftMemory = saved || giftMemory;
    return giftMemory;
  } catch { return giftMemory; }
}
function saveGifts(gifts) {
  giftMemory = gifts;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts)); } catch { }
}
function currency(value) {
  return value ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(value) : 'With love';
}
function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
function renderGifts() {
  const grid = $('#giftGrid');
  if (!grid) return;
  const gifts = getGifts();
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
renderGifts();

$('#giftForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!validateForm(form)) return;
  const data = Object.fromEntries(new FormData(form));
  const gifts = getGifts();
  gifts.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    giver: data.giver.trim(), gift: data.gift.trim(), category: data.category,
    value: Number(data.value || 0), note: data.note.trim()
  });
  saveGifts(gifts);
  renderGifts();
  form.reset();
  $('#giftModal')?.showModal();
});
$('#giftModal .modal-confirm')?.addEventListener('click', () => $('#giftListTitle')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
$('#clearGifts')?.addEventListener('click', () => {
  if (!confirm('Clear all gift entries in this browser demo?')) return;
  saveGifts([]);
  renderGifts();
});

const storyVideo = $('#storyVideo');
$('.story-trigger')?.addEventListener('click', () => {
  storyVideo?.classList.add('open');
  storyVideo?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
});
$('#storyVideo > button')?.addEventListener('click', () => {
  storyVideo?.classList.remove('open');
  storyVideo?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
});
storyVideo?.addEventListener('click', event => {
  if (event.target === storyVideo) $('#storyVideo > button')?.click();
});
