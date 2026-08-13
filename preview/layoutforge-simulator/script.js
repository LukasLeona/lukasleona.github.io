const palettes = [
  { name: "Electric Lime", colors: ["#F5F5F0", "#111111", "#DFFF00"] },
  { name: "Warm Clay", colors: ["#F4EDE4", "#201813", "#D47855"] },
  { name: "Forest Studio", colors: ["#E9F0E9", "#102A23", "#7EA06F"] },
  { name: "Modern Orange", colors: ["#F7F5F2", "#171A21", "#FF6B35"] },
  { name: "Soft Lavender", colors: ["#F5F0FA", "#241F31", "#A78BFA"] },
  { name: "Ocean Glass", colors: ["#EDF7F8", "#11242D", "#4EB8C7"] },
  { name: "Desert Sand", colors: ["#F7F0E3", "#2A2118", "#CDA86E"] },
  { name: "Editorial Rose", colors: ["#FFF3F5", "#2C1720", "#E28DA6"] },
  { name: "Cobalt Pop", colors: ["#F1F4FF", "#111C44", "#5271FF"] },
  { name: "Mono", colors: ["#F2F2F2", "#141414", "#9B9B9B"] },
  { name: "Midnight Gold", colors: ["#111318", "#F4F0E7", "#E7B94E"] },
  { name: "Cherry Cream", colors: ["#FFF8EC", "#261718", "#E8464C"] },
  { name: "Nordic Blue", colors: ["#EEF2F3", "#18303D", "#81B7C8"] },
  { name: "Matcha", colors: ["#F1F3E8", "#233020", "#A8C66C"] },
  { name: "Violet Night", colors: ["#171421", "#F4F0FF", "#9F7AEA"] },
  { name: "Sunlit Blue", colors: ["#F7F7F2", "#13233B", "#F6C945"] }
];

const heroes = [
  { id: 1, name: "Editorial", desc: "Centered story" },
  { id: 2, name: "Split studio", desc: "Copy + portrait" },
  { id: 3, name: "Full canvas", desc: "Immersive image" },
  { id: 4, name: "Product focus", desc: "Offer first" },
  { id: 5, name: "Showcase grid", desc: "Visual collage" },
  { id: 6, name: "Bold statement", desc: "Type-led impact" },
  { id: 7, name: "Launch countdown", desc: "Anticipation first" },
  { id: 8, name: "Portfolio reel", desc: "Work in motion" },
  { id: 9, name: "Personal signature", desc: "Creator-led story" }
];

const body1s = [
  { id: 1, name: "Story split", desc: "About + results" },
  { id: 2, name: "Bento grid", desc: "Capabilities" },
  { id: 3, name: "Service index", desc: "Editorial list" },
  { id: 4, name: "Proof wall", desc: "Metrics + clients" },
  { id: 5, name: "People", desc: "Team cards" },
  { id: 6, name: "Feature focus", desc: "Product benefits" },
  { id: 7, name: "Manifesto", desc: "Belief statement" },
  { id: 8, name: "Magazine", desc: "Layered editorial" },
  { id: 9, name: "FAQ", desc: "Common questions" }
];

const body2s = [
  { id: 1, name: "Project gallery", desc: "Selected work" },
  { id: 2, name: "Testimonial", desc: "Client proof" },
  { id: 3, name: "Process", desc: "Three-step flow" },
  { id: 4, name: "Pricing", desc: "Clear packages" },
  { id: 5, name: "Journal", desc: "Latest insights" },
  { id: 6, name: "Timeline", desc: "Journey + milestones" },
  { id: 7, name: "Dashboard", desc: "Results snapshot" },
  { id: 8, name: "Photo mosaic", desc: "Image-led story" },
  { id: 9, name: "Conversion CTA", desc: "Focused close" }
];

const bodySections = [
  ...body1s.map((item) => ({ ...item, key: `body1-${item.id}`, source: "body1" })),
  ...body2s.map((item) => ({ ...item, key: `body2-${item.id}`, source: "body2" }))
];

const footers = [
  { id: 1, name: "Minimal", desc: "Strong and simple" },
  { id: 2, name: "Multi-column", desc: "Structured links" },
  { id: 3, name: "Large CTA", desc: "Conversion close" },
  { id: 4, name: "Newsletter", desc: "Audience builder" },
  { id: 5, name: "Contact card", desc: "Direct inquiry" },
  { id: 6, name: "Marquee", desc: "Playful send-off" }
];

const fonts = ["Poppins", "Manrope", "Space Grotesk", "DM Sans", "Inter", "Montserrat", "Outfit", "Urbanist", "Work Sans", "Libre Franklin", "Syne", "Playfair Display", "DM Serif Display", "Abril Fatface", "Bebas Neue", "JetBrains Mono"];

const state = { hero: 1, bodies: ["body1-1", "body2-1"], footer: 1, font: "Poppins", palette: 0, customColors: null, motion: "soft", device: "desktop", userImages: [], previewPage: "home", showPageNotice: false, siteMenuOpen: false };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let photoCursor = 0;
function photo(name, alt, className = "") {
  const uploaded = state.userImages.length ? state.userImages[photoCursor % state.userImages.length].src : null;
  photoCursor += 1;
  return `<img class="${className}" src="${uploaded || `assets/photos/${name}`}" alt="${alt}" loading="lazy">`;
}
const heroOptions = $("#heroOptions");
const bodyOptions = $("#bodyOptions");
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
const imageUpload = $("#imageUpload");
const uploadedImages = $("#uploadedImages");

function selectedPalette() {
  return state.customColors ? { name: "Your palette", colors: state.customColors } : palettes[state.palette];
}

