(() => {
  "use strict";

  const data = window.LINAW_HISTORY;
  const root = document.querySelector("#trends");
  if (!data || !root) return;

  const elements = {
    type: root.querySelector("#historyType"),
    primary: root.querySelector("#historyPrimary"),
    summary: root.querySelector("#historySummary"),
    legend: root.querySelector("#historyLegend"),
    chart: root.querySelector("#historyChart"),
    tooltip: root.querySelector("#historyTooltip"),
    tableHead: root.querySelector("#historyTableHead"),
    tableBody: root.querySelector("#historyTableBody"),
    methodDetail: root.querySelector("#historyMethodDetail"),
  };

  const seriesColor = "#75ddc2";
  const state = {
    type: "departments",
    primary: "",
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function currentItems() {
    return data[state.type] || [];
  }

  function getSeries(name) {
    return currentItems().find((item) => item.name === name) || currentItems()[0];
  }

  function findPreferred(items, fragment) {
    return items.find((item) => item.name.toLowerCase().includes(fragment.toLowerCase())) || items[0];
  }

  function setDefault() {
    const items = currentItems();
    const selected = state.type === "departments"
      ? findPreferred(items, "Department of Education")
      : findPreferred(items, "Region IV-A");
    state.primary = selected?.name || "";
  }

  function optionLabel(item) {
    return item.short && item.short !== item.name ? `${item.name} - ${item.short}` : item.name;
  }

  function populateSelector() {
    elements.primary.innerHTML = currentItems()
      .map((item) => `<option value="${escapeHtml(item.name)}">${escapeHtml(optionLabel(item))}</option>`)
      .join("");
    elements.primary.value = state.primary;
  }

  function formatBillions(value, exact = false) {
    if (value === null || value === undefined) return "Not separately identified";
    const digits = value < 10 ? 2 : exact ? 1 : 1;
    return `₱${Number(value).toLocaleString("en-PH", { minimumFractionDigits: digits, maximumFractionDigits: digits })}B`;
  }

  function formatLarge(value) {
    if (value === null || value === undefined) return " - ";
    if (Math.abs(value) >= 1000) return `₱${(value / 1000).toFixed(3)}T`;
    return formatBillions(value);
  }

  function firstKnown(values) {
    const index = values.findIndex((value) => value !== null && value !== undefined);
    return index < 0 ? null : { index, value: values[index] };
  }

  function lastKnown(values) {
    for (let index = values.length - 1; index >= 0; index -= 1) {
      if (values[index] !== null && values[index] !== undefined) return { index, value: values[index] };
    }
    return null;
  }

  function highPoint(values) {
    let best = null;
    values.forEach((value, index) => {
      if (value !== null && value !== undefined && (!best || value > best.value)) best = { index, value };
    });
    return best;
  }

  function renderSummary(series) {
    const first = firstKnown(series.values);
    const latest = lastKnown(series.values);
    const high = highPoint(series.values);
    const change = first && latest ? latest.value - first.value : null;
    const percent = first && latest && first.value ? (change / first.value) * 100 : null;
    const changeClass = change === null ? "" : change >= 0 ? "change-positive" : "change-negative";
    const firstYear = first ? data.years[first.index] : data.years[0];
    const latestYear = latest ? data.years[latest.index] : data.years.at(-1);

    elements.summary.innerHTML = `
      <div class="history-stat history-stat-latest">
        <span>${latestYear} enacted allocation</span>
        <strong>${formatLarge(latest?.value)}</strong>
        <small>Latest published GAA value</small>
      </div>
      <div class="history-stat ${changeClass}">
        <span>Change since ${firstYear}</span>
        <strong>${change === null ? " - " : `${change >= 0 ? "+" : "−"}${formatLarge(Math.abs(change))}`}</strong>
        <small>${percent === null ? "Insufficient comparable years" : `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}% in nominal pesos`}</small>
      </div>
      <div class="history-stat">
        <span>Highest enacted allocation</span>
        <strong>${formatLarge(high?.value)}</strong>
        <small>${high ? `Recorded in FY ${data.years[high.index]}` : "No comparable value"}</small>
      </div>`;
  }

  function niceStep(raw) {
    if (!Number.isFinite(raw) || raw <= 0) return 1;
    const power = 10 ** Math.floor(Math.log10(raw));
    const normalized = raw / power;
    const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    return nice * power;
  }

  function axisLabel(value) {
    if (value >= 1000) return `₱${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}T`;
    return `₱${Math.round(value)}B`;
  }

  function knownSegments(values) {
    const segments = [];
    let current = [];
    values.forEach((value, index) => {
      if (value === null || value === undefined) {
        if (current.length) segments.push(current);
        current = [];
      } else {
        current.push({ index, value });
      }
    });
    if (current.length) segments.push(current);
    return segments;
  }

  function renderChart(series) {
    const width = 920;
    const height = 420;
    const margin = { top: 62, right: 38, bottom: 58, left: 82 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const values = series.values.filter((value) => value !== null && value !== undefined);
    const maxValue = Math.max(...values, 1);
    const step = niceStep(maxValue / 4);
    const yMax = Math.ceil(maxValue / step) * step;
    const xFor = (index) => margin.left + (plotWidth * index) / Math.max(1, data.years.length - 1);
    const yFor = (value) => margin.top + plotHeight - (value / yMax) * plotHeight;
    const ticks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, index) => index * step);

    const horizontalGrid = ticks.map((value) => {
      const y = yFor(value);
      return `<line class="history-grid-line" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"></line>
        <text class="history-axis-label" x="${margin.left - 14}" y="${y + 4}" text-anchor="end">${axisLabel(value)}</text>`;
    }).join("");

    const years = data.years.map((year, index) => `
      <line class="history-grid-line history-year-guide" x1="${xFor(index)}" y1="${margin.top}" x2="${xFor(index)}" y2="${height - margin.bottom}"></line>
      <text class="history-year-label" x="${xFor(index)}" y="${height - 20}" text-anchor="middle">${year}</text>`).join("");

    const segments = knownSegments(series.values);
    const baseline = height - margin.bottom;
    const areas = segments.map((segment) => {
      if (segment.length < 2) return "";
      const line = segment.map((point, index) => `${index ? "L" : "M"}${xFor(point.index).toFixed(2)},${yFor(point.value).toFixed(2)}`).join(" ");
      return `<path class="history-area" d="M${xFor(segment[0].index).toFixed(2)},${baseline} ${line.replace(/^M/, "L")} L${xFor(segment.at(-1).index).toFixed(2)},${baseline} Z"></path>`;
    }).join("");
    const lines = segments.map((segment) => {
      const path = segment.map((point, index) => `${index ? "L" : "M"}${xFor(point.index).toFixed(2)},${yFor(point.value).toFixed(2)}`).join(" ");
      return `<path class="history-line" d="${path}"></path>`;
    }).join("");

    const points = series.values.map((value, yearIndex) => {
      if (value === null || value === undefined) {
        return `<text class="history-missing" x="${xFor(yearIndex)}" y="${baseline - 11}" text-anchor="middle">n/a</text>`;
      }
      const label = `${series.name}, ${data.years[yearIndex]}: ${formatBillions(value, true)}`;
      return `<g class="history-point">
        <circle class="history-point-halo" cx="${xFor(yearIndex)}" cy="${yFor(value)}" r="13"></circle>
        <circle class="history-dot" cx="${xFor(yearIndex)}" cy="${yFor(value)}" r="6.5" tabindex="0" role="button" aria-label="${escapeHtml(label)}" data-year-index="${yearIndex}"></circle>
        <text class="history-value-label" x="${xFor(yearIndex)}" y="${yFor(value) - 18}" text-anchor="middle">${formatLarge(value)}</text>
      </g>`;
    }).join("");

    elements.chart.innerHTML = `<svg class="history-svg" viewBox="0 0 ${width} ${height}" role="group" aria-label="Interactive yearly data points">
      <defs>
        <linearGradient id="historyAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${seriesColor}" stop-opacity="0.42"></stop>
          <stop offset="100%" stop-color="${seriesColor}" stop-opacity="0.02"></stop>
        </linearGradient>
      </defs>
      ${horizontalGrid}${years}${areas}${lines}${points}
    </svg>`;
    elements.chart.setAttribute("aria-label", `${series.name}, enacted allocations from ${data.years[0]} to ${data.years.at(-1)}`);
  }

  function renderLegend(series) {
    const typeLabel = state.type === "regions" ? "Regional allocation" : "Department / office allocation";
    elements.legend.innerHTML = `
      <span class="history-legend-item" style="--series-color:${seriesColor}"><i aria-hidden="true"></i><span><strong>${escapeHtml(series.name)}</strong><small>${typeLabel}</small></span></span>`;
  }

  function renderTable(series) {
    elements.tableHead.innerHTML = `<tr><th scope="col">Fiscal year</th><th scope="col">Enacted allocation</th><th scope="col">Year-over-year</th></tr>`;
    elements.tableBody.innerHTML = data.years.map((year, index) => {
      const value = series.values[index];
      const previous = index ? series.values[index - 1] : null;
      const delta = value !== null && value !== undefined && previous !== null && previous !== undefined ? value - previous : null;
      const deltaPercent = delta !== null && previous ? (delta / previous) * 100 : null;
      const deltaClass = delta === null ? "is-missing" : delta >= 0 ? "change-positive" : "change-negative";
      const deltaText = deltaPercent === null ? " - " : `${deltaPercent >= 0 ? "+" : ""}${deltaPercent.toFixed(1)}%`;
      return `<tr>
        <td>${year}</td>
        <td class="${value === null ? "is-missing" : ""}">${formatBillions(value, true)}</td>
        <td class="${deltaClass}"><span class="history-delta">${deltaText}</span></td>
      </tr>`;
    }).join("");
  }

  function renderMethod() {
    elements.methodDetail.textContent = state.type === "regions"
      ? "Region totals include rows carrying a UACS region code. Untagged nationwide rows stay outside the series, and operational codes can place central-office entries under NCR."
      : "Department lines follow each year’s enacted GAA grouping. Renamed or reorganized offices can affect strict comparability; DEPDev is continued from NEDA in this view.";
  }

  function render() {
    const series = getSeries(state.primary);
    if (!series) return;
    renderSummary(series);
    renderLegend(series);
    renderChart(series);
    renderTable(series);
    renderMethod();
  }

  function showTooltip(point) {
    const series = getSeries(state.primary);
    const yearIndex = Number(point.dataset.yearIndex);
    const current = series.values[yearIndex];
    const previous = yearIndex ? series.values[yearIndex - 1] : null;
    const percent = current !== null && previous ? ((current - previous) / previous) * 100 : null;
    elements.tooltip.innerHTML = `
      <small>FY ${data.years[yearIndex]} enacted allocation</small>
      <strong>${formatBillions(current, true)}</strong>
      <span>${percent === null ? escapeHtml(series.name) : `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}% from the previous year`}</span>`;
    elements.tooltip.hidden = false;
  }

  function hideTooltip() {
    elements.tooltip.hidden = true;
  }

  elements.type.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-history-type]");
    if (!button || button.dataset.historyType === state.type) return;
    state.type = button.dataset.historyType;
    elements.type.querySelectorAll("button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    setDefault();
    populateSelector();
    render();
  });

  elements.primary.addEventListener("change", (event) => {
    state.primary = event.target.value;
    hideTooltip();
    render();
  });

  elements.chart.addEventListener("mouseover", (event) => {
    const point = event.target.closest(".history-dot");
    if (point) showTooltip(point);
  });
  elements.chart.addEventListener("focusin", (event) => {
    const point = event.target.closest(".history-dot");
    if (point) showTooltip(point);
  });
  elements.chart.addEventListener("click", (event) => {
    const point = event.target.closest(".history-dot");
    if (point) showTooltip(point);
  });
  elements.chart.addEventListener("mouseout", (event) => {
    if (event.target.closest(".history-dot") && !elements.chart.contains(event.relatedTarget)) hideTooltip();
  });
  elements.chart.addEventListener("focusout", (event) => {
    if (!elements.chart.contains(event.relatedTarget)) hideTooltip();
  });

  setDefault();
  populateSelector();
  render();
})();
