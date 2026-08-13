(function () {
  "use strict";

  var iconMap = {
    "html": ["logos:html-5", true],
    "css": ["logos:css-3", true],
    "javascript": ["logos:javascript", true],
    "python": ["logos:python", true],
    "react": ["logos:react", true],
    "wordpress": ["logos:wordpress-icon", true],
    "chart.js": ["simple-icons:chartdotjs", false],
    "tutor lms": ["mdi:school-outline", false],
    "seo": ["mdi:magnify-scan", false],
    "automation": ["mdi:robot-outline", false],
    "responsive": ["mdi:responsive", false],
    "responsive ui": ["mdi:responsive", false],
    "motion": ["mdi:motion-play-outline", false],
    "ui/ux": ["mdi:palette-swatch-outline", false],
    "live data": ["mdi:chart-line", false],
    "data visualization": ["mdi:chart-dots-variant", false],
    "public data": ["mdi:database-outline", false],
    "analytics": ["mdi:chart-box-outline", false],
    "visualization": ["mdi:chart-histogram", false],
    "k-means": ["mdi:graph-outline", false],
    "apriori": ["mdi:file-tree-outline", false],
    "arima": ["mdi:chart-timeline-variant-shimmer", false],
    "front end": ["mdi:code-tags", false],
    "ai video": ["mdi:movie-edit-outline", false],
    "graphic design": ["mdi:palette-outline", false],
    "campaigns": ["mdi:bullhorn-outline", false],
    "campaign": ["mdi:bullhorn-outline", false],
    "content": ["mdi:text-box-edit-outline", false],
    "storytelling": ["mdi:book-open-page-variant-outline", false],
    "interactive": ["mdi:gesture-tap", false],
    "digital": ["mdi:devices", false],
    "travel ux": ["mdi:map-outline", false],
    "real estate ux": ["mdi:office-building-outline", false],
    "tourism": ["mdi:map-marker-outline", false],
    "discovery": ["mdi:compass-outline", false],
    "newsletter": ["mdi:email-outline", false],
    "builder": ["mdi:tools", false],
    "lms": ["mdi:school-outline", false],
    "first responders": ["mdi:ambulance", false],
    "training": ["mdi:certificate-outline", false],
    "platform": ["mdi:view-dashboard-outline", false],
    "workflow": ["mdi:file-tree-outline", false]
  };

  function enhanceTechnologyBadges() {
    document.querySelectorAll("#portfolio .portfolio-project-tags").forEach(function (group) {
      group.setAttribute("role", "list");

      group.querySelectorAll(":scope > span").forEach(function (badge) {
        if (badge.querySelector("iconify-icon")) return;

        var label = badge.textContent.trim();
        var config = iconMap[label.toLowerCase()] || ["ph:sparkle", false];
        var icon = document.createElement("iconify-icon");
        icon.setAttribute("icon", config[0]);
        icon.setAttribute("aria-hidden", "true");

        badge.setAttribute("role", "listitem");
        badge.dataset.brand = config[1] ? "true" : "false";
        badge.insertBefore(icon, badge.firstChild);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceTechnologyBadges, { once: true });
  } else {
    enhanceTechnologyBadges();
  }
}());
