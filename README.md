# Atmos Weather

A modern, responsive weather application that delivers real-time weather information and forecasts with a clean, intuitive interface. Built as a portfolio project demonstrating React development best practices, TypeScript proficiency, and thoughtful API integration.

🌐 **[Live Demo](https://atmos-weather-omega.vercel.app/)** — Deployed on Vercel

## Features

- **Real-time Weather Data** — Current conditions including temperature, humidity, wind speed, pressure, and visibility
- **Search by City** — Find weather information for any city worldwide
- **Hourly & Weekly Forecasts** — View upcoming weather trends with 3-hour intervals up to 5 days ahead
- **Responsive Design** — Seamless experience across mobile, tablet, and desktop devices
- **Dark Mode** — Toggle between light and dark themes for comfortable viewing
- **Loading & Error States** — Thoughtful user experience with skeleton loaders and clear error messages

## Technology Stack

### Core
- **React 19** — Modern UI library with latest features
- **TypeScript** — Type-safe development
- **Vite** — Fast build tool and development server
- **SWC** — High-performance JavaScript/TypeScript compiler

### Styling & UI
- **Tailwind CSS 4** — Utility-first CSS framework
- **daisyUI** — Component library for consistent design
- **Lucide React** — Clean, consistent icon set
- **Geist Mono Font** — Modern, professional typography
- **next-themes** — Seamless dark mode implementation

### API & Data
- **OpenWeatherMap API** — Current weather (`/data/2.5/weather`) and 5-day forecast (`/data/2.5/forecast`)

### Testing & Quality
- **Vitest** — Fast unit testing framework
- **ESLint** — Code quality and consistency
- **GitHub Actions** — Automated CI/CD pipeline

### Deployment
- **Vercel** — Production hosting with Analytics

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenWeatherMap API key (free tier) — [Get your key here](https://openweathermap.org/api)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jingjing-20/atmos-weather.git
cd atmos-weather
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to `.env`:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Run TypeScript checks and create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm test` | Run test suite with Vitest |

## Project Structure

```
src/
├── components/
│   ├── weather/         # Weather-specific components
│   ├── layout/          # Layout components (Header, Dashboard)
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── services/            # API integration and data fetching
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions
```

## Architecture Highlights

**Clean Separation of Concerns:**
- Components handle presentation and user interaction
- Custom hooks manage state and side effects
- Services encapsulate API logic
- TypeScript types ensure type safety throughout

**Data Flow:**
```
User Input → Component → Custom Hook → API Service → OpenWeatherMap → Response Processing → UI Update
```

## API Key Security Note

This project uses Vite's environment variable system with the `VITE_` prefix. While this keeps the API key out of the git repository (via `.gitignore`), the key is embedded in the client-side bundle at build time and is visible in browser network requests.

**This is an acceptable tradeoff for this portfolio project** because:
- OpenWeatherMap free tier is rate-limited (60 calls/min, 1M calls/month)
- No billing information is attached to the API key
- The key has no access to sensitive data or services

For production applications requiring stricter security, consider implementing a serverless proxy that keeps the API key server-side.

## Deployment

The application is deployed on Vercel with automatic deployments from the `main` branch.

**Important:** When deploying to Vercel, add the `VITE_OPENWEATHER_API_KEY` environment variable in your Vercel project settings:
1. Go to Project Settings → Environment Variables
2. Add `VITE_OPENWEATHER_API_KEY` with your API key
3. Enable for Production, Preview, and Development environments
4. Redeploy the project

## Continuous Integration

GitHub Actions automatically runs on every push and pull request:
- TypeScript type checking
- ESLint code quality checks
- Vitest test suite

## Features Roadmap

- [x] Current weather display
- [x] City search functionality
- [x] Detailed weather metrics
- [x] Hourly and weekly forecasts
- [x] Responsive design
- [x] Dark mode support
- [ ] Geolocation support (get weather for current location)
- [ ] Favorite locations
- [ ] Weather charts and visualizations
- [ ] Multi-city comparison

## Contributing

This is a portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Font by [Geist](https://vercel.com/font)
