(function (window, document) {
  "use strict";

  var config = window.LukasTrackingConfig;
  var core = window.LukasTrackingCore;
  var emailClient = window.LukasEmailClient;
  var visitTimer = null;
  var visitStorageKey = "lukas-portfolio-visit-alert-v1";

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

    visitTimer = null;
    if (document.visibilityState === "hidden") return;

    core.trackEvent(window, "engaged_visit", {
      page_path: window.location.pathname,
      engagement_seconds: Math.round(config.notifications.visitDelayMs / 1000)
    });

    if (!notificationsAreAllowed() || !emailClient ||
        !core.isOutsideCooldown(window.localStorage, visitStorageKey, cooldownMs, now)) {
      return;
    }

    core.markNotification(window.localStorage, visitStorageKey, now);
    emailClient.sendEventNotification(
      "engaged_visit",
      core.buildEventContext(window, document)
    ).catch(function () {
      core.clearNotificationMark(window.localStorage, visitStorageKey);
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

  document.addEventListener("visibilitychange", handleVisibilityChange);
  scheduleVisitNotification();

  window.LukasVisitorTracking = {
    notificationsAreAllowed: notificationsAreAllowed,
    scheduleVisitNotification: scheduleVisitNotification
  };
}(window, document));
