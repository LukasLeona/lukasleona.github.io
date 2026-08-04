const AGE_GROUPS = ["18–29", "30–49", "50–64", "65+"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MARKET_NAMES = { PH: "the Philippines", US: "the United States", GB: "the United Kingdom", AU: "Australia", SG: "Singapore", CA: "Canada" };

const PLATFORMS = {
  facebook: {
    name: "Facebook", mark: "f", icon: "fa-facebook-f", color: "#287be0", users: "3.07B", scale: 3.07,
    metric: "monthly active users", measured: "Dec 2023 · latest Facebook-only disclosure",
    best: "Tue · 9 AM", usage: [68, 80, 74, 57], peaks: [[9, 2.4, 56], [19, 3.0, 30]],
    slots: [[2, 9], [4, 9], [6, 10]], angle: "Useful community story + a clear question",
    copy: "Facebook is strongest as a morning habit. Lead with useful context, then give the audience an easy reason to respond.",
    source: "https://investor.atmeta.com/investor-news/press-release-details/2024/Meta-Reports-Fourth-Quarter-and-Full-Year-2023-Results/default.aspx"
  },
  instagram: {
    name: "Instagram", mark: "ig", icon: "fa-instagram", color: "#d55388", users: "3.0B", scale: 3.0,
    metric: "monthly active users", measured: "Sep 2025 · Meta milestone",
    best: "Mon · 3–9 PM", usage: [80, 62, 40, 19], peaks: [[18, 3.1, 61], [12, 2.5, 28]],
    slots: [[1, 18], [2, 17], [4, 18]], angle: "Save-worthy carousel or a concise Reel",
    copy: "Instagram attention builds as work and school wind down. Publish early enough for the post to gather signals before the evening peak.",
    source: "https://www.investing.com/news/stock-market-news/meta-ceo-zuckerberg-says-instagram-has-grown-to-3-billion-monthly-active-users-4253781"
  },
  x: {
    name: "X", mark: "X", icon: "fa-x-twitter", color: "#202523", users: "≈600M", scale: .6,
    metric: "monthly reach across X + Grok", measured: "Jan 2026 · combined company metric",
    best: "Wed–Fri · 9–11 AM", usage: [33, 25, 16, 10], peaks: [[10, 2.5, 63], [18, 2.8, 22]],
    slots: [[3, 10], [4, 10], [5, 10]], angle: "Timely point of view tied to the news cycle",
    copy: "X rewards recency and conversation. Use the mid-morning news window, then stay available to reply while the topic is moving.",
    source: "https://x.ai/news/series-e"
  },
  tiktok: {
    name: "TikTok", mark: "tt", icon: "fa-tiktok", color: "#ef466f", users: "1B+", scale: 1.0,
    metric: "monthly users", measured: "Jul 2026 · current official floor",
    best: "Thu · 7–11 AM", usage: [63, 44, 30, 12], peaks: [[9, 2.5, 42], [21, 3.0, 55]],
    slots: [[4, 9], [2, 10], [0, 16]], angle: "Fast hook, human proof, one memorable payoff",
    copy: "TikTok can take time to classify and distribute a video. Post before the audience peak and judge performance over a full 24 hours.",
    source: "https://newsroom.tiktok.com/tiktok-nba-and-wnba-announce-global-partnership?lang=en"
  },
  threads: {
    name: "Threads", mark: "@", icon: "fa-threads", color: "#7359c7", users: "500M", scale: .5,
    metric: "monthly active users", measured: "Jun 2026 · Meta milestone",
    best: "Tue · 8 AM", usage: [15, 10, 6, 3], peaks: [[8, 2.3, 59], [13, 2.5, 32]],
    slots: [[2, 8], [3, 12], [5, 14]], angle: "A crisp opinion that invites a low-friction reply",
    copy: "Threads activity clusters around daily transitions. Start the conversation early and use follow-up replies to extend its life.",
    source: "https://about.fb.com/news/2026/06/meta-launching-new-features-500-million-monthly-threads-users/"
  },
  youtube: {
    name: "YouTube", mark: "▶", icon: "fa-youtube", color: "#ea4138", users: "2B+", scale: 2.0,
    metric: "daily visitors", measured: "Oct 2025 · CEO-reported audience",
    best: "Sun · 10 AM", usage: [95, 92, 85, 64], peaks: [[20, 3.5, 58], [12, 3.2, 28]],
    slots: [[0, 10], [3, 7], [5, 12]], angle: "Search-led promise with a specific thumbnail payoff",
    copy: "YouTube discovery has a longer runway than feed posts. Publish before viewing time, then let search and recommendations compound.",
    source: "https://time.com/7338621/ceo-of-the-year-2025-neal-mohan/"
  },
  linkedin: {
    name: "LinkedIn", mark: "in", icon: "fa-linkedin-in", color: "#0a66c2", users: "1.3B+", scale: 1.3,
    metric: "registered professionals", measured: "Jun 2026 · registered, not active users",
    best: "Wed · 4 PM", usage: [40, 41, 30, 15], peaks: [[16, 2.7, 58], [19, 2.6, 36]],
    slots: [[3, 16], [5, 15], [4, 17]], angle: "A specific professional insight backed by proof",
    copy: "LinkedIn engagement has shifted later. Publish as professionals wrap up work, and use the first comments to deepen the idea rather than simply thanking people.",
    source: "https://news.linkedin.com/2026/linkedin-reaches-the-milestone-of-100-million-users-in-brazil"
  }
};

const SOURCES = [
  { title: "Meta · Facebook Q4 2023", detail: "3.07B Facebook monthly active users; latest individual Facebook MAU disclosure.", date: "Feb 2024", url: PLATFORMS.facebook.source },
  { title: "Reuters · Instagram milestone", detail: "Meta announced 3B Instagram monthly active users.", date: "Sep 2025", url: PLATFORMS.instagram.source },
  { title: "xAI · Series E update", detail: "Approximately 600M monthly active users across X and Grok; a combined reach metric.", date: "Jan 2026", url: PLATFORMS.x.source },
  { title: "TikTok Newsroom", detail: "TikTok continues to report a global community of more than one billion users.", date: "Jul 2026", url: PLATFORMS.tiktok.source },
  { title: "Meta · Threads milestone", detail: "Threads reached 500M monthly active users.", date: "Jun 2026", url: PLATFORMS.threads.source },
  { title: "TIME · YouTube CEO profile", detail: "More than 2B people visit YouTube each day; different from MAU.", date: "Dec 2025", url: PLATFORMS.youtube.source },
  { title: "LinkedIn · Corporate Communications", detail: "More than 1.3B registered professionals across 200+ countries and territories; not an active-user metric.", date: "Jun 2026", url: PLATFORMS.linkedin.source },
  { title: "Pew Research Center", detail: "Platform adoption by age among U.S. adults, survey conducted Feb–Jun 2025.", date: "Nov 2025", url: "https://www.pewresearch.org/internet/fact-sheet/social-media/" },
  { title: "Pew Research Center · LinkedIn", detail: "2024 age-adoption benchmark used for LinkedIn because it is absent from Pew’s 2025 age table.", date: "2024", url: "https://www.pewresearch.org/internet/2024/01/31/americans-social-media-use/" },
  { title: "Hootsuite · 1M+ posts", detail: "Time-zone-agnostic best-time baselines for Facebook, Instagram, X, TikTok, and Threads.", date: "Nov 2025", url: "https://blog.hootsuite.com/best-time-to-post-on-social-media/" },
  { title: "Buffer · 1.8M YouTube videos", detail: "Posting benchmarks for long-form videos and Shorts; Sunday 10 AM leads long-form.", date: "2026", url: "https://buffer.com/resources/best-time-to-post-on-youtube/" },
  { title: "Buffer · 4.8M LinkedIn posts", detail: "2026 engagement analysis: Wednesday 4 PM leads, with 3–8 PM strongest on weekdays.", date: "Jul 2026", url: "https://buffer.com/resources/best-time-to-post-on-linkedin/" },
  { title: "Google Trends + Wikimedia", detail: "Current search momentum and daily Wikipedia page-view signals used in the live pulse.", date: "Live", url: "https://trends.google.com/trending/" }
];

const GOAL_MULTIPLIERS = {
  awareness: { facebook: 1.06, instagram: 1.08, x: .92, tiktok: 1.03, threads: .90, youtube: 1.10, linkedin: 1.03 },
  engagement: { facebook: 1.00, instagram: 1.15, x: 1.04, tiktok: 1.18, threads: 1.08, youtube: 1.10, linkedin: 1.08 },
  traffic: { facebook: 1.11, instagram: 1.05, x: 1.12, tiktok: .98, threads: .92, youtube: 1.20, linkedin: 1.17 },
  conversion: { facebook: 1.15, instagram: 1.16, x: .95, tiktok: 1.04, threads: .88, youtube: 1.12, linkedin: 1.20 }
};

const CONTENT_TYPES = {
  general: { label: "General post", angle: "Balanced engagement window" },
  shortVideo: { label: "Short video / Reel", angle: "Video discovery and evening scroll" },
  image: { label: "Image / Carousel", angle: "Saveable visual content" },
  article: { label: "Article / Link", angle: "Click and reading intent" },
  longVideo: { label: "Long-form video", angle: "Longer viewing session" },
  announcement: { label: "Announcement / Live update", angle: "Timely conversation and reaction" }
};

const state = {
  platform: "facebook",
  age: "all",
  goal: "awareness",
  timezone: "auto",
  market: "PH",
  alertsEnabled: false,
  chart: null,
  plannerChart: null,
  activity: []
};

const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  restorePreferences();
  bindControls();
  renderPlatformCards();
  renderSources();
  initializeDayPlanner();
  renderDashboard();
  updateManilaClock();
  setInterval(updateManilaClock, 1000);
  setupSectionTracking();
  loadLiveData();
  $("#footerYear").textContent = new Date().getFullYear();
});

