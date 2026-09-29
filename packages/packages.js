(function () {
  "use strict";

  var form = document.getElementById("packageInquiryForm");
  var packageSelect = document.getElementById("packageSelect");
  var comments = document.getElementById("packageComments");
  var submit = document.getElementById("packageSubmit");
  var status = document.getElementById("packageStatus");
  var carousel = document.getElementById("workCarousel");

  if (carousel) {
    var staticMobile = window.matchMedia && window.matchMedia("(max-width: 620px)").matches;
    var portfolioProjects = [
      { title: "Baguio Itinerary Generator", type: "Travel app", label: "BAGUIOBUDDY.COM", description: "Personalized trip planning and local discovery.", href: "https://baguiobuddy.com", preview: "/preview/lakbaybaguio.com/index.html" },
      { title: "FORMA: Architecture Studio", type: "Architecture", label: "FORMA STUDIO", description: "Cinematic storytelling shaped around space and material.", href: "/preview/FORMA-Architecture/index.html", preview: "/preview/FORMA-Architecture/index.html" },
      { title: "Canyon Ranch", type: "Real estate", label: "RESIDENTIAL EXPERIENCE", description: "Premium property discovery through immersive visuals.", href: "/preview/CanyonRanch/index.html", preview: "/preview/CanyonRanch/index.html" },
      { title: "Cloud Chaser", type: "Travel", label: "TRAVEL AGENCY UX", description: "Trip discovery, itineraries, and inquiries in one flow.", href: "/preview/cloudchaser.com/trips.html", preview: "/preview/cloudchaser.com/trips.html" },
      { title: "Renlette Trading", type: "Safety supply", label: "RENLETTETRADING.COM", description: "A modern catalog for rescue, firefighting, and PPE.", href: "https://renlettetrading.com", preview: "/preview/Renlette/index.html" },
      { title: "Discover Mountain Province", type: "Tourism", label: "DESTINATION EXPERIENCE", description: "Places, stories, and trip ideas for Mountain Province.", href: "/preview/DiscoverMountainProvince/index.html", preview: "/preview/DiscoverMountainProvince/index.html" },
      { title: "MeBS Construction", type: "Construction", label: "ENGINEERING & CONSTRUCTION", description: "A credible, project-focused construction company presence.", href: "/preview/mebsconstruction.com/index.html", preview: "/preview/mebsconstruction.com/index.html" },
      { title: "Slow Pour", type: "3D experience", label: "INTERACTIVE COFFEE STORY", description: "A scroll-controlled editorial coffee experience.", href: "/preview/CoffeeCup/index.html", preview: "/preview/CoffeeCup/index.html" },
      { title: "LayoutLetter", type: "Creator tool", label: "NEWSLETTER BUILDER", description: "A visual campaign builder for creators and businesses.", href: "/preview/LayoutLetter.com/index.html", preview: "/preview/LayoutLetter.com/index.html" },
      { title: "Marketing Centralized AI System", type: "Automation", label: "MARKETING OPERATIONS", description: "Campaigns, content, publishing, and intelligence in one workspace.", href: "https://python-ph-marketing-os.vercel.app/", preview: "https://python-ph-marketing-os.vercel.app/" },
      { title: "Prospect OS", type: "Lead generation", label: "SOCIAL-FIRST PROSPECTING", description: "High-intent discovery, scoring, outreach, and analytics.", href: "https://leadfinder-gules.vercel.app/", preview: "https://leadfinder-gules.vercel.app/" },
      { title: "ReadyStation LMS", type: "Training platform", label: "FIRST RESPONDER LMS", description: "Training designed for first responders and fireground readiness.", href: "/preview/ReadyStation/index.html", preview: "/preview/ReadyStation/index.html" },
      { title: "Disaster Response & Training", type: "Corporate", label: "PROFESSIONAL SERVICES", description: "Clear service pathways for response and training programs.", href: "https://conquerorscc.com/", preview: "https://conquerorscc.com/" },
      { title: "IskolarLink", type: "Platform", label: "STUDENT INFORMATION", description: "Academic communication and coordination in one clearer space.", href: "/preview/IskolarLink.com/IskolarLink-main/#/", preview: "/preview/IskolarLink.com/IskolarLink-main/#/" },
      { title: "Fire & Rescue Academy", type: "LMS & SEO", label: "EMERGENCY SERVICES TRAINING", description: "Course delivery and discovery for emergency-services education.", href: "https://fireandrescueacademy.com/", preview: "https://fireandrescueacademy.com/" },
      { title: "Terra Amore", type: "Wedding invitation", label: "EDITORIAL INVITATION", description: "Ceremony details, RSVP, gallery, and a warm coastal story.", href: "/preview/WeddingSite/Amore/index.html", preview: "/preview/WeddingSite/Amore/index.html" },
      { title: "Signal Desk", type: "Data dashboard", label: "SOCIAL MEDIA INTELLIGENCE", description: "Research, live signals, publishing, and campaign decisions.", href: "/preview/MarketingDashboard/index.html", preview: "/preview/MarketingDashboard/index.html" },
      { title: "LinawLedger", type: "Public finance", label: "2026 BUDGET TRANSPARENCY", description: "An approachable, traceable view of the national budget.", href: "/preview/LinawLedger/index.html", preview: "/preview/LinawLedger/index.html" },
      { title: "LET Performance Trends", type: "Education analytics", label: "INTERACTIVE ANALYSIS", description: "Institutions, geography, demographics, and examination ratings.", href: "/let-performance-analysis.html", preview: "/let-performance-analysis.html" },
      { title: "Spending Behavior Analysis", type: "Customer analytics", label: "DATA CASE STUDY", description: "Segmentation, purchase relationships, and transaction forecasting.", href: "/customer-spending-analysis.html", preview: "/customer-spending-analysis.html" },
      { title: "Campaign Landing Experience", type: "Campaign", label: "CONVERSION EXPERIENCE", description: "A focused campaign page with responsive visual hierarchy.", href: "http://paidmediasandbox.3jzvudtzb5-dv13xg0776gq.p.temp-site.link/luke/mood/v2-20off/v2startup.html", preview: "http://paidmediasandbox.3jzvudtzb5-dv13xg0776gq.p.temp-site.link/luke/mood/v2-20off/v2startup.html" },
      { title: "Interactive Campaign Blog", type: "Content", label: "VISUAL STORYTELLING", description: "Interactive promotional content built around a visual story.", href: "https://va-0097.github.io/Mood/", preview: "https://va-0097.github.io/Mood/" },
      { title: "LayoutForge", type: "Design tool", label: "WEBSITE VISION SIMULATOR", description: "Explore layouts, typography, palettes, imagery, and motion.", href: "/preview/layoutforge-simulator/index.html", preview: "/preview/layoutforge-simulator/index.html" }
    ];
    var stage = carousel.querySelector(".work-carousel-stage");
    var dotsContainer = carousel.querySelector(".work-carousel-dots");

    stage.replaceChildren();
    dotsContainer.replaceChildren();

    portfolioProjects.forEach(function (project, projectIndex) {
      var number = String(projectIndex + 1).padStart(2, "0");
      var article = document.createElement("article");
      var preview = document.createElement("div");
      var link = document.createElement("a");
      var dot = document.createElement("button");

      article.className = "work-card";
      article.setAttribute("aria-label", (projectIndex + 1) + " of " + portfolioProjects.length + ": " + project.title);
      preview.className = "work-card-preview";
      preview.setAttribute("aria-hidden", "true");

      var browserBar = document.createElement("div");
      var viewport = document.createElement("div");
      var frame = document.createElement("iframe");

      browserBar.className = "work-card-browserbar";
      browserBar.innerHTML = "<span></span><span></span><span></span><small>PROJECT PREVIEW</small>";
      viewport.className = "work-card-viewport";
      frame.dataset.previewSrc = project.preview;
      frame.title = project.title + " website preview";
      frame.loading = "lazy";
      frame.tabIndex = -1;
      if (staticMobile) {
        frame.addEventListener("load", function () { makePreviewStatic(frame); });
      }
      viewport.appendChild(frame);
      preview.appendChild(browserBar);
      preview.appendChild(viewport);

      link.href = project.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.innerHTML =
        '<span class="work-card-shade" aria-hidden="true"></span>' +
        '<span class="work-card-top"><small>' + number + " / " + project.type.toUpperCase() + '</small><i class="bi bi-arrow-up-right" aria-hidden="true"></i></span>' +
        '<span class="work-card-copy"><small>' + project.label + "</small><strong>" + project.title + "</strong><em>" + project.description + '</em><b>View project <i class="bi bi-arrow-right" aria-hidden="true"></i></b></span>';

      article.appendChild(preview);
      article.appendChild(link);
      stage.appendChild(article);

      dot.type = "button";
      dot.setAttribute("aria-label", "Show project " + (projectIndex + 1) + ": " + project.title);
      dotsContainer.appendChild(dot);
    });

    var cards = Array.prototype.slice.call(carousel.querySelectorAll(".work-card"));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll(".work-carousel-dots button"));
    var previous = carousel.querySelector("[data-carousel-previous]");
    var next = carousel.querySelector("[data-carousel-next]");
    var current = document.getElementById("workCarouselCurrent");
    var total = document.getElementById("workCarouselTotal");
    var carouselStatus = document.getElementById("workCarouselStatus");
    var activeIndex = 0;
    var swipeStartX = null;
    var positionClasses = ["is-active", "is-prev", "is-next", "is-far-prev", "is-far-next"];

    total.textContent = String(cards.length).padStart(2, "0");

    function makePreviewStatic(frame) {
      if (!staticMobile) {
        return;
      }

      try {
        var previewDocument = frame.contentDocument;

        if (!previewDocument || !previewDocument.head) {
          return;
        }

        if (!previewDocument.getElementById("packages-mobile-static-preview")) {
          var style = previewDocument.createElement("style");
          style.id = "packages-mobile-static-preview";
          style.textContent = "html{scroll-behavior:auto!important}*,*::before,*::after{animation:none!important;transition:none!important}";
          previewDocument.head.appendChild(style);
        }

        previewDocument.querySelectorAll("video, audio").forEach(function (media) {
          media.muted = true;
          media.removeAttribute("autoplay");
          media.pause();
        });
      } catch (error) {
        // Cross-origin previews cannot be modified; the carousel itself remains static.
      }
    }

    function hydratePreview(card) {
      var frame = card.querySelector("iframe[data-preview-src]");

      if (frame && !frame.getAttribute("src")) {
        frame.setAttribute("src", frame.dataset.previewSrc);
      }
    }

    function sizePreview(card) {
      var viewport = card.querySelector(".work-card-viewport");
      var frame = viewport ? viewport.querySelector("iframe") : null;

      if (!viewport || !frame) {
        return;
      }

      var scale = Math.max((viewport.clientWidth || 280) / 1280, 0.18);
      frame.style.height = Math.ceil((viewport.clientHeight || 400) / scale) + "px";
      frame.style.transform = "scale(" + scale + ")";
    }

    function showProject(index) {
      activeIndex = (index + cards.length) % cards.length;

      cards.forEach(function (card, cardIndex) {
        var distance = (cardIndex - activeIndex + cards.length) % cards.length;
        if (distance > cards.length / 2) distance -= cards.length;

        card.classList.remove.apply(card.classList, positionClasses);
        if (distance === 0) card.classList.add("is-active");
        if (distance === -1) card.classList.add("is-prev");
        if (distance === 1) card.classList.add("is-next");
        if (distance <= -2) card.classList.add("is-far-prev");
        if (distance >= 2) card.classList.add("is-far-next");

        if (Math.abs(distance) <= 1) {
          hydratePreview(card);
          window.requestAnimationFrame(function () { sizePreview(card); });
        }

        card.setAttribute("aria-hidden", distance === 0 ? "false" : "true");
        card.querySelector("a").setAttribute("tabindex", distance === 0 ? "0" : "-1");
      });

      dots.forEach(function (dot, dotIndex) {
        if (dotIndex === activeIndex) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });

      if (dots[activeIndex] && dotsContainer.scrollWidth > dotsContainer.clientWidth) {
        dotsContainer.scrollLeft = Math.max(0, dots[activeIndex].offsetLeft - dotsContainer.clientWidth / 2);
      }

      current.textContent = String(activeIndex + 1).padStart(2, "0");
      carouselStatus.textContent = "Showing project " + (activeIndex + 1) + " of " + cards.length + ": " + cards[activeIndex].getAttribute("aria-label").replace(/^\d+ of \d+: /, "");
    }

    previous.addEventListener("click", function () { showProject(activeIndex - 1); });
    next.addEventListener("click", function () { showProject(activeIndex + 1); });
    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () { showProject(dotIndex); });
    });

    window.addEventListener("resize", function () {
      cards.forEach(sizePreview);
    });

    carousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); showProject(activeIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showProject(activeIndex + 1); }
    });

    carousel.querySelector(".work-carousel-stage").addEventListener("pointerdown", function (event) {
      swipeStartX = event.clientX;
    });
    carousel.querySelector(".work-carousel-stage").addEventListener("pointerup", function (event) {
      if (swipeStartX === null) return;
      var distance = event.clientX - swipeStartX;
      swipeStartX = null;
      if (Math.abs(distance) < 45) return;
      showProject(activeIndex + (distance < 0 ? 1 : -1));
    });
    carousel.querySelector(".work-carousel-stage").addEventListener("pointercancel", function () {
      swipeStartX = null;
    });

    showProject(0);
  }

  document.querySelectorAll("[data-package]").forEach(function (button) {
    button.addEventListener("click", function () {
      packageSelect.value = button.getAttribute("data-package") || "";
      document.getElementById("inquiry").scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () { packageSelect.focus(); }, 450);
    });
  });

  if (window.emailjs) {
    window.emailjs.init("96_UPP64ognZ8mIif");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(form);
    comments.value = [
      "Packages page inquiry: " + formData.get("package"),
      "Business or brand: " + (formData.get("business_name") || "Not provided"),
      "Phone number: " + (formData.get("subject") || "Not provided"),
      "",
      "Project details:",
      formData.get("project_details")
    ].join("\n");

    if (!window.emailjs) {
      status.textContent = "The inquiry service is unavailable. Please email luke@lukasleona.com.";
      status.className = "error";
      return;
    }

    submit.disabled = true;
    submit.innerHTML = 'Sending inquiry <i class="bi bi-arrow-repeat" aria-hidden="true"></i>';
    status.textContent = "Sending your package and project details to Luke.";
    status.className = "";

    window.emailjs.sendForm("service_2ter3tn", "template_52y6bwx", form)
      .then(function () {
        form.reset();
        status.textContent = "Thanks—Luke received your package inquiry.";
        status.className = "success";
        submit.disabled = false;
        submit.innerHTML = 'Send package inquiry <i class="bi bi-send" aria-hidden="true"></i>';
      }, function () {
        status.textContent = "Could not send the inquiry. Please try again or email luke@lukasleona.com.";
        status.className = "error";
        submit.disabled = false;
        submit.innerHTML = 'Send package inquiry <i class="bi bi-send" aria-hidden="true"></i>';
      });
  });
})();
