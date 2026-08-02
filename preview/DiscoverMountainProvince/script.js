document.documentElement.classList.add("js");

const hero = document.querySelector("[data-hero]");
const heroVideo = document.querySelector("[data-hero-video]");
const header = document.querySelector("[data-header]");
const soundToggle = document.querySelector("[data-sound-toggle]");
const soundInvite = document.querySelector("[data-sound-invite]");
const videoToggle = document.querySelector("[data-video-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const progressBar = document.querySelector(".scroll-progress span");

let soundEnabled = false;
let heroIsVisible = true;
let volumeFrame = 0;

const safePlay = async () => {
  try {
    await heroVideo.play();
    return true;
  } catch (error) {
    videoToggle.classList.add("is-paused");
    videoToggle.querySelector("span").textContent = "Play film";
    videoToggle.setAttribute("aria-label", "Play background film");
    return false;
  }
};

const fadeVolume = (target, duration = 500, onComplete) => {
  cancelAnimationFrame(volumeFrame);
  const initial = heroVideo.volume;
  const difference = target - initial;
  const startedAt = performance.now();

  const step = (time) => {
    const progress = Math.min((time - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    heroVideo.volume = Math.max(0, Math.min(1, initial + difference * eased));

    if (progress < 1) {
      volumeFrame = requestAnimationFrame(step);
    } else if (onComplete) {
      onComplete();
    }
  };

  volumeFrame = requestAnimationFrame(step);
};

const updateSoundUI = () => {
  soundToggle.classList.toggle("is-on", soundEnabled);
  soundToggle.setAttribute("aria-label", soundEnabled ? "Turn hero sound off" : "Turn hero sound on");
  soundInvite.classList.toggle("is-hidden", soundEnabled);
};

const setSound = async (enabled) => {
  soundEnabled = enabled;

  if (enabled) {
    heroVideo.volume = 0;
    heroVideo.muted = false;
    const playing = await safePlay();

    if (!playing) {
      soundEnabled = false;
      heroVideo.muted = true;
    } else if (heroIsVisible) {
      fadeVolume(0.68, 700);
    }
  } else {
    fadeVolume(0, 350, () => {
      heroVideo.muted = true;
    });
  }

  updateSoundUI();
};

soundToggle.addEventListener("click", () => setSound(!soundEnabled));
soundInvite.addEventListener("click", () => setSound(true));

videoToggle.addEventListener("click", async () => {
  if (heroVideo.paused) {
    await safePlay();
    videoToggle.classList.remove("is-paused");
    videoToggle.querySelector("span").textContent = "Pause film";
    videoToggle.setAttribute("aria-label", "Pause background film");
  } else {
    heroVideo.pause();
    videoToggle.classList.add("is-paused");
    videoToggle.querySelector("span").textContent = "Play film";
    videoToggle.setAttribute("aria-label", "Play background film");
  }
});

const heroSoundObserver = new IntersectionObserver(
  ([entry]) => {
    heroIsVisible = entry.intersectionRatio >= 0.3;

    if (!soundEnabled) return;

    if (heroIsVisible) {
      heroVideo.muted = false;
      fadeVolume(0.68, 600);
    } else {
      fadeVolume(0, 450);
    }
  },
  { threshold: [0, 0.3, 0.65] }
);

heroSoundObserver.observe(hero);

// Header, reading progress, and active navigation.
const onScroll = () => {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? scrollTop / scrollable : 0;

  header.classList.toggle("is-scrolled", scrollTop > 40);
  progressBar.style.transform = `scaleX(${progress})`;
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

menuToggle.addEventListener("click", () => {
  const opening = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(opening));
  menuToggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", opening);
  document.body.classList.toggle("nav-open", opening);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const navLinks = [...navigation.querySelectorAll("a")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.3, 0.6] }
);

observedSections.forEach((section) => sectionObserver.observe(section));

// Scroll reveal. Content stays visible when JavaScript is unavailable.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -8%", threshold: 0.08 }
);

document.querySelectorAll("[data-reveal]").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  revealObserver.observe(element);
});