function miniPreview(type, id) {
  const blocks = Array.from({ length: Math.min(5, id + 1) }, (_, index) => `<i class="mini-block m${index + 1}"></i>`).join("");
  if (type === "hero") return `<div class="mini-layout mini-hero mini-${id}"><span class="mini-nav"></span><b></b><em></em>${blocks}</div>`;
  if (type === "footer") return `<div class="mini-layout mini-footer mini-${id}"><b></b>${blocks}</div>`;
  return `<div class="mini-layout mini-body mini-${id}">${blocks}</div>`;
}

function renderOptionCards(items, target, key, type) {
  target.innerHTML = items.map((item) => `
    <button class="option-card ${state[key] === item.id ? "active" : ""}" type="button" data-key="${key}" data-value="${item.id}" aria-pressed="${state[key] === item.id}">
      <div class="option-card-preview">${miniPreview(type, item.id)}</div>
      <div><strong>${item.name}</strong><small>${item.desc}</small></div><span class="option-check" aria-hidden="true">✓</span>
    </button>`).join("");
}

function renderBodyCards() {
  bodyOptions.innerHTML = bodySections.map((item) => {
    const selected = state.bodies.includes(item.key);
    return `
      <button class="option-card ${selected ? "active" : ""}" type="button" data-body-key="${item.key}" aria-pressed="${selected}">
        <div class="option-card-preview">${miniPreview("body", item.id)}</div>
        <div><strong>${item.name}</strong><small>${item.desc}</small></div><span class="option-check" aria-hidden="true">✓</span>
      </button>`;
  }).join("");
}

function renderUploadedImages() {
  $("#imageStatus").textContent = state.userImages.length ? `${state.userImages.length} uploaded` : "Studio photos";
  uploadedImages.innerHTML = state.userImages.length ? `
    <div class="uploaded-image-grid">${state.userImages.map((image, index) => `<figure><img src="${image.src}" alt="Uploaded website image"><button type="button" data-remove-image="${index}" aria-label="Remove uploaded image ${index + 1}">×</button></figure>`).join("")}</div>
    <button class="clear-images" type="button" data-clear-images>Use studio photos instead</button>` : `<p>Your uploaded photos will replace the demo imagery. They stay in this browser session only.</p>`;
}

function renderPalettes() {
  paletteOptions.innerHTML = palettes.map((palette, index) => `
    <button class="palette-option ${!state.customColors && state.palette === index ? "active" : ""}" type="button" data-palette="${index}" aria-label="Use ${palette.name} palette" aria-pressed="${!state.customColors && state.palette === index}">
      <span class="palette-swatch">${palette.colors.map((color) => `<i style="background:${color}"></i>`).join("")}</span><small>${palette.name}</small>
    </button>`).join("");
}

function navMarkup() {
  const pages = [["work", "Work"], ["studio", "Studio"], ["services", "Services"], ["journal", "Journal"]];
  const pageButtons = pages.map(([page, label]) => `<button class="${state.previewPage === page ? "active" : ""}" type="button" data-preview-page="${page}">${label}</button>`).join("");
  return `<nav class="site-nav reveal-item"><button class="site-logo ${state.previewPage === "home" ? "active" : ""}" type="button" data-preview-page="home">NORTH<span>+</span>CO</button><ul>${pages.map(([page, label]) => `<li><button class="${state.previewPage === page ? "active" : ""}" type="button" data-preview-page="${page}">${label}</button></li>`).join("")}</ul><a class="site-btn accent" href="../../index.html#contact" target="_top">Let’s talk</a><button class="site-menu ${state.siteMenuOpen ? "active" : ""}" type="button" data-toggle-site-menu aria-expanded="${state.siteMenuOpen}" aria-label="Open preview menu">${state.siteMenuOpen ? "Close" : "Menu"}</button>${state.siteMenuOpen ? `<div class="site-menu-drawer">${pageButtons}</div>` : ""}</nav>`;
}

