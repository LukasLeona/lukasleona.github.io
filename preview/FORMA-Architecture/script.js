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
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let desiredVideoTime = 0;
  let videoDuration = 16;
  let currentProgress = 0;
  let lastScroll = window.scrollY;
  let scrollTicking = false;

  video.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(video.duration)) videoDuration = video.duration;
    video.currentTime = 0.001;
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
    progressBar.style.transform = `scaleX(${currentProgress})`;
    progressValue.textContent = String(Math.round(currentProgress * 100)).padStart(2, "0");
    video.style.transform = `scale(${(1.018 + currentProgress * 0.032).toFixed(4)}) translate3d(0, ${(-currentProgress * 0.7).toFixed(2)}%, 0)`;
    beats.forEach((beat) => updateBeat(beat, currentProgress));

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
    if (video.readyState >= 2) {
      const gap = desiredVideoTime - video.currentTime;
      if (Math.abs(gap) > 0.012) {
        video.currentTime += gap * (reducedMotion ? 1 : 0.14);
      }
    }
    requestAnimationFrame(scrubVideo);
  };

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollScene);
  }, { passive: true });

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
