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
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
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
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add('revealed'));
  }

  // Page scroll progress
  if (!document.body.classList.contains('player-body')) {
    const scrollProgress = document.createElement('span');
    scrollProgress.className = 'site-progress';
    scrollProgress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(scrollProgress);
    let ticking = false;
    const updateScrollProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percent = available > 0 ? Math.min(1, window.scrollY / available) : 0;
      scrollProgress.style.transform = `scaleX(${percent})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    }, { passive: true });
    updateScrollProgress();
  }

  // Animate factual counters when they enter view
  const counters = $$('.stat-card strong');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const raw = node.textContent.trim();
        const target = Number(raw.replace(/[^0-9]/g, ''));
        const suffix = raw.replace(/[0-9]/g, '');
        if (!Number.isFinite(target)) return;
        const started = performance.now();
        const duration = 760;
        const animate = now => {
          const progress = Math.min(1, (now - started) / duration);
          node.textContent = `${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${suffix}`;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(node);
      });
    }, { threshold: .65 });
    counters.forEach(counter => counterObserver.observe(counter));
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
      start: 'Welcome to Fire and Rescue Academy. I can help you find a course or explain how this training demo works.',
      courses: 'Start with the complete HazMat Awareness experience. The catalog also previews HazMat Operations, Fire Instructor 1, Fire Inspector 1, Driver Operator - Pumper, and Driver Operator - ARFF. All courses shown are free.',
      login: 'Login and registration are visible for the demo, but backend account functionality has not been connected yet.',
      learning: 'HazMat Awareness includes short sections, natural field photography, scenario checks, matching, sorting, quizzes, tests, experience points, achievement badges, and browser-based progress.',
      support: 'Use the contact page for questions about academy implementation, LMS integrations, content migration, or support.',
      hazmat: 'HazMat Awareness focuses on recognition, awareness-level responsibilities, hazard clues, safe information gathering, and initial protective actions.',
      fallback: 'I can help with courses, the HazMat learning experience, learner access, or contacting the academy.'
    };
    const bot = document.createElement('div');
    bot.className = 'rs-bot';
    bot.innerHTML = `
      <button class="rs-bot-toggle" type="button" aria-expanded="false" aria-label="Open Fire and Rescue Academy helper">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10h8M8 14h5"/><path d="M12 2a8 8 0 0 0-8 8c0 2.19.88 4.17 2.29 5.61V22l4.06-2.03A7.96 7.96 0 0 0 12 20a8 8 0 1 0 0-18Z"/></svg>
        <span>Need help?</span>
      </button>
      <div class="rs-bot-panel" role="dialog" aria-label="Academy assistant" hidden>
        <div class="rs-bot-head">
          <div><strong>Academy Assistant</strong><small>Local demo guide</small></div>
          <div class="rs-bot-head-actions"><button class="rs-bot-minimize" type="button" aria-label="Minimize assistant">−</button><button class="rs-bot-close" type="button" aria-label="Close assistant">×</button></div>
        </div>
        <div class="rs-bot-body" aria-live="polite">
          <div class="rs-bot-message bot">${botMessages.start}</div>
          <div class="rs-bot-quick-actions">
            <button type="button" data-bot-key="courses">What courses can I explore?</button>
            <button type="button" data-bot-key="hazmat">What does HazMat Awareness cover?</button>
            <button type="button" data-bot-key="learning">How is the course interactive?</button>
            <button type="button" data-bot-key="login">Can I create a learner account?</button>
          </div>
        </div>
        <form class="rs-bot-compose">
          <input type="text" name="message" aria-label="Ask the Academy Assistant" placeholder="Ask about courses or training" autocomplete="off">
          <button class="rs-bot-send" type="submit" aria-label="Send message"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </form>
      </div>`;
    document.body.appendChild(bot);

    const botToggle = $('.rs-bot-toggle', bot);
    const botPanel = $('.rs-bot-panel', bot);
    const botClose = $('.rs-bot-close', bot);
    const botMinimize = $('.rs-bot-minimize', bot);
    const botForm = $('.rs-bot-compose', bot);
    const botInput = $('input[name="message"]', bot);
    const setBot = isOpen => {
      botPanel.hidden = !isOpen;
      bot.classList.toggle('open', isOpen);
      botToggle?.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) setTimeout(() => botInput?.focus(), 80);
    };
    const chooseReply = value => {
      const text = value.toLowerCase();
      if (text.includes('hazmat') || text.includes('hazard')) return botMessages.hazmat;
      if (text.includes('course') || text.includes('training')) return botMessages.courses;
      if (text.includes('quiz') || text.includes('interactive') || text.includes('learn')) return botMessages.learning;
      if (text.includes('login') || text.includes('account') || text.includes('register')) return botMessages.login;
      if (text.includes('contact') || text.includes('support') || text.includes('help')) return botMessages.support;
      return botMessages.fallback;
    };
    const sendBotMessage = (message, key) => {
      const body = $('.rs-bot-body', bot);
      if (!body || !message.trim()) return;
      const userMessage = document.createElement('div');
      userMessage.className = 'rs-bot-message user';
      userMessage.textContent = message.trim();
      const typing = document.createElement('div');
      typing.className = 'rs-bot-message bot rs-bot-typing';
      typing.setAttribute('aria-label', 'Assistant is typing');
      typing.innerHTML = '<i></i><i></i><i></i>';
      body.append(userMessage, typing);
      body.scrollTop = body.scrollHeight;
      setTimeout(() => {
        const botReply = document.createElement('div');
        botReply.className = 'rs-bot-message bot';
        botReply.textContent = key ? (botMessages[key] || botMessages.fallback) : chooseReply(message);
        typing.replaceWith(botReply);
        body.scrollTop = body.scrollHeight;
      }, 520);
    };
    botToggle?.addEventListener('click', () => setBot(botPanel.hidden));
    botClose?.addEventListener('click', () => setBot(false));
    botMinimize?.addEventListener('click', () => setBot(false));
    $$('.rs-bot-quick-actions button', bot).forEach(button => {
      button.addEventListener('click', () => sendBotMessage(button.textContent, button.dataset.botKey));
    });
    botForm?.addEventListener('submit', event => {
      event.preventDefault();
      sendBotMessage(botInput.value);
      botInput.value = '';
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !botPanel.hidden) setBot(false);
    });
  }

  // Copy year
  $$('[data-current-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });
})();
