(() => {
  "use strict";

  const data = window.LINAW_DATA;
  if (!data) {
    document.body.innerHTML = '<main class="empty-state"><h1>LinawLedger</h1><p>The budget dataset could not be loaded.</p></main>';
    return;
  }

  const state = {
    departmentFilter: "all",
    departmentSort: "largest",
    departmentQuery: "",
    showAllDepartments: false,
    selectedDepartment: null,
    islandFilter: "all",
    selectedRegion: null,
    allocationChartFilter: "department",
    language: "en",
    suggestionIndex: -1,
  };

  const elements = {
    heroTotal: document.querySelector("#heroTotal"),
    departmentList: document.querySelector("#departmentList"),
    departmentDetail: document.querySelector("#departmentDetail"),
    departmentSearch: document.querySelector("#departmentSearch"),
    departmentSort: document.querySelector("#departmentSort"),
    departmentTypeFilter: document.querySelector("#departmentTypeFilter"),
    showMoreDepartments: document.querySelector("#showMoreDepartments"),
    allocationChartFilter: document.querySelector("#allocationChartFilter"),
    topAllocationChart: document.querySelector("#topAllocationChart"),
    expenseDonut: document.querySelector("#expenseDonut"),
    expenseLegend: document.querySelector("#expenseLegend"),
    priorityGrid: document.querySelector("#priorityGrid"),
    islandFilter: document.querySelector("#islandFilter"),
    regionList: document.querySelector("#regionList"),
    regionSpotlight: document.querySelector("#regionSpotlight"),
    philippinesMap: document.querySelector("#philippinesMap"),
    mapTooltip: document.querySelector("#mapTooltip"),
    automaticTotal: document.querySelector("#automaticTotal"),
    automaticChart: document.querySelector("#automaticChart"),
    agencySearch: document.querySelector("#agencySearch"),
    agencySummary: document.querySelector("#agencySummary"),
    agencyResults: document.querySelector("#agencyResults"),
    sourceList: document.querySelector("#sourceList"),
    globalSearch: document.querySelector("#globalSearch"),
    globalSearchForm: document.querySelector("#globalSearchForm"),
    searchSuggestions: document.querySelector("#searchSuggestions"),
    languageButton: document.querySelector("#languageButton"),
    languageLabel: document.querySelector("#languageLabel"),
    toast: document.querySelector("#toast"),
  };

  const totalPesos = data.meta.total_thousand_pesos * 1000;
  const topDepartmentAmount = Math.max(...data.departments.map((item) => item.amount_thousand_pesos));
  const topRegionAmount = Math.max(...data.regions.map((item) => item.amount_billion));
  const agencyByKey = new Map(data.agencies.map((item) => [entityKey(item.department, item.name), item]));
  const mapData = window.PH_PROVINCES;
  const expenseColors = ["#126a61", "#d6a43a", "#e27258", "#7b78b8", "#79cdb9", "#778582"];
  const allocationMarks = {
    "Department of Education (DepEd)": { src: "assets/logos/deped.svg", label: "DepEd" },
    "Department of Public Works and Highways (DPWH)": { src: "assets/logos/dpwh.svg", label: "DPWH" },
    "Department of the Interior and Local Government (DILG)": { src: "assets/logos/dilg.png", label: "DILG" },
    "Department of National Defense (DND)": { src: "assets/logos/dnd.svg", label: "DND" },
    "Department of Health (DOH)": { src: "assets/logos/doh.svg", label: "DOH" },
    "Department of Social Welfare and Development (DSWD)": { src: "assets/logos/dswd.png", label: "DSWD" },
    "Department of Agriculture (DA)": { src: "assets/logos/da.jpg", label: "DA" },
    "Department of Transportation (DOTr)": { src: "assets/logos/dotr.svg", label: "DOTr" },
  };
  const allocationBadges = {
    "State Universities and Colleges (SUCs)": "SUCs",
    "Other Executive Offices (OEOs)": "OEOs",
    "Automatic Appropriations": "AUTO",
    "New General Appropriations": "NGA",
    "Budgetary Support to Government Corporations": "BSGC",
    "Allocations to Local Government Units (ALGU)": "ALGU",
    "Special Purpose Funds": "SPF",
  };
  const priorityOffices = [
    { name: "Office of the President (OP)", abbr: "OP", role: "Executive leadership and presidential operations", featured: true, accent: "#d6a43a" },
    { name: "Department of Education (DepEd)", abbr: "DepEd", role: "Basic education and attached agencies", featured: true, accent: "#79cdb9" },
    { name: "Department of Public Works and Highways (DPWH)", abbr: "DPWH", role: "Roads, bridges, flood control, and public infrastructure", featured: true, accent: "#d6a43a" },
    { name: "Department of Health (DOH)", abbr: "DOH", role: "Public health programs, facilities, and health services", accent: "#e27258" },
    { name: "Department of Agriculture (DA)", abbr: "DA", role: "Food security, farming, fisheries, and agricultural support", accent: "#5fae69" },
    { name: "Department of the Interior and Local Government (DILG)", abbr: "DILG", role: "Local governance, public safety, police, fire, and jails", accent: "#4f92b8" },
    { name: "Department of National Defense (DND)", abbr: "DND", role: "National defense, civil defense, and veterans' services", accent: "#778582" },
    { name: "Department of Social Welfare and Development (DSWD)", abbr: "DSWD", role: "Social protection, assistance, and community programs", accent: "#a276b5" },
    { name: "Department of Transportation (DOTr)", abbr: "DOTr", role: "National transport systems and mobility programs", accent: "#3d9ab0" },
    { name: "Department of Labor and Employment (DOLE)", abbr: "DOLE", role: "Employment services, worker protection, and labor policy", accent: "#d18d4b" },
    { name: "The Judiciary (JUD)", abbr: "JUD", role: "Courts and the administration of justice", accent: "#8a7d6f" },
  ];
  const expenseDescriptions = {
    "Personnel Services": "Salaries, wages, allowances, premiums, and other government personnel benefits.",
    "Maintenance and Other Operating Expenses": "Operations, supplies, utilities, services, subsidies, and many transfers.",
    "Capital Outlays": "Infrastructure, buildings, equipment, and other long-lived public assets.",
    "Financial Expenses": "Interest and other financing-related costs.",
  };

  const translations = {
    en: {
      heroEyebrow: "Republic Act No. 12314 · Fiscal Year 2026",
      heroTitle: "Saan napupunta ang <em>₱6.793 trillion?</em>",
      heroLead: "Explore the 2026 national budget, then follow eight enacted budgets from 2019–2026 by department, agency, institution, expense class, or region—without decoding hundreds of pages.",
      searchLabel: "Search the 2026 national budget",
      searchButton: "Search budget",
      tryLabel: "Try:",
      trustOfficial: "Official DBM source",
      trustTraceable: "Every figure traceable",
      trustEnacted: "Enacted, not proposed",
      storyLabel: "The national budget",
      regionalizedShare: "regionalized",
      regionalized: "Regionalized",
      nonRegionalized: "Non-regionalized",
      roundingNote: "Rounded DBM presentation figures may not add exactly to the total.",
      appropriationNote: "<strong>This is spending authority.</strong> An appropriation is permission to spend; it does not mean the money has already been released or paid out.",
      metricRegional: "Located across regions",
      metricRegionalNote: "Regionalized budget",
      metricNationwide: "For nationwide allocation",
      metricNationwideNote: "Still distributed during the year",
      metricCentral: "Managed by head offices",
      metricCentralNote: "Central office allocation",
      metricStandby: "Conditional standby authority",
      metricStandbyNote: "Unprogrammed appropriations",
      departmentsKicker: "Follow the money",
      departmentsTitle: "Explore every department and fund.",
      departmentsIntro: "Amounts come from the enacted GAA workbook. Select any row to see attached agencies, expense classes, and major programs.",
      sortLabel: "Sort",
      listEntity: "Department or fund",
      listAllocation: "Authorized allocation",
      regionsKicker: "Your place in the budget",
      regionsTitle: "See allocations across all 18 regions.",
      regionsIntro: "These are DBM's official regionalized totals. Central-office and nationwide allocations are shown separately to avoid double counting.",
      agenciesKicker: "Go one level deeper",
      agenciesTitle: "Find an agency or program.",
      agenciesIntro: "Search hundreds of agencies and thousands of major program entries extracted from the official GAA workbook.",
      understandKicker: "Read the budget correctly",
      understandTitle: "Authorized does not mean spent.",
      understandLead: "LinawLedger currently follows the enacted appropriations stage. Future releases can connect budget releases, obligations, and actual disbursements without mixing them together.",
    },
    fil: {
      heroEyebrow: "Batas Republika Blg. 12314 · Taong Piskal 2026",
      heroTitle: "Saan napupunta ang <em>₱6.793 trilyon?</em>",
      heroLead: "Tingnan ang badyet ng 2026 at sundan ang walong pinagtibay na badyet mula 2019–2026 ayon sa departamento, ahensiya, institusyon, uri ng gastusin, o rehiyon.",
      searchLabel: "Hanapin sa pambansang badyet ng 2026",
      searchButton: "Maghanap",
      tryLabel: "Subukan:",
      trustOfficial: "Opisyal na sanggunian ng DBM",
      trustTraceable: "May sanggunian ang bawat bilang",
      trustEnacted: "Pinagtibay, hindi panukala",
      storyLabel: "Ang pambansang badyet",
      regionalizedShare: "nakalaan sa mga rehiyon",
      regionalized: "Nakarehiyon",
      nonRegionalized: "Hindi nakarehiyon",
      roundingNote: "Maaaring hindi eksaktong magtugma ang kabuuan dahil ni-round ng DBM ang mga bilang.",
      appropriationNote: "<strong>Awtoridad itong gumastos.</strong> Ang apropriyasyon ay pahintulot na gumastos; hindi ibig sabihin na nailabas o nabayaran na ang pera.",
      metricRegional: "Nakatukoy sa mga rehiyon",
      metricRegionalNote: "Nakarehiyong badyet",
      metricNationwide: "Para sa buong bansa",
      metricNationwideNote: "Ipamamahagi pa sa loob ng taon",
      metricCentral: "Pinamamahalaan ng punong tanggapan",
      metricCentralNote: "Alokasyon sa central office",
      metricStandby: "May kondisyong awtoridad",
      metricStandbyNote: "Unprogrammed appropriations",
      departmentsKicker: "Sundan ang pera",
      departmentsTitle: "Tingnan ang bawat departamento at pondo.",
      departmentsIntro: "Mula sa pinagtibay na GAA workbook ang mga halaga. Pumili ng hanay upang makita ang mga ahensiya, uri ng gastusin, at pangunahing programa.",
      sortLabel: "Ayos",
      listEntity: "Departamento o pondo",
      listAllocation: "Awtorisadong alokasyon",
      regionsKicker: "Ang lugar mo sa badyet",
      regionsTitle: "Tingnan ang alokasyon sa lahat ng 18 rehiyon.",
      regionsIntro: "Ito ang opisyal na nakarehiyong kabuuan ng DBM. Hiwalay ang central-office at nationwide allocations upang maiwasan ang dobleng bilang.",
      agenciesKicker: "Himayin pa",
      agenciesTitle: "Maghanap ng ahensiya o programa.",
      agenciesIntro: "Maghanap sa daan-daang ahensiya at libo-libong pangunahing programang kinuha mula sa opisyal na GAA workbook.",
      understandKicker: "Basahin nang tama ang badyet",
      understandTitle: "Ang awtorisado ay hindi pa nagagastos.",
      understandLead: "Ang kasalukuyang LinawLedger ay para sa pinagtibay na apropriyasyon. Maaaring idagdag sa susunod ang releases, obligations, at aktuwal na disbursements nang hindi pinaghahalo ang mga ito.",
    },
  };

  function entityKey(department, name) {
    return `${department}|||${name}`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function formatMoneyFromPesos(pesos, decimals = 1) {
    const absolute = Math.abs(pesos);
    const trim = (value) => value.toFixed(decimals).replace(/\.0$/, "");
    if (absolute >= 1e12) return `₱${trim(pesos / 1e12)}T`;
    if (absolute >= 1e9) return `₱${trim(pesos / 1e9)}B`;
    if (absolute >= 1e6) return `₱${trim(pesos / 1e6)}M`;
    if (absolute >= 1e3) return `₱${trim(pesos / 1e3)}K`;
    return `₱${Math.round(pesos).toLocaleString("en-PH")}`;
  }

  function formatThousands(value, decimals = 1) {
    return formatMoneyFromPesos(value * 1000, decimals);
  }

  function formatPercent(value, total, decimals = 1) {
    if (!total) return "0%";
    const result = (value / total) * 100;
    if (result > 0 && result < 0.1) return "<0.1%";
    return `${result.toFixed(decimals).replace(/\.0$/, "")}%`;
  }

  function kindLabel(kind) {
    if (kind === "automatic") return "Automatic appropriation";
    if (kind === "fund") return "Special-purpose fund";
    return "Department / office";
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2600);
  }

  function renderTopAllocationChart() {
    if (!elements.topAllocationChart) return;
    const entries = data.departments
      .filter((item) => state.allocationChartFilter === "all" || item.kind === "department")
      .sort((a, b) => b.amount_thousand_pesos - a.amount_thousand_pesos)
      .slice(0, 8);
    const max = entries[0]?.amount_thousand_pesos || 1;
    elements.topAllocationChart.innerHTML = `
      <div class="allocation-scale" aria-hidden="true"><span>₱0</span><span>Common scale · max ${formatThousands(max)}</span></div>
      <div class="allocation-bars">
        ${entries.map((item, index) => {
          const mark = allocationMarks[item.name];
          const badge = allocationBadges[item.name] || item.name.match(/\(([^)]+)\)/)?.[1] || "GOV";
          const width = Math.max(2.5, (item.amount_thousand_pesos / max) * 100).toFixed(2);
          const color = [1, 4, 7].includes(index) ? "#d6a43a" : "#2b9b88";
          const value = formatThousands(item.amount_thousand_pesos);
          const share = formatPercent(item.amount_thousand_pesos, data.meta.total_thousand_pesos);
          return `
            <button class="allocation-bar" type="button" data-chart-department="${escapeHtml(item.name)}" style="--bar-width:${width}%;--bar-color:${color}" aria-label="${escapeHtml(item.name)}: ${value}, ${share} of the national budget. Open allocation details.">
              <span class="allocation-bar-rank" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
              <span class="allocation-bar-identity">
                <span class="allocation-bar-logo${mark ? " has-image" : " is-badge"}" aria-hidden="true">${mark ? `<img src="${mark.src}" alt="" loading="lazy">` : `<b>${escapeHtml(badge)}</b>`}</span>
                <span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(kindLabel(item.kind))}</small></span>
              </span>
              <span class="allocation-bar-track" aria-hidden="true"><i></i></span>
              <span class="allocation-bar-value"><strong>${value}</strong><small>${share} of total</small></span>
              <span class="allocation-bar-arrow" aria-hidden="true">↗</span>
            </button>`;
        }).join("")}
      </div>`;
  }

  function renderExpenseChart() {
    if (!elements.expenseDonut || !elements.expenseLegend) return;
    const totals = new Map();
    data.departments.forEach((department) => {
      Object.entries(department.expenses || {}).forEach(([name, amount]) => {
        totals.set(name, (totals.get(name) || 0) + amount);
      });
    });
    const entries = [...totals.entries()].sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((sum, [, amount]) => sum + amount, 0);
    let cursor = 0;
    const stops = entries.map(([, amount], index) => {
      const start = cursor;
      cursor += (amount / total) * 100;
      return `${expenseColors[index % expenseColors.length]} ${start.toFixed(2)}% ${cursor.toFixed(2)}%`;
    });
    elements.expenseDonut.style.setProperty("--expense-gradient", `conic-gradient(${stops.join(",")})`);
    elements.expenseDonut.setAttribute("aria-label", entries.map(([name, amount]) => `${name}: ${formatThousands(amount)}, ${formatPercent(amount, total)}`).join("; "));
    elements.expenseLegend.innerHTML = entries.map(([name, amount], index) => `
      <button type="button" data-expense="${escapeHtml(name)}" style="--legend-color:${expenseColors[index % expenseColors.length]}">
        <i aria-hidden="true"></i><span><strong title="${escapeHtml(name)}">${escapeHtml(name)}</strong><small>${formatPercent(amount, total)} of total</small></span><strong>${formatThousands(amount)}</strong>
      </button>`).join("");
  }

  function renderPriorityOffices() {
    if (!elements.priorityGrid) return;
    elements.priorityGrid.innerHTML = priorityOffices.map((office) => {
      const department = data.departments.find((item) => item.name === office.name);
      if (!department) return "";
      return `
        <button class="priority-card${office.featured ? " featured" : ""}" type="button" data-priority-department="${escapeHtml(department.name)}" style="--card-accent:${office.accent}">
          <span class="priority-card-top"><span class="priority-abbr">${escapeHtml(office.abbr)}</span><strong>${formatThousands(department.amount_thousand_pesos)}</strong></span>
          <h4>${escapeHtml(department.name)}</h4>
          <p>${escapeHtml(office.role)}</p>
          <footer><span>${formatPercent(department.amount_thousand_pesos * 1000, totalPesos)} of national budget</span><span aria-hidden="true">↗</span></footer>
        </button>`;
    }).join("");
  }

  function renderAutomaticAppropriations() {
    const automatic = data.departments.find((item) => item.name === "Automatic Appropriations");
    if (!automatic || !elements.automaticChart) return;
    if (elements.automaticTotal) elements.automaticTotal.textContent = formatThousands(automatic.amount_thousand_pesos, 3);
    const agencies = data.agencies
      .filter((item) => item.department === automatic.name)
      .sort((a, b) => b.amount_thousand_pesos - a.amount_thousand_pesos);
    const subtitles = {
      "National Tax Allotment": "Statutory share for local government units",
      "Debt Interest Payments": "Interest on national government debt",
      "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)": "Annual block grant and statutory transfers",
      "Net Lending": "National government advances to government corporations",
      "Customs duties and taxes, including tax expenditures": "Government tax and customs obligations",
    };
    const colors = ["#126a61", "#d6a43a", "#79cdb9", "#e27258", "#7b78b8"];
    elements.automaticChart.innerHTML = agencies.map((agency, index) => `
      <div class="automatic-item">
        <span class="automatic-item-label"><strong title="${escapeHtml(agency.name)}">${escapeHtml(agency.name)}</strong><small>${escapeHtml(subtitles[agency.name] || "Authorized under a separate standing law")}</small></span>
        <span class="automatic-track" aria-hidden="true"><i style="--bar-width:${((agency.amount_thousand_pesos / automatic.amount_thousand_pesos) * 100).toFixed(2)}%;--bar-color:${colors[index % colors.length]}"></i></span>
        <strong>${formatThousands(agency.amount_thousand_pesos)} · ${formatPercent(agency.amount_thousand_pesos, automatic.amount_thousand_pesos)}</strong>
      </div>`).join("");
  }

  function mapColor(amount) {
    if (amount >= 500) return "#d6a43a";
    if (amount >= 300) return "#17806f";
    if (amount >= 200) return "#56b7a2";
    if (amount >= 150) return "#9fd8ca";
    return "#d7eee7";
  }

  function geometryRings(geometry) {
    if (!geometry) return [];
    if (geometry.type === "Polygon") return geometry.coordinates;
    if (geometry.type === "MultiPolygon") return geometry.coordinates.flatMap((polygon) => polygon);
    return [];
  }

  function renderPhilippinesMap() {
    if (!elements.philippinesMap || !mapData?.features?.length) return;
    const width = 560;
    const height = 660;
    const padding = 22;
    const coordinates = mapData.features.flatMap((feature) => geometryRings(feature.geometry).flat());
    const meanLatitude = coordinates.reduce((sum, point) => sum + point[1], 0) / coordinates.length;
    const longitudeScale = Math.cos((meanLatitude * Math.PI) / 180);
    const transformed = coordinates.map(([longitude, latitude]) => [longitude * longitudeScale, latitude]);
    const minX = Math.min(...transformed.map((point) => point[0]));
    const maxX = Math.max(...transformed.map((point) => point[0]));
    const minY = Math.min(...transformed.map((point) => point[1]));
    const maxY = Math.max(...transformed.map((point) => point[1]));
    const scale = Math.min((width - padding * 2) / (maxX - minX), (height - padding * 2) / (maxY - minY));
    const offsetX = (width - (maxX - minX) * scale) / 2;
    const offsetY = (height - (maxY - minY) * scale) / 2;
    const project = ([longitude, latitude]) => [
      offsetX + (longitude * longitudeScale - minX) * scale,
      height - (offsetY + (latitude - minY) * scale),
    ];
    const pathForFeature = (feature) => geometryRings(feature.geometry)
      .map((ring) => ring.map((point, index) => {
        const [x, y] = project(point);
        return `${index ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
      }).join("") + "Z")
      .join("");

    const namespace = "http://www.w3.org/2000/svg";
    const fragment = document.createDocumentFragment();
    mapData.features.forEach((feature) => {
      const region = data.regions.find((item) => item.name === feature.properties.budget_region);
      if (!region) return;
      const provinceName = feature.properties.province || "Province boundary";
      const path = document.createElementNS(namespace, "path");
      path.setAttribute("d", pathForFeature(feature));
      path.setAttribute("class", "map-province");
      path.style.setProperty("--region-fill", mapColor(region.amount_billion));
      path.dataset.region = region.name;
      path.dataset.province = provinceName;
      const title = document.createElementNS(namespace, "title");
      title.textContent = `${provinceName}, ${region.name}: ₱${region.amount_billion.toFixed(1)} billion regional allocation`;
      path.appendChild(title);
      path.addEventListener("mouseenter", () => showMapTooltip(path, region));
      path.addEventListener("mousemove", (event) => positionMapTooltip(event));
      path.addEventListener("mouseleave", hideMapTooltip);
      path.addEventListener("click", () => selectRegion(region.name));
      fragment.appendChild(path);
    });
    elements.philippinesMap.appendChild(fragment);
    updateMapSelection();
  }

  function showMapTooltip(path, region) {
    if (!elements.mapTooltip) return;
    elements.mapTooltip.innerHTML = `<strong>${escapeHtml(path.dataset.province)}</strong><span>${escapeHtml(region.name)} · ₱${region.amount_billion.toFixed(1)}B</span>`;
    elements.mapTooltip.hidden = false;
  }

  function positionMapTooltip(event) {
    if (!elements.mapTooltip || elements.mapTooltip.hidden) return;
    const wrap = elements.mapTooltip.parentElement.getBoundingClientRect();
    elements.mapTooltip.style.left = `${Math.min(wrap.width - 210, Math.max(4, event.clientX - wrap.left))}px`;
    elements.mapTooltip.style.top = `${Math.min(wrap.height - 25, Math.max(20, event.clientY - wrap.top))}px`;
  }

  function hideMapTooltip() {
    if (elements.mapTooltip) elements.mapTooltip.hidden = true;
  }

  function updateMapSelection() {
    if (!elements.philippinesMap) return;
    elements.philippinesMap.querySelectorAll(".map-province").forEach((path) => {
      path.classList.toggle("is-active", path.dataset.region === state.selectedRegion);
    });
  }

  function getFilteredDepartments() {
    const query = normalize(state.departmentQuery);
    const filtered = data.departments.filter((item) => {
      const matchesType = state.departmentFilter === "all" || item.kind === state.departmentFilter;
      const matchesQuery = !query || normalize(item.name).includes(query);
      return matchesType && matchesQuery;
    });

    return filtered.sort((a, b) => {
      if (state.departmentSort === "alpha") return a.name.localeCompare(b.name);
      if (state.departmentSort === "smallest") return a.amount_thousand_pesos - b.amount_thousand_pesos;
      return b.amount_thousand_pesos - a.amount_thousand_pesos;
    });
  }

  function renderDepartments() {
    const departments = getFilteredDepartments();
    const visible = state.showAllDepartments ? departments : departments.slice(0, 12);

    if (!visible.length) {
      elements.departmentList.innerHTML = '<div class="empty-state">No matching department or fund. Try a broader search.</div>';
      elements.showMoreDepartments.hidden = true;
      return;
    }

    elements.departmentList.innerHTML = visible.map((item) => {
      const isActive = state.selectedDepartment === item.name;
      const agencyCount = data.agencies.filter((agency) => agency.department === item.name).length;
      return `
        <button class="department-row${isActive ? " active" : ""}" type="button" data-department="${escapeHtml(item.name)}" aria-pressed="${isActive}">
          <span class="department-row-main">
            <span class="department-row-name">${escapeHtml(item.name)}</span>
            <span class="row-bar" aria-hidden="true"><i style="--bar-width:${Math.max(1, (item.amount_thousand_pesos / topDepartmentAmount) * 100).toFixed(2)}%"></i></span>
            <span class="department-row-meta"><span class="type-badge ${escapeHtml(item.kind)}">${escapeHtml(kindLabel(item.kind))}</span><span>${agencyCount} ${agencyCount === 1 ? "agency" : "agencies"}</span></span>
          </span>
          <span class="department-amount"><strong>${formatThousands(item.amount_thousand_pesos)}</strong><small>${formatPercent(item.amount_thousand_pesos * 1000, totalPesos)} of total</small></span>
        </button>`;
    }).join("");

    elements.showMoreDepartments.hidden = departments.length <= 12;
    elements.showMoreDepartments.innerHTML = state.showAllDepartments
      ? 'Show fewer <span aria-hidden="true">↑</span>'
      : `Show all ${departments.length} entries <span aria-hidden="true">↓</span>`;
  }

  function expenseMarkup(expenses, baseAmount) {
    const entries = Object.entries(expenses || {}).sort((a, b) => b[1] - a[1]);
    if (!entries.length) return '<p class="empty-state">No expense-class breakdown available.</p>';
    return entries.map(([name, amount]) => `
      <div class="expense-item">
        <span title="${escapeHtml(name)}">${escapeHtml(name)}</span><strong>${formatThousands(amount)}</strong>
        <span class="row-bar" aria-hidden="true"><i style="--bar-width:${Math.min(100, (amount / baseAmount) * 100).toFixed(2)}%"></i></span>
      </div>`).join("");
  }

  function miniListMarkup(items, emptyMessage = "No entries available.") {
    if (!items.length) return `<p class="empty-state">${escapeHtml(emptyMessage)}</p>`;
    return items.map((item) => `<div><span title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span><strong>${formatThousands(item.amount_thousand_pesos)}</strong></div>`).join("");
  }

  function selectDepartment(name, options = {}) {
    const department = data.departments.find((item) => item.name === name);
    if (!department) return;

    state.selectedDepartment = name;
    const agencies = data.agencies
      .filter((item) => item.department === name)
      .sort((a, b) => b.amount_thousand_pesos - a.amount_thousand_pesos)
      .slice(0, 7);
    const programTotals = new Map();
    data.programs
      .filter((item) => item.department === name)
      .forEach((item) => programTotals.set(item.name, (programTotals.get(item.name) || 0) + item.amount_thousand_pesos));
    const programs = [...programTotals.entries()]
      .map(([programName, amount]) => ({ name: programName, amount_thousand_pesos: amount }))
      .sort((a, b) => b.amount_thousand_pesos - a.amount_thousand_pesos)
      .slice(0, 6);

    elements.departmentDetail.innerHTML = `
      <div class="detail-top">
        <div class="detail-breadcrumb"><span class="detail-fy">FY 2026 GAA</span><span class="detail-chevron" aria-hidden="true">→</span><span class="detail-kind">${escapeHtml(kindLabel(department.kind))}</span></div>
        <h3>${escapeHtml(department.name)}</h3>
        <p class="detail-intro">A structured view of this enacted spending authority - by expense class, attached agency, and major program entry.</p>
        <div class="detail-total">
          <div><small>Authorized allocation</small><strong>${formatThousands(department.amount_thousand_pesos, 2)}</strong></div>
          <span class="share-pill">${formatPercent(department.amount_thousand_pesos * 1000, totalPesos, 2)} of national budget</span>
        </div>
      </div>
      <div class="detail-block">
        <div class="detail-block-heading"><span>By expense class</span><small>Share of this allocation</small></div>
        <div class="expense-list">${expenseMarkup(department.expenses, department.amount_thousand_pesos)}</div>
      </div>
      <div class="detail-block">
        <div class="detail-block-heading"><span>Largest attached agencies</span><small>${agencies.length ? `Top ${agencies.length}` : "None listed"}</small></div>
        <div class="mini-list">${miniListMarkup(agencies, "This entry has no attached agencies in the workbook.")}</div>
      </div>
      <div class="detail-block">
        <div class="detail-block-heading"><span>Major program entries</span><small>Top extracted entries</small></div>
        <div class="mini-list">${miniListMarkup(programs, "No program entries were available for this item.")}</div>
      </div>
      <div class="detail-source"><i>✓</i><span>Source: DBM FY 2026 GAA-by-object workbook. Amounts are appropriations, not actual disbursements.</span></div>`;

    renderDepartments();
    if (options.scroll) document.querySelector("#departments").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectAgency(agency, options = {}) {
    state.selectedDepartment = agency.department;
    const department = data.departments.find((item) => item.name === agency.department);
    const programs = data.programs
      .filter((item) => item.department === agency.department && item.agency === agency.name)
      .sort((a, b) => b.amount_thousand_pesos - a.amount_thousand_pesos)
      .slice(0, 9);

    elements.departmentDetail.innerHTML = `
      <div class="detail-top">
        <div class="detail-breadcrumb"><span class="detail-fy">FY 2026 GAA</span><span class="detail-chevron" aria-hidden="true">→</span><span class="detail-kind">Agency</span></div>
        <h3>${escapeHtml(agency.name)}</h3>
        <p class="detail-intro">An operating-unit view within ${escapeHtml(agency.department)}, showing its expense mix and largest listed program entries.</p>
        <div class="detail-total">
          <div><small>Authorized allocation</small><strong>${formatThousands(agency.amount_thousand_pesos, 2)}</strong></div>
          <span class="share-pill">${department ? formatPercent(agency.amount_thousand_pesos, department.amount_thousand_pesos, 2) : " - "} of parent</span>
        </div>
      </div>
      <div class="detail-block">
        <div class="detail-block-heading"><span>By expense class</span><small>Share of agency allocation</small></div>
        <div class="expense-list">${expenseMarkup(agency.expenses, agency.amount_thousand_pesos)}</div>
      </div>
      <div class="detail-block">
        <div class="detail-block-heading"><span>Major program entries</span><small>Top ${programs.length}</small></div>
        <div class="mini-list">${miniListMarkup(programs)}</div>
      </div>
      <div class="detail-source"><i>✓</i><span>Source: DBM FY 2026 GAA-by-object workbook. This is an enacted appropriation, not a record of actual spending.</span></div>`;

    renderDepartments();
    if (options.scroll !== false) document.querySelector("#departments").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectProgram(program, options = {}) {
    state.selectedDepartment = program.department;
    elements.departmentDetail.innerHTML = `
      <div class="detail-top">
        <div class="detail-breadcrumb"><span class="detail-fy">FY 2026 GAA</span><span class="detail-chevron" aria-hidden="true">→</span><span class="detail-kind">Program entry</span></div>
        <h3>${escapeHtml(program.name)}</h3>
        <p class="detail-intro">Listed under ${escapeHtml(program.agency)} within ${escapeHtml(program.department)}.</p>
        <div class="detail-total">
          <div><small>Authorized program entry</small><strong>${formatThousands(program.amount_thousand_pesos, 2)}</strong></div>
        </div>
      </div>
      <div class="detail-block">
        <div class="detail-block-heading"><span>How to read this</span></div>
        <p class="understand-lead">This is an aggregated program, activity, or project entry associated with ${escapeHtml(program.agency)}. Open the official GAA source for the controlling legal text and special provisions.</p>
      </div>
      <div class="detail-source"><i>✓</i><span>Source: DBM FY 2026 GAA-by-object workbook. Similar labels can appear under more than one operating unit.</span></div>`;
    renderDepartments();
    if (options.scroll !== false) document.querySelector("#departments").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function getRegionRank(region) {
    return [...data.regions].sort((a, b) => b.amount_billion - a.amount_billion).findIndex((item) => item.name === region.name) + 1;
  }

  function renderRegions() {
    const regions = data.regions
      .filter((item) => state.islandFilter === "all" || item.island_group === state.islandFilter)
      .sort((a, b) => b.amount_billion - a.amount_billion);

    elements.regionList.innerHTML = regions.map((region) => {
      const active = state.selectedRegion === region.name;
      return `
        <button class="region-row${active ? " active" : ""}" type="button" data-region="${escapeHtml(region.name)}" aria-pressed="${active}">
          <span class="region-rank">${String(getRegionRank(region)).padStart(2, "0")}</span>
          <span class="region-row-copy"><strong>${escapeHtml(region.name)}</strong><small>${escapeHtml(region.short)} · ${escapeHtml(region.island_group)}</small></span>
          <span class="region-amount">₱${region.amount_billion.toFixed(1)}B</span>
        </button>`;
    }).join("");
  }

  function selectRegion(name, options = {}) {
    const region = data.regions.find((item) => item.name === name);
    if (!region) return;
    state.selectedRegion = name;
    const share = (region.amount_billion / data.meta.regionalized_billion) * 100;
    const nationalShare = (region.amount_billion * 1e9 / totalPesos) * 100;

    elements.regionSpotlight.innerHTML = `
      <span class="spotlight-kicker">Region spotlight · Rank ${getRegionRank(region)} of ${data.regions.length}</span>
      <h3>${escapeHtml(region.name)}</h3>
      <span class="spotlight-short">${escapeHtml(region.short)} · ${escapeHtml(region.island_group)}</span>
      <div class="spotlight-amount">
        <small>FY 2026 regionalized allocation</small>
        <strong>₱${region.amount_billion.toFixed(1)}B</strong>
        <span>${share.toFixed(1)}% of the regionalized budget · ${nationalShare.toFixed(1)}% of the national budget</span>
      </div>
      <div class="spotlight-scale">
        <div class="spotlight-scale-head"><span>Relative to the largest region</span><span>${((region.amount_billion / topRegionAmount) * 100).toFixed(0)}%</span></div>
        <span class="row-bar" aria-hidden="true"><i style="--bar-width:${((region.amount_billion / topRegionAmount) * 100).toFixed(2)}%"></i></span>
      </div>
      <p class="spotlight-note"><strong>What this includes:</strong> Budgetary funds identified by the geographic location of cities, municipalities, and provinces. It should not be added to department totals; it is another view of the same national budget.</p>`;

    renderRegions();
    updateMapSelection();
    if (options.scroll) document.querySelector("#regions").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scoreMatch(value, query) {
    const normalizedValue = normalize(value);
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return 0;
    if (normalizedValue === normalizedQuery) return 100;
    if (normalizedValue.startsWith(normalizedQuery)) return 80;
    if (normalizedValue.includes(` ${normalizedQuery}`)) return 65;
    if (normalizedValue.includes(normalizedQuery)) return 50;
    const words = normalizedQuery.split(" ");
    return words.every((word) => normalizedValue.includes(word)) ? 35 : 0;
  }

  function findEntities(query, limit = 12) {
    const results = [];
    data.departments.forEach((item) => {
      const score = scoreMatch(item.name, query);
      if (score) results.push({ type: "department", name: item.name, subtitle: kindLabel(item.kind), amount: item.amount_thousand_pesos, score, item });
    });
    data.agencies.forEach((item) => {
      const score = Math.max(scoreMatch(item.name, query), scoreMatch(item.department, query) * 0.35);
      if (score) results.push({ type: "agency", name: item.name, subtitle: item.department, amount: item.amount_thousand_pesos, score, item });
    });
    data.regions.forEach((item) => {
      const score = Math.max(scoreMatch(item.name, query), scoreMatch(item.short, query));
      if (score) results.push({ type: "region", name: item.name, subtitle: `${item.short} · ${item.island_group}`, amount_billion: item.amount_billion, score, item });
    });
    data.programs.forEach((item) => {
      const score = Math.max(scoreMatch(item.name, query), scoreMatch(item.agency, query) * 0.3);
      if (score) results.push({ type: "program", name: item.name, subtitle: item.agency, amount: item.amount_thousand_pesos, score, item });
    });
    return results.sort((a, b) => b.score - a.score || (b.amount || b.amount_billion * 1e6) - (a.amount || a.amount_billion * 1e6)).slice(0, limit);
  }

  function entityAmount(result) {
    return result.type === "region" ? `₱${result.amount_billion.toFixed(1)}B` : formatThousands(result.amount);
  }

  function openEntity(result) {
    closeSuggestions();
    if (result.type === "department") selectDepartment(result.item.name, { scroll: true });
    if (result.type === "agency") selectAgency(result.item);
    if (result.type === "program") selectProgram(result.item);
    if (result.type === "region") selectRegion(result.item.name, { scroll: true });
  }

  function renderAgencyResults(query = "") {
    const normalizedQuery = normalize(query);
    let results;
    if (normalizedQuery) {
      results = findEntities(query, 18).filter((item) => item.type === "agency" || item.type === "program").slice(0, 12);
      elements.agencySummary.textContent = results.length
        ? `${results.length} closest ${results.length === 1 ? "match" : "matches"} for “${query.trim()}”`
        : `No matches for “${query.trim()}”`;
    } else {
      results = data.agencies.slice(0, 9).map((item) => ({ type: "agency", name: item.name, subtitle: item.department, amount: item.amount_thousand_pesos, item }));
      elements.agencySummary.textContent = "Showing the nine largest agencies and budget items";
    }

    if (!results.length) {
      elements.agencyResults.innerHTML = '<div class="empty-state">Try a shorter agency or program name.</div>';
      return;
    }

    elements.agencyResults.innerHTML = results.map((result, index) => `
      <button class="agency-result" type="button" data-result-index="${index}">
        <span class="agency-result-type"><span>${escapeHtml(result.type)}</span><span>${result.type === "agency" ? "Agency" : "Program entry"}</span></span>
        <h3>${escapeHtml(result.name)}</h3>
        <p title="${escapeHtml(result.subtitle)}">${escapeHtml(result.subtitle)}</p>
        <footer><strong>${entityAmount(result)}</strong><span aria-hidden="true">↗</span></footer>
      </button>`).join("");
    elements.agencyResults.currentResults = results;
  }

  function renderSources() {
    const historySources = (window.LINAW_HISTORY?.sources || []).map((source) => ({
      ...source,
      use: `Historical trend source for FY ${source.year}`,
    }));
    elements.sourceList.innerHTML = [...data.sources, ...historySources].map((source) => `
      <a class="source-item" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">
        <strong>${escapeHtml(source.label)}</strong>
        <p>${escapeHtml(source.use)}</p>
        <span aria-hidden="true">↗</span>
      </a>`).join("");
  }

  function renderSuggestions(query) {
    if (normalize(query).length < 2) {
      closeSuggestions();
      return;
    }
    const results = findEntities(query, 7);
    elements.searchSuggestions.currentResults = results;
    state.suggestionIndex = -1;
    elements.searchSuggestions.innerHTML = results.length
      ? results.map((result, index) => `
        <button class="search-suggestion" type="button" role="option" aria-selected="false" data-suggestion-index="${index}">
          <strong>${escapeHtml(result.name)}</strong><small>${escapeHtml(result.type)} · ${escapeHtml(result.subtitle)}</small><em>${entityAmount(result)}</em>
        </button>`).join("")
      : '<div class="empty-state">No matching budget entry.</div>';
    elements.searchSuggestions.hidden = false;
    elements.globalSearch.setAttribute("aria-expanded", "true");
  }

  function closeSuggestions() {
    elements.searchSuggestions.hidden = true;
    elements.globalSearch.setAttribute("aria-expanded", "false");
    state.suggestionIndex = -1;
  }

  function moveSuggestion(direction) {
    const results = elements.searchSuggestions.currentResults || [];
    if (!results.length || elements.searchSuggestions.hidden) return;
    state.suggestionIndex = (state.suggestionIndex + direction + results.length) % results.length;
    elements.searchSuggestions.querySelectorAll(".search-suggestion").forEach((button, index) => {
      button.setAttribute("aria-selected", String(index === state.suggestionIndex));
    });
  }

  function applyLanguage(language) {
    state.language = language;
    document.documentElement.lang = language === "fil" ? "fil" : "en";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const value = translations[language][key];
      if (!value) return;
      if (key === "heroTitle" || key === "appropriationNote") element.innerHTML = value;
      else element.textContent = value;
    });
    const isFilipino = language === "fil";
    elements.languageButton.setAttribute("aria-pressed", String(isFilipino));
    elements.languageLabel.textContent = isFilipino ? "English" : "Filipino";
    showToast(isFilipino ? "Piling wika: Filipino" : "Language set to English");
  }

  elements.departmentList.addEventListener("click", (event) => {
    const row = event.target.closest("[data-department]");
    if (row) selectDepartment(row.dataset.department);
  });

  elements.departmentSearch.addEventListener("input", (event) => {
    state.departmentQuery = event.target.value;
    state.showAllDepartments = false;
    renderDepartments();
  });

  elements.departmentSort.addEventListener("change", (event) => {
    state.departmentSort = event.target.value;
    renderDepartments();
  });

  elements.departmentTypeFilter.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    state.departmentFilter = button.dataset.filter;
    state.showAllDepartments = false;
    elements.departmentTypeFilter.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    renderDepartments();
  });

  elements.showMoreDepartments.addEventListener("click", () => {
    state.showAllDepartments = !state.showAllDepartments;
    renderDepartments();
  });

  elements.allocationChartFilter?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    state.allocationChartFilter = button.dataset.filter;
    elements.allocationChartFilter.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    renderTopAllocationChart();
  });

  elements.topAllocationChart?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chart-department]");
    if (button) selectDepartment(button.dataset.chartDepartment, { scroll: true });
  });

  elements.priorityGrid?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-priority-department]");
    if (button) selectDepartment(button.dataset.priorityDepartment, { scroll: true });
  });

  elements.expenseLegend?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-expense]");
    if (!button) return;
    showToast(expenseDescriptions[button.dataset.expense] || `${button.dataset.expense} is an official GAA expense class.`);
  });

  elements.islandFilter.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    state.islandFilter = button.dataset.filter;
    elements.islandFilter.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    const firstRegion = data.regions
      .filter((item) => state.islandFilter === "all" || item.island_group === state.islandFilter)
      .sort((a, b) => b.amount_billion - a.amount_billion)[0];
    renderRegions();
    if (firstRegion) selectRegion(firstRegion.name);
  });

  elements.regionList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-region]");
    if (button) selectRegion(button.dataset.region);
  });

  elements.agencySearch.addEventListener("input", (event) => renderAgencyResults(event.target.value));

  elements.agencyResults.addEventListener("click", (event) => {
    const button = event.target.closest("[data-result-index]");
    if (!button) return;
    const result = elements.agencyResults.currentResults?.[Number(button.dataset.resultIndex)];
    if (result) openEntity(result);
  });

  elements.globalSearch.addEventListener("input", (event) => renderSuggestions(event.target.value));
  elements.globalSearch.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveSuggestion(1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveSuggestion(-1);
    }
    if (event.key === "Escape") closeSuggestions();
    if (event.key === "Enter" && state.suggestionIndex >= 0) {
      event.preventDefault();
      const result = elements.searchSuggestions.currentResults?.[state.suggestionIndex];
      if (result) openEntity(result);
    }
  });

  elements.searchSuggestions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-suggestion-index]");
    if (!button) return;
    const result = elements.searchSuggestions.currentResults?.[Number(button.dataset.suggestionIndex)];
    if (result) openEntity(result);
  });

  elements.globalSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = findEntities(elements.globalSearch.value, 1)[0];
    if (result) openEntity(result);
    else showToast("No matching budget entry. Try an agency, department, program, or region.");
  });

  document.querySelectorAll("[data-query]").forEach((button) => {
    button.addEventListener("click", () => {
      elements.globalSearch.value = button.dataset.query;
      const result = findEntities(button.dataset.query, 1)[0];
      if (result) openEntity(result);
    });
  });

  elements.languageButton.addEventListener("click", () => applyLanguage(state.language === "en" ? "fil" : "en"));

  document.addEventListener("click", (event) => {
    if (!elements.globalSearchForm.contains(event.target)) closeSuggestions();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      elements.agencySearch.focus();
      document.querySelector("#agencies").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  elements.heroTotal.textContent = formatMoneyFromPesos(totalPesos, 3);
  renderTopAllocationChart();
  renderExpenseChart();
  renderPriorityOffices();
  renderAutomaticAppropriations();
  renderDepartments();
  selectDepartment(data.departments[0].name);
  renderRegions();
  selectRegion([...data.regions].sort((a, b) => b.amount_billion - a.amount_billion)[0].name);
  renderPhilippinesMap();
  renderAgencyResults();
  renderSources();
})();
