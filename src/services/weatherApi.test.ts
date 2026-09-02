import { afterEach, describe, expect, it, vi } from 'vitest'
import { getForecastByCity, getWeatherByCity } from './weatherApi'
import { WeatherApiError } from '../types/weather'

const validPayload = {
  name: 'Valladolid',
  sys: { country: 'ES', sunrise: 1_712_740_805, sunset: 1_712_745_638 },
  main: { temp: 18.4, feels_like: 17.9, humidity: 65, pressure: 1_015 },
  wind: { speed: 3.6 },
  visibility: 10_000,
  timezone: 7_200,
  weather: [
    {
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d',
    },
  ],
}

const validForecastPayload = {
  city: { name: 'Valladolid', country: 'ES', timezone: 7_200 },
  list: [
    {
      dt: 1_712_745_200,
      main: { temp: 19.2, temp_min: 18.1, temp_max: 20.3 },
      weather: [{ main: 'Clouds', description: 'broken clouds', icon: '04d' }],
      pop: 0.25,
    },
  ],
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('getWeatherByCity', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('returns mapped weather for a valid city', async () => {
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key')
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(validPayload))
    vi.stubGlobal('fetch', fetchMock)

    const weather = await getWeatherByCity('Valladolid')

    expect(weather).toEqual({
      name: 'Valladolid',
      country: 'ES',
      temp: 18.4,
      feelsLike: 17.9,
      humidity: 65,
      windSpeed: 3.6,
      pressure: 1_015,
      visibility: 10_000,
      sunrise: 1_712_740_805,
      sunset: 1_712_745_638,
      timezoneOffset: 7_200,
      condition: {
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03d',
      },
    })

    const requested = new URL(fetchMock.mock.calls[0][0] as string)
    expect(requested.origin + requested.pathname).toBe(
      'https://api.openweathermap.org/data/2.5/weather',
    )
    expect(requested.searchParams.get('q')).toBe('Valladolid')
    expect(requested.searchParams.get('units')).toBe('metric')
    expect(requested.searchParams.get('appid')).toBe('test-key')
  })

  it('throws invalid_city when the API returns 404', async () => {
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, 404)))

    const error = await getWeatherByCity('NotARealCity').catch((err: unknown) => err)

    expect(error).toBeInstanceOf(WeatherApiError)
    expect(error).toMatchObject({ code: 'invalid_city' })
  })

  it('throws missing_key when the API key is absent', async () => {
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', '')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const error = await getWeatherByCity('Valladolid').catch((err: unknown) => err)

    expect(error).toBeInstanceOf(WeatherApiError)
    expect(error).toMatchObject({ code: 'missing_key' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('throws network when fetch fails', async () => {
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))

    const error = await getWeatherByCity('Valladolid').catch((err: unknown) => err)

    expect(error).toBeInstanceOf(WeatherApiError)
    expect(error).toMatchObject({ code: 'network' })
  })

  it('throws invalid_response when the payload shape is unexpected', async () => {
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ message: 'ok' })),
    )

    const error = await getWeatherByCity('Valladolid').catch((err: unknown) => err)

    expect(error).toBeInstanceOf(WeatherApiError)
    expect(error).toMatchObject({ code: 'invalid_response' })
  })

  it('returns a typed metric forecast', async () => {
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test-key')
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(validForecastPayload))
    vi.stubGlobal('fetch', fetchMock)

    await expect(getForecastByCity('Valladolid')).resolves.toMatchObject({
      name: 'Valladolid',
      country: 'ES',
      timezoneOffset: 7_200,
      entries: [{ temp: 19.2, precipitationProbability: 0.25 }],
    })

    const requested = new URL(fetchMock.mock.calls[0][0] as string)
    expect(requested.pathname).toBe('/data/2.5/forecast')
    expect(requested.searchParams.get('units')).toBe('metric')
  })
})

describe.skipIf(import.meta.env.VITE_RUN_LIVE_API_TESTS !== 'true')(
  'OpenWeather live API',
  () => {
    it('fetches Valladolid in metric units', async () => {
      const weather = await getWeatherByCity('Valladolid')

      expect(weather.name).toBe('Valladolid')
      expect(weather.country).toBe('ES')
      expect(Number.isFinite(weather.temp)).toBe(true)
      expect(weather.condition.icon.length).toBeGreaterThan(0)
    })

    it('fetches the Valladolid forecast', async () => {
      const forecast = await getForecastByCity('Valladolid')

      expect(forecast.name).toBe('Valladolid')
      expect(forecast.entries.length).toBeGreaterThan(0)
      expect(Number.isFinite(forecast.entries[0].temp)).toBe(true)
    })
  },
)
