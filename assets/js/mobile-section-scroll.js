(function (root, factory) {
  "use strict";

  var api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  if (!root || !root.document) {
    return;
  }

  root.LukasMobileSectionScroll = api;

  function start() {
    api.init(root, root.document);
  }

  if (root.document.readyState === "loading") {
    root.document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
}(typeof window !== "undefined" ? window : null, function () {
  "use strict";

  var initialized = false;

  function scrollLimit(element) {
    return Math.max(0, element.scrollHeight - element.clientHeight);
  }

  function isAtBoundary(element, direction, tolerance) {
    var edgeTolerance = typeof tolerance === "number" ? tolerance : 3;

    if (!element) {
      return false;
    }

    if (direction > 0) {
      return element.scrollTop >= scrollLimit(element) - edgeTolerance;
    }

    return element.scrollTop <= edgeTolerance;
  }

  function adjacentIndex(sectionIds, currentId, direction) {
    var currentIndex = sectionIds.indexOf(currentId);
    var nextIndex = currentIndex + (direction > 0 ? 1 : -1);

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= sectionIds.length) {
      return -1;
    }

    return nextIndex;
  }

  function isInteractiveTarget(target) {
    return Boolean(
      target &&
      typeof target.closest === "function" &&
      target.closest("input, textarea, select, button, a, [contenteditable='true'], [role='dialog']")
    );
  }

  function hasScrollableParent(win, target, section, direction) {
    var node = target && target.parentElement;

    while (node && node !== section) {
      var style = win.getComputedStyle(node);
      var scrollable = /(auto|scroll)/.test(style.overflowY) && scrollLimit(node) > 3;

      if (scrollable && !isAtBoundary(node, direction)) {
        return true;
      }

      node = node.parentElement;
    }

    return false;
  }

  function init(win, doc) {
    if (initialized || !win || !doc || !win.matchMedia("(max-width: 991px)").matches) {
      return null;
    }

    var sections = Array.prototype.slice.call(doc.querySelectorAll("#main > section"));
    var sectionIds = sections.map(function (section) { return section.id; }).filter(Boolean);
    var locked = false;
    var unlockTimer = 0;
    var touchState = null;

    if (sectionIds.length < 2) {
      return null;
    }

    initialized = true;
    doc.documentElement.setAttribute("data-mobile-boundary-navigation", "ready");

    function activeSection() {
      return doc.querySelector("#main > section.active");
    }

    function destinationFor(section, direction) {
      var index = adjacentIndex(sectionIds, section && section.id, direction);
      return index < 0 ? null : doc.getElementById(sectionIds[index]);
    }

    function navigate(direction) {
      var current = activeSection();
      var destination = destinationFor(current, direction);

      if (locked || !current || !destination) {
        return false;
      }

      var link = doc.querySelector(".menu a[href='#" + destination.id + "']");

      if (!link) {
        return false;
      }

      locked = true;
      destination.scrollTop = direction > 0 ? 0 : scrollLimit(destination);
      link.click();

      win.requestAnimationFrame(function () {
        destination.scrollTop = direction > 0 ? 0 : scrollLimit(destination);
      });

      win.clearTimeout(unlockTimer);
      unlockTimer = win.setTimeout(function () {
        locked = false;
      }, 850);

      return true;
    }

    function canNavigate(event, section, direction) {
      return (
        section &&
        !doc.body.classList.contains("mobile-menu-open") &&
        !isInteractiveTarget(event.target) &&
        !hasScrollableParent(win, event.target, section, direction) &&
        isAtBoundary(section, direction) &&
        Boolean(destinationFor(section, direction))
      );
    }

    function onWheel(event) {
      if (locked || Math.abs(event.deltaY) < 18) {
        return;
      }

      var section = activeSection();
      var direction = event.deltaY > 0 ? 1 : -1;

      if (canNavigate(event, section, direction)) {
        event.preventDefault();
        navigate(direction);
      }
    }

    function onTouchStart(event) {
      if (locked || event.touches.length !== 1 || isInteractiveTarget(event.target)) {
        touchState = null;
        return;
      }

      touchState = {
        section: activeSection(),
        target: event.target,
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    }

    function onTouchMove(event) {
      if (!touchState || locked || event.touches.length !== 1) {
        return;
      }

      var deltaX = touchState.x - event.touches[0].clientX;
      var deltaY = touchState.y - event.touches[0].clientY;

      if (Math.abs(deltaY) < 56 || Math.abs(deltaY) <= Math.abs(deltaX) * 1.25) {
        return;
      }

      var direction = deltaY > 0 ? 1 : -1;
      var gestureEvent = { target: touchState.target };

      if (touchState.section === activeSection() && canNavigate(gestureEvent, touchState.section, direction)) {
        event.preventDefault();
        navigate(direction);
        touchState = null;
      }
    }

    function clearTouch() {
      touchState = null;
    }

    sections.forEach(function (section) {
      section.addEventListener("wheel", onWheel, { passive: false });
      section.addEventListener("touchstart", onTouchStart, { passive: true });
      section.addEventListener("touchmove", onTouchMove, { passive: false });
      section.addEventListener("touchend", clearTouch, { passive: true });
      section.addEventListener("touchcancel", clearTouch, { passive: true });
    });

    return {
      navigate: navigate,
      destroy: function () {
        sections.forEach(function (section) {
          section.removeEventListener("wheel", onWheel);
          section.removeEventListener("touchstart", onTouchStart);
          section.removeEventListener("touchmove", onTouchMove);
          section.removeEventListener("touchend", clearTouch);
          section.removeEventListener("touchcancel", clearTouch);
        });
        win.clearTimeout(unlockTimer);
        initialized = false;
        doc.documentElement.removeAttribute("data-mobile-boundary-navigation");
      }
    };
  }

  return {
    adjacentIndex: adjacentIndex,
    init: init,
    isAtBoundary: isAtBoundary,
    scrollLimit: scrollLimit
  };
}));
