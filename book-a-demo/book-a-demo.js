(function (root, factory) {
  "use strict";

  var api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.LukasDemoBooking = api;
    if (root.document) api.init(root, root.document);
  }
}(typeof window !== "undefined" ? window : null, function () {
  "use strict";

  function parseDate(value) {
    var parts = String(value || "").split("-").map(Number);
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) return null;
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  }

  function isUnavailableWeekday(value) {
    var date = parseDate(value);
    if (!date) return false;
    var day = date.getUTCDay();
    return day === 3 || day === 4;
  }

  function isBookableDate(value, minimumDate) {
    return Boolean(parseDate(value)) &&
      (!minimumDate || value >= minimumDate) &&
      !isUnavailableWeekday(value);
  }

  function getManilaDateIso(date) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date || new Date());
    var values = {};

    parts.forEach(function (part) {
      if (part.type !== "literal") values[part.type] = part.value;
    });

    return values.year + "-" + values.month + "-" + values.day;
  }

  function formatDate(value) {
    var date = parseDate(value);
    if (!date) return value;

    return new Intl.DateTimeFormat("en-PH", {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  }

  function formatTime(value) {
    var parts = String(value || "").split(":").map(Number);
    if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) return value;

    var date = new Date(Date.UTC(2026, 0, 1, parts[0], parts[1]));
    return new Intl.DateTimeFormat("en-PH", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);
  }

  function buildComments(details) {
    return [
      "Demo booking request",
      "Topic: " + details.topic,
      "Preferred schedule: " + formatDate(details.date) + " at " + formatTime(details.time) + " (Philippine Time, UTC+8)",
      "Phone number: " + (details.phone || "Not provided"),
      "",
      "Message:",
      details.message || "No additional message."
    ].join("\n");
  }

  function init(windowObject, documentObject) {
    var form = documentObject.getElementById("demoForm");
    if (!form || form.dataset.bookingReady === "true") return;

    var dateInput = documentObject.getElementById("demoDate");
    var dateError = documentObject.getElementById("dateError");
    var subjectInput = documentObject.getElementById("demoSubject");
    var commentsInput = documentObject.getElementById("demoComments");
    var submitButton = documentObject.getElementById("demoSubmit");
    var status = documentObject.getElementById("demoStatus");
    var success = documentObject.getElementById("demoSuccess");
    var successSchedule = documentObject.getElementById("demoSuccessSchedule");
    var anotherButton = documentObject.getElementById("bookAnotherDemo");
    var minimumDate = getManilaDateIso(new Date());

    form.dataset.bookingReady = "true";
    dateInput.min = minimumDate;

    function resetStatus() {
      status.textContent = "";
      status.className = "";
    }

    function rejectUnavailableDate() {
      resetStatus();
      dateError.textContent = "";
      dateInput.setCustomValidity("");

      if (!dateInput.value) return;

      if (dateInput.value < minimumDate) {
        dateError.textContent = "Choose today or a future date.";
        dateInput.value = "";
        return;
      }

      if (isUnavailableWeekday(dateInput.value)) {
        dateError.textContent = "Wednesday and Thursday cannot be selected.";
        dateInput.value = "";
      }
    }

    dateInput.addEventListener("change", rejectUnavailableDate);
    dateInput.addEventListener("input", rejectUnavailableDate);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      resetStatus();

      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Complete the required fields.";
        status.className = "error";
        return;
      }

      if (!isBookableDate(dateInput.value, minimumDate)) {
        dateError.textContent = "Choose an available date from Friday through Tuesday.";
        dateInput.focus();
        return;
      }

      var formData = new FormData(form);
      var details = {
        topic: formData.get("demo_topic"),
        date: formData.get("demo_date"),
        time: formData.get("demo_time"),
        phone: formData.get("phone"),
        message: formData.get("demo_message")
      };
      var formattedSchedule = formatDate(details.date) + " at " + formatTime(details.time) + " Philippine Time";

      subjectInput.value = "Demo request - " + formattedSchedule;
      commentsInput.value = buildComments(details);

      if (!windowObject.LukasEmailClient) {
        status.textContent = "Booking is temporarily unavailable. Please email luke@lukasleona.com.";
        status.className = "error";
        return;
      }

      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending request <i class="bi bi-arrow-repeat" aria-hidden="true"></i>';
      status.textContent = "Sending your preferred schedule.";

      windowObject.LukasEmailClient.sendForm(form).then(function () {
        successSchedule.textContent = formattedSchedule;
        form.hidden = true;
        success.hidden = false;
        form.reset();
        dateInput.min = minimumDate;
        submitButton.disabled = false;
        submitButton.innerHTML = 'Request demo <i class="bi bi-arrow-right" aria-hidden="true"></i>';
        resetStatus();
      }, function () {
        status.textContent = "Could not send your request. Please try again or email luke@lukasleona.com.";
        status.className = "error";
        submitButton.disabled = false;
        submitButton.innerHTML = 'Request demo <i class="bi bi-arrow-right" aria-hidden="true"></i>';
      });
    });

    anotherButton.addEventListener("click", function () {
      success.hidden = true;
      form.hidden = false;
      form.querySelector("input[name='name']").focus();
    });
  }

  return {
    parseDate: parseDate,
    isUnavailableWeekday: isUnavailableWeekday,
    isBookableDate: isBookableDate,
    getManilaDateIso: getManilaDateIso,
    formatDate: formatDate,
    formatTime: formatTime,
    buildComments: buildComments,
    init: init
  };
}));
