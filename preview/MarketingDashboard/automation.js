const PLATFORM_PLAN = {
  facebook: { name: "Facebook", icon: "fa-facebook-f", color: "#287be0", peaks: [[9, 2.4, 56], [19, 3, 30]], slots: [[2, 9], [4, 9], [6, 10]] },
  instagram: { name: "Instagram", icon: "fa-instagram", color: "#d55388", peaks: [[18, 3.1, 61], [12, 2.5, 28]], slots: [[1, 18], [2, 17], [4, 18]] },
  x: { name: "X", icon: "fa-x-twitter", color: "#202523", peaks: [[10, 2.5, 63], [18, 2.8, 22]], slots: [[3, 10], [4, 10], [5, 10]] },
  tiktok: { name: "TikTok", icon: "fa-tiktok", color: "#ef466f", peaks: [[9, 2.5, 42], [21, 3, 55]], slots: [[4, 9], [2, 10], [0, 16]] },
  threads: { name: "Threads", icon: "fa-threads", color: "#7359c7", peaks: [[8, 2.3, 59], [13, 2.5, 32]], slots: [[2, 8], [3, 12], [5, 14]] },
  youtube: { name: "YouTube", icon: "fa-youtube", color: "#ea4138", peaks: [[20, 3.5, 58], [12, 3.2, 28]], slots: [[0, 10], [3, 7], [5, 12]] },
  linkedin: { name: "LinkedIn", icon: "fa-linkedin-in", color: "#0a66c2", peaks: [[16, 2.7, 58], [19, 2.6, 36]], slots: [[3, 16], [5, 15], [4, 17]] }
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const AGE_PROFILES = [
  [[21, 3.1, 32], [8, 2.2, 13]],
  [[19, 2.8, 28], [8, 2, 19]],
  [[18, 2.6, 23], [9, 2.2, 24]],
  [[9, 2.5, 30], [18, 2.5, 19]]
];
const state = { files: [], previewUrls: [], mediaMeta: [], queue: [], schedulePreferences: {}, previewPlatform: "facebook", previewDevice: "desktop", dragIndex: null };
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  $("#automationFooterYear").textContent = new Date().getFullYear();
  setInitialDate();
  bindUpload();
  bindComposer();
  bindPlanningControls();
  bindPostPreview();
  renderPlatformSchedule();
  renderPostPreview();
  updateWorkflow();
  $("#buildSchedule").addEventListener("click", buildSchedule);
  $("#exportQueue").addEventListener("click", exportQueue);
});

function setInitialDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  $("#startDate").value = isoDate(date);
  $("#startDate").min = isoDate(new Date());
}

function bindUpload() {
  const input = $("#mediaInput");
  const zone = $("#uploadZone");
  input.addEventListener("change", () => acceptFiles(input.files));
  ["dragenter", "dragover"].forEach(eventName => zone.addEventListener(eventName, event => {
    event.preventDefault();
    zone.classList.add("dragging");
  }));
  ["dragleave", "drop"].forEach(eventName => zone.addEventListener(eventName, event => {
    event.preventDefault();
    zone.classList.remove("dragging");
  }));
  zone.addEventListener("drop", event => acceptFiles(event.dataTransfer.files));
}

function acceptFiles(fileList) {
  const room = Math.max(0, 10 - state.files.length);
  const valid = [...fileList].filter(file => file.type.startsWith("image/") || file.type.startsWith("video/")).slice(0, room);
  valid.forEach(file => {
    const url = URL.createObjectURL(file);
    state.files.push(file);
    state.previewUrls.push(url);
    state.mediaMeta.push({ width: null, height: null, duration: null, size: file.size });
    loadMediaMetadata(file, url);
  });
  $("#mediaInput").value = "";
  renderMedia();
  renderPlatformSchedule();
  renderPostPreview();
  invalidateQueue();
  if (valid.length) showToast(`${valid.length} media file${valid.length === 1 ? "" : "s"} added`);
  else if (!room) showToast("The 10-file limit has been reached");
}

