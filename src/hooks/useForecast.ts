import { useEffect, useRef, useState } from 'react'
import { getForecastByCity } from '../services/weatherApi'
import type { ForecastData } from '../types/weather'

interface ForecastState {
  forecast: ForecastData | null
  error: string | null
}

const forecastCache = new Map<string, Promise<ForecastData>>()

function getCachedForecast(city: string): Promise<ForecastData> {
  const key = city.trim().toLocaleLowerCase()
  const cached = forecastCache.get(key)

  if (cached) {
    return cached
  }

  const request = getForecastByCity(city).catch((error: unknown) => {
    forecastCache.delete(key)
    throw error
  })
  forecastCache.set(key, request)
  return request
}

export function useForecast(city: string | null) {
  const [state, setState] = useState<ForecastState>({ forecast: null, error: null })
  const requestId = useRef(0)

  useEffect(() => {
    if (!city) {
      return
    }

    let isActive = true
    const currentRequestId = ++requestId.current

    void getCachedForecast(city)
      .then((forecast) => {
        if (isActive && currentRequestId === requestId.current) {
          setState({ forecast, error: null })
        }
      })
      .catch((error: unknown) => {
        if (isActive && currentRequestId === requestId.current) {
          setState({
            forecast: null,
            error: error instanceof Error ? error.message : 'Unable to load the forecast.',
          })
        }
      })

    return () => {
      isActive = false
    }
  }, [city])

  return { ...state, isLoading: Boolean(city) && !state.forecast && !state.error }
}
