import type { ForecastData } from '../../types/weather'

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
      <h2 id="weekly-forecast-heading" className="text-lg font-semibold text-slate-900">
        5-day outlook
      </h2>
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {days.map((day) => (
          <article key={day.date} className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0">
            <p className="w-12 text-sm font-medium text-slate-700">{formatDay(day.date)}</p>
            <img
              className="size-9"
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
            />
            <p className="min-w-0 flex-1 text-sm text-sky-700">{Math.round(day.maxRain * 100)}% rain</p>
            <div className="text-right text-sm tabular-nums text-slate-700">
              <span>{Math.round(day.min)}°</span>
              <span className="mx-2 inline-block h-1.5 w-12 rounded-full bg-gradient-to-r from-sky-300 to-orange-300 align-middle" />
              <span className="font-semibold text-slate-900">{Math.round(day.max)}°</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
