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
    clearReminder();
    hidePromo();

    if (!simulatorFrame.getAttribute("src")) {
      simulatorFrame.setAttribute("src", simulatorFrame.getAttribute("data-src"));
    }

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("layoutforge-simulator-open");
    window.setTimeout(function () { overlayClose?.focus(); }, 180);
  }

  function closeSimulator() {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("layoutforge-simulator-open");
  }

  function switchPackageCategory(category) {
    if (!packagesModal) return;

    packagesModal.querySelectorAll("[data-portfolio-package-tab]").forEach(function (button) {
      var active = button.getAttribute("data-portfolio-package-tab") === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });

    packagesModal.querySelectorAll("[data-portfolio-package-panel]").forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-portfolio-package-panel") !== category;
    });

    var dialog = packagesModal.querySelector(".portfolio-packages-dialog");
    if (dialog) dialog.scrollTop = 0;
  }

  function openPackages() {
    if (!packagesModal) return;
    packagesLastFocus = document.activeElement;
    switchPackageCategory("website");
    packagesModal.classList.add("show");
    packagesModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("portfolio-packages-open");
    window.setTimeout(function () { packagesClose?.focus(); }, 80);
  }

  function closePackages() {
    if (!packagesModal) return;
    packagesModal.classList.remove("show");
    packagesModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("portfolio-packages-open");
    if (packagesLastFocus instanceof HTMLElement) packagesLastFocus.focus();
  }

  function startPackageInquiry(packageName) {
    var comments = document.getElementById("comments");
    var inquiryMessage = "Hi Luke, I'm interested in the " + packageName + " package. Please help me confirm the best scope for my project.";

    if (comments) {
      var currentMessage = comments.value.trim();
      if (!currentMessage) {
        comments.value = inquiryMessage;
      } else if (currentMessage.indexOf(packageName) === -1) {
        comments.value = currentMessage + "\n\n" + inquiryMessage;
      }
    }

    closePackages();
    var contactLink = document.querySelector('.menu a[href="#contact"]');
    if (contactLink) {
      contactLink.click();
    } else {
      window.location.hash = "contact";
    }

    window.setTimeout(function () {
      var nameField = document.getElementById("name");
      if (nameField) nameField.focus();
    }, 650);
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
  sectionObserver.observe(portfolio, { attributes: true, attributeFilter: ["class"] });

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
  packagesTrigger?.addEventListener("click", openPackages);
  packagesClose?.addEventListener("click", closePackages);
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
