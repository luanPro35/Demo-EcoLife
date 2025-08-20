// OpenAI API service for AI-powered suggestions
import { auth } from './firebase';

// OpenAI API configuration
const OPENAI_API_URL = 'https://api.openai.com/v1';

// This should be stored securely in environment variables in a production app
// For demo purposes, we're including a placeholder
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

/**
 * Get AI-powered suggestions based on user data and preferences
 * @param {Object} options - Options for generating suggestions
 * @returns {Promise<Array>} - Array of suggestions
 */
export const getAISuggestions = async (options = {}) => {
  try {
    // Ensure user is authenticated
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to get AI suggestions');
    }

    // For demo purposes, return mock suggestions
    // In a real app, this would make an API call to OpenAI
    return getMockSuggestions(options);
    
    // Uncomment below to implement actual OpenAI API call
    /*
    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an eco-friendly product recommendation assistant.'
          },
          {
            role: 'user',
            content: `Suggest eco-friendly products based on these preferences: ${JSON.stringify(options)}`
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return parseSuggestionsFromResponse(data);
    */
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return [];
  }
};

/**
 * Parse suggestions from OpenAI API response
 * @param {Object} response - OpenAI API response
 * @returns {Array} - Formatted suggestions
 */
const parseSuggestionsFromResponse = (response) => {
  try {
    const content = response.choices[0].message.content;
    // This assumes the AI returns a formatted list that can be parsed
    // In practice, you might need more sophisticated parsing
    const suggestions = content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => {
        // Remove list markers and clean up
        return line.replace(/^\d+\.\s*|^-\s*/, '').trim();
      });
    
    return suggestions;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return [];
  }
};

/**
 * Get mock suggestions for demo purposes
 * @param {Object} options - Options for generating suggestions
 * @returns {Array} - Mock suggestions
 */
const getMockSuggestions = (options) => {
  const { category, preferences = [], weatherData } = options;
  
  const suggestions = [
    {
      id: '1',
      title: 'Bamboo Toothbrush Set',
      description: 'Replace plastic toothbrushes with these biodegradable bamboo alternatives.',
      category: 'personal-care',
      tags: ['plastic-free', 'biodegradable', 'bathroom']
    },
    {
      id: '2',
      title: 'Reusable Produce Bags',
      description: 'Stop using plastic produce bags with these washable mesh alternatives.',
      category: 'kitchen',
      tags: ['plastic-free', 'reusable', 'shopping']
    },
    {
      id: '3',
      title: 'Solar Power Bank',
      description: 'Charge your devices with clean solar energy wherever you go.',
      category: 'electronics',
      tags: ['renewable-energy', 'travel', 'gadgets']
    },
    {
      id: '4',
      title: 'Compostable Phone Case',
      description: 'Protect your phone with a case that will not end up in a landfill.',
      category: 'electronics',
      tags: ['biodegradable', 'phone-accessories']
    },
    {
      id: '5',
      title: 'Beeswax Food Wraps',
      description: 'Replace plastic wrap with these reusable, natural food wraps.',
      category: 'kitchen',
      tags: ['plastic-free', 'reusable', 'food-storage']
    }
  ];
  
  // Filter by category if provided
  let filtered = suggestions;
  if (category) {
    filtered = filtered.filter(item => item.category === category);
  }
  
  // Filter by preferences if provided
  if (preferences.length > 0) {
    filtered = filtered.filter(item => {
      return preferences.some(pref => 
        item.tags.includes(pref) || 
        item.category.includes(pref) ||
        item.title.toLowerCase().includes(pref.toLowerCase())
      );
    });
  }
  
  // If we have weather data, prioritize weather-appropriate items
  if (weatherData) {
    // This would be more sophisticated in a real app
    const temp = weatherData.main?.temp || 20;
    
    // Simple example: prioritize different items based on temperature
    if (temp > 25) {
      // Move cooling/summer items to the top
      filtered.sort((a, b) => {
        const aIsSummer = a.tags.includes('summer') ? -1 : 0;
        const bIsSummer = b.tags.includes('summer') ? -1 : 0;
        return bIsSummer - aIsSummer;
      });
    } else if (temp < 10) {
      // Move warming/winter items to the top
      filtered.sort((a, b) => {
        const aIsWinter = a.tags.includes('winter') ? -1 : 0;
        const bIsWinter = b.tags.includes('winter') ? -1 : 0;
        return bIsWinter - aIsWinter;
      });
    }
  }
  
  return filtered;
};