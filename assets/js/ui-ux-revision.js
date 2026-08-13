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
    "seo": ["material-symbols:travel-explore", false],
    "automation": ["material-symbols:auto-mode", false],
    "responsive": ["material-symbols:responsive-layout", false],
    "responsive ui": ["material-symbols:responsive-layout", false],
    "motion": ["material-symbols:motion-photos-on-outline", false],
    "ui/ux": ["material-symbols:design-services-outline", false],
    "live data": ["material-symbols:monitoring-rounded", false],
    "data visualization": ["tabler:chart-dots-3", false],
    "public data": ["material-symbols:database-outline", false],
    "analytics": ["material-symbols:analytics-outline", false],
    "visualization": ["tabler:chart-histogram", false],
    "k-means": ["material-symbols:hub-outline", false],
    "apriori": ["material-symbols:account-tree-outline", false],
    "arima": ["material-symbols:query-stats", false],
    "front end": ["ph:code", false],
    "ai video": ["material-symbols:movie-edit-outline", false],
    "graphic design": ["material-symbols:palette-outline", false],
    "campaigns": ["material-symbols:campaign-outline", false],
    "campaign": ["material-symbols:campaign-outline", false],
    "content": ["material-symbols:edit-note-outline", false],
    "storytelling": ["material-symbols:auto-stories-outline", false],
    "interactive": ["material-symbols:touch-app-outline", false],
    "digital": ["material-symbols:devices-outline", false],
    "travel ux": ["material-symbols:map-outline", false],
    "real estate ux": ["material-symbols:domain-outline", false],
    "tourism": ["material-symbols:travel-outline", false],
    "discovery": ["material-symbols:explore-outline", false],
    "newsletter": ["material-symbols:mail-outline", false],
    "builder": ["material-symbols:construction-outline", false],
    "lms": ["material-symbols:school-outline", false],
    "first responders": ["material-symbols:emergency-outline", false],
    "training": ["material-symbols:workspace-premium-outline", false],
    "platform": ["material-symbols:dashboard-outline", false],
    "workflow": ["material-symbols:account-tree-outline", false]
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