function heroMarkup(id) {
  if (id === 1) return `<section class="site-hero hero-editorial"><div class="hero-kicker reveal-item">Independent creative studio · Manila</div><h2 class="reveal-item">Ideas shaped into <em>digital experiences.</em></h2><p class="reveal-item">We create expressive brands and high-performing websites for ambitious businesses ready to stand apart.</p><div class="hero-actions reveal-item"><button class="site-btn">View our work</button><button class="site-btn accent">Start a project</button></div><div class="editorial-collage reveal-item">${photo("studio-architecture.jpg", "Modern architecture")} ${photo("studio-nature.jpg", "Flower landscape")}<span>Built with intent</span></div></section>`;
  if (id === 2) return `<section class="site-hero hero-split"><div class="hero-copy"><div class="hero-kicker reveal-item">Brand · Digital · Strategy</div><h2 class="reveal-item">Built for brands that refuse to blend in.</h2><p class="reveal-item">North & Co. turns early ideas into clear identities, immersive websites, and useful digital systems.</p><div class="hero-actions reveal-item"><button class="site-btn accent">Explore the studio</button></div><div class="hero-proof reveal-item"><strong>32</strong><span>thoughtful launches<br>across 11 industries</span></div></div><div class="hero-photo reveal-item">${photo("studio-people.webp", "Creative couple on a beach")}<span class="photo-note">Human stories<br>deserve good design.</span></div></section>`;
  if (id === 3) return `<section class="site-hero hero-canvas">${photo("studio-architecture.jpg", "Modern hillside home", "canvas-image")}<div class="canvas-shade"></div><div class="canvas-copy"><span class="hero-kicker reveal-item">Architecture / Identity / Web</span><h2 class="reveal-item">Make the first impression impossible to forget.</h2><div class="canvas-bottom reveal-item"><p>A cinematic web direction for work that deserves space, scale, and attention.</p><button class="site-btn light">See selected work ↗</button></div></div></section>`;
  if (id === 4) return `<section class="site-hero hero-product"><div class="product-copy"><span class="hero-kicker reveal-item">A better way to launch</span><h2 class="reveal-item">One focused system for your next big idea.</h2><p class="reveal-item">Strategy, design, content, and launch support - shaped into a clear experience your audience can understand.</p><div class="hero-actions reveal-item"><button class="site-btn accent">Book a discovery call</button><button class="site-btn">See how it works</button></div><div class="product-badges reveal-item"><span>Responsive</span><span>Accessible</span><span>Fast</span></div></div><div class="product-window reveal-item"><div class="product-window-bar"><i></i><i></i><i></i></div><div class="product-ui"><span class="product-pill">LIVE EXPERIENCE</span><strong>Shape an idea.<br>See it clearly.</strong><div class="product-ui-grid"><i></i><i></i><i></i></div></div></div></section>`;
  if (id === 5) return `<section class="site-hero hero-showcase"><div class="showcase-copy"><span class="hero-kicker reveal-item">Studio portfolio / 2026</span><h2 class="reveal-item">Good design gives ideas somewhere to go.</h2><button class="site-btn accent reveal-item">Enter the archive</button></div><div class="showcase-grid reveal-item"><figure>${photo("studio-people.webp", "People by the coast")}<figcaption>People / 01</figcaption></figure><figure>${photo("studio-architecture.jpg", "Modern architecture")}<figcaption>Space / 02</figcaption></figure><figure>${photo("studio-detail.webp", "Styled event table")}<figcaption>Detail / 03</figcaption></figure></div></section>`;
  if (id === 6) return `<section class="site-hero hero-statement"><div class="statement-number">01 - 26</div><span class="hero-kicker reveal-item">Independent design and technology practice</span><h2 class="reveal-item">CLEAR<br><em>IDEAS.</em><br>BRAVE<br>EXECUTION.</h2><div class="statement-foot reveal-item"><p>Strategy, identity, digital design, and development for teams ready to move.</p><button class="circle-link" aria-label="Explore work">↘</button></div><div class="statement-ticker"><span>WEB DESIGN · BRAND SYSTEMS · CREATIVE DEVELOPMENT · </span><span>WEB DESIGN · BRAND SYSTEMS · CREATIVE DEVELOPMENT · </span></div></section>`;
  if (id === 7) return `<section class="site-hero hero-launch"><div class="launch-copy"><span class="hero-kicker reveal-item">New digital experience / arriving soon</span><h2 class="reveal-item">Something worth waiting for.</h2><p class="reveal-item">A launch-focused direction that turns anticipation into sign-ups, conversations, and early momentum.</p><form class="launch-form reveal-item"><input type="email" placeholder="Email for early access" aria-label="Email for early access"><button type="button" class="site-btn accent">Join the list</button></form></div><div class="launch-countdown reveal-item"><div><strong>18</strong><span>Days</span></div><div><strong>06</strong><span>Hours</span></div><div><strong>42</strong><span>Minutes</span></div><small>North+Co release 01</small></div></section>`;
  if (id === 8) return `<section class="site-hero hero-reel"><div class="reel-heading"><span class="hero-kicker reveal-item">Selected work / rolling archive</span><h2 class="reveal-item">A portfolio that never stands still.</h2><button class="site-btn accent reveal-item">Play the reel</button></div><div class="reel-track reveal-item"><figure>${photo("studio-architecture.jpg", "Architecture portfolio feature")}<figcaption>FORMA / WEB</figcaption></figure><figure>${photo("studio-people.webp", "People-centered editorial project")}<figcaption>VELA / STORY</figcaption></figure><figure>${photo("studio-detail.webp", "Detailed brand experience")}<figcaption>SUNDAY / BRAND</figcaption></figure></div></section>`;
  return `<section class="site-hero hero-signature"><div class="signature-portrait reveal-item">${photo("studio-people.webp", "Independent creative director")}<span>Luke / Creative technologist</span></div><div class="signature-copy"><span class="hero-kicker reveal-item">Independent practice · Manila</span><h2 class="reveal-item">I turn ambitious ideas into digital work that feels <em>personal.</em></h2><p class="reveal-item">Strategy, design, code, and creative curiosity - brought together by one close collaborator.</p><div class="hero-actions reveal-item"><button class="site-btn accent">See what I make</button><button class="site-btn">About the practice</button></div><div class="signature-mark reveal-item">L.</div></div></section>`;
}

