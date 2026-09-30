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

  function cleanText(value, maximumLength) {
    return String(value || "")
      .replace(/[\u0000-\u001f\u007f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maximumLength || 160);
  }

  function classifyDevice(windowObject) {
    var width = Number(windowObject.innerWidth) || 0;
    var navigatorObject = windowObject.navigator || {};
    var touchPoints = Number(navigatorObject.maxTouchPoints) || 0;

    if (width > 0 && width < 768) return "Mobile";
    if (width > 0 && width < 1100 && touchPoints > 0) return "Tablet";
    return "Desktop";
  }

  function getReferrerSource(documentObject) {
    if (!documentObject.referrer) return "Direct / unavailable";

    try {
      return cleanText(new URL(documentObject.referrer).hostname, 120) || "Direct / unavailable";
    } catch (error) {
      return "Unavailable";
    }
  }

  function formatManilaTime(date) {
    try {
      return new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        dateStyle: "medium",
        timeStyle: "medium"
      }).format(date || new Date());
    } catch (error) {
      return (date || new Date()).toISOString();
    }
  }

  function buildEventContext(windowObject, documentObject, date) {
    var locationObject = windowObject.location || {};
    var navigatorObject = windowObject.navigator || {};

    return {
      timestamp: formatManilaTime(date),
      pageTitle: cleanText(documentObject.title, 140) || "Luke's portfolio",
      pagePath: cleanText(locationObject.pathname || "/", 180),
      referrer: getReferrerSource(documentObject),
      device: classifyDevice(windowObject),
      language: cleanText(navigatorObject.language || "Unavailable", 40)
    };
  }

  return {
    isValidMeasurementId: isValidMeasurementId,
    prefersNoTracking: prefersNoTracking,
    loadAnalytics: loadAnalytics,
    trackEvent: trackEvent,
    cleanText: cleanText,
    classifyDevice: classifyDevice,
    getReferrerSource: getReferrerSource,
    formatManilaTime: formatManilaTime,
    buildEventContext: buildEventContext
  };
}));
