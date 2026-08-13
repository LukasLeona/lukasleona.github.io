(() => {
  "use strict";

  const STORAGE_KEY = "layoutletter_state_v1";
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const palette = {
    red: "#DB1A1A",
    blush: "#FFF6F6",
    teal: "#8CC7C4",
    darkTeal: "#2C687B",
    ink: "#193845",
    muted: "#6D8189",
  };

  const FONT_OPTIONS = [
    ["Poppins", "Poppins"],
    ["Inter", "Inter"],
    ["Montserrat", "Montserrat"],
    ["Playfair Display", "Playfair Display"],
    ["Lora", "Lora"],
    ["Merriweather", "Merriweather"],
    ["Arial", "Arial"],
    ["Georgia", "Georgia"],
    ["Verdana", "Verdana"],
  ];

  const PALETTE_PRESETS = {
    layoutletter: {
      name: "LayoutLetter",
      colors: ["#DB1A1A", "#FFF6F6", "#8CC7C4", "#2C687B", "#193845", "#FFFFFF"],
    },
    ocean: {
      name: "Ocean editorial",
      colors: ["#075985", "#E0F2FE", "#38BDF8", "#0F172A", "#475569", "#FFFFFF"],
    },
    sunset: {
      name: "Warm sunset",
      colors: ["#C2410C", "#FFF7ED", "#FB923C", "#7C2D12", "#431407", "#FFFFFF"],
    },
    forest: {
      name: "Forest studio",
      colors: ["#166534", "#F0FDF4", "#86EFAC", "#14532D", "#1F2937", "#FFFFFF"],
    },
    mono: {
      name: "Modern mono",
      colors: ["#111827", "#F9FAFB", "#D1D5DB", "#374151", "#111827", "#FFFFFF"],
    },
  };

  let copiedBlock = null;

  const templates = {
    creator: {
      id: "creator",
      name: "Creator Weekly",
      description: "A warm editorial layout for stories, updates, and recommendations.",
      accent: "teal",
      blocks: [
        {
          id: uid(),
          type: "heading",
          content: "The Sunday Edit",
          fontSize: 42,
          color: palette.darkTeal,
          align: "left",
          padding: 34,
          background: "#FFF6F6",
        },
        {
          id: uid(),
          type: "image",
          src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
          alt: "A creative workspace",
          height: 300,
          radius: 0,
          padding: 0,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "heading",
          content: "Three ideas worth keeping this week",
          fontSize: 28,
          color: palette.darkTeal,
          align: "left",
          padding: 34,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "text",
          content:
            "A short, thoughtful introduction belongs here. Share a personal note, a useful lesson, or the story behind your latest work.",
          fontSize: 15,
          color: palette.ink,
          align: "left",
          padding: 34,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "button",
          label: "Read the full story",
          url: "#",
          buttonColor: palette.red,
          textColor: "#FFFFFF",
          align: "left",
          radius: 12,
          padding: 34,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "divider",
          color: "#E9DADA",
          width: 100,
          thickness: 1,
          padding: 34,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "social",
          content: "Instagram  ·  LinkedIn  ·  Website",
          color: palette.darkTeal,
          align: "center",
          padding: 28,
          background: "#FFF6F6",
        },
      ],
    },
    launch: {
      id: "launch",
      name: "Product Launch",
      description: "A bold conversion-focused campaign for a product or service release.",
      accent: "red",
      blocks: [
        {
          id: uid(),
          type: "heading",
          content: "Something new just landed.",
          fontSize: 46,
          color: "#FFFFFF",
          align: "center",
          padding: 42,
          background: palette.red,
        },
        {
          id: uid(),
          type: "text",
          content:
            "Meet the simpler way to create, preview, and send newsletters your audience will actually enjoy.",
          fontSize: 16,
          color: "#FFFFFF",
          align: "center",
          padding: 28,
          background: palette.red,
        },
        {
          id: uid(),
          type: "image",
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
          alt: "Team planning a product launch",
          height: 320,
          radius: 0,
          padding: 0,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "heading",
          content: "Built for your next big idea",
          fontSize: 30,
          color: palette.darkTeal,
          align: "center",
          padding: 34,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "columns",
          leftTitle: "Beautiful by default",
          leftText: "Start with thoughtful layouts and customize every important detail.",
          rightTitle: "Ready to perform",
          rightText: "Responsive sections keep your message clear on desktop and mobile.",
          padding: 30,
          background: "#FFF6F6",
        },
        {
          id: uid(),
          type: "button",
          label: "Explore the launch",
          url: "#",
          buttonColor: palette.red,
          textColor: "#FFFFFF",
          align: "center",
          radius: 99,
          padding: 36,
          background: "#FFFFFF",
        },
      ],
    },
    event: {
      id: "event",
      name: "Event Invitation",
      description: "A polished invite for workshops, launches, community nights, and meetups.",
      accent: "light",
      blocks: [
        {
          id: uid(),
          type: "spacer",
          height: 30,
          background: "#FFF6F6",
        },
        {
          id: uid(),
          type: "heading",
          content: "You’re invited.",
          fontSize: 48,
          color: palette.darkTeal,
          align: "center",
          padding: 35,
          background: "#FFF6F6",
        },
        {
          id: uid(),
          type: "text",
          content: "CREATOR NIGHT  ·  FRIDAY, 7:00 PM",
          fontSize: 13,
          color: palette.red,
          align: "center",
          padding: 16,
          background: "#FFF6F6",
        },
        {
          id: uid(),
          type: "image",
          src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
          alt: "A creative event",
          height: 310,
          radius: 22,
          padding: 28,
          background: "#FFF6F6",
        },
        {
          id: uid(),
          type: "text",
          content:
            "Join us for an evening of practical ideas, honest conversations, and good company. Seats are limited, so reserve yours early.",
          fontSize: 16,
          color: palette.ink,
          align: "center",
          padding: 34,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "button",
          label: "Reserve my seat",
          url: "#",
          buttonColor: palette.darkTeal,
          textColor: "#FFFFFF",
          align: "center",
          radius: 14,
          padding: 34,
          background: "#FFFFFF",
        },
        {
          id: uid(),
          type: "spacer",
          height: 26,
          background: "#FFFFFF",
        },
      ],
    },
    digest: {
      id: "digest",
      name: "Editorial Digest",
      description: "A refined weekly roundup for articles, links, and recommendations.",
      accent: "light",
      blocks: [
        {
          id: uid(), type: "logo", src: "", alt: "Your brand", brandText: "THE WEEKLY BRIEF",
          width: 190, align: "center", url: "#", padding: 28, background: "#FFFFFF",
        },
        {
          id: uid(), type: "divider", color: "#D8E3E6", width: 90, thickness: 1,
          padding: 0, background: "#FFFFFF",
        },
        {
          id: uid(), type: "hero", eyebrow: "ISSUE 24 · AUGUST 2026", title: "Ideas for a more thoughtful week",
          text: "A concise collection of useful reads, creative inspiration, and one idea to try today.",
          buttonLabel: "Read this week's edition", url: "#", align: "left", background: "#FFF6F6",
          color: "#193845", accentColor: "#DB1A1A", padding: 42, fontFamily: "Playfair Display",
        },
        {
          id: uid(), type: "list", title: "Inside this issue", items: "The case for slower work\nA practical guide to better briefs\nFive things worth bookmarking",
          listStyle: "numbered", color: "#193845", accentColor: "#DB1A1A", fontFamily: "Poppins",
          fontSize: 15, padding: 34, background: "#FFFFFF",
        },
        {
          id: uid(), type: "quote", quote: "Good newsletters feel less like broadcasts and more like letters worth opening.",
          attribution: " - LayoutLetter editorial team", color: "#2C687B", fontFamily: "Lora", fontSize: 24,
          align: "center", padding: 38, background: "#EAF6F5",
        },
      ],
    },
    welcome: {
      id: "welcome",
      name: "Welcome Series",
      description: "A friendly onboarding email that introduces your brand and next steps.",
      accent: "teal",
      blocks: [
        {
          id: uid(), type: "hero", eyebrow: "WELCOME TO THE COMMUNITY", title: "We’re so glad you’re here.",
          text: "You now have a front-row seat to new ideas, practical resources, and updates created for you.",
          buttonLabel: "Visit our website", url: "#", align: "center", background: "#2C687B",
          color: "#FFFFFF", accentColor: "#8CC7C4", padding: 48, fontFamily: "Poppins",
        },
        {
          id: uid(), type: "callout", title: "Here’s what happens next", text: "Look out for a short note every Tuesday. Add us to your contacts so the good stuff always lands in your inbox.",
          accentColor: "#DB1A1A", color: "#193845", padding: 32, radius: 16, background: "#FFF6F6",
        },
        {
          id: uid(), type: "list", title: "Start here", items: "Tell us what you want to learn\nBrowse the resource library\nFollow along on social",
          listStyle: "check", color: "#193845", accentColor: "#2C687B", fontFamily: "Poppins",
          fontSize: 15, padding: 34, background: "#FFFFFF",
        },
        {
          id: uid(), type: "social", items: [
            { icon: "◎", label: "Instagram", url: "https://instagram.com" },
            { icon: "in", label: "LinkedIn", url: "https://linkedin.com" },
            { icon: "↗", label: "Website", url: "https://example.com" },
          ], color: "#2C687B", align: "center", padding: 28, background: "#FFF6F6",
        },
      ],
    },
    shop: {
      id: "shop",
      name: "Product Spotlight",
      description: "A clean shop update for new arrivals, offers, and featured products.",
      accent: "red",
      blocks: [
        {
          id: uid(), type: "heading", content: "A small upgrade. A big difference.", fontSize: 42,
          color: "#193845", align: "center", padding: 42, background: "#FFF6F6", fontFamily: "Playfair Display",
        },
        {
          id: uid(), type: "product", src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
          title: "The Everyday Essential", description: "Thoughtfully designed, made to last, and ready for wherever the day takes you.",
          price: "$89", buttonLabel: "Shop now", url: "#", padding: 30, background: "#FFFFFF",
        },
        {
          id: uid(), type: "callout", title: "Subscriber perk", text: "Use code LETTER15 for 15% off through Sunday.",
          accentColor: "#DB1A1A", color: "#193845", padding: 28, radius: 14, background: "#FFF1F1",
        },
      ],
    },
  };

  const defaultContacts = [
    { id: uid(), name: "Alyssa Cruz", email: "alyssa@example.com", status: "valid", source: "Demo" },
    { id: uid(), name: "Marco Santos", email: "marco@example.com", status: "valid", source: "Demo" },
    { id: uid(), name: "Nina Reyes", email: "nina@example.com", status: "valid", source: "Demo" },
    { id: uid(), name: "Jamie Lim", email: "jamie@example.com", status: "valid", source: "Demo" },
  ];

  const defaultCampaigns = [
    {
      id: uid(),
      name: "July Creator Update",
      subject: "What we made this month",
      status: "Sent",
      date: "2026-07-25T09:00:00.000Z",
      recipients: 842,
      openRate: 48.2,
      clickRate: 12.4,
    },
    {
      id: uid(),
      name: "New Collection Preview",
      subject: "A first look for our subscribers",
      status: "Scheduled",
      date: "2026-08-04T01:00:00.000Z",
      recipients: 1260,
      openRate: 0,
      clickRate: 0,
    },
    {
      id: uid(),
      name: "Welcome Newsletter",
      subject: "Welcome - we’re glad you’re here",
      status: "Draft",
      date: "2026-07-30T11:30:00.000Z",
      recipients: 0,
      openRate: 0,
      clickRate: 0,
    },
  ];

  const state = loadState();
  state.history = [];
  state.future = [];
  state.draggedBlockId = null;
  state.customTemplates = Array.isArray(state.customTemplates) ? state.customTemplates : [];
  state.activePalette = PALETTE_PRESETS[state.activePalette] ? state.activePalette : "layoutletter";
  state.brandColors = Array.isArray(state.brandColors) && state.brandColors.length
    ? state.brandColors
    : [...PALETTE_PRESETS[state.activePalette].colors];
  state.importStats = state.importStats || {
    total: state.contacts.length,
    valid: state.contacts.filter((c) => c.status === "valid").length,
    duplicates: 0,
    invalid: state.contacts.filter((c) => c.status === "invalid").length,
  };

  const appView = document.getElementById("appView");
  const pageTitle = document.getElementById("pageTitle");
  const pageEyebrow = document.getElementById("pageEyebrow");
  const sidebar = document.getElementById("sidebar");
  const toastStack = document.getElementById("toastStack");

  init();

  function init() {
    bindGlobalEvents();
    navigate(state.view || "dashboard", false);
  }

  function bindGlobalEvents() {
    document.addEventListener("click", (event) => {
      const nav = event.target.closest("[data-view]");
      if (nav) {
        event.preventDefault();
        navigate(nav.dataset.view);
        return;
      }

      const action = event.target.closest("[data-action]");
      if (action) {
        handleGlobalAction(action.dataset.action);
        return;
      }

      const closeButton = event.target.closest("[data-close-modal]");
      if (closeButton) {
        closeModal(closeButton.dataset.closeModal);
      }
    });

    document.getElementById("menuToggle").addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    document.getElementById("globalSearchButton").addEventListener("click", () => {
      showToast("Search", "Use the search field inside Audience or browse Templates.", "info");
    });

    document.querySelectorAll("[data-preview-size]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-preview-size]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const frame = document.getElementById("modalPreviewFrame");
        frame.classList.toggle("mobile", button.dataset.previewSize === "mobile");
        frame.classList.toggle("desktop", button.dataset.previewSize !== "mobile");
      });
    });

    document.getElementById("sendForm").addEventListener("submit", handleSendCampaign);
    document.getElementById("sendTestButton").addEventListener("click", handleSendTest);
    document.getElementById("templateForm").addEventListener("submit", handleSaveTemplateSubmit);
    document.addEventListener("copy", handleBuilderCopy);
    document.addEventListener("paste", handleBuilderPaste);

    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) {
          closeModal(backdrop.id);
        }
      });
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach((modal) => closeModal(modal.id));
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        saveState();
        showToast("Saved", "Your LayoutLetter workspace is saved in this browser.");
      }

      if (state.view !== "builder" || isEditableTarget(event.target)) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        event.shiftKey ? redo() : undo();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") {
        event.preventDefault();
        redo();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d" && state.selectedBlockId) {
        event.preventDefault();
        duplicateBlock(state.selectedBlockId);
      }

      if ((event.key === "Delete" || event.key === "Backspace") && state.selectedBlockId) {
        event.preventDefault();
        deleteBlock(state.selectedBlockId);
      }
    });
  }

  function navigate(view, persist = true) {
    const validViews = ["dashboard", "builder", "templates", "audience", "campaigns"];
    state.view = validViews.includes(view) ? view : "dashboard";

    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.view === state.view);
    });

    sidebar.classList.remove("open");

    const headings = {
      dashboard: ["WORKSPACE", "Dashboard"],
      builder: ["DESIGN STUDIO", "Newsletter Builder"],
      templates: ["START FASTER", "Templates"],
      audience: ["CONTACTS", "Audience"],
      campaigns: ["PERFORMANCE", "Campaigns"],
    };

    pageEyebrow.textContent = headings[state.view][0];
    pageTitle.textContent = headings[state.view][1];

    renderCurrentView();
    if (persist) saveState();
  }

  function renderCurrentView() {
    const renderers = {
      dashboard: renderDashboard,
      builder: renderBuilder,
      templates: renderTemplates,
      audience: renderAudience,
      campaigns: renderCampaigns,
    };

    appView.innerHTML = `<div class="page-enter">${renderers[state.view]()}</div>`;
    bindViewEvents();
  }

  function bindViewEvents() {
    if (state.view === "dashboard") bindDashboard();
    if (state.view === "builder") bindBuilder();
    if (state.view === "templates") bindTemplates();
    if (state.view === "audience") bindAudience();
    if (state.view === "campaigns") bindCampaigns();
  }

  function handleGlobalAction(action) {
    if (action === "new-campaign" || action === "open-builder") {
      state.campaignName = "Untitled campaign";
      state.blocks = cloneTemplateBlocks("creator");
      state.selectedBlockId = null;
      pushHistory();
      navigate("builder");
    }
  }

  /* Dashboard */
  function renderDashboard() {
    const sentCampaigns = state.campaigns.filter((campaign) => campaign.status === "Sent");
    const totalSent = sentCampaigns.reduce((sum, campaign) => sum + Number(campaign.recipients || 0), 0);
    const avgOpen = sentCampaigns.length
      ? sentCampaigns.reduce((sum, campaign) => sum + Number(campaign.openRate || 0), 0) / sentCampaigns.length
      : 0;
    const avgClick = sentCampaigns.length
      ? sentCampaigns.reduce((sum, campaign) => sum + Number(campaign.clickRate || 0), 0) / sentCampaigns.length
      : 0;

    const recentRows = [...state.campaigns]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(
        (campaign) => `
          <tr>
            <td><strong>${escapeHtml(campaign.name)}</strong></td>
            <td><span class="status-pill ${campaign.status.toLowerCase()}">${escapeHtml(campaign.status)}</span></td>
            <td>${formatDate(campaign.date)}</td>
            <td>${formatNumber(campaign.recipients || 0)}</td>
            <td>${Number(campaign.openRate || 0).toFixed(1)}%</td>
          </tr>
        `
      )
      .join("");

    return `
      <section class="hero-card">
        <div class="hero-copy">
          <span class="eyebrow">LAYOUTLETTER STUDIO</span>
          <h2>Make every email feel <span>beautifully yours.</span></h2>
          <p>Design responsive newsletters, organize your audience, and move from first idea to final send in one calm workspace.</p>
          <div class="hero-actions">
            <button class="primary-button" data-dashboard-action="create">Create newsletter</button>
            <button class="soft-button" data-dashboard-action="templates">Browse templates</button>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="newsletter-mini">
            <div class="mini-logo"></div>
            <div class="mini-image"></div>
            <div class="mini-line"></div>
            <div class="mini-line short"></div>
            <div class="mini-button"></div>
          </div>
        </div>
      </section>

      <section class="stats-grid" aria-label="Campaign summary">
        ${statCard("✉", "Total emails sent", formatNumber(totalSent), "+8.4% this month")}
        ${statCard("◎", "Average open rate", `${avgOpen.toFixed(1)}%`, avgOpen ? "Healthy engagement" : "No sends yet")}
        ${statCard("↗", "Average click rate", `${avgClick.toFixed(1)}%`, avgClick ? "Across sent campaigns" : "No sends yet")}
        ${statCard("♟", "Audience contacts", formatNumber(state.contacts.filter((c) => c.status === "valid").length), "Ready to receive", true)}
      </section>

      <section class="dashboard-grid">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h2>Recent campaigns</h2>
              <p>Your latest drafts, scheduled emails, and sends.</p>
            </div>
            <button class="soft-button compact" data-dashboard-action="campaigns">View all</button>
          </div>
          ${
            recentRows
              ? `<div class="table-wrap">
                  <table class="data-table">
                    <thead>
                      <tr><th>Campaign</th><th>Status</th><th>Date</th><th>Recipients</th><th>Open rate</th></tr>
                    </thead>
                    <tbody>${recentRows}</tbody>
                  </table>
                </div>`
              : emptyState("No campaigns yet", "Create a newsletter to start your campaign history.")
          }
        </div>

        <div class="panel">
          <div class="panel-header">
            <div>
              <h3>Start in three steps</h3>
              <p>A simple workflow from design to send.</p>
            </div>
          </div>
          <div class="quick-list">
            ${quickItem(1, "Choose your layout", "Start blank or use a ready-made template.", "templates")}
            ${quickItem(2, "Design your message", "Drag blocks into the canvas and style them.", "builder")}
            ${quickItem(3, "Add your audience", "Paste emails or import an Excel or CSV file.", "audience")}
          </div>
        </div>
      </section>
    `;
  }

  function bindDashboard() {
    appView.querySelectorAll("[data-dashboard-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.dashboardAction;
        if (action === "create") {
          state.campaignName = "Untitled campaign";
          state.blocks = cloneTemplateBlocks("creator");
          state.selectedBlockId = null;
          pushHistory();
          navigate("builder");
        } else {
          navigate(action);
        }
      });
    });
  }

  function statCard(icon, label, value, trend, neutral = false) {
    return `
      <article class="stat-card">
        <div class="stat-icon">${icon}</div>
        <div class="stat-copy">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(String(value))}</strong>
          <div class="stat-trend ${neutral ? "neutral" : ""}">${escapeHtml(trend)}</div>
        </div>
      </article>
    `;
  }

  function quickItem(number, title, description, target) {
    return `
      <div class="quick-item">
        <div class="quick-number">0${number}</div>
        <div>
          <strong>${escapeHtml(title)}</strong>
          <span>${escapeHtml(description)}</span>
        </div>
        <button data-dashboard-action="${target}" aria-label="Open ${escapeHtml(title)}">→</button>
      </div>
    `;
  }

  /* Builder */
  function renderBuilder() {
    return `
      <section class="builder-shell">
        <aside class="builder-panel elements-panel">
          <h3>Content blocks</h3>
          <p class="panel-note">Drag a block into the canvas or click to add it.</p>
          <div class="block-library">
            ${blockTool("heading", "H", "Heading", "Text")}
            ${blockTool("text", "Aa", "Paragraph", "Text")}
            ${blockTool("richtext", "¶", "Rich text", "Text")}
            ${blockTool("quote", "“", "Quote", "Text")}
            ${blockTool("list", "☷", "List", "Text")}
            ${blockTool("image", "▧", "Image", "Media")}
            ${blockTool("logo", "◇", "Logo", "Media")}
            ${blockTool("gallery", "▦", "Gallery", "Media")}
            ${blockTool("hero", "✦", "Hero", "Layout")}
            ${blockTool("columns", "▥", "Columns", "Layout")}
            ${blockTool("callout", "!", "Callout", "Layout")}
            ${blockTool("product", "$", "Product", "Layout")}
            ${blockTool("button", "↗", "Button", "Actions")}
            ${blockTool("social", "◎", "Social links", "Actions")}
            ${blockTool("divider", " - ", "Divider", "Structure")}
            ${blockTool("spacer", "↕", "Spacer", "Structure")}
          </div>

          <div class="builder-section">
            <h3>Paste a newsletter</h3>
            <p class="panel-note">Paste from Gmail, Outlook, Docs, or another editor. Formatting and images are preserved.</p>
            <div id="newsletterPasteArea" class="paste-newsletter-zone" contenteditable="true" role="textbox" tabindex="0" aria-label="Paste formatted newsletter here">Click here, then press Ctrl+V</div>
          </div>

          <div class="builder-section">
            <h3>Brand palette</h3>
            <p class="panel-note">Choose a palette, then apply any swatch to the selected block.</p>
            <select id="palettePreset" class="compact-select" aria-label="Brand palette preset">
              ${Object.entries(PALETTE_PRESETS).map(([id, preset]) => `<option value="${id}" ${id === state.activePalette ? "selected" : ""}>${escapeHtml(preset.name)}</option>`).join("")}
            </select>
            <select id="paletteTarget" class="compact-select" aria-label="Apply palette color to">
              <option value="accent">Text or accent</option>
              <option value="background">Background</option>
            </select>
            <div class="palette-grid">
              ${state.brandColors.map((color) => paletteSwatch(color, color)).join("")}
            </div>
            <div class="custom-color-row">
              <input id="customPaletteColor" type="color" value="#DB1A1A" aria-label="Custom brand color" />
              <button class="soft-button compact" id="addPaletteColorButton" type="button">Add color</button>
            </div>
          </div>
        </aside>

        <section class="canvas-shell">
          <div class="builder-toolbar">
            <div class="toolbar-group" style="min-width:0;flex:1">
              <input
                id="builderCampaignName"
                class="search-input"
                style="max-width:235px;min-height:38px"
                value="${escapeAttr(state.campaignName)}"
                aria-label="Campaign name"
              />
              <span class="builder-save-state" id="builderSaveState">Saved locally</span>
            </div>
            <div class="toolbar-group">
              <button class="icon-button small" id="undoButton" title="Undo" aria-label="Undo">↶</button>
              <button class="icon-button small" id="redoButton" title="Redo" aria-label="Redo">↷</button>
              <div class="segmented-control">
                <button class="segment ${state.canvasSize === "desktop" ? "active" : ""}" data-canvas-size="desktop">Desktop</button>
                <button class="segment ${state.canvasSize === "mobile" ? "active" : ""}" data-canvas-size="mobile">Mobile</button>
              </div>
              <button class="soft-button compact" id="previewButton">Preview</button>
              <button class="soft-button compact" id="saveTemplateButton">Save template</button>
              <button class="soft-button compact" id="exportHtmlButton">Export HTML</button>
              <button class="primary-button" id="openSendButton">Send</button>
            </div>
          </div>

          <div class="canvas-stage">
            <div id="emailCanvas" class="email-canvas ${state.canvasSize === "mobile" ? "mobile" : ""}" tabindex="0" aria-label="Newsletter canvas. Paste formatted content or images here.">
              ${renderEditorBlocks()}
            </div>
          </div>
        </section>

        <aside class="builder-panel properties-panel">
          <div class="panel-header" style="margin-bottom:13px">
            <div>
              <h3>Block settings</h3>
              <p>Customize the selected block.</p>
            </div>
            ${state.selectedBlockId ? `<button class="danger-button" id="deleteSelectedButton">Delete</button>` : ""}
          </div>
          <div id="propertiesPanel">
            ${renderPropertiesPanel()}
          </div>
        </aside>
      </section>
    `;
  }

  function blockTool(type, icon, label, group = "Block") {
    return `
      <button class="block-tool" type="button" draggable="true" data-block-type="${type}">
        <span>${icon}</span><span>${label}</span><small>${group}</small>
      </button>
    `;
  }

  function paletteSwatch(color, label) {
    return `
      <button
        type="button"
        title="${escapeAttr(label)} ${escapeAttr(color)}"
        data-apply-color="${escapeAttr(color)}"
        aria-label="Apply ${escapeAttr(label)}"
        style="height:34px;border:0;border-radius:11px;background:${escapeAttr(color)};box-shadow:var(--raised-sm);cursor:pointer"
      ></button>
    `;
  }

  function renderEditorBlocks() {
    if (!state.blocks.length) {
      return `
        <div class="canvas-empty">
          <div class="canvas-empty__inner">
            <strong>Drop your first block here</strong>
            Drag an element from the left panel or click any content block to begin.
          </div>
        </div>
      `;
    }

    return state.blocks
      .map(
        (block) => `
          <div
            class="email-block ${block.id === state.selectedBlockId ? "selected" : ""}"
            draggable="true"
            data-block-id="${block.id}"
            data-block-label="${escapeAttr(block.type)}"
          >
            <div class="block-actions">
              <button class="block-action" type="button" data-block-action="duplicate" title="Duplicate">⧉</button>
              <button class="block-action delete" type="button" data-block-action="delete" title="Delete">×</button>
            </div>
            <div class="email-content">${renderBlockContent(block)}</div>
          </div>
        `
      )
      .join("");
  }

  function renderBlockContent(block) {
    const background = escapeAttr(block.background || "#FFFFFF");
    const padding = clampNumber(block.padding, 0, 80, 28);
    const align = ["left", "center", "right"].includes(block.align) ? block.align : "left";

    switch (block.type) {
      case "heading":
        return `
          <div style="background:${background};padding:${padding}px;text-align:${align}">
            <div style="margin:0;color:${escapeAttr(block.color || palette.darkTeal)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:${clampNumber(block.fontSize, 16, 72, 34)}px;font-weight:800;line-height:1.15;letter-spacing:-1px">
              ${nl2br(block.content || "Your heading")}
            </div>
          </div>
        `;

      case "text":
        return `
          <div style="background:${background};padding:${padding}px;text-align:${align}">
            <div style="margin:0;color:${escapeAttr(block.color || palette.ink)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:${clampNumber(block.fontSize, 10, 28, 15)}px;line-height:1.7">
              ${nl2br(block.content || "Add your message here.")}
            </div>
          </div>
        `;

      case "richtext":
        return `
          <div class="rich-email-content" style="background:${background};padding:${padding}px;color:${escapeAttr(block.color || palette.ink)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:${clampNumber(block.fontSize, 10, 28, 15)}px;line-height:1.65">
            ${sanitizeHtml(block.html || "<p>Paste or write formatted content here.</p>")}
          </div>
        `;

      case "hero":
        return `
          <div style="background:${background};padding:${padding}px;text-align:${align};color:${escapeAttr(block.color || palette.ink)};font-family:${escapeAttr(fontStack(block.fontFamily))}">
            <div style="margin-bottom:12px;color:${escapeAttr(block.accentColor || palette.red)};font-size:11px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase">${escapeHtml(block.eyebrow || "YOUR STORY STARTS HERE")}</div>
            <div style="font-size:${clampNumber(block.fontSize, 28, 64, 44)}px;font-weight:800;line-height:1.08;letter-spacing:-1.4px">${nl2br(block.title || "A bold newsletter hero")}</div>
            <div style="max-width:540px;margin:${align === "center" ? "16px auto 0" : "16px 0 0"};font-size:15px;line-height:1.7;opacity:.88">${nl2br(block.text || "Introduce the main idea and give readers a reason to continue.")}</div>
            ${block.buttonLabel ? `<a href="${escapeAttr(sanitizeUrl(block.url || "#"))}" style="display:inline-block;margin-top:22px;padding:13px 21px;border-radius:12px;background:${escapeAttr(block.accentColor || palette.red)};color:#FFFFFF;font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:13px;font-weight:800;text-decoration:none">${escapeHtml(block.buttonLabel)}</a>` : ""}
          </div>
        `;

      case "quote":
        return `
          <div style="background:${background};padding:${padding}px;text-align:${align};color:${escapeAttr(block.color || palette.darkTeal)};font-family:${escapeAttr(fontStack(block.fontFamily || "Lora"))}">
            <div style="font-size:${clampNumber(block.fontSize, 16, 42, 24)}px;font-weight:700;line-height:1.45">“${escapeHtml(block.quote || "A memorable idea belongs here.")}”</div>
            <div style="margin-top:13px;font-family:${escapeAttr(fontStack("Poppins"))};font-size:11px;font-weight:700;letter-spacing:.5px;opacity:.72">${escapeHtml(block.attribution || " - Your name")}</div>
          </div>
        `;

      case "list": {
        const items = String(block.items || "First useful point\nSecond useful point\nThird useful point").split(/\n+/).filter(Boolean);
        const listStyle = block.listStyle || "bullet";
        return `
          <div style="background:${background};padding:${padding}px;color:${escapeAttr(block.color || palette.ink)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:${clampNumber(block.fontSize, 11, 24, 15)}px;line-height:1.6">
            ${block.title ? `<div style="margin-bottom:14px;color:${escapeAttr(block.color || palette.darkTeal)};font-size:20px;font-weight:800">${escapeHtml(block.title)}</div>` : ""}
            ${items.map((item, index) => `<div style="display:flex;gap:11px;margin:9px 0"><span style="display:inline-grid;min-width:24px;height:24px;place-items:center;border-radius:99px;background:${escapeAttr(block.accentColor || palette.teal)};color:${escapeAttr(contrastText(block.accentColor || palette.teal))};font-size:11px;font-weight:800">${listStyle === "numbered" ? index + 1 : listStyle === "check" ? "✓" : "•"}</span><span>${escapeHtml(item.trim())}</span></div>`).join("")}
          </div>
        `;
      }

      case "image":
        return `
          <div style="background:${background};padding:${padding}px">
            ${renderLinkedImage(block)}
          </div>
        `;

      case "logo": {
        const logoContent = block.src
          ? `<img src="${escapeAttr(sanitizeUrl(block.src))}" alt="${escapeAttr(block.alt || "Brand logo")}" style="display:inline-block;width:${clampNumber(block.width, 60, 420, 180)}px;max-width:100%;height:auto" />`
          : `<span style="display:inline-block;color:${escapeAttr(block.color || palette.darkTeal)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:20px;font-weight:800;letter-spacing:1px">${escapeHtml(block.brandText || "YOUR BRAND")}</span>`;
        return `<div style="background:${background};padding:${padding}px;text-align:${align}">${block.url ? `<a href="${escapeAttr(sanitizeUrl(block.url))}" style="text-decoration:none">${logoContent}</a>` : logoContent}</div>`;
      }

      case "gallery":
        return `
          <div style="background:${background};padding:${padding}px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
              <td width="50%" valign="top" style="padding-right:${clampNumber(block.gap, 0, 32, 10) / 2}px">${renderGalleryImage(block.src1, block.link1, block.alt1, block.height, block.radius)}</td>
              <td width="50%" valign="top" style="padding-left:${clampNumber(block.gap, 0, 32, 10) / 2}px">${renderGalleryImage(block.src2, block.link2, block.alt2, block.height, block.radius)}</td>
            </tr></table>
          </div>
        `;

      case "callout":
        return `
          <div style="background:${background};padding:${padding}px;color:${escapeAttr(block.color || palette.ink)};font-family:${escapeAttr(fontStack(block.fontFamily))}">
            <div style="border-left:5px solid ${escapeAttr(block.accentColor || palette.red)};border-radius:${clampNumber(block.radius, 0, 32, 12)}px;padding:20px 22px;background:${escapeAttr(block.cardColor || "#FFFFFF")}">
              <div style="font-size:18px;font-weight:800;line-height:1.3">${escapeHtml(block.title || "Important update")}</div>
              <div style="margin-top:7px;font-size:14px;line-height:1.65">${nl2br(block.text || "Highlight an announcement, offer, reminder, or key takeaway.")}</div>
            </div>
          </div>
        `;

      case "product":
        return `
          <div style="background:${background};padding:${padding}px;font-family:${escapeAttr(fontStack(block.fontFamily))}">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
              <td width="44%" valign="middle" style="padding-right:22px"><img src="${escapeAttr(sanitizeUrl(block.src || placeholderImage()))}" alt="${escapeAttr(block.alt || block.title || "Product")}" style="display:block;width:100%;height:${clampNumber(block.height, 140, 420, 230)}px;object-fit:cover;border-radius:${clampNumber(block.radius, 0, 40, 14)}px" /></td>
              <td width="56%" valign="middle" style="color:${escapeAttr(block.color || palette.ink)}">
                <div style="font-size:23px;font-weight:800;line-height:1.2">${escapeHtml(block.title || "Featured product")}</div>
                <div style="margin-top:8px;font-size:14px;line-height:1.6">${escapeHtml(block.description || "Describe what makes this product or offer worth exploring.")}</div>
                <div style="margin-top:12px;color:${escapeAttr(block.accentColor || palette.red)};font-size:17px;font-weight:800">${escapeHtml(block.price || "$49")}</div>
                <a href="${escapeAttr(sanitizeUrl(block.url || "#"))}" style="display:inline-block;margin-top:16px;padding:11px 18px;border-radius:10px;background:${escapeAttr(block.accentColor || palette.red)};color:#FFFFFF;font-size:12px;font-weight:800;text-decoration:none">${escapeHtml(block.buttonLabel || "Shop now")}</a>
              </td>
            </tr></table>
          </div>
        `;

      case "button":
        return `
          <div style="background:${background};padding:${padding}px;text-align:${align}">
            <a
              href="${escapeAttr(block.url || "#")}"
              style="display:inline-block;padding:13px 22px;border-radius:${clampNumber(block.radius, 0, 99, 12)}px;background:${escapeAttr(block.buttonColor || palette.red)};color:${escapeAttr(block.textColor || "#FFFFFF")};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:14px;font-weight:700;text-decoration:none"
            >${escapeHtml(block.label || "Button")}</a>
          </div>
        `;

      case "divider":
        return `
          <div style="background:${background};padding:${padding}px">
            <div style="width:${clampNumber(block.width, 10, 100, 100)}%;height:${clampNumber(block.thickness, 1, 10, 1)}px;margin:0 auto;background:${escapeAttr(block.color || "#E9DADA")}"></div>
          </div>
        `;

      case "spacer":
        return `<div style="height:${clampNumber(block.height, 8, 220, 35)}px;background:${background}"></div>`;

      case "social":
        return `
          <div style="background:${background};padding:${padding}px;text-align:${align};color:${escapeAttr(block.color || palette.darkTeal)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:13px;font-weight:700">
            ${renderSocialLinks(block)}
          </div>
        `;

      case "columns":
        return `
          <div style="background:${background};padding:${padding}px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td width="50%" valign="top" style="padding:0 10px 0 0">
                  <div style="color:${escapeAttr(block.color || palette.darkTeal)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:17px;font-weight:800">${escapeHtml(block.leftTitle || "First column")}</div>
                  <div style="margin-top:7px;color:${escapeAttr(block.textColor || palette.ink)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:13px;line-height:1.6">${escapeHtml(block.leftText || "Add supporting content here.")}</div>
                </td>
                <td width="50%" valign="top" style="padding:0 0 0 10px">
                  <div style="color:${escapeAttr(block.color || palette.darkTeal)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:17px;font-weight:800">${escapeHtml(block.rightTitle || "Second column")}</div>
                  <div style="margin-top:7px;color:${escapeAttr(block.textColor || palette.ink)};font-family:${escapeAttr(fontStack(block.fontFamily))};font-size:13px;line-height:1.6">${escapeHtml(block.rightText || "Add supporting content here.")}</div>
                </td>
              </tr>
            </table>
          </div>
        `;

      default:
        return "";
    }
  }

  function renderLinkedImage(block) {
    const image = `<img src="${escapeAttr(sanitizeUrl(block.src || placeholderImage()))}" alt="${escapeAttr(block.alt || "")}" style="display:block;width:100%;height:${clampNumber(block.height, 100, 650, 280)}px;object-fit:${escapeAttr(block.fit || "cover")};border-radius:${clampNumber(block.radius, 0, 50, 0)}px" />`;
    return block.url
      ? `<a href="${escapeAttr(sanitizeUrl(block.url))}" target="_blank" style="display:block;text-decoration:none">${image}</a>`
      : image;
  }

  function renderGalleryImage(src, link, alt, height, radius) {
    const image = `<img src="${escapeAttr(sanitizeUrl(src || placeholderImage()))}" alt="${escapeAttr(alt || "Gallery image")}" style="display:block;width:100%;height:${clampNumber(height, 100, 440, 220)}px;object-fit:cover;border-radius:${clampNumber(radius, 0, 40, 12)}px" />`;
    return link ? `<a href="${escapeAttr(sanitizeUrl(link))}" style="display:block">${image}</a>` : image;
  }

  function getSocialItems(block) {
    if (Array.isArray(block.items) && block.items.length) return block.items;
    const labels = String(block.content || "Instagram · LinkedIn · Website")
      .split(/\s*[·|]\s*/)
      .filter(Boolean);
    return labels.map((label, index) => ({
      icon: ["◎", "in", "↗"][index] || "•",
      label,
      url: "#",
    }));
  }

  function renderSocialLinks(block) {
    return getSocialItems(block)
      .map((item) => `
        <a href="${escapeAttr(sanitizeUrl(item.url || "#"))}" style="display:inline-flex;align-items:center;gap:6px;margin:5px 8px;color:${escapeAttr(block.color || palette.darkTeal)};text-decoration:none">
          <span style="display:inline-grid;width:28px;height:28px;place-items:center;border:1px solid currentColor;border-radius:99px;font-size:10px;font-weight:800">${escapeHtml(item.icon || "•")}</span>
          <span>${escapeHtml(item.label || "Social")}</span>
        </a>
      `)
      .join("");
  }

  function fontStack(fontName = "Poppins") {
    const stacks = {
      Poppins: "Poppins, Arial, sans-serif",
      Inter: "Inter, Arial, sans-serif",
      Montserrat: "Montserrat, Arial, sans-serif",
      "Playfair Display": "'Playfair Display', Georgia, serif",
      Lora: "Lora, Georgia, serif",
      Merriweather: "Merriweather, Georgia, serif",
      Arial: "Arial, Helvetica, sans-serif",
      Georgia: "Georgia, 'Times New Roman', serif",
      Verdana: "Verdana, Geneva, sans-serif",
    };
    return stacks[fontName] || stacks.Poppins;
  }

  function sanitizeUrl(value) {
    const url = String(value || "").trim();
    if (!url) return "";
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(url)) return url;
    if (/^data:image\/(png|jpe?g|gif|webp|svg\+xml);/i.test(url)) return url;
    return "#";
  }

  function contrastText(color) {
    const match = String(color || "").match(/^#([0-9a-f]{6})$/i);
    if (!match) return "#FFFFFF";
    const value = parseInt(match[1], 16);
    const red = (value >> 16) & 255;
    const green = (value >> 8) & 255;
    const blue = value & 255;
    return red * 0.299 + green * 0.587 + blue * 0.114 > 165 ? "#193845" : "#FFFFFF";
  }

  function renderPropertiesPanel() {
    const block = state.blocks.find((item) => item.id === state.selectedBlockId);
    if (!block) {
      return `
        <div class="property-empty">
          <div>
            <div style="font-size:25px;margin-bottom:8px">✦</div>
            Select a block on the canvas<br />to edit its content and style.
          </div>
        </div>
      `;
    }

    const common = ["heading", "text", "richtext", "image", "logo", "gallery", "hero", "quote", "list", "callout", "product", "button", "divider", "social", "columns"].includes(block.type)
      ? `
        ${numberField("Padding", "padding", block.padding ?? 28, 0, 80)}
        ${colorField("Background", "background", block.background || "#FFFFFF")}
      `
      : "";

    let specific = "";

    if (block.type === "heading" || block.type === "text") {
      specific = `
        ${textAreaField("Content", "content", block.content || "")}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${numberField("Font size", "fontSize", block.fontSize || (block.type === "heading" ? 34 : 15), block.type === "heading" ? 16 : 10, block.type === "heading" ? 72 : 28)}
        ${selectField("Alignment", "align", block.align || "left", [
          ["left", "Left"],
          ["center", "Center"],
          ["right", "Right"],
        ])}
        ${colorField("Text color", "color", block.color || palette.ink)}
      `;
    }

    if (block.type === "image") {
      specific = `
        ${imageUploadField("Choose image from computer", "src")}
        ${textField("Image URL", "src", block.src || "")}
        ${textField("Image hyperlink", "url", block.url || "")}
        ${textField("Alt text", "alt", block.alt || "")}
        ${numberField("Image height", "height", block.height || 280, 100, 650)}
        ${numberField("Corner radius", "radius", block.radius || 0, 0, 50)}
        ${selectField("Image fit", "fit", block.fit || "cover", [
          ["cover", "Crop to fill"],
          ["contain", "Show full image"],
        ])}
      `;
    }

    if (block.type === "richtext") {
      specific = `
        <div class="property-help">Formatted content pasted into the canvas is safely cleaned before it is saved. You can also edit the HTML below.</div>
        ${textAreaField("Formatted HTML", "html", block.html || "")}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${numberField("Font size", "fontSize", block.fontSize || 15, 10, 28)}
        ${colorField("Text color", "color", block.color || palette.ink)}
      `;
    }

    if (block.type === "hero") {
      specific = `
        ${textField("Eyebrow", "eyebrow", block.eyebrow || "")}
        ${textAreaField("Headline", "title", block.title || "")}
        ${textAreaField("Supporting text", "text", block.text || "")}
        ${textField("Button text", "buttonLabel", block.buttonLabel || "")}
        ${textField("Button URL", "url", block.url || "#")}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${numberField("Headline size", "fontSize", block.fontSize || 44, 28, 64)}
        ${selectField("Alignment", "align", block.align || "left", [["left", "Left"], ["center", "Center"], ["right", "Right"]])}
        ${colorField("Text color", "color", block.color || palette.ink)}
        ${colorField("Accent color", "accentColor", block.accentColor || palette.red)}
      `;
    }

    if (block.type === "quote") {
      specific = `
        ${textAreaField("Quote", "quote", block.quote || "")}
        ${textField("Attribution", "attribution", block.attribution || "")}
        ${selectField("Font", "fontFamily", block.fontFamily || "Lora", FONT_OPTIONS)}
        ${numberField("Font size", "fontSize", block.fontSize || 24, 16, 42)}
        ${selectField("Alignment", "align", block.align || "center", [["left", "Left"], ["center", "Center"], ["right", "Right"]])}
        ${colorField("Text color", "color", block.color || palette.darkTeal)}
      `;
    }

    if (block.type === "list") {
      specific = `
        ${textField("List heading", "title", block.title || "")}
        ${textAreaField("Items (one per line)", "items", block.items || "")}
        ${selectField("List style", "listStyle", block.listStyle || "bullet", [["bullet", "Bullets"], ["numbered", "Numbers"], ["check", "Checks"]])}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${numberField("Font size", "fontSize", block.fontSize || 15, 11, 24)}
        ${colorField("Text color", "color", block.color || palette.ink)}
        ${colorField("Marker color", "accentColor", block.accentColor || palette.teal)}
      `;
    }

    if (block.type === "logo") {
      specific = `
        ${imageUploadField("Upload logo", "src")}
        ${textField("Logo image URL", "src", block.src || "")}
        ${textField("Text logo (used when image is empty)", "brandText", block.brandText || "YOUR BRAND")}
        ${textField("Logo hyperlink", "url", block.url || "")}
        ${textField("Alt text", "alt", block.alt || "")}
        ${numberField("Logo width", "width", block.width || 180, 60, 420)}
        ${selectField("Alignment", "align", block.align || "center", [["left", "Left"], ["center", "Center"], ["right", "Right"]])}
        ${selectField("Text logo font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${colorField("Text logo color", "color", block.color || palette.darkTeal)}
      `;
    }

    if (block.type === "gallery") {
      specific = `
        ${imageUploadField("Upload left image", "src1")}
        ${textField("Left image URL", "src1", block.src1 || "")}
        ${textField("Left hyperlink", "link1", block.link1 || "")}
        ${imageUploadField("Upload right image", "src2")}
        ${textField("Right image URL", "src2", block.src2 || "")}
        ${textField("Right hyperlink", "link2", block.link2 || "")}
        ${numberField("Image height", "height", block.height || 220, 100, 440)}
        ${numberField("Gap", "gap", block.gap || 10, 0, 32)}
        ${numberField("Corner radius", "radius", block.radius || 12, 0, 40)}
      `;
    }

    if (block.type === "callout") {
      specific = `
        ${textField("Heading", "title", block.title || "")}
        ${textAreaField("Message", "text", block.text || "")}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${colorField("Text color", "color", block.color || palette.ink)}
        ${colorField("Accent color", "accentColor", block.accentColor || palette.red)}
        ${colorField("Card color", "cardColor", block.cardColor || "#FFFFFF")}
        ${numberField("Corner radius", "radius", block.radius || 12, 0, 32)}
      `;
    }

    if (block.type === "product") {
      specific = `
        ${imageUploadField("Upload product image", "src")}
        ${textField("Image URL", "src", block.src || "")}
        ${textField("Product name", "title", block.title || "")}
        ${textAreaField("Description", "description", block.description || "")}
        ${textField("Price", "price", block.price || "")}
        ${textField("Button text", "buttonLabel", block.buttonLabel || "")}
        ${textField("Button URL", "url", block.url || "#")}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${colorField("Text color", "color", block.color || palette.ink)}
        ${colorField("Accent color", "accentColor", block.accentColor || palette.red)}
        ${numberField("Image height", "height", block.height || 230, 140, 420)}
        ${numberField("Image radius", "radius", block.radius || 14, 0, 40)}
      `;
    }

    if (block.type === "button") {
      specific = `
        ${textField("Button text", "label", block.label || "Button")}
        ${textField("Destination URL", "url", block.url || "#")}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${selectField("Alignment", "align", block.align || "left", [
          ["left", "Left"],
          ["center", "Center"],
          ["right", "Right"],
        ])}
        ${colorField("Button color", "buttonColor", block.buttonColor || palette.red)}
        ${colorField("Text color", "textColor", block.textColor || "#FFFFFF")}
        ${numberField("Corner radius", "radius", block.radius || 12, 0, 99)}
      `;
    }

    if (block.type === "divider") {
      specific = `
        ${colorField("Line color", "color", block.color || "#E9DADA")}
        ${numberField("Width (%)", "width", block.width || 100, 10, 100)}
        ${numberField("Thickness", "thickness", block.thickness || 1, 1, 10)}
      `;
    }

    if (block.type === "spacer") {
      specific = `
        ${numberField("Spacer height", "height", block.height || 35, 8, 220)}
        ${colorField("Background", "background", block.background || "#FFFFFF")}
      `;
    }

    if (block.type === "social") {
      specific = `
        ${renderSocialEditor(block)}
        <button type="button" class="soft-button compact" data-add-social>Add social link</button>
        ${selectField("Alignment", "align", block.align || "center", [
          ["left", "Left"],
          ["center", "Center"],
          ["right", "Right"],
        ])}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${colorField("Text color", "color", block.color || palette.darkTeal)}
      `;
    }

    if (block.type === "columns") {
      specific = `
        ${textField("Left heading", "leftTitle", block.leftTitle || "")}
        ${textAreaField("Left content", "leftText", block.leftText || "")}
        ${textField("Right heading", "rightTitle", block.rightTitle || "")}
        ${textAreaField("Right content", "rightText", block.rightText || "")}
        ${selectField("Font", "fontFamily", block.fontFamily || "Poppins", FONT_OPTIONS)}
        ${colorField("Heading color", "color", block.color || palette.darkTeal)}
        ${colorField("Text color", "textColor", block.textColor || palette.ink)}
      `;
    }

    return `<form class="properties-form" id="propertiesForm">${specific}${common}</form>`;
  }

  function textField(label, property, value) {
    return `
      <label>${escapeHtml(label)}
        <input type="text" data-property="${property}" value="${escapeAttr(value)}" />
      </label>
    `;
  }

  function textAreaField(label, property, value) {
    return `
      <label>${escapeHtml(label)}
        <textarea data-property="${property}">${escapeHtml(value)}</textarea>
      </label>
    `;
  }

  function imageUploadField(label, property) {
    return `
      <label class="file-property-control">${escapeHtml(label)}
        <input type="file" accept="image/*" data-image-property="${escapeAttr(property)}" />
        <span class="file-property-button">Choose local file</span>
      </label>
    `;
  }

  function renderSocialEditor(block) {
    return `
      <div class="social-link-editor">
        ${getSocialItems(block).map((item, index) => `
          <div class="social-link-row">
            <input type="text" value="${escapeAttr(item.icon || "")}" data-social-index="${index}" data-social-key="icon" aria-label="Social icon" placeholder="Icon" />
            <input type="text" value="${escapeAttr(item.label || "")}" data-social-index="${index}" data-social-key="label" aria-label="Social label" placeholder="Label" />
            <input type="url" value="${escapeAttr(item.url || "")}" data-social-index="${index}" data-social-key="url" aria-label="Social URL" placeholder="https://" />
            <button type="button" class="danger-button" data-remove-social="${index}" aria-label="Remove ${escapeAttr(item.label || "social link")}">×</button>
          </div>
        `).join("")}
      </div>
    `;
  }

  function numberField(label, property, value, min, max) {
    return `
      <label>${escapeHtml(label)}
        <input type="number" min="${min}" max="${max}" data-property="${property}" value="${escapeAttr(value)}" />
      </label>
    `;
  }

  function colorField(label, property, value) {
    const safeValue = normalizeHex(value, "#FFFFFF");
    return `
      <label>${escapeHtml(label)}
        <div class="color-row">
          <input type="color" data-property="${property}" value="${safeValue}" />
          <input type="text" data-property="${property}" value="${escapeAttr(value)}" />
        </div>
      </label>
    `;
  }

  function selectField(label, property, current, options) {
    return `
      <label>${escapeHtml(label)}
        <select data-property="${property}">
          ${options
            .map(([value, text]) => `<option value="${escapeAttr(value)}" ${value === current ? "selected" : ""}>${escapeHtml(text)}</option>`)
            .join("")}
        </select>
      </label>
    `;
  }

  function bindBuilder() {
    const canvas = document.getElementById("emailCanvas");
    const campaignNameInput = document.getElementById("builderCampaignName");
    const propertiesPanel = document.getElementById("propertiesPanel");

    campaignNameInput.addEventListener("input", () => {
      state.campaignName = campaignNameInput.value || "Untitled campaign";
      scheduleSaveIndicator();
    });

    appView.querySelectorAll(".block-tool").forEach((tool) => {
      tool.addEventListener("dragstart", (event) => {
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("text/block-type", tool.dataset.blockType);
      });

      tool.addEventListener("click", () => {
        addBlock(tool.dataset.blockType);
      });
    });

    appView.querySelectorAll("[data-apply-color]").forEach((swatch) => {
      swatch.addEventListener("click", () => applyPaletteColor(swatch.dataset.applyColor));
    });

    document.getElementById("palettePreset").addEventListener("change", (event) => {
      const preset = PALETTE_PRESETS[event.target.value];
      if (!preset) return;
      state.activePalette = event.target.value;
      state.brandColors = [...preset.colors];
      saveState();
      renderCurrentView();
      showToast("Palette updated", `${preset.name} is ready to use.`);
    });

    document.getElementById("addPaletteColorButton").addEventListener("click", () => {
      const color = document.getElementById("customPaletteColor").value;
      if (!state.brandColors.includes(color)) state.brandColors.push(color);
      state.brandColors = state.brandColors.slice(-10);
      saveState();
      renderCurrentView();
      showToast("Brand color added", color);
    });

    const pasteArea = document.getElementById("newsletterPasteArea");
    pasteArea.addEventListener("focus", () => {
      if (pasteArea.textContent.includes("Ctrl+V")) pasteArea.textContent = "";
    });
    pasteArea.addEventListener("blur", () => {
      if (!pasteArea.textContent.trim()) pasteArea.textContent = "Click here, then press Ctrl+V";
    });
    pasteArea.addEventListener("paste", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      await importClipboardData(event.clipboardData);
      pasteArea.textContent = "Click here, then press Ctrl+V";
    });

    canvas.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = state.draggedBlockId ? "move" : "copy";
    });

    canvas.addEventListener("drop", async (event) => {
      event.preventDefault();
      const imageFiles = [...event.dataTransfer.files].filter((file) => file.type.startsWith("image/"));
      if (imageFiles.length) {
        await addImageFiles(imageFiles, getDropIndex(canvas, event.clientY));
        return;
      }
      const type = event.dataTransfer.getData("text/block-type");
      const movingId = event.dataTransfer.getData("text/block-id");
      const index = getDropIndex(canvas, event.clientY);

      if (type) {
        snapshotBeforeChange();
        const block = createBlock(type);
        state.blocks.splice(index, 0, block);
        state.selectedBlockId = block.id;
        commitBuilderChange();
      } else if (movingId) {
        const oldIndex = state.blocks.findIndex((block) => block.id === movingId);
        if (oldIndex < 0) return;
        snapshotBeforeChange();
        const [block] = state.blocks.splice(oldIndex, 1);
        const adjustedIndex = oldIndex < index ? index - 1 : index;
        state.blocks.splice(Math.max(0, adjustedIndex), 0, block);
        state.selectedBlockId = block.id;
        commitBuilderChange();
      }
      state.draggedBlockId = null;
    });

    canvas.querySelectorAll(".email-block").forEach((element) => {
      element.addEventListener("click", (event) => {
        const action = event.target.closest("[data-block-action]");
        const blockId = element.dataset.blockId;

        if (action) {
          event.stopPropagation();
          if (action.dataset.blockAction === "delete") deleteBlock(blockId);
          if (action.dataset.blockAction === "duplicate") duplicateBlock(blockId);
          return;
        }

        state.selectedBlockId = blockId;
        refreshBuilderCanvasAndProperties();
      });

      element.addEventListener("dragstart", (event) => {
        state.draggedBlockId = element.dataset.blockId;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/block-id", element.dataset.blockId);
      });

      element.addEventListener("dragend", () => {
        state.draggedBlockId = null;
      });
    });

    propertiesPanel.addEventListener("input", handlePropertyChange);
    propertiesPanel.addEventListener("change", handlePropertyChange);
    propertiesPanel.addEventListener("change", handlePropertyPanelChange);
    propertiesPanel.addEventListener("click", handlePropertyPanelClick);

    const deleteSelectedButton = document.getElementById("deleteSelectedButton");
    if (deleteSelectedButton) {
      deleteSelectedButton.addEventListener("click", () => deleteBlock(state.selectedBlockId));
    }

    appView.querySelectorAll("[data-canvas-size]").forEach((button) => {
      button.addEventListener("click", () => {
        state.canvasSize = button.dataset.canvasSize;
        saveState();
        renderCurrentView();
      });
    });

    document.getElementById("previewButton").addEventListener("click", openPreview);
    document.getElementById("saveTemplateButton").addEventListener("click", saveCurrentAsTemplate);
    document.getElementById("exportHtmlButton").addEventListener("click", exportNewsletterHtml);
    document.getElementById("openSendButton").addEventListener("click", openSendModal);
    document.getElementById("undoButton").addEventListener("click", undo);
    document.getElementById("redoButton").addEventListener("click", redo);
  }

  function handlePropertyChange(event) {
    const socialInput = event.target.closest("[data-social-index]");
    const input = event.target.closest("[data-property]");
    if ((!input && !socialInput) || !state.selectedBlockId) return;

    const block = state.blocks.find((item) => item.id === state.selectedBlockId);
    if (!block) return;

    if (socialInput) {
      if (!Array.isArray(block.items)) block.items = getSocialItems(block);
      const item = block.items[Number(socialInput.dataset.socialIndex)];
      if (!item) return;
      item[socialInput.dataset.socialKey] = socialInput.value;
      const canvas = document.getElementById("emailCanvas");
      const blockElement = canvas?.querySelector(`[data-block-id="${cssEscape(block.id)}"] .email-content`);
      if (blockElement) blockElement.innerHTML = renderBlockContent(block);
      scheduleSaveIndicator();
      return;
    }

    if (!input.dataset.historyCaptured) {
      snapshotBeforeChange();
      input.dataset.historyCaptured = "true";
      input.addEventListener(
        "blur",
        () => {
          delete input.dataset.historyCaptured;
        },
        { once: true }
      );
    }

    const property = input.dataset.property;
    const numberProperties = ["padding", "fontSize", "height", "radius", "width", "thickness", "gap"];
    block[property] = numberProperties.includes(property) ? Number(input.value) : input.value;

    // Synchronize paired color inputs.
    if (input.type === "color" || (input.type === "text" && input.closest(".color-row"))) {
      input.closest(".color-row")
        ?.querySelectorAll(`[data-property="${property}"]`)
        .forEach((pair) => {
          if (pair !== input) pair.value = input.value;
        });
    }

    const canvas = document.getElementById("emailCanvas");
    const blockElement = canvas?.querySelector(`[data-block-id="${cssEscape(block.id)}"] .email-content`);
    if (blockElement) blockElement.innerHTML = renderBlockContent(block);
    scheduleSaveIndicator();
  }

  async function handlePropertyPanelChange(event) {
    const fileInput = event.target.closest("[data-image-property]");
    if (!fileInput || !fileInput.files?.[0] || !state.selectedBlockId) return;
    const block = state.blocks.find((item) => item.id === state.selectedBlockId);
    if (!block) return;

    try {
      const dataUrl = await prepareImageFile(fileInput.files[0]);
      snapshotBeforeChange();
      block[fileInput.dataset.imageProperty] = dataUrl;
      if (!block.alt) block.alt = fileNameToAlt(fileInput.files[0].name);
      commitBuilderChange();
      showToast("Image added", `${fileInput.files[0].name} is now in your newsletter.`);
    } catch (error) {
      showToast("Image could not be added", error.message || "Choose a valid image file.", "error");
    }
  }

  function handlePropertyPanelClick(event) {
    const addButton = event.target.closest("[data-add-social]");
    const removeButton = event.target.closest("[data-remove-social]");
    if ((!addButton && !removeButton) || !state.selectedBlockId) return;

    const block = state.blocks.find((item) => item.id === state.selectedBlockId);
    if (!block || block.type !== "social") return;
    snapshotBeforeChange();
    block.items = getSocialItems(block).map((item) => ({ ...item }));

    if (addButton) {
      block.items.push({ icon: "↗", label: "New link", url: "https://" });
    } else {
      block.items.splice(Number(removeButton.dataset.removeSocial), 1);
    }

    commitBuilderChange();
  }

  function applyPaletteColor(color) {
    const block = state.blocks.find((item) => item.id === state.selectedBlockId);
    if (!block) {
      navigator.clipboard?.writeText(color).catch(() => {});
      showToast("Color copied", `${color} - select a block to apply it directly.`);
      return;
    }

    const target = document.getElementById("paletteTarget")?.value || "accent";
    snapshotBeforeChange();
    if (target === "background") {
      block.background = color;
    } else if (block.type === "button") {
      block.buttonColor = color;
    } else if (["hero", "list", "callout", "product"].includes(block.type)) {
      block.accentColor = color;
    } else if (block.type === "divider") {
      block.color = color;
    } else if (block.type === "image" || block.type === "gallery") {
      block.background = color;
    } else {
      block.color = color;
    }
    commitBuilderChange();
    showToast("Color applied", `${color} was applied to the selected block.`);
  }

  function handleBuilderCopy(event) {
    if (state.view !== "builder" || isEditableTarget(event.target) || !state.selectedBlockId) return;
    const block = state.blocks.find((item) => item.id === state.selectedBlockId);
    if (!block || !event.clipboardData) return;
    copiedBlock = deepClone(block);
    event.preventDefault();
    event.clipboardData.setData("text/plain", `LAYOUTLETTER_BLOCK:${JSON.stringify(copiedBlock)}`);
    showToast("Block copied", "Press Ctrl+V anywhere on the canvas to paste it.");
  }

  async function handleBuilderPaste(event) {
    if (state.view !== "builder" || isEditableTarget(event.target) || !event.clipboardData) return;
    event.preventDefault();
    await importClipboardData(event.clipboardData);
  }

  async function importClipboardData(clipboardData) {
    const images = [...(clipboardData.items || [])]
      .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter(Boolean);

    if (images.length) {
      await addImageFiles(images);
      return;
    }

    const plainText = clipboardData.getData("text/plain") || "";
    if (plainText.startsWith("LAYOUTLETTER_BLOCK:")) {
      try {
        const pasted = JSON.parse(plainText.slice("LAYOUTLETTER_BLOCK:".length));
        snapshotBeforeChange();
        pasted.id = uid();
        state.blocks.push(pasted);
        state.selectedBlockId = pasted.id;
        commitBuilderChange();
        showToast("Block pasted", `${capitalize(pasted.type)} was added to the canvas.`);
        return;
      } catch {
        // Continue to normal text paste if the clipboard marker is incomplete.
      }
    }

    if (!plainText && copiedBlock) {
      snapshotBeforeChange();
      const pasted = { ...deepClone(copiedBlock), id: uid() };
      state.blocks.push(pasted);
      state.selectedBlockId = pasted.id;
      commitBuilderChange();
      return;
    }

    const html = clipboardData.getData("text/html");
    if (html && stripHtml(html).trim()) {
      addRichTextBlock(sanitizeHtml(html), "Formatted newsletter pasted");
      return;
    }

    if (plainText.trim()) {
      const paragraphs = plainText
        .trim()
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
        .join("");
      addRichTextBlock(paragraphs, "Text pasted");
      return;
    }

    showToast("Nothing to paste", "Copy a block, image, formatted email, or text first.", "error");
  }

  function addRichTextBlock(html, toastTitle) {
    snapshotBeforeChange();
    const block = createBlock("richtext");
    block.html = html;
    state.blocks.push(block);
    state.selectedBlockId = block.id;
    commitBuilderChange();
    showToast(toastTitle, "The content is now an editable rich-content block.");
  }

  async function addImageFiles(files, index = state.blocks.length) {
    const validFiles = files.filter((file) => file?.type?.startsWith("image/"));
    if (!validFiles.length) return;
    try {
      const sources = await Promise.all(validFiles.map(prepareImageFile));
      snapshotBeforeChange();
      const blocks = sources.map((src, fileIndex) => ({
        ...createBlock("image"),
        src,
        alt: fileNameToAlt(validFiles[fileIndex].name),
      }));
      state.blocks.splice(index, 0, ...blocks);
      state.selectedBlockId = blocks[blocks.length - 1].id;
      commitBuilderChange();
      showToast("Images added", `${blocks.length} local image${blocks.length === 1 ? "" : "s"} added to the canvas.`);
    } catch (error) {
      showToast("Image could not be added", error.message || "Choose a valid image file.", "error");
    }
  }

  async function prepareImageFile(file) {
    if (!file || !file.type.startsWith("image/")) throw new Error("The selected file is not an image.");
    if (file.type === "image/gif" || file.type === "image/svg+xml") return readFileAsDataUrl(file);

    const original = await readFileAsDataUrl(file);
    const image = await loadImage(original);
    const maxDimension = 1600;
    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
    return canvas.toDataURL(mime, mime === "image/jpeg" ? 0.86 : undefined);
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("The image file could not be read."));
      reader.readAsDataURL(file);
    });
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("The image file could not be decoded."));
      image.src = src;
    });
  }

  function fileNameToAlt(name) {
    return String(name || "Newsletter image")
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .trim();
  }

  function isEditableTarget(target) {
    return Boolean(target?.closest?.("input, textarea, select, [contenteditable='true']"));
  }

  function saveCurrentAsTemplate() {
    if (!state.blocks.length) {
      showToast("Nothing to save", "Add at least one block before creating a template.", "error");
      return;
    }
    const suggested = state.campaignName && state.campaignName !== "Untitled campaign" ? state.campaignName : "My newsletter template";
    document.getElementById("templateNameInput").value = suggested;
    openModal("templateModal");
    setTimeout(() => document.getElementById("templateNameInput").focus(), 0);
  }

  function handleSaveTemplateSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("templateNameInput").value.trim();
    if (!name) return;
    state.customTemplates.unshift({
      id: `custom_${uid()}`,
      name,
      description: "A reusable template saved from your builder.",
      accent: "custom",
      custom: true,
      createdAt: new Date().toISOString(),
      blocks: state.blocks.map((block) => ({ ...deepClone(block), id: uid() })),
    });
    saveState();
    closeModal("templateModal");
    showToast("Template created", `${name} is now available in the Templates tab.`);
  }

  function exportNewsletterHtml() {
    const blob = new Blob([generateEmailDocument()], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(state.campaignName || "newsletter")}.html`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("HTML exported", "Your newsletter is ready to upload or share.");
  }

  function addBlock(type) {
    snapshotBeforeChange();
    const block = createBlock(type);
    state.blocks.push(block);
    state.selectedBlockId = block.id;
    commitBuilderChange();
    showToast("Block added", `${capitalize(type)} was added to your newsletter.`);
  }

  function deleteBlock(blockId) {
    if (!blockId) return;
    snapshotBeforeChange();
    state.blocks = state.blocks.filter((block) => block.id !== blockId);
    state.selectedBlockId = null;
    commitBuilderChange();
  }

  function duplicateBlock(blockId) {
    const index = state.blocks.findIndex((block) => block.id === blockId);
    if (index < 0) return;
    snapshotBeforeChange();
    const copy = deepClone(state.blocks[index]);
    copy.id = uid();
    state.blocks.splice(index + 1, 0, copy);
    state.selectedBlockId = copy.id;
    commitBuilderChange();
  }

  function commitBuilderChange() {
    state.future = [];
    saveState();
    renderCurrentView();
  }

  function refreshBuilderCanvasAndProperties() {
    const canvas = document.getElementById("emailCanvas");
    const propertiesPanel = document.getElementById("propertiesPanel");
    if (!canvas || !propertiesPanel) return;

    canvas.innerHTML = renderEditorBlocks();
    propertiesPanel.innerHTML = renderPropertiesPanel();
    bindBuilderCanvasSubset(canvas, propertiesPanel);

    const deleteButton = document.getElementById("deleteSelectedButton");
    if (deleteButton) deleteButton.remove();
    const panelHeader = appView.querySelector(".properties-panel .panel-header");
    if (state.selectedBlockId && panelHeader) {
      panelHeader.insertAdjacentHTML("beforeend", `<button class="danger-button" id="deleteSelectedButton">Delete</button>`);
      document.getElementById("deleteSelectedButton").addEventListener("click", () => deleteBlock(state.selectedBlockId));
    }
  }

  function bindBuilderCanvasSubset(canvas, propertiesPanel) {
    canvas.querySelectorAll(".email-block").forEach((element) => {
      element.addEventListener("click", (event) => {
        const action = event.target.closest("[data-block-action]");
        const blockId = element.dataset.blockId;
        if (action) {
          event.stopPropagation();
          if (action.dataset.blockAction === "delete") deleteBlock(blockId);
          if (action.dataset.blockAction === "duplicate") duplicateBlock(blockId);
          return;
        }
        state.selectedBlockId = blockId;
        refreshBuilderCanvasAndProperties();
      });

      element.addEventListener("dragstart", (event) => {
        state.draggedBlockId = element.dataset.blockId;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/block-id", element.dataset.blockId);
      });
    });

    propertiesPanel.addEventListener("input", handlePropertyChange);
    propertiesPanel.addEventListener("change", handlePropertyChange);
    propertiesPanel.addEventListener("change", handlePropertyPanelChange);
    propertiesPanel.addEventListener("click", handlePropertyPanelClick);
  }

  function createBlock(type) {
    const base = {
      id: uid(),
      type,
      padding: 28,
      background: "#FFFFFF",
    };

    const types = {
      heading: {
        ...base,
        content: "A beautiful new heading",
        fontSize: 34,
        color: palette.darkTeal,
        align: "left",
        fontFamily: "Poppins",
      },
      text: {
        ...base,
        content: "Write something meaningful for your audience. Keep it clear, useful, and easy to read.",
        fontSize: 15,
        color: palette.ink,
        align: "left",
        fontFamily: "Poppins",
      },
      richtext: {
        ...base,
        html: "<p><strong>Paste formatted content</strong> or edit this rich text in block settings.</p>",
        fontSize: 15,
        color: palette.ink,
        fontFamily: "Poppins",
      },
      hero: {
        ...base,
        eyebrow: "FEATURED STORY",
        title: "Give your main idea room to shine.",
        text: "Use this section for a launch, announcement, lead story, or welcome message.",
        buttonLabel: "Learn more",
        url: "#",
        align: "left",
        fontSize: 44,
        color: palette.ink,
        accentColor: palette.red,
        fontFamily: "Poppins",
        padding: 44,
        background: palette.blush,
      },
      quote: {
        ...base,
        quote: "A memorable idea belongs here.",
        attribution: " - Your name",
        fontSize: 24,
        color: palette.darkTeal,
        align: "center",
        fontFamily: "Lora",
        background: "#EAF6F5",
        padding: 38,
      },
      list: {
        ...base,
        title: "Key takeaways",
        items: "First useful point\nSecond useful point\nThird useful point",
        listStyle: "check",
        fontSize: 15,
        color: palette.ink,
        accentColor: palette.teal,
        fontFamily: "Poppins",
      },
      image: {
        ...base,
        src: placeholderImage(),
        alt: "Newsletter image",
        url: "",
        height: 280,
        radius: 16,
        fit: "cover",
      },
      logo: {
        ...base,
        src: "",
        alt: "Brand logo",
        brandText: "YOUR BRAND",
        url: "#",
        width: 180,
        align: "center",
        color: palette.darkTeal,
        fontFamily: "Poppins",
      },
      gallery: {
        ...base,
        src1: placeholderImage(),
        src2: placeholderImage(),
        link1: "",
        link2: "",
        alt1: "Left gallery image",
        alt2: "Right gallery image",
        height: 220,
        gap: 10,
        radius: 12,
      },
      callout: {
        ...base,
        title: "Important update",
        text: "Highlight an announcement, offer, reminder, or key takeaway.",
        color: palette.ink,
        accentColor: palette.red,
        cardColor: "#FFFFFF",
        radius: 12,
        fontFamily: "Poppins",
        background: palette.blush,
      },
      product: {
        ...base,
        src: placeholderImage(),
        alt: "Featured product",
        title: "Featured product",
        description: "Describe what makes this product or offer worth exploring.",
        price: "$49",
        buttonLabel: "Shop now",
        url: "#",
        height: 230,
        radius: 14,
        color: palette.ink,
        accentColor: palette.red,
        fontFamily: "Poppins",
      },
      button: {
        ...base,
        label: "Learn more",
        url: "#",
        buttonColor: palette.red,
        textColor: "#FFFFFF",
        align: "left",
        radius: 12,
        fontFamily: "Poppins",
      },
      divider: {
        ...base,
        color: "#E9DADA",
        width: 100,
        thickness: 1,
      },
      spacer: {
        id: base.id,
        type,
        height: 35,
        background: "#FFFFFF",
      },
      social: {
        ...base,
        items: [
          { icon: "◎", label: "Instagram", url: "https://instagram.com" },
          { icon: "in", label: "LinkedIn", url: "https://linkedin.com" },
          { icon: "↗", label: "Website", url: "https://example.com" },
        ],
        color: palette.darkTeal,
        align: "center",
        fontFamily: "Poppins",
      },
      columns: {
        ...base,
        leftTitle: "First idea",
        leftText: "Share a useful detail or benefit here.",
        rightTitle: "Second idea",
        rightText: "Add another concise supporting point.",
        color: palette.darkTeal,
        textColor: palette.ink,
        fontFamily: "Poppins",
      },
    };

    return types[type] || types.text;
  }

  function getDropIndex(container, clientY) {
    const elements = [...container.querySelectorAll(".email-block:not(.dragging)")];
    let closest = { offset: Number.NEGATIVE_INFINITY, index: elements.length };

    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const offset = clientY - rect.top - rect.height / 2;
      if (offset < 0 && offset > closest.offset) {
        closest = { offset, index };
      }
    });

    return closest.index;
  }

  function snapshotBeforeChange() {
    state.history.push(JSON.stringify(state.blocks));
    if (state.history.length > 40) state.history.shift();
  }

  function pushHistory() {
    state.history = [JSON.stringify(state.blocks)];
    state.future = [];
  }

  function undo() {
    if (!state.history.length) {
      showToast("Nothing to undo", "Your current design is the earliest saved state.");
      return;
    }
    state.future.push(JSON.stringify(state.blocks));
    state.blocks = JSON.parse(state.history.pop());
    state.selectedBlockId = null;
    saveState();
    renderCurrentView();
  }

  function redo() {
    if (!state.future.length) {
      showToast("Nothing to redo", "There are no newer design changes.");
      return;
    }
    state.history.push(JSON.stringify(state.blocks));
    state.blocks = JSON.parse(state.future.pop());
    state.selectedBlockId = null;
    saveState();
    renderCurrentView();
  }

  function scheduleSaveIndicator() {
    const indicator = document.getElementById("builderSaveState");
    if (indicator) indicator.textContent = "Saving…";
    clearTimeout(scheduleSaveIndicator.timer);
    scheduleSaveIndicator.timer = setTimeout(() => {
      saveState();
      const current = document.getElementById("builderSaveState");
      if (current) current.textContent = "Saved locally";
    }, 350);
  }

  /* Templates */
  function renderTemplates() {
    const availableTemplates = getAllTemplates();
    return `
      <section class="section-heading">
        <div>
          <span class="eyebrow">READY-TO-USE DESIGNS</span>
          <h2>Start polished, then make it yours.</h2>
          <p>Every card below shows the template’s real content and layout. Preview it full-size or open it in the builder.</p>
        </div>
        <span class="template-count">${availableTemplates.length} templates</span>
      </section>

      <section class="template-grid">
        ${availableTemplates.map(renderTemplateCard).join("")}
      </section>
    `;
  }

  function renderTemplateCard(template) {
    return `
      <article class="template-card">
        <div class="template-preview">
          <div class="template-live-preview">
            ${template.blocks.map(renderBlockContent).join("")}
          </div>
          ${template.custom ? `<span class="custom-template-badge">Your template</span>` : ""}
        </div>
        <div class="template-card__body">
          <div>
            <h3>${escapeHtml(template.name)}</h3>
            <p>${escapeHtml(template.description)}</p>
          </div>
          <div class="template-card__actions">
            <button class="soft-button compact" data-preview-template="${template.id}">Preview</button>
            <button class="primary-button" data-use-template="${template.id}">Use</button>
            ${template.custom ? `<button class="danger-button" data-delete-template="${template.id}">Delete</button>` : ""}
          </div>
        </div>
      </article>
    `;
  }

  function bindTemplates() {
    appView.querySelectorAll("[data-use-template]").forEach((button) => {
      button.addEventListener("click", () => {
        const template = findTemplate(button.dataset.useTemplate);
        if (!template) return;
        state.blocks = cloneTemplateBlocks(template.id);
        state.campaignName = template.name;
        state.selectedBlockId = null;
        pushHistory();
        saveState();
        navigate("builder");
        showToast("Template loaded", `${template.name} is ready to customize.`);
      });
    });

    appView.querySelectorAll("[data-preview-template]").forEach((button) => {
      button.addEventListener("click", () => {
        const template = findTemplate(button.dataset.previewTemplate);
        if (!template) return;
        const frame = document.getElementById("modalPreviewFrame");
        frame.innerHTML = `<div style="width:100%;background:#FFFFFF">${template.blocks.map(renderBlockContent).join("")}${renderRequiredFooter()}</div>`;
        document.getElementById("previewTitle").textContent = template.name;
        openModal("previewModal");
      });
    });

    appView.querySelectorAll("[data-delete-template]").forEach((button) => {
      button.addEventListener("click", () => {
        const template = findTemplate(button.dataset.deleteTemplate);
        if (!template?.custom) return;
        if (!window.confirm(`Delete the saved template “${template.name}”?`)) return;
        state.customTemplates = state.customTemplates.filter((item) => item.id !== template.id);
        saveState();
        renderCurrentView();
        showToast("Template deleted", `${template.name} was removed.`);
      });
    });
  }

  function cloneTemplateBlocks(templateId) {
    const template = findTemplate(templateId);
    return template ? template.blocks.map((block) => ({ ...deepClone(block), id: uid() })) : [];
  }

  function getAllTemplates() {
    return [...state.customTemplates, ...Object.values(templates)];
  }

  function findTemplate(templateId) {
    return templates[templateId] || state.customTemplates.find((template) => template.id === templateId);
  }

  /* Audience */
  function renderAudience() {
    const validCount = state.contacts.filter((contact) => contact.status === "valid").length;
    const invalidCount = state.contacts.filter((contact) => contact.status === "invalid").length;

    return `
      <section class="section-heading">
        <div>
          <span class="eyebrow">YOUR PEOPLE</span>
          <h2>Bring your audience with you.</h2>
          <p>Paste email addresses manually or upload an Excel or CSV file. LayoutLetter detects the email column, removes duplicates, and flags invalid entries.</p>
        </div>
        <button class="soft-button" id="downloadSampleButton">Download sample CSV</button>
      </section>

      <section class="audience-layout">
        <div class="import-stack">
          <article class="import-card">
            <h3>Manual entry</h3>
            <p>Paste comma-separated, semicolon-separated, or line-separated email addresses.</p>
            <form class="audience-form" id="manualAudienceForm">
              <label>
                Email addresses
                <textarea id="manualEmails" placeholder="hello@example.com, team@example.com"></textarea>
              </label>
              <button class="primary-button" type="submit">Add contacts</button>
            </form>
          </article>

          <article class="import-card">
            <h3>Excel or CSV upload</h3>
            <p>Supported files: .xlsx, .xls, and .csv</p>
            <label class="drop-zone" id="audienceDropZone">
              <input id="audienceFileInput" type="file" accept=".csv,.xlsx,.xls" />
              <div>
                <div class="drop-zone-icon">⇧</div>
                <strong>Drop your audience file here</strong>
                <span>or click to choose a file from your computer</span>
              </div>
            </label>
          </article>
        </div>

        <article class="panel">
          <div class="panel-header">
            <div>
              <h2>Contact list</h2>
              <p>${formatNumber(validCount)} valid contact${validCount === 1 ? "" : "s"} ready for campaigns.</p>
            </div>
            ${
              state.contacts.length
                ? `<button class="danger-button" id="clearAudienceButton">Clear list</button>`
                : ""
            }
          </div>

          <div class="import-summary">
            <div class="summary-chip"><span>Total rows</span><strong>${formatNumber(state.importStats.total || state.contacts.length)}</strong></div>
            <div class="summary-chip"><span>Valid</span><strong>${formatNumber(validCount)}</strong></div>
            <div class="summary-chip"><span>Duplicates removed</span><strong>${formatNumber(state.importStats.duplicates || 0)}</strong></div>
            <div class="summary-chip"><span>Invalid</span><strong>${formatNumber(invalidCount)}</strong></div>
          </div>

          <div class="audience-toolbar">
            <input class="search-input" id="contactSearch" placeholder="Search email or name…" />
            <span style="color:var(--muted);font-size:10px">Only valid contacts are included when sending.</span>
          </div>

          <div id="contactTableContainer">
            ${renderContactTable(state.contacts)}
          </div>
        </article>
      </section>
    `;
  }

  function renderContactTable(contacts) {
    if (!contacts.length) {
      return emptyState("Your audience is empty", "Add email addresses manually or import a file.");
    }

    const rows = contacts
      .map(
        (contact) => `
          <tr data-contact-row="${contact.id}">
            <td>
              <div class="email-cell">
                <span class="contact-dot">${initials(contact.name || contact.email)}</span>
                <div>
                  <strong>${escapeHtml(contact.name || "Subscriber")}</strong><br />
                  <span style="color:var(--muted);font-size:10px">${escapeHtml(contact.email)}</span>
                </div>
              </div>
            </td>
            <td><span class="status-pill ${contact.status === "invalid" ? "draft" : ""}">${escapeHtml(contact.status)}</span></td>
            <td>${escapeHtml(contact.source || "Manual")}</td>
            <td><button class="danger-button" data-remove-contact="${contact.id}">Remove</button></td>
          </tr>
        `
      )
      .join("");

    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Contact</th><th>Status</th><th>Source</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  function bindAudience() {
    const manualForm = document.getElementById("manualAudienceForm");
    const fileInput = document.getElementById("audienceFileInput");
    const dropZone = document.getElementById("audienceDropZone");
    const search = document.getElementById("contactSearch");

    manualForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = document.getElementById("manualEmails").value;
      const emails = value
        .split(/[\s,;]+/)
        .map((email) => email.trim())
        .filter(Boolean);

      if (!emails.length) {
        showToast("No emails found", "Paste at least one email address.", "error");
        return;
      }

      importContacts(
        emails.map((email) => ({ email, name: "", source: "Manual" })),
        "Manual entry"
      );
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files[0]) readAudienceFile(fileInput.files[0]);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.add("dragover");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.remove("dragover");
      });
    });

    dropZone.addEventListener("drop", (event) => {
      const file = event.dataTransfer.files[0];
      if (file) readAudienceFile(file);
    });

    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      const filtered = state.contacts.filter(
        (contact) =>
          contact.email.toLowerCase().includes(query) ||
          String(contact.name || "").toLowerCase().includes(query)
      );
      document.getElementById("contactTableContainer").innerHTML = renderContactTable(filtered);
      bindContactRemoveButtons();
    });

    const clearButton = document.getElementById("clearAudienceButton");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        const confirmed = window.confirm("Clear every contact from this browser?");
        if (!confirmed) return;
        state.contacts = [];
        state.importStats = { total: 0, valid: 0, duplicates: 0, invalid: 0 };
        saveState();
        renderCurrentView();
        showToast("Audience cleared", "All contacts were removed.");
      });
    }

    document.getElementById("downloadSampleButton").addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = "sample-audience.csv";
      link.download = "layoutletter-sample-audience.csv";
      link.click();
    });

    bindContactRemoveButtons();
  }

  function bindContactRemoveButtons() {
    appView.querySelectorAll("[data-remove-contact]").forEach((button) => {
      button.addEventListener("click", () => {
        state.contacts = state.contacts.filter((contact) => contact.id !== button.dataset.removeContact);
        state.importStats.total = state.contacts.length;
        saveState();
        renderCurrentView();
      });
    });
  }

  async function readAudienceFile(file) {
    const extension = file.name.split(".").pop().toLowerCase();

    try {
      let rows = [];

      if (extension === "csv") {
        const text = await file.text();
        rows = parseCsvToObjects(text);
      } else if (["xlsx", "xls"].includes(extension)) {
        if (!window.XLSX) {
          throw new Error("The Excel reader is still loading. Check your internet connection and try again.");
        }
        const buffer = await file.arrayBuffer();
        const workbook = window.XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rows = window.XLSX.utils.sheet_to_json(sheet, { defval: "" });
      } else {
        throw new Error("Please upload a CSV, XLSX, or XLS file.");
      }

      const extracted = extractContactsFromRows(rows, file.name);
      if (!extracted.length) {
        throw new Error("No email column or valid-looking email values were found.");
      }

      importContacts(extracted, file.name);
    } catch (error) {
      showToast("Import failed", error.message || "The file could not be read.", "error");
    }
  }

  function parseCsvToObjects(text) {
    const rows = parseCsv(text);
    if (!rows.length) return [];

    const firstRow = rows[0].map((value) => String(value).trim());
    const hasHeader = firstRow.some((value) => /email|name|contact|subscriber/i.test(value));
    const headers = hasHeader ? firstRow : firstRow.map((_, index) => `column_${index + 1}`);
    const dataRows = hasHeader ? rows.slice(1) : rows;

    return dataRows
      .filter((row) => row.some((value) => String(value).trim()))
      .map((row) =>
        headers.reduce((object, header, index) => {
          object[header || `column_${index + 1}`] = row[index] ?? "";
          return object;
        }, {})
      );
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];

      if (char === '"' && quoted && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === "," && !quoted) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }

    if (field.length || row.length) {
      row.push(field);
      rows.push(row);
    }

    return rows;
  }

  function extractContactsFromRows(rows, source) {
    if (!rows.length) return [];
    const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];

    let emailKey = keys.find((key) => /^e-?mail(\s*address)?$/i.test(key.trim()));
    if (!emailKey) emailKey = keys.find((key) => /email/i.test(key));

    if (!emailKey) {
      emailKey = keys
        .map((key) => ({
          key,
          score: rows.reduce((count, row) => count + (EMAIL_RE.test(String(row[key]).trim()) ? 1 : 0), 0),
        }))
        .sort((a, b) => b.score - a.score)[0]?.key;
    }

    const nameKey =
      keys.find((key) => /^name$/i.test(key.trim())) ||
      keys.find((key) => /full.?name|subscriber.?name|contact.?name/i.test(key));

    if (!emailKey) return [];

    return rows
      .map((row) => ({
        email: String(row[emailKey] ?? "").trim(),
        name: nameKey ? String(row[nameKey] ?? "").trim() : "",
        source,
      }))
      .filter((contact) => contact.email);
  }

  function importContacts(incoming, sourceLabel) {
    const existing = new Set(state.contacts.map((contact) => contact.email.toLowerCase()));
    const seen = new Set();
    let duplicates = 0;
    let invalid = 0;

    const processed = [];

    incoming.forEach((item) => {
      const email = String(item.email || "").trim().toLowerCase();
      if (!email) return;

      if (existing.has(email) || seen.has(email)) {
        duplicates += 1;
        return;
      }

      seen.add(email);
      const status = EMAIL_RE.test(email) ? "valid" : "invalid";
      if (status === "invalid") invalid += 1;

      processed.push({
        id: uid(),
        name: String(item.name || "").trim(),
        email,
        status,
        source: item.source || sourceLabel,
      });
    });

    state.contacts = [...state.contacts, ...processed];
    state.importStats = {
      total: incoming.length,
      valid: processed.filter((item) => item.status === "valid").length,
      duplicates,
      invalid,
    };

    saveState();
    renderCurrentView();

    showToast(
      "Audience imported",
      `${processed.filter((item) => item.status === "valid").length} valid, ${duplicates} duplicate, ${invalid} invalid.`
    );
  }

  /* Campaigns */
  function renderCampaigns() {
    const cards = [...state.campaigns]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(
        (campaign) => `
          <article class="campaign-card">
            <div class="campaign-card__top">
              <span class="status-pill ${campaign.status.toLowerCase()}">${escapeHtml(campaign.status)}</span>
              <button class="icon-button small" data-campaign-menu="${campaign.id}" aria-label="Campaign options">•••</button>
            </div>
            <h3>${escapeHtml(campaign.name)}</h3>
            <p>${escapeHtml(campaign.subject || "No subject")} · ${formatDate(campaign.date)}</p>
            <div class="campaign-stats">
              <div><span>Recipients</span><strong>${formatNumber(campaign.recipients || 0)}</strong></div>
              <div><span>Open rate</span><strong>${Number(campaign.openRate || 0).toFixed(1)}%</strong></div>
              <div><span>Click rate</span><strong>${Number(campaign.clickRate || 0).toFixed(1)}%</strong></div>
            </div>
          </article>
        `
      )
      .join("");

    return `
      <section class="section-heading">
        <div>
          <span class="eyebrow">CAMPAIGN HISTORY</span>
          <h2>See what you’ve created and sent.</h2>
          <p>Campaign results are stored locally in this starter. Connect your email provider’s event webhooks for production analytics.</p>
        </div>
        <button class="primary-button" id="campaignCreateButton">New campaign</button>
      </section>
      ${
        cards
          ? `<section class="campaign-grid">${cards}</section>`
          : `<section class="panel">${emptyState("No campaigns yet", "Create your first newsletter and it will appear here.")}</section>`
      }
    `;
  }

  function bindCampaigns() {
    document.getElementById("campaignCreateButton").addEventListener("click", () => {
      state.campaignName = "Untitled campaign";
      state.blocks = cloneTemplateBlocks("creator");
      state.selectedBlockId = null;
      pushHistory();
      navigate("builder");
    });

    appView.querySelectorAll("[data-campaign-menu]").forEach((button) => {
      button.addEventListener("click", () => {
        const campaign = state.campaigns.find((item) => item.id === button.dataset.campaignMenu);
        if (!campaign) return;
        const remove = window.confirm(`Remove "${campaign.name}" from the local campaign history?`);
        if (!remove) return;
        state.campaigns = state.campaigns.filter((item) => item.id !== campaign.id);
        saveState();
        renderCurrentView();
      });
    });
  }

  /* Preview and sending */
  function openPreview() {
    const frame = document.getElementById("modalPreviewFrame");
    frame.innerHTML = renderEmailBody();
    document.getElementById("previewTitle").textContent = state.campaignName || "Newsletter preview";
    frame.classList.remove("mobile");
    frame.classList.add("desktop");
    document.querySelectorAll("[data-preview-size]").forEach((button) => {
      button.classList.toggle("active", button.dataset.previewSize === "desktop");
    });
    openModal("previewModal");
  }

  function openSendModal() {
    const validRecipients = state.contacts.filter((contact) => contact.status === "valid");
    document.getElementById("sendCampaignName").value = state.campaignName || "Untitled campaign";
    document.getElementById("sendSubject").value = "";
    document.getElementById("sendRecipientCount").textContent = formatNumber(validRecipients.length);
    document.getElementById("sendEstimate").textContent =
      validRecipients.length > 500 ? "A few minutes" : "Under a minute";
    document.getElementById("sendConsent").checked = false;
    openModal("sendModal");
  }

  async function handleSendTest() {
    const replyTo = document.getElementById("sendReplyTo").value.trim();
    const subject = document.getElementById("sendSubject").value.trim() || "LayoutLetter test email";
    const fromName = document.getElementById("sendFromName").value.trim() || "LayoutLetter Demo";

    if (!EMAIL_RE.test(replyTo)) {
      showToast("Add a test address", "Enter a valid reply-to email first.", "error");
      return;
    }

    const button = document.getElementById("sendTestButton");
    setButtonLoading(button, true, "Sending…");

    const result = await sendRequest({
      campaignName: document.getElementById("sendCampaignName").value.trim() || "Test campaign",
      subject: `[TEST] ${subject}`,
      fromName,
      replyTo,
      recipients: [replyTo],
      html: generateEmailDocument(),
      testOnly: true,
    });

    setButtonLoading(button, false, "Send test");
    showToast(result.ok ? "Test ready" : "Test failed", result.message, result.ok ? "info" : "error");
  }

  async function handleSendCampaign(event) {
    event.preventDefault();

    const validRecipients = state.contacts
      .filter((contact) => contact.status === "valid")
      .map((contact) => contact.email);

    if (!validRecipients.length) {
      showToast("No valid audience", "Add at least one valid contact before sending.", "error");
      closeModal("sendModal");
      navigate("audience");
      return;
    }

    const submitButton = event.submitter || event.target.querySelector('button[type="submit"]');
    setButtonLoading(submitButton, true, "Sending…");

    const payload = {
      campaignName: document.getElementById("sendCampaignName").value.trim(),
      subject: document.getElementById("sendSubject").value.trim(),
      fromName: document.getElementById("sendFromName").value.trim(),
      replyTo: document.getElementById("sendReplyTo").value.trim(),
      recipients: validRecipients,
      html: generateEmailDocument(),
      testOnly: false,
    };

    const result = await sendRequest(payload);
    setButtonLoading(submitButton, false, "Send campaign");

    if (!result.ok) {
      showToast("Campaign not sent", result.message, "error");
      return;
    }

    state.campaignName = payload.campaignName;
    state.campaigns.unshift({
      id: uid(),
      name: payload.campaignName,
      subject: payload.subject,
      status: result.mode === "demo" ? "Sent" : "Sent",
      date: new Date().toISOString(),
      recipients: validRecipients.length,
      openRate: 0,
      clickRate: 0,
    });
    saveState();
    closeModal("sendModal");
    showToast("Campaign complete", result.message);
    navigate("campaigns");
  }

  async function sendRequest(payload) {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return {
        ok: response.ok && data.ok !== false,
        mode: data.mode || "smtp",
        message: data.message || (response.ok ? "Campaign sent." : "The server rejected the request."),
      };
    } catch {
      // Static-file fallback: preserve the complete UI workflow in safe demo mode.
      await delay(650);
      return {
        ok: true,
        mode: "demo",
        message: payload.testOnly
          ? "Test email simulated in browser-only mode."
          : "Campaign recorded in browser-only demo mode.",
      };
    }
  }

  function renderEmailBody() {
    return `
      <div style="width:100%;background:#FFFFFF">
        ${state.blocks.map(renderBlockContent).join("")}
        ${renderRequiredFooter()}
      </div>
    `;
  }

  function generateEmailDocument() {
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(state.campaignName || "Newsletter")}</title>
</head>
<body style="margin:0;padding:0;background:#F5EDED">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F5EDED">
    <tr>
      <td align="center" style="padding:24px 10px">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#FFFFFF">
          <tr>
            <td>
              ${state.blocks.map(renderBlockContent).join("")}
              ${renderRequiredFooter()}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  function renderRequiredFooter() {
    return `
      <div style="padding:24px 28px;background:#FFF6F6;color:#6D8189;text-align:center;font-family:Poppins,Arial,sans-serif;font-size:10px;line-height:1.6">
        You are receiving this email because you subscribed to updates.<br />
        <a href="{{unsubscribe_url}}" style="color:#2C687B;text-decoration:underline">Unsubscribe</a>
        &nbsp;·&nbsp;
        <a href="{{preferences_url}}" style="color:#2C687B;text-decoration:underline">Manage preferences</a>
      </div>
    `;
  }

  function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
    if (![...document.querySelectorAll(".modal-backdrop")].some((modal) => !modal.classList.contains("hidden"))) {
      document.body.style.overflow = "";
    }
  }

  /* Persistence and helpers */
  function loadState() {
    const fallback = {
      view: "dashboard",
      campaignName: "Creator Weekly",
      blocks: cloneInitialTemplate("creator"),
      selectedBlockId: null,
      canvasSize: "desktop",
      contacts: defaultContacts,
      campaigns: defaultCampaigns,
      customTemplates: [],
      activePalette: "layoutletter",
      brandColors: [...PALETTE_PRESETS.layoutletter.colors],
      importStats: null,
    };

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!stored || typeof stored !== "object") return fallback;
      return {
        ...fallback,
        ...stored,
        blocks: Array.isArray(stored.blocks) ? stored.blocks : fallback.blocks,
        contacts: Array.isArray(stored.contacts) ? stored.contacts : fallback.contacts,
        campaigns: Array.isArray(stored.campaigns) ? stored.campaigns : fallback.campaigns,
      };
    } catch {
      return fallback;
    }
  }

  function cloneInitialTemplate(templateId) {
    return templates[templateId].blocks.map((block) => ({ ...deepClone(block), id: uid() }));
  }

  function saveState() {
    const serializable = {
      view: state.view,
      campaignName: state.campaignName,
      blocks: state.blocks,
      selectedBlockId: state.selectedBlockId,
      canvasSize: state.canvasSize,
      contacts: state.contacts,
      campaigns: state.campaigns,
      customTemplates: state.customTemplates,
      activePalette: state.activePalette,
      brandColors: state.brandColors,
      importStats: state.importStats,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  }

  function showToast(title, message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${type === "error" ? "!" : "✓"}</div>
      <div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></div>
      <button aria-label="Close notification">×</button>
    `;
    toast.querySelector("button").addEventListener("click", () => toast.remove());
    toastStack.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  function emptyState(title, description) {
    return `
      <div class="empty-state">
        <div class="empty-icon">✦</div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(description)}</p>
      </div>
    `;
  }

  function setButtonLoading(button, loading, text) {
    if (!button) return;
    button.disabled = loading;
    button.textContent = text;
    button.style.opacity = loading ? "0.7" : "";
    button.style.cursor = loading ? "wait" : "";
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function uid() {
    return `ll_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function placeholderImage() {
    return "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop stop-color="#8CC7C4"/>
              <stop offset="1" stop-color="#2C687B"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="700" fill="url(#g)"/>
          <circle cx="930" cy="155" r="125" fill="#FFF6F6" opacity=".18"/>
          <circle cx="1030" cy="540" r="215" fill="#DB1A1A" opacity=".12"/>
          <text x="80" y="350" fill="#FFFFFF" font-size="58" font-family="Arial" font-weight="700">Your image here</text>
          <text x="84" y="410" fill="#FFFFFF" opacity=".78" font-size="28" font-family="Arial">Add an image URL in block settings</text>
        </svg>
      `);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  function sanitizeHtml(value) {
    const parser = new DOMParser();
    const documentFragment = parser.parseFromString(String(value || ""), "text/html");
    documentFragment.querySelectorAll("script, style, iframe, object, embed, form, input, button, textarea, select, link, meta, base").forEach((node) => node.remove());
    documentFragment.querySelectorAll("*").forEach((element) => {
      [...element.attributes].forEach((attribute) => {
        const name = attribute.name.toLowerCase();
        const attributeValue = attribute.value;
        if (name.startsWith("on") || name === "srcdoc" || name === "contenteditable") {
          element.removeAttribute(attribute.name);
        } else if (name === "href" || name === "src") {
          const safeValue = sanitizeUrl(attributeValue);
          if (safeValue && safeValue !== "#") element.setAttribute(attribute.name, safeValue);
          else if (attributeValue.trim() === "#") element.setAttribute(attribute.name, "#");
          else element.removeAttribute(attribute.name);
        } else if (name === "style") {
          const safeStyle = attributeValue
            .replace(/url\s*\([^)]*\)/gi, "")
            .replace(/expression\s*\([^)]*\)/gi, "")
            .replace(/(?:position\s*:\s*fixed|behavior\s*:|javascript:)/gi, "");
          element.setAttribute("style", safeStyle);
        }
      });
      if (element.tagName === "A") {
        element.setAttribute("target", "_blank");
        element.setAttribute("rel", "noopener noreferrer");
      }
      if (element.tagName === "IMG") {
        element.setAttribute("style", `${element.getAttribute("style") || ""};max-width:100%;height:auto`);
      }
    });
    return documentFragment.body.innerHTML;
  }

  function stripHtml(value) {
    const parser = new DOMParser();
    return parser.parseFromString(String(value || ""), "text/html").body.textContent || "";
  }

  function slugify(value) {
    return String(value || "newsletter")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "newsletter";
  }

  function nl2br(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function normalizeHex(value, fallback) {
    const match = String(value || "").match(/^#[0-9a-f]{6}$/i);
    return match ? match[0] : fallback;
  }

  function clampNumber(value, min, max, fallback) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(max, Math.max(min, number));
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-US").format(Number(value || 0));
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return " - ";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  function initials(value) {
    const parts = String(value || "?")
      .replace(/@.*/, "")
      .split(/[\s._-]+/)
      .filter(Boolean);
    return parts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  function capitalize(value) {
    return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1);
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
    return String(value).replace(/["\\]/g, "\\$&");
  }
})();
