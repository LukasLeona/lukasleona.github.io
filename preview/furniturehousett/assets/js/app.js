"use strict";

const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector(".site-menu");
const menuLinks = siteMenu ? [...siteMenu.querySelectorAll("a")] : [];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
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

window.addEventListener("scroll", updateHeader, { passive: true });
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

document.documentElement.classList.add("is-ready");
updateHeader();

if (reduceMotion.matches) {
  document.documentElement.classList.add("reduce-motion");
}
