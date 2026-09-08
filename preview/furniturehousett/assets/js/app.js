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
const chatLauncher = document.querySelector(".chat-launcher");
const chatPanel = document.querySelector(".chat-panel");
const chatCloseButtons = document.querySelectorAll(".chat-close, .chat-minimize");
const chatMessages = document.querySelector(".chat-messages");
const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector("#chat-input");
const chatSuggestions = document.querySelectorAll(".chat-suggestions button");
const typingIndicator = document.querySelector(".typing-indicator");
let scrollTicking = false;
let replyTimer;

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

const setChat = (isOpen) => {
  if (!chatLauncher || !chatPanel) return;

  chatLauncher.setAttribute("aria-expanded", String(isOpen));
  chatLauncher.hidden = isOpen;

  if (isOpen) {
    chatPanel.hidden = false;
    window.requestAnimationFrame(() => chatPanel.classList.add("is-open"));
    if (window.innerWidth <= 640) body.classList.add("chat-open");
    window.setTimeout(() => chatInput?.focus(), 180);
  } else {
    chatPanel.classList.remove("is-open");
    body.classList.remove("chat-open");
    window.setTimeout(() => {
      chatPanel.hidden = true;
      chatLauncher.hidden = false;
      chatLauncher.focus();
    }, 220);
  }
};

const getLocalChatResponse = (question) => {
  const message = question.toLowerCase();

  if (/where|location|address|direction/.test(message)) {
    return "Furniture House LTD is at 120–122 Eastern Main Road, Barataria, Trinidad and Tobago.";
  }
  if (/hour|open|close|time/.test(message)) {
    return "Store hours can change. Please call +1 868-757-0383 or check the Furniture House Facebook page before visiting.";
  }
  if (/deliver|shipping|transport/.test(message)) {
    return "Delivery may be available depending on the item and destination. Call the store to confirm timing and charges.";
  }
  if (/sell|product|furniture|decor|décor|appliance|bed|sofa|dining/.test(message)) {
    return "Furniture House carries furniture for living, dining and bedroom spaces, plus home décor and household appliances. Current selection is confirmed in store.";
  }
  if (/available|availability|stock|price|cost/.test(message)) {
    return "For current stock and pricing, call +1 868-757-0383 or email fhlsalesandmarketing@gmail.com with the item you are looking for.";
  }
  if (/contact|phone|call|email/.test(message)) {
    return "Reach sales and marketing at +1 868-757-0383 or fhlsalesandmarketing@gmail.com. The store line is +1 868-675-3939.";
  }

  return "I can help with our location, product departments, availability, delivery and store contacts. For anything else, call +1 868-757-0383.";
};

const addChatMessage = (message, role) => {
  if (!chatMessages) return;
  const row = document.createElement("div");
  row.className = `chat-message ${role === "user" ? "user-message" : "assistant-message"}`;

  const avatar = document.createElement("span");
  avatar.textContent = role === "user" ? "You" : "FH";
  const copy = document.createElement("p");
  copy.textContent = message;

  row.append(avatar, copy);
  chatMessages.append(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const sendChatMessage = (message) => {
  const cleanMessage = message.trim();
  if (!cleanMessage || !typingIndicator) return;

  window.clearTimeout(replyTimer);
  addChatMessage(cleanMessage, "user");
  typingIndicator.hidden = false;
  chatMessages.scrollTop = chatMessages.scrollHeight;

  replyTimer = window.setTimeout(() => {
    typingIndicator.hidden = true;
    addChatMessage(getLocalChatResponse(cleanMessage), "assistant");
  }, reduceMotion.matches ? 50 : 650);
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
  if (event.key === "Escape" && chatPanel && !chatPanel.hidden) {
    setChat(false);
  }
});

chatLauncher?.addEventListener("click", () => setChat(true));
chatCloseButtons.forEach((button) => button.addEventListener("click", () => setChat(false)));

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  sendChatMessage(chatInput.value);
  chatInput.value = "";
});

chatSuggestions.forEach((button) => {
  button.addEventListener("click", () => sendChatMessage(button.textContent));
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
