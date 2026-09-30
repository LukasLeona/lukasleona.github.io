(function (window) {
  "use strict";

  window.LukasTrackingConfig = Object.freeze({
    analytics: Object.freeze({
      measurementId: "",
      enabled: true
    }),
    email: Object.freeze({
      publicKey: "96_UPP64ognZ8mIif",
      serviceId: "service_2ter3tn",
      templateId: "template_52y6bwx",
      recipient: "luke@lukasleona.com"
    }),
    notifications: Object.freeze({
      enabled: true,
      allowedHosts: Object.freeze([
        "lukasleona.com",
        "www.lukasleona.com"
      ]),
      visitDelayMs: 10000,
      visitCooldownHours: 24,
      clickCooldownMinutes: 30
    })
  });
}(window));
