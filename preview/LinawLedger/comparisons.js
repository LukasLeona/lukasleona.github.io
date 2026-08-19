(() => {
  "use strict";

  const data = window.LINAW_COMPARISONS;
  if (!data) return;

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function formatBillions(value, precise = false) {
    if (value === null || value === undefined) return "n/a";
    if (value >= 1000) return `₱${(value / 1000).toFixed(precise ? 3 : 2)}T`;
    const digits = precise ? 3 : value < 10 ? 2 : 1;
    return `₱${Number(value).toLocaleString("en-PH", { minimumFractionDigits: digits, maximumFractionDigits: digits })}B`;
  }

  function niceStep(raw) {
    if (!Number.isFinite(raw) || raw <= 0) return 1;
    const power = 10 ** Math.floor(Math.log10(raw));
    const normalized = raw / power;
    return (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 2.5 ? 2.5 : normalized <= 5 ? 5 : 10) * power;
  }

  function axisLabel(value) {
    if (value >= 1000) return `₱${(value / 1000).toFixed(value % 1000 ? 1 : 0)}T`;
    return `₱${Math.round(value)}B`;
  }

  function smoothPath(points) {
    if (!points.length) return "";
    if (points.length === 1) return `M${points[0].x},${points[0].y}`;
    return points.reduce((path, point, index) => {
      if (!index) return `M${point.x},${point.y}`;
      const previous = points[index - 1];
      const before = points[index - 2] || previous;
      const after = points[index + 1] || point;
      const c1x = previous.x + (point.x - before.x) / 6;
      const c1y = previous.y + (point.y - before.y) / 6;
      const c2x = point.x - (after.x - previous.x) / 6;
      const c2y = point.y - (after.y - previous.y) / 6;
      return `${path} C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${point.x},${point.y}`;
    }, "");
  }

  function renderLegend(series) {
    return `<div class="comparison-legend">${series.map((item) => `
      <span><i style="--legend-color:${item.color}" aria-hidden="true"></i><strong>${escapeHtml(item.short)}</strong><small>${escapeHtml(item.name)}</small></span>`).join("")}</div>`;
  }

  function renderPanel(target, title, series) {
    const width = 680;
    const height = 350;
    const margin = { top: 28, right: 28, bottom: 52, left: 74 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const maxValue = Math.max(...series.flatMap((item) => item.values.filter((value) => value !== null)), 1);
    const step = niceStep(maxValue / 5);
    const yMax = Math.ceil(maxValue / step) * step;
    const xFor = (index) => margin.left + (plotWidth * index) / (data.years.length - 1);
    const yFor = (value) => margin.top + plotHeight - (value / yMax) * plotHeight;
    const ticks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, index) => index * step);
    const latestX = xFor(data.years.length - 1);

    const grid = ticks.map((value) => {
      const y = yFor(value);
      return `<line class="comparison-grid-line" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"></line>
        <text class="comparison-axis-label" x="${margin.left - 12}" y="${y + 4}" text-anchor="end">${axisLabel(value)}</text>`;
    }).join("");
    const years = data.years.map((year, index) => `<text class="comparison-year-label" x="${xFor(index)}" y="${height - 16}" text-anchor="middle">${year}</text>`).join("");
    const paths = series.map((item) => {
      const points = item.values.map((value, index) => ({ value, index, x: xFor(index), y: yFor(value) }));
      const line = smoothPath(points);
      const dots = points.map((point) => `<circle class="comparison-dot" cx="${point.x}" cy="${point.y}" r="5.5" fill="${item.color}" tabindex="0" role="button" data-comparison-year="${point.index}" aria-label="${escapeHtml(`${item.name}, FY ${data.years[point.index]}: ${formatBillions(point.value, true)}`)}"></circle>`).join("");
      return `<path class="comparison-series-line" stroke="${item.color}" d="${line}"></path>${dots}`;
    }).join("");

    target.innerHTML = `<div class="comparison-panel-head"><strong>${escapeHtml(title)}</strong><span>Own labeled scale</span></div>
      ${renderLegend(series)}
      <div class="comparison-svg-wrap">
        <svg class="comparison-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(`${title}, enacted appropriations from 2019 to 2026`)}">
          <rect class="comparison-latest-band" x="${latestX - 26}" y="${margin.top}" width="52" height="${plotHeight}"></rect>
          ${grid}${years}${paths}
        </svg>
      </div>`;
  }

  function renderSummary(target, counterpart) {
    const latest = data.years.length - 1;
    const officeTotal = data.offices.reduce((sum, item) => sum + item.values[latest], 0);
    const counterpartTotal = counterpart.reduce((sum, item) => sum + item.values[latest], 0);
    const ratio = officeTotal / counterpartTotal;
    target.innerHTML = `<div><span>FY 2026 top-office total</span><strong>${formatBillions(officeTotal)}</strong></div>
      <div><span>FY 2026 comparison total</span><strong>${formatBillions(counterpartTotal)}</strong></div>
      <div class="comparison-ratio"><span>Scale gap</span><strong>${ratio.toFixed(1)}×</strong><small>top three offices ÷ comparison group</small></div>`;
  }

  function renderReadout(target, counterpart, yearIndex) {
    const series = [...data.offices, ...counterpart];
    target.innerHTML = `<strong>FY ${data.years[yearIndex]}</strong><div>${series.map((item) => `<span style="--readout-color:${item.color}"><i aria-hidden="true"></i><b>${escapeHtml(item.short)}</b>${formatBillions(item.values[yearIndex], true)}</span>`).join("")}</div>`;
  }

  function renderTable(target, counterpart, caption) {
    const series = [...data.offices, ...counterpart];
    target.innerHTML = `<table><caption class="sr-only">${escapeHtml(caption)}</caption><thead><tr><th scope="col">Fiscal year</th>${series.map((item) => `<th scope="col">${escapeHtml(item.short)}</th>`).join("")}</tr></thead>
      <tbody>${data.years.map((year, yearIndex) => `<tr><th scope="row">${year}</th>${series.map((item) => `<td>${formatBillions(item.values[yearIndex], true)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  function setupComparison(key, counterpart, labels) {
    const root = document.querySelector(`[data-comparison="${key}"]`);
    if (!root) return;
    const officePanel = root.querySelector("[data-comparison-panel='offices']");
    const counterpartPanel = root.querySelector("[data-comparison-panel='counterpart']");
    const summary = root.querySelector("[data-comparison-summary]");
    const readout = root.querySelector("[data-comparison-readout]");
    const table = root.querySelector("[data-comparison-table]");
    renderPanel(officePanel, "Top government offices", data.offices);
    renderPanel(counterpartPanel, labels.panel, counterpart);
    renderSummary(summary, counterpart);
    renderReadout(readout, counterpart, data.years.length - 1);
    renderTable(table, counterpart, labels.caption);

    root.addEventListener("mouseover", (event) => {
      const point = event.target.closest("[data-comparison-year]");
      if (point) renderReadout(readout, counterpart, Number(point.dataset.comparisonYear));
    });
    root.addEventListener("focusin", (event) => {
      const point = event.target.closest("[data-comparison-year]");
      if (point) renderReadout(readout, counterpart, Number(point.dataset.comparisonYear));
    });
    root.addEventListener("click", (event) => {
      const point = event.target.closest("[data-comparison-year]");
      if (point) renderReadout(readout, counterpart, Number(point.dataset.comparisonYear));
    });
  }

  setupComparison("sucs", data.sucs, {
    panel: "Leading state universities",
    caption: "Enacted appropriations for the top government offices and leading state universities, FY 2019 to FY 2026"
  });
  setupComparison("hospitals", data.hospitals, {
    panel: "National specialty hospitals",
    caption: "Enacted appropriations for the top government offices and national specialty hospitals, FY 2019 to FY 2026"
  });
})();