function renderMedia() {
  const preview = $("#mediaPreview");
  if (!state.files.length) {
    preview.innerHTML = `<div class="empty-media"><i class="fa-regular fa-images"></i><span>Your previews will appear here</span></div>`;
    return;
  }
  preview.innerHTML = state.files.map((file, index) => {
    const media = file.type.startsWith("video/")
      ? `<video src="${state.previewUrls[index]}" muted preload="metadata"></video>`
      : `<img src="${state.previewUrls[index]}" alt="Preview of ${escapeHtml(file.name)}">`;
    return `<article class="media-list-item" draggable="true" data-index="${index}">
      <span class="media-drag-handle" title="Drag to reorder"><i class="fa-solid fa-grip-vertical" aria-hidden="true"></i></span>
      <span class="media-list-thumb">${media}</span>
      <span class="media-list-info"><strong>${escapeHtml(file.name)}</strong><small>${mediaDetail(file, state.mediaMeta[index])}</small></span>
      <span class="media-order-badge">${index === 0 ? "Cover" : String(index + 1).padStart(2, "0")}</span>
      <span class="media-list-actions">
        <button type="button" data-media-action="up" data-index="${index}" ${index === 0 ? "disabled" : ""} aria-label="Move ${escapeHtml(file.name)} earlier"><i class="fa-solid fa-arrow-up"></i></button>
        <button type="button" data-media-action="down" data-index="${index}" ${index === state.files.length - 1 ? "disabled" : ""} aria-label="Move ${escapeHtml(file.name)} later"><i class="fa-solid fa-arrow-down"></i></button>
        <button type="button" data-media-action="remove" data-index="${index}" aria-label="Remove ${escapeHtml(file.name)}"><i class="fa-solid fa-trash"></i></button>
      </span>
    </article>`;
  }).join("");
  bindMediaOrdering();
}

function loadMediaMetadata(file, url) {
  const target = file.type.startsWith("video/") ? document.createElement("video") : new Image();
  const done = () => {
    const index = state.previewUrls.indexOf(url);
    if (index < 0) return;
    const width = target.videoWidth || target.naturalWidth || null;
    const height = target.videoHeight || target.naturalHeight || null;
    const duration = Number.isFinite(target.duration) ? target.duration : null;
    state.mediaMeta[index] = { ...state.mediaMeta[index], width, height, duration };
    renderMedia();
  };
  if (file.type.startsWith("video/")) {
    target.preload = "metadata";
    target.onloadedmetadata = done;
  } else {
    target.onload = done;
  }
  target.src = url;
}

function bindMediaOrdering() {
  $$("[data-media-action]").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.index);
    if (button.dataset.mediaAction === "remove") return removeMedia(index);
    const target = button.dataset.mediaAction === "up" ? index - 1 : index + 1;
    reorderMedia(index, target);
  }));
  $$(".media-list-item").forEach(item => {
    item.addEventListener("dragstart", event => {
      state.dragIndex = Number(item.dataset.index);
      item.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
    });
    item.addEventListener("dragover", event => {
      event.preventDefault();
      item.classList.add("drag-over");
      event.dataTransfer.dropEffect = "move";
    });
    item.addEventListener("dragleave", () => item.classList.remove("drag-over"));
    item.addEventListener("drop", event => {
      event.preventDefault();
      reorderMedia(state.dragIndex, Number(item.dataset.index));
    });
    item.addEventListener("dragend", () => {
      state.dragIndex = null;
      $$(".media-list-item").forEach(row => row.classList.remove("dragging", "drag-over"));
    });
  });
}

function reorderMedia(from, to) {
  if (!Number.isInteger(from) || !Number.isInteger(to) || from === to || to < 0 || to >= state.files.length) return;
  [state.files, state.previewUrls, state.mediaMeta].forEach(collection => collection.splice(to, 0, collection.splice(from, 1)[0]));
  syncMediaChanges("Media order updated");
}

function removeMedia(index) {
  if (!Number.isInteger(index) || index < 0 || index >= state.files.length) return;
  URL.revokeObjectURL(state.previewUrls[index]);
  state.files.splice(index, 1);
  state.previewUrls.splice(index, 1);
  state.mediaMeta.splice(index, 1);
  syncMediaChanges("Media removed");
}

function syncMediaChanges(message) {
  renderMedia();
  renderPlatformSchedule();
  renderPostPreview();
  invalidateQueue();
  showToast(message);
}

