# Atmos Weather — Project Development Context

## Project Overview
Build **Atmos Weather**, a modern, responsive, portfolio-quality weather application. The goal is to demonstrate React, TypeScript, API integration, clean architecture, responsive UI/UX, loading/error states, and professional Git practices.

## Project Identity
- **Project name:** Atmos Weather
- **Folder:** `atmos-weather`
- **Repository:** Public / open source
- **GitHub:** https://github.com/Jingjing-20/atmos-weather

## Current Status
Completed:
- [x] Created Vite project
- [x] React + TypeScript + SWC selected
- [x] Initial dependencies installed
- [x] Git repository configured
- [x] Public GitHub repository created
- [x] Initial project files pushed to `main`
- [x] Deployed to Vercel
- [x] Vercel Analytics enabled

Outstanding — blocks live weather data:
- [ ] **`VITE_OPENWEATHER_API_KEY` is not yet set in Vercel's Environment Variables.** The app is live but weather requests will fail in production until this is added (see **Deploying the API Key to Vercel** below). Local `.env` may already have it — Vercel does not read the local `.env` file, it needs its own copy.

Do not repeat `git init` or `git remote add origin` unless changing Git configuration.
Do not repeat `vercel` project setup or re-enable Analytics — both are already done.

---

# Technology Stack

## Core
- React
- Vite
- TypeScript
- SWC
- ESLint

## UI
- Tailwind CSS
- shadcn/ui
- Lucide React

## Data
- OpenWeatherMap API — see **API Configuration** below for which endpoint tier to use and why this matters before Phase 6.

## State Management
Start with React `useState`. Use Context API or Zustand only when global state is genuinely needed.

## Testing
- Vitest + React Testing Library for hooks and services (the layers with real logic).
- Manual test checklist per phase (see roadmap) still applies on top of this — automated tests do not replace manual verification of UI states.

## Optional Later
- Recharts for visualizations
- React Leaflet for maps

## Deployment
- Vercel
- GitHub Actions for CI (see **Continuous Integration** below)

---

# API Configuration

## Which OpenWeatherMap product to use — decide this before Phase 6

OpenWeatherMap now has two distinct product families with different billing behavior. Confirm which one the app actually uses before writing forecast code, not after:

1. **Classic Free Weather API access** — current weather (`/data/2.5/weather`) and the 5-day/3-hour forecast (`/data/2.5/forecast`). No credit card required, 60 calls/min, 1,000,000 calls/month. This is what Phases 1–5 use, and it is sufficient for a simple daily/hourly-style forecast UI.
2. **One Call API (3.0 / 4.0)** — richer minutely/hourly/daily forecast data, but it is a separate subscription product. The first 1,000 calls/day are free, but it requires a card on file for overage billing.

**Default decision for this project:** use the classic `/data/2.5/forecast` endpoint for Phase 6 (hourly/daily forecast) to avoid requiring billing setup. Only move to One Call if a specific feature (e.g. minute-by-minute precipitation, long-range forecast) genuinely needs it — and if so, set a hard daily call cap in the OpenWeatherMap billing dashboard first.

## Current Weather API

Base endpoint:

```text
https://api.openweathermap.org/data/2.5/weather
```

Request format:

```text
https://api.openweathermap.org/data/2.5/weather?q={CITY}&units=metric&appid={API_KEY}
```

Initial test city:

```text
Valladolid
```

Use `units=metric` for Celsius.

## Forecast API (Phase 6)

Base endpoint:

```text
https://api.openweathermap.org/data/2.5/forecast
```

Same query pattern as current weather. Returns 3-hour interval data for 5 days — aggregate client-side for a "daily" view.

## API Key Setup

The project owner has supplied the actual API key separately.

Create a local `.env` file:

```env
VITE_OPENWEATHER_API_KEY=PASTE_THE_PROVIDED_API_KEY_HERE
```

The development agent may configure the local `.env` using the API key supplied separately by the project owner.

### Critical Security Rule — and its actual scope

Never:
- Hardcode the API key in source code
- Commit `.env`
- Push the API key to GitHub
- Put the API key in README files or public documentation

Ensure `.gitignore` contains:

```gitignore
.env
.env.local
.env.*.local
```

Create a commit-safe `.env.example`:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

The actual `.env` remains local and untracked.

Access the key with:

