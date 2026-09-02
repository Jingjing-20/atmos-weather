import { Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
}

const DEBOUNCE_DELAY_MS = 400

export function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const submitSearch = useCallback(() => {
    const query = city.trim()

    if (!query) {
      setValidationError('Enter a city to search.')
      return
    }

    setValidationError(null)
    onSearch(query)
  }, [city, onSearch])

  useEffect(() => {
    const query = city.trim()
    clearTimeout(debounceTimer.current)

    if (!query) {
      return
    }

    debounceTimer.current = setTimeout(submitSearch, DEBOUNCE_DELAY_MS)

    return () => {
      clearTimeout(debounceTimer.current)
    }
  }, [city, submitSearch])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearTimeout(debounceTimer.current)
    submitSearch()
  }

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor="city-search">
        Search for a city
      </label>
      <div className="flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-3 focus:ring-sky-100"
          id="city-search"
          type="search"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search a city"
          aria-describedby={validationError ? 'city-search-error' : undefined}
          aria-invalid={Boolean(validationError)}
        />
        <button
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:px-5"
          type="submit"
        >
          <Search className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Search</span>
          <span className="sm:hidden">Search city</span>
        </button>
      </div>
      {validationError && (
        <p id="city-search-error" className="mt-2 text-sm text-rose-700" role="alert">
          {validationError}
        </p>
      )}
    </form>
  )
}
