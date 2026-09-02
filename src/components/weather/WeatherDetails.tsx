import {
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
  type LucideIcon,
} from 'lucide-react'
import type { WeatherData } from '../../types/weather'

interface WeatherDetailsProps {
  weather: WeatherData
}

interface Detail {
  label: string
  value: string
  icon: LucideIcon
}

function formatTime(timestamp: number, timezoneOffset: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(new Date((timestamp + timezoneOffset) * 1_000))
}

function formatVisibility(visibility: number): string {
  const kilometers = visibility / 1_000
  return `${Number.isInteger(kilometers) ? kilometers : kilometers.toFixed(1)} km`
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const details: Detail[] = [
    { label: 'Feels like', value: `${Math.round(weather.feelsLike)}°C`, icon: Thermometer },
    { label: 'Humidity', value: `${weather.humidity}%`, icon: Droplets },
    { label: 'Wind', value: `${weather.windSpeed} m/s`, icon: Wind },
    { label: 'Pressure', value: `${weather.pressure} hPa`, icon: Gauge },
    { label: 'Visibility', value: formatVisibility(weather.visibility), icon: Eye },
    { label: 'Sunrise', value: formatTime(weather.sunrise, weather.timezoneOffset), icon: Sunrise },
    { label: 'Sunset', value: formatTime(weather.sunset, weather.timezoneOffset), icon: Sunset },
  ]

  return (
    <section aria-labelledby="weather-details-heading">
      <h2 id="weather-details-heading" className="text-lg font-semibold text-slate-900">
        Weather details
      </h2>
      <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Icon className="size-5 text-sky-600" aria-hidden="true" />
            <dt className="mt-3 text-sm text-slate-500">{label}</dt>
            <dd className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
