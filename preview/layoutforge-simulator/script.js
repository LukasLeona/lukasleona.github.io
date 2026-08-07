const palettes = [
  { name: "Electric Lime", colors: ["#F5F5F0", "#111111", "#DFFF00"] },
  { name: "Warm Clay", colors: ["#F4EDE4", "#171717", "#D48967"] },
  { name: "Forest", colors: ["#E8EFE9", "#102A2A", "#88A47C"] },
  { name: "Modern Orange", colors: ["#F7F5F2", "#171A21", "#FF6B35"] },
  { name: "Lavender", colors: ["#F5F0FA", "#241F31", "#A78BFA"] },
  { name: "Ocean", colors: ["#EEF6F8", "#11242D", "#5CC8D7"] },
  { name: "Sand", colors: ["#F7F0E3", "#2A2118", "#CDA86E"] },
  { name: "Rose", colors: ["#FFF3F5", "#2C1720", "#E29BAE"] },
  { name: "Cobalt", colors: ["#F1F4FF", "#111C44", "#5271FF"] },
  { name: "Mono", colors: ["#F2F2F2", "#141414", "#A6A6A6"] }
];

const heroes = [
  { id: 1, name: "Hero 01", desc: "Minimal editorial" },
  { id: 2, name: "Hero 02", desc: "Bold visual" },
  { id: 3, name: "Hero 03", desc: "Split screen" }
];

const body1s = [
  { id: 1, name: "About Split", desc: "Story + visual" },
  { id: 2, name: "Bento Grid", desc: "Modern capabilities" },
  { id: 3, name: "Services", desc: "Editorial list" }
];

const body2s = [
  { id: 1, name: "Projects Grid", desc: "Selected work" },
  { id: 2, name: "Testimonial", desc: "Client proof" },
  { id: 3, name: "Process", desc: "Three-step flow" }
];

const footers = [
  { id: 1, name: "Minimal", desc: "Bold dark footer" },
  { id: 2, name: "Multi-column", desc: "Structured links" },
  { id: 3, name: "Large CTA", desc: "Big conversion close" }
];