function bindControls() {
  const controls = {
    ageSelect: "age",
    goalSelect: "goal",
    timezoneSelect: "timezone",
    marketSelect: "market"
  };
  Object.entries(controls).forEach(([id, key]) => {
    const el = $("#" + id);
    el.value = String(state[key]);
    el.addEventListener("change", () => {
      state[key] = key === "age" ? (el.value === "all" ? "all" : Number(el.value)) : el.value;
      savePreferences();
      if (key === "market") loadLiveData();
      renderDashboard();
      updateManilaClock();
    });
  });
  $("#refreshButton").addEventListener("click", () => loadLiveData(true));
  $("#exportButton").addEventListener("click", exportPlan);
  $("#alertButton").addEventListener("click", toggleAlerts);
}

function renderPlatformCards() {
  const grid = $("#platformGrid");
  grid.innerHTML = "";
  Object.entries(PLATFORMS).forEach(([id, platform]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "platform-card" + (state.platform === id ? " selected" : "");
    button.style.setProperty("--platform-color", platform.color);
    button.setAttribute("aria-pressed", state.platform === id ? "true" : "false");
    button.setAttribute("aria-label", `Select ${platform.name}: ${platform.users} ${platform.metric}`);
    button.innerHTML = `
      <span class="platform-card-top">
        <span class="platform-name"><span class="platform-icon"><i class="fa-brands ${platform.icon}" aria-hidden="true"></i></span>${platform.name}</span>
        <span class="platform-arrow" aria-hidden="true">↗</span>
      </span>
      <strong class="audience-number">${platform.users}</strong>
      <span class="audience-metric">${platform.metric}</span>
      <span class="platform-card-bottom">
        <small>${platform.measured}</small>
        <span class="best-window">${platform.best}</span>
      </span>`;
    button.addEventListener("click", () => {
      state.platform = id;
      if ($("#plannerPlatform")) $("#plannerPlatform").value = id;
      renderPlatformCards();
      renderDashboard();
    });
    grid.appendChild(button);
  });
}

