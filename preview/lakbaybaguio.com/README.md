# Lakbay Baguio — Single-Page Itinerary Planner

A responsive, no-build-step tourism website that lets visitors choose Baguio destinations and generate a practical day itinerary with:

- automatic nearby-stop ordering;
- estimated travel time and distance;
- walking, jeepney, and taxi recommendations;
- editable fare assumptions;
- visit-duration and opening-hour awareness;
- time-window filtering when too many stops are selected;
- interactive OpenStreetMap route display;
- copy and print actions;
- browser-based saving through localStorage;
- mobile, tablet, and desktop layouts.

## Run the project

### Easiest method

Open `index.html` in a modern browser.

### Recommended method

Some browsers restrict geolocation and external map resources when a file is opened directly. Run a small local server instead:

```bash
# Python 3
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

In VS Code, you can also use the **Live Server** extension and click **Go Live**.

## Project files

```text
lakbay-baguio/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── img/
    │   ├── favicon.svg
    │   └── logo.svg
    └── js/
        ├── app.js
        └── data.js
```

## Update destinations

Edit `assets/js/data.js`.

Each destination contains:

- name and area;
- latitude and longitude;
- suggested visit duration;
- indicative opening and closing time;
- description;
- route hint;
- category and tags.

## Update fare assumptions

The user can edit fare assumptions directly in the planner. Default values are also set in:

- `index.html` — visible input defaults;
- `assets/js/app.js` — fallback values.

The website treats all transportation amounts as planning estimates. Before public launch, verify fares, terminals, drop-off points, operating schedules, and route availability with:

- Baguio City EGOV-TMS / Alternate Routes portal;
- Baguio VISITA and City Tourism Office;
- LTFRB-CAR advisories;
- jeepney associations, terminal dispatchers, and actual field testing.

## External resources

The page uses internet-hosted resources for:

- Poppins via Google Fonts;
- Leaflet JS/CSS;
- OpenStreetMap map tiles.

The planner and itinerary logic still run without the map, but fonts may fall back and the map panel may not display while offline.

## Important product limitation

This is a functional front-end MVP, not a live public-transit navigation engine. It estimates point-to-point distance using coordinates and chooses a travel mode using local heuristics. A production version should add verified route geometries, terminal locations, live road conditions, a backend database, admin review, and regular fare validation.
