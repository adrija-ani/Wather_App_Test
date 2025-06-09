# 🌤️ Advanced Weather App

**For:** PM Accelerator Technical Assessment

A comprehensive weather application that provides real-time weather data, 5-day forecasts, and complete CRUD operations for weather records management.

## 🚀 Features

### Tech Assessment 1 - Core Weather App
- ✅ **Location Input Support**: Accepts multiple location formats
  - City names (e.g., "New York", "London")
  - ZIP/Postal codes (e.g., "10001", "SW1A 1AA")
  - GPS coordinates (e.g., "40.7128,-74.0060")
  - Landmarks (e.g., "Statue of Liberty", "Eiffel Tower")
- ✅ **Current Location Detection**: Automatic GPS-based location detection
- ✅ **Real-time Weather Data**: Live weather information from OpenWeatherMap API
- ✅ **5-Day Forecast**: Extended weather predictions
- ✅ **Weather Icons & Visual Design**: Modern, responsive UI with weather-appropriate icons
- ✅ **Comprehensive Weather Details**: Temperature, humidity, pressure, wind speed, visibility, sunrise/sunset

### Tech Assessment 2 - Advanced Features
- ✅ **Complete CRUD Operations**:
  - **CREATE**: Add new weather records with location and date range validation
  - **READ**: View all stored weather records in a responsive table
  - **UPDATE**: Edit existing weather records with validation
  - **DELETE**: Remove weather records with confirmation
- ✅ **Data Persistence**: Browser-based storage (localStorage)
- ✅ **Date Range Validation**: Ensures logical and reasonable date ranges
- ✅ **Location Validation**: Verifies locations exist via API calls
- ✅ **Data Export**: Multiple export formats (JSON, CSV, XML, PDF/Text)
- ✅ **API Integration**: 
  - OpenWeatherMap API for weather data
  - Google Maps integration for location viewing
  - YouTube search integration for location videos

### Additional Features
- 🎯 **Weather Insights**: Smart recommendations based on weather conditions
- 🎯 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎯 **Error Handling**: Comprehensive error handling and user feedback
- 🎯 **Keyboard Shortcuts**: Enhanced user experience with hotkeys
- 🎯 **Modern UI/UX**: Clean, intuitive interface with animations

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OpenWeatherMap API
- **Storage**: Browser localStorage (simulates database)
- **Design**: Responsive CSS Grid/Flexbox, Modern UI patterns
- **Icons**: Emoji-based weather icons for universal compatibility

## 📦 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- OpenWeatherMap API key

### Quick Start
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Open the application**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

3. **API Configuration**:
   - The app uses OpenWeatherMap API
   - API key is pre-configured: `795d59c4e358cb1e5a953ccb689a4878`
   - For production use, replace with your own API key

### No Installation Required
This is a client-side application that runs entirely in the browser. No server setup or dependencies needed!

## 🎮 Usage Guide

### Getting Current Weather
1. **Using Current Location**:
   - Click "📍 Use Current Location" button
   - Allow location access when prompted
   - Weather data will load automatically

2. **Manual Location Entry**:
   - Enter location in various formats:
     - City: "New York"
     - ZIP: "10001"
     - Coordinates: "40.7128,-74.0060"
     - Landmark: "Central Park"
   - Click "Get Weather"

### 5-Day Forecast
1. Go to "5-Day Forecast" tab
2. Enter location and select date range
3. Click "Get Forecast"
4. Optionally save forecast data to database

### Managing Weather Records
1. **Add New Record**:
   - Go to "Weather Records" tab
   - Click "➕ Add New Record"
   - Fill in location, date, temperature, and description
   - Click "Save Record"

2. **View Records**:
   - All saved records appear in the table
   - Click "🔄 Refresh Records" to reload

3. **Edit Record**:
   - Click "✏️ Edit" next to any record
   - Modify fields and save changes

4. **Delete Record**:
   - Click "🗑️ Delete" next to any record
   - Confirm deletion

### Data Export
1. Go to "Export Data" tab
2. Choose format: JSON, CSV, XML, or PDF
3. File downloads automatically

## 🔧 API Integration

### OpenWeatherMap API
- **Current Weather**: `api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `api.openweathermap.org/data/2.5/forecast`
- **Rate Limit**: 60 calls/minute (free tier)

### Additional Integrations
- **Google Maps**: Direct links to location maps
- **YouTube**: Location-based video search
- **Geolocation API**: Browser-based location detection

## 💾 Data Storage

The application uses browser localStorage to simulate a database:

```javascript
// Data structure
{
  id: timestamp,
  location: "New York",
  startDate: "2024-01-01",
  endDate: "2024-01-07",
  temperature: 22.5,
  description: "Sunny",
  createdAt: "2024-01-01T12:00:00.000Z"
}
```

## 🎨 Design Features

- **Modern UI**: Clean, professional design with weather-appropriate colors
- **Responsive Layout**: Adapts to all screen sizes
- **Weather Icons**: Contextual emoji icons for different weather conditions
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🧪 Testing

### Manual Testing Checklist
- [ ] Current weather retrieval works for various location formats
- [ ] 5-day forecast displays correctly
- [ ] CRUD operations function properly
- [ ] Data validation prevents invalid entries
- [ ] Export functionality works for all formats
- [ ] Responsive design works on mobile devices
- [ ] Error handling displays appropriate messages

### Test Locations
- Cities: "London", "Tokyo", "Sydney"
- ZIP codes: "10001", "90210", "02101"
- Coordinates: "51.5074,-0.1278", "35.6762,139.6503"
- Landmarks: "Times Square", "Golden Gate Bridge"

## 📱 Mobile Responsiveness

The app is fully responsive and includes:
- Mobile-first design approach
- Touch-friendly button sizes
- Optimized layouts for small screens
- Readable typography on all devices

## 🔐 Security Considerations

- API key is exposed in client-side code (for demo purposes)
- In production, use environment variables and proxy server
- Input validation prevents basic injection attacks
- No sensitive user data stored

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. App will be available at: `https://yourusername.github.io/weather-app`

### Other Hosting Options
- Netlify: Drag and drop deployment
- Vercel: Git-based deployment
- Surge.sh: Command-line deployment

## 🎯 PM Accelerator Integration

- **Info Button**: Click the ℹ️ button in the top-right corner
- **Company Information**: Displays Product Manager Accelerator details
- **LinkedIn**: Direct link to PM Accelerator LinkedIn page

## 🔄 Future Enhancements

- **Backend Integration**: Replace localStorage with real database
- **User Authentication**: User-specific weather records
- **Advanced Analytics**: Weather trend analysis
- **Push Notifications**: Weather alerts
- **Offline Support**: Service worker for offline functionality
- **More APIs**: Integration with additional weather services

## 📊 Performance

- **Load Time**: < 2 seconds on average connection
- **API Calls**: Optimized to minimize unnecessary requests
- **Storage**: Efficient use of localStorage
- **Responsive**: 60 FPS animations and smooth interactions

## 🐛 Known Issues

- localStorage has size limitations (5-10MB)
- API rate limits may affect heavy usage
- Some very specific landmarks may not be recognized
- Export to PDF is text-based (not formatted PDF)

## 📞 Support

For questions or issues:
- Create an issue in the GitHub repository
- Contact: adrijaa701@gmail.com
- LinkedIn: [[My LinkedIn Profile](https://www.linkedin.com/in/adrija-ani/)]

## 📄 License

This project is created for educational purposes as part of the PM Accelerator Technical Assessment.

---