// A subtle light response over the hero on pointer devices.
hero.addEventListener("pointermove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  hero.style.setProperty("--pointer-x", `${x}%`);
  hero.style.setProperty("--pointer-y", `${y}%`);
});

// Scroll-linked image motion and tactile card tilt, disabled for reduced motion.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const parallaxImages = document.querySelectorAll("[data-parallax-image]");
let motionTicking = false;

const updateMotion = () => {
  const viewportHeight = window.innerHeight;
  const heroShift = Math.min(window.scrollY * 0.08, 64);
  heroVideo.style.setProperty("--hero-video-y", `${heroShift}px`);

  parallaxImages.forEach((image) => {
    const frame = image.parentElement.getBoundingClientRect();
    if (frame.bottom < -100 || frame.top > viewportHeight + 100) return;

    const distance = frame.top + frame.height / 2 - viewportHeight / 2;
    const shift = Math.max(-18, Math.min(18, (distance / viewportHeight) * -18));
    image.style.setProperty("--image-y", `${shift}px`);
  });

  motionTicking = false;
};

const requestMotionUpdate = () => {
  if (motionTicking || prefersReducedMotion) return;
  motionTicking = true;
  requestAnimationFrame(updateMotion);
};

if (!prefersReducedMotion) {
  window.addEventListener("scroll", requestMotionUpdate, { passive: true });
  window.addEventListener("resize", requestMotionUpdate, { passive: true });
  requestMotionUpdate();

  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--tilt-x", `${x * 3.4}deg`);
        card.style.setProperty("--tilt-y", `${y * -3.4}deg`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }
}

