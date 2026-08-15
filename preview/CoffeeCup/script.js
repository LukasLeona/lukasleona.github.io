(() => {
  const video = document.getElementById('coffeeVideo');
  const story = document.getElementById('story');
  const scenes = [...document.querySelectorAll('.story-scene')];
  const progressBar = document.getElementById('storyProgressBar');
  const sceneNumber = document.getElementById('sceneNumber');
  const scrollCue = document.getElementById('scrollCue');
  const loader = document.getElementById('loader');
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  const storyStage = story?.querySelector('.story__stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sceneStops = [0, 0.12, 0.27, 0.50, 0.65, 0.88, 1];
  let duration = 8;
  let targetTime = 0;
  let displayedTime = 0;
  let rafId = null;
  let currentScene = 0;

  function hideLoader() {
    window.setTimeout(() => loader?.classList.add('is-hidden'), 250);
  }

  function getStoryProgress() {
    const rect = story.getBoundingClientRect();
    const scrollable = story.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    return Math.min(1, Math.max(0, -rect.top / scrollable));
  }

  function setScene(progress) {
    let nextScene = sceneStops.length - 2;
    for (let i = 0; i < sceneStops.length - 1; i += 1) {
      if (progress >= sceneStops[i] && progress < sceneStops[i + 1]) {
        nextScene = i;
        break;
      }
    }

    if (nextScene !== currentScene) {
      scenes[currentScene]?.classList.remove('is-active');
      scenes[nextScene]?.classList.add('is-active');
      currentScene = nextScene;
    }

    scenes.forEach((scene, index) => {
      scene.setAttribute('aria-hidden', String(index !== nextScene));
    });
    if (storyStage) storyStage.dataset.scene = String(nextScene);

    if (sceneNumber) sceneNumber.textContent = String(nextScene + 1).padStart(2, '0');
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
    scrollCue?.classList.toggle('is-hidden', progress > 0.08);
  }

  function updateScrollState() {
    const progress = getStoryProgress();
    targetTime = Math.min(duration - 0.04, Math.max(0.01, progress * duration));
    setScene(progress);
    header?.classList.toggle('is-solid', window.scrollY > story.offsetHeight - window.innerHeight * 0.35);
  }

  function renderVideo() {
    const difference = targetTime - displayedTime;
    displayedTime += difference * 0.13;

    if (video.readyState >= 2 && Math.abs(video.currentTime - displayedTime) > 0.012) {
      try { video.currentTime = displayedTime; } catch (_) { /* Browser still preparing media */ }
    }

    rafId = requestAnimationFrame(renderVideo);
  }

  function initializeVideo() {
    duration = Number.isFinite(video.duration) ? video.duration : 8;
    video.pause();
    video.currentTime = 0.01;
    updateScrollState();
    hideLoader();
    if (!reduceMotion && !rafId) rafId = requestAnimationFrame(renderVideo);
  }

  if (video.readyState >= 1) initializeVideo();
  else video.addEventListener('loadedmetadata', initializeVideo, { once: true });

  video.addEventListener('canplay', hideLoader, { once: true });
  window.setTimeout(hideLoader, 4500);

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateScrollState();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateScrollState);

  function closeMenu() {
    nav?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const selected = { milk: 'Whole', sweetness: 'Regular', espresso: 'Double', ice: 'Classic ice' };
  const orderSummary = document.getElementById('orderSummary');
  const orderPrice = document.getElementById('orderPrice');
  const orderLink = document.getElementById('orderLink');
  const textureLabel = document.getElementById('textureLabel');
  const intensityDots = [...document.querySelectorAll('#intensityDots b')];
  const drink = document.querySelector('.order-card__drink');

  function updateCustomizer() {
    const sweetnessText = selected.sweetness === 'Light' ? 'light caramel' : selected.sweetness === 'Extra' ? 'extra caramel' : 'regular caramel';
    const shotCount = selected.espresso === 'Single' ? 1 : selected.espresso === 'Triple' ? 3 : 2;
    const price = 5.8 + (selected.milk === 'Whole' ? 0 : 0.6) + (selected.espresso === 'Triple' ? 0.9 : 0);
    const texture = selected.milk === 'Oat' ? 'Velvety' : selected.milk === 'Almond' ? 'Light' : 'Silky';

    orderSummary.textContent = `${selected.espresso} espresso · ${selected.milk} milk · ${sweetnessText} · ${selected.ice}`;
    orderPrice.textContent = `$${price.toFixed(2)}`;
    textureLabel.textContent = texture;
    intensityDots.forEach((dot, index) => dot.classList.toggle('is-on', index < shotCount + 1));

    const sweetnessScale = selected.sweetness === 'Light' ? 0.94 : selected.sweetness === 'Extra' ? 1.05 : 1;
    const milkOpacity = selected.milk === 'Oat' ? 0.58 : selected.milk === 'Almond' ? 0.42 : 0.48;
    const iceOpacity = selected.ice === 'Light ice' ? 0.34 : 0.6;
    drink.style.transform = `scale(${sweetnessScale})`;
    drink.querySelector('.order-card__milk').style.opacity = milkOpacity;
    drink.querySelector('.order-card__ice').style.opacity = iceOpacity;

    const orderText = `${selected.espresso} espresso, ${selected.milk} milk, ${sweetnessText}, ${selected.ice}`;
    orderLink.href = `mailto:orders@slowpour.example?subject=${encodeURIComponent('My Slow Pour order')}&body=${encodeURIComponent(`I'd like an iced caramel latte with ${orderText}.`)}`;
  }

  document.querySelectorAll('.segmented').forEach(group => {
    group.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      group.querySelectorAll('button').forEach(item => {
        item.classList.remove('is-selected');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('is-selected');
      button.setAttribute('aria-pressed', 'true');
      selected[group.dataset.option] = button.dataset.value;
      updateCustomizer();
    });
  });

  updateCustomizer();
})();