function renderDashboard() {
  const platform = PLATFORMS[state.platform];
  state.activity = buildActivity(platform, state.age);
  renderActivityChart(platform);
  renderDayNight();
  renderHeatmap(platform);
  renderRecommendation(platform);
  renderFit();
  renderBriefing();
  renderDayPlanner();
  updateManilaClock();
  const selectedPill = $("#selectedPlatformPill");
  selectedPill.innerHTML = `<i class="fa-brands ${platform.icon}" aria-hidden="true"></i><span>${platform.name}</span>`;
  selectedPill.style.background = platform.color;
  $("#activityTitle").textContent = `${platform.name} · ${ageLabel()}`;
}

function circularDistance(hour, center) {
  const d = Math.abs(hour - center);
  return Math.min(d, 24 - d);
}

function buildActivity(platform, ageIndex) {
  const ageProfiles = [
    [[21, 3.1, 32], [8, 2.2, 13]],
    [[19, 2.8, 28], [8, 2.0, 19]],
    [[18, 2.6, 23], [9, 2.2, 24]],
    [[9, 2.5, 30], [18, 2.5, 19]]
  ];
  const agePeaks = ageIndex === "all"
    ? ageProfiles.flat().map(([center, width, amplitude]) => [center, width, amplitude / ageProfiles.length])
    : ageProfiles[ageIndex];
  const values = Array.from({ length: 24 }, (_, hour) => {
    let value = 12;
    [...platform.peaks, ...agePeaks].forEach(([center, width, amplitude]) => {
      const d = circularDistance(hour, center);
      value += amplitude * Math.exp(-(d * d) / (2 * width * width));
    });
    return value;
  });
  const max = Math.max(...values);
  const min = Math.min(...values);
  return values.map(value => Math.round(24 + ((value - min) / (max - min)) * 76));
}

function renderActivityChart(platform) {
  if (!window.Chart) {
    const wrap = $(".chart-wrap");
    wrap.innerHTML = `<div style="height:100%;display:grid;place-items:center;color:#6c746e;font-size:12px;text-align:center">The chart library could not load.<br>The planner and recommendations are still available.</div>`;
    return;
  }
  const canvas = $("#activityChart");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 0, 260);
  gradient.addColorStop(0, hexToRgba(platform.color, .24));
  gradient.addColorStop(1, hexToRgba(platform.color, 0));
  const data = {
    labels: Array.from({ length: 24 }, (_, hour) => formatHour(hour)),
    datasets: [{
      data: state.activity,
      borderColor: platform.color,
      backgroundColor: gradient,
      borderWidth: 2.5,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: platform.color,
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 2,
      fill: true,
      tension: .4
    }]
  };
  if (state.chart) {
    state.chart.data = data;
    state.chart.update();
    return;
  }
  state.chart = new Chart(context, {
    type: "line",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#17201c",
          displayColors: false,
          padding: 10,
          callbacks: { label: item => ` Activity index ${item.raw}/100` }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: "#7d837f", maxRotation: 0, autoSkip: false, callback: (_, index) => index % 3 === 0 ? formatHour(index) : "", font: { size: 9 } }
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 105,
          grid: { color: "rgba(23,32,28,.07)", drawTicks: false },
          border: { display: false },
          ticks: { display: false }
        }
      }
    }
  });
}

function renderDayNight() {
  const dayHours = state.activity.slice(6, 18);
  const nightHours = [...state.activity.slice(18), ...state.activity.slice(0, 6)];
  const day = Math.round(average(dayHours));
  const night = Math.round(average(nightHours));
  $("#dayScore").textContent = `${day}/100`;
  $("#nightScore").textContent = `${night}/100`;
  $("#dayTag").textContent = day >= night ? "Stronger" : "Support";
  $("#nightTag").textContent = night > day ? "Stronger" : "Support";
}

