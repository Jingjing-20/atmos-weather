import type { WeatherData } from '../../types/weather'

interface CurrentWeatherProps {
  weather: WeatherData
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <section
      className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 p-6 text-white shadow-lg shadow-sky-950/15 sm:p-8"
      aria-labelledby="current-weather-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-sky-100">Current weather</p>
          <h2 id="current-weather-heading" className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
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
        <p className="text-6xl font-semibold tracking-tighter sm:text-7xl">
          {Math.round(weather.temp)}°
        </p>
        <p className="pb-2 text-base capitalize text-sky-100 sm:text-lg">
          {weather.condition.description}
        </p>
      </div>

      <p className="mt-5 border-t border-white/20 pt-4 text-sm text-sky-100">
        Feels like {Math.round(weather.feelsLike)}°C
      </p>
    </section>
  )
}
