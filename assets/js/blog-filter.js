(function () {
  const toolbar = document.querySelector(".blog-topic-filter");
  const topics = ["systems", "systems", "web", "data", "web", "data", "seo", "career"];
  const cards = Array.from(document.querySelectorAll(".blog-photo-card"));
  const status = document.getElementById("blogFilterStatus");
  if (!toolbar || !cards.length) return;

  cards.forEach(function (card, index) { card.dataset.topic = topics[index] || "all"; });

  toolbar.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-blog-filter]");
    if (!button) return;
    const filter = button.dataset.blogFilter;
    let visible = 0;

    toolbar.querySelectorAll("button[data-blog-filter]").forEach(function (item) {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    cards.forEach(function (card) {
      const show = filter === "all" || card.dataset.topic === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (status) status.textContent = `Showing ${visible} ${visible === 1 ? "article" : "articles"}`;
  });
})();
