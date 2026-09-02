import { CurrentWeather } from '../weather/CurrentWeather'
import { WeatherDetails } from '../weather/WeatherDetails'
import { ErrorMessage } from '../ui/ErrorMessage'
import { LoadingSkeleton } from '../ui/LoadingSkeleton'
import { SearchBar } from '../ui/SearchBar'
import { useWeather } from '../../hooks/useWeather'

const INITIAL_CITY = 'Valladolid'

export function Dashboard() {
  const { weather, error, isLoading, reload, search } = useWeather(INITIAL_CITY)

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <SearchBar onSearch={search} />
      {isLoading && <LoadingSkeleton />}
      {!isLoading && error && <ErrorMessage message={error} onRetry={reload} />}
      {!isLoading && weather && (
        <>
          <CurrentWeather weather={weather} />
          <WeatherDetails weather={weather} />
        </>
      )}
    </main>
  )
}