const state = {
  hero: 1,
  body1: 1,
  body2: 1,
  footer: 1,
  font: "Poppins",
  palette: 0,
  device: "desktop"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const heroOptions = $("#heroOptions");
const body1Options = $("#body1Options");
const body2Options = $("#body2Options");
const footerOptions = $("#footerOptions");
const paletteOptions = $("#paletteOptions");
const fontSelect = $("#fontSelect");
const fontSample = $("#fontSample");
const sitePreview = $("#sitePreview");
const resultPreview = $("#resultPreview");
const browserFrame = $("#browserFrame");
const generationOverlay = $("#generationOverlay");
const resultModal = $("#resultModal");
const generationRows = $$("#generationList > div");

function createMiniPreview(type, id) {
  if (type === "hero") {
    return `
      <div class="mini-hero h${id}">
        <div class="mini-nav"></div>
        <div class="mini-heading"></div>
        <div class="mini-copy"></div>
        ${id === 2 ? '<div class="mini-accent"></div>' : ''}
      </div>
    `;
  }

  if (type === "body") {
    if (id === 1) {
      return `<div class="mini-body b1"><span class="mini-block"></span><span class="mini-block"></span><span class="mini-block"></span></div>`;
    }
    if (id === 2) {
      return `<div class="mini-body b2"><span class="mini-block"></span><span class="mini-block"></span><span class="mini-block"></span><span class="mini-block"></span></div>`;
    }
    return `<div class="mini-body b3"><span class="mini-block"></span><span class="mini-block"></span><span class="mini-block"></span></div>`;
  }

  return `<div class="mini-footer f${id}"></div>`;
}

function renderOptionCards(items, target, key, type) {
  target.innerHTML = items.map(item => `
    <button class="option-card ${state[key] === item.id ? "active" : ""}" type="button" data-key="${key}" data-value="${item.id}">
      <div class="option-card-preview">${createMiniPreview(type, item.id)}</div>
      <div>
        <strong>${item.name}</strong>
        <small>${item.desc}</small>
      </div>
    </button>
  `).join("");
}

function renderPalettes() {
  paletteOptions.innerHTML = palettes.map((palette, index) => `
    <button class="palette-option ${state.palette === index ? "active" : ""}" type="button" data-palette="${index}" aria-label="${palette.name}">
      <span class="palette-swatch">
        <i style="background:${palette.colors[0]}"></i>
        <i style="background:${palette.colors[1]}"></i>
        <i style="background:${palette.colors[2]}"></i>
      </span>
      <small>${palette.name}</small>
    </button>
  `).join("");
}

function heroMarkup(id) {
  if (id === 1) {
    return `
      <section class="hero hero-1">
        <div class="hero-kicker">Independent creative studio</div>
        <h2>Ideas shaped into digital experiences.</h2>
        <p>We create expressive brands and high-performing websites for ambitious businesses ready to stand apart.</p>
        <div class="hero-actions">
          <button class="site-btn">View our work</button>
          <button class="site-btn accent">Start a project</button>
        </div>
        <div class="hero-art"></div>
      </section>
    `;
  }

  if (id === 2) {
    return `
      <section class="hero hero-2">
        <div class="hero-copy">
          <div class="hero-kicker">Brand · Digital · Strategy</div>
          <h2>Built for brands that refuse to blend in.</h2>
          <p>North & Co. turns ideas into memorable identities, immersive websites, and clear digital experiences.</p>
          <div class="hero-actions">
            <button class="site-btn accent">Explore the studio</button>
          </div>
        </div>
        <div class="visual-panel"></div>
      </section>
    `;
  }

  return `
    <section class="hero hero-3">
      <div class="split-copy">
        <div class="hero-kicker">North & Co. / Manila</div>
        <h2>Design with clarity. Build with intent.</h2>
        <p>A focused creative practice developing websites and identities that feel contemporary, useful, and distinctly yours.</p>
        <div class="hero-actions">
          <button class="site-btn">Selected work</button>
        </div>
      </div>
      <div class="split-visual">
        <div class="shape-one"></div>
        <div class="shape-two"></div>
        <div class="shape-three">N/C</div>
      </div>
    </section>
  `;
}

function body1Markup(id) {
  if (id === 1) {
    return `
      <section class="content-section about-split">
        <div class="about-visual"></div>
        <div>
          <span class="section-label">About the studio</span>
          <h3 class="section-title">We turn complicated ideas into simple, memorable experiences.</h3>
          <p class="section-copy">Strategy, design, and development work together here. We build systems that look sharp, feel intuitive, and support real business goals.</p>
          <div class="stats-grid">
            <div class="stat"><strong>28</strong><span>projects launched</span></div>
            <div class="stat"><strong>11</strong><span>industries served</span></div>
            <div class="stat"><strong>92%</strong><span>client referrals</span></div>
          </div>
        </div>
      </section>
    `;
  }

  if (id === 2) {
    return `
      <section class="content-section">
        <span class="section-label">Capabilities</span>
        <h3 class="section-title">Everything needed to build a stronger digital presence.</h3>
        <div class="bento-grid">
          <article class="bento-card large">
            <strong>Web Design & Development</strong>
            <p>Responsive, conversion-aware websites with thoughtful interactions and clean systems behind them.</p>
          </article>
          <article class="bento-card accent-card">
            <strong>Brand Systems</strong>
            <p>Identity direction with enough structure to stay consistent.</p>
          </article>
          <article class="bento-card">
            <strong>Strategy</strong>
            <p>Clear positioning before pixels.</p>
          </article>
          <article class="bento-card">
            <strong>Motion</strong>
            <p>Subtle interactions that make digital products feel alive.</p>
          </article>
          <article class="bento-card">
            <strong>Launch Support</strong>
            <p>Hands-on refinement after publishing.</p>
          </article>
        </div>
      </section>
    `;
  }

  return `
    <section class="content-section">
      <span class="section-label">What we do</span>
      <h3 class="section-title">A small studio with a complete digital toolkit.</h3>
      <div class="services-list">
        <div class="service-row"><span>01</span><strong>Brand Direction</strong><span>↗</span></div>
        <div class="service-row"><span>02</span><strong>Website Design</strong><span>↗</span></div>
        <div class="service-row"><span>03</span><strong>Frontend Development</strong><span>↗</span></div>
        <div class="service-row"><span>04</span><strong>Digital Systems</strong><span>↗</span></div>
      </div>
    </section>
  `;
}

function body2Markup(id) {
  if (id === 1) {
    return `
      <section class="content-section">
        <span class="section-label">Selected work</span>
        <h3 class="section-title">A few projects made to move businesses forward.</h3>
        <div class="projects-grid">
          <article class="project-card"><div class="project-meta"><strong>Forma House</strong><small>Hospitality · Website</small></div></article>
          <article class="project-card"><div class="project-meta"><strong>Common Ground</strong><small>Architecture · Identity</small></div></article>
          <article class="project-card"><div class="project-meta"><strong>Atlas Systems</strong><small>SaaS · Product</small></div></article>
          <article class="project-card"><div class="project-meta"><strong>Sunday Coffee</strong><small>F&B · Ecommerce</small></div></article>
        </div>
      </section>
    `;
  }

  if (id === 2) {
    return `
      <section class="content-section">
        <span class="section-label">Client words</span>
        <h3 class="section-title">Good work should make the next decision easier.</h3>
        <div class="testimonial-wrap">
          <div class="quote-mark">“</div>
          <blockquote>They understood the business before touching the design. The result feels unmistakably ours — just sharper, clearer, and much easier to use.</blockquote>
          <div class="testimonial-person">
            <div class="testimonial-avatar"></div>
            <div><strong>Mara Santos</strong><span>Founder, Forma House</span></div>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="content-section">
      <span class="section-label">How it works</span>
      <h3 class="section-title">A straightforward process from first idea to launch.</h3>
      <div class="process-grid">
        <article class="process-card"><span>01 / Discover</span><strong>Understand</strong><p>We define the problem, users, goals, and what success needs to look like.</p></article>
        <article class="process-card"><span>02 / Create</span><strong>Design</strong><p>We turn the strategy into a visual system and working responsive experience.</p></article>
        <article class="process-card"><span>03 / Refine</span><strong>Launch</strong><p>We test, polish, publish, and make sure the system is ready to grow.</p></article>
      </div>
    </section>
  `;
}

function footerMarkup(id) {
  if (id === 1) {
    return `
      <footer class="site-footer footer-minimal">
        <div class="footer-top"><strong>NORTH & CO.</strong><span>Manila · Available worldwide</span></div>
        <div class="footer-big">Have something worth building?</div>
        <div class="footer-bottom"><span>hello@northandco.studio</span><span>Instagram · LinkedIn · Behance</span><span>© 2026</span></div>
      </footer>
    `;
  }

  if (id === 2) {
    return `
      <footer class="site-footer footer-multi">
        <div class="footer-top"><strong>NORTH & CO.</strong><button class="site-btn">Start a project</button></div>
        <div class="footer-columns">
          <div><h3 class="section-title">Digital work with purpose and personality.</h3></div>
          <div><strong>Explore</strong><a href="#">Work</a><a href="#">Studio</a><a href="#">Services</a></div>
          <div><strong>Social</strong><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Behance</a></div>
          <div><strong>Contact</strong><a href="#">hello@north.co</a><a href="#">Manila, PH</a></div>
        </div>
        <div class="footer-bottom"><span>Independent digital studio</span><span>© 2026 North & Co.</span></div>
      </footer>
    `;
  }

  return `
    <footer class="site-footer footer-cta">
      <span class="section-label">Next project</span>
      <div class="footer-big">Let’s make something people remember.</div>
      <button class="site-btn">Tell us about your project ↗</button>
      <div class="footer-bottom"><span>NORTH & CO.</span><span>Manila · Philippines</span><span>© 2026</span></div>
    </footer>
  `;
}

function navMarkup() {
  return `
    <nav class="site-nav">
      <div class="logo">NORTH/CO.</div>
      <ul><li>Work</li><li>Studio</li><li>Services</li><li>Journal</li></ul>
      <button class="site-btn accent">Let's talk</button>
    </nav>
  `;
}

function fullSiteMarkup() {
  return navMarkup() + heroMarkup(state.hero) + body1Markup(state.body1) + body2Markup(state.body2) + footerMarkup(state.footer);
}

function applySiteTheme(el) {
  const palette = palettes[state.palette];
  el.style.setProperty("--site-bg", palette.colors[0]);
  el.style.setProperty("--site-text", palette.colors[1]);
  el.style.setProperty("--site-accent", palette.colors[2]);
  el.style.setProperty("--site-font", `"${state.font}", sans-serif`);
}

function updatePreview() {
  sitePreview.innerHTML = fullSiteMarkup();
  applySiteTheme(sitePreview);
  fontSample.style.fontFamily = `"${state.font}", sans-serif`;

  $("#heroStatus").textContent = heroes.find(x => x.id === state.hero).name;
  $("#body1Status").textContent = body1s.find(x => x.id === state.body1).name;
  $("#body2Status").textContent = body2s.find(x => x.id === state.body2).name;
  $("#footerStatus").textContent = footers.find(x => x.id === state.footer).name;
  $("#previewMeta").textContent = `${state.font} · ${palettes[state.palette].name}`;

  renderOptionCards(heroes, heroOptions, "hero", "hero");
  renderOptionCards(body1s, body1Options, "body1", "body");
  renderOptionCards(body2s, body2Options, "body2", "body");
  renderOptionCards(footers, footerOptions, "footer", "footer");
  renderPalettes();
}

function attachDelegatedListeners() {
  document.addEventListener("click", (event) => {
    const option = event.target.closest(".option-card");
    if (option) {
      const key = option.dataset.key;
      state[key] = Number(option.dataset.value);
      updatePreview();
      return;
    }

    const palette = event.target.closest(".palette-option");
    if (palette) {
      state.palette = Number(palette.dataset.palette);
      updatePreview();
    }
  });
}

fontSelect.addEventListener("change", () => {
  state.font = fontSelect.value;
  updatePreview();
});

$$(".device-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".device-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.device = btn.dataset.device;
    browserFrame.className = `browser-frame device-${state.device}`;
  });
});

