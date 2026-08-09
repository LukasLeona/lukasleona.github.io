(() => {
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smoothstep = (value) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  document.body.classList.add("is-loaded");
  document.getElementById("year").textContent = new Date().getFullYear();

  const splitCopies = document.querySelectorAll(".split-copy");
  splitCopies.forEach((copy) => {
    copy.childNodes.forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part.trim()) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = part;
        fragment.appendChild(span);
      });
      node.replaceWith(fragment);
    });
  });

  const video = document.querySelector(".hero-video");
  const hero = document.querySelector(".hero");
  const progressBar = document.querySelector(".hero-progress-track i");
  const progressValue = document.querySelector(".hero-progress-value");
  const beats = [...document.querySelectorAll(".story-beat")];
  const interiorSection = document.querySelector(".interior-explorer");
  const interiorTrack = document.querySelector(".interior-track");
  const interiorCards = [...document.querySelectorAll(".interior-card")];
  const interiorLine = document.querySelector(".interior-line i");
  const interiorCurrent = document.querySelector(".interior-current");
  const exteriorSection = document.querySelector(".exterior-explorer");
  const exteriorTrack = document.querySelector(".exterior-track");
  const exteriorCards = [...document.querySelectorAll(".exterior-card")];
  const exteriorLine = document.querySelector(".exterior-line i");
  const exteriorCurrent = document.querySelector(".exterior-current");
  const exteriorWord = document.querySelector(".exterior-word");
  const landscapeSection = document.querySelector(".landscape-section");
  const landscapeFrames = [...document.querySelectorAll("[data-landscape-depth]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  let desiredVideoTime = 0;
  let videoDuration = 16;
  let videoUnlocked = false;
  let videoUnlocking = false;
  let currentProgress = 0;
  let lastScroll = window.scrollY;
  let scrollTicking = false;

  const markVideoReady = () => video.classList.add("is-ready");

  const unlockVideo = () => {
    if (videoUnlocked || videoUnlocking || video.readyState < 1) return;
    videoUnlocking = true;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const playAttempt = video.play();
    if (!playAttempt || typeof playAttempt.then !== "function") {
      video.pause();
      videoUnlocked = true;
      videoUnlocking = false;
      markVideoReady();
      return;
    }

    playAttempt.then(() => {
      video.pause();
      videoUnlocked = true;
      videoUnlocking = false;
      const safeTime = clamp(desiredVideoTime, 0.001, Math.max(0.001, videoDuration - 0.04));
      try { video.currentTime = safeTime; } catch (_) { /* Poster remains visible as a fallback. */ }
      markVideoReady();
    }).catch(() => {
      videoUnlocking = false;
    });
  };

  video.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(video.duration)) videoDuration = video.duration;
    if (!video.paused) video.pause();
    try { video.currentTime = 0.001; } catch (_) { /* Mobile unlock retries on interaction. */ }
    unlockVideo();
  });
  video.addEventListener("loadeddata", markVideoReady);
  video.addEventListener("canplay", markVideoReady);
  video.addEventListener("playing", () => {
    if (!videoUnlocked && !videoUnlocking) video.pause();
  });

  const updateBeat = (beat, progress) => {
    const start = Number(beat.dataset.start);
    const end = Number(beat.dataset.end);
    const enter = smoothstep((progress - start) / 0.055);
    const exit = 1 - smoothstep((progress - (end - 0.075)) / 0.075);
    const visibility = clamp(enter * exit);
    const side = beat.dataset.side === "right" ? 1 : -1;
    const travel = (1 - visibility) * 72 * side;
    const vertical = (1 - visibility) * 24;
    beat.style.opacity = visibility.toFixed(3);
    beat.style.filter = `blur(${((1 - visibility) * 9).toFixed(2)}px)`;
    beat.style.transform = `translate3d(${travel.toFixed(2)}px, ${vertical.toFixed(2)}px, 0)`;

    const words = beat.querySelectorAll(".word");
    words.forEach((word, index) => {
      const wordProgress = clamp((visibility - index * 0.035) / 0.75);
      word.style.opacity = wordProgress.toFixed(3);
      word.style.transform = `translateY(${((1 - wordProgress) * 0.5).toFixed(2)}em) rotate(${((1 - wordProgress) * 2.5 * side).toFixed(2)}deg)`;
    });
  };

  const updateScrollScene = () => {
    const heroTop = hero.offsetTop;
    const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
    currentProgress = clamp((window.scrollY - heroTop) / travel);
    desiredVideoTime = currentProgress * Math.max(0.1, videoDuration - 0.04);
    const immediateSeekGap = Math.abs(desiredVideoTime - video.currentTime);
    if (video.readyState >= 1 && !video.seeking && immediateSeekGap > (coarsePointer ? 0.4 : 2.5)) {
      try {
        if (typeof video.fastSeek === "function") video.fastSeek(desiredVideoTime);
        else video.currentTime = desiredVideoTime;
      } catch (_) { /* The animation loop retries when decoding is ready. */ }
    }
    progressBar.style.transform = `scaleX(${currentProgress})`;
    progressValue.textContent = String(Math.round(currentProgress * 100)).padStart(2, "0");
    video.style.transform = `scale(${(1.018 + currentProgress * 0.032).toFixed(4)}) translate3d(0, ${(-currentProgress * 0.7).toFixed(2)}%, 0)`;
    beats.forEach((beat) => updateBeat(beat, currentProgress));

    if (interiorSection && interiorTrack) {
      const interiorTravel = Math.max(1, interiorSection.offsetHeight - window.innerHeight);
      const interiorProgress = clamp((window.scrollY - interiorSection.offsetTop) / interiorTravel);
      const maxTrackTravel = Math.max(0, interiorTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
      interiorTrack.style.transform = `translate3d(${(-interiorProgress * maxTrackTravel).toFixed(2)}px, 0, 0)`;
      interiorLine.style.transform = `scaleX(${interiorProgress})`;
      interiorCurrent.textContent = String(Math.min(6, Math.floor(interiorProgress * 6) + 1)).padStart(2, "0");

      interiorCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const offset = clamp((rect.left + rect.width / 2 - window.innerWidth / 2) / window.innerWidth, -1, 1);
        card.style.setProperty("--interior-parallax", `${(-offset * 3.8).toFixed(2)}%`);
      });
    }

    if (exteriorSection && exteriorTrack) {
      const exteriorTravel = Math.max(1, exteriorSection.offsetHeight - window.innerHeight);
      const exteriorProgress = clamp((window.scrollY - exteriorSection.offsetTop) / exteriorTravel);
      const maxTrackTravel = Math.max(0, exteriorTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
      exteriorTrack.style.transform = `translate3d(${(-exteriorProgress * maxTrackTravel).toFixed(2)}px, 0, 0)`;
      exteriorLine.style.transform = `scaleX(${exteriorProgress})`;
      exteriorCurrent.textContent = String(Math.min(4, Math.floor(exteriorProgress * 4) + 1)).padStart(2, "0");
      exteriorWord.style.transform = `translate3d(${(-exteriorProgress * 9).toFixed(2)}vw, 0, 0)`;

      exteriorCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const offset = clamp((rect.left + rect.width / 2 - window.innerWidth / 2) / window.innerWidth, -1, 1);
        card.style.setProperty("--exterior-parallax", `${(-offset * 4.2).toFixed(2)}%`);
      });
    }

    if (landscapeSection && landscapeFrames.length && window.innerWidth > 620) {
      const landscapeRect = landscapeSection.getBoundingClientRect();
      const landscapeProgress = clamp((window.innerHeight - landscapeRect.top) / (landscapeRect.height + window.innerHeight));
      const centerProgress = landscapeProgress - 0.5;
      landscapeFrames.forEach((frame) => {
        const depth = Number(frame.dataset.landscapeDepth || 0);
        frame.style.setProperty("--landscape-y", `${(-centerProgress * depth * window.innerHeight * 2.2).toFixed(2)}px`);
      });
    }

    document.querySelectorAll(".parallax-media").forEach((media) => {
      const rect = media.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const speed = Number(media.dataset.speed || 0);
      media.style.transform = `translate3d(0, ${(-centerOffset * speed).toFixed(2)}px, 0)`;
    });

    const header = document.querySelector(".site-header");
    const directionDown = window.scrollY > lastScroll;
    header.classList.toggle("is-hidden", directionDown && window.scrollY > window.innerHeight * 1.2);
    lastScroll = window.scrollY;
    scrollTicking = false;
  };

  const scrubVideo = () => {
    if (video.readyState >= 2 && !video.seeking) {
      const gap = desiredVideoTime - video.currentTime;
      if (Math.abs(gap) > 0.012) {
        const easing = reducedMotion ? 1 : (coarsePointer ? 0.32 : 0.14);
        try { video.currentTime += gap * easing; } catch (_) { /* Keep the poster fallback. */ }
      }
    }
    requestAnimationFrame(scrubVideo);
  };

  window.addEventListener("scroll", () => {
    unlockVideo();
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollScene);
  }, { passive: true });

  window.addEventListener("touchstart", unlockVideo, { passive: true, once: true });
  window.addEventListener("pointerdown", unlockVideo, { passive: true, once: true });

  window.addEventListener("resize", updateScrollScene);
  updateScrollScene();
  scrubVideo();

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal-up, .reveal-lines").forEach((item) => revealObserver.observe(item));

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  let cursorX = -50;
  let cursorY = -50;
  let ringX = -50;
  let ringY = -50;

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    cursorX = event.clientX;
    cursorY = event.clientY;
    document.body.classList.add("has-pointer");
    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
  });

  window.addEventListener("pointerout", (event) => {
    if (event.relatedTarget) return;
    document.body.classList.remove("has-pointer", "cursor-active");
  });

  const animateCursor = () => {
    ringX += (cursorX - ringX) * 0.16;
    ringY += (cursorY - ringY) * 0.16;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll("a, [data-tilt]").forEach((item) => {
    item.addEventListener("pointerenter", () => document.body.classList.add("cursor-active"));
    item.addEventListener("pointerleave", () => document.body.classList.remove("cursor-active"));
  });

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${(x * 4.5).toFixed(2)}deg) rotateX(${(-y * 4.5).toFixed(2)}deg) translateY(-7px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  document.querySelectorAll(".magnetic").forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const rect = item.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      item.style.transform = `translate3d(${(x * 0.12).toFixed(2)}px, ${(y * 0.12).toFixed(2)}px, 0)`;
    });
    item.addEventListener("pointerleave", () => {
      item.style.transform = "";
    });
  });
})();
