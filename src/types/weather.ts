export interface WeatherCondition {
  main: string
  description: string
  icon: string
}

export interface WeatherData {
  name: string
  country: string
  temp: number
  feelsLike: number
  condition: WeatherCondition
}

export type WeatherApiErrorCode =
  | 'missing_key'
  | 'invalid_city'
  | 'network'
  | 'http'
  | 'invalid_response'

export class WeatherApiError extends Error {
  readonly code: WeatherApiErrorCode

  constructor(message: string, code: WeatherApiErrorCode) {
    super(message)
    this.name = 'WeatherApiError'
    this.code = code
  }
}
