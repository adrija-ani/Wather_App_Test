import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="text-center py-8 text-gray-600">
      <div className="inline-block w-8 h-8 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-lg">Getting weather data...</p>
    </div>
  );
}