function renderHeatmap(platform) {
  const heatmap = $("#heatmap");
  heatmap.innerHTML = "";
  const hourHeader = document.createElement("div");
  heatmap.appendChild(hourHeader);
  for (let hour = 0; hour < 24; hour++) {
    const label = document.createElement("div");
    label.className = "heat-label heat-hour";
    label.textContent = hour % 3 === 0 ? formatHour(hour).replace(":00", "") : "";
    heatmap.appendChild(label);
  }
  const primeDays = new Set(platform.slots.map(slot => slot[0]));
  for (let day = 1; day <= 7; day++) {
    const actualDay = day % 7;
    const label = document.createElement("div");
    label.className = "heat-label";
    label.textContent = DAY_NAMES[actualDay].slice(0, 3);
    heatmap.appendChild(label);
    for (let hour = 0; hour < 24; hour++) {
      const cell = document.createElement("div");
      const dayFactor = primeDays.has(actualDay) ? 1 : (actualDay === 0 || actualDay === 6 ? .78 : .88);
      const slotBoost = platform.slots.some(([slotDay, slotHour]) => slotDay === actualDay && Math.abs(slotHour - hour) <= 1) ? 18 : 0;
      const value = Math.min(100, Math.round(state.activity[hour] * dayFactor + slotBoost));
      cell.className = "heat-cell";
      cell.style.opacity = String(.08 + value / 115);
      cell.title = `${DAY_NAMES[actualDay]} ${formatHour(hour)} · opportunity ${value}/100`;
      heatmap.appendChild(cell);
    }
  }
}

function renderRecommendation(platform) {
  const slot = nextPostingSlot(platform);
  $(".recommendation-panel").style.setProperty("--recommendation-color", platform.color);
  $("#nextDay").textContent = slot.dateLabel;
  $("#nextTime").textContent = formatHour(slot.hour);
  $("#nextTimezone").textContent = `${friendlyTimezone()} · audience local time`;
  $("#recommendationCopy").textContent = platform.copy;
  $("#contentAngle").textContent = platform.angle;
  $("#recommendationTitle").textContent = `${platform.name}’s next best window`;
}

function initializeDayPlanner() {
  const platformSelect = $("#plannerPlatform");
  platformSelect.innerHTML = `<option value="all">Best across all platforms</option>` + Object.entries(PLATFORMS).map(([id, platform]) => `<option value="${id}">${platform.name}</option>`).join("");
  platformSelect.value = state.platform;
  const today = manilaNow();
  $("#plannerDate").value = `${today.year}-${String(today.month).padStart(2, "0")}-${String(today.day).padStart(2, "0")}`;
  ["plannerDate", "plannerPlatform", "plannerContentType", "plannerCount"].forEach(id => {
    $("#" + id).addEventListener("input", renderDayPlanner);
    $("#" + id).addEventListener("change", renderDayPlanner);
  });
  $("#plannerTopic").addEventListener("input", renderDayPlanner);
  $("#copyDayPlan").addEventListener("click", copyDayPlan);
}

function plannerValues() {
  const dateValue = $("#plannerDate").value;
  const date = new Date(`${dateValue}T00:00:00Z`);
  return {
    dateValue,
    weekday: Number.isNaN(date.getTime()) ? manilaNow().weekday : date.getUTCDay(),
    date,
    platformId: $("#plannerPlatform").value,
    contentType: $("#plannerContentType").value,
    count: Number($("#plannerCount").value),
    topic: $("#plannerTopic").value.trim()
  };
}

function dayFactorFor(platform, weekday) {
  if (platform.slots.some(([day]) => day === weekday)) return 1;
  return weekday === 0 || weekday === 6 ? .76 : .88;
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
    shortVideo: [[20, 3.0, 13]],
    image: [[12, 2.2, 7], [18, 2.8, 9]],
    article: [[9, 2.6, 14]],
    longVideo: [[18, 3.2, 13]],
    announcement: [[10, 2.4, 8], [18, 2.6, 8]]
  };
  const timeBoost = (peakMap[type] || []).reduce((total, [center, width, amplitude]) => {
    const distance = circularDistance(hour, center);
    return total + amplitude * Math.exp(-(distance * distance) / (2 * width * width));
  }, 0);
  return timeBoost + (affinity[platformId] || 0);
}

function plannerScore(platformId, hour, weekday, contentType) {
  const platform = PLATFORMS[platformId];
  const base = buildActivity(platform, state.age)[hour];
  return Math.max(8, Math.min(100, Math.round(base * dayFactorFor(platform, weekday) * .9 + contentAdjustment(contentType, platformId, hour))));
}

function plannerSeries(platformId, weekday, contentType) {
  return Array.from({ length: 24 }, (_, hour) => {
    if (platformId !== "all") return { hour, score: plannerScore(platformId, hour, weekday, contentType), platformId };
    return Object.keys(PLATFORMS).map(id => ({ hour, score: plannerScore(id, hour, weekday, contentType), platformId: id })).sort((a, b) => b.score - a.score)[0];
  });
}

function choosePlannerSlots(series, count) {
  const chosen = [];
  const minimumGap = count >= 4 ? 2 : 3;
  const candidates = [...series].sort((a, b) => b.score - a.score);
  while (chosen.length < count) {
    const next = candidates.find(candidate => !chosen.some(slot => Math.abs(slot.hour - candidate.hour) < minimumGap));
    if (!next) break;
    chosen.push(next);
    candidates.splice(candidates.indexOf(next), 1);
  }
  if (chosen.length < count) {
    candidates.forEach(candidate => {
      if (chosen.length < count && !chosen.some(slot => slot.hour === candidate.hour)) chosen.push(candidate);
    });
  }
  return chosen.sort((a, b) => a.hour - b.hour);
}

