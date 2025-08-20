import { useState, useEffect } from 'react';
import { getAISuggestions } from '../services/openai';
import { getCurrentWeather, getWeatherBasedSuggestions } from '../services/weather';
import { useAuthContext } from '../contexts/AuthContext';
import { useActivities } from './useActivities';

/**
 * Hook to manage AI-powered suggestions and weather-based recommendations
 * @param {Object} options - Configuration options
 * @returns {Object} - Suggestions data and functions
 */
export const useAISuggestions = (options = {}) => {
  const { user } = useAuthContext();
  const { activities } = useActivities();
  
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  
  // Default options
  const {
    includeWeatherSuggestions = true,
    refreshInterval = 3600000, // 1 hour in milliseconds
    location = { city: 'Hanoi', country: 'VN' }, // Default location
    maxSuggestions = 10
  } = options;

  /**
   * Fetch AI suggestions based on user data
   */
  const fetchAISuggestions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Prepare user data for AI suggestions
      const userData = {
        activities,
        preferences: user.preferences || {},
        location: location
      };
      
      // Get AI suggestions
      const aiSuggestions = await getAISuggestions(userData);
      
      // Update suggestions
      setSuggestions(prevSuggestions => {
        // Filter out old AI suggestions
        const filteredSuggestions = prevSuggestions.filter(s => !s.isAIGenerated);
        // Add new AI suggestions
        return [...filteredSuggestions, ...aiSuggestions];
      });
      
      setLastFetched(new Date());
    } catch (err) {
      console.error('Error fetching AI suggestions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch weather data and generate weather-based suggestions
   */
  const fetchWeatherData = async () => {
    if (!user || !includeWeatherSuggestions) return;
    
    try {
      // Get current weather data
      const weather = await getCurrentWeather(location);
      setWeatherData(weather);
      
      // Generate weather-based suggestions
      const weatherSuggestions = getWeatherBasedSuggestions(weather);
      
      // Update suggestions
      setSuggestions(prevSuggestions => {
        // Filter out old weather-based suggestions
        const filteredSuggestions = prevSuggestions.filter(s => !s.weatherBased);
        // Add new weather-based suggestions
        return [...filteredSuggestions, ...weatherSuggestions];
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      // Don't set error state here to avoid blocking AI suggestions
    }
  };

  /**
   * Refresh all suggestions (AI and weather-based)
   */
  const refreshSuggestions = async () => {
    await Promise.all([
      fetchAISuggestions(),
      fetchWeatherData()
    ]);
  };

  /**
   * Mark a suggestion as completed
   * @param {string} suggestionId - ID of the suggestion to mark as completed
   */
  const markSuggestionCompleted = (suggestionId) => {
    setSuggestions(prevSuggestions => 
      prevSuggestions.filter(s => s.id !== suggestionId)
    );
    
    // In a real app, you would also save this to the user's profile
    // or a database to track completed suggestions
  };

  // Fetch suggestions on initial load and when dependencies change
  useEffect(() => {
    if (user) {
      refreshSuggestions();
    }
  }, [user, activities]);

  // Set up periodic refresh based on refreshInterval
  useEffect(() => {
    if (!user) return;
    
    const intervalId = setInterval(() => {
      refreshSuggestions();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [user, refreshInterval]);

  // Limit the number of suggestions
  const limitedSuggestions = suggestions.slice(0, maxSuggestions);

  return {
    suggestions: limitedSuggestions,
    weatherData,
    loading,
    error,
    lastFetched,
    refreshSuggestions,
    markSuggestionCompleted
  };
};