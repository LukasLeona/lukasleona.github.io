"use strict";

const WEDDING_CONFIG = {
  brideName: "Amelia",
  groomName: "Matthew",
  weddingDate: "2027-05-22T16:30:00-04:00",
  weddingDateLabel: "May 22, 2027",
  venue: "Jekyll Island, Georgia",
  calendarEnd: "2027-05-22T23:00:00-04:00"
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function applyWeddingConfig() {
  $$('[data-bride-name]').forEach((el) => { el.textContent = WEDDING_CONFIG.brideName; });
  $$('[data-groom-name]').forEach((el) => { el.textContent = WEDDING_CONFIG.groomName; });
  $$('[data-bride-initial]').forEach((el) => { el.textContent = WEDDING_CONFIG.brideName.charAt(0); });
  $$('[data-groom-initial]').forEach((el) => { el.textContent = WEDDING_CONFIG.groomName.charAt(0); });
  $$('[data-wedding-date-label]').forEach((el) => { el.textContent = WEDDING_CONFIG.weddingDateLabel; });
  document.title = `${WEDDING_CONFIG.brideName} & ${WEDDING_CONFIG.groomName} - Georgia Beach Wedding`;
}

function setupLoader() {
  window.addEventListener("load", () => window.setTimeout(() => $("#pageLoader")?.classList.add("is-hidden"), 350));
}

function setupNavigation() {
  const header = $("#siteHeader");
  const menu = $("#siteNav");
  const toggle = $("#menuToggle");
  const topButton = $("#backToTop");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 35);
    topButton?.classList.toggle("is-visible", window.scrollY > 700);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("modal-open", open);
  });

  $$("a", menu).forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    toggle?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("modal-open");
  }));

  topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const sections = $$('main section[id]');
  const navLinks = $$('.site-nav a[href^="#"]');
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
  }
}

function setupCountdown() {
  const target = new Date(WEDDING_CONFIG.weddingDate).getTime();
  const nodes = { days: $("#days"), hours: $("#hours"), minutes: $("#minutes"), seconds: $("#seconds") };
  const update = () => {
    const distance = Math.max(0, target - Date.now());
    nodes.days.textContent = String(Math.floor(distance / 86400000)).padStart(3, "0");
    nodes.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
    nodes.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
    nodes.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
  };
  update();
  window.setInterval(update, 1000);
}

function setupRevealAnimations() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -45px" });
  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min((index % 4) * 65, 195)}ms`;
    observer.observe(item);
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.setTimeout(() => $("button, input, select, textarea", modal)?.focus(), 90);
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function setupRsvpForm() {
  const form = $("#rsvpForm");
  const modal = $("#successModal");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) return form.reportValidity();
    form.reset();
    openModal(modal);
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
      form.hidden = false;
      success.hidden = true;
      form.reset();
      selectedInput.value = giftName;
      selectedText.textContent = `You selected “${giftName}.” Add your details to reserve it in this website demo.`;
      openModal(modal);
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) return form.reportValidity();
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
  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    window.setTimeout(() => { image.src = ""; }, 250);
  };
  $$(".gallery-item").forEach((item) => item.addEventListener("click", () => {
    image.src = item.dataset.full;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }));
  closeButton?.addEventListener("click", close);
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) close(); });
}

function calendarTimestamp(value) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function setupCalendarDownload() {
  $("#calendarButton")?.addEventListener("click", () => {
    const content = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Georgia Beach Wedding//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@georgia-beach-wedding.local`,
      `DTSTAMP:${calendarTimestamp(new Date())}`,
      `DTSTART:${calendarTimestamp(WEDDING_CONFIG.weddingDate)}`,
      `DTEND:${calendarTimestamp(WEDDING_CONFIG.calendarEnd)}`,
      `SUMMARY:${WEDDING_CONFIG.brideName} & ${WEDDING_CONFIG.groomName}'s Wedding`,
      "DESCRIPTION:Join us for a romantic beach wedding celebration on Jekyll Island.",
      `LOCATION:${WEDDING_CONFIG.venue}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amelia-matthew-georgia-wedding.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });
}

function setupKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    $$(".modal.is-open").forEach(closeModal);
    const lightbox = $("#lightbox.is-open");
    if (lightbox) $(".lightbox-close", lightbox)?.click();
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
setupKeyboard();
