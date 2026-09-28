(function () {
  "use strict";

  var form = document.getElementById("packageInquiryForm");
  var packageSelect = document.getElementById("packageSelect");
  var comments = document.getElementById("packageComments");
  var submit = document.getElementById("packageSubmit");
  var status = document.getElementById("packageStatus");

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
      status.textContent = "The inquiry service is unavailable. Please email lukemarkleona9@gmail.com.";
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
        status.textContent = "Could not send the inquiry. Please try again or email lukemarkleona9@gmail.com.";
        status.className = "error";
        submit.disabled = false;
        submit.innerHTML = 'Send package inquiry <i class="bi bi-send" aria-hidden="true"></i>';
      });
  });
})();
