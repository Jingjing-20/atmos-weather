import { CurrentWeather } from '../weather/CurrentWeather'
import { HourlyForecast } from '../weather/HourlyForecast'
import { WeatherDetails } from '../weather/WeatherDetails'
import { WeeklyForecast } from '../weather/WeeklyForecast'
import { ErrorMessage } from '../ui/ErrorMessage'
import { LoadingSkeleton } from '../ui/LoadingSkeleton'
import { SearchBar } from '../ui/SearchBar'
import { useWeather } from '../../hooks/useWeather'
import { useForecast } from '../../hooks/useForecast'
import { TEXT, cn } from '../../lib/utils'

const INITIAL_CITY = 'Valladolid'

export function Dashboard() {
  const { weather, error, isLoading, reload, search } = useWeather(INITIAL_CITY)
  const { forecast, error: forecastError, isLoading: isForecastLoading } = useForecast(weather?.name ?? null)

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      {isLoading && <LoadingSkeleton />}
      {!isLoading && error && <ErrorMessage message={error} onRetry={() => { void reload() }} />}
      {!isLoading && weather && (
        (() => {
          const forecastReady = forecast?.name === weather.name

          return (
            <>
              <section
                aria-labelledby="dashboard-content-heading"
                className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-12"
              >
                <h2 id="dashboard-content-heading" className="sr-only">Weather overview</h2>

                <div className="flex flex-col gap-5 xl:col-span-6">
                  <CurrentWeather weather={weather} />
                </div>

                <div className="flex flex-col gap-5 xl:col-span-6">
                  <SearchBar onSearch={(city) => { void search(city) }} />
                  {forecastReady && <HourlyForecast forecast={forecast} />}
                  {!forecastReady && isForecastLoading && (
                    <p className={cn('text-sm', TEXT, 'opacity-70')} aria-live="polite">
                      Loading forecast…
                    </p>
                  )}
                  {forecastError && (
                    <p className="text-sm text-destructive">Forecast unavailable: {forecastError}</p>
                  )}
                  {forecastReady && <WeeklyForecast forecast={forecast} />}
                </div>
              </section>

              <section className="w-full">
                <WeatherDetails weather={weather} />
              </section>
            </>
          )
        })()
      )}
    </main>
  )
}
