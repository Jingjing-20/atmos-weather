import type { WeatherData } from '../../types/weather'
import { CHROME, cn, TEXT } from '../../lib/utils'

interface CurrentWeatherProps {
  weather: WeatherData
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <section
      className={cn('overflow-hidden rounded-xl bg-gradient-card p-6 shadow-xl sm:p-8', CHROME)}
      aria-labelledby="current-weather-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn('text-sm font-medium', TEXT, 'opacity-70')}>Current weather</p>
          <h2 id="current-weather-heading" className={cn('mt-1 text-2xl font-bold tracking-tight sm:text-3xl', TEXT)}>
            {weather.name}, {weather.country}
          </h2>
        </div>
        <img
          className="-my-3 size-24 shrink-0 sm:size-28"
          src={`https://openweathermap.org/img/wn/${weather.condition.icon}@2x.png`}
          alt={weather.condition.description}
        />
      </div>

      <div className="mt-6 flex items-end gap-4">
        <p className={cn('text-6xl font-semibold tracking-tighter sm:text-7xl', TEXT)}>
          {Math.round(weather.temp)}°
        </p>
        <p className={cn('pb-2 text-base capitalize sm:text-lg', TEXT, 'opacity-70')}>
          {weather.condition.description}
        </p>
      </div>

      <p className={cn('mt-5 border-t border-gray-300 pt-4 text-sm dark:border-white/20', TEXT, 'opacity-70')}>
        Feels like {Math.round(weather.feelsLike)}°C
      </p>
    </section>
  )
}
