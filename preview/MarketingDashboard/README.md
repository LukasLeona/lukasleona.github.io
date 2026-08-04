# Signal Desk

Signal Desk is a responsive marketing dashboard for social-platform scale, age fit, posting windows, day/night audience patterns, current search trends, and open-web platform attention. Its compact command-center view covers Facebook, Instagram, X, TikTok, Threads, YouTube, and LinkedIn.

The Manila posting clock evaluates all seven platform activity models every second. Its color moves from quiet to warming, strong, and post now. Optional browser notifications can alert you when a peak modeled window begins while the dashboard is open.

The daily content planner lets you select a date, platform, content format, campaign topic, and one to four posts. It plots the selected day by hour, compares weekdays and platforms, and spaces multiple posts across distinct high-opportunity windows. The main recommendation always uses the exact peak hour shown in its activity chart.

`automation.html` is an interactive preview of the assisted publishing workflow. It accepts local image or video previews and a caption, builds a multi-platform draft queue, and exports that queue as CSV. Social-account connections and automatic publishing are clearly marked as in development; the preview never uploads or publishes content.

## Run it

Python 3.10 or newer is recommended. No packages or API keys are required.

```powershell
python server.py
```

The dashboard opens at `http://127.0.0.1:8000`. Press `Ctrl+C` in the terminal to stop it.

You can also open `index.html` directly. The planning tools will work, but the live Google Trends and Wikimedia sections require the Python server.

## Data notes

- Platform totals are the latest public disclosures located for each network. Their definitions and dates are intentionally shown because MAU, daily visitors, and combined reach are not equivalent.
- Age adoption is a U.S. benchmark from Pew Research Center's 2025 adult survey.
- Recommended posting windows begin with published timing research and are shaped by the selected audience, content format, date, and timezone. The main recommendation time is the exact peak shown in the activity chart.
- Google Trends RSS and Wikimedia page views are live public signals. They are not private traffic from inside the social apps.
