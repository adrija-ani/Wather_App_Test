import React, { useState } from 'react';
import { SavedWeatherData, WeatherData } from '../types/weather';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { convertToCSV, convertToXML, downloadFile } from '../utils/exportUtils';
import { Modal } from './Modal';
import { Plus, RefreshCw, Edit, Trash2, Download, FileText, FileCode, Save } from 'lucide-react';

interface DataManagementProps {
  currentWeatherData: WeatherData | null;
}

export function DataManagement({ currentWeatherData }: DataManagementProps) {
  const [savedData, setSavedData] = useLocalStorage<SavedWeatherData[]>('weatherAppData', []);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingData, setEditingData] = useState<SavedWeatherData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [saveForm, setSaveForm] = useState({
    location: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWeatherData) return;

    const newData: SavedWeatherData = {
      id: Date.now(),
      location: saveForm.location,
      dateSaved: new Date().toLocaleDateString(),
      temperature: currentWeatherData.temperature,
      weather: currentWeatherData.description,
      startDate: saveForm.startDate,
      endDate: saveForm.endDate,
      weatherData: currentWeatherData
    };

    setSavedData(prev => [...prev, newData]);
    setShowSaveModal(false);
    setSuccessMessage('Weather data saved successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleEdit = (data: SavedWeatherData) => {
    setEditingData(data);
    setSaveForm({
      location: data.location,
      startDate: data.startDate,
      endDate: data.endDate
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingData) return;

    setSavedData(prev => prev.map(item => 
      item.id === editingData.id 
        ? { ...item, ...saveForm }
        : item
    ));
    setShowEditModal(false);
    setEditingData(null);
    setSuccessMessage('Weather data updated successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this weather data?')) {
      setSavedData(prev => prev.filter(item => item.id !== id));
      setSuccessMessage('Weather data deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleExport = (format: 'json' | 'csv' | 'xml') => {
    if (savedData.length === 0) {
      alert('No data to export');
      return;
    }

    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case 'json':
        content = JSON.stringify(savedData, null, 2);
        filename = 'weather_data.json';
        mimeType = 'application/json';
        break;
      case 'csv':
        content = convertToCSV(savedData);
        filename = 'weather_data.csv';
        mimeType = 'text/csv';
        break;
      case 'xml':
        content = convertToXML(savedData);
        filename = 'weather_data.xml';
        mimeType = 'application/xml';
        break;
    }

    downloadFile(content, filename, mimeType);
    setSuccessMessage(`Data exported as ${format.toUpperCase()} successfully!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const openSaveModal = () => {
    if (!currentWeatherData) {
      alert('Please search for weather data first');
      return;
    }
    setSaveForm(prev => ({ ...prev, location: currentWeatherData.location }));
    setShowSaveModal(true);
  };

  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <h3 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-800">
        <FileText size={28} />
        Weather Data Management
      </h3>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-4">
          {successMessage}
        </div>
      )}
      
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={openSaveModal}
          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Save Weather Data
        </button>
        <button
          onClick={() => setSavedData([...savedData])}
          className="px-4 py-3 bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 flex items-center gap-2"
        >
          <RefreshCw size={20} />
          Refresh Data
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left font-semibold text-gray-700">Location</th>
              <th className="p-4 text-left font-semibold text-gray-700">Date Saved</th>
              <th className="p-4 text-left font-semibold text-gray-700">Temperature</th>
              <th className="p-4 text-left font-semibold text-gray-700">Weather</th>
              <th className="p-4 text-left font-semibold text-gray-700">Date Range</th>
              <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No saved weather data yet
                </td>
              </tr>
            ) : (
              savedData.map(item => (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">{item.location}</td>
                  <td className="p-4">{item.dateSaved}</td>
                  <td className="p-4">{item.temperature}°C</td>
                  <td className="p-4 capitalize">{item.weather}</td>
                  <td className="p-4">{item.startDate} to {item.endDate}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <h4 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Download size={20} />
          Export Data
        </h4>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => handleExport('json')}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 flex items-center gap-2"
          >
            <FileCode size={16} />
            JSON
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 flex items-center gap-2"
          >
            <FileText size={16} />
            CSV
          </button>
          <button
            onClick={() => handleExport('xml')}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 flex items-center gap-2"
          >
            <FileCode size={16} />
            XML
          </button>
        </div>
      </div>

      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Weather Data"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
            <input
              type="text"
              value={saveForm.location}
              onChange={(e) => setSaveForm(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
              <input
                type="date"
                value={saveForm.startDate}
                onChange={(e) => setSaveForm(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
              <input
                type="date"
                value={saveForm.endDate}
                onChange={(e) => setSaveForm(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Save size={20} />
              Save Data
            </button>
            <button
              type="button"
              onClick={() => setShowSaveModal(false)}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Weather Data"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
            <input
              type="text"
              value={saveForm.location}
              onChange={(e) => setSaveForm(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
              <input
                type="date"
                value={saveForm.startDate}
                onChange={(e) => setSaveForm(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
              <input
                type="date"
                value={saveForm.endDate}
                onChange={(e) => setSaveForm(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Save size={20} />
              Update Data
            </button>
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}