function body1Markup(id) {
  if (id === 1) return `<section class="content-section story-split"><div class="story-photo reveal-item">${photo("studio-detail.webp", "Carefully styled details")}<span>Details build trust.</span></div><div class="story-copy"><span class="section-label reveal-item">About the studio</span><h3 class="section-title reveal-item">We turn complicated ideas into simple, memorable experiences.</h3><p class="section-copy reveal-item">Strategy, design, and development work together here. We build systems that look sharp, feel intuitive, and support real business goals.</p><div class="stats-grid reveal-item"><div class="stat"><strong>32</strong><span>projects launched</span></div><div class="stat"><strong>11</strong><span>industries served</span></div><div class="stat"><strong>92%</strong><span>client referrals</span></div></div></div></section>`;
  if (id === 2) return `<section class="content-section"><span class="section-label reveal-item">Capabilities</span><h3 class="section-title reveal-item">Everything needed to build a stronger digital presence.</h3><div class="bento-grid reveal-item"><article class="bento-card large"><span>01</span><strong>Web design & development</strong><p>Responsive, conversion-aware websites with thoughtful interactions and clean systems behind them.</p><div class="bento-browser"><i></i><i></i><i></i></div></article><article class="bento-card accent-card"><span>02</span><strong>Brand systems</strong><p>Identity direction with enough structure to stay consistent.</p></article><article class="bento-card"><span>03</span><strong>Strategy</strong><p>Clear positioning before pixels.</p></article><article class="bento-card"><span>04</span><strong>Motion</strong><p>Interactions that make products feel alive.</p></article><article class="bento-card"><span>05</span><strong>Launch support</strong><p>Hands-on refinement after publishing.</p></article></div></section>`;
  if (id === 3) return `<section class="content-section service-index"><span class="section-label reveal-item">What we do</span><h3 class="section-title reveal-item">A small studio with a complete digital toolkit.</h3><div class="services-list reveal-item"><div class="service-row"><span>01</span><strong>Brand direction</strong><small>Strategy · Identity</small><b>↗</b></div><div class="service-row"><span>02</span><strong>Website design</strong><small>UX · Visual design</small><b>↗</b></div><div class="service-row"><span>03</span><strong>Creative development</strong><small>Frontend · Motion</small><b>↗</b></div><div class="service-row"><span>04</span><strong>Digital systems</strong><small>Automation · Growth</small><b>↗</b></div></div></section>`;
  if (id === 4) return `<section class="content-section proof-wall"><div><span class="section-label reveal-item">Trusted to deliver</span><h3 class="section-title reveal-item">Small enough to care. Experienced enough to make it work.</h3></div><div class="proof-metrics reveal-item"><article><strong>4.9</strong><span>average partner rating</span></article><article><strong>74%</strong><span>faster concept alignment</span></article><article><strong>8 yrs</strong><span>combined digital practice</span></article></div><div class="client-cloud reveal-item"><span>FORMA</span><span>ATLAS®</span><span>COMMON</span><span>VERDE</span><span>MARROW</span><span>NOVA/</span></div></section>`;
  if (id === 5) return `<section class="content-section team-section"><span class="section-label reveal-item">People behind the work</span><h3 class="section-title reveal-item">Close collaboration, fewer layers, better conversations.</h3><div class="team-grid reveal-item"><article>${photo("studio-people.webp", "Creative director portrait")}<div><strong>Mara</strong><span>Creative direction</span></div></article><article>${photo("studio-architecture.jpg", "Architecture lead project")}<div><strong>Enzo</strong><span>Design & strategy</span></div></article><article>${photo("studio-nature.jpg", "Colorful landscape")}<div><strong>Studio network</strong><span>Specialist collaborators</span></div></article></div></section>`;
  if (id === 6) return `<section class="content-section feature-focus"><div class="feature-copy"><span class="section-label reveal-item">Built around real needs</span><h3 class="section-title reveal-item">A flexible website system - without the usual friction.</h3><div class="feature-list reveal-item"><article><span>01</span><div><strong>Clear structure</strong><p>Pages and pathways that help people find what matters.</p></div></article><article><span>02</span><div><strong>Responsive by default</strong><p>Designed to feel intentional at every screen size.</p></div></article><article><span>03</span><div><strong>Ready to grow</strong><p>A visual system your team can build on.</p></div></article></div></div><div class="feature-visual reveal-item"><div class="feature-phone"><span></span><strong>Your idea,<br>in motion.</strong><i></i><i></i></div><div class="feature-card"><span>Launch readiness</span><strong>94%</strong><i></i></div></div></section>`;
  if (id === 7) return `<section class="content-section manifesto"><span class="section-label reveal-item">What we believe</span><blockquote class="reveal-item">“A website should not just <em>look finished.</em> It should make the next decision feel obvious.”</blockquote><div class="manifesto-foot reveal-item"><span>North & Co. manifesto / 2026</span><p>Clarity is a creative advantage. We remove noise, create rhythm, and make room for the message people need.</p></div></section>`;
  if (id === 8) return `<section class="content-section magazine"><div class="magazine-heading reveal-item"><span class="section-label">Studio notes / 04</span><h3 class="section-title">The beauty is in how everything connects.</h3></div><div class="magazine-layout reveal-item"><figure class="mag-main">${photo("studio-architecture.jpg", "Architecture in a forest")}<figcaption>Space, proportion, rhythm</figcaption></figure><div class="mag-copy"><p>We borrow from editorial design, physical spaces, and real conversation to make digital work feel more human.</p><span>Read the story →</span></div><figure class="mag-small">${photo("studio-nature.jpg", "Flowers in the mountains")}<figcaption>Color study / Benguet</figcaption></figure></div></section>`;
  return `<section class="content-section faq-section"><div><span class="section-label reveal-item">Before we begin</span><h3 class="section-title reveal-item">A few useful answers.</h3><p class="section-copy reveal-item">Good projects start with clear expectations. Here are the questions we hear most.</p></div><div class="faq-list reveal-item"><details open><summary>How long does a website take?<span>+</span></summary><p>Most focused sites take four to eight weeks, depending on content and complexity.</p></details><details><summary>Can you work with our existing brand?<span>+</span></summary><p>Yes. We can extend a strong system or help refine what no longer fits.</p></details><details><summary>Do you support the site after launch?<span>+</span></summary><p>Yes. Flexible support is available for improvement, maintenance, and growth.</p></details><details><summary>What do you need to get started?<span>+</span></summary><p>A goal, a point of view, and an honest conversation about where you are now.</p></details></div></section>`;
}

