import { Droplets, Thermometer, Wind, Gauge, ArrowDown, ArrowUp } from 'lucide-react'
import type { WeatherData } from '../../types/weather'
import { CHROME, cn, TEXT } from '../../lib/utils'

interface CurrentWeatherProps {
  weather: WeatherData
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <section
      className={cn('flex min-h-full flex-col overflow-hidden rounded-xl bg-gradient-card p-6 shadow-xl sm:p-8', CHROME)}
      aria-labelledby="current-weather-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={cn('text-sm font-medium', TEXT, 'opacity-70')}>Current weather</p>
          <h2 id="current-weather-heading" className={cn('mt-1 text-2xl font-bold tracking-tight sm:text-3xl', TEXT)}>
            {weather.name}, {weather.country}
          </h2>
        </div>
        <img
          className="-my-3 size-28 shrink-0 sm:size-36"
          src={`https://openweathermap.org/img/wn/${weather.condition.icon}@4x.png`}
          alt={weather.condition.description}
        />
      </div>

      <div className="mt-6 flex items-end gap-4">
        <p className={cn('text-7xl font-semibold tracking-tighter sm:text-8xl', TEXT)}>
          {Math.round(weather.temp)}°
        </p>
        <p className={cn('pb-3 text-lg capitalize sm:text-xl', TEXT, 'opacity-70')}>
          {weather.condition.description}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-gray-300 pt-4 dark:border-white/20">
        <p className={cn('text-sm sm:text-base', TEXT, 'opacity-70')}>
          Feels like <span className={cn('font-semibold', TEXT, 'opacity-100')}>{Math.round(weather.feelsLike)}°C</span>
        </p>
        <div className="flex items-center gap-3">
          <span className={cn('inline-flex items-center gap-1 text-sm sm:text-base', TEXT, 'opacity-70')}>
            <ArrowDown className="size-4" aria-hidden="true" />
            <span className={cn('font-semibold', TEXT, 'opacity-100')}>{Math.round(weather.tempMin)}°</span>
          </span>
          <span className={cn('inline-flex items-center gap-1 text-sm sm:text-base', TEXT, 'opacity-70')}>
            <ArrowUp className="size-4" aria-hidden="true" />
            <span className={cn('font-semibold', TEXT, 'opacity-100')}>{Math.round(weather.tempMax)}°</span>
          </span>
        </div>
      </div>

      <div className="mt-6 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1 rounded-lg bg-black/5 p-4 dark:bg-white/5">
          <div className="flex items-center gap-2">
            <Thermometer className="size-5" aria-hidden="true" />
            <span className={cn('text-xs sm:text-sm font-medium', TEXT, 'opacity-70')}>Feels</span>
          </div>
          <p className={cn('mt-1 text-xl font-semibold tracking-tight sm:text-2xl', TEXT)}>
            {Math.round(weather.feelsLike)}°C
          </p>
        </div>

        <div className="flex flex-col gap-1 rounded-lg bg-black/5 p-4 dark:bg-white/5">
          <div className="flex items-center gap-2">
            <Droplets className="size-5" aria-hidden="true" />
            <span className={cn('text-xs sm:text-sm font-medium', TEXT, 'opacity-70')}>Humidity</span>
          </div>
          <p className={cn('mt-1 text-xl font-semibold tracking-tight sm:text-2xl', TEXT)}>
            {weather.humidity}%
          </p>
        </div>

        <div className="flex flex-col gap-1 rounded-lg bg-black/5 p-4 dark:bg-white/5">
          <div className="flex items-center gap-2">
            <Wind className="size-5" aria-hidden="true" />
            <span className={cn('text-xs sm:text-sm font-medium', TEXT, 'opacity-70')}>Wind</span>
          </div>
          <p className={cn('mt-1 text-xl font-semibold tracking-tight sm:text-2xl', TEXT)}>
            {weather.windSpeed} m/s
          </p>
        </div>

        <div className="flex flex-col gap-1 rounded-lg bg-black/5 p-4 dark:bg-white/5">
          <div className="flex items-center gap-2">
            <Gauge className="size-5" aria-hidden="true" />
            <span className={cn('text-xs sm:text-sm font-medium', TEXT, 'opacity-70')}>Pressure</span>
          </div>
          <p className={cn('mt-1 text-xl font-semibold tracking-tight sm:text-2xl', TEXT)}>
            {weather.pressure} hPa
          </p>
        </div>

        <div className="col-span-2 flex flex-col gap-1 rounded-lg bg-black/5 p-4 dark:bg-white/5 sm:col-span-1">
          <div className="flex items-center gap-2">
            <Thermometer className="size-5" aria-hidden="true" />
            <span className={cn('text-xs sm:text-sm font-medium', TEXT, 'opacity-70')}>Min / Max</span>
          </div>
          <p className={cn('mt-1 text-xl font-semibold tracking-tight sm:text-2xl', TEXT)}>
            {Math.round(weather.tempMin)}° / {Math.round(weather.tempMax)}°
          </p>
        </div>
      </div>
    </section>
  )
}
