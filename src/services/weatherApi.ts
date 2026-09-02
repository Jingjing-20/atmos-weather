import {
  WeatherApiError,
  type WeatherData,
} from '../types/weather'

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

function getApiKey(): string {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim()
  if (!key) {
    throw new WeatherApiError(
      'OpenWeatherMap API key is missing. Add VITE_OPENWEATHER_API_KEY to your environment.',
      'missing_key',
    )
  }
  return key
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function readNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function parseWeatherData(payload: unknown): WeatherData {
  if (!isRecord(payload)) {
    throw new WeatherApiError(
      'Weather response was not valid JSON object.',
      'invalid_response',
    )
  }

  const name = readString(payload.name)
  const sys = isRecord(payload.sys) ? payload.sys : undefined
  const country = sys ? readString(sys.country) : undefined
  const main = isRecord(payload.main) ? payload.main : undefined
  const temp = main ? readNumber(main.temp) : undefined
  const feelsLike = main ? readNumber(main.feels_like) : undefined
  const weatherList = Array.isArray(payload.weather) ? payload.weather : []
  const firstCondition = isRecord(weatherList[0]) ? weatherList[0] : undefined
  const conditionMain = firstCondition ? readString(firstCondition.main) : undefined
  const description = firstCondition
    ? readString(firstCondition.description)
    : undefined
  const icon = firstCondition ? readString(firstCondition.icon) : undefined

  if (
    !name ||
    !country ||
    temp === undefined ||
    feelsLike === undefined ||
    !conditionMain ||
    !description ||
    !icon
  ) {
    throw new WeatherApiError(
      'Weather response was missing expected fields.',
      'invalid_response',
    )
  }

  return {
    name,
    country,
    temp,
    feelsLike,
    condition: {
      main: conditionMain,
      description,
      icon,
    },
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    throw new WeatherApiError(
      'Weather response could not be parsed as JSON.',
      'invalid_response',
    )
  }
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const apiKey = getApiKey()
  const query = city.trim()

  const url = new URL(WEATHER_URL)
  url.searchParams.set('q', query)
  url.searchParams.set('units', 'metric')
  url.searchParams.set('appid', apiKey)

  let response: Response
  try {
    response = await fetch(url)
  } catch {
    throw new WeatherApiError(
      'Could not reach the weather service. Check your connection and try again.',
      'network',
    )
  }

  if (response.status === 404) {
    throw new WeatherApiError(
      'City not found. Check the spelling and try again.',
      'invalid_city',
    )
  }

  if (!response.ok) {
    throw new WeatherApiError(
      `Weather request failed (${response.status}).`,
      'http',
    )
  }

  const payload = await readJson(response)
  return parseWeatherData(payload)
}
