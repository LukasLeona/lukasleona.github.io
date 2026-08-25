(function () {
  "use strict";

  var portfolio = document.getElementById("portfolio");
  var chatbot = document.querySelector(".global-chatbot");
  var chatbotPanel = document.getElementById("chatbotPanel");
  var ordinaryTeaser = document.getElementById("chatbotTeaser");
  var promo = document.getElementById("layoutforgeBotPromo");
  var overlay = document.getElementById("layoutforgePortfolioOverlay");
  var overlayClose = document.getElementById("layoutforgeOverlayClose");
  var simulatorFrame = document.getElementById("layoutforgeSimulatorFrame");
  var packagesModal = document.getElementById("portfolioPackagesModal");
  var packagesClose = document.getElementById("portfolioPackagesClose");
  var packagesTrigger = document.getElementById("resumePackagesTrigger");
  var packageTabs = document.querySelector(".portfolio-package-tabs");
  var packageFootnote = document.getElementById("portfolioPackagesFootnote");
  var packageInquiryView = document.getElementById("portfolioPackageInquiryView");
  var packageSuccessView = document.getElementById("portfolioPackageSuccessView");
  var packageInquiryForm = document.getElementById("portfolioPackageInquiryForm");
  var packageFormStatus = document.getElementById("portfolioPackageFormStatus");
  var packageSubmit = document.getElementById("portfolioPackageSubmit");

  if (!portfolio || !promo || !overlay || !simulatorFrame) {
    return;
  }

  var attentionAudio = new Audio("assets/audio/lumo-giggle.mp3");
  var audioContext = null;
  var audioBuffer = null;
  var audioBufferPromise = null;
  var worksTimer = null;
  var reminderTimer = null;
  var promoShown = false;
  var promoClicked = false;
  var reminderCount = 0;
  var packagesLastFocus = null;
  var activePackageCategory = "website";
  var selectedPackageName = "";

  attentionAudio.preload = "auto";
  attentionAudio.volume = 0.58;

  function prepareAudio() {
    if (audioBufferPromise) {
      if (audioContext && audioContext.state === "suspended") {
        audioContext.resume().catch(function () {});
      }
      return;
    }

    var AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext || !window.fetch) {
      attentionAudio.load();
      return;
    }

    try {
      audioContext = new AudioContext();
      audioContext.resume().catch(function () {});
      audioBufferPromise = window.fetch("assets/audio/lumo-giggle.mp3")
        .then(function (response) { return response.arrayBuffer(); })
        .then(function (arrayBuffer) { return audioContext.decodeAudioData(arrayBuffer); })
        .then(function (decoded) {
          audioBuffer = decoded;
          return decoded;
        })
        .catch(function () {
          audioBufferPromise = null;
          attentionAudio.load();
          return null;
        });
    } catch (error) {
      audioContext = null;
      attentionAudio.load();
    }
  }

  function playAttentionSound(volume) {
    var level = typeof volume === "number" ? volume : 0.48;

    if (audioContext && audioBuffer) {
      if (audioContext.state === "suspended") {
        audioContext.resume().catch(function () {});
      }

      try {
        var source = audioContext.createBufferSource();
        var gain = audioContext.createGain();
        source.buffer = audioBuffer;
        gain.gain.value = level;
        source.connect(gain);
        gain.connect(audioContext.destination);
        source.start(0);
        return;
      } catch (error) {
        // Fall through to the media element fallback.
      }
    }

    try {
      attentionAudio.pause();
      attentionAudio.currentTime = 0;
      attentionAudio.volume = level;
      var playback = attentionAudio.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch(function () {});
      }
    } catch (error) {
      // The visual prompt remains available when autoplay is restricted.
    }
  }

  function portfolioIsActive() {
    return portfolio.classList.contains("active") && !document.hidden;
  }

  function clearReminder() {
    window.clearTimeout(reminderTimer);
    reminderTimer = null;
  }

  function hidePromo() {
    promo.classList.remove("show", "is-nudging");
    promo.setAttribute("aria-hidden", "true");
    if (chatbot) {
      chatbot.classList.remove("promo-attention", "layoutforge-promo-visible");
    }
  }

  function hideAssistantPrompts() {
    clearReminder();
    hidePromo();

    if (ordinaryTeaser) {
      ordinaryTeaser.classList.remove("show");
    }

    if (chatbotPanel && chatbotPanel.classList.contains("show")) {
      document.getElementById("chatbotClose")?.click();
    }
  }

  function nudgePromo() {
    if (promoClicked || !promoShown || !portfolioIsActive() || overlay.classList.contains("show")) {
      return;
    }

    reminderCount += 1;
    playAttentionSound(reminderCount === 1 ? 0.42 : 0.32);
    promo.classList.remove("is-nudging");

    if (chatbot) {
      chatbot.classList.remove("promo-attention");
    }

    window.requestAnimationFrame(function () {
      promo.classList.add("is-nudging");
      if (chatbot) chatbot.classList.add("promo-attention");
    });

    window.setTimeout(function () {
      promo.classList.remove("is-nudging");
      if (chatbot) chatbot.classList.remove("promo-attention");
    }, 950);

    if (reminderCount < 2) {
      reminderTimer = window.setTimeout(nudgePromo, 11000);
    }
  }

  function showPromo() {
    if (promoShown || promoClicked || !portfolioIsActive()) {
      return;
    }

    promoShown = true;
    playAttentionSound(0.54);

    if (chatbotPanel && chatbotPanel.classList.contains("show")) {
      document.getElementById("chatbotClose")?.click();
    }

    if (ordinaryTeaser) {
      ordinaryTeaser.classList.remove("show");
    }

    promo.setAttribute("aria-hidden", "false");
    if (chatbot) chatbot.classList.add("layoutforge-promo-visible");
    window.requestAnimationFrame(function () { promo.classList.add("show"); });
    reminderTimer = window.setTimeout(nudgePromo, 9000);
  }

  function startWorksTimer() {
    if (worksTimer || promoShown || promoClicked || !portfolioIsActive()) {
      return;
    }

    prepareAudio();
    worksTimer = window.setTimeout(function () {
      worksTimer = null;
      showPromo();
    }, 5000);
  }

  function cancelWorksTimer() {
    window.clearTimeout(worksTimer);
    worksTimer = null;

    if (!portfolioIsActive() && !promoClicked) {
      clearReminder();
      hidePromo();
    }
  }

  function openSimulator() {
    promoClicked = true;
    hideAssistantPrompts();

    if (packagesModal?.classList.contains("show")) {
      closePackages(false);
    }

    if (!simulatorFrame.getAttribute("src")) {
      var simulatorUrl = new URL(simulatorFrame.getAttribute("data-src"), document.baseURI);
      simulatorUrl.searchParams.set("theme", currentPortfolioTheme());
      simulatorFrame.setAttribute("src", simulatorUrl.href);
    }

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("layoutforge-simulator-open");
    syncSimulatorTheme();
    window.setTimeout(function () { overlayClose?.focus(); }, 180);
  }

  function closeSimulator() {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("layoutforge-simulator-open");
  }

  function currentPortfolioTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function syncSimulatorTheme() {
    if (!simulatorFrame.contentWindow) return;
    simulatorFrame.contentWindow.postMessage({
      type: "layoutforge:set-theme",
      theme: currentPortfolioTheme()
    }, "*");
  }

  function switchPackageCategory(category) {
    if (!packagesModal) return;
    activePackageCategory = category === "advanced" ? "advanced" : "website";

    packagesModal.querySelectorAll("[data-portfolio-package-tab]").forEach(function (button) {
      var active = button.getAttribute("data-portfolio-package-tab") === activePackageCategory;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });

    packagesModal.querySelectorAll("[data-portfolio-package-panel]").forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-portfolio-package-panel") !== activePackageCategory;
    });

    var dialog = packagesModal.querySelector(".portfolio-packages-dialog");
    if (dialog) dialog.scrollTop = 0;
  }

  function updatePackageHeader(title, description) {
    var titleElement = document.getElementById("portfolioPackagesTitle");
    var descriptionElement = document.getElementById("portfolioPackagesDescription");
    if (titleElement) titleElement.textContent = title;
    if (descriptionElement) descriptionElement.textContent = description;
  }

  function showPackageList(category) {
    if (packageTabs) packageTabs.hidden = false;
    if (packageFootnote) packageFootnote.hidden = false;
    if (packageInquiryView) packageInquiryView.hidden = true;
    if (packageSuccessView) packageSuccessView.hidden = true;
    updatePackageHeader("Choose the right level for your project.", "Compare the core scope at a glance, then tell Luke which package you want to discuss.");
    switchPackageCategory(category || activePackageCategory);
  }

  function showPackageForm() {
    if (packageTabs) packageTabs.hidden = true;
    if (packageFootnote) packageFootnote.hidden = true;
    packagesModal.querySelectorAll("[data-portfolio-package-panel]").forEach(function (panel) { panel.hidden = true; });
    if (packageInquiryView) packageInquiryView.hidden = false;
    if (packageSuccessView) packageSuccessView.hidden = true;
    updatePackageHeader("Tell Luke about your project.", "Your selected package is ready. Add the details Luke needs to review your request and reply.");
    var dialog = packagesModal.querySelector(".portfolio-packages-dialog");
    if (dialog) dialog.scrollTop = 0;
    window.setTimeout(function () { packageInquiryForm?.elements.name.focus(); }, 60);
  }

  function showPackageSuccess() {
    if (packageTabs) packageTabs.hidden = true;
    if (packageFootnote) packageFootnote.hidden = true;
    packagesModal.querySelectorAll("[data-portfolio-package-panel]").forEach(function (panel) { panel.hidden = true; });
    if (packageInquiryView) packageInquiryView.hidden = true;
    if (packageSuccessView) packageSuccessView.hidden = false;
    updatePackageHeader("Your inquiry is on its way.", "Luke now has your selected package and project details.");
    var dialog = packagesModal.querySelector(".portfolio-packages-dialog");
    if (dialog) dialog.scrollTop = 0;
    window.setTimeout(function () { document.getElementById("portfolioPackageSuccessClose")?.focus(); }, 60);
  }

  function openPackages() {
    if (!packagesModal) return;
    hideAssistantPrompts();
    if (overlay.classList.contains("show")) closeSimulator();
    packagesLastFocus = document.activeElement;
    showPackageList("website");
    if (packageFormStatus) {
      packageFormStatus.textContent = "";
      packageFormStatus.classList.remove("error");
    }
    packagesModal.classList.add("show");
    packagesModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("portfolio-packages-open");
    window.setTimeout(function () { packagesClose?.focus(); }, 80);
  }

  function closePackages(restoreFocus) {
    if (!packagesModal) return;
    var wasOpen = packagesModal.classList.contains("show");
    var returnFocus = packagesLastFocus;
    packagesModal.classList.remove("show");
    packagesModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("portfolio-packages-open");
    packagesLastFocus = null;
    if (wasOpen && restoreFocus !== false && returnFocus instanceof HTMLElement) returnFocus.focus();
  }

  function dismissCenterLayersForNavigation() {
    hideAssistantPrompts();
    if (packagesModal?.classList.contains("show")) closePackages(false);
    if (overlay.classList.contains("show")) closeSimulator();
  }

  function startPackageInquiry(packageName) {
    if (!packageInquiryForm) return;
    selectedPackageName = packageName;
    packageInquiryForm.reset();
    document.getElementById("portfolioSelectedPackageName").textContent = packageName;
    document.getElementById("portfolioSelectedPackageInput").value = packageName;
    packageFormStatus.textContent = "";
    packageFormStatus.classList.remove("error");
    showPackageForm();
  }

  portfolio.addEventListener("scroll", startWorksTimer, { passive: true });
  portfolio.addEventListener("wheel", startWorksTimer, { passive: true });
  portfolio.addEventListener("touchmove", startWorksTimer, { passive: true });
  document.addEventListener("wheel", startWorksTimer, { passive: true, capture: true });
  document.addEventListener("touchmove", startWorksTimer, { passive: true, capture: true });
  document.addEventListener("keydown", function (event) {
    if (["ArrowDown", "PageDown", "End", " "].includes(event.key)) {
      startWorksTimer();
    }
  });

  var sectionObserver = new MutationObserver(function () {
    if (!portfolioIsActive()) {
      cancelWorksTimer();
    }
  });
  try {
    sectionObserver.observe(portfolio, { attributes: true, attributeFilter: ["class"] });
  } catch (error) {
    // Navigation still works if a browser blocks observation during page setup.
  }

  document.addEventListener("pointerdown", prepareAudio, { once: true, passive: true });
  document.addEventListener("keydown", prepareAudio, { once: true });

  promo.addEventListener("click", openSimulator);
  document.querySelectorAll(".layoutforge-open-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", openSimulator);
    trigger.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSimulator();
      }
    });
  });

  overlayClose?.addEventListener("click", closeSimulator);
  simulatorFrame.addEventListener("load", syncSimulatorTheme);
  if (document.documentElement) {
    try {
      new MutationObserver(syncSimulatorTheme).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"]
      });
    } catch (error) {
      // The frame is also synchronized on open and load.
    }
  }
  window.addEventListener("message", function (event) {
    if (event.source === simulatorFrame.contentWindow && event.data?.type === "layoutforge:theme-ready") {
      syncSimulatorTheme();
    }
  });
  packagesTrigger?.addEventListener("click", openPackages);
  packagesClose?.addEventListener("click", closePackages);

  document.querySelectorAll(".menu > li a").forEach(function (link) {
    link.addEventListener("click", dismissCenterLayersForNavigation, true);
  });
  window.addEventListener("hashchange", dismissCenterLayersForNavigation);
  window.addEventListener("popstate", dismissCenterLayersForNavigation);

  packagesModal?.addEventListener("click", function (event) {
    if (event.target === packagesModal) {
      closePackages();
      return;
    }

    var tab = event.target.closest("[data-portfolio-package-tab]");
    if (tab) {
      switchPackageCategory(tab.getAttribute("data-portfolio-package-tab"));
      return;
    }

    var packageButton = event.target.closest("[data-package-name]");
    if (packageButton) startPackageInquiry(packageButton.getAttribute("data-package-name"));
  });
  document.getElementById("portfolioPackageBack")?.addEventListener("click", function () { showPackageList(activePackageCategory); });
  document.getElementById("portfolioPackageSuccessClose")?.addEventListener("click", closePackages);
  document.getElementById("portfolioPackageNewInquiry")?.addEventListener("click", function () { showPackageList(activePackageCategory); });

  packageInquiryForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(packageInquiryForm);
    document.getElementById("portfolioPackageComments").value = [
      "Portfolio package inquiry: " + selectedPackageName,
      "Business or brand: " + (formData.get("business_name") || "Not provided"),
      "Existing website: " + (formData.get("existing_website") || "Not provided"),
      "Preferred contact: " + (formData.get("preferred_contact") || "Email"),
      "Target start or launch: " + (formData.get("target_date") || "Not provided"),
      "Estimated budget: " + (formData.get("budget") || "Not provided"),
      "",
      "Project details:",
      formData.get("project_details")
    ].join("\n");

    if (!window.emailjs) {
      packageFormStatus.textContent = "The inquiry service is unavailable. Please email lukemarkleona9@gmail.com.";
      packageFormStatus.classList.add("error");
      return;
    }

    packageSubmit.disabled = true;
    packageSubmit.innerHTML = 'Sending inquiry <i class="bi bi-arrow-repeat" aria-hidden="true"></i>';
    packageFormStatus.textContent = "Sending your package and project details to Luke.";
    packageFormStatus.classList.remove("error");

    window.emailjs.sendForm("service_2ter3tn", "template_52y6bwx", packageInquiryForm)
      .then(function () {
        packageInquiryForm.reset();
        showPackageSuccess();
        packageSubmit.disabled = false;
        packageSubmit.innerHTML = 'Send package inquiry <i class="bi bi-send" aria-hidden="true"></i>';
      }, function () {
        packageFormStatus.textContent = "Could not send the inquiry. Please try again or email lukemarkleona9@gmail.com.";
        packageFormStatus.classList.add("error");
        packageSubmit.disabled = false;
        packageSubmit.innerHTML = 'Send package inquiry <i class="bi bi-send" aria-hidden="true"></i>';
      });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Tab" && packagesModal?.classList.contains("show")) {
      var focusable = Array.from(packagesModal.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'))
        .filter(function (element) { return !element.hidden && element.offsetParent !== null; });

      if (focusable.length) {
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    if (event.key === "Escape" && packagesModal?.classList.contains("show")) {
      closePackages();
      return;
    }

    if (event.key === "Escape" && overlay.classList.contains("show")) {
      closeSimulator();
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      cancelWorksTimer();
    }
  });
})();
