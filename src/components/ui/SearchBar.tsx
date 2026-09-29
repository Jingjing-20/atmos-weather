import { Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CHROME, cn, FOCUS_RING, TEXT } from '../../lib/utils'

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
          className={cn(
            'min-w-0 flex-1 rounded-md bg-textured px-4 py-3 shadow-xl',
            CHROME,
            TEXT,
            FOCUS_RING,
            'placeholder:text-base-content/40',
          )}
          id="city-search"
          type="search"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search a city"
          aria-describedby={validationError ? 'city-search-error' : undefined}
          aria-invalid={Boolean(validationError)}
        />
        <button
          className={cn(
            'hover-theme-switch inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-textured px-4 py-3 text-sm font-semibold shadow-xl sm:px-5',
            CHROME,
            TEXT,
            FOCUS_RING,
          )}
          type="submit"
        >
          <Search className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Search</span>
          <span className="sm:hidden">Search city</span>
        </button>
      </div>
      {validationError && (
        <p id="city-search-error" className="mt-2 text-sm text-destructive" role="alert">
          {validationError}
        </p>
      )}
    </form>
  )
}
