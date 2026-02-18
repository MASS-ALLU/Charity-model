# Charity-model 
# Charity-model

A simple, modern **single-page charity donation demo** (static HTML/CSS/JS). It includes:

- A responsive landing page + impact counters
- A donation form (card/UPI UI toggle)
- Instant PDF receipt generation (client-side via `jsPDF`)
- A lightweight “member dashboard” that stores donation history in `localStorage`
- Dark mode toggle (saved in your browser)
- Preset donation amount chips + one-time/monthly demo toggle
- “Where your money goes” breakdown bar

> Note: This is a **demo UI**. It does not process real payments.

## Run locally

Because it’s a static site, you can open `index.html` directly in a browser, but a local server is recommended.

### Option A: Python (most Linux systems)

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option B: Node (if you already use it)

```bash
npx serve .
```

## Customize

Open `index.html` and edit:

- **Site name**: update the header text “The Elite Global Humanity Foundation”
- **UPI ID**: change `UPI_ID` in the script section
- **Impact counters**: adjust the `target` numbers inside `setupCounters()`
- **Money breakdown**: update the percentages in the “Where your money goes” section (and matching bar widths if you change them)
- **Gallery images**: replace `assets/story-*.svg` with real authorized photos (see `assets/README.md`)

## Project structure

- `index.html`: the whole app (styles + scripts are inline)
- `README.md`: this file