function mediaDetail(file, meta) {
  const dimensions = meta?.width && meta?.height ? `${meta.width} × ${meta.height}` : file.type.startsWith("video/") ? "Video" : "Image";
  const duration = meta?.duration ? ` · ${Math.round(meta.duration)} sec` : "";
  const size = ` · ${formatFileSize(file.size)}`;
  return `${dimensions}${duration}${size}`;
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function renderPostPreview() {
  const platformId = state.previewPlatform;
  const platform = PLATFORM_PLAN[platformId];
  const brand = $("#campaignInput").value.trim() || "Your Brand";
  const handle = brand.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24) || "yourbrand";
  const rawCaption = $("#captionInput").value.trim();
  const caption = escapeHtml(rawCaption || "Your caption will appear here as you type.");
  const captionClass = rawCaption ? "social-caption" : "social-caption placeholder";
  const media = previewMediaMarkup(platformId);
  const card = $("#socialPreview");

  if (platformId === "tiktok") {
    card.innerHTML = `<article class="social-card tiktok-card" style="--preview-brand:${platform.color}">
      ${media}
      <div class="tiktok-overlay"><strong>@${escapeHtml(handle)}</strong><p>${caption}</p></div>
      <div class="tiktok-actions" aria-hidden="true"><span><i class="fa-solid fa-heart"></i>2.4K</span><span><i class="fa-solid fa-comment-dots"></i>128</span><span><i class="fa-solid fa-bookmark"></i>Save</span><span><i class="fa-solid fa-share"></i>Share</span></div>
    </article>`;
  } else {
    const identityMeta = {
      facebook: "Just now · Public",
      instagram: `@${handle}`,
      x: `@${handle} · now`,
      threads: `@${handle} · now`,
      youtube: "Just now · Community",
      linkedin: "Your organization · Just now"
    }[platformId];
    const stats = {
      facebook: "24 reactions · 3 comments",
      instagram: "128 likes",
      x: "18 replies · 42 reposts · 310 likes",
      threads: "32 replies · 96 likes",
      youtube: "42 likes · 8 comments",
      linkedin: "64 reactions · 7 comments"
    }[platformId];
    card.innerHTML = `<article class="social-card ${platformId}-card" style="--preview-brand:${platform.color}">
      <div class="social-card-inner">
        <header class="social-card-header">
          <span class="social-avatar"><i class="fa-brands ${platform.icon}" aria-hidden="true"></i></span>
          <span class="social-identity"><strong>${escapeHtml(brand)}</strong><small>${escapeHtml(identityMeta)}</small></span>
          <i class="fa-solid fa-ellipsis social-more" aria-hidden="true"></i>
        </header>
        <p class="${captionClass}">${caption}</p>
        ${media}
        <div class="social-stats"><span>${stats}</span><span>Preview</span></div>
        ${previewActions(platformId)}
      </div>
    </article>`;
  }

  renderPreviewSchedule();
  const chosen = $(`input[name='platform'][value='${platformId}']`).checked;
  $("#previewDisclaimer").innerHTML = chosen
    ? `<i class="fa-solid fa-circle-info"></i> This visual preview is an approximation. Final formatting can vary by platform.`
    : `<i class="fa-solid fa-triangle-exclamation"></i> ${platform.name} is in preview mode but is not selected in “Publish to”.`;
}

function previewMediaMarkup(platformId) {
  if (!state.files.length) return `<div class="preview-media"><div class="preview-media-placeholder"><i class="fa-regular fa-image"></i></div></div>`;
  const supportsGallery = ["facebook", "x", "threads", "linkedin"].includes(platformId);
  if (state.files.length > 1 && supportsGallery) {
    const visibleCount = Math.min(4, state.files.length);
    const tiles = Array.from({ length: visibleCount }, (_, index) => {
      const remaining = state.files.length - visibleCount;
      const overlay = index === visibleCount - 1 && remaining > 0 ? `<span class="gallery-more">+${remaining}</span>` : "";
      return `<span class="preview-media-tile">${previewMediaElement(index, false)}${overlay}</span>`;
    }).join("");
    return `<div class="preview-media multi-media-grid media-count-${visibleCount}">${tiles}</div>`;
  }
  const count = state.files.length > 1 ? `<span class="preview-media-count">1 / ${state.files.length}</span>` : "";
  const dots = state.files.length > 1 && platformId === "instagram" ? `<span class="carousel-dots">${state.files.map((_, index) => `<i class="${index === 0 ? "active" : ""}"></i>`).join("")}</span>` : "";
  return `<div class="preview-media">${previewMediaElement(0, true)}${count}${dots}</div>`;
}

