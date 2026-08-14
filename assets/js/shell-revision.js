(function () {
  "use strict";

  var root = document.documentElement;
  var storageKey = "lukas-theme-preference-v2";

  try {
    var savedTheme = window.localStorage.getItem(storageKey);
    root.setAttribute("data-theme", savedTheme === "light" ? "light" : "dark");
  } catch (error) {
    root.setAttribute("data-theme", "dark");
  }

  function directThemeMarkup() {
    return [
      '<button type="button" class="theme-mode-switch" id="themeModeSwitch"',
      ' role="switch" aria-checked="false"',
      ' aria-label="Dark mode active. Switch to light mode"',
      ' title="Switch light and dark mode">',
      '  <span class="theme-mode-track" aria-hidden="true">',
      '    <span class="theme-mode-stars"></span>',
      '    <span class="theme-mode-cloud"></span>',
      '    <span class="theme-mode-thumb">',
      '      <i class="bi bi-sun-fill theme-thumb-sun"></i>',
      '      <i class="bi bi-moon-stars-fill theme-thumb-moon"></i>',
      '    </span>',
      '  </span>',
      '</button>'
    ].join("");
  }

  function normalizeThemeSwitch() {
    var switcher = document.getElementById("color-switcher");
    if (!switcher) return;

    switcher.classList.add("direct-theme-switcher");

    if (!document.getElementById("themeModeSwitch")) {
      switcher.innerHTML = directThemeMarkup();
    }
  }

  function relocateThemeSwitch() {
    var switcher = document.getElementById("color-switcher");
    var mobileSlot = document.getElementById("mobileThemeSlot");
    if (!switcher || !mobileSlot) return;

    if (window.matchMedia("(max-width: 991px)").matches) {
      if (switcher.parentElement !== mobileSlot) mobileSlot.appendChild(switcher);
    } else if (switcher.parentElement === mobileSlot) {
      document.body.appendChild(switcher);
    }
  }

  function normalizeRightRail() {
    var rail = document.querySelector(".right-side");
    if (!rail || rail.querySelector(".sidebar-social-stack")) return;

    var children = Array.prototype.slice.call(rail.children);
    var date = children.find(function (node) { return node.id === "date"; });
    var topLine = children.find(function (node) { return node.classList.contains("sidebar-line-top"); });
    var socials = children.find(function (node) { return node.classList.contains("social-box"); });
    var bottomLine = children.find(function (node) { return node.classList.contains("sidebar-line-bottom"); });

    if (!date || !topLine || !socials || !bottomLine) return;

    var stack = document.createElement("div");
    stack.className = "sidebar-social-stack";
    stack.setAttribute("aria-label", "Social links");
    stack.appendChild(topLine);
    stack.appendChild(socials);
    stack.appendChild(bottomLine);
    date.insertAdjacentElement("afterend", stack);
  }

  function normalizeChatbot() {
    var chatbot = document.querySelector(".portfolio-chatbot");
    if (!chatbot) return;

    chatbot.classList.add("global-chatbot");

    if (chatbot.parentElement && chatbot.parentElement.classList.contains("right-side")) {
      document.body.appendChild(chatbot);
    }

    var teaser = chatbot.querySelector(".chatbot-teaser");
    if (teaser) {
      teaser.setAttribute("aria-atomic", "true");

      if (!teaser.querySelector(".chatbot-teaser-avatar")) {
        var avatar = document.createElement("span");
        avatar.className = "chatbot-teaser-avatar";
        avatar.setAttribute("aria-hidden", "true");
        avatar.textContent = "🤖";
        teaser.insertBefore(avatar, teaser.firstChild);
      }
    }
  }

  function normalizeMobileDrawer() {
    var drawer = document.querySelector(".left-side");
    if (!drawer) return;

    if (!drawer.id) drawer.id = "mobileMenuDrawer";

    if (!drawer.querySelector(".mobile-menu-drawer-header")) {
      var header = document.createElement("div");
      header.className = "mobile-menu-drawer-header d-lg-none";
      header.innerHTML = [
        '<div><span>PORTFOLIO MENU</span></div>',
        '<button type="button" class="mobile-menu-close" id="mobileMenuClose"',
        ' aria-label="Close mobile navigation">',
        '  <i class="bi bi-x-lg"></i>',
        '</button>'
      ].join("");
      drawer.insertBefore(header, drawer.firstChild);
    }

    if (document.body.classList.contains("blog-single-page")) {
      var blogLink = drawer.querySelector('.menu a[href$="#blog"]');
      if (blogLink) blogLink.classList.add("active");
    }
  }

  function prepareShell() {
    normalizeThemeSwitch();
    relocateThemeSwitch();
    normalizeRightRail();
    normalizeChatbot();
    normalizeMobileDrawer();
  }

  function createStarField() {
    var area = document.querySelector(".area");
    if (!area || area.querySelector(".star-field-canvas") || window.matchMedia("(max-width: 991px)").matches) return;

    var canvas = document.createElement("canvas");
    canvas.className = "star-field-canvas";
    canvas.setAttribute("aria-hidden", "true");
    area.appendChild(canvas);

    var context = canvas.getContext("2d");
    if (!context) return;

    var width = 0;
    var height = 0;
    var pixelRatio = 1;
    var stars = [];
    var masks = [];
    var maskTimer = 0;
    var frameId = 0;
    var lastTime = 0;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var pointer = { x: 0, y: 0, active: false, alpha: 0 };
    var followers = [];

    function randomBetween(min, max) {
      return min + Math.random() * (max - min);
    }

    function makeStar() {
      var gold = Math.random() < .17;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: randomBetween(-.035, .035),
        vy: randomBetween(-.07, -.018),
        size: randomBetween(.55, 1.65),
        alpha: randomBetween(.28, .9),
        pulse: randomBetween(0, Math.PI * 2),
        pulseSpeed: randomBetween(.0008, .0022),
        color: gold ? "235,176,32" : "226,234,255"
      };
    }

    function buildFollowers() {
      followers = [];
      for (var i = 0; i < 5; i += 1) {
        followers.push({
          x: pointer.x,
          y: pointer.y,
          offsetX: randomBetween(-22, 22),
          offsetY: randomBetween(-18, 18),
          size: randomBetween(1.1, 2.1),
          delay: .08 + i * .022,
          color: i % 2 ? "226,234,255" : "235,176,32"
        });
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      var desiredCount = Math.max(58, Math.min(135, Math.round((width * height) / 14500)));
      stars = [];
      for (var i = 0; i < desiredCount; i += 1) stars.push(makeStar());

      updateMasks();
      if (reduceMotion) draw(0);
    }

    function updateMasks() {
      var selectors = ["#main", ".left-side", ".right-side"];
      masks = selectors.map(function (selector) {
        var element = document.querySelector(selector);
        if (!element || window.getComputedStyle(element).display === "none") return null;
        var rect = element.getBoundingClientRect();
        return {
          left: rect.left - 8,
          right: rect.right + 8,
          top: rect.top - 8,
          bottom: rect.bottom + 8
        };
      }).filter(Boolean);
    }

    function scheduleMaskUpdate() {
      window.clearTimeout(maskTimer);
      maskTimer = window.setTimeout(updateMasks, 90);
    }

    function isMasked(x, y) {
      for (var i = 0; i < masks.length; i += 1) {
        var rect = masks[i];
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return true;
      }
      return false;
    }

    function updateStar(star, delta) {
      if (pointer.active) {
        var dx = pointer.x - star.x;
        var dy = pointer.y - star.y;
        var distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < 30000 && distanceSquared > 36) {
          var distance = Math.sqrt(distanceSquared);
          var pull = (1 - distance / 174) * .00048 * delta;
          star.vx += (dx / distance) * pull;
          star.vy += (dy / distance) * pull;
        }
      }

      star.vx *= Math.pow(.994, delta / 16.67);
      star.vy = Math.max(-.13, Math.min(.11, star.vy));
      star.x += star.vx * delta;
      star.y += star.vy * delta;
      star.pulse += star.pulseSpeed * delta;

      if (star.x < -8) star.x = width + 8;
      if (star.x > width + 8) star.x = -8;
      if (star.y < -8) {
        star.y = height + 8;
        star.x = Math.random() * width;
      }
      if (star.y > height + 8) star.y = -8;
    }

    function drawStar(star) {
      if (isMasked(star.x, star.y)) return;

      var pulse = .72 + Math.sin(star.pulse) * .28;
      var alpha = star.alpha * pulse;
      context.beginPath();
      context.fillStyle = "rgba(" + star.color + "," + alpha + ")";
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fill();

      if (star.size > 1.35) {
        context.strokeStyle = "rgba(" + star.color + "," + (alpha * .32) + ")";
        context.lineWidth = .55;
        context.beginPath();
        context.moveTo(star.x - star.size * 2.5, star.y);
        context.lineTo(star.x + star.size * 2.5, star.y);
        context.moveTo(star.x, star.y - star.size * 2.5);
        context.lineTo(star.x, star.y + star.size * 2.5);
        context.stroke();
      }
    }

    function updateFollowers(delta) {
      pointer.alpha += ((pointer.active ? 1 : 0) - pointer.alpha) * Math.min(1, delta * .01);
      if (pointer.alpha < .02) return;

      followers.forEach(function (follower, index) {
        var orbit = performance.now() * .0012 + index * 1.35;
        var targetX = pointer.x + follower.offsetX + Math.cos(orbit) * 5;
        var targetY = pointer.y + follower.offsetY + Math.sin(orbit) * 5;
        follower.x += (targetX - follower.x) * Math.min(.28, follower.delay * delta / 5);
        follower.y += (targetY - follower.y) * Math.min(.28, follower.delay * delta / 5);

        if (isMasked(follower.x, follower.y)) return;

        var glow = .48 + Math.sin(orbit * 2) * .24;
        context.fillStyle = "rgba(" + follower.color + "," + (pointer.alpha * glow) + ")";
        context.beginPath();
        context.arc(follower.x, follower.y, follower.size, 0, Math.PI * 2);
        context.fill();
      });
    }

    function draw(delta) {
      context.clearRect(0, 0, width, height);
      if (root.getAttribute("data-theme") === "light") return;

      stars.forEach(function (star) {
        if (!reduceMotion) updateStar(star, delta);
        drawStar(star);
      });

      if (!reduceMotion) updateFollowers(delta);
    }

    function animate(time) {
      var delta = lastTime ? Math.min(34, time - lastTime) : 16.67;
      lastTime = time;
      draw(delta);
      frameId = window.requestAnimationFrame(animate);
    }

    function onPointerMove(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = root.getAttribute("data-theme") !== "light" && !isMasked(pointer.x, pointer.y);
      if (!followers.length) buildFollowers();
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", scheduleMaskUpdate, { passive: true, capture: true });

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("mouseleave", onPointerLeave);
      frameId = window.requestAnimationFrame(animate);
    }

    var observer = new MutationObserver(function () {
      scheduleMaskUpdate();
      if (reduceMotion) draw(0);
    });

    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    document.addEventListener("visibilitychange", function () {
      if (reduceMotion) return;
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (!document.hidden && !frameId) {
        lastTime = 0;
        frameId = window.requestAnimationFrame(animate);
      }
    });
  }

  function createPortfolioLivePreviews() {
    var portfolio = document.getElementById("portfolio");
    if (!portfolio) return;

    var loadedMedia = [];
    var visibility = new WeakMap();
    var maxLoaded = window.matchMedia("(max-width: 991px)").matches ? 1 : 2;

    function disconnectPreviewMuteGuard(frame) {
      if (!frame || !frame._previewMuteObserver) return;
      frame._previewMuteObserver.disconnect();
      frame._previewMuteObserver = null;
    }

    function mutePreviewMedia(frame) {
      try {
        var previewDocument = frame.contentDocument;
        if (!previewDocument) return;

        function silence(media) {
          if (!(media instanceof frame.contentWindow.HTMLMediaElement)) return;
          media.defaultMuted = true;
          if (!media.muted) media.muted = true;
          if (media.volume !== 0) media.volume = 0;
          if (media.tagName === "AUDIO") media.pause();
        }

        previewDocument.querySelectorAll("audio, video").forEach(silence);
        previewDocument.addEventListener("play", function (event) {
          silence(event.target);
        }, true);
        previewDocument.addEventListener("volumechange", function (event) {
          silence(event.target);
        }, true);

        disconnectPreviewMuteGuard(frame);
        frame._previewMuteObserver = new MutationObserver(function (records) {
          records.forEach(function (record) {
            record.addedNodes.forEach(function (node) {
              if (node.nodeType !== 1) return;
              if (node.matches && node.matches("audio, video")) silence(node);
              if (node.querySelectorAll) node.querySelectorAll("audio, video").forEach(silence);
            });
          });
        });
        frame._previewMuteObserver.observe(previewDocument.documentElement, {
          childList: true,
          subtree: true
        });
      } catch (error) {
        /* Cross-origin previews remain protected by the iframe autoplay policy. */
      }
    }

    function removeFromLoaded(media) {
      loadedMedia = loadedMedia.filter(function (item) { return item !== media; });
    }

    function unloadPreview(media) {
      var frame = media.querySelector(".project-live-preview-frame");
      if (!frame || frame.dataset.previewActive !== "true") return;

      disconnectPreviewMuteGuard(frame);
      delete frame.dataset.previewActive;
      frame.src = "about:blank";
      media.classList.remove("is-live-preview-loading", "is-live-preview-ready");
      removeFromLoaded(media);
    }

    function trimLoaded(currentMedia) {
      while (loadedMedia.length > maxLoaded) {
        var candidate = loadedMedia.find(function (media) {
          return media !== currentMedia && visibility.get(media) !== true;
        });

        if (!candidate) break;
        unloadPreview(candidate);
      }
    }

    function activatePreview(media) {
      var frame = media.querySelector(".project-live-preview-frame");
      if (!frame || frame.dataset.previewActive === "true") return;

      frame.dataset.previewActive = "true";
      media.classList.add("is-live-preview-loading");
      media.classList.remove("is-live-preview-ready");
      frame.src = frame.dataset.previewSrc;
      loadedMedia.push(media);
      trimLoaded(media);
    }

    var previewMedia = [];

    portfolio.querySelectorAll(".portfolio-item.web .portfolio-v2-card").forEach(function (card) {
      var link = card.querySelector(".portfolio-card-icon-link");
      var media = card.querySelector(".portfolio-v2-media.project-art-web");
      var screen = media ? media.querySelector(".project-art-screen") : null;
      if (!link || !media || !screen || screen.querySelector(".project-live-preview")) return;

      var rawHref = link.getAttribute("href") || "";
      if (!rawHref || /^(?:https?:|mailto:|tel:|javascript:|#)/i.test(rawHref)) return;

      var previewUrl = rawHref.replace(/^\/+/, "");
      var title = card.querySelector("h3");
      var wrapper = document.createElement("div");
      var frame = document.createElement("iframe");
      var badge = document.createElement("span");

      wrapper.className = "project-live-preview";
      frame.className = "project-live-preview-frame";
      frame.dataset.previewSrc = previewUrl;
      frame.loading = "lazy";
      frame.tabIndex = -1;
      frame.setAttribute("aria-hidden", "true");
      frame.setAttribute("scrolling", "no");
      frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups");
      frame.setAttribute("allow", "autoplay 'none'");
      frame.title = "Live preview of " + (title ? title.textContent.trim() : "project website");

      badge.className = "project-live-preview-badge";
      badge.innerHTML = '<i aria-hidden="true"></i><span>LIVE PREVIEW</span>';

      frame.addEventListener("load", function () {
        if (frame.dataset.previewActive !== "true") return;
        mutePreviewMedia(frame);
        media.classList.remove("is-live-preview-loading");
        media.classList.add("is-live-preview-ready");
      });

      wrapper.appendChild(frame);
      wrapper.appendChild(badge);
      screen.appendChild(wrapper);
      media.classList.add("has-live-preview");
      previewMedia.push(media);
    });

    if (!previewMedia.length) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          visibility.set(entry.target, entry.isIntersecting);
          if (entry.isIntersecting) {
            activatePreview(entry.target);
          } else {
            unloadPreview(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: "48px 0px",
        threshold: .12
      });

      previewMedia.forEach(function (media) { observer.observe(media); });
    } else {
      previewMedia.forEach(function (media) {
        media.addEventListener("mouseenter", function () { activatePreview(media); }, { once: true });
        media.addEventListener("focusin", function () { activatePreview(media); }, { once: true });
        media.addEventListener("touchstart", function () { activatePreview(media); }, { once: true, passive: true });
      });
    }
  }

  function initialize() {
    prepareShell();
    createStarField();
    createPortfolioLivePreviews();
    window.addEventListener("resize", relocateThemeSwitch, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
}());
