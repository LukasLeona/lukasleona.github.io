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

  const scrollProgressFill = document.querySelector('.scroll-progress i');
  const updateScrollProgress = () => {
    if (!scrollProgressFill) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    scrollProgressFill.style.transform = `scaleX(${progress})`;
  };
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

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

    const heroCopy = document.querySelector('[data-hero-copy]');
    const heroIndex = document.querySelector('[data-hero-index]');
    const heroKicker = document.querySelector('[data-hero-kicker]');
    const heroLineOne = document.querySelector('[data-hero-line-one]');
    const heroLineTwo = document.querySelector('[data-hero-line-two]');
    const heroDescription = document.querySelector('[data-hero-description]');
    const timelineSegments = [...document.querySelectorAll('.hero-timeline span')];
    const heroStories = [
      { kicker: 'Private hillside living in Carmona', one: 'Where the horizon', two: 'feels like home.', description: 'A residential community where architecture opens naturally to light, landscape, and a more considered pace.' },
      { kicker: 'Interiors with room to breathe', one: 'Space, considered', two: 'down to the light.', description: 'Generous rooms, framed views, and quiet material choices turn everyday living into something beautifully effortless.' },
      { kicker: 'Architecture for real family life', one: 'Designed for the life', two: 'you are building.', description: 'Flexible places to gather, retreat, work, and grow—shaped around the rhythms that make a house yours.' },
      { kicker: 'An arrival with a sense of place', one: 'Every return', two: 'feels elevated.', description: 'From the first turn home to the last light upstairs, every detail is composed to make arrival feel different.' },
      { kicker: 'A quieter address in the south', one: 'Come home to', two: 'higher ground.', description: 'Contemporary homes, green ridges, and connected southern living come together at Canyon Ranch.' }
    ];
    const storyBoundaries = [0, 8.8, 17.7, 26.8, 35.2, 46.6];
    let activeStory = 0;
    let storySwapTimer;

    const updateHeroStory = () => {
      const time = heroVideo.currentTime || 0;
      let nextStory = storyBoundaries.findIndex((boundary, index) => index < storyBoundaries.length - 1 && time >= boundary && time < storyBoundaries[index + 1]);
      if (nextStory < 0) nextStory = 0;

      timelineSegments.forEach((segment, index) => {
        const start = storyBoundaries[index];
        const end = storyBoundaries[index + 1];
        const value = time >= end ? 1 : time <= start ? 0 : (time - start) / (end - start);
        segment.style.setProperty('--segment-progress', String(Math.max(0, Math.min(1, value))));
      });

      if (nextStory === activeStory) return;
      activeStory = nextStory;
      heroCopy?.classList.add('is-changing');
      window.clearTimeout(storySwapTimer);
      storySwapTimer = window.setTimeout(() => {
        const story = heroStories[activeStory];
        if (heroIndex) heroIndex.textContent = String(activeStory + 1).padStart(2, '0');
        if (heroKicker) heroKicker.textContent = story.kicker;
        if (heroLineOne) heroLineOne.textContent = story.one;
        if (heroLineTwo) heroLineTwo.textContent = story.two;
        if (heroDescription) heroDescription.textContent = story.description;
        requestAnimationFrame(() => heroCopy?.classList.remove('is-changing'));
      }, 270);
    };
    heroVideo.addEventListener('timeupdate', updateHeroStory);
    heroVideo.addEventListener('seeked', updateHeroStory);
    updateHeroStory();
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

  const cinematicCtas = document.querySelectorAll('[data-cinematic-cta]');
  if (cinematicCtas.length) {
    const activeCtas = new WeakSet();
    const ctaTimers = new WeakMap();

    const setCtaCopyVisible = (section, visible) => {
      const content = section.querySelector('.cta-content');
      section.classList.toggle('is-copy-visible', visible);
      content?.toggleAttribute('inert', !visible);
      content?.setAttribute('aria-hidden', String(!visible));
    };

    const resetCtaVideo = (video) => {
      if (!video) return;
      const reset = () => {
        try { video.currentTime = 0; } catch {}
        video.play().catch(() => {});
      };
      if (video.readyState >= 1) reset();
      else video.addEventListener('loadedmetadata', reset, { once: true });
    };

    cinematicCtas.forEach((section) => setCtaCopyVisible(section, reducedMotion));

    if (!reducedMotion) {
      const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const section = entry.target;
          const video = section.querySelector('[data-cta-video]');
          const previousTimer = ctaTimers.get(section);

          if (entry.isIntersecting && entry.intersectionRatio >= .34) {
            if (activeCtas.has(section)) return;
            activeCtas.add(section);
            window.clearTimeout(previousTimer);
            setCtaCopyVisible(section, false);
            resetCtaVideo(video);
            const timer = window.setTimeout(() => setCtaCopyVisible(section, true), 2700);
            ctaTimers.set(section, timer);
          } else if (!entry.isIntersecting || entry.intersectionRatio < .18) {
            activeCtas.delete(section);
            window.clearTimeout(previousTimer);
            setCtaCopyVisible(section, false);
          }
        });
      }, { threshold: [0, .18, .34, .6] });

      cinematicCtas.forEach((section) => ctaObserver.observe(section));
    }
  }

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

  const residenceCarousel = document.querySelector('[data-residence-carousel]');
  if (residenceCarousel) {
    const cards = [...residenceCarousel.querySelectorAll('.home-card')];
    const currentLabel = document.querySelector('[data-carousel-current]');
    const previousButton = document.querySelector('[data-carousel-prev]');
    const nextButton = document.querySelector('[data-carousel-next]');
    let carouselIndex = 0;
    let carouselTimer;
    let carouselScrollTicking = false;

    const markCurrentCard = () => {
      cards.forEach((card, index) => card.classList.toggle('is-current', index === carouselIndex));
      if (currentLabel) currentLabel.textContent = String(carouselIndex + 1).padStart(2, '0');
    };

    const goToResidence = (index) => {
      carouselIndex = (index + cards.length) % cards.length;
      const card = cards[carouselIndex];
      residenceCarousel.scrollTo({ left: card.offsetLeft - cards[0].offsetLeft, behavior: reducedMotion ? 'auto' : 'smooth' });
      markCurrentCard();
    };

    const syncCarouselIndex = () => {
      const origin = cards[0].offsetLeft;
      carouselIndex = cards.reduce((closest, card, index) => {
        const currentDistance = Math.abs((card.offsetLeft - origin) - residenceCarousel.scrollLeft);
        const closestDistance = Math.abs((cards[closest].offsetLeft - origin) - residenceCarousel.scrollLeft);
        return currentDistance < closestDistance ? index : closest;
      }, 0);
      markCurrentCard();
      carouselScrollTicking = false;
    };

    const stopCarousel = () => window.clearInterval(carouselTimer);
    const startCarousel = () => {
      stopCarousel();
      if (!reducedMotion) carouselTimer = window.setInterval(() => goToResidence(carouselIndex + 1), 5200);
    };

    previousButton?.addEventListener('click', () => { goToResidence(carouselIndex - 1); startCarousel(); });
    nextButton?.addEventListener('click', () => { goToResidence(carouselIndex + 1); startCarousel(); });
    residenceCarousel.addEventListener('scroll', () => {
      if (carouselScrollTicking) return;
      carouselScrollTicking = true;
      requestAnimationFrame(syncCarouselIndex);
    }, { passive: true });
    residenceCarousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); goToResidence(carouselIndex + 1); startCarousel(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); goToResidence(carouselIndex - 1); startCarousel(); }
    });
    residenceCarousel.addEventListener('pointerenter', stopCarousel);
    residenceCarousel.addEventListener('pointerleave', startCarousel);
    residenceCarousel.addEventListener('focusin', stopCarousel);
    residenceCarousel.addEventListener('focusout', startCarousel);
    document.addEventListener('visibilitychange', () => document.hidden ? stopCarousel() : startCarousel());
    markCurrentCard();
    startCarousel();
  }

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
