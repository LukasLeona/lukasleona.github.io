(function () {
  const root = document.documentElement;
  const button = document.querySelector(".article-theme-toggle");
  const key = "lukas-theme-preference-v2";
  const saved = localStorage.getItem(key);
  root.dataset.theme = saved === "light" ? "light" : "dark";

  function updateButton() {
    if (!button) return;
    const light = root.dataset.theme === "light";
    button.setAttribute("aria-label", light ? "Use dark theme" : "Use light theme");
    button.setAttribute("title", light ? "Use dark theme" : "Use light theme");
    button.textContent = light ? "☾" : "☀";
  }

  updateButton();
  button?.addEventListener("click", function () {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem(key, root.dataset.theme);
    updateButton();
  });
})();
