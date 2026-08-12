const body = document.body;
const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setMenu = (open) => {
  body.classList.toggle('menu-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
};

menuToggle?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const handleScroll = () => header?.classList.toggle('scrolled', window.scrollY > 20);
handleScroll();
window.addEventListener('scroll', handleScroll, { passive: true });

document.querySelectorAll('[data-delay]').forEach((element) => {
  element.style.setProperty('--delay', `${element.dataset.delay}ms`);
});

const animateCounter = (element) => {
  if (element.dataset.animated) return;
  element.dataset.animated = 'true';
  const target = Number(element.dataset.counter);
  const suffix = element.dataset.suffix || '';
  const decimals = target % 1 === 0 ? 0 : 1;
  const duration = 1100;
  const start = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      entry.target.querySelectorAll?.('[data-counter]').forEach(animateCounter);
      if (entry.target.matches('[data-counter]')) animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -30px' });

  document.querySelectorAll('.reveal, [data-counter]').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('in-view'));
  document.querySelectorAll('[data-counter]').forEach((element) => {
    element.textContent = `${element.dataset.counter}${element.dataset.suffix || ''}`;
  });
}

const scroller = document.querySelector('#product-scroller');
document.querySelectorAll('.slider-button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = scroller?.querySelector('.product-card');
    if (!scroller || !card) return;
    const amount = card.getBoundingClientRect().width + 20;
    scroller.scrollBy({ left: button.dataset.direction === 'next' ? amount : -amount, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((faq) => {
      faq.classList.remove('open');
      faq.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const hero = document.querySelector('.hero');
if (hero && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const x = ((event.clientX / window.innerWidth) - .5) * 30;
    const y = ((event.clientY / window.innerHeight) - .5) * 24;
    hero.style.setProperty('--glow-x', `${x}px`);
    hero.style.setProperty('--glow-y', `${y}px`);
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();
