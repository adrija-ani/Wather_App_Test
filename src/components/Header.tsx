import React from 'react';
import { CloudSun, Info } from 'lucide-react';

interface HeaderProps {
  onInfoClick: () => void;
}

export function Header({ onInfoClick }: HeaderProps) {
  return (
    <>
      <button 
        onClick={onInfoClick}
        className="fixed top-5 right-5 bg-white bg-opacity-20 backdrop-blur-sm border-0 rounded-full w-12 h-12 text-white text-lg cursor-pointer transition-all duration-300 hover:bg-opacity-30 hover:scale-110 z-50 flex items-center justify-center"
      >
        <Info size={20} />
      </button>

      <div className="text-center mb-8 text-white">
        <h1 className="text-4xl font-bold mb-3 drop-shadow-lg flex items-center justify-center gap-3">
          <CloudSun size={40} />
          Advanced Weather App
        </h1>
        <p className="text-lg opacity-90">
          Real-time weather data with comprehensive forecasting and data management
        </p>
      </div>
    </>
  );
}