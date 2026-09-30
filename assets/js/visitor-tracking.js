(function (window, document) {
  "use strict";

  var config = window.LukasTrackingConfig;
  var core = window.LukasTrackingCore;
  var emailClient = window.LukasEmailClient;
  var visitTimer = null;
  var visitStorageKey = "lukas-portfolio-visit-alert-v1";
  var sessionAlertCountKey = "lukas-interaction-alert-count-v1";
  var clicksBound = false;

  if (!config || !core) return;

  core.loadAnalytics(window, document, config.analytics);

  function notificationsAreAllowed() {
    return config.notifications.enabled !== false &&
      core.isAllowedHost(window.location.hostname, config.notifications.allowedHosts) &&
      !core.isLikelyAutomated(window.navigator) &&
      !core.prefersNoTracking(window.navigator);
  }

  function sendVisitNotification() {
    var cooldownMs = config.notifications.visitCooldownHours * 60 * 60 * 1000;
    var now = Date.now();
    var storage = core.getBrowserStorage(window, "localStorage");

    visitTimer = null;
    if (document.visibilityState === "hidden") return;

    core.trackEvent(window, "engaged_visit", {
      page_path: window.location.pathname,
      engagement_seconds: Math.round(config.notifications.visitDelayMs / 1000)
    });

    if (!notificationsAreAllowed() || !emailClient || !storage ||
        !core.isOutsideCooldown(storage, visitStorageKey, cooldownMs, now)) {
      return;
    }

    if (!core.markNotification(storage, visitStorageKey, now)) return;

    emailClient.sendEventNotification(
      "engaged_visit",
      core.buildEventContext(window, document)
    ).catch(function () {
      core.clearNotificationMark(storage, visitStorageKey);
    });
  }

  function scheduleVisitNotification() {
    if (visitTimer || document.visibilityState === "hidden") return;
    visitTimer = window.setTimeout(sendVisitNotification, config.notifications.visitDelayMs);
  }

  function handleVisibilityChange() {
    if (document.visibilityState === "hidden" && visitTimer) {
      window.clearTimeout(visitTimer);
      visitTimer = null;
      return;
    }

    scheduleVisitNotification();
  }

  function handleTrackedClick(event) {
    if (!config.interactions || config.interactions.enabled === false || event.isTrusted === false) {
      return;
    }

    var eventTarget = event.target && event.target.closest
      ? event.target
      : event.target && event.target.parentElement;
    var target = eventTarget && eventTarget.closest(config.interactions.selector);

    if (!target || target.disabled || target.getAttribute("aria-disabled") === "true" ||
        target.hasAttribute("data-tracking-ignore")) {
      return;
    }

    var details = core.buildInteractionDetails(target, window.location);
    var eventName = target.dataset.trackingEvent || "button_click";

    core.trackEvent(window, eventName, {
      control_label: details.controlLabel,
      control_type: details.controlType,
      control_placement: details.placement,
      destination: details.destination
    });

    if (config.interactions.notifyByEmail === false || !notificationsAreAllowed() || !emailClient) {
      return;
    }

    var interactionId = [
      eventName,
      details.controlLabel,
      details.placement,
      details.destination
    ].join("|");
    var clickStorageKey = "lukas-alert-" + core.hashIdentifier(interactionId) + "-v2";
    var clickCooldownMs = config.notifications.clickCooldownMinutes * 60 * 1000;
    var now = Date.now();
    var sessionStorage = core.getBrowserStorage(window, "sessionStorage");
    var localStorage = core.getBrowserStorage(window, "localStorage");
    var alertCount = 0;

    try {
      alertCount = Number(sessionStorage && sessionStorage.getItem(sessionAlertCountKey)) || 0;
    } catch (error) {
      return;
    }

    if (!sessionStorage || !localStorage ||
        alertCount >= config.interactions.maxEmailAlertsPerSession ||
        !core.isOutsideCooldown(sessionStorage, clickStorageKey, clickCooldownMs, now)) {
      return;
    }

    if (!core.markNotification(sessionStorage, clickStorageKey, now) ||
        !core.markNotification(localStorage, visitStorageKey, now)) {
      core.clearNotificationMark(sessionStorage, clickStorageKey);
      return;
    }

    sessionStorage.setItem(sessionAlertCountKey, String(alertCount + 1));

    emailClient.sendEventNotification(
      eventName,
      core.buildEventContext(window, document),
      details
    ).catch(function () {
      core.clearNotificationMark(sessionStorage, clickStorageKey);
      core.clearNotificationMark(localStorage, visitStorageKey);
      sessionStorage.setItem(sessionAlertCountKey, String(Math.max(0, alertCount)));
    });
  }

  function bindTrackedClicks() {
    if (clicksBound) return;
    document.addEventListener("click", handleTrackedClick, true);
    clicksBound = true;
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);
  bindTrackedClicks();
  scheduleVisitNotification();

  window.LukasVisitorTracking = {
    notificationsAreAllowed: notificationsAreAllowed,
    scheduleVisitNotification: scheduleVisitNotification,
    bindTrackedClicks: bindTrackedClicks
  };
}(window, document));
