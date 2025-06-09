export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex?: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  day: string;
  temperature: number;
  description: string;
}

export interface SavedWeatherData {
  id: number;
  location: string;
  dateSaved: string;
  temperature: number;
  weather: string;
  startDate: string;
  endDate: string;
  weatherData: WeatherData;
}

export interface WeatherAlert {
  type: 'heat' | 'freeze' | 'wind' | 'storm';
  message: string;
  icon: string;
}