import { useState, useCallback } from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherData, getCurrentLocationWeather } from '../services/weatherApi';

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = useCallback(async (location: string) => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getCurrentLocationWeather();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get current location weather');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weatherData,
    loading,
    error,
    searchWeather,
    getCurrentWeather,
    clearError
  };
}