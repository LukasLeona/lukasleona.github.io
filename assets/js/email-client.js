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
      lines.push("Control: " + details.controlLabel);
      lines.push("Control type: " + details.controlType);
      lines.push("Placement: " + details.placement);
      lines.push("Destination: " + details.destination);
    }

    lines.push("", "Privacy note: no IP address, exact location, or fingerprint was collected by the site.");
    return lines.join("\n");
  }

  function sendEventNotification(eventType, context, details) {
    var config = getEmailConfig();
    var isInteraction = eventType !== "engaged_visit";
    var controlLabel = details && details.controlLabel || "a website control";
    var label = isInteraction
      ? "A visitor clicked: " + controlLabel
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
      subject: isInteraction ? "Website click: " + controlLabel.slice(0, 70) : "Portfolio visit",
      title: label,
      comments: message,
      message: message,
      event_type: eventType,
      event_time: context.timestamp,
      page: context.pagePath,
      referrer: context.referrer,
      device: context.device,
      control_label: isInteraction ? controlLabel : "",
      control_type: isInteraction ? details.controlType : "",
      control_placement: isInteraction ? details.placement : "",
      destination: isInteraction ? details.destination : ""
    });
  }

  window.LukasEmailClient = {
    initialize: initialize,
    sendForm: sendForm,
    sendEventNotification: sendEventNotification
  };

  initialize();
}(window));
