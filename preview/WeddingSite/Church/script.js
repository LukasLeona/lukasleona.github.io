"use strict";

/*
  EASY-TO-UPDATE WEDDING DETAILS
  Change these values and the matching text on the page updates automatically.
*/
const WEDDING_CONFIG = {
  brideName: "Amelia",
  groomName: "Rafael",
  weddingDate: "2026-12-12T16:00:00+08:00",
  weddingDateLabel: "December 12, 2026",
  venue: "The Peninsula Manila",
  calendarEnd: "2026-12-12T22:00:00+08:00"
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function applyWeddingConfig() {
  $$('[data-bride-name]').forEach((el) => { el.textContent = WEDDING_CONFIG.brideName; });
  $$('[data-groom-name]').forEach((el) => { el.textContent = WEDDING_CONFIG.groomName; });
  $$('[data-wedding-date-label]').forEach((el) => { el.textContent = WEDDING_CONFIG.weddingDateLabel; });
  document.title = `${WEDDING_CONFIG.brideName} & ${WEDDING_CONFIG.groomName} — Wedding Invitation`;
}

function setupLoader() {
  window.addEventListener("load", () => {
    window.setTimeout(() => $("#pageLoader")?.classList.add("is-hidden"), 350);
  });
}

function setupNavigation() {
  const header = $("#siteHeader");
  const menu = $("#siteNav");
  const toggle = $("#menuToggle");
  const topButton = $("#backToTop");

  const updateHeader = () => {
    const scrolled = window.scrollY > 40;
    header?.classList.toggle("is-scrolled", scrolled);
    topButton?.classList.toggle("is-visible", window.scrollY > 650);
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("modal-open", open);
  });

  $$("a", menu).forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("modal-open");
    });
  });

  topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const sections = $$('main section[id]');
  const navLinks = $$('.site-nav a[href^="#"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}

function setupCountdown() {
  const date = new Date(WEDDING_CONFIG.weddingDate).getTime();
  const nodes = {
    days: $("#days"),
    hours: $("#hours"),
    minutes: $("#minutes"),
    seconds: $("#seconds")
  };

  const update = () => {
    const distance = Math.max(0, date - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    nodes.days.textContent = String(days).padStart(3, "0");
    nodes.hours.textContent = String(hours).padStart(2, "0");
    nodes.minutes.textContent = String(minutes).padStart(2, "0");
    nodes.seconds.textContent = String(seconds).padStart(2, "0");
  };

  update();
  window.setInterval(update, 1000);
}

function setupRevealAnimations() {
  const revealItems = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
    observer.observe(item);
  });
}

function openModal(modal) {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const focusTarget = $("button, input, select, textarea", modal);
  window.setTimeout(() => focusTarget?.focus(), 100);
}

function closeModal(modal) {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function setupRsvpForm() {
  const form = $("#rsvpForm");
  const modal = $("#successModal");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    openModal(modal);
    form.reset();
  });
  $$('[data-close-modal]').forEach((button) => button.addEventListener("click", () => closeModal(modal)));
}

function setupGiftRegistry() {
  const modal = $("#giftModal");
  const form = $("#giftForm");
  const success = $("#giftSuccess");
  const selectedInput = $("#selectedGift");
  const selectedText = $("#selectedGiftText");
  let activeCard = null;

  $$(".gift-card[data-status='available'] .gift-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeCard = button.closest(".gift-card");
      const giftName = activeCard.dataset.gift;
      selectedInput.value = giftName;
      selectedText.textContent = `You selected “${giftName}.” Please add your details below to mark it as reserved.`;
      form.hidden = false;
      success.hidden = true;
      form.reset();
      selectedInput.value = giftName;
      openModal(modal);
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (activeCard) {
      activeCard.dataset.status = "reserved";
      const status = $(".status", activeCard);
      const button = $(".gift-button", activeCard);
      status.textContent = "Reserved";
      status.className = "status reserved";
      button.textContent = "Already reserved";
      button.disabled = true;
    }
    form.hidden = true;
    success.hidden = false;
  });

  $$('[data-close-gift]').forEach((button) => button.addEventListener("click", () => closeModal(modal)));
}

function setupGallery() {
  const lightbox = $("#lightbox");
  const image = $("#lightboxImage");
  const closeButton = $(".lightbox-close", lightbox);

  $$(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      image.src = item.dataset.full;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    });
  });

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    window.setTimeout(() => { image.src = ""; }, 250);
  };

  closeButton?.addEventListener("click", close);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
}

function toCalendarTimestamp(dateString) {
  return new Date(dateString).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function setupCalendarDownload() {
  $("#calendarButton")?.addEventListener("click", () => {
    const title = `${WEDDING_CONFIG.brideName} & ${WEDDING_CONFIG.groomName}'s Wedding`;
    const details = "We are delighted to celebrate our wedding with you.";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@wedding-invitation.local`,
      `DTSTAMP:${toCalendarTimestamp(new Date().toISOString())}`,
      `DTSTART:${toCalendarTimestamp(WEDDING_CONFIG.weddingDate)}`,
      `DTEND:${toCalendarTimestamp(WEDDING_CONFIG.calendarEnd)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${WEDDING_CONFIG.venue}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amelia-rafael-wedding.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });
}

function setupKeyboardControls() {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    $$(".modal.is-open").forEach(closeModal);
    const lightbox = $("#lightbox.is-open");
    if (lightbox) {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }
  });
}

applyWeddingConfig();
setupLoader();
setupNavigation();
setupCountdown();
setupRevealAnimations();
setupRsvpForm();
setupGiftRegistry();
setupGallery();
setupCalendarDownload();
setupKeyboardControls();
