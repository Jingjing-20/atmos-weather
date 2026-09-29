import type { ForecastData } from '../../types/weather'
import { cn, SECTION_HEADING, SURFACE, TEXT } from '../../lib/utils'

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
      <h2 id="hourly-forecast-heading" className={SECTION_HEADING}>
        Hourly forecast
      </h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {forecast.entries.slice(0, 8).map((entry) => (
          <article
            key={entry.timestamp}
            className={cn(SURFACE, 'hover-badge min-w-24 px-3 py-4 text-center')}
          >
            <p className={cn('text-sm font-medium', TEXT, 'opacity-70')}>
              {formatTime(entry.timestamp, forecast.timezoneOffset)}
            </p>
            <img
              className="mx-auto my-1 size-12"
              src={`https://openweathermap.org/img/wn/${entry.condition.icon}.png`}
              alt={entry.condition.description}
            />
            <p className={cn('text-lg font-semibold', TEXT)}>{Math.round(entry.temp)}°</p>
            <p className={cn('mt-1 text-xs', TEXT, 'opacity-70')}>
              {Math.round(entry.precipitationProbability * 100)}% rain
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
