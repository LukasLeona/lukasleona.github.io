(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setHeaderState = () => {
    if (!header || header.classList.contains('header-solid')) return;
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const closeMenu = () => {
    body.classList.remove('menu-open');
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };
  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open');
    body.classList.toggle('menu-open', Boolean(isOpen));
    menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });
  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const fileName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href')?.split('#')[0].toLowerCase();
    if ((fileName === '' || fileName === 'index.html') && href === 'index.html') link.classList.add('active');
    if (href === fileName) link.classList.add('active');
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const hero = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero-video');
  const soundButton = document.querySelector('.sound-control');
  const soundLabel = document.querySelector('.sound-label');
  const soundGate = document.querySelector('.sound-gate');
  const enterSound = document.querySelector('[data-enter-sound]');
  const enterSilent = document.querySelector('[data-enter-silent]');
  let wantsSound = true;
  let heroVisible = true;

  const updateSoundUI = () => {
    if (!heroVideo || !soundButton) return;
    const isMuted = heroVideo.muted || heroVideo.volume === 0;
    soundButton.classList.toggle('muted', isMuted);
    soundButton.setAttribute('aria-label', isMuted ? 'Turn hero sound on' : 'Mute hero sound');
    soundButton.setAttribute('aria-pressed', String(!isMuted));
    if (soundLabel) soundLabel.textContent = isMuted ? 'Sound off' : 'Sound on';
  };

  const dismissGate = () => {
    soundGate?.classList.remove('show');
    soundGate?.setAttribute('aria-hidden', 'true');
  };

  if (heroVideo) {
    heroVideo.muted = false;
    heroVideo.volume = 0.72;
    const attempt = heroVideo.play();
    if (attempt?.catch) {
      attempt.catch(() => {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
        soundGate?.classList.add('show');
        soundGate?.setAttribute('aria-hidden', 'false');
        updateSoundUI();
      });
    }

    if (hero) {
      const heroObserver = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting && entry.intersectionRatio > 0.28;
        if (heroVisible) {
          heroVideo.play().catch(() => {});
          heroVideo.muted = !wantsSound;
        } else {
          heroVideo.muted = true;
        }
        updateSoundUI();
      }, { threshold: [0, .28, .6] });
      heroObserver.observe(hero);
    }
  }

  soundButton?.addEventListener('click', () => {
    if (!heroVideo) return;
    wantsSound = heroVideo.muted;
    heroVideo.muted = !wantsSound || !heroVisible;
    heroVideo.play().catch(() => {});
    updateSoundUI();
  });
  enterSound?.addEventListener('click', () => {
    wantsSound = true;
    if (heroVideo) {
      heroVideo.muted = false;
      heroVideo.volume = .72;
      heroVideo.play().catch(() => {});
    }
    dismissGate();
    updateSoundUI();
  });
  enterSilent?.addEventListener('click', () => {
    wantsSound = false;
    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {});
    }
    dismissGate();
    updateSoundUI();
  });
  updateSoundUI();

  const scrollVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > .22) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: [0, .22, .55] });
  document.querySelectorAll('video[data-scroll-video]').forEach((video) => scrollVideoObserver.observe(video));

  if (!reducedMotion) {
    let ticking = false;
    const updateParallax = () => {
      const viewport = window.innerHeight;
      document.querySelectorAll('[data-parallax]').forEach((element) => {
        const rect = element.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) return;
        const speed = Number(element.dataset.parallax || .08);
        const offset = (rect.top + rect.height / 2 - viewport / 2) * speed;
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateParallax);
    }, { passive: true });
    updateParallax();
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const homes = document.querySelectorAll('[data-home-card]');
  const count = document.querySelector('[data-homes-count]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      let visible = 0;
      homes.forEach((home) => {
        const match = filter === 'all' || home.dataset.homeCard?.split(' ').includes(filter);
        home.classList.toggle('is-hidden', !match);
        if (match) visible += 1;
      });
      if (count) count.textContent = `${visible} ${visible === 1 ? 'residence' : 'residences'}`;
    });
  });

  const modal = document.querySelector('.modal');
  const modalPanel = modal?.querySelector('.modal-panel');
  const closeModal = () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  };
  const openModal = () => {
    modal?.classList.add('open');
    modal?.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    setTimeout(() => modalPanel?.querySelector('input, select, button')?.focus(), 100);
  };
  document.querySelectorAll('[data-open-visit]').forEach((trigger) => trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  }));
  document.querySelectorAll('[data-close-modal]').forEach((trigger) => trigger.addEventListener('click', closeModal));
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

  const handleInquiryForm = (form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const status = form.parentElement?.querySelector('.form-status') || form.querySelector('.form-status');
      const name = String(data.get('name') || 'Prospective buyer');
      const email = String(data.get('email') || '');
      const phone = String(data.get('phone') || '');
      const interest = String(data.get('interest') || 'Canyon Ranch');
      const date = String(data.get('date') || 'To be arranged');
      const message = String(data.get('message') || 'I would like to learn more.');
      const subject = encodeURIComponent(`Canyon Ranch inquiry — ${interest}`);
      const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\nPreferred visit: ${date}\n\nMessage:\n${message}`);
      if (status) status.textContent = 'Opening your email app with the inquiry details…';
      window.location.href = `mailto:hello@canyonranch.ph?subject=${subject}&body=${bodyText}`;
    });
  };
  document.querySelectorAll('form[data-inquiry-form]').forEach(handleInquiryForm);

  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
  root.classList.add('js-ready');
})();