```ts
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

**Be honest about what this actually protects.** `VITE_`-prefixed variables are inlined into the client bundle at build time. That means the key is hidden from the **git repository**, but once deployed it is visible in the browser's network tab and bundled JS to anyone who looks — `.env` hygiene does not hide it from end users of the live site.

For this project (a free-tier, rate-limited weather key with no billing risk), that exposure is an acceptable, common tradeoff for a portfolio app and does not need to be re-litigated per feature. If tighter secrecy is ever wanted, the fix is a small Vercel serverless function that holds the key server-side and proxies requests — not something `.env` alone can provide. Note this tradeoff once in the README; do not treat "never expose secrets" as satisfied by `.gitignore` alone.

## Deploying the API Key to Vercel

The local `.env` file is not deployed with the project — Vercel builds from the GitHub repo, and `.env` is gitignored on purpose. The key must be added separately in Vercel's own environment variable settings before production requests will work.

Steps:

1. Go to the project in the Vercel dashboard → **Settings → Environment Variables**.
2. Add a new variable:
   - **Key:** `VITE_OPENWEATHER_API_KEY`
   - **Value:** the same OpenWeatherMap key used locally
   - **Environments:** check Production, Preview, and Development (so preview deploys from PRs also work)
3. Save, then **redeploy** — Vercel does not retroactively inject the variable into an already-built deployment. Trigger a redeploy from the dashboard, or push a new commit.
4. Verify by opening the live URL and searching a city — if the key is missing or wrong, this should surface as a handled error state, not a blank screen or console-only failure (see error-state test cases in Phase 2).
5. Never paste the key into a commit, PR description, GitHub issue, or the README — the Vercel dashboard is the only place it should live outside the local `.env`.

Once done, check off the outstanding item in **Current Status** above.

---

# Engineering Development Loop

One canonical loop — use this exact sequence for every feature, do not substitute the shorter version below it:

```text
ANALYZE
↓
PLAN
↓
IMPLEMENT
↓
TEST
↓
REVIEW
↓
IMPROVE
↓
CONFIRM COMPLETE
↓
COMMIT & PUSH
↓
NEXT FEATURE
```

Implement one logical feature at a time. Do not build everything at once.

---

# Engineering Rules

1. Do not overengineer.
2. Do not add dependencies without a clear reason.
3. Do not rewrite unrelated files.
4. Preserve clean architecture.
5. Implement one feature at a time.
6. Test before moving forward.
7. Fix root causes instead of superficial patches.
8. Prefer simple and maintainable code.
9. Reuse components appropriately.
10. Include mobile responsiveness.
11. Include loading states.
12. Include error states.
13. Remove unused imports and code.
14. Avoid unnecessary abstractions.
15. Use TypeScript properly.
16. Avoid `any` where practical.
17. Do not prematurely optimize.
18. Never expose secrets in the git repository, and disclose in the README when a secret is client-exposed by design (see API Configuration).
19. Avoid duplicate API requests: debounce search input (300–500ms) and cache the last response per city for a few minutes before re-fetching.
20. Follow the **Agent Continuity Protocol** below whenever context or usage limits are approaching.

---

# Agent Continuity Protocol (Credit / Context Safety Mechanism)

Any agent (human or AI) working on this project may run out of available context, tokens, or usage credits mid-task. To prevent lost work, silent handoffs, or repeated/duplicated work by the next agent, follow this protocol.

## When to trigger it

Trigger this protocol proactively — before being cut off, not after — when any of these are true:
- You estimate you are close to a context, token, or usage-credit limit and may not be able to finish the current feature.
- You are about to attempt a large, multi-step change and are unsure you can complete and verify it in the remaining budget.
- You are explicitly asked to stop, pause, or hand off.

Do not wait until the last possible moment. If in doubt, checkpoint early — a slightly early handoff costs little; a missed one costs a corrupted or half-finished feature.

## What to do

1. **Stop at a safe boundary.** Finish the smallest coherent unit of work in progress (e.g. finish the current function/component edit) rather than stopping mid-edit. If the current change is not in a runnable state, revert it rather than leave broken code committed.
2. **Create a handoff file** at the project root named:

   ```text
   HANDOFF_<YYYY-MM-DD>_<HHhMM>.md
   ```

   (e.g. `HANDOFF_2026-09-01_14h30.md`). Never overwrite a previous handoff file — each one is a dated checkpoint. If one already exists from earlier the same session, create a new one rather than editing it.

3. **Populate the handoff file** using this exact structure:

   ```markdown
   # Handoff Summary — Atmos Weather

   ## Session info
   - Date/time: <ISO timestamp>
   - Reason for handoff: <context limit / credit limit / explicit pause / other>

   ## Current roadmap phase
   - Phase: <e.g. Phase 6 — Forecast>
   - Feature in progress: <e.g. "Hourly forecast component">

   ## What was completed this session
   - <bullet list of finished, tested, committed work>
   - Last commit hash / message: <hash> "<message>"

   ## What is in progress (not yet complete)
   - <exact file(s) being edited>
   - <what part of the feature works vs. does not yet work>
   - <any code left in a broken/uncommitted state — flag clearly, or confirm "working tree is clean, nothing uncommitted">

   ## Where to continue
   - Next concrete step: <specific, actionable — e.g. "add loading skeleton to HourlyForecast.tsx, then wire useWeather.ts to call getForecast()">
   - Files relevant to the next step: <list>

   ## Known issues / blockers
   - <anything discovered but not fixed — API quirks, failing tests, unresolved TypeScript errors>

   ## Anything the next agent should NOT redo
   - <e.g. ".env and .gitignore already configured — do not recreate", "API service already handles invalid city — do not rewrite">
   ```

4. **Commit the handoff file** (it is safe to commit — it contains no secrets) with a commit message: `docs: session handoff checkpoint`.
5. **State clearly to the project owner**, in your final message of the session, that a handoff file was created and its filename.

## What the next agent must do at the start of a new session

1. Check the project root for any `HANDOFF_*.md` files before doing anything else.
2. If one or more exist, read the **most recent** one fully before writing or editing any code.
3. Confirm current repo state (`git status`, `git log -1`) matches what the handoff file claims before continuing, since drift can happen between sessions.
4. Continue from the "Where to continue" section — do not restart the feature from scratch, and do not redo anything listed under "Anything the next agent should NOT redo."
5. Once the feature named in the handoff file is completed, tested, reviewed, and committed, it is fine to leave the old handoff file in place as a historical record, or move it into a `/handoffs` folder to keep the root clean — do not delete project history casually.

---

# Recommended Architecture

```text
src/
├── components/
│   ├── weather/
│   │   ├── CurrentWeather.tsx
│   │   ├── WeatherDetails.tsx
│   │   ├── HourlyForecast.tsx
│   │   └── WeeklyForecast.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Dashboard.tsx
│   └── ui/
│       ├── SearchBar.tsx
│       ├── LoadingSkeleton.tsx
│       └── ErrorMessage.tsx
├── hooks/
│   └── useWeather.ts
├── services/
│   └── weatherApi.ts
├── types/
│   └── weather.ts
├── utils/
│   ├── formatDate.ts
│   └── weatherHelpers.ts
├── App.tsx
└── main.tsx
```

Create files progressively. Do not create unused abstractions early.

Data flow:

```text
Component
    ↓
