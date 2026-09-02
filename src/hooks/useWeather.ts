import { useCallback, useEffect, useRef, useState } from 'react'
import { getWeatherByCity } from '../services/weatherApi'
import type { WeatherData } from '../types/weather'

interface WeatherState {
  weather: WeatherData | null
  error: string | null
  isLoading: boolean
}

const CACHE_DURATION_MS = 5 * 60 * 1000
const weatherCache = new Map<string, { expiresAt: number; weather: WeatherData }>()
const inFlightRequests = new Map<string, Promise<WeatherData>>()

function getCityKey(city: string): string {
  return city.trim().replaceAll(/\s+/g, ' ').toLocaleLowerCase()
}

async function getCachedWeather(city: string): Promise<WeatherData> {
  const key = getCityKey(city)
  const cached = weatherCache.get(key)

  if (cached && cached.expiresAt > Date.now()) {
    return cached.weather
  }

  if (cached) {
    weatherCache.delete(key)
  }

  const existingRequest = inFlightRequests.get(key)
  if (existingRequest) {
    return existingRequest
  }

  const request = getWeatherByCity(city)
  inFlightRequests.set(key, request)

  try {
    const weather = await request
    weatherCache.set(key, { weather, expiresAt: Date.now() + CACHE_DURATION_MS })
    return weather
  } finally {
    inFlightRequests.delete(key)
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Unable to load weather right now. Please try again.'
}

export function useWeather(initialCity: string) {
  const [state, setState] = useState<WeatherState>({
    weather: null,
    error: null,
    isLoading: true,
  })
  const requestId = useRef(0)

  const search = useCallback(async (city: string) => {
    const requestCity = city.trim()
    const currentRequestId = ++requestId.current

    setState((currentState) => ({
      ...currentState,
      error: null,
      isLoading: true,
    }))

    try {
      const weather = await getCachedWeather(requestCity)
      if (currentRequestId === requestId.current) {
        setState({ weather, error: null, isLoading: false })
      }
    } catch (error: unknown) {
      if (currentRequestId === requestId.current) {
        setState((currentState) => ({
          ...currentState,
          error: getErrorMessage(error),
          isLoading: false,
        }))
      }
    }
  }, [])

  const reload = useCallback(() => search(initialCity), [initialCity, search])

  useEffect(() => {
    let isActive = true
    const currentRequestId = ++requestId.current

    void getCachedWeather(initialCity)
      .then((weather) => {
        if (isActive && currentRequestId === requestId.current) {
          setState({ weather, error: null, isLoading: false })
        }
      })
      .catch((error: unknown) => {
        if (!isActive) {
          return
        }

        setState({ weather: null, error: getErrorMessage(error), isLoading: false })
      })

    return () => {
      isActive = false
    }
  }, [initialCity])

  return { ...state, reload, search }
}
