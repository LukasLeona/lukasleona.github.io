(() => {
  "use strict";

  const data = window.LINAW_HISTORY;
  const root = document.querySelector("#trends");
  if (!data || !root) return;

  const elements = {
    type: root.querySelector("#historyType"),
    primary: root.querySelector("#historyPrimary"),
    compare: root.querySelector("#historyCompare"),
    summary: root.querySelector("#historySummary"),
    legend: root.querySelector("#historyLegend"),
    chart: root.querySelector("#historyChart"),
    tooltip: root.querySelector("#historyTooltip"),
    tableHead: root.querySelector("#historyTableHead"),
    tableBody: root.querySelector("#historyTableBody"),
    methodDetail: root.querySelector("#historyMethodDetail"),
  };

  const colors = ["#79cdb9", "#d6a43a"];
  const state = {
    type: "departments",
    primary: "",
    compare: "",
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

  function findPreferred(items, fragment, fallbackIndex = 0) {
    return items.find((item) => item.name.toLowerCase().includes(fragment.toLowerCase())) || items[fallbackIndex] || items[0];
  }

  function setDefaults() {
    const items = currentItems();
    const primary = state.type === "departments"
      ? findPreferred(items, "Department of Education")
      : findPreferred(items, "Region IV-A");
    const comparison = state.type === "departments"
      ? findPreferred(items, "Public Works", 1)
      : findPreferred(items, "Region III", 1);
    state.primary = primary?.name || "";
    state.compare = comparison?.name === state.primary ? (items.find((item) => item.name !== state.primary)?.name || "") : (comparison?.name || "");
  }

  function optionLabel(item) {
    return item.short && item.short !== item.name ? `${item.name} — ${item.short}` : item.name;
  }

  function populateSelectors() {
    const items = currentItems();
    const options = items.map((item) => `<option value="${escapeHtml(item.name)}">${escapeHtml(optionLabel(item))}</option>`).join("");
    elements.primary.innerHTML = options;
    elements.compare.innerHTML = options;
    elements.primary.value = state.primary;
    elements.compare.value = state.compare;
  }

  function formatBillions(value, exact = false) {
    if (value === null || value === undefined) return "Not separately identified";
    const digits = exact ? (value < 10 ? 2 : 1) : (value < 10 ? 2 : 1);
    return `₱${Number(value).toLocaleString("en-PH", { minimumFractionDigits: digits, maximumFractionDigits: digits })}B`;
  }

  function formatLarge(value) {
    if (value === null || value === undefined) return "—";
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

  function renderSummary(primary, comparison) {
    const first = firstKnown(primary.values);
    const latest = lastKnown(primary.values);
    const comparisonLatest = lastKnown(comparison.values);
    const change = first && latest ? latest.value - first.value : null;
    const percent = first && latest && first.value ? (change / first.value) * 100 : null;
    const gap = latest && comparisonLatest ? latest.value - comparisonLatest.value : null;
    const changeClass = change === null ? "" : change >= 0 ? "change-positive" : "change-negative";
    const gapClass = gap === null ? "" : gap >= 0 ? "change-positive" : "change-negative";
    const firstYear = first ? data.years[first.index] : data.years[0];
    const latestYear = latest ? data.years[latest.index] : data.years.at(-1);

    elements.summary.innerHTML = `
      <div class="history-stat">
        <span>${latestYear} primary allocation</span>
        <strong>${formatLarge(latest?.value)}</strong>
        <small>${escapeHtml(primary.name)}</small>
      </div>
      <div class="history-stat ${changeClass}">
        <span>Change since ${firstYear}</span>
        <strong>${change === null ? "—" : `${change >= 0 ? "+" : "−"}${formatLarge(Math.abs(change))}`}</strong>
        <small>${percent === null ? "Insufficient comparable years" : `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}% in nominal pesos`}</small>
      </div>
      <div class="history-stat ${gapClass}">
        <span>${latestYear} comparison gap</span>
        <strong>${gap === null ? "—" : `${gap >= 0 ? "+" : "−"}${formatLarge(Math.abs(gap))}`}</strong>
        <small>Primary minus ${escapeHtml(comparison.name)}</small>
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

  function seriesPath(values, xFor, yFor) {
    const parts = [];
    let drawing = false;
    values.forEach((value, index) => {
      if (value === null || value === undefined) {
        drawing = false;
        return;
      }
      parts.push(`${drawing ? "L" : "M"}${xFor(index).toFixed(2)},${yFor(value).toFixed(2)}`);
      drawing = true;
    });
    return parts.join(" ");
  }

  function renderChart(primary, comparison) {
    const width = 900;
    const height = 390;
    const margin = { top: 34, right: 30, bottom: 52, left: 78 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const allValues = [...primary.values, ...comparison.values].filter((value) => value !== null && value !== undefined);
    const maxValue = Math.max(...allValues, 1);
    const step = niceStep(maxValue / 4);
    const yMax = Math.ceil(maxValue / step) * step;
    const xFor = (index) => margin.left + (plotWidth * index) / Math.max(1, data.years.length - 1);
    const yFor = (value) => margin.top + plotHeight - (value / yMax) * plotHeight;
    const ticks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, index) => index * step);
    const selected = [primary, comparison];

    const grid = ticks.map((value) => {
      const y = yFor(value);
      return `<line class="history-grid-line" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"></line>
        <text class="history-axis-label" x="${margin.left - 12}" y="${y + 4}" text-anchor="end">${axisLabel(value)}</text>`;
    }).join("");

    const years = data.years.map((year, index) => `
      <line class="history-grid-line" x1="${xFor(index)}" y1="${margin.top}" x2="${xFor(index)}" y2="${height - margin.bottom}"></line>
      <text class="history-year-label" x="${xFor(index)}" y="${height - 18}" text-anchor="middle">${year}</text>`).join("");

    const lines = selected.map((series, seriesIndex) => {
      const color = colors[seriesIndex];
      const path = seriesPath(series.values, xFor, yFor);
      const points = series.values.map((value, yearIndex) => {
        if (value === null || value === undefined) {
          return seriesIndex === 0
            ? `<text class="history-missing" x="${xFor(yearIndex)}" y="${height - margin.bottom - 9}" text-anchor="middle">n/a</text>`
            : "";
        }
        const label = `${series.name}, ${data.years[yearIndex]}: ${formatBillions(value, true)}`;
        return `<circle class="history-dot" style="--series-color:${color}" cx="${xFor(yearIndex)}" cy="${yFor(value)}" r="6" tabindex="0" role="button" aria-label="${escapeHtml(label)}" data-series="${seriesIndex}" data-year-index="${yearIndex}"></circle>`;
      }).join("");
      return `<path class="history-line${seriesIndex ? " is-comparison" : ""}" style="--series-color:${color}" d="${path}"></path>${points}`;
    }).join("");

    elements.chart.innerHTML = `<svg class="history-svg" viewBox="0 0 ${width} ${height}" role="group" aria-label="Interactive yearly data points">${grid}${years}${lines}</svg>`;
    elements.chart.setAttribute("aria-label", `${primary.name} and ${comparison.name}, enacted allocations from ${data.years[0]} to ${data.years.at(-1)}`);
  }

  function renderLegend(primary, comparison) {
    elements.legend.innerHTML = [primary, comparison].map((series, index) => `
      <span class="history-legend-item" style="--series-color:${colors[index]}"><i aria-hidden="true"></i>${escapeHtml(series.name)}</span>`).join("");
  }

  function renderTable(primary, comparison) {
    elements.tableHead.innerHTML = `<tr><th scope="col">Fiscal year</th><th scope="col">${escapeHtml(primary.name)}</th><th scope="col">${escapeHtml(comparison.name)}</th></tr>`;
    elements.tableBody.innerHTML = data.years.map((year, index) => {
      const primaryValue = primary.values[index];
      const comparisonValue = comparison.values[index];
      return `<tr>
        <td>${year}</td>
        <td class="${primaryValue === null ? "is-missing" : ""}">${formatBillions(primaryValue, true)}</td>
        <td class="${comparisonValue === null ? "is-missing" : ""}">${formatBillions(comparisonValue, true)}</td>
      </tr>`;
    }).join("");
  }

  function renderMethod() {
    elements.methodDetail.textContent = state.type === "regions"
      ? "For regions, rows carrying a UACS region code are counted and untagged nationwide rows are excluded. Operational codes can place central-office entries under NCR. NIR appears only when separately identified in the workbook."
      : "Department lines follow each year's published GAA grouping. Renamed or reorganized offices can affect strict year-to-year comparability; DEPDev is continued from NEDA in this view.";
  }

  function render() {
    const primary = getSeries(state.primary);
    let comparison = getSeries(state.compare);
    if (!primary || !comparison) return;
    if (comparison.name === primary.name) {
      comparison = currentItems().find((item) => item.name !== primary.name) || comparison;
      state.compare = comparison.name;
      elements.compare.value = comparison.name;
    }
    renderSummary(primary, comparison);
    renderLegend(primary, comparison);
    renderChart(primary, comparison);
    renderTable(primary, comparison);
    renderMethod();
  }

  function showTooltip(point) {
    const series = Number(point.dataset.series) === 0 ? getSeries(state.primary) : getSeries(state.compare);
    const yearIndex = Number(point.dataset.yearIndex);
    elements.tooltip.innerHTML = `<strong>${data.years[yearIndex]} · ${formatBillions(series.values[yearIndex], true)}</strong><span>${escapeHtml(series.name)}</span>`;
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
    setDefaults();
    populateSelectors();
    render();
  });

  elements.primary.addEventListener("change", (event) => {
    state.primary = event.target.value;
    render();
  });

  elements.compare.addEventListener("change", (event) => {
    state.compare = event.target.value;
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

  setDefaults();
  populateSelectors();
  render();
})();
