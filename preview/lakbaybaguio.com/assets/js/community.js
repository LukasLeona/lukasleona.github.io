(function () {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const config = window.LAKBAY_COMMUNITY_CONFIG || {};

  const ui = {
    tabBar: $("#mobileTabBar"),
    mobileChatBadge: $("#mobileChatBadge"),
    community: $("#community"),
    layout: $("#communityLayout"),
    switcher: $("#communitySwitcher"),
    modeBadge: $("#communityModeBadge"),
    setupNote: $("#communitySetupNote"),
    alias: $("#anonymousAlias"),
    shuffleAlias: $("#shuffleAlias"),
    consent: $("#nearbyConsent"),
    startRadar: $("#startRadar"),
    stopRadar: $("#stopRadar"),
    refreshNearby: $("#refreshNearby"),
    radarStage: $("#radarStage"),
    radarDots: $("#radarDots"),
    nearbyStatus: $("#nearbyStatus"),
    nearbyList: $("#nearbyList"),
    chatsPanel: $("#chatsPanel"),
    chatRequests: $("#chatRequests"),
    conversationList: $("#conversationList"),
    chatConnectionState: $("#chatConnectionState"),
    openKabsat: $("#openKabsatFromChats"),
    chatRoom: $("#chatRoom"),
    chatBack: $("#chatBack"),
    activeChatAvatar: $("#activeChatAvatar"),
    activeChatName: $("#activeChatName"),
    activeChatStatus: $("#activeChatStatus"),
    toggleSafety: $("#toggleSafetyActions"),
    safetyActions: $("#chatSafetyActions"),
    reportReason: $("#reportReason"),
    reportUser: $("#reportUser"),
    endChat: $("#endChat"),
    blockUser: $("#blockUser"),
    messages: $("#chatMessages"),
    form: $("#communityChatForm"),
    input: $("#communityChatInput"),
    unread: $("#communityUnread"),
    toast: $("#toast")
  };

  if (!ui.tabBar || !ui.community) return;

  const adjectives = ["Cloud", "Cozy", "Foggy", "Gentle", "Misty", "Pine", "Quiet", "Sage", "Sunny", "Wandering"];
  const nouns = ["Deer", "Finch", "Fox", "Hiker", "Owl", "Panda", "Robin", "Spruce", "Taho", "Trail"];
  const avatarColors = ["#DDE9D6", "#FFE5BE", "#E1E8F3", "#F0DDE9", "#E8E0CF", "#D9ECE7"];
  const demoPeople = [
    { user_id: "demo-cloud", alias: "CloudPine28", avatar_seed: 2, distance_band: "Less than 500 m", preview: true },
    { user_id: "demo-trail", alias: "QuietTrail63", avatar_seed: 4, distance_band: "0.5–1.5 km", preview: true },
    { user_id: "demo-finch", alias: "MistyFinch14", avatar_seed: 1, distance_band: "1.5–3 km", preview: true }
  ];
  const savedAlias = safeGet("lakbay-community-alias");

  const state = {
    alias: isValidAlias(savedAlias) ? savedAlias : createAlias(),
    currentView: "nearby",
    activeMobileTab: "home",
    client: null,
    user: null,
    backendReady: false,
    backendLoading: null,
    radarActive: false,
    position: null,
    nearby: [],
    conversations: [],
    incomingRequests: [],
    activeConversation: null,
    messages: [],
    inboxChannel: null,
    requestChannel: null,
    presenceTimer: null,
    scrollFrame: null,
    toastTimer: null
  };

  const isConfigured = Boolean(
    config.enabled &&
    /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(String(config.supabaseUrl || "")) &&
    String(config.supabasePublishableKey || "").length > 20
  );

  init();

  function init() {
    safeSet("lakbay-community-alias", state.alias);
    ui.alias.textContent = state.alias;
    renderBackendMode();
    bindEvents();
    updateCommunityView("nearby", false);
    updateActiveMobileTab("home");
    updateActiveTabFromScroll();
  }

  function bindEvents() {
    ui.tabBar.addEventListener("click", handleMobileTabClick);
    ui.switcher.addEventListener("click", (event) => {
      const button = event.target.closest("[data-community-view]");
      if (!button) return;
      updateCommunityView(button.dataset.communityView, true);
    });

    ui.consent.addEventListener("change", () => {
      ui.startRadar.disabled = !ui.consent.checked || state.radarActive;
    });
    ui.shuffleAlias.addEventListener("click", shuffleAlias);
    ui.startRadar.addEventListener("click", startRadar);
    ui.stopRadar.addEventListener("click", () => stopRadar().catch(handleBackendError));
    ui.refreshNearby.addEventListener("click", () => refreshNearby().catch(handleBackendError));
    ui.nearbyList.addEventListener("click", handleNearbyAction);
    ui.chatRequests.addEventListener("click", handleRequestAction);
    ui.conversationList.addEventListener("click", handleConversationAction);
    ui.openKabsat.addEventListener("click", () => $("#kabsatLauncher")?.click());
    ui.chatBack.addEventListener("click", () => ui.chatsPanel.classList.remove("room-open"));
    ui.toggleSafety.addEventListener("click", () => {
      ui.safetyActions.hidden = !ui.safetyActions.hidden;
    });
    ui.form.addEventListener("submit", sendMessage);
    ui.reportUser.addEventListener("click", reportActiveUser);
    ui.endChat.addEventListener("click", endActiveConversation);
    ui.blockUser.addEventListener("click", blockActiveUser);

    window.addEventListener("scroll", () => {
      if (state.scrollFrame) return;
      state.scrollFrame = window.requestAnimationFrame(() => {
        updateActiveTabFromScroll();
        state.scrollFrame = null;
      });
    }, { passive: true });

    window.addEventListener("beforeunload", cleanup);
  }

  function handleMobileTabClick(event) {
    const button = event.target.closest("[data-mobile-tab]");
    if (!button) return;

    const tabName = button.dataset.mobileTab;
    let targetId = button.dataset.target;

    if (tabName === "nearby" || tabName === "chats") {
      updateCommunityView(tabName, false);
      if (tabName === "chats" && isConfigured) initializeBackend().then(loadCommunityData).catch(handleBackendError);
    }

    if (tabName === "plan" && state.activeMobileTab === "plan" && !$("#results")?.hidden) {
      targetId = "results";
    }

    updateActiveMobileTab(tabName);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateActiveMobileTab(name) {
    state.activeMobileTab = name;
    document.body.classList.toggle("community-chat-view", name === "chats");
    $$("[data-mobile-tab]", ui.tabBar).forEach((button) => {
      const active = button.dataset.mobileTab === name;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function updateActiveTabFromScroll() {
    if (window.innerWidth > 760) return;
    const marker = Math.min(220, window.innerHeight * .3);
    const communityRect = ui.community.getBoundingClientRect();
    const results = $("#results");
    const destination = $("#destinations");
    const planner = $("#planner");

    if (communityRect.top <= marker && communityRect.bottom > marker) {
      updateActiveMobileTab(state.currentView);
      return;
    }

    if (results && !results.hidden) {
      const rect = results.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) {
        updateActiveMobileTab("plan");
        return;
      }
    }

    if (destination) {
      const rect = destination.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) {
        updateActiveMobileTab("explore");
        return;
      }
    }

    if (planner) {
      const rect = planner.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) {
        updateActiveMobileTab("plan");
        return;
      }
    }

    updateActiveMobileTab("home");
  }

  function updateCommunityView(view, shouldScroll) {
    state.currentView = view === "chats" ? "chats" : "nearby";
    ui.layout.dataset.view = state.currentView;
    $$("[data-community-view]", ui.switcher).forEach((button) => {
      const active = button.dataset.communityView === state.currentView;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (window.innerWidth <= 760) updateActiveMobileTab(state.currentView);
    if (state.currentView === "chats" && isConfigured) initializeBackend().then(loadCommunityData).catch(handleBackendError);
    if (shouldScroll) ui.community.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderBackendMode() {
    if (isConfigured) {
      ui.modeBadge.textContent = state.backendReady ? "Live" : "Live ready";
      ui.modeBadge.classList.toggle("live", state.backendReady);
      ui.setupNote.textContent = "Your generated name identifies this browser session. Exact coordinates are never shown to other travelers.";
      ui.chatConnectionState.innerHTML = `<i></i> ${state.backendReady ? "Live" : "Ready"}`;
      ui.chatConnectionState.classList.toggle("live", state.backendReady);
      return;
    }

    ui.modeBadge.textContent = "Preview mode";
    ui.modeBadge.classList.remove("live");
    ui.chatConnectionState.innerHTML = "<i></i> Preview";
    ui.chatConnectionState.classList.remove("live");
  }

  function shuffleAlias() {
    if (state.radarActive) {
      showToast("Stop nearby sharing before changing your anonymous name.");
      return;
    }

    state.alias = createAlias();
    safeSet("lakbay-community-alias", state.alias);
    ui.alias.textContent = state.alias;

    if (state.backendReady && state.client && state.user) {
      state.client.from("profiles").upsert({ user_id: state.user.id, alias: state.alias }).then(({ error }) => {
        if (error) showToast("The new name could not be saved yet.");
      }).catch(() => showToast("The new name could not be saved yet."));
    }
  }

  async function startRadar() {
    if (!ui.consent.checked || state.radarActive) return;

    setRadarBusy(true, isConfigured ? "Requesting location…" : "Loading preview…");

    if (!isConfigured) {
      window.setTimeout(() => {
        state.radarActive = true;
        state.nearby = demoPeople;
        renderNearby();
        setRadarActiveUI(true);
        ui.nearbyStatus.textContent = "3 sample travelers · preview only";
      }, 420);
      return;
    }

    try {
      await initializeBackend();
      state.position = await getApproximatePosition();
      await publishPresence();
      state.radarActive = true;
      setRadarActiveUI(true);
      await refreshNearby();
      startPresenceHeartbeat();
    } catch (error) {
      setRadarBusy(false, locationErrorMessage(error));
      showToast(locationErrorMessage(error));
    }
  }

  async function stopRadar() {
    clearPresenceHeartbeat();
    state.radarActive = false;
    state.position = null;
    state.nearby = [];

    if (state.backendReady && state.client) {
      try { await state.client.rpc("set_presence_offline"); } catch { /* Stale presence expires automatically. */ }
    }

    setRadarActiveUI(false);
    renderNearby();
    ui.nearbyStatus.textContent = "Radar is off";
  }

  function setRadarBusy(busy, status) {
    ui.startRadar.disabled = busy || !ui.consent.checked;
    ui.startRadar.innerHTML = busy
      ? `<span aria-hidden="true">◌</span> ${escapeHtml(status)}`
      : `<span aria-hidden="true">⌾</span> Turn on nearby radar`;
    ui.nearbyStatus.textContent = status;
  }

  function setRadarActiveUI(active) {
    ui.radarStage.classList.toggle("active", active);
    ui.radarStage.setAttribute("aria-label", active ? "Nearby radar is active" : "Nearby radar is off");
    ui.stopRadar.hidden = !active;
    ui.refreshNearby.disabled = !active;
    ui.startRadar.disabled = active || !ui.consent.checked;
    ui.startRadar.innerHTML = active
      ? `<span aria-hidden="true">✓</span> Nearby radar is active`
      : `<span aria-hidden="true">⌾</span> Turn on nearby radar`;
    ui.shuffleAlias.disabled = active;
  }

  async function refreshNearby() {
    if (!state.radarActive) return;

    if (!isConfigured) {
      state.nearby = demoPeople;
      renderNearby();
      ui.nearbyStatus.textContent = "3 sample travelers · preview only";
      return;
    }

    if (!state.position || !state.client) return;
    ui.refreshNearby.disabled = true;
    ui.nearbyStatus.textContent = "Refreshing…";

    const radius = clamp(Number(config.nearbyRadiusMeters || 5000), 500, 5000);
    const { data, error } = await state.client.rpc("nearby_profiles", {
      p_radius_meters: radius
    });

    ui.refreshNearby.disabled = false;
    if (error) throw error;
    state.nearby = Array.isArray(data) ? data : [];
    renderNearby();
    ui.nearbyStatus.textContent = state.nearby.length
      ? `${state.nearby.length} active ${state.nearby.length === 1 ? "traveler" : "travelers"}`
      : "No active travelers within 5 km";
  }

  function renderNearby() {
    ui.radarDots.innerHTML = state.nearby.slice(0, 5).map(() => '<i class="radar-dot"></i>').join("");

    if (!state.nearby.length) {
      ui.nearbyList.innerHTML = `
        <div class="community-empty-state">
          <span aria-hidden="true">⌁</span>
          <strong>${state.radarActive ? "Nobody nearby yet" : "No location is being shared"}</strong>
          <p>${state.radarActive ? "Keep radar open or try again later. Your exact location remains hidden." : "Turn on radar when you are ready to discover nearby travelers."}</p>
        </div>`;
      return;
    }

    ui.nearbyList.innerHTML = state.nearby.map((person) => `
      <div class="nearby-person">
        <span class="nearby-avatar" style="--avatar-bg:${avatarColor(person.avatar_seed)}">${escapeHtml(initials(person.alias))}</span>
        <div>
          <strong>${escapeHtml(person.alias)}</strong>
          <small>Active · ${escapeHtml(person.distance_band || "Nearby")}</small>
          ${person.preview ? '<span class="preview-pill">SAMPLE</span>' : ""}
        </div>
        <button type="button" data-chat-user="${escapeHtml(person.user_id)}">Chat</button>
      </div>`).join("");
  }

  async function handleNearbyAction(event) {
    const button = event.target.closest("[data-chat-user]");
    if (!button) return;
    const person = state.nearby.find((entry) => entry.user_id === button.dataset.chatUser);
    if (!person) return;

    button.disabled = true;
    button.textContent = isConfigured ? "Sending…" : "Open";

    if (!isConfigured) {
      openDemoConversation(person);
      return;
    }

    try {
      await initializeBackend();
      const { error } = await state.client.rpc("request_chat", { p_target_user_id: person.user_id });
      if (error) throw error;
      button.textContent = "Requested";
      showToast(`Chat request sent to ${person.alias}.`);
      await loadConversations();
    } catch (error) {
      button.disabled = false;
      button.textContent = "Chat";
      showToast(readableError(error));
    }
  }

  function openDemoConversation(person) {
    const conversation = {
      conversation_id: `preview-${person.user_id}`,
      partner_id: person.user_id,
      partner_alias: person.alias,
      distance_band: person.distance_band,
      preview: true,
      last_message: "Interface preview only",
      last_message_at: new Date().toISOString(),
      unread_count: 0
    };
    const existingIndex = state.conversations.findIndex((item) => item.conversation_id === conversation.conversation_id);
    if (existingIndex >= 0) state.conversations[existingIndex] = conversation;
    else state.conversations.unshift(conversation);
    renderConversations();
    updateCommunityView("chats", true);
    openConversation(conversation);
  }

  async function initializeBackend() {
    if (state.backendReady) return state.client;
    if (!isConfigured) return null;
    if (state.backendLoading) return state.backendLoading;

    state.backendLoading = (async () => {
      await loadSupabaseSdk();
      if (!window.supabase?.createClient) throw new Error("The live chat library could not be loaded.");

      state.client = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
      });

      let { data: sessionData, error: sessionError } = await state.client.auth.getSession();
      if (sessionError) throw sessionError;

      if (!sessionData.session) {
        const result = await state.client.auth.signInAnonymously({ options: { data: { alias: state.alias } } });
        if (result.error) throw result.error;
        sessionData = { session: result.data.session };
      }

      state.user = sessionData.session?.user || null;
      if (!state.user) throw new Error("Anonymous sign-in did not create a session.");

      const { error: profileError } = await state.client.from("profiles").upsert({
        user_id: state.user.id,
        alias: state.alias,
        avatar_seed: stableSeed(state.user.id)
      });
      if (profileError) throw profileError;

      state.backendReady = true;
      renderBackendMode();
      subscribeToRequests();
      subscribeToInbox();
      return state.client;
    })();

    try {
      return await state.backendLoading;
    } finally {
      state.backendLoading = null;
    }
  }

  async function publishPresence() {
    if (!state.client || !state.position) return;
    const { error } = await state.client.rpc("upsert_presence", {
      p_latitude: state.position.latitude,
      p_longitude: state.position.longitude,
      p_discoverable: true
    });
    if (error) throw error;
  }

  function startPresenceHeartbeat() {
    clearPresenceHeartbeat();
    const interval = clamp(Number(config.presenceRefreshMs || 45000), 30000, 90000);
    state.presenceTimer = window.setInterval(async () => {
      if (!state.radarActive || document.hidden) return;
      try {
        await publishPresence();
        await refreshNearby();
      } catch {
        ui.nearbyStatus.textContent = "Connection interrupted · tap refresh";
      }
    }, interval);
  }

  function clearPresenceHeartbeat() {
    if (state.presenceTimer) window.clearInterval(state.presenceTimer);
    state.presenceTimer = null;
  }

  async function loadCommunityData() {
    if (!state.backendReady) return;
    await Promise.all([loadIncomingRequests(), loadConversations()]);
  }

  async function loadIncomingRequests() {
    const { data, error } = await state.client.rpc("list_chat_requests");
    if (error) throw error;
    state.incomingRequests = Array.isArray(data) ? data : [];
    renderIncomingRequests();
    setUnreadCount(state.incomingRequests.length + conversationUnreadCount());
  }

  function renderIncomingRequests() {
    if (!state.incomingRequests.length) {
      ui.chatRequests.hidden = true;
      ui.chatRequests.innerHTML = "";
      return;
    }

    ui.chatRequests.hidden = false;
    ui.chatRequests.innerHTML = `<strong>Chat requests</strong>${state.incomingRequests.map((request) => `
      <div class="chat-request-card">
        <span class="nearby-avatar" style="--avatar-bg:${avatarColor(request.avatar_seed)}">${escapeHtml(initials(request.sender_alias))}</span>
        <div><strong>${escapeHtml(request.sender_alias)}</strong><small>Wants to start an anonymous chat</small></div>
        <div class="chat-request-actions">
          <button type="button" data-request-action="accept" data-request-id="${escapeHtml(request.request_id)}">Accept</button>
          <button class="secondary" type="button" data-request-action="decline" data-request-id="${escapeHtml(request.request_id)}">Decline</button>
        </div>
      </div>`).join("")}`;
  }

  async function handleRequestAction(event) {
    const button = event.target.closest("[data-request-action]");
    if (!button || !state.backendReady) return;
    const accept = button.dataset.requestAction === "accept";
    button.disabled = true;

    try {
      const { data, error } = await state.client.rpc("respond_to_chat_request", {
        p_request_id: button.dataset.requestId,
        p_accept: accept
      });
      if (error) throw error;
      await loadCommunityData();
      if (accept && data) {
        const conversation = state.conversations.find((item) => item.conversation_id === data);
        if (conversation) openConversation(conversation);
      }
    } catch (error) {
      button.disabled = false;
      showToast(readableError(error));
    }
  }

  async function loadConversations() {
    const { data, error } = await state.client.rpc("list_conversations");
    if (error) throw error;
    state.conversations = Array.isArray(data) ? data : [];
    renderConversations();
    setUnreadCount(state.incomingRequests.length + conversationUnreadCount());
  }

  function renderConversations() {
    if (!state.conversations.length) {
      ui.conversationList.innerHTML = `
        <div class="community-empty-state compact">
          <strong>No traveler chats yet</strong>
          <p>Use Nearby to send someone a chat request.</p>
        </div>`;
      return;
    }

    ui.conversationList.innerHTML = state.conversations.map((conversation) => `
      <button class="conversation-card ${state.activeConversation?.conversation_id === conversation.conversation_id ? "active" : ""}" type="button" data-conversation-id="${escapeHtml(conversation.conversation_id)}">
        <span class="conversation-avatar" style="--avatar-bg:${avatarColor(conversation.avatar_seed)}">${escapeHtml(initials(conversation.partner_alias))}</span>
        <span>
          <strong>${escapeHtml(conversation.partner_alias)}</strong>
          <small>${escapeHtml(conversation.last_message || "New anonymous conversation")}</small>
          ${conversation.preview ? '<span class="preview-pill">PREVIEW</span>' : ""}
        </span>
        <i aria-hidden="true">${Number(conversation.unread_count || 0) > 0 ? "●" : "›"}</i>
      </button>`).join("");
  }

  function handleConversationAction(event) {
    const button = event.target.closest("[data-conversation-id]");
    if (!button) return;
    const conversation = state.conversations.find((item) => item.conversation_id === button.dataset.conversationId);
    if (conversation) openConversation(conversation);
  }

  async function openConversation(conversation) {
    state.activeConversation = conversation;
    ui.activeChatName.textContent = conversation.partner_alias;
    ui.activeChatStatus.textContent = conversation.preview
      ? "Preview conversation · messages stay on this device"
      : `${conversation.distance_band || "Anonymous traveler"} · exact location hidden`;
    ui.activeChatAvatar.textContent = initials(conversation.partner_alias);
    ui.activeChatAvatar.style.setProperty("--avatar-bg", avatarColor(conversation.avatar_seed));
    ui.toggleSafety.disabled = Boolean(conversation.preview);
    ui.safetyActions.hidden = true;
    ui.input.disabled = false;
    ui.input.placeholder = `Message ${conversation.partner_alias}…`;
    $("button[type='submit']", ui.form).disabled = false;
    ui.chatsPanel.classList.add("room-open");
    renderConversations();

    if (conversation.preview) {
      state.messages = [{
        id: "preview-note",
        sender_id: "system",
        body: "Preview mode: messages here are not sent to another person.",
        created_at: new Date().toISOString(),
        system: true
      }];
      renderMessages();
      return;
    }

    try {
      const { data, error } = await state.client
        .from("messages")
        .select("id,conversation_id,sender_id,body,created_at")
        .eq("conversation_id", conversation.conversation_id)
        .order("created_at", { ascending: true })
        .limit(200);
      if (error) throw error;
      state.messages = Array.isArray(data) ? data : [];
      renderMessages();
      await state.client.rpc("mark_conversation_read", { p_conversation_id: conversation.conversation_id });
      await loadConversations();
    } catch (error) {
      showToast(readableError(error));
    }
  }

  function renderMessages() {
    if (!state.messages.length) {
      ui.messages.innerHTML = `
        <div class="community-empty-state">
          <span aria-hidden="true">✦</span>
          <strong>Start with a friendly hello</strong>
          <p>Keep personal contact details, accommodation, and exact location private.</p>
        </div>`;
      return;
    }

    ui.messages.innerHTML = state.messages.map((message) => {
      const mine = state.user && message.sender_id === state.user.id;
      const kind = message.system ? "system" : mine ? "mine" : "theirs";
      return `<div class="traveler-message ${kind}"><div class="traveler-message-bubble">${escapeHtml(message.body)}<time>${escapeHtml(formatMessageTime(message.created_at))}</time></div></div>`;
    }).join("");
    ui.messages.scrollTop = ui.messages.scrollHeight;
  }

  async function sendMessage(event) {
    event.preventDefault();
    const body = ui.input.value.trim();
    const conversation = state.activeConversation;
    if (!body || !conversation) return;

    ui.input.value = "";
    if (conversation.preview) {
      state.messages.push({
        id: `preview-${Date.now()}`,
        sender_id: "preview-self",
        body,
        created_at: new Date().toISOString()
      });
      if (!state.user) state.user = { id: "preview-self" };
      renderMessages();
      return;
    }

    const submit = $("button[type='submit']", ui.form);
    submit.disabled = true;
    try {
      const { error } = await state.client.from("messages").insert({
        conversation_id: conversation.conversation_id,
        body
      });
      if (error) throw error;
    } catch (error) {
      ui.input.value = body;
      showToast(readableError(error));
    } finally {
      submit.disabled = false;
    }
  }

  function subscribeToInbox() {
    if (state.inboxChannel || !state.user) return;
    state.inboxChannel = state.client
      .channel(`lakbay-inbox-${state.user.id}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages"
      }, async (payload) => {
        const isOpenConversation = state.activeConversation?.conversation_id === payload.new.conversation_id;
        if (isOpenConversation && !state.messages.some((message) => message.id === payload.new.id)) {
          state.messages.push(payload.new);
          renderMessages();
          await state.client.rpc("mark_conversation_read", { p_conversation_id: payload.new.conversation_id });
        }
        await loadConversations();
      })
      .subscribe();
  }

  function subscribeToRequests() {
    if (state.requestChannel || !state.user) return;
    state.requestChannel = state.client
      .channel(`lakbay-requests-${state.user.id}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "chat_requests"
      }, () => loadCommunityData().catch(handleBackendError))
      .subscribe();
  }

  async function reportActiveUser() {
    const conversation = state.activeConversation;
    if (!conversation || conversation.preview || !state.backendReady) return;
    ui.reportUser.disabled = true;
    try {
      const { error } = await state.client.from("reports").insert({
        reported_id: conversation.partner_id,
        conversation_id: conversation.conversation_id,
        reason: ui.reportReason.value
      });
      if (error) throw error;
      ui.safetyActions.hidden = true;
      showToast("Report received. Thank you for helping keep travelers safe.");
    } catch (error) {
      showToast(readableError(error));
    } finally {
      ui.reportUser.disabled = false;
    }
  }

  async function blockActiveUser() {
    const conversation = state.activeConversation;
    if (!conversation || conversation.preview || !state.backendReady) return;
    if (!window.confirm(`Block ${conversation.partner_alias}? You will no longer see or receive messages from this traveler.`)) return;

    ui.blockUser.disabled = true;
    try {
      const { error } = await state.client.rpc("block_user", { p_user_id: conversation.partner_id });
      if (error) throw error;
    } catch (error) {
      ui.blockUser.disabled = false;
      showToast(readableError(error));
      return;
    }
    ui.blockUser.disabled = false;

    state.activeConversation = null;
    state.messages = [];
    ui.chatsPanel.classList.remove("room-open");
    await loadCommunityData();
    if (state.radarActive) await refreshNearby();
    showToast("Traveler blocked.");
  }

  async function endActiveConversation() {
    const conversation = state.activeConversation;
    if (!conversation || conversation.preview || !state.backendReady) return;
    if (!window.confirm(`End your chat with ${conversation.partner_alias}? The conversation will close for both travelers.`)) return;

    ui.endChat.disabled = true;
    try {
      const { error } = await state.client.rpc("end_conversation", {
        p_conversation_id: conversation.conversation_id
      });
      if (error) throw error;
    } catch (error) {
      ui.endChat.disabled = false;
      showToast(readableError(error));
      return;
    }

    ui.endChat.disabled = false;
    state.activeConversation = null;
    state.messages = [];
    ui.chatsPanel.classList.remove("room-open");
    await loadCommunityData();
    showToast("Conversation ended.");
  }

  function setUnreadCount(count) {
    const value = clamp(Number(count || 0), 0, 99);
    [ui.unread, ui.mobileChatBadge].forEach((badge) => {
      badge.hidden = value === 0;
      badge.textContent = value > 9 ? "9+" : String(value);
    });
  }

  function conversationUnreadCount() {
    return state.conversations.reduce((total, item) => total + Number(item.unread_count || 0), 0);
  }

  function getApproximatePosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Location is not supported by this browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        reject,
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 120000 }
      );
    });
  }

  function loadSupabaseSdk() {
    if (window.supabase?.createClient) return Promise.resolve();
    const existing = $("script[data-lakbay-supabase]");
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", () => reject(new Error("The live chat library could not be loaded.")), { once: true });
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = config.supabaseJsUrl || "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.async = true;
      script.dataset.lakbaySupabase = "true";
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", () => {
        script.remove();
        reject(new Error("The live chat library could not be loaded."));
      }, { once: true });
      document.head.appendChild(script);
    });
  }

  function cleanup() {
    clearPresenceHeartbeat();
    if (state.client && state.inboxChannel) state.client.removeChannel(state.inboxChannel);
    if (state.client && state.requestChannel) state.client.removeChannel(state.requestChannel);
  }

  function handleBackendError(error) {
    ui.chatConnectionState.innerHTML = "<i></i> Offline";
    ui.chatConnectionState.classList.remove("live");
    showToast(readableError(error));
  }

  function locationErrorMessage(error) {
    if (error?.code === 1) return "Location permission was not granted. Radar remains off.";
    if (error?.code === 2) return "Your location is unavailable right now.";
    if (error?.code === 3) return "Location request timed out. Please try again.";
    return readableError(error);
  }

  function readableError(error) {
    const message = String(error?.message || error || "Something went wrong.");
    if (/row-level security|permission denied/i.test(message)) return "Community access is not configured correctly yet.";
    if (/failed to fetch|network/i.test(message)) return "The community service is unavailable. Check your connection and try again.";
    return message.length > 140 ? "The community service could not complete that request." : message;
  }

  function showToast(message) {
    if (!ui.toast) return;
    window.clearTimeout(state.toastTimer);
    ui.toast.textContent = message;
    ui.toast.classList.add("show");
    state.toastTimer = window.setTimeout(() => ui.toast.classList.remove("show"), 3600);
  }

  function createAlias() {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(10 + Math.random() * 90);
    return `${adjective}${noun}${number}`;
  }

  function isValidAlias(value) {
    return /^(Cloud|Cozy|Foggy|Gentle|Misty|Pine|Quiet|Sage|Sunny|Wandering)(Deer|Finch|Fox|Hiker|Owl|Panda|Robin|Spruce|Taho|Trail)[0-9]{2}$/.test(String(value || ""));
  }

  function stableSeed(value) {
    return String(value || "").split("").reduce((sum, character) => (sum + character.charCodeAt(0)) % 997, 0);
  }

  function initials(alias) {
    const parts = String(alias || "Traveler").match(/[A-Z][a-z]*/g) || [String(alias || "T")];
    return parts.slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase();
  }

  function avatarColor(seed) {
    return avatarColors[Math.abs(Number(seed || 0)) % avatarColors.length];
  }

  function formatMessageTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-PH", { hour: "numeric", minute: "2-digit" }).format(date);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    })[character]);
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Storage can be unavailable. */ }
  }
})();
