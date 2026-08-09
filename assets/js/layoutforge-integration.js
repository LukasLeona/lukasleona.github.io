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
  document.querySelectorAll(".layoutforge-open-trigger").forEach(function (button) {
    button.addEventListener("click", openSimulator);
  });

  overlayClose?.addEventListener("click", closeSimulator);
  document.addEventListener("keydown", function (event) {
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
