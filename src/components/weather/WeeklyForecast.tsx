import type { ForecastData } from '../../types/weather'
import { CHROME, cn, SECTION_HEADING, SURFACE, TEXT } from '../../lib/utils'

interface WeeklyForecastProps {
  forecast: ForecastData
}

interface DailyForecast {
  date: string
  min: number
  max: number
  maxRain: number
  icon: string
  description: string
}

function getDayKey(timestamp: number, timezoneOffset: number): string {
  return new Date((timestamp + timezoneOffset) * 1_000).toISOString().slice(0, 10)
}

function formatDay(date: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`))
}

function groupByDay(forecast: ForecastData): DailyForecast[] {
  const days = new Map<string, DailyForecast>()

  for (const entry of forecast.entries) {
    const date = getDayKey(entry.timestamp, forecast.timezoneOffset)
    const day = days.get(date)

    if (day) {
      day.min = Math.min(day.min, entry.tempMin)
      day.max = Math.max(day.max, entry.tempMax)
      day.maxRain = Math.max(day.maxRain, entry.precipitationProbability)
      continue
    }

    days.set(date, {
      date,
      min: entry.tempMin,
      max: entry.tempMax,
      maxRain: entry.precipitationProbability,
      icon: entry.condition.icon,
      description: entry.condition.description,
    })
  }

  return [...days.values()].slice(0, 5)
}

export function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  const days = groupByDay(forecast)

  return (
    <section aria-labelledby="weekly-forecast-heading">
      <h2 id="weekly-forecast-heading" className={SECTION_HEADING}>
        5-day outlook
      </h2>
      <div className={cn(SURFACE, 'mt-3 overflow-hidden')}>
        {days.map((day) => (
          <article
            key={day.date}
            className={cn(
              'hover-list-item flex items-center gap-3 border-b px-4 py-3 last:border-b-0',
              CHROME,
              'border-x-0 border-t-0',
            )}
          >
            <p className={cn('w-12 text-sm font-medium', TEXT)}>{formatDay(day.date)}</p>
            <img
              className="size-9"
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
            />
            <p className={cn('min-w-0 flex-1 text-sm', TEXT, 'opacity-70')}>
              {Math.round(day.maxRain * 100)}% rain
            </p>
            <div className={cn('text-right text-sm tabular-nums', TEXT)}>
              <span className="opacity-70">{Math.round(day.min)}°</span>
              <span className="mx-2 inline-block h-1.5 w-12 rounded-full bg-base-content/20 align-middle" />
              <span className="font-semibold">{Math.round(day.max)}°</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
