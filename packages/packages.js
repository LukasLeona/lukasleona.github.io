(function () {
  "use strict";

  var form = document.getElementById("packageInquiryForm");
  var packageSelect = document.getElementById("packageSelect");
  var comments = document.getElementById("packageComments");
  var submit = document.getElementById("packageSubmit");
  var status = document.getElementById("packageStatus");
  var carousel = document.getElementById("workCarousel");

  if (carousel) {
    var cards = Array.prototype.slice.call(carousel.querySelectorAll(".work-card"));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll(".work-carousel-dots button"));
    var previous = carousel.querySelector("[data-carousel-previous]");
    var next = carousel.querySelector("[data-carousel-next]");
    var current = document.getElementById("workCarouselCurrent");
    var carouselStatus = document.getElementById("workCarouselStatus");
    var activeIndex = 0;
    var swipeStartX = null;
    var positionClasses = ["is-active", "is-prev", "is-next", "is-far-prev", "is-far-next"];

    function showProject(index) {
      activeIndex = (index + cards.length) % cards.length;

      cards.forEach(function (card, cardIndex) {
        var distance = (cardIndex - activeIndex + cards.length) % cards.length;
        if (distance > cards.length / 2) distance -= cards.length;

        card.classList.remove.apply(card.classList, positionClasses);
        if (distance === 0) card.classList.add("is-active");
        if (distance === -1) card.classList.add("is-prev");
        if (distance === 1) card.classList.add("is-next");
        if (distance <= -2) card.classList.add("is-far-prev");
        if (distance >= 2) card.classList.add("is-far-next");

        card.setAttribute("aria-hidden", distance === 0 ? "false" : "true");
        card.querySelector("a").setAttribute("tabindex", distance === 0 ? "0" : "-1");
      });

      dots.forEach(function (dot, dotIndex) {
        if (dotIndex === activeIndex) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });

      current.textContent = String(activeIndex + 1).padStart(2, "0");
      carouselStatus.textContent = "Showing project " + (activeIndex + 1) + " of " + cards.length + ": " + cards[activeIndex].getAttribute("aria-label").replace(/^\d+ of \d+: /, "");
    }

    previous.addEventListener("click", function () { showProject(activeIndex - 1); });
    next.addEventListener("click", function () { showProject(activeIndex + 1); });
    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () { showProject(dotIndex); });
    });

    carousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); showProject(activeIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showProject(activeIndex + 1); }
    });

    carousel.querySelector(".work-carousel-stage").addEventListener("pointerdown", function (event) {
      swipeStartX = event.clientX;
    });
    carousel.querySelector(".work-carousel-stage").addEventListener("pointerup", function (event) {
      if (swipeStartX === null) return;
      var distance = event.clientX - swipeStartX;
      swipeStartX = null;
      if (Math.abs(distance) < 45) return;
      showProject(activeIndex + (distance < 0 ? 1 : -1));
    });
    carousel.querySelector(".work-carousel-stage").addEventListener("pointercancel", function () {
      swipeStartX = null;
    });

    showProject(0);
  }

  document.querySelectorAll("[data-package]").forEach(function (button) {
    button.addEventListener("click", function () {
      packageSelect.value = button.getAttribute("data-package") || "";
      document.getElementById("inquiry").scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () { packageSelect.focus(); }, 450);
    });
  });

  if (window.emailjs) {
    window.emailjs.init("96_UPP64ognZ8mIif");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(form);
    comments.value = [
      "Packages page inquiry: " + formData.get("package"),
      "Business or brand: " + (formData.get("business_name") || "Not provided"),
      "Phone number: " + (formData.get("subject") || "Not provided"),
      "",
      "Project details:",
      formData.get("project_details")
    ].join("\n");

    if (!window.emailjs) {
      status.textContent = "The inquiry service is unavailable. Please email luke@lukasleona.com.";
      status.className = "error";
      return;
    }

    submit.disabled = true;
    submit.innerHTML = 'Sending inquiry <i class="bi bi-arrow-repeat" aria-hidden="true"></i>';
    status.textContent = "Sending your package and project details to Luke.";
    status.className = "";

    window.emailjs.sendForm("service_2ter3tn", "template_52y6bwx", form)
      .then(function () {
        form.reset();
        status.textContent = "Thanks—Luke received your package inquiry.";
        status.className = "success";
        submit.disabled = false;
        submit.innerHTML = 'Send package inquiry <i class="bi bi-send" aria-hidden="true"></i>';
      }, function () {
        status.textContent = "Could not send the inquiry. Please try again or email luke@lukasleona.com.";
        status.className = "error";
        submit.disabled = false;
        submit.innerHTML = 'Send package inquiry <i class="bi bi-send" aria-hidden="true"></i>';
      });
  });
})();
