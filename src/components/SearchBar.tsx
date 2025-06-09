import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchLocations } from '../services/weatherApi';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onCurrentLocation: () => void;
  loading: boolean;
}

export function SearchBar({ onSearch, onCurrentLocation, loading }: SearchBarProps) {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const loadSuggestions = async () => {
      if (location.length >= 3) {
        try {
          const results = await searchLocations(location);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }

    suggestionTimeoutRef.current = setTimeout(loadSuggestions, 300);

    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
    };
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-4 mb-5 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <input
            ref={inputRef}
            type="text"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-lg"
            placeholder="Enter city, zip code, coordinates, or landmark..."
            disabled={loading}
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                >
                  <MapPin size={16} className="inline mr-2 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading || !location.trim()}
          className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
        >
          <Search size={20} />
          {loading ? 'Searching...' : 'Get Weather'}
        </button>
        
        <button
          type="button"
          onClick={onCurrentLocation}
          disabled={loading}
          className="px-6 py-4 bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <MapPin size={20} />
          Use My Location
        </button>
      </form>
    </div>
  );
}