function previewMediaElement(index, controls) {
  const file = state.files[index];
  const source = escapeHtml(state.previewUrls[index]);
  return file.type.startsWith("video/")
    ? `<video src="${source}" ${controls ? "controls" : ""} muted playsinline preload="metadata"></video>`
    : `<img src="${source}" alt="Preview ${index + 1}: ${escapeHtml(file.name)}">`;
}

function previewActions(platformId) {
  const actions = {
    facebook: [["fa-thumbs-up", "Like"], ["fa-comment", "Comment"], ["fa-share", "Share"], ["fa-bookmark", "Save"]],
    instagram: [["fa-heart", "Like"], ["fa-comment", "Comment"], ["fa-paper-plane", "Share"], ["fa-bookmark", "Save"]],
    x: [["fa-comment", "Reply"], ["fa-retweet", "Repost"], ["fa-heart", "Like"], ["fa-bookmark", "Save"]],
    threads: [["fa-heart", "Like"], ["fa-comment", "Reply"], ["fa-retweet", "Repost"], ["fa-paper-plane", "Share"]],
    youtube: [["fa-thumbs-up", "Like"], ["fa-comment", "Comment"], ["fa-share", "Share"], ["fa-bookmark", "Save"]],
    linkedin: [["fa-thumbs-up", "Like"], ["fa-comment", "Comment"], ["fa-retweet", "Repost"], ["fa-paper-plane", "Send"]]
  }[platformId];
  return `<div class="social-actions" aria-hidden="true">${actions.map(([icon, label]) => `<span><i class="fa-solid ${icon}"></i>${label}</span>`).join("")}</div>`;
}

function renderPreviewSchedule() {
  const start = parseLocalDate($("#startDate").value || isoDate(new Date()));
  const recommendation = getPlatformSchedule(state.previewPlatform, start);
  const timezone = $("#automationTimezone").selectedOptions[0].textContent;
  $("#previewScheduleTime").textContent = recommendation.isNow
    ? `Post now · ${timezone}`
    : `${formatDate(recommendation.date)} · ${formatTime(recommendation.hour, recommendation.minute)} · ${timezone}`;
}

function bindComposer() {
  const caption = $("#captionInput");
  caption.addEventListener("input", () => {
    $("#captionCount").textContent = caption.value.length.toLocaleString();
    renderPostPreview();
    invalidateQueue();
  });
  $("#campaignInput").addEventListener("input", renderPostPreview);
  $$("#hashtagList button").forEach(button => button.addEventListener("click", () => {
    const spacer = caption.value && !caption.value.endsWith(" ") ? " " : "";
    if (!caption.value.includes(button.textContent)) caption.value = `${caption.value}${spacer}${button.textContent}`.slice(0, 2200);
    caption.dispatchEvent(new Event("input"));
    caption.focus();
  }));
}

function bindPlanningControls() {
  ["formatInput", "startDate", "automationTimezone"].forEach(id => {
    $("#" + id).addEventListener("change", () => {
      renderPlatformSchedule();
      renderPreviewSchedule();
      invalidateQueue();
    });
  });
  $$("input[name='platform']").forEach(input => input.addEventListener("change", () => {
    if (input.checked) {
      state.previewPlatform = input.value;
      $("#previewPlatform").value = input.value;
    }
    renderPlatformSchedule();
    renderPostPreview();
    invalidateQueue();
  }));
  $("#platformScheduleList").addEventListener("change", event => {
    const row = event.target.closest("[data-platform-schedule]");
    if (!row) return;
    const platformId = row.dataset.platformSchedule;
    const preference = state.schedulePreferences[platformId] || { mode: "recommended", date: "", time: "" };
    if (event.target.matches("[data-schedule-mode]")) preference.mode = event.target.value;
    if (event.target.matches("[data-schedule-date]")) preference.date = event.target.value;
    if (event.target.matches("[data-schedule-time]")) preference.time = event.target.value;
    state.schedulePreferences[platformId] = preference;
    renderPlatformSchedule();
    renderPreviewSchedule();
    invalidateQueue();
  });
}