function body2Markup(id) {
  if (id === 1) return `<section class="content-section projects-section"><span class="section-label reveal-item">Selected work</span><div class="section-heading-row reveal-item"><h3 class="section-title">Projects made to move ideas forward.</h3><button class="text-link">View all work ↗</button></div><div class="projects-grid reveal-item"><article>${photo("studio-architecture.jpg", "Modern architecture project")}<div class="project-meta"><strong>Forma House</strong><small>Hospitality · Website</small></div></article><article>${photo("studio-nature.jpg", "Garden and mountains project")}<div class="project-meta"><strong>Common Ground</strong><small>Landscape · Identity</small></div></article><article>${photo("studio-detail.webp", "Styled dining detail project")}<div class="project-meta"><strong>Sunday Table</strong><small>F&B · Ecommerce</small></div></article><article>${photo("studio-people.webp", "Editorial people project")}<div class="project-meta"><strong>Vela Stories</strong><small>Editorial · Digital</small></div></article></div></section>`;
  if (id === 2) return `<section class="content-section testimonial-section"><span class="section-label reveal-item">Client words</span><div class="testimonial-wrap reveal-item"><div class="quote-mark">“</div><blockquote>They understood the business before touching the design. The result feels unmistakably ours - just sharper, clearer, and much easier to use.</blockquote><div class="testimonial-person">${photo("studio-people.webp", "Client portrait", "testimonial-avatar")}<div><strong>Mara Santos</strong><span>Founder, Forma House</span></div></div><div class="testimonial-score"><strong>5.0</strong><span>★★★★★</span></div></div></section>`;
  if (id === 3) return `<section class="content-section process-section"><span class="section-label reveal-item">How it works</span><h3 class="section-title reveal-item">A straightforward path from first idea to launch.</h3><div class="process-grid reveal-item"><article><span>01 / Discover</span><strong>Understand</strong><p>We define the problem, audience, goals, and what success should look like.</p><i></i></article><article><span>02 / Create</span><strong>Design</strong><p>We turn the strategy into a visual system and responsive experience.</p><i></i></article><article><span>03 / Refine</span><strong>Launch</strong><p>We test, polish, publish, and make sure the system is ready to grow.</p><i></i></article></div></section>`;
  if (id === 4) return `<section class="content-section pricing-section"><span class="section-label reveal-item">Ways to work together</span><h3 class="section-title reveal-item">Choose the pace that fits the idea.</h3><div class="pricing-grid reveal-item"><article><span>FOCUSED</span><h4>Launch page</h4><p>For one clear offer that needs a confident home.</p><strong>2–3 weeks</strong><ul><li>Strategy sprint</li><li>One responsive page</li><li>Launch support</li></ul><button class="site-btn">Start focused</button></article><article class="featured"><span>MOST POPULAR</span><h4>Signature site</h4><p>For brands ready for a complete digital presence.</p><strong>4–8 weeks</strong><ul><li>Content & UX direction</li><li>Up to 7 responsive pages</li><li>Motion and integrations</li></ul><button class="site-btn accent">Build the full vision</button></article><article><span>ONGOING</span><h4>Studio partner</h4><p>Flexible design and development as you grow.</p><strong>Monthly</strong><ul><li>Priority support</li><li>Continuous improvement</li><li>Creative collaboration</li></ul><button class="site-btn">Talk partnership</button></article></div></section>`;
  if (id === 5) return `<section class="content-section journal-section"><span class="section-label reveal-item">From the journal</span><div class="section-heading-row reveal-item"><h3 class="section-title">Notes on making digital work matter.</h3><button class="text-link">Read all notes ↗</button></div><div class="journal-grid reveal-item"><article>${photo("studio-nature.jpg", "Landscape and flowers")}<span>Field notes · 6 min</span><strong>Finding a color system in the places around us.</strong></article><article>${photo("studio-architecture.jpg", "Modern architecture")}<span>Design · 8 min</span><strong>What physical spaces teach us about web rhythm.</strong></article><article>${photo("studio-detail.webp", "Crafted table details")}<span>Practice · 4 min</span><strong>The quiet details that make a brand feel considered.</strong></article></div></section>`;
  if (id === 6) return `<section class="content-section timeline-section"><span class="section-label reveal-item">The studio journey</span><h3 class="section-title reveal-item">Built one thoughtful project at a time.</h3><div class="timeline reveal-item"><article><span>2019</span><strong>Started small</strong><p>Independent projects for founders who valued clarity.</p></article><article><span>2021</span><strong>Connected disciplines</strong><p>Strategy, brand, and technology became one practice.</p></article><article><span>2024</span><strong>Expanded the network</strong><p>Specialist collaborators joined for bigger ambitions.</p></article><article><span>Now</span><strong>Designing forward</strong><p>Building digital systems with more purpose and personality.</p></article></div></section>`;
  if (id === 7) return `<section class="content-section dashboard-section"><div><span class="section-label reveal-item">Measured impact</span><h3 class="section-title reveal-item">A clearer experience creates better movement.</h3><p class="section-copy reveal-item">A snapshot from the first 90 days after a recent redesign.</p></div><div class="dashboard-grid reveal-item"><article class="metric-card"><span>Qualified inquiries</span><strong>+48%</strong><i class="metric-up">↗</i></article><article class="metric-card"><span>Mobile engagement</span><strong>2.4×</strong><i class="metric-up">↗</i></article><article class="chart-card"><div><span>Weekly conversions</span><strong>Steady growth</strong></div><div class="bar-chart"><i style="height:31%"></i><i style="height:45%"></i><i style="height:39%"></i><i style="height:58%"></i><i style="height:67%"></i><i style="height:61%"></i><i style="height:83%"></i><i style="height:92%"></i></div></article><article class="donut-card"><div class="donut"><span>82%</span></div><p><strong>Message clarity</strong><br>surveyed visitors understood the offer</p></article></div></section>`;
  if (id === 8) return `<section class="content-section mosaic-section"><div class="mosaic-copy reveal-item"><span class="section-label">A visual point of view</span><h3 class="section-title">Made from people, places, texture, and light.</h3><p>Photography adds memory and personality to a page. It gives the story something real to hold onto.</p></div><div class="photo-mosaic reveal-item"><figure class="wide">${photo("studio-people.webp", "People together by the sea")}</figure><figure>${photo("studio-architecture.jpg", "Modern architecture")}</figure><figure>${photo("studio-detail.webp", "Styled dining details")}</figure><figure class="wide">${photo("studio-nature.jpg", "Flowers and mountains")}</figure></div></section>`;
  return `<section class="content-section conversion-section"><div class="conversion-orbit"><span></span><i></i><b>+</b></div><span class="section-label reveal-item">Your next chapter</span><h3 class="reveal-item">You have the idea.<br><em>Let’s give it form.</em></h3><p class="reveal-item">Tell us where you are, what needs to change, and what a better website could unlock.</p><div class="hero-actions reveal-item"><button class="site-btn accent">Start the conversation</button><button class="site-btn">See our approach</button></div></section>`;
}

