import { CurrentWeather } from '../weather/CurrentWeather'
import { HourlyForecast } from '../weather/HourlyForecast'
import { WeatherDetails } from '../weather/WeatherDetails'
import { WeeklyForecast } from '../weather/WeeklyForecast'
import { ErrorMessage } from '../ui/ErrorMessage'
import { LoadingSkeleton } from '../ui/LoadingSkeleton'
import { SearchBar } from '../ui/SearchBar'
import { useWeather } from '../../hooks/useWeather'
import { useForecast } from '../../hooks/useForecast'

const INITIAL_CITY = 'Valladolid'

export function Dashboard() {
  const { weather, error, isLoading, reload, search } = useWeather(INITIAL_CITY)
  const { forecast, error: forecastError, isLoading: isForecastLoading } = useForecast(weather?.name ?? null)

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <SearchBar onSearch={search} />
      {isLoading && <LoadingSkeleton />}
      {!isLoading && error && <ErrorMessage message={error} onRetry={reload} />}
      {!isLoading && weather && (
        <>
          <CurrentWeather weather={weather} />
          <WeatherDetails weather={weather} />
          {isForecastLoading && (
            <p className="text-sm text-slate-500" aria-live="polite">
              Loading forecast…
            </p>
          )}
          {forecastError && <p className="text-sm text-rose-700">Forecast unavailable: {forecastError}</p>}
          {forecast?.name === weather.name && (
            <>
              <HourlyForecast forecast={forecast} />
              <WeeklyForecast forecast={forecast} />
            </>
          )}
        </>
      )}
    </main>
  )
}
