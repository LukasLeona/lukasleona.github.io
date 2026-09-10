(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const fitmentOptions = [...document.querySelectorAll("[data-fitment]")];
  const chatbot = document.querySelector("[data-chatbot]");
  const chatLauncher = document.querySelector("[data-chat-launcher]");
  const chatWindow = document.querySelector("[data-chat-window]");
  const chatMinimize = document.querySelector("[data-chat-minimize]");
  const chatClose = document.querySelector("[data-chat-close]");
  const chatMessages = document.querySelector("[data-chat-messages]");
  const chatTyping = document.querySelector("[data-typing]");
  const chatForm = document.querySelector("[data-chat-form]");
  const chatInput = document.querySelector("[data-chat-input]");
  const chatQuestions = [...document.querySelectorAll("[data-chat-question]")];

  const fitments = {
    honda160: {
      brand: "Honda scooter platforms",
      title: "PCX160 / ADV160 / Click160",
      application: "PCX160, ADV160, and Click160",
      inclusions: "Pulley, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-honda-pcx-adv-click.jpg",
      alt: "JVT Pulley Set S2 for Honda PCX160, ADV160, and Click160"
    },
    click: {
      brand: "Honda scooter platforms",
      title: "Click125 / Click150",
      application: "Click125 and Click150",
      inclusions: "Pulley, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-honda-click-125-150.jpg",
      alt: "JVT Pulley Set S2 for Honda Click125 and Click150"
    },
    yamaha125: {
      brand: "Yamaha scooter platforms",
      title: "Mio i125 / M3 / Gravis / Fazzio",
      application: "Mio i125, M3, Gravis, and Fazzio",
      inclusions: "Pulley, pulley bushing, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-yamaha-mio-fazzio.jpg",
      alt: "JVT Pulley Set S2 for Yamaha Mio i125, M3, Gravis, and Fazzio"
    },
    honda150: {
      brand: "Honda scooter platforms",
      title: "ADV150 / PCX150",
      application: "ADV150 and PCX150",
      inclusions: "Pulley, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-honda-adv-pcx-150.jpg",
      alt: "JVT Pulley Set S2 for Honda ADV150 and PCX150"
    },
    yamahaClassic: {
      brand: "Yamaha scooter platforms",
      title: "Mio Sporty / Soulty / Fino / Nouvo",
      application: "Mio Sporty, Soulty, Fino, and Nouvo",
      inclusions: "Pulley, drive face, and backplate with slider",
      image: "assets/images/jvt-pulley-set-s2-yamaha-mio-fino-nouvo.jpg",
      alt: "JVT Pulley Set S2 for Yamaha Mio Sporty, Soulty, Fino, and Nouvo"
    }
  };

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const setMenu = (isOpen) => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.querySelector(".sr-only").textContent = isOpen ? "Close menu" : "Open menu";
    mobileMenu.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
    header?.classList.toggle("menu-is-open", isOpen);

    if (isOpen) {
      mobileMenu.querySelector("a")?.focus();
    }
  };

  const setFitment = (key) => {
    const fitment = fitments[key];
    const image = document.querySelector("[data-fitment-image]");
    if (!fitment || !image) return;

    fitmentOptions.forEach((option) => {
      const isActive = option.dataset.fitment === key;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });

    image.style.opacity = "0";
    window.setTimeout(() => {
      image.src = fitment.image;
      image.alt = fitment.alt;
      image.style.opacity = "1";
    }, 120);

    document.querySelector("[data-fitment-brand]").textContent = fitment.brand;
    document.querySelector("[data-fitment-title]").textContent = fitment.title;
    document.querySelector("[data-fitment-application]").textContent = fitment.application;
    document.querySelector("[data-fitment-inclusions]").textContent = fitment.inclusions;
  };

  // Replace this local response function with a secure server request when an AI service is connected.
  const getLocalChatResponse = (message) => {
    const question = message.toLowerCase();

    if (/fit|model|pcx|adv|click|mio|fazzio|gravis|fino|nouvo/.test(question)) {
      return "Use the fitment finder to check the current Pulley Set S2 families shown by JVT Philippines. Confirm your exact model, year, and current setup with the team before buying.";
    }

    if (/buy|shop|shopee|genuine|authentic|dealer/.test(question)) {
      return "Use the official JVT Philippines Main store on Shopee, or ask the verified Facebook page for current product and dealer availability.";
    }

    if (/where|address|location|visit|hour|open/.test(question)) {
      return "JVT Philippines is listed at 133 D. Aquino corner 8th Avenue, West Grace Park, Caloocan. Listed hours are Monday to Saturday, 8:00 AM to 6:00 PM. Please confirm before visiting.";
    }

    if (/phone|call|email|contact|message/.test(question)) {
      return "You can reach JVT through the verified Facebook page, email jvtscooterphil@gmail.com, or call the numbers in the contact section.";
    }

    if (/install|mechanic|tune|tuning/.test(question)) {
      return "Performance parts should be installed and tuned by a qualified motorcycle mechanic. Share your full setup and intended use with JVT before choosing parts.";
    }

    if (/part|product|cvt|engine|pipe|exhaust|brake|shock/.test(question)) {
      return "JVT product families include CVT and transmission parts, engine components, power pipes, suspension, and brake components. Availability and fitment vary, so send JVT your unit details.";
    }

    return "I can help with fitment, product families, where to buy, location, hours, installation, and contact details. For product advice or availability, please confirm directly with JVT Philippines.";
  };

  const appendChatMessage = (message, sender) => {
    if (!chatMessages) return;

    const wrapper = document.createElement("div");
    const label = document.createElement("span");
    const bubble = document.createElement("p");
    wrapper.className = `chat-message chat-message-${sender}`;
    label.textContent = sender === "user" ? "You" : "JVT";
    bubble.textContent = message;
    wrapper.append(label, bubble);
    chatMessages.append(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const answerChat = (message) => {
    const cleanMessage = message.trim();
    if (!cleanMessage || !chatTyping) return;

    appendChatMessage(cleanMessage, "user");
    chatTyping.hidden = false;
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 520;
    window.setTimeout(() => {
      chatTyping.hidden = true;
      appendChatMessage(getLocalChatResponse(cleanMessage), "assistant");
    }, delay);
  };

  const setChatOpen = (isOpen) => {
    if (!chatbot || !chatLauncher || !chatWindow) return;

    chatbot.classList.toggle("is-open", isOpen);
    chatLauncher.setAttribute("aria-expanded", String(isOpen));
    chatWindow.hidden = !isOpen;

    if (isOpen) {
      chatWindow.classList.remove("is-minimized");
      chatMinimize?.setAttribute("aria-label", "Minimize chat");
      chatInput?.focus();
    } else {
      chatLauncher.focus();
    }
  };

  menuToggle?.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  fitmentOptions.forEach((option) => {
    option.addEventListener("click", () => setFitment(option.dataset.fitment));
  });

  chatLauncher?.addEventListener("click", () => setChatOpen(true));
  chatClose?.addEventListener("click", () => setChatOpen(false));
  chatMinimize?.addEventListener("click", () => {
    const isMinimized = chatWindow.classList.toggle("is-minimized");
    chatMinimize.setAttribute("aria-label", isMinimized ? "Expand chat" : "Minimize chat");
    if (!isMinimized) chatInput?.focus();
  });

  chatQuestions.forEach((button) => {
    button.addEventListener("click", () => answerChat(button.dataset.chatQuestion));
  });

  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = chatInput.value;
    chatInput.value = "";
    answerChat(message);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    } else if (event.key === "Escape" && chatWindow && !chatWindow.hidden) {
      setChatOpen(false);
    }
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
})();
