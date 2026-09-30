(function (window) {
  "use strict";

  var initialized = false;

  function getEmailConfig() {
    return window.LukasTrackingConfig && window.LukasTrackingConfig.email;
  }

  function initialize() {
    var config = getEmailConfig();

    if (initialized) return true;
    if (!window.emailjs || !config || !config.publicKey) return false;

    window.emailjs.init({
      publicKey: config.publicKey,
      blockHeadless: true
    });
    initialized = true;
    return true;
  }

  function sendForm(formElement) {
    var config = getEmailConfig();

    if (!initialize() || !formElement) {
      return Promise.reject(new Error("Email service is unavailable."));
    }

    return window.emailjs.sendForm(config.serviceId, config.templateId, formElement);
  }

  function createNotificationMessage(label, context, details) {
    var lines = [
      label,
      "Time (Asia/Manila): " + context.timestamp,
      "Page: " + context.pageTitle + " (" + context.pagePath + ")",
      "Source: " + context.referrer,
      "Device: " + context.device,
      "Language: " + context.language
    ];

    if (details && details.placement) {
      lines.push("Button placement: " + details.placement);
    }

    lines.push("", "Privacy note: no IP address, exact location, or fingerprint was collected by the site.");
    return lines.join("\n");
  }

  function sendEventNotification(eventType, context, details) {
    var config = getEmailConfig();
    var isClick = eventType === "explore_work_click";
    var label = isClick
      ? "A visitor clicked Explore My Work"
      : "An engaged visitor opened your portfolio";
    var message = createNotificationMessage(label, context, details);

    if (!initialize()) {
      return Promise.reject(new Error("Email service is unavailable."));
    }

    return window.emailjs.send(config.serviceId, config.templateId, {
      name: "Lukas Website Tracker",
      email: config.recipient,
      reply_to: config.recipient,
      to_email: config.recipient,
      subject: isClick ? "Explore My Work click" : "Portfolio visit",
      title: label,
      comments: message,
      message: message,
      event_type: eventType,
      event_time: context.timestamp,
      page: context.pagePath,
      referrer: context.referrer,
      device: context.device
    });
  }

  window.LukasEmailClient = {
    initialize: initialize,
    sendForm: sendForm,
    sendEventNotification: sendEventNotification
  };
}(window));
