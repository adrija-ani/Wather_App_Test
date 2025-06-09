import React from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { checkWeatherAlerts, generateWeatherInsights } from '../utils/weatherAlerts';
import { AlertTriangle, Lightbulb, Calendar } from 'lucide-react';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

export function WeatherDisplay({ weatherData }: WeatherDisplayProps) {
  const alerts = checkWeatherAlerts(weatherData);
  const insights = generateWeatherInsights(weatherData);

  return (
    <div className="animate-fadeIn">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {getWeatherIcon(weatherData.description)}
          </div>
          <div className="text-5xl font-bold text-blue-600 mb-3">
            {weatherData.temperature}°C
          </div>
          <div className="text-xl capitalize text-gray-600 mb-3">
            {weatherData.description}
          </div>
          <div className="text-lg text-gray-500">
            {weatherData.location}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600">{weatherData.humidity}%</div>
            <div className="text-sm text-gray-600 mt-1">Humidity</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600">{weatherData.windSpeed} km/h</div>
            <div className="text-sm text-gray-600 mt-1">Wind Speed</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600">{weatherData.pressure} hPa</div>
            <div className="text-sm text-gray-600 mt-1">Pressure</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600">{weatherData.visibility} km</div>
            <div className="text-sm text-gray-600 mt-1">Visibility</div>
          </div>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <h4 className="flex items-center gap-2 text-amber-800 font-semibold mb-3">
            <AlertTriangle size={20} />
            Weather Alerts
          </h4>
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-center gap-2 mb-2 text-amber-700">
              <span>{alert.icon}</span>
              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mb-8">
        <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-gray-800">
          <Calendar size={24} />
          5-Day Forecast
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-5 rounded-xl text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="font-bold mb-3">{day.day}</div>
              <div className="text-3xl mb-3">{getWeatherIcon(day.description)}</div>
              <div className="text-xl font-bold text-blue-600 mb-2">{day.temperature}°C</div>
              <div className="text-sm text-gray-600 capitalize">{day.description}</div>
            </div>
          ))}
        </div>
      </div>

      {insights.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h4 className="flex items-center gap-2 text-green-800 font-semibold mb-3">
            <Lightbulb size={20} />
            Weather Insights
          </h4>
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-2 mb-2 text-green-700">
              <span>💡</span>
              <span>{insight}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}