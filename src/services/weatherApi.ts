import { WeatherData } from '../types/weather';

const API_KEY = '4050f5516f0b10815d25d86690252072';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    let weatherUrl: string;
    let forecastUrl: string;
    
    // Check if location is coordinates (lat,lon format)
    if (location.includes(',')) {
      const [lat, lon] = location.split(',').map(coord => coord.trim());
      weatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      weatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`;
      forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`;
    }

    // Get current weather
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error(`Weather data not found for "${location}"`);
    }
    const weatherData = await weatherResponse.json();

    // Get 5-day forecast
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error('Forecast data not available');
    }
    const forecastData = await forecastResponse.json();

    // Process forecast data (get one entry per day at noon)
    const dailyForecast = [];
    const processedDates = new Set();
    
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      
      // Get forecast for noon (12:00) or closest available time for each day
      if (!processedDates.has(dateString) && dailyForecast.length < 5) {
        const hour = date.getHours();
        if (hour >= 11 && hour <= 13) { // Around noon
          dailyForecast.push({
            date: date.toLocaleDateString(),
            day: date.toLocaleDateString('en', {weekday: 'short'}),
            temperature: Math.round(item.main.temp),
            description: item.weather[0].description
          });
          processedDates.add(dateString);
        }
      }
    });

    // If we don't have enough noon forecasts, fill with available data
    if (dailyForecast.length < 5) {
      const remainingNeeded = 5 - dailyForecast.length;
      const additionalForecasts = forecastData.list.slice(0, remainingNeeded).map((item: any) => {
        const date = new Date(item.dt * 1000);
        return {
          date: date.toLocaleDateString(),
          day: date.toLocaleDateString('en', {weekday: 'short'}),
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description
        };
      });
      dailyForecast.push(...additionalForecasts);
    }

    return {
      location: `${weatherData.name}, ${weatherData.sys.country}`,
      temperature: Math.round(weatherData.main.temp),
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind?.speed * 3.6 || 0), // Convert m/s to km/h
      pressure: weatherData.main.pressure,
      visibility: Math.round((weatherData.visibility || 10000) / 1000), // Convert m to km
      uvIndex: 0, // UV index requires separate API call
      forecast: dailyForecast
    };

  } catch (error) {
    console.error('Weather API Error:', error);
    throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getCurrentLocationWeather(): Promise<WeatherData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const data = await getWeatherData(`${lat},${lon}`);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error('Unable to get your location: ' + error.message));
      }
    );
  });
}

export async function searchLocations(query: string): Promise<string[]> {
  if (query.length < 3) return [];
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) return [];
    
    const locations = await response.json();
    return locations.map((loc: any) => 
      `${loc.name}${loc.state ? ', ' + loc.state : ''}, ${loc.country}`
    );
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
}