function bindPostPreview() {
  $("#previewPlatform").addEventListener("change", event => {
    state.previewPlatform = event.target.value;
    renderPostPreview();
  });
  $$(".device-toggle button").forEach(button => button.addEventListener("click", () => {
    state.previewDevice = button.dataset.device;
    $$(".device-toggle button").forEach(option => {
      const active = option === button;
      option.classList.toggle("active", active);
      option.setAttribute("aria-pressed", active ? "true" : "false");
    });
    $("#previewStage").classList.toggle("mobile", state.previewDevice === "mobile");
    $("#previewStage").classList.toggle("desktop", state.previewDevice === "desktop");
  }));
  $("#previewStage").classList.add("desktop");
}

function buildSchedule() {
  const caption = $("#captionInput").value.trim();
  const selected = $$("input[name='platform']:checked").map(input => input.value);
  if (!state.files.length && !caption) return showToast("Add media or a caption first");
  if (!selected.length) return showToast("Choose at least one platform");

  const start = parseLocalDate($("#startDate").value || new Date().toISOString().slice(0, 10));
  const mode = "peak";
  const fileName = state.files.length > 1 ? `${state.files.length}-item media post` : state.files[0]?.name || caption.slice(0, 42) || "Caption post";
  const contentType = readablePostType(state.files, $("#formatInput").value);
  state.queue = [];

  selected.forEach(platformId => {
    const platform = PLATFORM_PLAN[platformId];
    const recommendation = getPlatformSchedule(platformId, start, mode);
    state.queue.push({
      platformId,
      platform,
      fileName,
      mediaNames: state.files.map(file => file.name),
      contentType,
      date: recommendation.date,
      hour: recommendation.hour,
      minute: recommendation.minute,
      isNow: recommendation.isNow,
      scheduleMode: recommendation.scheduleMode,
      score: recommendation.score,
      caption
    });
  });

  state.queue.sort((a, b) => Number(b.isNow) - Number(a.isNow) || a.date - b.date || (a.hour * 60 + a.minute) - (b.hour * 60 + b.minute));
  renderQueue();
  updateWorkflow();
  showToast("Publishing queue prepared - nothing was posted");
}

function buildDashboardActivity(platformId, ageValue = "all") {
  const platform = PLATFORM_PLAN[platformId];
  const agePeaks = ageValue === "all"
    ? AGE_PROFILES.flat().map(([center, width, amplitude]) => [center, width, amplitude / AGE_PROFILES.length])
    : AGE_PROFILES[Number(ageValue)];
  const values = Array.from({ length: 24 }, (_, hour) => {
    let value = 12;
    [...platform.peaks, ...agePeaks].forEach(([center, width, amplitude]) => {
      const distance = Math.min(Math.abs(hour - center), 24 - Math.abs(hour - center));
      value += amplitude * Math.exp(-(distance * distance) / (2 * width * width));
    });
    return value;
  });
  const max = Math.max(...values);
  const min = Math.min(...values);
  return values.map(value => Math.round(24 + ((value - min) / (max - min)) * 76));
}

function getPlatformSchedule(platformId, startDate = parseLocalDate($("#startDate").value), mode = "peak", contentIndex = 0) {
  const platform = PLATFORM_PLAN[platformId];
  const contentType = selectedContentType();
  const activity = buildDashboardActivity(platformId).map((value, hour) => Math.max(8, Math.min(100, Math.round(value * .9 + contentAdjustment(contentType, platformId, hour)))));
  const peakHour = activity.indexOf(Math.max(...activity));
  let hour = peakHour;
  if (mode === "earliest") hour = Math.max(7, peakHour - 1);
  if (mode === "balanced" && contentIndex > 0) hour = (peakHour + contentIndex * 2) % 24;
  const candidates = platform.slots.map(([weekday]) => nextWeekday(startDate, weekday, contentIndex * 7));
  let date = candidates.sort((a, b) => a - b)[0];
  let minute = 0;
  let isNow = false;
  let scheduleMode = "recommended";
  const preference = state.schedulePreferences[platformId];
  if (preference?.mode === "now") {
    const now = new Date();
    date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
    hour = now.getHours();
    minute = now.getMinutes();
    isNow = true;
    scheduleMode = "now";
  } else if (preference?.mode === "custom" && preference.date && preference.time) {
    const [customHour, customMinute] = preference.time.split(":").map(Number);
    date = parseLocalDate(preference.date);
    hour = Number.isFinite(customHour) ? customHour : hour;
    minute = Number.isFinite(customMinute) ? customMinute : 0;
    scheduleMode = "custom";
  }
  return { date, hour, minute, score: activity[hour], peakHour, isNow, scheduleMode };
}