function footerMarkup(id) {
  if (id === 1) return `<footer class="site-footer footer-minimal"><div class="footer-top"><strong>NORTH+CO</strong><span>Manila · Available worldwide</span></div><div class="footer-big">Have something worth building?</div><div class="footer-bottom"><span>hello@northandco.studio</span><span>Instagram · LinkedIn · Behance</span><span>© 2026</span></div></footer>`;
  if (id === 2) return `<footer class="site-footer footer-multi"><div class="footer-top"><strong>NORTH+CO</strong><button class="site-btn light">Start a project</button></div><div class="footer-columns"><div><h3>Digital work with purpose and personality.</h3></div><div><strong>Explore</strong><a href="#">Work</a><a href="#">Studio</a><a href="#">Services</a></div><div><strong>Social</strong><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Behance</a></div><div><strong>Contact</strong><a href="#">hello@north.co</a><a href="#">Manila, PH</a></div></div><div class="footer-bottom"><span>Independent digital studio</span><span>© 2026 North & Co.</span></div></footer>`;
  if (id === 3) return `<footer class="site-footer footer-cta"><span class="section-label">Next project</span><div class="footer-big">Let’s make something people remember.</div><button class="site-btn light">Tell us about your project ↗</button><div class="footer-bottom"><span>NORTH+CO</span><span>Manila · Philippines</span><span>© 2026</span></div></footer>`;
  if (id === 4) return `<footer class="site-footer footer-newsletter"><div><span class="section-label">Studio letter / monthly</span><h3>One useful idea for making digital work better.</h3></div><form><label for="demoEmail">Your email address</label><div><input id="demoEmail" type="email" placeholder="you@company.com"><button type="button">Subscribe →</button></div><small>No clutter. Unsubscribe anytime.</small></form><div class="footer-bottom"><span>NORTH+CO</span><span>Privacy · Instagram · LinkedIn</span><span>© 2026</span></div></footer>`;
  if (id === 5) return `<footer class="site-footer footer-contact"><div><span class="section-label">Say hello</span><h3>What are you hoping to make possible?</h3><p>Share the idea, challenge, or unfinished thought. We’ll help find the clearest next step.</p></div><div class="contact-card"><span>NEW BUSINESS</span><a href="#">hello@northandco.studio ↗</a><span>PHONE / SIGNAL</span><a href="#">+63 917 555 0188</a><span>BASED IN</span><p>Manila, Philippines<br>Working worldwide</p></div><div class="footer-bottom"><strong>NORTH+CO</strong><span>© 2026</span></div></footer>`;
  return `<footer class="site-footer footer-marquee"><div class="marquee-track"><span>LET’S BUILD SOMETHING GOOD ✦ </span><span>LET’S BUILD SOMETHING GOOD ✦ </span></div><div class="marquee-bottom"><strong>NORTH+CO</strong><a href="#">hello@northandco.studio</a><div><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Behance</a></div><span>Manila / 2026</span></div></footer>`;
}

function pageNoticeMarkup(page) {
  if (!state.showPageNotice) return "";
  const label = page[0].toUpperCase() + page.slice(1);
  return `<div class="page-customize-notice" role="dialog" aria-label="Customize the ${label} page"><button type="button" data-dismiss-page-notice aria-label="Close message">×</button><span>Preview page</span><strong>Want to customize the ${label} page?</strong><p>This page is included to complete the website preview. Message Luke to tailor its layout and content to your real business.</p><a href="../../index.html#contact" target="_top">Message Luke to customize →</a></div>`;
}

function secondaryPageMarkup(page) {
  const headings = {
    work: ["Selected work", "Projects designed to make the next move clearer.", "A collection of brand, web, and digital experiences shaped around real goals."],
    studio: ["Inside the studio", "Small team energy. Full-scope digital thinking.", "A close collaborative practice connecting strategy, identity, content, and technology."],
    services: ["Ways we can help", "The right mix of thinking, making, and momentum.", "Flexible creative support from the first strategic question through launch and growth."],
    journal: ["Ideas and field notes", "Useful thinking for better digital work.", "Observations on brands, websites, audiences, technology, and the details that connect them."]
  };
  const [eyebrow, title, copy] = headings[page] || headings.work;
  let content = "";
  if (page === "work") content = body2Markup(1) + body2Markup(7);
  else if (page === "studio") content = body1Markup(1) + body1Markup(5) + body1Markup(4);
  else if (page === "services") content = body1Markup(3) + body2Markup(3) + body2Markup(4);
  else content = body2Markup(5) + body1Markup(8) + body2Markup(2);
  return `<main class="secondary-page"><header class="secondary-hero"><span class="hero-kicker reveal-item">${eyebrow}</span><h2 class="reveal-item">${title}</h2><p class="reveal-item">${copy}</p></header>${content}</main>${pageNoticeMarkup(page)}`;
}

function selectedBodyMarkup() {
  return state.bodies.map((key) => {
    const item = bodySections.find((section) => section.key === key);
    if (!item) return "";
    return item.source === "body1" ? body1Markup(item.id) : body2Markup(item.id);
  }).join("");
}

function fullSiteMarkup() {
  photoCursor = 0;
  const pageContent = state.previewPage === "home" ? heroMarkup(state.hero) + selectedBodyMarkup() : secondaryPageMarkup(state.previewPage);
  return navMarkup() + pageContent + footerMarkup(state.footer);
}

function applySiteTheme(element) {
  const palette = selectedPalette();
  element.style.setProperty("--site-bg", palette.colors[0]);
  element.style.setProperty("--site-text", palette.colors[1]);
  element.style.setProperty("--site-accent", palette.colors[2]);
  element.style.setProperty("--site-font", `"${state.font}", sans-serif`);
  element.classList.remove("motion-plain", "motion-soft", "motion-dynamic");
  element.classList.add(`motion-${state.motion}`);
}

