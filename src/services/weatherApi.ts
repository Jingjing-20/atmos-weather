import {
  WeatherApiError,
  type ForecastData,
  type ForecastEntry,
  type WeatherData,
} from '../types/weather'

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

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
  const humidity = main ? readNumber(main.humidity) : undefined
  const pressure = main ? readNumber(main.pressure) : undefined
  const wind = isRecord(payload.wind) ? payload.wind : undefined
  const windSpeed = wind ? readNumber(wind.speed) : undefined
  const visibility = readNumber(payload.visibility)
  const sunrise = sys ? readNumber(sys.sunrise) : undefined
  const sunset = sys ? readNumber(sys.sunset) : undefined
  const timezoneOffset = readNumber(payload.timezone)
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
    humidity === undefined ||
    windSpeed === undefined ||
    pressure === undefined ||
    visibility === undefined ||
    sunrise === undefined ||
    sunset === undefined ||
    timezoneOffset === undefined ||
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
    humidity,
    windSpeed,
    pressure,
    visibility,
    sunrise,
    sunset,
    timezoneOffset,
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

async function fetchWeatherPayload(city: string, endpoint: string): Promise<unknown> {
  const apiKey = getApiKey()
  const query = city.trim()

  const url = new URL(endpoint)
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

  return readJson(response)
}

function parseForecastEntry(value: unknown): ForecastEntry {
  if (!isRecord(value)) {
    throw new WeatherApiError('Forecast response was missing expected fields.', 'invalid_response')
  }

  const timestamp = readNumber(value.dt)
  const main = isRecord(value.main) ? value.main : undefined
  const temp = main ? readNumber(main.temp) : undefined
  const tempMin = main ? readNumber(main.temp_min) : undefined
  const tempMax = main ? readNumber(main.temp_max) : undefined
  const weatherList = Array.isArray(value.weather) ? value.weather : []
  const condition = isRecord(weatherList[0]) ? weatherList[0] : undefined
  const conditionMain = condition ? readString(condition.main) : undefined
  const description = condition ? readString(condition.description) : undefined
  const icon = condition ? readString(condition.icon) : undefined

  if (
    timestamp === undefined ||
    temp === undefined ||
    tempMin === undefined ||
    tempMax === undefined ||
    !conditionMain ||
    !description ||
    !icon
  ) {
    throw new WeatherApiError('Forecast response was missing expected fields.', 'invalid_response')
  }

  return {
    timestamp,
    temp,
    tempMin,
    tempMax,
    precipitationProbability: readNumber(value.pop) ?? 0,
    condition: { main: conditionMain, description, icon },
  }
}

function parseForecastData(payload: unknown): ForecastData {
  if (!isRecord(payload) || !isRecord(payload.city) || !Array.isArray(payload.list)) {
    throw new WeatherApiError('Forecast response was not valid.', 'invalid_response')
  }

  const name = readString(payload.city.name)
  const country = readString(payload.city.country)
  const timezoneOffset = readNumber(payload.city.timezone)
  const entries = payload.list.map(parseForecastEntry)

  if (!name || !country || timezoneOffset === undefined || entries.length === 0) {
    throw new WeatherApiError('Forecast response was missing expected fields.', 'invalid_response')
  }

  return { name, country, timezoneOffset, entries }
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  return parseWeatherData(await fetchWeatherPayload(city, WEATHER_URL))
}

export async function getForecastByCity(city: string): Promise<ForecastData> {
  return parseForecastData(await fetchWeatherPayload(city, FORECAST_URL))
}
