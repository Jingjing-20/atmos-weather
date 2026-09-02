import { useCallback, useEffect, useState } from 'react'
import { getWeatherByCity } from '../services/weatherApi'
import type { WeatherData } from '../types/weather'

interface WeatherState {
  weather: WeatherData | null
  error: string | null
  isLoading: boolean
}

export function useWeather(initialCity: string) {
  const [state, setState] = useState<WeatherState>({
    weather: null,
    error: null,
    isLoading: true,
  })

  const reload = useCallback(async () => {
    setState((currentState) => ({
      ...currentState,
      error: null,
      isLoading: true,
    }))

    try {
      const weather = await getWeatherByCity(initialCity)
      setState({ weather, error: null, isLoading: false })
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to load weather right now. Please try again.'

      setState((currentState) => ({
        ...currentState,
        error: message,
        isLoading: false,
      }))
    }
  }, [initialCity])

  useEffect(() => {
    let isActive = true

    void getWeatherByCity(initialCity)
      .then((weather) => {
        if (isActive) {
          setState({ weather, error: null, isLoading: false })
        }
      })
      .catch((error: unknown) => {
        if (!isActive) {
          return
        }

        const message =
          error instanceof Error
            ? error.message
            : 'Unable to load weather right now. Please try again.'
        setState({ weather: null, error: message, isLoading: false })
      })

    return () => {
      isActive = false
    }
  }, [initialCity])

  return { ...state, reload }
}
