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

// Featured gallery filters and lightbox
const galleryFilters = document.querySelectorAll('[data-filter]');
const galleryCards = document.querySelectorAll('.gallery-card[data-category]');

galleryFilters.forEach((button) => {
  button.addEventListener('click', () => {
    galleryFilters.forEach((filter) => filter.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    galleryCards.forEach((card) => {
      card.classList.toggle('is-hidden', category !== 'all' && card.dataset.category !== category);
    });
  });
});

const lightbox = document.querySelector('.gallery-lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('figcaption');
let lastPreviewButton = null;

document.querySelectorAll('.gallery-preview').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lastPreviewButton = button;
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.dataset.title;
    lightboxCaption.textContent = button.dataset.title;
    lightbox.showModal();
  });
});

const closeLightbox = () => {
  lightbox?.close();
  lastPreviewButton?.focus();
};

lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

// Local inquiry assistant. It answers verified basics and hands nuanced questions to the team.
const assistant = document.querySelector('[data-chat-assistant]');
const chatLauncher = assistant?.querySelector('.chat-launcher');
const chatPanel = assistant?.querySelector('.chat-panel');
const chatClose = assistant?.querySelector('.chat-close');
const chatForm = assistant?.querySelector('.chat-form');
const chatInput = assistant?.querySelector('input[name="question"]');
const chatMessages = assistant?.querySelector('.chat-messages');

const setChatOpen = (open) => {
  if (!chatPanel || !chatLauncher) return;
  chatPanel.hidden = !open;
  chatLauncher.setAttribute('aria-expanded', String(open));
  chatLauncher.setAttribute('aria-label', open ? 'Inquiry assistant is open' : 'Open inquiry assistant');
  if (open) window.setTimeout(() => chatInput?.focus(), 80);
};

chatLauncher?.addEventListener('click', () => setChatOpen(chatPanel?.hidden));
chatClose?.addEventListener('click', () => setChatOpen(false));

const chatKnowledge = [
  {
    test: /(hello|hi|hey|good morning|good afternoon|good evening)/i,
    answer: 'Hello! I can help with featured furniture, prices, showroom locations, opening hours, availability, delivery, or contact details. What would you like to know?'
  },
  {
    test: /(price|cost|how much|latest deal|discount|promo)/i,
    answer: 'Prices and promotions can change. Send the team a screenshot of the item you like so they can confirm the latest price and available deal. <a href="https://m.me/furnituredealsph" target="_blank" rel="noopener">Ask on Messenger ↗</a>'
  },
  {
    test: /(showroom|branch|location|where|address|visit)/i,
    answer: 'Furniture Deals Philippines lists three showroom areas: Imus and Dasmariñas in Cavite, plus Sta. Maria in Bulacan. Please confirm the exact address and item stock before visiting.'
  },
  {
    test: /(open|hours|time|online|schedule)/i,
    answer: 'The page lists online assistance daily from 10:00 AM to 7:00 PM.'
  },
  {
    test: /(phone|number|call|text|viber|contact)/i,
    answer: 'You can call, text, or Viber 0968 102 0089, 0917 323 9437, or 0917 726 2526. Online assistance is listed daily from 10 AM to 7 PM.'
  },
  {
    test: /(deliver|delivery|shipping|ship|pickup|pick up)/i,
    answer: 'Delivery or pickup options depend on the item and your location. Send your city or barangay together with the furniture screenshot so the team can confirm what is available.'
  },
  {
    test: /(available|availability|stock|color|colour|size|dimension|measurement)/i,
    answer: 'Stock, colors, sizes, and measurements can vary by item and branch. Share the product photo with the team to get the current details before ordering or visiting.'
  },
  {
    test: /(payment|installment|cash|gcash|card|deposit|cod)/i,
    answer: 'Payment methods and installment terms should be confirmed directly with the team for your chosen item. I do not want to guess about financial terms. <a href="https://m.me/furnituredealsph" target="_blank" rel="noopener">Confirm payment options ↗</a>'
  },
  {
    test: /(warranty|return|exchange|damaged|refund)/i,
    answer: 'Warranty, return, exchange, and damage policies may depend on the product and transaction. Please ask the team for the applicable policy before finalizing your order.'
  },
  {
    test: /(gallery|featured|collection|sofa|bed|dining|table|chair|furniture)/i,
    answer: 'You can browse the <a href="featured.html">featured furniture gallery</a> for living room, dining, and bedroom pieces. Open any photo for a closer look, then message the team for its current price.'
  }
];

const getChatAnswer = (question) => {
  const match = chatKnowledge.find((item) => item.test.test(question));
  return match?.answer || 'That is a good question. I can record any question here, but a team member should answer this one accurately. Please continue on <a href="https://m.me/furnituredealsph" target="_blank" rel="noopener">Messenger ↗</a> and include the furniture photo or details if available.';
};

const addChatMessage = (content, sender) => {
  if (!chatMessages) return;
  const message = document.createElement('div');
  message.className = `chat-message ${sender}`;
  const paragraph = document.createElement('p');
  if (sender === 'bot') paragraph.innerHTML = content;
  else paragraph.textContent = content;
  message.append(paragraph);
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const submitQuestion = (question) => {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  setChatOpen(true);
  addChatMessage(cleanQuestion, 'user');
  window.setTimeout(() => addChatMessage(getChatAnswer(cleanQuestion), 'bot'), reduceMotion ? 0 : 320);
};

assistant?.querySelectorAll('[data-question]').forEach((button) => {
  button.addEventListener('click', () => submitQuestion(button.dataset.question));
});

chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  submitQuestion(chatInput.value);
  chatInput.value = '';
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && chatPanel && !chatPanel.hidden) setChatOpen(false);
});