Custom Hook
    ↓
API Service
    ↓
OpenWeatherMap API
```

### Responsibilities

**Components**
- Display data
- Handle user interactions
- Present UI

**Hooks**
- Manage weather state
- Manage loading/error states
- Coordinate fetching

**Services**
- API requests
- URLs and query parameters
- Response handling

**Types**
- API response interfaces
- Shared application types

---

# TypeScript Guidelines

Avoid `any`.

Create types for fields actually used by the application.

Example:

```ts
interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
}
```

Do not type unnecessary API fields unless required.

---

# Git Workflow

The repository is already connected to GitHub.

For each stable feature:

```text
Check Status
↓
Create/switch feature branch
↓
Implement
↓
Test
↓
Review
↓
Stage
↓
Commit
↓
Push branch
↓
Open PR and self-merge to main
```

Typical workflow:

```bash
git status
git checkout -b feat/city-search
git add .
git commit -m "feat: add city weather search"
git push origin feat/city-search
# open PR on GitHub, review diff, merge to main
```

Using feature branches + PRs (even when self-merging) is a stronger signal of professional practice in a portfolio repo than committing straight to `main`, and it gives CI (below) a place to run before merge.

Recommended commits:

```text
chore: configure project foundation
feat: add weather API integration
feat: add current weather display
feat: add city weather search
feat: add detailed weather metrics
feat: add weather forecast
feat: add current location weather
fix: handle invalid city search
fix: improve API error handling
refactor: separate weather API service
style: improve responsive weather dashboard
docs: update project documentation
docs: session handoff checkpoint
```

Before every commit:
- Check `.env` is not staged
- Remove API keys
- Remove debugging code
- Remove unused imports
- Check for console errors
- Verify functionality

---

# Continuous Integration

Add a minimal GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every push and PR:

```yaml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx eslint .
      - run: npx vitest run