function renderDayPlanner() {
  if (!$("#plannerDate") || !$("#plannerDate").value) return;
  const values = plannerValues();
  $("#plannerCountOutput").textContent = values.count;
  const series = plannerSeries(values.platformId, values.weekday, values.contentType);
  const slots = choosePlannerSlots(series, values.count);
  state.lastDayPlan = { ...values, slots };
  renderPlannerChart(series, slots, values);
  renderWeekdayStrength(values);
  renderScheduledPosts(values, slots);
  renderPlatformWindowCompare(values);
}

function renderPlannerChart(series, slots, values) {
  const platformName = values.platformId === "all" ? "all platforms" : PLATFORMS[values.platformId].name;
  const dateLabel = values.date.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "short", day: "numeric" });
  $("#plannerGraphTitle").textContent = `${CONTENT_TYPES[values.contentType].label} · ${platformName} · ${dateLabel}`;
  if (!window.Chart) return;
  state.currentPlannerSeries = series;
  const selectedHours = new Set(slots.map(slot => slot.hour));
  const background = series.map(item => selectedHours.has(item.hour) ? "#ff7557" : hexToRgba(PLATFORMS[item.platformId].color, .34));
  const border = series.map(item => selectedHours.has(item.hour) ? "#d94b31" : PLATFORMS[item.platformId].color);
  const data = {
    labels: series.map(item => formatHour(item.hour)),
    datasets: [{ data: series.map(item => item.score), backgroundColor: background, borderColor: border, borderWidth: 1, borderRadius: 4, maxBarThickness: 26 }]
  };
  if (state.plannerChart) {
    state.plannerChart.data = data;
    state.plannerChart.update();
    return;
  }
  state.plannerChart = new Chart($("#dayPlannerChart").getContext("2d"), {
    type: "bar",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#17201c",
          displayColors: false,
          callbacks: {
            title: items => items[0].label,
            label: item => `${PLATFORMS[state.currentPlannerSeries[item.dataIndex].platformId].name} opportunity ${item.raw}/100`
          }
        }
      },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: "#7d837f", autoSkip: false, maxRotation: 0, callback: (_, index) => index % 3 === 0 ? formatHour(index).replace(":00", "") : "", font: { size: 8 } } },
        y: { min: 0, max: 100, grid: { color: "rgba(23,32,28,.07)", drawTicks: false }, border: { display: false }, ticks: { display: false } }
      }
    }
  });
}

function renderWeekdayStrength(values) {
  const container = $("#weekdayStrength");
  container.innerHTML = "";
  [1, 2, 3, 4, 5, 6, 0].forEach(weekday => {
    const best = [...plannerSeries(values.platformId, weekday, values.contentType)].sort((a, b) => b.score - a.score)[0];
    const column = document.createElement("div");
    column.className = "weekday-column" + (weekday === values.weekday ? " selected" : "");
    column.innerHTML = `<span class="weekday-score">${best.score}</span><i style="height:${Math.max(18, best.score)}%"></i><strong>${DAY_NAMES[weekday].slice(0, 3)}</strong><small>${formatHour(best.hour).replace(":00", "")}</small>`;
    column.title = `${DAY_NAMES[weekday]}: ${best.score}/100 at ${formatHour(best.hour)} on ${PLATFORMS[best.platformId].name}`;
    container.appendChild(column);
  });
}

function renderScheduledPosts(values, slots) {
  const container = $("#scheduledPosts");
  const dateLabel = values.date.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" });
  $("#scheduleTitle").textContent = `${values.count === 1 ? "One post" : `${values.count} posts`}, spaced for reach`;
  container.innerHTML = slots.map((slot, index) => {
    const platform = PLATFORMS[slot.platformId];
    const topic = values.topic || CONTENT_TYPES[values.contentType].label;
    return `<article class="scheduled-post" style="--post-color:${platform.color}">
      <div class="post-order"><span>${String(index + 1).padStart(2, "0")}</span><i></i></div>
      <div class="post-details">
        <small>${escapeHtml(dateLabel)} · ${escapeHtml(platform.name)}</small>
        <strong>${formatHour(slot.hour)}</strong>
        <p>${escapeHtml(topic)} · ${escapeHtml(CONTENT_TYPES[values.contentType].angle)}</p>
      </div>
      <span class="post-score">${slot.score}<small>/100</small></span>
    </article>`;
  }).join("");
}

function renderPlatformWindowCompare(values) {
  const container = $("#platformWindowCompare");
  container.innerHTML = Object.entries(PLATFORMS).map(([id, platform]) => {
    const best = [...plannerSeries(id, values.weekday, values.contentType)].sort((a, b) => b.score - a.score)[0];
    return `<button type="button" data-platform="${id}" class="platform-window${values.platformId === id ? " selected" : ""}" style="--window-color:${platform.color}">
      <span class="platform-window-icon"><i class="fa-brands ${platform.icon}" aria-hidden="true"></i></span>
      <span><small>${platform.name}</small><strong>${formatHour(best.hour)}</strong></span>
      <b>${best.score}</b>
    </button>`;
  }).join("");
  container.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    $("#plannerPlatform").value = button.dataset.platform;
    renderDayPlanner();
  }));
}

