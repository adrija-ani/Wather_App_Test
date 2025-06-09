import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WeatherDisplay } from './components/WeatherDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { DataManagement } from './components/DataManagement';
import { Modal } from './components/Modal';
import { useWeather } from './hooks/useWeather';
import { ExternalLink } from 'lucide-react';

function App() {
  const { weatherData, loading, error, searchWeather, getCurrentWeather, clearError } = useWeather();
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700">
      <div className="max-w-6xl mx-auto px-5 py-5">
        <Header onInfoClick={() => setShowInfoModal(true)} />

        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 mb-5 shadow-xl">
          <SearchBar 
            onSearch={searchWeather}
            onCurrentLocation={getCurrentWeather}
            loading={loading}
          />

          {error && (
            <ErrorMessage message={error} onClose={clearError} />
          )}

          {loading && <LoadingSpinner />}

          {weatherData && !loading && (
            <WeatherDisplay weatherData={weatherData} />
          )}
        </div>

        <DataManagement currentWeatherData={weatherData} />

        <Modal
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
          title="About This Application"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              This Advanced Weather App provides real-time weather data with comprehensive forecasting and data management capabilities. Built with React and powered by OpenWeatherMap API.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Features:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Real-time weather data with place search</li>
                <li>5-day weather forecast</li>
                <li>Weather alerts and insights</li>
                <li>CRUD operations for weather data</li>
                <li>Export data in JSON, CSV, and XML formats</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Built for:</strong> Technical Assessment Demonstration
              </p>
              <a
                href="https://www.linkedin.com/company/product-manager-accelerator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mt-2"
              >
                Product Manager Accelerator
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;