function getItem(items, id) { return items.find((item) => item.id === id); }

function updatePreview() {
  sitePreview.innerHTML = fullSiteMarkup();
  applySiteTheme(sitePreview);
  fontSample.style.fontFamily = `"${state.font}", sans-serif`;
  $("#heroStatus").textContent = getItem(heroes, state.hero).name;
  $("#bodyStatus").textContent = `${state.bodies.length} selected`;
  $("#footerStatus").textContent = getItem(footers, state.footer).name;
  $("#paletteStatus").textContent = selectedPalette().name;
  $("#previewMeta").textContent = `${state.previewPage === "home" ? "Home" : state.previewPage[0].toUpperCase() + state.previewPage.slice(1)} · ${state.font} · ${selectedPalette().name} · ${state.motion[0].toUpperCase() + state.motion.slice(1)} motion`;
  $("#combinationLabel").textContent = `${getItem(heroes, state.hero).name} · ${state.bodies.length} body section${state.bodies.length === 1 ? "" : "s"} · ${state.motion[0].toUpperCase() + state.motion.slice(1)}`;
  renderOptionCards(heroes, heroOptions, "hero", "hero");
  renderBodyCards();
  renderOptionCards(footers, footerOptions, "footer", "footer");
  renderPalettes();
  renderUploadedImages();
  $$("[data-motion]").forEach((button) => button.classList.toggle("active", button.dataset.motion === state.motion));
}

document.addEventListener("click", (event) => {
  const bodyOption = event.target.closest("[data-body-key]");
  if (bodyOption) {
    const key = bodyOption.dataset.bodyKey;
    if (state.bodies.includes(key)) {
      if (state.bodies.length > 1) state.bodies = state.bodies.filter((item) => item !== key);
    } else {
      state.bodies = [...state.bodies, key];
    }
    state.previewPage = "home";
    updatePreview();
    return;
  }
  const option = event.target.closest(".option-card");
  if (option && option.dataset.key) {
    state[option.dataset.key] = Number(option.dataset.value);
    if (option.dataset.key === "hero") state.previewPage = "home";
    updatePreview();
    return;
  }
  const palette = event.target.closest(".palette-option");
  if (palette) { state.palette = Number(palette.dataset.palette); state.customColors = null; updatePreview(); return; }
  const motion = event.target.closest("[data-motion]");
  if (motion) { state.motion = motion.dataset.motion; updatePreview(); return; }
  const pageLink = event.target.closest("[data-preview-page]");
  if (pageLink) { state.previewPage = pageLink.dataset.previewPage; state.showPageNotice = state.previewPage !== "home"; state.siteMenuOpen = false; updatePreview(); return; }
  if (event.target.closest("[data-toggle-site-menu]")) { state.siteMenuOpen = !state.siteMenuOpen; updatePreview(); return; }
  if (event.target.closest("[data-dismiss-page-notice]")) { state.showPageNotice = false; updatePreview(); return; }
  const removeImage = event.target.closest("[data-remove-image]");
  if (removeImage) { state.userImages.splice(Number(removeImage.dataset.removeImage), 1); updatePreview(); return; }
  if (event.target.closest("[data-clear-images]")) { state.userImages = []; updatePreview(); return; }
  const colorTrigger = event.target.closest(".color-trigger");
  if (colorTrigger) openColorPicker(colorTrigger.dataset.colorTarget);
});

fontSelect.addEventListener("change", () => { state.font = fontSelect.value; updatePreview(); });

$$('.device-btn').forEach((button) => button.addEventListener("click", () => {
  $$('.device-btn').forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  state.device = button.dataset.device;
  browserFrame.className = `browser-frame device-${state.device}`;
}));

function validHex(value) { return /^#[0-9a-f]{6}$/i.test(value.trim()); }

const colorChoices = ["#F7F4EE", "#FFFFFF", "#E9F0E9", "#EDF7F8", "#FFF3F5", "#F1F4FF", "#181716", "#111318", "#102A23", "#13233B", "#2C1720", "#241F31", "#FF6B35", "#DFFF00", "#E8464C", "#5271FF", "#9F7AEA", "#4EB8C7", "#E7B94E", "#CDA86E", "#7EA06F", "#E28DA6", "#F6C945", "#A8C66C"];
const colorFields = {
  customBg: { label: "background", input: $("#customBgHex"), swatch: $("#customBgSwatch") },
  customText: { label: "text", input: $("#customTextHex"), swatch: $("#customTextSwatch") },
  customAccent: { label: "accent", input: $("#customAccentHex"), swatch: $("#customAccentSwatch") }
};
const colorPickerModal = $("#colorPickerModal");
const colorPickerHex = $("#colorPickerHex");
let activeColorTarget = "customBg";

$("#colorSwatchGrid").innerHTML = colorChoices.map((color) => `<button type="button" data-picker-color="${color}" style="--choice:${color}" aria-label="Choose ${color}"><span></span></button>`).join("");

function updatePickerPreview(value) {
  const color = validHex(value) ? value.toUpperCase() : "#F7F4EE";
  $("#colorPickerPreview").style.background = color;
  $("#colorPickerPreviewHex").textContent = color;
  $$("[data-picker-color]").forEach((button) => button.classList.toggle("active", button.dataset.pickerColor === color));
}

function openColorPicker(target) {
  activeColorTarget = target;
  const field = colorFields[target];
  colorPickerHex.value = field.input.value;
  $("#colorPickerTitle").textContent = `Choose ${field.label} color`;
  updatePickerPreview(colorPickerHex.value);
  colorPickerModal.classList.add("show");
  colorPickerModal.setAttribute("aria-hidden", "false");
  window.setTimeout(() => colorPickerHex.focus(), 80);
}

function closeColorPicker() {
  colorPickerModal.classList.remove("show");
  colorPickerModal.setAttribute("aria-hidden", "true");
}

$("#colorSwatchGrid").addEventListener("click", (event) => {
  const choice = event.target.closest("[data-picker-color]");
  if (!choice) return;
  colorPickerHex.value = choice.dataset.pickerColor;
  updatePickerPreview(colorPickerHex.value);
});
colorPickerHex.addEventListener("input", () => updatePickerPreview(colorPickerHex.value));
$("#colorPickerApply").addEventListener("click", () => {
  let value = colorPickerHex.value.trim();
  if (!value.startsWith("#")) value = `#${value}`;
  if (!validHex(value)) { colorPickerHex.classList.add("invalid"); return; }
  colorPickerHex.classList.remove("invalid");
  value = value.toUpperCase();
  colorFields[activeColorTarget].input.value = value;
  colorFields[activeColorTarget].swatch.style.background = value;
  closeColorPicker();
});
$("#colorPickerClose").addEventListener("click", closeColorPicker);
$("#colorPickerCancel").addEventListener("click", closeColorPicker);
colorPickerModal.addEventListener("click", (event) => { if (event.target === colorPickerModal) closeColorPicker(); });

Object.values(colorFields).forEach((field) => field.input.addEventListener("input", () => {
  let value = field.input.value.trim();
  if (!value.startsWith("#")) value = `#${value}`;
  if (validHex(value)) field.swatch.style.background = value;
}));

$("#imageUploadButton").addEventListener("click", () => imageUpload.click());
imageUpload.addEventListener("change", async () => {
  const available = Math.max(0, 8 - state.userImages.length);
  const files = [...imageUpload.files].filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024).slice(0, available);
  const images = await Promise.all(files.map((file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve({ name: file.name, src: reader.result }));
    reader.readAsDataURL(file);
  })));
  state.userImages = [...state.userImages, ...images];
  imageUpload.value = "";
  updatePreview();
});