async function copyDayPlan() {
  if (!state.lastDayPlan) return;
  const { date, topic, contentType, slots } = state.lastDayPlan;
  const dateLabel = date.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" });
  const lines = [`Signal Desk plan · ${dateLabel}`, `${topic || CONTENT_TYPES[contentType].label}`];
  slots.forEach((slot, index) => lines.push(`${index + 1}. ${formatHour(slot.hour)} · ${PLATFORMS[slot.platformId].name} · ${slot.score}/100`));
  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    showToast("Day plan copied");
  } catch (_) {
    showToast("Copy is unavailable in this browser");
  }
}

function getRankedPlatforms() {
  return Object.entries(PLATFORMS).map(([id, platform]) => {
    const adoption = adoptionFor(platform);
    const multiplier = GOAL_MULTIPLIERS[state.goal][id];
    const scaleLift = state.goal === "awareness" ? Math.min(14, (platform.scale / 3.07) * 14) : 0;
    const score = Math.min(99, Math.round(adoption * multiplier + scaleLift));
    return { id, platform, adoption, score };
  }).sort((a, b) => b.score - a.score);
}

function renderFit() {
  const ranked = getRankedPlatforms();
  const container = $("#fitBars");
  container.innerHTML = "";
  ranked.forEach(item => {
    const row = document.createElement("div");
    row.className = "fit-row";
    row.style.setProperty("--fit-color", item.platform.color);
    row.innerHTML = `
      <span class="fit-platform"><i class="fit-dot"></i>${item.platform.name}</span>
      <span class="fit-track"><i class="fit-fill" style="width:${item.score}%"></i></span>
      <span class="fit-score">${item.score}</span>`;
    row.title = `${item.platform.name}: ${item.adoption}% U.S. adoption in this age band; ${item.score}/100 directional fit for ${state.goal}.`;
    container.appendChild(row);
  });
  const [first, second] = ranked;
  $("#primaryChannel").textContent = first.platform.name;
  $("#supportChannel").textContent = second.platform.name;
  const notes = [
    `${first.platform.name} gives this younger audience the strongest starting fit. Use ${second.platform.name} to extend the idea in a different format, not as a carbon copy.`,
    `${first.platform.name} combines high adoption with the selected goal. Let ${second.platform.name} support reach while the primary channel carries the campaign story.`,
    `${first.platform.name} is the clearest access point for this audience. Prioritize usefulness and familiarity; use ${second.platform.name} for incremental reach.`,
    `${first.platform.name} has the broadest adoption in this age group. Keep the message direct, accessible, and easy to act on, with ${second.platform.name} as support.`
  ];
  const strategy = state.age === "all"
    ? `${first.platform.name} offers the broadest cross-age starting point for this goal. Use ${second.platform.name} to extend reach without repeating the same creative treatment.`
    : notes[state.age];
  $("#strategyNote").textContent = `“${strategy}”`;
}

function renderBriefing() {
  const ranked = getRankedPlatforms();
  const winner = ranked[0];
  const slot = nextPostingSlot(winner.platform);
  $("#briefAudience").textContent = ageLabel();
  $("#briefPlatform").textContent = winner.platform.name;
  $("#briefTime").textContent = `${DAY_NAMES[slot.weekday].slice(0, 3)} ${formatHour(slot.hour)}`;
  $("#briefLead").textContent = `${winner.platform.name} is the strongest ${goalLabel()} starting point for ${ageLabel().toLowerCase()}, with the next useful window ${slot.relativeLabel}.`;
}

function nextPostingSlot(platform) {
  const parts = zonedNow();
  const activity = buildActivity(platform, state.age);
  const peakHour = activity.indexOf(Math.max(...activity));
  const candidates = platform.slots.map(([weekday]) => {
    const hour = peakHour;
    const adjustedWeekday = weekday;
    let daysAway = (adjustedWeekday - parts.weekday + 7) % 7;
    if (daysAway === 0 && (parts.hour > hour || (parts.hour === hour && parts.minute >= 30))) daysAway = 7;
    return { weekday: adjustedWeekday, hour, daysAway, distance: daysAway * 24 + hour - parts.hour };
  }).sort((a, b) => a.distance - b.distance);
  const best = candidates[0];
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + best.daysAway));
  best.dateLabel = date.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "short", day: "numeric" });
  best.isoDate = date.toISOString().slice(0, 10);
  best.relativeLabel = best.daysAway === 0 ? `today at ${formatHour(best.hour)}` : best.daysAway === 1 ? `tomorrow at ${formatHour(best.hour)}` : `on ${DAY_NAMES[best.weekday]} at ${formatHour(best.hour)}`;
  return best;
}

function zonedNow() {
  const now = new Date();
  const zone = resolvedTimezone();
  const formatter = new Intl.DateTimeFormat("en-US", { timeZone: zone, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23", weekday: "short" });
  const parts = Object.fromEntries(formatter.formatToParts(now).filter(part => part.type !== "literal").map(part => [part.type, part.value]));
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  return { year: Number(parts.year), month: Number(parts.month), day: Number(parts.day), hour: Number(parts.hour), minute: Number(parts.minute), weekday };
}

function resolvedTimezone() {
  if (state.timezone !== "auto") return state.timezone;
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Manila";
}

function friendlyTimezone() {
  return resolvedTimezone().replaceAll("_", " ").replace("/", " / ");
}

function manilaNow() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23"
  });
  const values = Object.fromEntries(formatter.formatToParts(new Date()).filter(part => part.type !== "literal").map(part => [part.type, part.value]));
  return {
    year: Number(values.year), month: Number(values.month), day: Number(values.day),
    hour: Number(values.hour), minute: Number(values.minute), second: Number(values.second),
    weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(values.weekday)
  };
}

