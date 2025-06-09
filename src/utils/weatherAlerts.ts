import { WeatherData, WeatherAlert } from '../types/weather';

export function checkWeatherAlerts(weatherData: WeatherData): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];
  
  if (weatherData.temperature > 35) {
    alerts.push({
      type: 'heat',
      message: 'Heat Warning: Temperature is extremely high',
      icon: '⚠️'
    });
  }
  
  if (weatherData.temperature < 0) {
    alerts.push({
      type: 'freeze',
      message: 'Freeze Warning: Temperature is below freezing',
      icon: '❄️'
    });
  }
  
  if (weatherData.windSpeed > 50) {
    alerts.push({
      type: 'wind',
      message: 'Wind Warning: High wind speeds detected',
      icon: '💨'
    });
  }
  
  if (weatherData.description.includes('thunderstorm')) {
    alerts.push({
      type: 'storm',
      message: 'Storm Alert: Thunderstorm conditions',
      icon: '⛈️'
    });
  }
  
  return alerts;
}

export function generateWeatherInsights(data: WeatherData): string[] {
  const insights: string[] = [];
  
  // Temperature trend analysis
  const avgTemp = data.forecast.reduce((sum, day) => sum + day.temperature, 0) / data.forecast.length;
  insights.push(`Average temperature for the next 5 days: ${Math.round(avgTemp)}°C`);
  
  // Weather pattern analysis
  const rainyDays = data.forecast.filter(day => day.description.includes('rain')).length;
  if (rainyDays > 2) {
    insights.push(`Expect rain on ${rainyDays} out of 5 days. Pack an umbrella!`);
  }
  
  // Best day recommendation
  const bestDay = data.forecast.reduce((best, day) => 
    day.temperature > best.temperature && !day.description.includes('rain') ? day : best
  );
  insights.push(`Best weather expected on ${bestDay.day}: ${bestDay.temperature}°C with ${bestDay.description}`);
  
  return insights;
}