// Count key province facts when they enter the viewport.
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const suffix = element.dataset.countSuffix || "";
      const startedAt = performance.now();
      const duration = 1250;

      const animateCount = (time) => {
        const progress = Math.min((time - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(target * eased).toLocaleString()}${suffix}`;
        if (progress < 1) requestAnimationFrame(animateCount);
      };

      element.textContent = `0${suffix}`;
      requestAnimationFrame(animateCount);
      observer.unobserve(element);
    });
  },
  { threshold: 0.7 }
);

document.querySelectorAll("[data-count]").forEach((counter) => counterObserver.observe(counter));

// Recreation rail: buttons, mouse drag, and a live progress indicator.
const activityRail = document.querySelector("[data-activity-rail]");
const activityPrevious = document.querySelector("[data-activity-prev]");
const activityNext = document.querySelector("[data-activity-next]");
const activityProgress = document.querySelector("[data-activity-progress]");
let activityDragging = false;
let activityStartX = 0;
let activityStartScroll = 0;
let activityProgressFrame = 0;

const updateActivityProgress = () => {
  const total = Math.max(activityRail.scrollWidth, 1);
  const progress = Math.min((activityRail.scrollLeft + activityRail.clientWidth) / total, 1);
  activityProgress.style.setProperty("--rail-progress", String(progress));
};

const requestActivityProgress = () => {
  cancelAnimationFrame(activityProgressFrame);
  activityProgressFrame = requestAnimationFrame(updateActivityProgress);
};

const moveActivityRail = (direction) => {
  activityRail.scrollBy({ left: direction * Math.min(activityRail.clientWidth * 0.78, 480), behavior: "smooth" });
};

activityPrevious.addEventListener("click", () => moveActivityRail(-1));
activityNext.addEventListener("click", () => moveActivityRail(1));
activityRail.addEventListener("scroll", requestActivityProgress, { passive: true });
window.addEventListener("resize", requestActivityProgress, { passive: true });

activityRail.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "mouse") return;
  activityDragging = true;
  activityStartX = event.clientX;
  activityStartScroll = activityRail.scrollLeft;
  activityRail.classList.add("is-dragging");
  activityRail.setPointerCapture(event.pointerId);
});

activityRail.addEventListener("pointermove", (event) => {
  if (!activityDragging) return;
  activityRail.scrollLeft = activityStartScroll - (event.clientX - activityStartX);
});

const stopActivityDrag = () => {
  activityDragging = false;
  activityRail.classList.remove("is-dragging");
};

activityRail.addEventListener("pointerup", stopActivityDrag);
activityRail.addEventListener("pointercancel", stopActivityDrag);
activityRail.addEventListener("lostpointercapture", stopActivityDrag);
updateActivityProgress();

// Destination filtering.
const filterButtons = document.querySelectorAll("[data-filter]");
const destinationCards = document.querySelectorAll("[data-categories]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((chip) => {
      const isSelected = chip === button;
      chip.classList.toggle("is-active", isSelected);
      chip.setAttribute("aria-pressed", String(isSelected));
    });

    destinationCards.forEach((card) => {
      const categories = card.dataset.categories.split(" ");
      const matches = selected === "all" || categories.includes(selected);
      card.classList.toggle("is-filtered-out", !matches);
    });
  });
});

// Flexible sample itineraries.
const itineraries = {
  2: {
    title: "Two bright days",
    badge: "Essential",
    days: [
      { title: "Bontoc orientation", note: "Museum context, local lunch, and a gentle valley walk", time: "Day 01" },
      { title: "Mt. Kupapey at first light", note: "Guided summit, terrace walk, village time, and a slow return", time: "Day 02" }
    ]
  },
  3: {
    title: "Three unhurried days",
    badge: "Balanced",
    days: [
      { title: "Arrive through Bontoc", note: "Museum context, local food, and time to settle in", time: "Day 01" },
      { title: "Kupapey and Maligcong", note: "Guided sunrise summit, terraces, and a quiet village morning", time: "Day 02" },
      { title: "Sagada stories", note: "Choose a cultural walk, cave route, or pine trail", time: "Day 03" }
    ]
  },
  5: {
    title: "Five days, traveled slowly",
    badge: "Immersive",
    days: [
      { title: "Meet Bontoc", note: "Museum context, market flavors, and the Chico River valley", time: "Day 01" },
      { title: "Kupapey and Mt. Fato", note: "A guided ridge day above Maligcong's terraces", time: "Day 02" },
      { title: "Sagada underground", note: "A guided cave route matched to your comfort", time: "Day 03" },
      { title: "Forest and heritage", note: "Pine trails and respectfully guided cultural sites", time: "Day 04" },
      { title: "The high road home", note: "A flexible Bauko stop and room for mountain weather", time: "Day 05" }
    ]
  }
};

const dayButtons = document.querySelectorAll("[data-days]");
const itineraryTitle = document.querySelector(".itinerary__top h3");
const itineraryBadge = document.querySelector(".route-badge");
const itineraryDays = document.querySelector("[data-itinerary-days]");

const renderItinerary = (dayCount) => {
  const itinerary = itineraries[dayCount];
  itineraryTitle.textContent = itinerary.title;
  itineraryBadge.textContent = itinerary.badge;
  itineraryDays.innerHTML = itinerary.days
    .map(
      (day, index) => `
        <article class="itinerary-day" style="animation-delay: ${index * 55}ms">
          <span class="itinerary-day__number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h4>${day.title}</h4>
            <p>${day.note}</p>
          </div>
          <span class="itinerary-day__time">${day.time}</span>
        </article>`
    )
    .join("");
};

dayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    dayButtons.forEach((option) => {
      const active = option === button;
      option.classList.toggle("is-active", active);
      option.setAttribute("aria-pressed", String(active));
    });
    renderItinerary(Number(button.dataset.days));
  });
});

renderItinerary(3);

// Concise field notes presented in an accessible dialog.
const placeNotes = {
  sagada: {
    kicker: "Field notes · Adventure & heritage",
    title: "Sagada",
    description:
      "Sagada rewards curiosity and patience. Balance cave or forest adventures with time to understand the meaning of its burial traditions and living community.",
    facts: [
      ["Good for", "Guided caves & cultural walks"],
      ["Pace", "Two or more nights"],
      ["Remember", "Sacred sites are not photo sets"],
      ["Pack", "Grip, layers & rain protection"]
    ]
  },
  bontoc: {
    kicker: "Field notes · History & culture",
    title: "Bontoc",
    description:
      "The provincial capital is a valuable first chapter. Start with cultural context, meet the valley at ground level, and use it as a thoughtful base for nearby villages.",
    facts: [
      ["Good for", "Museum context & local food"],
      ["Pace", "One full day"],
      ["Remember", "Ask before photographing people"],
      ["Pair with", "A guided Maligcong visit"]
    ]
  },
  maligcong: {
    kicker: "Field notes · Landscape & village life",
    title: "Maligcong",
    description:
      "The terraces are most memorable when the visit is more than a sunrise dash. Walk with local knowledge, respect the fields as working farms, and stay for the village rhythm.",
    facts: [
      ["Good for", "Terrace walks & sunrise"],
      ["Pace", "One night or a long morning"],
      ["Remember", "Stay off planted terrace beds"],
      ["Pack", "Water, layers & trail shoes"]
    ]
  },
  kupapey: {
    kicker: "Field notes · Sunrise & summit",
    title: "Mt. Kupapey",
    description:
      "Mt. Kupapey is known for an early climb above Maligcong's terraces. Go with a local guide, begin before dawn only when conditions are suitable, and make room for village context after the view.",
    facts: [
      ["Good for", "Sunrise hiking & broad views"],
      ["Pace", "An early guided half-day"],
      ["Remember", "Keep noise low before sunrise"],
      ["Pack", "Headlamp, water & warm layers"]
    ]
  },
  fato: {
    kicker: "Field notes · Pine trail & ridges",
    title: "Mt. Fato",
    description:
      "Mt. Fato extends the Maligcong mountain experience through pine forest and open ridges. A local guide can match the route to weather, time, and your group's ability.",
    facts: [
      ["Good for", "Longer walks & pine trails"],
      ["Pace", "Half to full day"],
      ["Pair with", "Mt. Kupapey when appropriate"],
      ["Pack", "Trail shoes, water & sun cover"]
    ]
  },
  bauko: {
    kicker: "Field notes · Highlands & open roads",
    title: "Bauko",
    description:
      "Bauko opens into cool farms, ridges, and broad highland views. Keep the plan flexible, stop only where safe, and treat working landscapes with care.",
    facts: [
      ["Good for", "Scenic roads & ridge air"],
      ["Pace", "A flexible half or full day"],
      ["Remember", "Weather can change quickly"],
      ["Pack", "Warm and waterproof layers"]
    ]
  }
};

const placeDialog = document.querySelector("[data-place-dialog]");
const dialogKicker = document.querySelector("[data-dialog-kicker]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogDescription = document.querySelector("[data-dialog-description]");
const dialogFacts = document.querySelector("[data-dialog-facts]");
const dialogClose = document.querySelector("[data-dialog-close]");

const closePlaceDialog = () => {
  placeDialog.close();
  document.body.classList.remove("dialog-open");
};

document.querySelectorAll("[data-place-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const place = placeNotes[button.dataset.placeOpen];
    dialogKicker.textContent = place.kicker;
    dialogTitle.textContent = place.title;
    dialogDescription.textContent = place.description;
    dialogFacts.innerHTML = place.facts
      .map(
        ([label, value]) => `
          <div class="dialog-fact">
            <span>${label}</span>
            <strong>${value}</strong>
          </div>`
      )
      .join("");

    document.body.classList.add("dialog-open");
    placeDialog.showModal();
  });
});

dialogClose.addEventListener("click", closePlaceDialog);
placeDialog.addEventListener("click", (event) => {
  if (event.target === placeDialog) closePlaceDialog();
});
placeDialog.addEventListener("cancel", () => document.body.classList.remove("dialog-open"));

document.querySelector("[data-year]").textContent = new Date().getFullYear();

// Start the muted film even when the browser delays the initial autoplay request.
safePlay();