function selectedContentType() {
  const selected = $("#formatInput").value;
  if (selected !== "auto") return selected;
  if (state.files.some(file => file.type.startsWith("video/"))) return "shortVideo";
  if (state.files.some(file => file.type.startsWith("image/"))) return "image";
  return "general";
}

function contentAdjustment(type, platformId, hour) {
  const affinity = {
    general: {},
    shortVideo: { instagram: 7, tiktok: 9, youtube: 7, linkedin: -5, x: -2 },
    image: { instagram: 8, facebook: 6, threads: 3, youtube: -3 },
    article: { linkedin: 10, x: 7, facebook: 5, tiktok: -8, instagram: -3 },
    longVideo: { youtube: 11, facebook: 3, tiktok: -3, x: -4 },
    announcement: { x: 9, threads: 8, linkedin: 4, facebook: 3 }
  }[type] || {};
  const peakMap = {
    general: [],
    shortVideo: [[20, 3, 13]],
    image: [[12, 2.2, 7], [18, 2.8, 9]],
    article: [[9, 2.6, 14]],
    longVideo: [[18, 3.2, 13]],
    announcement: [[10, 2.4, 8], [18, 2.6, 8]]
  };
  const timeBoost = (peakMap[type] || []).reduce((total, [center, width, amplitude]) => {
    const distance = Math.min(Math.abs(hour - center), 24 - Math.abs(hour - center));
    return total + amplitude * Math.exp(-(distance * distance) / (2 * width * width));
  }, 0);
  return timeBoost + (affinity[platformId] || 0);
}

function renderPlatformSchedule() {
  const selected = $$("input[name='platform']:checked").map(input => input.value);
  const list = $("#platformScheduleList");
  if (!selected.length) {
    list.innerHTML = `<div class="schedule-empty">Choose at least one social platform.</div>`;
    return;
  }
  const start = parseLocalDate($("#startDate").value || isoDate(new Date()));
  list.innerHTML = selected.map(platformId => {
    const platform = PLATFORM_PLAN[platformId];
    const baseline = getPlatformScheduleWithoutOverride(platformId, start);
    const preference = state.schedulePreferences[platformId] || { mode: "recommended", date: isoDate(baseline.date), time: timeInputValue(baseline.hour, baseline.minute) };
    if (preference.mode === "recommended") {
      preference.date = isoDate(baseline.date);
      preference.time = timeInputValue(baseline.hour, baseline.minute);
    }
    if (!preference.date) preference.date = isoDate(baseline.date);
    if (!preference.time) preference.time = timeInputValue(baseline.hour, baseline.minute);
    state.schedulePreferences[platformId] = preference;
    const recommendation = getPlatformSchedule(platformId, start);
    const windowLabel = "Audience peak";
    const statusText = recommendation.isNow ? "Post now" : preference.mode === "custom" ? "Custom schedule" : windowLabel;
    return `<article class="platform-schedule-row" data-platform-schedule="${platformId}" style="--schedule-color:${platform.color}">
      <div class="schedule-row-main">
        <span class="schedule-platform-icon"><i class="fa-brands ${platform.icon}" aria-hidden="true"></i></span>
        <span class="schedule-platform-name"><strong>${platform.name}</strong><small>${DAY_NAMES[recommendation.date.getDay()]} · score ${recommendation.score}/100</small></span>
        <label class="schedule-mode-field"><span>Posting choice</span><select data-schedule-mode aria-label="${platform.name} posting choice">
          <option value="recommended" ${preference.mode === "recommended" ? "selected" : ""}>Use dashboard peak</option>
          <option value="custom" ${preference.mode === "custom" ? "selected" : ""}>Custom date & time</option>
          <option value="now" ${preference.mode === "now" ? "selected" : ""}>Post now</option>
        </select></label>
      </div>
      <div class="schedule-time-editor ${preference.mode}">
        <label><span>Date</span><input type="date" data-schedule-date value="${escapeHtml(preference.date)}" min="${escapeHtml($("#startDate").min || isoDate(new Date()))}" ${preference.mode === "custom" ? "" : "disabled"} aria-label="${platform.name} custom date"></label>
        <label><span>Time</span><input type="time" data-schedule-time value="${escapeHtml(preference.time)}" ${preference.mode === "custom" ? "" : "disabled"} aria-label="${platform.name} custom time"></label>
        <span class="schedule-peak"><strong>${recommendation.isNow ? "Now" : formatTime(recommendation.hour, recommendation.minute)}</strong><small>${statusText}</small></span>
      </div>
    </article>`;
  }).join("");
}

