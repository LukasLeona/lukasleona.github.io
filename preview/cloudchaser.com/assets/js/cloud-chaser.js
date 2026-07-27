/* Cloud Chaser modern interactions.
   Keeps the template's existing main.js and all existing image paths intact. */
(function () {
  "use strict";

  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  ready(() => {
    document.documentElement.classList.add("cc-js");
    document.body.classList.add("cloud-chaser-site");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Remove the old-fashioned contact/social top strip from the document flow.
    document.querySelectorAll(".header-top-wrap, .header-top-area").forEach((bar) => bar.remove());

    // Apply the active state based on the current file name.
    const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".main-menu a, .vs-mobile-menu a").forEach((link) => {
      const href = (link.getAttribute("href") || "").split("#")[0].toLowerCase();
      if (!href || href === "javascript:void(0)" || href === "#") return;
      const linkFile = href.split("/").pop();
      if (linkFile === currentFile || (currentFile === "" && linkFile === "index.html")) {
        link.closest("li")?.classList.add("active", "current-menu-item");
      }
    });

    // Add soft animated clouds to hero and breadcrumb areas without changing images.
    if (!reducedMotion) {
      document.querySelectorAll(".hero-layout1, .breadcumb-wrapper, .vs-breadcrumb").forEach((host, hostIndex) => {
        if (host.querySelector(":scope > .cc-cloud-layer")) return;

        const layer = document.createElement("div");
        layer.className = "cc-cloud-layer";
        layer.setAttribute("aria-hidden", "true");

        const cloudSettings = [
          { top: "17%", width: "150px", speed: "36s", delay: "-20s", opacity: ".18", blur: "1px" },
          { top: "38%", width: "240px", speed: "48s", delay: "-34s", opacity: ".13", blur: "5px", soft: true },
          { top: "65%", width: "185px", speed: "42s", delay: "-10s", opacity: ".16", blur: "2px", reverse: true },
          { top: "76%", width: "115px", speed: "31s", delay: "-26s", opacity: ".17", blur: "0px", accent: true },
          { top: "9%", width: "105px", speed: "29s", delay: "-7s", opacity: ".15", blur: "0px", reverse: true }
        ];

        cloudSettings.forEach((settings, index) => {
          const cloud = document.createElement("span");
          cloud.className = "cc-cloud";
          if (settings.soft) cloud.classList.add("cc-cloud--soft");
          if (settings.reverse) cloud.classList.add("cc-cloud--reverse");
          if (settings.accent) cloud.classList.add("cc-cloud--accent");
          cloud.style.setProperty("--cc-cloud-top", settings.top);
          cloud.style.setProperty("--cc-cloud-width", settings.width);
          cloud.style.setProperty("--cc-cloud-speed", settings.speed);
          cloud.style.setProperty("--cc-cloud-delay", `${settings.delay.replace('s','') - hostIndex * 2}s`);
          cloud.style.setProperty("--cc-cloud-opacity", settings.opacity);
          cloud.style.setProperty("--cc-cloud-blur", settings.blur);
          cloud.style.setProperty("--cc-cloud-left", `${-30 - index * 6}%`);
          layer.appendChild(cloud);
        });

        host.prepend(layer);
      });
    }

    // Hero copy enters as one centered group.
    document.querySelectorAll(".hero-layout1 .hero-content, .breadcumb-content, .vs-breadcrumb .breadcrumb-content").forEach((element) => {
      element.classList.add("cc-hero-enter");
    });

    // Soft cloud-like reveal for page content.
    const revealSelectors = [
      ".destination-style1", ".destination-style2", ".destination-box",
      ".tour-package-box", ".blog-style1", ".activity-style1",
      ".service-style1", ".team-style1", ".award-box",
      ".trip-info-box", ".accordion-item", ".contact-info-box",
      ".footer-widgets", ".widget", ".title-area:not(.hero-layout1 .title-area)"
    ];
    const revealItems = Array.from(document.querySelectorAll(revealSelectors.join(",")))
      .filter((element) => !element.classList.contains("fade-anim"));

    revealItems.forEach((element, index) => {
      element.classList.add("cc-reveal");
      element.style.setProperty("--cc-delay", `${Math.min((index % 4) * 70, 210)}ms`);
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((element) => element.classList.add("cc-visible"));
    } else {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("cc-visible");
          currentObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -7% 0px", threshold: 0.1 });
      revealItems.forEach((element) => observer.observe(element));
    }

    // Sticky navigation shadow state.
    const stickyBars = document.querySelectorAll("#navbars, .sticky-active");
    const updateHeader = () => {
      const scrolled = window.scrollY > 32;
      stickyBars.forEach((bar) => bar.classList.toggle("cc-scrolled", scrolled));
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    // Gentle logo motion.
    document.querySelectorAll(".header-logo img.logo, #navbars img.logo, .mobile-logo img.logo").forEach((logo) => {
      logo.classList.add("cc-logo-breathe");
    });

    // Ripple feedback for actions.
    document.querySelectorAll(".vs-btn, button[type='submit'], input[type='submit']").forEach((button) => {
      button.addEventListener("pointerdown", (event) => {
        if (reducedMotion || button instanceof HTMLInputElement) return;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "cc-ripple";
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        button.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 700);
      });
    });

    // Smooth in-page links only; normal page navigation remains untouched.
    document.querySelectorAll("a[href^='#']:not([href='#'])").forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id) return;
        let target;
        try { target = document.querySelector(id); } catch (_) { return; }
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      });
    });

    // Keep existing decorative elements subtly alive.
    document.querySelectorAll(".animate-parachute, .icon-cloud, .icon-ballon-sclation").forEach((element, index) => {
      element.classList.add("cc-float");
      element.style.animationDelay = `${(index % 4) * -0.7}s`;
    });
  });
})();


/* Final polish: demo trip-request confirmation. */
(function () {
  "use strict";

  const initDemoRequest = () => {
    const form = document.querySelector('.cc-trip-request-form, .destination-request form');
    if (!form || form.dataset.ccDemoReady === 'true') return;
    form.dataset.ccDemoReady = 'true';

    const modal = document.createElement('div');
    modal.className = 'cc-demo-modal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'cc-demo-modal-title');
    modal.innerHTML = `
      <div class="cc-demo-modal__dialog">
        <div class="cc-demo-modal__icon" aria-hidden="true">
          <i class="fa-solid fa-check"></i>
        </div>
        <span class="cc-demo-modal__eyebrow">Demo confirmation</span>
        <h2 id="cc-demo-modal-title">Your request was sent!</h2>
        <p>Thanks for sharing your trip details. Cloud Chaser will get back to you shortly to help shape your itinerary.</p>
        <button class="cc-demo-modal__close" type="button">Got it</button>
      </div>`;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.cc-demo-modal__close');
    let previousFocus = null;

    const closeModal = () => {
      modal.hidden = true;
      document.body.classList.remove('cc-modal-open');
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    };

    const openModal = () => {
      previousFocus = document.activeElement;
      modal.hidden = false;
      document.body.classList.add('cc-modal-open');
      window.requestAnimationFrame(() => closeButton?.focus());
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      openModal();
      form.reset();
    });

    closeButton?.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hidden) closeModal();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDemoRequest, { once: true });
  } else {
    initDemoRequest();
  }
})();
