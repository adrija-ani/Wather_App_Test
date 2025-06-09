import { SavedWeatherData } from '../types/weather';

export function convertToCSV(data: SavedWeatherData[]): string {
  const headers = ['ID', 'Location', 'Date Saved', 'Temperature', 'Weather', 'Start Date', 'End Date'];
  const rows = data.map(item => [
    item.id,
    item.location,
    item.dateSaved,
    item.temperature,
    item.weather,
    item.startDate,
    item.endDate
  ]);
  
  return [headers, ...rows].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
}

export function convertToXML(data: SavedWeatherData[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<weatherData>\n';
  data.forEach(item => {
    xml += `  <record>\n`;
    xml += `    <id>${item.id}</id>\n`;
    xml += `    <location>${escapeXml(item.location)}</location>\n`;
    xml += `    <dateSaved>${item.dateSaved}</dateSaved>\n`;
    xml += `    <temperature>${item.temperature}</temperature>\n`;
    xml += `    <weather>${escapeXml(item.weather)}</weather>\n`;
    xml += `    <startDate>${item.startDate}</startDate>\n`;
    xml += `    <endDate>${item.endDate}</endDate>\n`;
    xml += `  </record>\n`;
  });
  xml += '</weatherData>';
  return xml;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}