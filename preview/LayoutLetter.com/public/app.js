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
      subject: "Welcome — we’re glad you’re here",
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
            ${blockTool("heading", "H", "Heading")}
            ${blockTool("text", "Aa", "Text")}
            ${blockTool("image", "▧", "Image")}
            ${blockTool("button", "↗", "Button")}
            ${blockTool("divider", "—", "Divider")}
            ${blockTool("spacer", "↕", "Spacer")}
            ${blockTool("social", "◎", "Social")}
            ${blockTool("columns", "▥", "Columns")}
          </div>

          <div style="margin-top:22px">
            <h3>Brand palette</h3>
            <p class="panel-note">Your requested LayoutLetter colors.</p>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:9px">
              ${paletteSwatch(palette.red, "Red")}
              ${paletteSwatch(palette.blush, "Blush")}
              ${paletteSwatch(palette.teal, "Teal")}
              ${paletteSwatch(palette.darkTeal, "Dark teal")}
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
              <button class="primary-button" id="openSendButton">Send</button>
            </div>
          </div>

          <div class="canvas-stage">
            <div id="emailCanvas" class="email-canvas ${state.canvasSize === "mobile" ? "mobile" : ""}">
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

  function blockTool(type, icon, label) {
    return `
      <button class="block-tool" type="button" draggable="true" data-block-type="${type}">
        <span>${icon}</span><span>${label}</span>
      </button>
    `;
  }

  function paletteSwatch(color, label) {
    return `
      <button
        type="button"
        title="${escapeAttr(label)} ${escapeAttr(color)}"
        data-copy-color="${escapeAttr(color)}"
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
            <div style="margin:0;color:${escapeAttr(block.color || palette.darkTeal)};font-family:Poppins,Arial,sans-serif;font-size:${clampNumber(block.fontSize, 16, 72, 34)}px;font-weight:800;line-height:1.15;letter-spacing:-1px">
              ${nl2br(block.content || "Your heading")}
            </div>
          </div>
        `;

      case "text":
        return `
          <div style="background:${background};padding:${padding}px;text-align:${align}">
            <div style="margin:0;color:${escapeAttr(block.color || palette.ink)};font-family:Poppins,Arial,sans-serif;font-size:${clampNumber(block.fontSize, 10, 28, 15)}px;line-height:1.7">
              ${nl2br(block.content || "Add your message here.")}
            </div>
          </div>
        `;

      case "image":
        return `
          <div style="background:${background};padding:${padding}px">
            <img
              src="${escapeAttr(block.src || placeholderImage())}"
              alt="${escapeAttr(block.alt || "")}"
              style="display:block;width:100%;height:${clampNumber(block.height, 100, 650, 280)}px;object-fit:cover;border-radius:${clampNumber(block.radius, 0, 50, 0)}px"
            />
          </div>
        `;

      case "button":
        return `
          <div style="background:${background};padding:${padding}px;text-align:${align}">
            <a
              href="${escapeAttr(block.url || "#")}"
              style="display:inline-block;padding:13px 22px;border-radius:${clampNumber(block.radius, 0, 99, 12)}px;background:${escapeAttr(block.buttonColor || palette.red)};color:${escapeAttr(block.textColor || "#FFFFFF")};font-family:Poppins,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none"
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
          <div style="background:${background};padding:${padding}px;text-align:${align};color:${escapeAttr(block.color || palette.darkTeal)};font-family:Poppins,Arial,sans-serif;font-size:13px;font-weight:700">
            ${escapeHtml(block.content || "Instagram  ·  LinkedIn  ·  Website")}
          </div>
        `;

      case "columns":
        return `
          <div style="background:${background};padding:${padding}px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td width="50%" valign="top" style="padding:0 10px 0 0">
                  <div style="color:${palette.darkTeal};font-family:Poppins,Arial,sans-serif;font-size:17px;font-weight:800">${escapeHtml(block.leftTitle || "First column")}</div>
                  <div style="margin-top:7px;color:${palette.ink};font-family:Poppins,Arial,sans-serif;font-size:13px;line-height:1.6">${escapeHtml(block.leftText || "Add supporting content here.")}</div>
                </td>
                <td width="50%" valign="top" style="padding:0 0 0 10px">
                  <div style="color:${palette.darkTeal};font-family:Poppins,Arial,sans-serif;font-size:17px;font-weight:800">${escapeHtml(block.rightTitle || "Second column")}</div>
                  <div style="margin-top:7px;color:${palette.ink};font-family:Poppins,Arial,sans-serif;font-size:13px;line-height:1.6">${escapeHtml(block.rightText || "Add supporting content here.")}</div>
                </td>
              </tr>
            </table>
          </div>
        `;

      default:
        return "";
    }
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

    const common = ["heading", "text", "image", "button", "divider", "social", "columns"].includes(block.type)
      ? `
        ${numberField("Padding", "padding", block.padding ?? 28, 0, 80)}
        ${colorField("Background", "background", block.background || "#FFFFFF")}
      `
      : "";

    let specific = "";

    if (block.type === "heading" || block.type === "text") {
      specific = `
        ${textAreaField("Content", "content", block.content || "")}
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
        ${textField("Image URL", "src", block.src || "")}
        ${textField("Alt text", "alt", block.alt || "")}
        ${numberField("Image height", "height", block.height || 280, 100, 650)}
        ${numberField("Corner radius", "radius", block.radius || 0, 0, 50)}
      `;
    }

    if (block.type === "button") {
      specific = `
        ${textField("Button text", "label", block.label || "Button")}
        ${textField("Destination URL", "url", block.url || "#")}
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
        ${textField("Social links text", "content", block.content || "")}
        ${selectField("Alignment", "align", block.align || "center", [
          ["left", "Left"],
          ["center", "Center"],
          ["right", "Right"],
        ])}
        ${colorField("Text color", "color", block.color || palette.darkTeal)}
      `;
    }

    if (block.type === "columns") {
      specific = `
        ${textField("Left heading", "leftTitle", block.leftTitle || "")}
        ${textAreaField("Left content", "leftText", block.leftText || "")}
        ${textField("Right heading", "rightTitle", block.rightTitle || "")}
        ${textAreaField("Right content", "rightText", block.rightText || "")}
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

    appView.querySelectorAll("[data-copy-color]").forEach((swatch) => {
      swatch.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(swatch.dataset.copyColor);
          showToast("Color copied", swatch.dataset.copyColor);
        } catch {
          showToast("Palette color", swatch.dataset.copyColor);
        }
      });
    });

    canvas.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = state.draggedBlockId ? "move" : "copy";
    });

    canvas.addEventListener("drop", (event) => {
      event.preventDefault();
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
    document.getElementById("openSendButton").addEventListener("click", openSendModal);
    document.getElementById("undoButton").addEventListener("click", undo);
    document.getElementById("redoButton").addEventListener("click", redo);
  }

  function handlePropertyChange(event) {
    const input = event.target.closest("[data-property]");
    if (!input || !state.selectedBlockId) return;

    const block = state.blocks.find((item) => item.id === state.selectedBlockId);
    if (!block) return;

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
    const numberProperties = ["padding", "fontSize", "height", "radius", "width", "thickness"];
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
      },
      text: {
        ...base,
        content: "Write something meaningful for your audience. Keep it clear, useful, and easy to read.",
        fontSize: 15,
        color: palette.ink,
        align: "left",
      },
      image: {
        ...base,
        src: placeholderImage(),
        alt: "Newsletter image",
        height: 280,
        radius: 16,
      },
      button: {
        ...base,
        label: "Learn more",
        url: "#",
        buttonColor: palette.red,
        textColor: "#FFFFFF",
        align: "left",
        radius: 12,
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
        content: "Instagram  ·  LinkedIn  ·  Website",
        color: palette.darkTeal,
        align: "center",
      },
      columns: {
        ...base,
        leftTitle: "First idea",
        leftText: "Share a useful detail or benefit here.",
        rightTitle: "Second idea",
        rightText: "Add another concise supporting point.",
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
    return `
      <section class="section-heading">
        <div>
          <span class="eyebrow">READY-TO-USE DESIGNS</span>
          <h2>Start polished, then make it yours.</h2>
          <p>Each template uses email-safe blocks that can be rearranged and customized inside the LayoutLetter builder.</p>
        </div>
      </section>

      <section class="template-grid">
        ${Object.values(templates).map(renderTemplateCard).join("")}
      </section>
    `;
  }

  function renderTemplateCard(template) {
    return `
      <article class="template-card">
        <div class="template-preview">
          <div class="template-paper">
            <div class="tp-hero ${template.accent === "red" ? "red" : template.accent === "light" ? "light" : ""}"></div>
            <div class="tp-body">
              <div class="tp-line head"></div>
              <div class="tp-line"></div>
              <div class="tp-line short"></div>
              <div class="tp-button"></div>
            </div>
          </div>
        </div>
        <div class="template-card__body">
          <div>
            <h3>${escapeHtml(template.name)}</h3>
            <p>${escapeHtml(template.description)}</p>
          </div>
          <button class="primary-button" data-template-id="${template.id}">Use</button>
        </div>
      </article>
    `;
  }

  function bindTemplates() {
    appView.querySelectorAll("[data-template-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const template = templates[button.dataset.templateId];
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
  }

  function cloneTemplateBlocks(templateId) {
    return templates[templateId].blocks.map((block) => ({ ...deepClone(block), id: uid() }));
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
    if (Number.isNaN(date.getTime())) return "—";
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
