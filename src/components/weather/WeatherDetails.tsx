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
import { cn, SECTION_HEADING, SURFACE, TEXT } from '../../lib/utils'

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
      <h2 id="weather-details-heading" className={SECTION_HEADING}>
        Weather details
      </h2>
      <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className={cn(SURFACE, 'hover-card p-4')}>
            <Icon className="size-5" aria-hidden="true" />
            <dt className={cn('mt-3 text-sm', TEXT, 'opacity-70')}>{label}</dt>
            <dd className={cn('mt-1 text-lg font-semibold tracking-tight', TEXT)}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