```

This catches type errors, lint issues, and test failures before Vercel even attempts a build. Add this once, during Phase 1, not later.

---

# Development Roadmap

## Phase 1 — Project Foundation

- [ ] Verify Vite + React + TypeScript + SWC
- [ ] Install/configure Tailwind CSS
- [ ] Configure shadcn/ui if needed
- [ ] Install Lucide React
- [ ] Create local `.env`
- [ ] Create `.env.example`
- [ ] Verify `.gitignore`
- [ ] Add CI workflow (`.github/workflows/ci.yml`)
- [ ] Remove unnecessary Vite boilerplate
- [ ] Create clean base layout

Then review, test, and commit.

Suggested commit:

```text
chore: configure project foundation
```

## Phase 2 — API Integration

- [ ] Create `weatherApi.ts`
- [ ] Load API key from environment variables
- [ ] Fetch weather by city
- [ ] Use metric units
- [ ] Test Valladolid
- [ ] Handle failed responses
- [ ] Create TypeScript types

Test:
- Valid city
- Invalid city
- Missing API key
- Network failure
- Unexpected response

Suggested commit:

```text
feat: add weather API integration
```

## Phase 3 — Current Weather

Display:
- City name
- Country
- Current temperature
- Weather condition
- Weather icon
- Feels-like temperature

Include loading and error states.

Suggested commit:

```text
feat: add current weather display
```

## Phase 4 — City Search

Features:
- Search input
- Search button
- Enter key support
- Validation
- Invalid city handling
- Debounced input (300–500ms) and short-lived per-city cache to prevent duplicate requests

Prevent empty searches and unnecessary duplicate requests.

Suggested commit:

```text
feat: add city weather search
```

## Phase 5 — Weather Details

Add:
- Humidity
- Wind speed
- Pressure
- Visibility
- Feels-like temperature
- Sunrise
- Sunset

Suggested commit:

```text
feat: add detailed weather metrics
```

## Phase 6 — Forecast

Before starting: confirm the endpoint decision in **API Configuration** (default: `/data/2.5/forecast`, not One Call).

After the MVP is stable, add:
- Hourly forecast (aggregated from 3-hour interval data)
- Daily/weekly forecast
- Temperature trends
- Rain probability

Keep forecast logic separate from current weather logic.

## Phase 7 — Geolocation

Flow:

```text
User clicks location button
↓
Request permission
↓
Get coordinates
↓
Fetch weather
↓
Display data
```

Handle permission denial, unavailable location, timeout, and API failures.

## Phase 8 — UI Polish

Improve:
- Mobile responsiveness
- Tablet layout
- Desktop layout
- Typography
- Spacing
- Dark mode
- Skeleton loading
- Empty/error states
- Smooth transitions

## Phase 9 — Advanced Features

Only after MVP stability:
- Favorite locations
- Dynamic weather backgrounds
- Clothing/weather recommendations
- Charts with Recharts
- City comparison
- Interactive maps

---

# Responsive Design

Use mobile-first development.

Test:

```text
Mobile
↓
Tablet
↓
Desktop
```

Consider touch targets, text readability, overflow, card stacking, and responsive spacing.

---

# Accessibility

Ensure:
- Accessible button labels
- Associated input labels
- Keyboard navigation
- Clear focus states
- Good contrast
- Color is not the only indicator

---

# Performance

Avoid:
- Duplicate API requests
- Unnecessary dependencies
- Unnecessary state updates
- Premature memoization
- Premature optimization

Priority:

```text
Correctness
↓
Maintainability
↓
User Experience
↓
Performance Optimization
```

---

# Definition of Done

A feature is complete when:

- [ ] Functionality works
- [ ] Loading state exists
- [ ] Error state exists
- [ ] Mobile works
- [ ] Desktop works
- [ ] TypeScript checks pass
- [ ] ESLint issues are addressed
- [ ] Automated tests pass (where applicable — hooks/services)
- [ ] No obvious console errors
- [ ] Unused code is removed
- [ ] Code is reviewed
- [ ] Changes are committed and pushed via PR
- [ ] CI passes on the PR

---

# AI Development Instructions

When assisting with this project:

1. Analyze before modifying code.
2. State a concise plan.
3. Implement one feature at a time.
4. Do not modify unrelated files.
5. Preserve existing architecture.
6. Prefer simple solutions.
7. Use TypeScript correctly.
8. Avoid `any`.
9. Add dependencies only when justified.
10. Include loading and error handling.
11. Test before proceeding.
12. Review after implementation.
13. Fix root causes.
14. Keep the public repository free of secrets in git history; disclose client-side key exposure in the README instead of treating it as solved.
15. Never commit the actual API key.
16. After stable work, suggest a meaningful commit message.
17. Check for a `HANDOFF_*.md` file at the start of every session before doing anything else.
18. Follow the **Agent Continuity Protocol** proactively if running low on context or usage credits — checkpoint early rather than risk an unexplained mid-feature stop.

---

# Final Goal

Atmos Weather should feel like a polished portfolio project rather than a basic tutorial.

Priority:

```text
Quality > Quantity of Features

Clean Architecture > Unnecessary Complexity

User Experience > Fancy Effects

Working Features > Premature Optimization

Maintainability > Clever Code
```

Follow the engineering loop for every feature. Follow the Agent Continuity Protocol whenever a session may end before a feature is finished.