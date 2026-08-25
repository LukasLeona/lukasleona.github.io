(() => {
  "use strict";

  const doc = document;
  const body = doc.body;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = doc.querySelector("[data-header]");
  const progressBar = doc.querySelector(".scroll-progress span");
  const heroPhoto = doc.querySelector(".hero-photo");
  const heroCopies = [...doc.querySelectorAll(".hero-copy, .catalog-hero-copy, .videos-hero-copy")];
  let ticking = false;

  const updateScrollEffects = () => {
    const scrollTop = window.scrollY;
    const scrollable = doc.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? scrollTop / scrollable : 0;

    header?.classList.toggle("is-scrolled", scrollTop > 24);
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

    if (!reducedMotion && heroPhoto && scrollTop < window.innerHeight * 1.2) {
      const shift = Math.min(scrollTop * 0.055, 44);
      heroPhoto.style.translate = `0 ${shift}px`;
    }

    if (!reducedMotion && scrollTop < window.innerHeight * 1.2) {
      const textShift = Math.min(scrollTop * 0.028, 18);
      heroCopies.forEach((copy) => copy.style.setProperty("--motion-drift", `${textShift}px`));
    }

    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }, { passive: true });
  updateScrollEffects();

  const revealItems = doc.querySelectorAll(".reveal, .reveal-lines");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* Shared page motion: headings, labels and content groups reveal as they enter view. */
  const motionTextItems = [...doc.querySelectorAll("main h1, main h2")]
    .filter((item) => !item.classList.contains("reveal-lines"));
  const motionKickerItems = [...doc.querySelectorAll(
    ".eyebrow, .section-label, .section-heading-line, .catalog-category-head > span:first-child"
  )].filter((item) => !item.classList.contains("reveal"));
  const motionCardItems = [...doc.querySelectorAll(
    ".category-card, .catalog-category-visual, .catalog-item, .video-card, .accordion-item"
  )].filter((item) => !item.classList.contains("reveal"));
  const motionItems = [];

  const registerMotionItems = (items, className, delayStep = 0, maximumDelay = 0) => {
    items.forEach((item, index) => {
      item.classList.add(className);
      if (delayStep) {
        const delay = Math.min((index % 4) * delayStep, maximumDelay);
        item.style.setProperty("--motion-delay", `${delay}ms`);
      }
      motionItems.push(item);
    });
  };

  registerMotionItems(motionKickerItems, "motion-kicker");
  registerMotionItems(motionTextItems, "motion-text");
  registerMotionItems(motionCardItems, "motion-card", 70, 210);
  heroCopies.forEach((copy) => copy.classList.add("motion-hero-copy"));

  if (motionItems.length) {
    doc.documentElement.classList.add("motion-ready");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      motionItems.forEach((item) => item.classList.add("is-motion-visible"));
    } else {
      const motionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-motion-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

      motionItems.forEach((item) => motionObserver.observe(item));
    }
  }

  const menuToggle = doc.querySelector(".menu-toggle");
  const mobileMenu = doc.querySelector(".mobile-menu");
  const menuClose = doc.querySelector(".mobile-menu-close");
  const mobileLinks = mobileMenu?.querySelectorAll("a") || [];
  let menuReturnFocus = null;

  const setMenuState = (open) => {
    if (!header || !menuToggle || !mobileMenu) return;
    if (open) menuReturnFocus = doc.activeElement;
    header.classList.toggle("menu-active", open);
    body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.setAttribute("aria-hidden", String(!open));

    if (open) {
      window.setTimeout(() => menuClose?.focus(), 80);
    } else if (menuReturnFocus instanceof HTMLElement) {
      menuReturnFocus.focus();
    }
  };

  menuToggle?.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  menuClose?.addEventListener("click", () => setMenuState(false));
  mobileLinks.forEach((link) => link.addEventListener("click", () => setMenuState(false)));

  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header?.classList.contains("menu-active")) {
      setMenuState(false);
    }
  });

  const filterButtons = doc.querySelectorAll("[data-filter]");
  const productCards = doc.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter || "all";
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      productCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");
        card.hidden = selected !== "all" && !categories.includes(selected);
      });
    });
  });

  const categoryCarousels = [...doc.querySelectorAll("[data-product-carousel]")];

  categoryCarousels.forEach((card) => {
    const image = card.querySelector("[data-carousel-image]");
    const name = card.querySelector("[data-carousel-name]");
    const position = card.querySelector("[data-carousel-position]");
    const previousButton = card.querySelector("[data-carousel-prev]");
    const nextButton = card.querySelector("[data-carousel-next]");
    const firstProduct = Number(card.dataset.productStart);
    const lastProduct = Number(card.dataset.productEnd);
    const productFiles = (card.dataset.productFiles || "")
      .split("|")
      .map((value) => Number(value))
      .filter((value) => Number.isInteger(value) && value > 0);
    const productNames = (card.dataset.productNames || "").split("|").filter(Boolean);
    const productCount = productFiles.length || (lastProduct - firstProduct + 1);
    let currentIndex = 0;
    let rotationTimer = null;
    let transitionTimer = null;

    if (!image || !name || !position || productCount < 1) return;

    const sourceFor = (index) => {
      const productNumber = productFiles[index] || (firstProduct + index);
      return `assets/images/catalog-products/product-${String(productNumber).padStart(3, "0")}.webp`;
    };

    const labelFor = (index) => productNames[index] || `Product ${index + 1}`;

    const showProduct = (nextIndex) => {
      currentIndex = (nextIndex + productCount) % productCount;
      card.classList.add("is-changing");
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        const productName = labelFor(currentIndex);
        image.src = sourceFor(currentIndex);
        image.alt = productName;
        name.textContent = productName;
        position.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(productCount).padStart(2, "0")}`;
        window.requestAnimationFrame(() => card.classList.remove("is-changing"));
      }, reducedMotion ? 0 : 150);
    };

    const stopRotation = () => {
      window.clearInterval(rotationTimer);
      rotationTimer = null;
    };

    const startRotation = () => {
      stopRotation();
      if (!reducedMotion && productCount > 1 && !doc.hidden) {
        rotationTimer = window.setInterval(() => showProduct(currentIndex + 1), 5000);
      }
    };

    const moveManually = (direction) => {
      showProduct(currentIndex + direction);
      startRotation();
    };

    previousButton?.addEventListener("click", () => moveManually(-1));
    nextButton?.addEventListener("click", () => moveManually(1));
    card.addEventListener("pointerenter", stopRotation);
    card.addEventListener("pointerleave", startRotation);
    card.addEventListener("focusin", stopRotation);
    card.addEventListener("focusout", (event) => {
      if (!card.contains(event.relatedTarget)) startRotation();
    });
    doc.addEventListener("visibilitychange", () => {
      if (doc.hidden) stopRotation();
      else startRotation();
    });

    const preloadProducts = () => {
      for (let index = 0; index < productCount; index += 1) {
        const preloadImage = new Image();
        preloadImage.src = sourceFor(index);
      }
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadProducts, { timeout: 2400 });
    } else {
      window.setTimeout(preloadProducts, 800);
    }

    startRotation();
  });

  const catalogSearch = doc.querySelector("[data-catalog-search]");
  const catalogItems = [...doc.querySelectorAll(".catalog-item")];
  const catalogSections = [...doc.querySelectorAll("[data-catalog-section]")];
  const catalogSubsections = [...doc.querySelectorAll("[data-catalog-subsection]")];
  const catalogCount = doc.querySelector("[data-catalog-count]");
  const catalogEmpty = doc.querySelector("[data-catalog-empty]");
  const clearCatalogButton = doc.querySelector("[data-clear-catalog]");

  const updateCatalog = () => {
    const query = (catalogSearch?.value || "").trim().toLowerCase();
    let visibleCount = 0;

    catalogItems.forEach((item) => {
      const matches = !query || item.textContent.toLowerCase().includes(query);
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    catalogSections.forEach((section) => {
      section.hidden = !section.querySelector(".catalog-item:not([hidden])");
    });

    catalogSubsections.forEach((subsection) => {
      subsection.hidden = !subsection.querySelector(".catalog-item:not([hidden])");
    });

    if (catalogCount) {
      catalogCount.textContent = query
        ? `Showing ${visibleCount} of ${catalogItems.length} product types`
        : `Showing all ${catalogItems.length} product types`;
    }
    if (catalogEmpty) catalogEmpty.hidden = visibleCount > 0 || !query;
  };

  catalogSearch?.addEventListener("input", updateCatalog);
  clearCatalogButton?.addEventListener("click", () => {
    if (!catalogSearch) return;
    catalogSearch.value = "";
    updateCatalog();
    catalogSearch.focus();
  });
  if (catalogItems.length) updateCatalog();

  const bocheProductDetails = {
    "boche-structural": {
      title: "BOCHE structural firefighting boots",
      image: "assets/images/catalog-products/product-117.webp",
      standard: "Model-specific certification available on request",
      summary: "A high-visibility BOCHE structural firefighting boot offered by Renlette for departments seeking protective footwear with fast adjustment and a rugged operational outsole.",
      specs: [["Category", "Structural PPE"], ["Closure", "Dial assisted"], ["Availability", "On request"]],
      features: ["Black protective upper", "High-visibility yellow panels", "Dial-assisted adjustment", "Reinforced toe construction", "Rugged lug outsole", "Contact Renlette for the current technical sheet"]
    },
    "typhon-ir1": {
      title: "BOCHE TYPHON IR1",
      image: "assets/images/catalog-products/product-118.webp",
      standard: "EN 15090:2012 · F2A SRC HI3 CI AN",
      summary: "A tall leather firefighting boot combining traditional lacing with a removable central zipper for secure adjustment, fast access and structural-fire protection.",
      specs: [["Sizes", "EU 35-50"], ["Weight", "2 kg"], ["Upper height", "27 cm"]],
      features: ["2.2 ± 0.2 mm fire-resistant waterproof grain leather", "Waterproof and breathable Sympatex lining", "Removable central zipper with fire-resistant laces", "D3O ankle protection", "Light XXL fiberglass safety toe", "Heat- and slip-resistant nitrile outsole with stainless-steel midsole"]
    },
    "loxo-protect": {
      title: "BOCHE LOXO PROTECT",
      image: "assets/images/catalog-products/product-119.webp",
      standard: "EN 15090:2012 · F2A SRC HI3 CI AN",
      summary: "A compact high-visibility firefighting boot with the BOA Fit System, designed for fast adjustment, flexibility and comfort without conventional laces.",
      specs: [["Sizes", "EU 35-50"], ["Weight", "2 kg"], ["Upper height", "21 cm"]],
      features: ["BOA Fit System with protective dial cover", "2.2 ± 0.2 mm fire-resistant waterproof grain leather", "Waterproof and breathable Sympatex lining", "D3O ankle protection", "Light XXL fiberglass safety toe", "Nitrile outsole with flexible metal-free Pro Tector Z midsole"]
    },
    "joker-v3-ar": {
      title: "BOCHE JOKER V3 AR",
      image: "assets/images/catalog-products/product-120.webp",
      standard: "EN 15090:2012 · F2A SRC HI3 CI AN",
      summary: "A tall pull-on firefighting boot with high-visibility panels, articulated ankle protection and dual pull loops for straightforward donning.",
      specs: [["Sizes", "EU 35-50"], ["Weight", "2.3 kg"], ["Upper height", "30 cm"]],
      features: ["2.2 ± 0.2 mm fire-resistant waterproof grain leather", "Waterproof and breathable Sympatex lining", "D3O ankle protection", "High-visibility ankle panels", "Light XXL fiberglass safety toe", "Heat- and slip-resistant nitrile outsole with stainless-steel midsole"]
    },
    "java-v2": {
      title: "BOCHE JAVA V2",
      image: "assets/images/catalog-products/product-121.webp",
      standard: "EN 15090:2012 · F2A SRC HI3 CI",
      summary: "A tall pull-on firefighting boot focused on lightness and comfort, with a simple shaft, protective leather construction and easy-grip boot puller.",
      specs: [["Sizes", "EU 35-50"], ["Weight", "2.1 kg"], ["Upper height", "33 cm"]],
      features: ["2.2 ± 0.2 mm fire-resistant waterproof grain leather", "Waterproof and breathable Sympatex lining", "Pull-on design with boot puller", "Light XXL fiberglass safety toe", "Heat- and slip-resistant nitrile outsole", "Protective stainless-steel midsole and fire-resistant aramid threads"]
    }
  };

  const productDialog = doc.querySelector("[data-product-dialog]");
  const productDialogImage = productDialog?.querySelector("[data-product-dialog-image]");
  const productDialogTitle = productDialog?.querySelector("[data-product-dialog-title]");
  const productDialogStandard = productDialog?.querySelector("[data-product-dialog-standard]");
  const productDialogSummary = productDialog?.querySelector("[data-product-dialog-summary]");
  const productDialogSpecs = productDialog?.querySelector("[data-product-dialog-specs]");
  const productDialogFeatures = productDialog?.querySelector("[data-product-dialog-features]");
  const productDialogCta = productDialog?.querySelector("[data-product-dialog-cta]");

  const openProductDialog = (productKey) => {
    const details = bocheProductDetails[productKey];
    if (!details || !productDialog) return;

    if (productDialogImage) {
      productDialogImage.src = details.image;
      productDialogImage.alt = details.title;
    }
    if (productDialogTitle) productDialogTitle.textContent = details.title;
    if (productDialogStandard) productDialogStandard.textContent = details.standard;
    if (productDialogSummary) productDialogSummary.textContent = details.summary;
    if (productDialogSpecs) {
      productDialogSpecs.replaceChildren(...details.specs.map(([label, value]) => {
        const wrapper = doc.createElement("div");
        const term = doc.createElement("dt");
        const description = doc.createElement("dd");
        term.textContent = label;
        description.textContent = value;
        wrapper.append(term, description);
        return wrapper;
      }));
    }
    if (productDialogFeatures) {
      productDialogFeatures.replaceChildren(...details.features.map((feature) => {
        const item = doc.createElement("li");
        item.textContent = feature;
        return item;
      }));
    }
    if (productDialogCta) {
      productDialogCta.href = `index.html?equipment=${encodeURIComponent(details.title)}#contact`;
    }

    doc.documentElement.classList.add("product-dialog-open");
    productDialog.showModal();
  };

  doc.querySelectorAll("[data-product-detail]").forEach((button) => {
    button.addEventListener("click", () => openProductDialog(button.dataset.productDetail));
  });

  productDialog?.addEventListener("click", (event) => {
    if (event.target === productDialog) productDialog.close();
  });

  productDialog?.addEventListener("close", () => {
    doc.documentElement.classList.remove("product-dialog-open");
  });

  const equipmentField = doc.querySelector("#equipment");
  const messageField = doc.querySelector("#message");
  const requestedProduct = new URLSearchParams(window.location.search).get("equipment");

  if (requestedProduct && equipmentField) {
    equipmentField.value = requestedProduct;
    if (messageField && !messageField.value.trim()) {
      messageField.value = `Please send product details and quotation guidance for ${requestedProduct}.`;
    }
  }

  doc.querySelectorAll("[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.dataset.product || "Rescue equipment";
      if (equipmentField) equipmentField.value = product;
      if (messageField && !messageField.value.trim()) {
        messageField.value = `Please send product details and quotation guidance for ${product}.`;
      }
      doc.querySelector("#contact")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      window.setTimeout(() => equipmentField?.focus(), reducedMotion ? 0 : 600);
    });
  });

  doc.querySelectorAll(".accordion-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const willOpen = button.getAttribute("aria-expanded") !== "true";

      doc.querySelectorAll(".accordion-item").forEach((otherItem) => {
        otherItem.classList.remove("is-open");
        otherItem.querySelector("button")?.setAttribute("aria-expanded", "false");
      });

      if (willOpen && item) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  const inquiryForm = doc.querySelector("#inquiry-form");
  const formStatus = doc.querySelector(".form-status");

  inquiryForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = inquiryForm.querySelectorAll("[required]");
    let firstInvalid = null;

    requiredFields.forEach((field) => {
      const wrapper = field.closest(".field");
      const valid = field.checkValidity() && field.value.trim().length > 0;
      wrapper?.classList.toggle("has-error", !valid);
      field.setAttribute("aria-invalid", String(!valid));
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      if (formStatus) {
        formStatus.textContent = "Please complete the highlighted fields.";
        formStatus.classList.add("is-visible");
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = "Your inquiry is prepared. This demo does not send messages yet, so please call or email Renlette using the contact details on this page.";
      formStatus.classList.add("is-visible");
    }
  });

  inquiryForm?.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.checkValidity() && field.value.trim()) {
        field.closest(".field")?.classList.remove("has-error");
        field.setAttribute("aria-invalid", "false");
      }
    });
  });

  doc.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  const chatbot = doc.querySelector("[data-chatbot]");
  const launcher = chatbot?.querySelector(".chat-launcher");
  const chatWindow = chatbot?.querySelector(".chat-window");
  const closeChatButton = chatbot?.querySelector("[data-chat-close]");
  const minimizeChatButton = chatbot?.querySelector("[data-chat-minimize]");
  const chatForm = chatbot?.querySelector("[data-chat-form]");
  const chatInput = chatbot?.querySelector("#chat-input");
  const chatMessages = chatbot?.querySelector("[data-chat-messages]");
  const typingIndicator = chatbot?.querySelector("[data-typing]");
  const suggestionButtons = chatbot?.querySelectorAll(".chat-suggestions button") || [];

  const setChatState = (open) => {
    if (!chatbot || !launcher || !chatWindow) return;
    chatbot.classList.toggle("is-open", open);
    launcher.setAttribute("aria-expanded", String(open));
    chatWindow.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("chat-open-mobile", open && window.innerWidth <= 600);

    if (open) {
      window.setTimeout(() => chatInput?.focus(), 260);
    } else {
      launcher.focus();
    }
  };

  launcher?.addEventListener("click", () => setChatState(!chatbot?.classList.contains("is-open")));
  closeChatButton?.addEventListener("click", () => setChatState(false));
  minimizeChatButton?.addEventListener("click", () => setChatState(false));

  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && chatbot?.classList.contains("is-open")) {
      setChatState(false);
    }
  });

  const addMessage = (text, type) => {
    if (!chatMessages) return;
    const message = doc.createElement("div");
    message.className = `message ${type === "user" ? "user-message" : "assistant-message"}`;
    const paragraph = doc.createElement("p");
    paragraph.textContent = text;
    message.appendChild(paragraph);
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Replace this local function with a secure server request when an AI backend is available.
  const getLocalResponse = (question) => {
    const value = question.toLowerCase();

    if (/(quote|quotation|price|cost|buy|order)/.test(value)) {
      return "For a quotation, share the equipment type, application, preferred specifications and quantity. Use the contact form as a guide, then call 02 8 732 5137 or email renlette.trading@yahoo.com.ph.";
    }
    if (/(train|training|support|after.?sales|demo)/.test(value)) {
      return "Renlette supports customers beyond delivery with product guidance and access to technical or medical training through expert partners and trainers. The right arrangement depends on the equipment and your organization's requirements.";
    }
    if (/(water|marine|boat|flood)/.test(value)) {
      return "Water and marine options include rescue boats, marine radios and related water safety equipment. Tell the team about your operating environment and crew size when requesting details.";
    }
    if (/(fire|thermal|camera|smoke)/.test(value)) {
      return "Fire response categories include firefighting equipment, thermal imaging cameras, SCBA systems, cylinders, valves and breathing air compressors.";
    }
    if (/(cut|cutter|extrication|hydraulic|lifting|vehicle|rescue tool)/.test(value)) {
      return "Technical rescue options include hydraulic cutters, combination tools, pumps and lifting bags. Compatibility and application details are important, so include them in your inquiry.";
    }
    if (/(scba|breathing|compressor|cylinder|valve|air)/.test(value)) {
      return "Renlette supplies self-contained breathing apparatus, cylinders, safety valves and refilling compressors. Ask about system compatibility and intended duty before selecting components.";
    }
    if (/(where|location|address|office)/.test(value)) {
      return "Renlette Trading is at LAA 1215 Building, San Vicente Street, Barangay San Vicente, San Pedro City, Laguna 4023, Philippines.";
    }
    if (/(contact|phone|email|call)/.test(value)) {
      return "Call 02 8 732 5137 or +63 917 790 3042. You can also email renlette.trading@yahoo.com.ph.";
    }
    if (/(equipment|product|supply|offer|catalog)/.test(value)) {
      return "Renlette is a specialized source for firefighting, medical and EMS, PPE, hazardous materials, high-angle rescue, technical rescue, thermal imaging, breathing air, communications and energy-safety equipment.";
    }
    if (/(pvstop|solar|panel)/.test(value)) {
      return "Renlette is an official PVSTOP distributor in the Philippines. PVSTOP is a light-blocking coating technology used to make solar PV systems electrically safe for emergency and maintenance work.";
    }

    return "I can help you explore Renlette's product categories, quotation process, nationwide supply and after-sales support. For a requirement-specific recommendation, contact the Renlette team directly.";
  };

  const sendChatMessage = (text) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    addMessage(cleanText, "user");
    if (chatInput) chatInput.value = "";
    typingIndicator?.classList.add("is-visible");
    typingIndicator?.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      typingIndicator?.classList.remove("is-visible");
      typingIndicator?.setAttribute("aria-hidden", "true");
      addMessage(getLocalResponse(cleanText), "assistant");
    }, reducedMotion ? 60 : 650);
  };

  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (chatInput instanceof HTMLInputElement) sendChatMessage(chatInput.value);
  });

  suggestionButtons.forEach((button) => {
    button.addEventListener("click", () => sendChatMessage(button.textContent || ""));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) body.classList.remove("chat-open-mobile");
    if (window.innerWidth > 1180 && header?.classList.contains("menu-active")) setMenuState(false);
  });
})();