function shuffleDesign() {
  state.hero = 1 + Math.floor(Math.random() * 3);
  state.body1 = 1 + Math.floor(Math.random() * 3);
  state.body2 = 1 + Math.floor(Math.random() * 3);
  state.footer = 1 + Math.floor(Math.random() * 3);
  state.palette = Math.floor(Math.random() * palettes.length);
  const fonts = ["Poppins", "Manrope", "Montserrat", "Inter", "DM Sans"];
  state.font = fonts[Math.floor(Math.random() * fonts.length)];
  fontSelect.value = state.font;
  updatePreview();
}

function resetDesign() {
  Object.assign(state, {
    hero: 1,
    body1: 1,
    body2: 1,
    footer: 1,
    font: "Poppins",
    palette: 0,
    device: "desktop"
  });
  fontSelect.value = state.font;
  $$(".device-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.device === "desktop"));
  browserFrame.className = "browser-frame device-desktop";
  updatePreview();
}

function openResult() {
  resultPreview.innerHTML = fullSiteMarkup();
  applySiteTheme(resultPreview);

  const names = ["northco", "formahouse", "atlasworks", "novastudio", "common-ground", "vertexdigital"];
  const address = `${names[Math.floor(Math.random() * names.length)]}.layoutforge.site`;
  $("#resultAddress").textContent = address;
  $("#resultSummary").textContent =
    `${heroes[state.hero - 1].name} · ${body1s[state.body1 - 1].name} · ${body2s[state.body2 - 1].name} · ${footers[state.footer - 1].name} · ${state.font} · ${palettes[state.palette].name}`;

  resultModal.classList.add("show");
  resultModal.setAttribute("aria-hidden", "false");
}

function runGeneration() {
  generationOverlay.classList.add("show");
  generationOverlay.setAttribute("aria-hidden", "false");
  generationRows.forEach(row => row.classList.remove("active", "done"));

  let step = 0;
  const timer = setInterval(() => {
    generationRows.forEach((row, index) => {
      row.classList.toggle("done", index < step);
      row.classList.toggle("active", index === step);
    });

    step += 1;

    if (step > generationRows.length) {
      clearInterval(timer);
      generationRows.forEach(row => {
        row.classList.remove("active");
        row.classList.add("done");
      });

      setTimeout(() => {
        generationOverlay.classList.remove("show");
        generationOverlay.setAttribute("aria-hidden", "true");
        openResult();
      }, 350);
    }
  }, 420);
}

$("#shuffleBtn").addEventListener("click", shuffleDesign);
$("#resetBtn").addEventListener("click", resetDesign);
$("#buildBtn").addEventListener("click", runGeneration);
$("#buildBtnTop").addEventListener("click", runGeneration);

$("#closeResultBtn").addEventListener("click", () => {
  resultModal.classList.remove("show");
  resultModal.setAttribute("aria-hidden", "true");
});

$("#editBtn").addEventListener("click", () => {
  resultModal.classList.remove("show");
  resultModal.setAttribute("aria-hidden", "true");
});

$("#generateAgainBtn").addEventListener("click", () => {
  resultModal.classList.remove("show");
  resultModal.setAttribute("aria-hidden", "true");
  shuffleDesign();
  setTimeout(runGeneration, 150);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resultModal.classList.contains("show")) {
    resultModal.classList.remove("show");
    resultModal.setAttribute("aria-hidden", "true");
  }
});

attachDelegatedListeners();
updatePreview();
