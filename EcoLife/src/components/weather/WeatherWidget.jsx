import React from 'react';

/**
 * Weather widget component that displays current weather data
 * @param {Object} props - Component props
 * @param {Object} props.weatherData - Weather data from OpenWeather API
 * @param {boolean} props.loading - Loading state
 * @param {function} props.onRefresh - Function to refresh weather data
 * @returns {JSX.Element} - Weather widget component
 */
const WeatherWidget = ({ weatherData, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-gray-600">Dữ liệu thời tiết không khả dụng</p>
        <button 
          onClick={onRefresh}
          className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          Tải lại
        </button>
      </div>
    );
  }

  // Get weather icon class based on condition
  const getWeatherIconClass = (conditionMain) => {
    switch (conditionMain) {
      case 'clear':
        return 'text-yellow-500';
      case 'clouds':
        return 'text-gray-400';
      case 'rain':
      case 'drizzle':
        return 'text-blue-400';
      case 'thunderstorm':
        return 'text-purple-500';
      case 'snow':
        return 'text-blue-200';
      case 'mist':
      case 'fog':
        return 'text-gray-300';
      default:
        return 'text-gray-500';
    }
  };

  // Get weather icon based on condition
  const getWeatherIcon = (conditionMain) => {
    switch (conditionMain) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'drizzle':
        return '🌦️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      case 'mist':
      case 'fog':
        return '🌫️';
      default:
        return '🌡️';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {weatherData.cityName}, {weatherData.country}
          </h3>
          <div className="flex items-center mt-1">
            <span className={`text-4xl ${getWeatherIconClass(weatherData.conditionMain)}`}>
              {getWeatherIcon(weatherData.conditionMain)}
            </span>
            <span className="text-3xl font-bold ml-2">{weatherData.temp}°C</span>
          </div>
          <p className="text-gray-600 capitalize mt-1">{weatherData.conditions}</p>
        </div>
        
        <div>
          <img 
            src={weatherData.conditionIcon} 
            alt={weatherData.conditions}
            className="w-16 h-16" 
          />
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Cảm giác như:</span>
          <span className="ml-1 font-medium">{weatherData.feelsLike}°C</span>
        </div>
        <div>
          <span className="text-gray-500">Độ ẩm:</span>
          <span className="ml-1 font-medium">{weatherData.humidity}%</span>
        </div>
        <div>
          <span className="text-gray-500">Gió:</span>
          <span className="ml-1 font-medium">{weatherData.windSpeed} km/h</span>
        </div>
        <div>
          <span className="text-gray-500">Cập nhật:</span>
          <span className="ml-1 font-medium">
            {new Date(weatherData.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button 
          onClick={onRefresh}
          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          Cập nhật dữ liệu
        </button>
      </div>
    </div>
  );
};

export default WeatherWidget;