function opportunityFor(platform, parts) {
  const hourly = buildActivity(platform, state.age)[parts.hour];
  const primeDay = platform.slots.some(([day]) => day === parts.weekday);
  const nearSlot = platform.slots.some(([day, hour]) => day === parts.weekday && circularDistance(parts.hour, hour) <= 1);
  const weekend = parts.weekday === 0 || parts.weekday === 6;
  const dayFactor = primeDay ? 1 : weekend ? .78 : .88;
  return Math.min(100, Math.round(hourly * dayFactor + (nearSlot ? 16 : 0)));
}

function signalFor(score) {
  if (score >= 85) return { level: "peak", label: "Post now", message: "Peak modeled traffic window" };
  if (score >= 70) return { level: "strong", label: "Strong window", message: "A strong time to publish" };
  if (score >= 55) return { level: "warming", label: "Warming up", message: "Audience activity is building" };
  return { level: "quiet", label: "Quiet window", message: "Hold high-priority posts for the next peak" };
}

function updateManilaClock() {
  const clock = $("#manilaClock");
  if (!clock) return;
  const parts = manilaNow();
  const hour12 = parts.hour % 12 || 12;
  clock.textContent = `${String(hour12).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}:${String(parts.second).padStart(2, "0")}`;
  $("#manilaPeriod").textContent = parts.hour >= 12 ? "PM" : "AM";
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  $("#manilaDate").textContent = `${date.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" })} · Asia / Manila`;

  const opportunities = Object.entries(PLATFORMS).map(([id, platform]) => ({ id, platform, score: opportunityFor(platform, parts) })).sort((a, b) => b.score - a.score);
  const best = opportunities[0];
  const signal = signalFor(best.score);
  const card = $("#manilaClockCard");
  card.classList.remove("signal-quiet", "signal-warming", "signal-strong", "signal-peak");
  card.classList.add(`signal-${signal.level}`);
  $("#postingSignal").textContent = signal.label;
  $("#clockPlatform").textContent = `${best.platform.name} · ${best.score}/100`;
  $("#clockMessage").textContent = signal.message;

  const chips = $("#clockPlatformChips");
  chips.innerHTML = opportunities.map(item => {
    const itemSignal = signalFor(item.score);
    return `<span class="clock-chip ${itemSignal.level}" title="${item.platform.name}: ${item.score}/100"><i style="background:${item.platform.color}"></i>${item.platform.name}<b>${item.score}</b></span>`;
  }).join("");
  updateAlertButton();
  maybeNotify(best, signal, parts);
}

async function toggleAlerts() {
  if (state.alertsEnabled) {
    state.alertsEnabled = false;
    savePreferences();
    updateAlertButton();
    showToast("Posting alerts turned off");
    return;
  }
  if (!("Notification" in window)) {
    showToast("Browser notifications are not supported here");
    return;
  }
  const permission = await Notification.requestPermission();
  state.alertsEnabled = permission === "granted";
  savePreferences();
  updateAlertButton();
  showToast(state.alertsEnabled ? "Posting alerts enabled" : "Notification permission was not granted");
}

function updateAlertButton() {
  const button = $("#alertButton");
  if (!button) return;
  button.textContent = state.alertsEnabled ? "Alerts on" : "Enable alerts";
  button.classList.toggle("enabled", state.alertsEnabled);
}

function maybeNotify(best, signal, parts) {
  if (!state.alertsEnabled || signal.level !== "peak" || !("Notification" in window) || Notification.permission !== "granted") return;
  const key = `${parts.year}-${parts.month}-${parts.day}-${parts.hour}-${best.id}`;
  if (localStorage.getItem("signalDeskLastNotification") === key) return;
  localStorage.setItem("signalDeskLastNotification", key);
  new Notification(`Time to post on ${best.platform.name}`, {
    body: `Manila opportunity is ${best.score}/100 for ${ageLabel().toLowerCase()}.`,
    icon: "og.png",
    tag: "signal-desk-posting-window"
  });
}

async function loadLiveData(force = false) {
  const button = $("#refreshButton");
  button.classList.add("loading");
  setConnection("connecting", "Refreshing");
  $("#trendsMarketTitle").textContent = `Trending in ${MARKET_NAMES[state.market]}`;
  if (window.location.protocol === "file:") {
    renderOfflinePulse("Start the Python server to activate the live internet pulse.");
    button.classList.remove("loading");
    return;
  }
  try {
    const response = await fetch(`/api/dashboard?geo=${encodeURIComponent(state.market)}${force ? "&refresh=1" : ""}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Live endpoint returned ${response.status}`);
    const payload = await response.json();
    renderTrends(payload.trends || []);
    renderAttention(payload.attention || []);
    const healthySources = Object.values(payload.sources || {}).filter(Boolean).length;
    setConnection(healthySources ? "online" : "offline", healthySources === 2 ? "Live data" : "Partial data");
    const updated = new Date(payload.generatedAt);
    $("#lastUpdated").textContent = `Updated ${updated.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · refreshes from public sources`;
    if (force) showToast("Live signals refreshed");
  } catch (error) {
    renderOfflinePulse("Live sources are temporarily unavailable. The planning dashboard still works.");
    console.warn(error);
  } finally {
    button.classList.remove("loading");
  }
}

