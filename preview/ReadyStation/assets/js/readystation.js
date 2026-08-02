(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  // Sticky header
  const header = $('.site-header');
  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  // Responsive menu
  const menuButton = $('.menu-toggle');
  const mobilePanel = $('.mobile-panel');
  const closeMenu = () => {
    menuButton?.classList.remove('is-open');
    mobilePanel?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = !mobilePanel?.classList.contains('open');
    menuButton.classList.toggle('is-open', isOpen);
    mobilePanel?.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  $$('.mobile-panel a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeMenu();
  });

  // Current menu item
  const fileName = location.pathname.split('/').pop() || 'index.html';
  $$('[data-nav]').forEach(link => {
    const targets = (link.dataset.nav || '').split(',');
    if (targets.includes(fileName)) link.classList.add('active');
  });

  // Reveal on scroll
  const revealItems = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('revealed'));
  }

  // FAQ accordion
  $$('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      $$('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        $('.faq-question', openItem)?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Homepage learning checkpoint
  const demoChoices = $$('.choice[data-answer]');
  demoChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      const group = choice.closest('.checkpoint');
      const feedback = $('.check-feedback', group);
      $$('.choice', group).forEach(button => button.classList.remove('correct', 'wrong'));
      const isCorrect = choice.dataset.answer === 'correct';
      choice.classList.add(isCorrect ? 'correct' : 'wrong');
      if (feedback) {
        feedback.textContent = isCorrect
          ? 'Correct. Awareness-level personnel should recognize the hazard, protect themselves, and request trained resources.'
          : 'Not quite. Awareness-level personnel should not enter the hot zone or handle the material.';
        feedback.style.color = isCorrect ? 'var(--green-600)' : 'var(--danger)';
      }
    });
  });

  // Course filters and search
  const searchInput = $('#courseSearch');
  const courseCards = $$('.course-card[data-category]');
  let activeFilter = 'all';

  const applyCourseFilters = () => {
    const term = (searchInput?.value || '').trim().toLowerCase();
    courseCards.forEach(card => {
      const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
      const textMatches = !term || card.textContent.toLowerCase().includes(term);
      card.hidden = !(categoryMatches && textMatches);
    });
    const visible = courseCards.filter(card => !card.hidden).length;
    const results = $('#courseResults');
    if (results) results.textContent = `${visible} course${visible === 1 ? '' : 's'} available`;
  };

  searchInput?.addEventListener('input', applyCourseFilters);
  $$('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      $$('.filter-btn').forEach(item => item.classList.toggle('active', item === button));
      applyCourseFilters();
    });
  });

  // Demo-only forms
  const showToast = message => {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__rsToastTimer);
    window.__rsToastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
  };

  $$('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const type = form.dataset.demoForm;
      const messages = {
        login: 'Demo mode: secure learner login will be connected during the next development phase.',
        register: 'Demo mode: your account form is ready for backend integration.',
        contact: 'Message captured in the demo. Email delivery will be connected during production setup.',
        newsletter: 'You are on the demo notification list. Newsletter delivery will be connected later.'
      };
      showToast(messages[type] || 'This interaction is available in demo mode.');
    });
  });

  // Helper bot (hidden on course player pages)
  if (!document.body.classList.contains('player-body')) {
    const botMessages = {
      start: 'Hi, I’m the ReadyStation guide. I can answer quick questions about this LMS demo.',
      courses: 'You can start with HazMat Awareness, then continue to HazMat Operations, Fire Instructor 1, Fire Inspector 1, Driver Operator – Pumper, and Driver Operator – ARFF. All courses shown in the demo are free.',
      login: 'Login and registration are visible for the demo, but backend account functionality has not been connected yet.',
      learning: 'The HazMat Awareness course includes sections, quizzes, tests, a progress bar, and interactive checkpoints rather than long passive reading pages.',
      support: 'Need implementation help? Use the contact page to ask about production setup, LMS integrations, or branding updates.'
    };
    const bot = document.createElement('div');
    bot.className = 'rs-bot';
    bot.innerHTML = `
      <button class="rs-bot-toggle" type="button" aria-expanded="false" aria-label="Open ReadyStation helper">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10h8M8 14h5"/><path d="M12 2a8 8 0 0 0-8 8c0 2.19.88 4.17 2.29 5.61V22l4.06-2.03A7.96 7.96 0 0 0 12 20a8 8 0 1 0 0-18Z"/></svg>
        <span>Need help?</span>
      </button>
      <div class="rs-bot-panel" hidden>
        <div class="rs-bot-head">
          <strong>ReadyStation Helper</strong>
          <button class="rs-bot-close" type="button" aria-label="Close helper">×</button>
        </div>
        <div class="rs-bot-body">
          <div class="rs-bot-message bot">${botMessages.start}</div>
          <div class="rs-bot-quick-actions">
            <button type="button" data-bot-key="courses">Which courses are available?</button>
            <button type="button" data-bot-key="learning">How does the learning demo work?</button>
            <button type="button" data-bot-key="login">Does login work yet?</button>
            <button type="button" data-bot-key="support">How can I request support?</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(bot);

    const botToggle = $('.rs-bot-toggle', bot);
    const botPanel = $('.rs-bot-panel', bot);
    const botClose = $('.rs-bot-close', bot);
    const setBot = isOpen => {
      botPanel.hidden = !isOpen;
      bot.classList.toggle('open', isOpen);
      botToggle?.setAttribute('aria-expanded', String(isOpen));
    };
    botToggle?.addEventListener('click', () => setBot(botPanel.hidden));
    botClose?.addEventListener('click', () => setBot(false));
    $$('.rs-bot-quick-actions button', bot).forEach(button => {
      button.addEventListener('click', () => {
        const body = $('.rs-bot-body', bot);
        const userMessage = document.createElement('div');
        userMessage.className = 'rs-bot-message user';
        userMessage.textContent = button.textContent;
        const botReply = document.createElement('div');
        botReply.className = 'rs-bot-message bot';
        botReply.textContent = botMessages[button.dataset.botKey] || botMessages.start;
        body.appendChild(userMessage);
        body.appendChild(botReply);
        body.scrollTop = body.scrollHeight;
      });
    });
  }

  // Copy year
  $$('[data-current-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });
})();