$("#applyCustomPalette").addEventListener("click", () => {
  const inputs = [$("#customBgHex"), $("#customTextHex"), $("#customAccentHex")];
  const colors = inputs.map((input) => input.value.trim().toUpperCase());
  if (!colors.every(validHex)) {
    inputs.forEach((input) => input.classList.toggle("invalid", !validHex(input.value)));
    return;
  }
  inputs.forEach((input) => input.classList.remove("invalid"));
  state.customColors = colors;
  updatePreview();
});

function shuffleDesign() {
  state.hero = 1 + Math.floor(Math.random() * heroes.length);
  state.bodies = [...bodySections].sort(() => Math.random() - .5).slice(0, 1 + Math.floor(Math.random() * 3)).map((item) => item.key);
  state.footer = 1 + Math.floor(Math.random() * footers.length);
  state.palette = Math.floor(Math.random() * palettes.length);
  state.customColors = null;
  state.font = fonts[Math.floor(Math.random() * fonts.length)];
  state.motion = ["plain", "soft", "dynamic"][Math.floor(Math.random() * 3)];
  state.previewPage = "home";
  state.showPageNotice = false;
  fontSelect.value = state.font;
  updatePreview();
}

function resetDesign() {
  Object.assign(state, { hero: 1, bodies: ["body1-1", "body2-1"], footer: 1, font: "Poppins", palette: 0, customColors: null, motion: "soft", device: "desktop", userImages: [], previewPage: "home", showPageNotice: false, siteMenuOpen: false });
  fontSelect.value = state.font;
  $$('.device-btn').forEach((button) => button.classList.toggle("active", button.dataset.device === "desktop"));
  browserFrame.className = "browser-frame device-desktop";
  updatePreview();
}

function openResult() {
  resultPreview.innerHTML = fullSiteMarkup();
  applySiteTheme(resultPreview);
  const names = ["northco", "formahouse", "atlasworks", "novastudio", "commonground", "madeclear"];
  $("#resultAddress").textContent = `${names[Math.floor(Math.random() * names.length)]}.layoutforge.site`;
  $("#resultSummary").textContent = `${getItem(heroes, state.hero).name} · ${state.bodies.length} body section${state.bodies.length === 1 ? "" : "s"} · ${getItem(footers, state.footer).name} · ${state.font} · ${selectedPalette().name}`;
  resultModal.classList.add("show");
  resultModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeResult() {
  resultModal.classList.remove("show");
  resultModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function runGeneration() {
  generationOverlay.classList.add("show");
  generationOverlay.setAttribute("aria-hidden", "false");
  generationRows.forEach((row) => row.classList.remove("active", "done"));
  let step = 0;
  const timer = window.setInterval(() => {
    generationRows.forEach((row, index) => { row.classList.toggle("done", index < step); row.classList.toggle("active", index === step); });
    step += 1;
    if (step > generationRows.length) {
      window.clearInterval(timer);
      generationRows.forEach((row) => { row.classList.remove("active"); row.classList.add("done"); });
      window.setTimeout(() => { generationOverlay.classList.remove("show"); generationOverlay.setAttribute("aria-hidden", "true"); openResult(); }, 260);
    }
  }, 300);
}

$("#shuffleBtn").addEventListener("click", shuffleDesign);
$("#resetBtn").addEventListener("click", resetDesign);
$("#buildBtn").addEventListener("click", runGeneration);
$("#buildBtnTop").addEventListener("click", runGeneration);
$("#closeResultBtn").addEventListener("click", closeResult);
$("#editBtn").addEventListener("click", closeResult);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (colorPickerModal.classList.contains("show")) closeColorPicker();
  else if (resultModal.classList.contains("show")) closeResult();
});

const realityCta = $("#realityCta");
window.setTimeout(() => { realityCta.classList.add("show"); realityCta.setAttribute("aria-hidden", "false"); }, 10000);
$("#realityClose").addEventListener("click", () => { realityCta.classList.remove("show"); realityCta.setAttribute("aria-hidden", "true"); });

updatePreview();
