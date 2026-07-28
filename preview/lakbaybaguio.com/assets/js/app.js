(() => {
  "use strict";

  const data = window.LAKBAY_DATA;
  const state = {
    selected: new Set(),
    activeArea: "All",
    customStart: null,
    itinerary: null,
    map: null,
    mapLayer: null,
    toastTimer: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const elements = {
    loader: $("#pageLoader"),
    header: $(".site-header"),
    menuToggle: $("#menuToggle"),
    mainNav: $("#mainNav"),
    form: $("#plannerForm"),
    startLocation: $("#startLocation"),
    useLocation: $("#useLocation"),
    tripDate: $("#tripDate"),
    startTime: $("#startTime"),
    tripHours: $("#tripHours"),
    travelers: $("#travelers"),
    destinationSearch: $("#destinationSearch"),
    areaFilters: $("#areaFilters"),
    destinationGrid: $("#destinationGrid"),
    selectionCount: $("#selectionCount"),
    destinationError: $("#destinationError"),
    results: $("#results"),
    resultsTitle: $("#resultsTitle"),
    resultsSubtitle: $("#resultsSubtitle"),
    summaryGrid: $("#summaryGrid"),
    timeline: $("#timeline"),
    excludedStops: $("#excludedStops"),
    editPlan: $("#editPlan"),
    copyPlan: $("#copyPlan"),
    printPlan: $("#printPlan"),
    fitMap: $("#fitMap"),
    mapFallback: $("#mapFallback"),
    toast: $("#toast")
  };

  function init() {
    populateStartLocations();
    setMinimumDate();
    renderAreaFilters();
    renderDestinations();
    bindEvents();
    restoreSavedState();
    setupRevealObserver();
    $("#currentYear").textContent = new Date().getFullYear();

    window.addEventListener("load", () => {
      window.setTimeout(() => elements.loader.classList.add("is-hidden"), 350);
    });
  }

  function populateStartLocations() {
    elements.startLocation.innerHTML = data.startLocations
      .map((location) => `<option value="${location.id}">${location.name}</option>`)
      .join("");
  }

  function setMinimumDate() {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    elements.tripDate.min = localDate;
    elements.tripDate.value = localDate;
  }

  function renderAreaFilters() {
    elements.areaFilters.innerHTML = data.areaOrder
      .map((area) => `<button class="area-filter ${state.activeArea === area ? "active" : ""}" type="button" data-area="${area}">${area}</button>`)
      .join("");
  }

  function renderDestinations() {
    const query = elements.destinationSearch.value.trim().toLowerCase();
    const filtered = data.destinations.filter((destination) => {
      const matchesArea = state.activeArea === "All" || destination.area === state.activeArea;
      const haystack = `${destination.name} ${destination.area} ${destination.category} ${destination.tags.join(" ")}`.toLowerCase();
      return matchesArea && haystack.includes(query);
    });

    if (!filtered.length) {
      elements.destinationGrid.innerHTML = `<div class="destination-empty">No destinations match this search. Try another name or area.</div>`;
      return;
    }

    elements.destinationGrid.innerHTML = filtered.map((destination) => {
      const selected = state.selected.has(destination.id);
      return `
        <label class="destination-option ${selected ? "selected" : ""}" data-id="${destination.id}">
          <input type="checkbox" value="${destination.id}" ${selected ? "checked" : ""} />
          <span class="destination-icon">${destination.icon}</span>
          <span class="destination-name">${destination.name}</span>
          <span class="destination-meta">${destination.area} · ${formatDuration(destination.duration)}</span>
          <span class="destination-check">✓</span>
        </label>
      `;
    }).join("");
  }

  function bindEvents() {
    window.addEventListener("scroll", () => elements.header.classList.toggle("scrolled", window.scrollY > 10), { passive: true });

    elements.menuToggle.addEventListener("click", () => {
      const open = elements.mainNav.classList.toggle("open");
      elements.menuToggle.classList.toggle("open", open);
      elements.menuToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    $$("#mainNav a").forEach((link) => link.addEventListener("click", closeMenu));

    elements.areaFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-area]");
      if (!button) return;
      state.activeArea = button.dataset.area;
      renderAreaFilters();
      renderDestinations();
    });

    elements.destinationSearch.addEventListener("input", renderDestinations);

    elements.destinationGrid.addEventListener("change", (event) => {
      const checkbox = event.target.closest("input[type='checkbox']");
      if (!checkbox) return;
      toggleDestination(checkbox.value, checkbox.checked);
    });

    $$("input[name='preference']").forEach((radio) => {
      radio.addEventListener("change", () => {
        $$(".preference-card").forEach((card) => card.classList.toggle("active", card.contains($("input:checked", card))));
      });
    });

    elements.useLocation.addEventListener("click", useCurrentLocation);
    elements.form.addEventListener("submit", generateItinerary);
    elements.editPlan.addEventListener("click", () => document.querySelector("#planner").scrollIntoView({ behavior: "smooth" }));
    elements.copyPlan.addEventListener("click", copyItinerary);
    elements.printPlan.addEventListener("click", () => window.print());
    elements.fitMap.addEventListener("click", fitMapToRoute);

    $$(".cluster-button").forEach((button) => {
      button.addEventListener("click", () => addCluster(button.dataset.cluster));
    });

    window.addEventListener("beforeunload", saveFormState);
  }

  function closeMenu() {
    elements.mainNav.classList.remove("open");
    elements.menuToggle.classList.remove("open");
    elements.menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function toggleDestination(id, checked) {
    if (checked) state.selected.add(id);
    else state.selected.delete(id);

    elements.selectionCount.textContent = state.selected.size;
    elements.destinationError.textContent = "";
    renderDestinations();
    updateProgress();
    saveFormState();
  }

  function addCluster(area) {
    data.destinations.filter((destination) => destination.area === area).forEach((destination) => state.selected.add(destination.id));
    elements.selectionCount.textContent = state.selected.size;
    state.activeArea = area;
    renderAreaFilters();
    renderDestinations();
    updateProgress();
    showToast(`${area} destinations added to your planner.`);
    document.querySelector("#planner").scrollIntoView({ behavior: "smooth" });
  }

  function updateProgress() {
    const detailsComplete = Boolean(elements.startLocation.value && elements.startTime.value);
    const destinationsComplete = state.selected.size >= 2;
    const preferenceComplete = Boolean($("input[name='preference']:checked"));
    const statuses = [detailsComplete, destinationsComplete, preferenceComplete];
    $$('[data-progress]').forEach((item, index) => item.classList.toggle("active", statuses[index]));
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      showToast("Location access is not supported by this browser.");
      return;
    }

    elements.useLocation.disabled = true;
    elements.useLocation.textContent = "…";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.customStart = {
          id: "current-location",
          name: "My current location",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          area: "Custom"
        };

        let option = elements.startLocation.querySelector("option[value='current-location']");
        if (!option) {
          option = new Option("My current location", "current-location");
          elements.startLocation.prepend(option);
        }
        elements.startLocation.value = "current-location";
        elements.useLocation.textContent = "✓";
        elements.useLocation.disabled = false;
        showToast("Current location added as your starting point.");
      },
      () => {
        elements.useLocation.textContent = "⌖";
        elements.useLocation.disabled = false;
        showToast("We could not access your location. Choose a starting point instead.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }

  function generateItinerary(event) {
    event.preventDefault();

    if (!elements.form.checkValidity()) {
      elements.form.reportValidity();
      return;
    }

    if (state.selected.size < 2) {
      elements.destinationError.textContent = "Please select at least two destinations to build a useful route.";
      document.querySelector(".destination-toolbar").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const modes = $$('input[name="mode"]:checked').map((input) => input.value);
    if (!modes.length) {
      showToast("Choose at least one allowed travel mode.");
      return;
    }

    const start = getSelectedStart();
    const selectedDestinations = data.destinations.filter((destination) => state.selected.has(destination.id));
    const preference = $("input[name='preference']:checked").value;
    const availableMinutes = Number(elements.tripHours.value) * 60;
    const travelers = clamp(Number(elements.travelers.value), 1, 12);
    const fareSettings = getFareSettings();
    const optimized = optimizeRoute(start, selectedDestinations, preference);
    const built = buildTimedItinerary(start, optimized, {
      preference,
      availableMinutes,
      travelers,
      modes,
      fareSettings,
      startTime: elements.startTime.value
    });

    state.itinerary = { start, ...built, preference, travelers, fareSettings, date: elements.tripDate.value };
    renderResults(state.itinerary);
    saveFormState();

    elements.results.hidden = false;
    window.setTimeout(() => {
      elements.results.scrollIntoView({ behavior: "smooth", block: "start" });
      setupRevealObserver();
      renderMap(state.itinerary);
    }, 50);
  }

  function getSelectedStart() {
    if (elements.startLocation.value === "current-location" && state.customStart) return state.customStart;
    return data.startLocations.find((location) => location.id === elements.startLocation.value) || data.startLocations[0];
  }

  function getFareSettings() {
    return {
      jeepMinimum: nonNegativeNumber($("#jeepMinimum").value, 13),
      jeepBaseKm: nonNegativeNumber($("#jeepBaseKm").value, 4),
      jeepPerKm: nonNegativeNumber($("#jeepPerKm").value, 1.8),
      taxiFlag: nonNegativeNumber($("#taxiFlag").value, 50),
      taxiPerKm: nonNegativeNumber($("#taxiPerKm").value, 15)
    };
  }

  function optimizeRoute(start, destinations, preference) {
    const remaining = [...destinations];
    const route = [];
    let current = start;

    while (remaining.length) {
      let bestIndex = 0;
      let bestScore = Infinity;

      remaining.forEach((candidate, index) => {
        const distance = haversine(current, candidate);
        const sameAreaBonus = current.area === candidate.area ? -0.34 : 0;
        const popularityBonus = candidate.tags.includes("nearby pair") ? -0.08 : 0;
        const longVisitPenalty = preference === "fastest" ? candidate.duration / 900 : 0;
        const score = distance + sameAreaBonus + popularityBonus + longVisitPenalty;
        if (score < bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      });

      const [next] = remaining.splice(bestIndex, 1);
      route.push(next);
      current = next;
    }

    return improveRouteWithTwoOpt(start, route);
  }

  function improveRouteWithTwoOpt(start, route) {
    if (route.length < 4) return route;
    let improved = [...route];
    let changed = true;
    let passes = 0;

    while (changed && passes < 5) {
      changed = false;
      passes += 1;
      for (let i = 0; i < improved.length - 2; i += 1) {
        for (let j = i + 1; j < improved.length - 1; j += 1) {
          const candidate = [...improved.slice(0, i), ...improved.slice(i, j + 1).reverse(), ...improved.slice(j + 1)];
          if (routeDistance(start, candidate) + 0.01 < routeDistance(start, improved)) {
            improved = candidate;
            changed = true;
          }
        }
      }
    }
    return improved;
  }

  function routeDistance(start, route) {
    let distance = 0;
    let current = start;
    route.forEach((stop) => {
      distance += haversine(current, stop);
      current = stop;
    });
    return distance;
  }

  function buildTimedItinerary(start, route, options) {
    const startMinutes = timeToMinutes(options.startTime);
    const endLimit = startMinutes + options.availableMinutes;
    let cursor = startMinutes;
    let current = start;
    let totalDistance = 0;
    let totalFare = 0;
    let totalTravel = 0;
    const items = [];
    const excluded = [];

    for (const destination of route) {
      const distance = haversine(current, destination);
      const transport = chooseTransport(current, destination, distance, options);
      const projectedArrival = cursor + transport.minutes;
      const openMinutes = timeToMinutes(destination.open);
      const closeMinutes = timeToMinutes(destination.close);
      const waitMinutes = projectedArrival < openMinutes ? openMinutes - projectedArrival : 0;
      const visitStart = projectedArrival + waitMinutes;
      const visitEnd = visitStart + destination.duration;

      if (visitEnd > endLimit && items.length >= 1) {
        excluded.push(destination);
        continue;
      }

      const item = {
        index: items.length + 1,
        destination,
        from: current,
        distance,
        transport,
        depart: cursor,
        arrival: projectedArrival,
        waitMinutes,
        visitStart,
        visitEnd,
        mayBeClosed: visitStart > closeMinutes
      };

      items.push(item);
      cursor = visitEnd;
      current = destination;
      totalDistance += distance;
      totalFare += transport.fareTotal;
      totalTravel += transport.minutes + waitMinutes;
    }

    return { items, excluded, totalDistance, totalFare, totalTravel, startMinutes, endMinutes: cursor };
  }

  function chooseTransport(from, to, distance, options) {
    const allowed = options.modes;
    const preference = options.preference;
    const candidates = [];

    if (allowed.includes("walk")) {
      candidates.push({
        mode: "walk",
        label: "Walk",
        icon: "🚶",
        minutes: Math.max(4, Math.round(distance * 14 + 2)),
        fareTotal: 0,
        farePerPerson: 0,
        score: 0
      });
    }

    if (allowed.includes("jeepney")) {
      const individualFare = distance <= options.fareSettings.jeepBaseKm
        ? options.fareSettings.jeepMinimum
        : options.fareSettings.jeepMinimum + ((distance - options.fareSettings.jeepBaseKm) * options.fareSettings.jeepPerKm);
      candidates.push({
        mode: "jeepney",
        label: "Jeepney",
        icon: "🚌",
        minutes: Math.max(13, Math.round(distance * 7.2 + 9)),
        fareTotal: roundMoney(individualFare * options.travelers),
        farePerPerson: roundMoney(individualFare),
        score: 0
      });
    }

    if (allowed.includes("taxi")) {
      const taxiFare = options.fareSettings.taxiFlag + distance * options.fareSettings.taxiPerKm;
      candidates.push({
        mode: "taxi",
        label: "Taxi",
        icon: "🚕",
        minutes: Math.max(7, Math.round(distance * 5.1 + 5)),
        fareTotal: roundMoney(taxiFare),
        farePerPerson: roundMoney(taxiFare / options.travelers),
        score: 0
      });
    }

    candidates.forEach((candidate) => {
      const walkPenalty = candidate.mode === "walk" ? Math.max(0, distance - 0.75) * 18 : 0;
      const waitPenalty = candidate.mode === "jeepney" ? 7 : candidate.mode === "taxi" ? 2 : 0;
      const costPerPerson = candidate.farePerPerson;

      if (preference === "cheapest") {
        candidate.score = costPerPerson * 2.7 + candidate.minutes * 0.22 + walkPenalty * 0.3;
      } else if (preference === "fastest") {
        candidate.score = candidate.minutes * 2.5 + costPerPerson * 0.08 + waitPenalty;
      } else if (preference === "less-walking") {
        candidate.score = candidate.minutes + costPerPerson * 0.22 + (candidate.mode === "walk" ? 150 + distance * 25 : 0);
      } else {
        candidate.score = candidate.minutes * 1.15 + costPerPerson * 0.55 + walkPenalty + waitPenalty;
      }

      if (candidate.mode === "walk" && distance <= 0.45) candidate.score -= 45;
      if (candidate.mode === "jeepney" && distance < 0.65) candidate.score += 30;
      if (candidate.mode === "taxi" && distance < 0.8 && preference !== "less-walking") candidate.score += 22;
      if (candidate.mode === "jeepney" && from.area === to.area && distance < 1.2) candidate.score += 8;
    });

    const chosen = candidates.sort((a, b) => a.score - b.score)[0];
    chosen.instruction = buildInstruction(from, to, chosen.mode, distance);
    return chosen;
  }

  function buildInstruction(from, to, mode, distance) {
    if (mode === "walk") {
      if (distance < 0.5) return `${to.name} is close to ${from.name}. Follow the safest pedestrian route and use designated crossings.`;
      return `Walk toward ${to.name}. The route may include slopes or stairs, so allow breaks and follow pedestrian paths.`;
    }

    if (mode === "jeepney") {
      return `From ${from.name}, ask the nearest dispatcher for the jeepney serving ${to.name}. ${to.routeHint}`;
    }

    return `Take a metered taxi from ${from.name} to ${to.name}. Show the destination name and confirm the meter is running before departure.`;
  }

  function renderResults(itinerary) {
    const completedStops = itinerary.items.length;
    const preferenceLabels = { balanced: "Balanced", cheapest: "Cheapest", fastest: "Fastest", "less-walking": "Less walking" };
    const dateLabel = itinerary.date ? formatDate(itinerary.date) : "your selected date";

    elements.resultsTitle.textContent = completedStops ? `${completedStops}-stop Baguio itinerary` : "Your Baguio itinerary";
    elements.resultsSubtitle.textContent = `Starting at ${itinerary.start.name} on ${dateLabel} · ${preferenceLabels[itinerary.preference]} route`;

    const freeLabel = itinerary.totalFare === 0 ? "Free" : formatCurrency(itinerary.totalFare);
    elements.summaryGrid.innerHTML = [
      ["📍", "Included stops", String(completedStops)],
      ["🕒", "Trip window", `${minutesToTime(itinerary.startMinutes)}–${minutesToTime(itinerary.endMinutes)}`],
      ["🧭", "Approx. distance", `${itinerary.totalDistance.toFixed(1)} km`],
      ["💵", "Estimated transport", freeLabel]
    ].map(([icon, label, value]) => `<div class="summary-card"><span>${icon}</span><div><small>${label}</small><strong>${value}</strong></div></div>`).join("");

    elements.timeline.innerHTML = itinerary.items.map((item) => renderTimelineItem(item, itinerary.travelers)).join("");

    if (itinerary.excluded.length) {
      elements.excludedStops.hidden = false;
      elements.excludedStops.innerHTML = `
        <strong>${itinerary.excluded.length} selected ${itinerary.excluded.length === 1 ? "stop was" : "stops were"} left out of the time window.</strong>
        <p>Extend your available time or remove a longer stop to include them:</p>
        <ul>${itinerary.excluded.map((stop) => `<li>${stop.name}</li>`).join("")}</ul>
      `;
    } else {
      elements.excludedStops.hidden = true;
      elements.excludedStops.innerHTML = "";
    }
  }

  function renderTimelineItem(item, travelers) {
    const fareText = item.transport.fareTotal === 0
      ? "Free"
      : item.transport.mode === "taxi"
        ? `${formatCurrency(item.transport.fareTotal)} vehicle est.`
        : `${formatCurrency(item.transport.farePerPerson)} / person`;

    return `
      <article class="timeline-item">
        <div class="timeline-time">${minutesToTime(item.visitStart)}</div>
        <div class="timeline-marker">${item.index}</div>
        <div class="timeline-content">
          <div class="timeline-stop-head">
            <div><h4>${item.destination.icon} ${item.destination.name}</h4><small>${item.destination.area} · ${item.destination.category}</small></div>
            <span class="visit-duration">Visit ${formatDuration(item.destination.duration)}</span>
          </div>
          <p>${item.destination.description}</p>
          <div class="travel-leg">
            <div class="travel-leg-top">
              <span class="travel-mode">${item.transport.icon} ${item.transport.label} from ${item.from.name}</span>
              <div class="travel-metrics"><span>${item.distance.toFixed(1)} km</span><span>${item.transport.minutes} min est.</span><span>${fareText}</span></div>
            </div>
            <div class="travel-instruction">${item.transport.instruction}</div>
            ${item.waitMinutes ? `<span class="warning-chip">Arrive before opening · wait about ${item.waitMinutes} min</span>` : ""}
            ${item.mayBeClosed ? `<span class="warning-chip">This arrival may be after the listed closing time. Verify hours before visiting.</span>` : ""}
          </div>
        </div>
      </article>
    `;
  }

  function renderMap(itinerary) {
    if (!window.L) {
      elements.mapFallback.hidden = false;
      $("#routeMap").hidden = true;
      return;
    }

    elements.mapFallback.hidden = true;
    $("#routeMap").hidden = false;

    if (!state.map) {
      state.map = L.map("routeMap", { scrollWheelZoom: false }).setView([16.413, 120.598], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(state.map);
    }

    if (state.mapLayer) state.mapLayer.remove();
    state.mapLayer = L.layerGroup().addTo(state.map);

    const points = [itinerary.start, ...itinerary.items.map((item) => item.destination)];
    const latLngs = points.map((point) => [point.lat, point.lng]);

    points.forEach((point, index) => {
      const icon = L.divIcon({
        className: `map-number-icon ${index === 0 ? "start" : ""}`,
        html: index === 0 ? "S" : String(index),
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      L.marker([point.lat, point.lng], { icon })
        .bindPopup(`<strong>${index === 0 ? "Start: " : `${index}. `}${point.name}</strong>${point.area ? `<br>${point.area}` : ""}`)
        .addTo(state.mapLayer);
    });

    L.polyline(latLngs, { color: "#819A91", weight: 4, opacity: .9, dashArray: "9 9" }).addTo(state.mapLayer);
    fitMapToRoute();
    window.setTimeout(() => state.map.invalidateSize(), 120);
  }

  function fitMapToRoute() {
    if (!state.map || !state.itinerary) return;
    const points = [state.itinerary.start, ...state.itinerary.items.map((item) => item.destination)];
    if (!points.length) return;
    const bounds = L.latLngBounds(points.map((point) => [point.lat, point.lng]));
    state.map.fitBounds(bounds.pad(0.18), { maxZoom: 15 });
  }

  async function copyItinerary() {
    if (!state.itinerary) return;
    const text = itineraryToText(state.itinerary);
    try {
      await navigator.clipboard.writeText(text);
      showToast("Itinerary copied to your clipboard.");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      showToast("Itinerary copied to your clipboard.");
    }
  }

  function itineraryToText(itinerary) {
    const lines = [
      "LAKBAY BAGUIO — GENERATED ITINERARY",
      `Start: ${itinerary.start.name}`,
      `Date: ${itinerary.date ? formatDate(itinerary.date) : "Not specified"}`,
      `Estimated transport: ${formatCurrency(itinerary.totalFare)}`,
      "",
      ...itinerary.items.flatMap((item) => [
        `${item.index}. ${minutesToTime(item.visitStart)} — ${item.destination.name} (${formatDuration(item.destination.duration)})`,
        `   ${item.transport.label} from ${item.from.name} · ${item.distance.toFixed(1)} km · ${item.transport.minutes} min · ${item.transport.fareTotal ? formatCurrency(item.transport.fareTotal) : "Free"}`,
        `   ${item.transport.instruction}`,
        ""
      ]),
      "Planning estimates only. Verify routes, drop-off points, operating hours, and current fares locally."
    ];
    return lines.join("\n");
  }

  function saveFormState() {
    const payload = {
      selected: [...state.selected],
      startLocation: elements.startLocation.value,
      tripDate: elements.tripDate.value,
      startTime: elements.startTime.value,
      tripHours: elements.tripHours.value,
      travelers: elements.travelers.value,
      preference: $("input[name='preference']:checked")?.value || "balanced",
      modes: $$('input[name="mode"]:checked').map((input) => input.value),
      fares: getFareSettings()
    };
    localStorage.setItem("lakbayBaguioPlanner", JSON.stringify(payload));
  }

  function restoreSavedState() {
    let saved;
    try { saved = JSON.parse(localStorage.getItem("lakbayBaguioPlanner")); } catch { saved = null; }
    if (!saved) return;

    if (Array.isArray(saved.selected)) saved.selected.forEach((id) => state.selected.add(id));
    if (saved.startLocation && elements.startLocation.querySelector(`option[value="${saved.startLocation}"]`)) elements.startLocation.value = saved.startLocation;
    if (saved.tripDate && saved.tripDate >= elements.tripDate.min) elements.tripDate.value = saved.tripDate;
    if (saved.startTime) elements.startTime.value = saved.startTime;
    if (saved.tripHours) elements.tripHours.value = saved.tripHours;
    if (saved.travelers) elements.travelers.value = saved.travelers;

    if (saved.preference) {
      const preferenceInput = $(`input[name="preference"][value="${saved.preference}"]`);
      if (preferenceInput) preferenceInput.checked = true;
    }
    $$(".preference-card").forEach((card) => card.classList.toggle("active", Boolean($("input:checked", card))));

    if (Array.isArray(saved.modes)) {
      $$('input[name="mode"]').forEach((input) => { input.checked = saved.modes.includes(input.value); });
    }

    const fareMap = {
      jeepMinimum: "#jeepMinimum",
      jeepBaseKm: "#jeepBaseKm",
      jeepPerKm: "#jeepPerKm",
      taxiFlag: "#taxiFlag",
      taxiPerKm: "#taxiPerKm"
    };
    Object.entries(fareMap).forEach(([key, selector]) => {
      if (saved.fares && Number.isFinite(Number(saved.fares[key]))) $(selector).value = saved.fares[key];
    });

    elements.selectionCount.textContent = state.selected.size;
    renderDestinations();
    updateProgress();
  }

  function setupRevealObserver() {
    const targets = $$(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });

    targets.forEach((element) => observer.observe(element));
  }

  function showToast(message) {
    clearTimeout(state.toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("show");
    state.toastTimer = window.setTimeout(() => elements.toast.classList.remove("show"), 3200);
  }

  function haversine(a, b) {
    const radius = 6371;
    const dLat = degreesToRadians(b.lat - a.lat);
    const dLng = degreesToRadians(b.lng - a.lng);
    const lat1 = degreesToRadians(a.lat);
    const lat2 = degreesToRadians(b.lat);
    const value = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return radius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  }

  function degreesToRadians(value) { return value * Math.PI / 180; }
  function timeToMinutes(time) { const [hours, minutes] = time.split(":").map(Number); return hours * 60 + minutes; }
  function minutesToTime(total) {
    const normalized = ((Math.round(total) % 1440) + 1440) % 1440;
    const date = new Date(2000, 0, 1, Math.floor(normalized / 60), normalized % 60);
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
  }
  function formatDuration(minutes) { return minutes >= 60 ? `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ""}` : `${minutes}m`; }
  function formatCurrency(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "PHP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value); }
  function formatDate(value) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`)); }
  function roundMoney(value) { return Math.round(value * 100) / 100; }
  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function nonNegativeNumber(value, fallback) { const number = Number(value); return Number.isFinite(number) && number >= 0 ? number : fallback; }

  init();
})();
