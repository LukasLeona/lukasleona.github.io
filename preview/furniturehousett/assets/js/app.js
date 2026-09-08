"use strict";

const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector(".site-menu");
const menuLinks = siteMenu ? [...siteMenu.querySelectorAll("a")] : [];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const root = document.documentElement;
const hero = document.querySelector(".hero");
const reveals = [...document.querySelectorAll(".reveal")];
let scrollTicking = false;

const setMenu = (isOpen) => {
  if (!menuToggle || !siteMenu) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen
    ? "Close navigation"
    : "Open navigation";
  siteMenu.classList.toggle("is-open", isOpen);
  body.classList.toggle("menu-open", isOpen);

  if (isOpen) {
    window.setTimeout(() => menuLinks[0]?.focus(), 180);
  }
};

const updateScrollEffects = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  root.style.setProperty("--scroll-progress", progress.toFixed(4));

  if (!reduceMotion.matches && hero && window.innerWidth > 832) {
    const shift = Math.min(window.scrollY * 0.1, 70);
    hero.style.setProperty("--hero-shift", `${shift}px`);
  }

  scrollTicking = false;
};

const requestScrollUpdate = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateScrollEffects);
};

menuToggle?.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 832) setMenu(false);
});

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details[open]").forEach((openDetail) => {
      if (openDetail !== detail) openDetail.removeAttribute("open");
    });
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 }
  );

  reveals.forEach((element) => revealObserver.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}

hero?.addEventListener("pointermove", (event) => {
  if (reduceMotion.matches || window.innerWidth <= 832) return;
  const x = ((event.clientX / window.innerWidth) - 0.5) * -8;
  hero.style.setProperty("--hero-x", `${x}px`);
});

hero?.addEventListener("pointerleave", () => {
  hero.style.setProperty("--hero-x", "0px");
});

root.classList.add("is-ready");
updateScrollEffects();

if (reduceMotion.matches) {
  document.documentElement.classList.add("reduce-motion");
}
