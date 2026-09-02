import type { ForecastData } from '../../types/weather'

interface HourlyForecastProps {
  forecast: ForecastData
}

function formatTime(timestamp: number, timezoneOffset: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    timeZone: 'UTC',
  }).format(new Date((timestamp + timezoneOffset) * 1_000))
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  return (
    <section aria-labelledby="hourly-forecast-heading">
      <h2 id="hourly-forecast-heading" className="text-lg font-semibold text-slate-900">
        Hourly forecast
      </h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {forecast.entries.slice(0, 8).map((entry) => (
          <article
            key={entry.timestamp}
            className="min-w-24 rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm"
          >
            <p className="text-sm font-medium text-slate-600">
              {formatTime(entry.timestamp, forecast.timezoneOffset)}
            </p>
            <img
              className="mx-auto my-1 size-12"
              src={`https://openweathermap.org/img/wn/${entry.condition.icon}.png`}
              alt={entry.condition.description}
            />
            <p className="text-lg font-semibold text-slate-900">{Math.round(entry.temp)}°</p>
            <p className="mt-1 text-xs text-sky-700">{Math.round(entry.precipitationProbability * 100)}% rain</p>
          </article>
        ))}
      </div>
    </section>
  )
}
