(function () {
  "use strict";

  function currentFile() {
    var path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  function activateMenu() {
    var current = currentFile();
    if (current === "engineer-details.html") current = "team.html";

    document.querySelectorAll(".tp-mobile-menu-active > ul > li").forEach(function (item) {
      item.classList.remove("active");
      var link = item.querySelector(":scope > a[href]");
      if (link && link.getAttribute("href") === current) {
        item.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function addQuoteShortcut() {
    if (document.querySelector(".mebs-quote-shortcut")) return;

    var link = document.createElement("a");
    link.className = "mebs-quote-shortcut";
    link.href = "contact.html";
    link.setAttribute("aria-label", "Start your construction project");
    link.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M4 19.5V5.8C4 4.8 4.8 4 5.8 4h12.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H9l-5 3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<path d="M8 8h8M8 12h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '</svg><span>Start Your Project</span>';
    document.body.appendChild(link);
  }

  function setupFaq() {
    document.querySelectorAll(".mebs-faq-card > button").forEach(function (button) {
      button.addEventListener("click", function () {
        var card = button.closest(".mebs-faq-card");
        var list = card.parentElement;

        list.querySelectorAll(".mebs-faq-card").forEach(function (item) {
          if (item !== card) {
            item.classList.remove("is-open");
            var otherButton = item.querySelector(":scope > button");
            if (otherButton) {
              otherButton.setAttribute("aria-expanded", "false");
              var symbol = otherButton.querySelector("i");
              if (symbol) symbol.textContent = "+";
            }
          }
        });

        var open = !card.classList.contains("is-open");
        card.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", String(open));
        var icon = button.querySelector("i");
        if (icon) icon.textContent = open ? "−" : "+";
      });
    });
  }

  function setupEngineerCards() {
    document.querySelectorAll(".mebs-engineer-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        var card = button.closest(".mebs-engineer-card");
        var open = !card.classList.contains("is-open");
        card.classList.toggle("is-open", open);
        button.textContent = open ? "−" : "+";
        button.setAttribute("aria-expanded", String(open));
      });
    });
  }

  function setupProjectFilters() {
    var buttons = document.querySelectorAll("[data-project-filter]");
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-project-filter");

        buttons.forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });

        document.querySelectorAll("[data-project-category]").forEach(function (card) {
          var category = card.getAttribute("data-project-category");
          var show = filter === "all" || category === filter || category === "all";
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  function addFallbackReveal() {
    if (!("IntersectionObserver" in window)) return;

    var elements = document.querySelectorAll(
      ".mebs-reveal, .mebs-feature-card, .mebs-principles-grid article, " +
      ".mebs-engineer-row, .mebs-strengths-grid article, " +
      ".mebs-about-team-card, .mebs-service-card, " +
      ".mebs-project-card, .mebs-engineer-card, .mebs-guide-card"
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(function (element) {
      if (!element.classList.contains("tp_fade_anim")) {
        element.classList.add("mebs-reveal");
        observer.observe(element);
      }
    });
  }


  function setupProjectForms() {
    document.querySelectorAll(".mebs-contact-form, .mebs-consultation-form").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var status = form.querySelector(".mebs-form-status");
        if (!status) {
          status = document.createElement("p");
          status.className = "mebs-form-status";
          status.setAttribute("aria-live", "polite");
          form.appendChild(status);
        }

        status.textContent =
          "Thank you. Your project details have been prepared for submission to the MeBS team.";
      });
    });
  }

  function updateYear() {
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    activateMenu();
    addQuoteShortcut();
    setupFaq();
    setupEngineerCards();
    setupProjectFilters();
    setupProjectForms();
    addFallbackReveal();
    updateYear();
  });
})();
