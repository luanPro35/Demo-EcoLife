// OpenWeather API service for weather data
import { auth } from './firebase';

// OpenWeather API configuration
const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

// This should be stored securely in environment variables in a production app
// For demo purposes, we're including it directly in the code
const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';

/**
 * Get current weather data for a location
 * @param {Object} location - Location object with lat and lon or city name
 * @returns {Promise<Object>} - Weather data
 */
export const getCurrentWeather = async (location) => {
  try {
    // Ensure user is authenticated
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to get weather data');
    }

    let url;
    
    // Check if location has coordinates
    if (location.lat && location.lon) {
      url = `${OPENWEATHER_API_URL}/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${OPENWEATHER_API_KEY}&lang=vi`;
    } 
    // Otherwise use city name
    else if (location.city) {
      url = `${OPENWEATHER_API_URL}/weather?q=${encodeURIComponent(location.city)}&units=metric&appid=${OPENWEATHER_API_KEY}&lang=vi`;
    } else {
      throw new Error('Invalid location data. Provide either coordinates or city name.');
    }
    
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenWeather API error: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return formatWeatherData(data);
  } catch (error) {
    console.error('Error getting weather data:', error);
    throw error;
  }
};

/**
 * Get weather-based eco suggestions
 * @param {Object} weatherData - Current weather data
 * @returns {Array} - Array of eco suggestions based on weather
 */
export const getWeatherBasedSuggestions = (weatherData) => {
  if (!weatherData) return [];
  
  const suggestions = [];
  const { temp, conditions, humidity, windSpeed } = weatherData;
  
  // Add suggestions based on temperature
  if (temp > 30) {
    suggestions.push({
      id: 'weather-1',
      title: 'Tiết kiệm điện điều hòa',
      description: 'Đặt nhiệt độ điều hòa ở 26-27°C và sử dụng quạt để tiết kiệm điện trong thời tiết nóng.',
      impact: 'high',
      category: 'energy',
      weatherBased: true
    });
  } else if (temp < 18) {
    suggestions.push({
      id: 'weather-2',
      title: 'Sử dụng ánh sáng tự nhiên',
      description: 'Mở rèm cửa để tận dụng ánh sáng và nhiệt từ mặt trời, giảm nhu cầu sưởi ấm và chiếu sáng.',
      impact: 'medium',
      category: 'energy',
      weatherBased: true
    });
  }
  
  // Add suggestions based on weather conditions
  if (conditions.includes('rain') || conditions.includes('drizzle')) {
    suggestions.push({
      id: 'weather-3',
      title: 'Thu thập nước mưa',
      description: 'Đặt thùng chứa để thu thập nước mưa, có thể sử dụng để tưới cây hoặc rửa sân vườn.',
      impact: 'medium',
      category: 'lifestyle',
      weatherBased: true
    });
  } else if (conditions.includes('clear')) {
    suggestions.push({
      id: 'weather-4',
      title: 'Phơi quần áo tự nhiên',
      description: 'Tận dụng thời tiết nắng đẹp để phơi quần áo tự nhiên thay vì sử dụng máy sấy.',
      impact: 'medium',
      category: 'energy',
      weatherBased: true
    });
  }
  
  // Add suggestion based on wind speed
  if (windSpeed > 15) {
    suggestions.push({
      id: 'weather-5',
      title: 'Tắt điều hòa khi gió mạnh',
      description: 'Tận dụng gió tự nhiên bằng cách mở cửa sổ và tắt điều hòa khi có gió mạnh.',
      impact: 'medium',
      category: 'energy',
      weatherBased: true
    });
  }
  
  return suggestions;
};

/**
 * Format raw weather data into a more usable structure
 * @param {Object} data - Raw weather data from OpenWeather API
 * @returns {Object} - Formatted weather data
 */
const formatWeatherData = (data) => {
  return {
    cityName: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    conditions: data.weather[0].description,
    conditionIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    conditionMain: data.weather[0].main.toLowerCase(),
    timestamp: new Date(data.dt * 1000).toISOString(),
  };
};