const PLATFORM_PLAN = {
  facebook: { name: "Facebook", icon: "fa-facebook-f", color: "#287be0", weekday: 2, hour: 9 },
  instagram: { name: "Instagram", icon: "fa-instagram", color: "#d55388", weekday: 1, hour: 15 },
  x: { name: "X", icon: "fa-x-twitter", color: "#202523", weekday: 3, hour: 9 },
  tiktok: { name: "TikTok", icon: "fa-tiktok", color: "#ef466f", weekday: 4, hour: 19 },
  threads: { name: "Threads", icon: "fa-threads", color: "#7359c7", weekday: 2, hour: 8 },
  youtube: { name: "YouTube", icon: "fa-youtube", color: "#ea4138", weekday: 0, hour: 20 },
  linkedin: { name: "LinkedIn", icon: "fa-linkedin-in", color: "#0a66c2", weekday: 3, hour: 16 }
};

const state = { files: [], previewUrls: [], queue: [] };
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  setInitialDate();
  bindUpload();
  bindComposer();
  bindPlanningControls();
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
  const valid = [...fileList].filter(file => file.type.startsWith("image/") || file.type.startsWith("video/")).slice(0, 8);
  state.files = valid;
  state.previewUrls.forEach(url => URL.revokeObjectURL(url));
  state.previewUrls = valid.map(URL.createObjectURL);
  renderMedia();
  invalidateQueue();
  if (valid.length) showToast(`${valid.length} media file${valid.length === 1 ? "" : "s"} ready`);
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
    return `<div class="media-preview">${media}<b>${escapeHtml(file.name)}</b></div>`;
  }).join("");
}

function bindComposer() {
  const caption = $("#captionInput");
  caption.addEventListener("input", () => {
    $("#captionCount").textContent = caption.value.length.toLocaleString();
    invalidateQueue();
  });
  $$("#hashtagList button").forEach(button => button.addEventListener("click", () => {
    const spacer = caption.value && !caption.value.endsWith(" ") ? " " : "";
    if (!caption.value.includes(button.textContent)) caption.value = `${caption.value}${spacer}${button.textContent}`.slice(0, 2200);
    caption.dispatchEvent(new Event("input"));
    caption.focus();
  }));
}

function bindPlanningControls() {
  ["formatInput", "automationAge", "startDate", "automationTimezone", "scheduleMode"].forEach(id => {
    $("#" + id).addEventListener("change", invalidateQueue);
  });
  $$("input[name='platform']").forEach(input => input.addEventListener("change", invalidateQueue));
}

function buildSchedule() {
  const caption = $("#captionInput").value.trim();
  const selected = $$("input[name='platform']:checked").map(input => input.value);
  if (!state.files.length && !caption) return showToast("Add media or a caption first");
  if (!selected.length) return showToast("Choose at least one platform");

  const start = parseLocalDate($("#startDate").value || new Date().toISOString().slice(0, 10));
  const mode = $("#scheduleMode").value;
  const contents = state.files.length ? state.files : [{ name: caption.slice(0, 42) || "Caption post", type: "text/plain" }];
  state.queue = [];

  contents.forEach((file, contentIndex) => {
    selected.forEach((platformId, platformIndex) => {
      const platform = PLATFORM_PLAN[platformId];
      const date = nextWeekday(start, platform.weekday, contentIndex * 7);
      let hour = platform.hour;
      if (mode === "earliest") hour = Math.max(7, hour - 1);
      if (mode === "balanced" && contentIndex > 0) hour = (hour + contentIndex * 2) % 24;
      state.queue.push({
        platformId,
        platform,
        fileName: file.name || `Content ${contentIndex + 1}`,
        contentType: readableType(file.type, $("#formatInput").value),
        date,
        hour,
        score: Math.max(74, 96 - platformIndex * 2 - contentIndex * 3),
        caption
      });
    });
  });

  state.queue.sort((a, b) => a.date - b.date || a.hour - b.hour);
  renderQueue();
  updateWorkflow();
  showToast("Smart draft schedule created");
}

function updateWorkflow() {
  const hasContent = state.files.length > 0 || $("#captionInput").value.trim().length > 0;
  const hasPlatform = $$("input[name='platform']:checked").length > 0;
  $("#workflowContent").classList.toggle("ready", hasContent);
  $("#workflowScore").classList.toggle("ready", state.queue.length > 0);
  $("#workflowQueue").classList.toggle("ready", state.queue.length > 0);
  $("#buildSchedule").disabled = !hasContent || !hasPlatform;
  if (!state.queue.length) $("#queueSummary").textContent = !hasContent ? "Waiting for content" : !hasPlatform ? "Choose a platform" : "Ready to build";
}

function invalidateQueue() {
  if (state.queue.length) {
    state.queue = [];
    $("#queueList").innerHTML = `<div class="queue-empty"><span><i class="fa-regular fa-calendar-check"></i></span><h3>Schedule needs an update</h3><p>Your inputs changed. Build the smart schedule again to refresh the queue.</p></div>`;
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
      <div class="queue-time"><strong>${formatDate(item.date)} · ${formatHour(item.hour)}</strong><small>${escapeHtml(timezone)}</small></div>
      <div class="queue-score"><strong>${item.score}</strong><small>/100 fit</small></div>
      <span class="draft-badge">Draft</span>
    </article>`).join("");
  $("#queueSummary").textContent = `${state.queue.length} draft slot${state.queue.length === 1 ? "" : "s"}`;
  $("#exportQueue").disabled = false;
}

function exportQueue() {
  if (!state.queue.length) return;
  const rows = [["Status", "Content", "Format", "Platform", "Date", "Time", "Timezone", "Caption"]];
  const timezone = $("#automationTimezone").value;
  state.queue.forEach(item => rows.push(["Draft only", item.fileName, item.contentType, item.platform.name, isoDate(item.date), formatHour(item.hour), timezone, item.caption]));
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `signal-desk-automation-draft-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Draft queue exported — nothing was published");
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
function readableType(mime, selected) {
  if (selected !== "auto") return { image: "Image / carousel", shortVideo: "Reel / short video", longVideo: "Long-form video", article: "Article / link", announcement: "Announcement" }[selected];
  if (mime.startsWith("video/")) return "Video / reel";
  if (mime.startsWith("image/")) return "Image / carousel";
  return "Caption post";
}
function formatDate(date) { return new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(date); }
function isoDate(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function formatHour(hour) { return `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
function showToast(message) {
  const toast = $("#automationToast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}
