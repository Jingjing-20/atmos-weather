import { CurrentWeather } from '../weather/CurrentWeather'
import { ErrorMessage } from '../ui/ErrorMessage'
import { LoadingSkeleton } from '../ui/LoadingSkeleton'
import { useWeather } from '../../hooks/useWeather'

const INITIAL_CITY = 'Valladolid'

export function Dashboard() {
  const { weather, error, isLoading, reload } = useWeather(INITIAL_CITY)

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
      {isLoading && <LoadingSkeleton />}
      {!isLoading && error && <ErrorMessage message={error} onRetry={reload} />}
      {!isLoading && weather && <CurrentWeather weather={weather} />}
    </main>
  )
}
