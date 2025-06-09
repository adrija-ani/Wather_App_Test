export const weatherIcons: Record<string, string> = {
  'clear sky': '☀️',
  'few clouds': '🌤️',
  'scattered clouds': '⛅',
  'broken clouds': '☁️',
  'overcast clouds': '☁️',
  'shower rain': '🌦️',
  'rain': '🌧️',
  'light rain': '🌦️',
  'moderate rain': '🌧️',
  'heavy intensity rain': '🌧️',
  'thunderstorm': '⛈️',
  'snow': '🌨️',
  'light snow': '🌨️',
  'heavy snow': '❄️',
  'mist': '🌫️',
  'fog': '🌫️',
  'haze': '🌫️',
  'default': '🌤️'
};

export function getWeatherIcon(description: string): string {
  return weatherIcons[description.toLowerCase()] || weatherIcons.default;
}