function renderTrends(trends) {
  const list = $("#trendsList");
  list.innerHTML = "";
  if (!trends.length) {
    const empty = document.createElement("li");
    empty.className = "trend-item";
    empty.textContent = "No current trend items returned.";
    list.appendChild(empty);
    return;
  }
  trends.slice(0, 7).forEach(trend => {
    const item = document.createElement("li");
    item.className = "trend-item";
    const link = document.createElement("a");
    link.href = trend.link || "https://trends.google.com/trending/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = trend.title;
    const volume = document.createElement("span");
    volume.className = "trend-volume";
    volume.textContent = trend.traffic || "Trending";
    item.append(link, volume);
    list.appendChild(item);
  });
}

function renderAttention(attention) {
  const list = $("#attentionList");
  list.innerHTML = "";
  if (!attention.length) {
    list.innerHTML = `<p class="dark-note">No recent Wikipedia signal was returned.</p>`;
    return;
  }
  const max = Math.max(...attention.map(item => item.views));
  attention.sort((a, b) => b.views - a.views).forEach(item => {
    const row = document.createElement("div");
    row.className = "attention-row";
    const direction = item.change >= 0 ? "up" : "down";
    row.innerHTML = `
      <span class="attention-name">${escapeHtml(item.name)}</span>
      <span class="attention-track"><i class="attention-fill" style="width:${Math.max(5, item.views / max * 100)}%"></i></span>
      <span class="attention-value">${compactNumber(item.views)}</span>
      <span class="change ${direction}">${item.change >= 0 ? "+" : ""}${item.change.toFixed(1)}%</span>`;
    list.appendChild(row);
  });
}

function renderOfflinePulse(message) {
  setConnection("offline", "Planner only");
  $("#lastUpdated").textContent = message;
  const list = $("#trendsList");
  list.innerHTML = "";
  ["Live search trends", "Market momentum", "Breaking audience interests"].forEach((title, index) => {
    const item = document.createElement("li");
    item.className = "trend-item";
    item.innerHTML = `<span>${title}</span><span class="trend-volume">${index === 0 ? "Python server needed" : "Waiting"}</span>`;
    list.appendChild(item);
  });
  $("#attentionList").innerHTML = `<p class="dark-note">${escapeHtml(message)}</p>`;
}

function setConnection(mode, text) {
  const badge = $("#connectionBadge");
  badge.classList.remove("online", "offline");
  if (mode === "online") badge.classList.add("online");
  if (mode === "offline") badge.classList.add("offline");
  $("#connectionText").textContent = text;
}

function exportPlan() {
  const rows = [["Platform", "Target age", "Campaign goal", "Date", "Time", "Timezone", "Content angle", "Source baseline"]];
  Object.values(PLATFORMS).forEach(platform => {
    const slot = nextPostingSlot(platform);
    rows.push([platform.name, ageLabel(), goalLabel(), slot.isoDate, formatHour(slot.hour), resolvedTimezone(), platform.angle, platform.best]);
  });
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `signal-desk-plan-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast("7-day starter plan exported");
}

function renderSources() {
  const list = $("#sourceList");
  SOURCES.forEach(source => {
    const row = document.createElement("a");
    row.className = "source-row";
    row.href = source.url;
    row.target = "_blank";
    row.rel = "noopener noreferrer";
    row.innerHTML = `<span class="source-title">${source.title}</span><span class="source-detail">${source.detail}</span><span class="source-date">${source.date}</span><span class="source-arrow" aria-hidden="true">↗</span>`;
    list.appendChild(row);
  });
}

function setupSectionTracking() {
  if (!("IntersectionObserver" in window)) return;
  const links = [...document.querySelectorAll(".topnav a")];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-25% 0px -65%", threshold: 0 });
  ["overview", "day-planner", "pulse", "sources"].forEach(id => observer.observe($("#" + id)));
}

function savePreferences() {
  try { localStorage.setItem("signalDeskPreferences", JSON.stringify({ age: state.age, goal: state.goal, timezone: state.timezone, market: state.market, alertsEnabled: state.alertsEnabled })); } catch (_) { /* storage may be disabled */ }
}

function restorePreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem("signalDeskPreferences") || "null");
    if (!saved) return;
    if (saved.age === "all" || [0, 1, 2, 3].includes(saved.age)) state.age = saved.age;
    if (GOAL_MULTIPLIERS[saved.goal]) state.goal = saved.goal;
    if (typeof saved.timezone === "string") state.timezone = saved.timezone;
    if (MARKET_NAMES[saved.market]) state.market = saved.market;
    state.alertsEnabled = Boolean(saved.alertsEnabled && "Notification" in window && Notification.permission === "granted");
  } catch (_) { /* ignore malformed local preferences */ }
}

function goalLabel() {
  return { awareness: "brand awareness", engagement: "engagement", traffic: "website traffic", conversion: "conversions" }[state.goal];
}

function ageLabel() {
  return state.age === "all" ? "All ages" : `Ages ${AGE_GROUPS[state.age]}`;
}

function adoptionFor(platform) {
  return state.age === "all" ? average(platform.usage) : platform.usage[state.age];
}

function formatHour(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display}:00 ${period}`;
}

function average(values) { return values.reduce((sum, value) => sum + value, 0) / values.length; }
function compactNumber(value) { return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value); }
function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const bigint = parseInt(value, 16);
  return `rgba(${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255},${alpha})`;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
}
