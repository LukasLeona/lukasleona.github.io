(function (root, factory) {
  "use strict";

  var api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.LukasTrackingCore = api;
  }
}(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function isValidMeasurementId(value) {
    return typeof value === "string" && /^G-[A-Z0-9]{6,}$/i.test(value.trim());
  }

  function prefersNoTracking(navigatorObject) {
    if (!navigatorObject) return false;
    return navigatorObject.doNotTrack === "1" ||
      navigatorObject.globalPrivacyControl === true;
  }

  function loadAnalytics(windowObject, documentObject, analyticsConfig) {
    var measurementId = analyticsConfig && analyticsConfig.measurementId;

    if (!analyticsConfig || analyticsConfig.enabled === false ||
        !isValidMeasurementId(measurementId) ||
        prefersNoTracking(windowObject.navigator)) {
      return false;
    }

    measurementId = measurementId.trim();
    windowObject.dataLayer = windowObject.dataLayer || [];
    windowObject.gtag = windowObject.gtag || function () {
      windowObject.dataLayer.push(arguments);
    };

    windowObject.gtag("js", new Date());
    windowObject.gtag("config", measurementId, {
      anonymize_ip: true,
      send_page_view: true
    });

    if (!documentObject.querySelector('script[data-lukas-analytics="true"]')) {
      var script = documentObject.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
      script.dataset.lukasAnalytics = "true";
      documentObject.head.appendChild(script);
    }

    return true;
  }

  function trackEvent(windowObject, eventName, parameters) {
    if (!windowObject || typeof windowObject.gtag !== "function" || !eventName) {
      return false;
    }

    windowObject.gtag("event", eventName, parameters || {});
    return true;
  }

  return {
    isValidMeasurementId: isValidMeasurementId,
    prefersNoTracking: prefersNoTracking,
    loadAnalytics: loadAnalytics,
    trackEvent: trackEvent
  };
}));
