# Atmos Weather

A modern, responsive weather app built with React, TypeScript, and Vite. It uses the OpenWeatherMap current weather and 5-day/3-hour forecast APIs.

**Live:** deployed on [Vercel](https://github.com/Jingjing-20/atmos-weather)

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Lucide icons
- OpenWeatherMap API (`/data/2.5/weather` and `/data/2.5/forecast`)
- Vercel (hosting + Analytics)
- GitHub Actions CI

## Setup

```bash
npm install
cp .env.example .env
```

Put your OpenWeatherMap API key in `.env`:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

```bash
npm run dev
```

## API key (what `.env` does and does not hide)

`VITE_` variables are inlined into the client bundle at build time. Keeping the key out of git hides it from the **repository**, not from anyone who opens the live site (network tab or bundled JS).

That is an acceptable tradeoff for this portfolio app: a free-tier, rate-limited weather key with no billing attached. Tighter secrecy would mean a small serverless proxy that holds the key on the server — `.gitignore` alone cannot provide that.

Production also needs the same variable in the Vercel project settings. The local `.env` file is gitignored and is not deployed.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Typecheck and production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest (single run) |