function getPlatformScheduleWithoutOverride(platformId, startDate) {
  const preference = state.schedulePreferences[platformId];
  delete state.schedulePreferences[platformId];
  const result = getPlatformSchedule(platformId, startDate);
  if (preference) state.schedulePreferences[platformId] = preference;
  return result;
}

function updateWorkflow() {
  const hasContent = state.files.length > 0 || $("#captionInput").value.trim().length > 0;
  const hasPlatform = $$("input[name='platform']:checked").length > 0;
  $("#workflowContent").classList.toggle("ready", hasContent);
  $("#workflowScore").classList.toggle("ready", state.queue.length > 0);
  $("#workflowQueue").classList.toggle("ready", state.queue.length > 0);
  $("#buildSchedule").disabled = !hasContent || !hasPlatform;
  if (!state.queue.length) $("#queueSummary").textContent = !hasContent ? "Waiting for content" : !hasPlatform ? "Choose a platform" : "Ready to publish";
}

function invalidateQueue() {
  if (state.queue.length) {
    state.queue = [];
    $("#queueList").innerHTML = `<div class="queue-empty"><span><i class="fa-regular fa-calendar-check"></i></span><h3>Schedule needs an update</h3><p>Your inputs changed. Select Publish again to refresh the queue.</p></div>`;
    $("#exportQueue").disabled = true;
  }
  updateWorkflow();
}

function renderQueue() {
  const list = $("#queueList");
  const timezone = $("#automationTimezone").selectedOptions[0].textContent;
  list.innerHTML = state.queue.map(item => `
    <article class="queue-item" style="--queue-color:${item.platform.color}">
      <span class="queue-platform"><i class="fa-brands ${item.platform.icon}"></i></span>
      <div class="queue-content"><strong>${escapeHtml(item.fileName)}</strong><small>${item.platform.name} · ${item.contentType}</small></div>
      <div class="queue-time"><strong>${item.isNow ? "Post now" : `${formatDate(item.date)} · ${formatTime(item.hour, item.minute)}`}</strong><small>${escapeHtml(timezone)} · ${item.scheduleMode === "custom" ? "Custom" : item.isNow ? "Immediate" : "Dashboard peak"}</small></div>
      <div class="queue-score"><strong>${item.score}</strong><small>/100 fit</small></div>
      <span class="draft-badge">Draft</span>
    </article>`).join("");
  $("#queueSummary").textContent = `${state.queue.length} draft slot${state.queue.length === 1 ? "" : "s"}`;
  $("#exportQueue").disabled = false;
}

function exportQueue() {
  if (!state.queue.length) return;
  const rows = [["Status", "Content", "Media order", "Format", "Platform", "Date", "Time", "Schedule choice", "Timezone", "Caption"]];
  const timezone = $("#automationTimezone").value;
  state.queue.forEach(item => rows.push(["Draft only", item.fileName, item.mediaNames.join(" | "), item.contentType, item.platform.name, isoDate(item.date), item.isNow ? "Post now" : formatTime(item.hour, item.minute), item.scheduleMode, timezone, item.caption]));
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `signal-desk-automation-draft-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Draft queue exported - nothing was published");
}

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}
function nextWeekday(start, weekday, extraDays = 0) {
  const date = new Date(start);
  date.setDate(date.getDate() + ((weekday - date.getDay() + 7) % 7) + extraDays);
  return date;
}
function readablePostType(files, selected) {
  if (selected !== "auto") return { image: "Image / carousel", shortVideo: "Reel / short video", longVideo: "Long-form video", article: "Article / link", announcement: "Announcement" }[selected];
  if (files.length > 1 && files.every(file => file.type.startsWith("image/"))) return `Carousel · ${files.length} images`;
  if (files.length > 1) return `Mixed media · ${files.length} items`;
  if (files[0]?.type.startsWith("video/")) return "Video / reel";
  if (files[0]?.type.startsWith("image/")) return "Image post";
  return "Caption post";
}
function formatDate(date) { return new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(date); }
function isoDate(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function formatTime(hour, minute = 0) { return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`; }
function timeInputValue(hour, minute = 0) { return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
function showToast(message) {
  const toast = $("#automationToast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}
