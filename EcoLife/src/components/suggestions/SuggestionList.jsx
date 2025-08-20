import React from 'react';
import { useAISuggestions } from '../../hooks/useAISuggestions';
import WeatherWidget from '../weather/WeatherWidget';

const SuggestionList = ({ userActivities }) => {
  // Use the AI suggestions hook instead of local state
  const { 
    suggestions, 
    weatherData, 
    loading, 
    error, 
    refreshSuggestions, 
    markSuggestionCompleted 
  } = useAISuggestions();
  
  // Fallback suggestions if AI fails or while loading
  const fallbackSuggestions = [
    {
      id: 1,
      title: 'Giảm sử dụng xe máy',
      description: 'Thay vì sử dụng xe máy, hãy thử đi xe đạp hoặc đi bộ cho những quãng đường ngắn dưới 2km.',
      impact: 'high',
      category: 'transportation'
    },
    {
      id: 2,
      title: 'Sử dụng đèn LED',
      description: 'Thay thế bóng đèn thông thường bằng đèn LED để tiết kiệm năng lượng và giảm lượng khí thải CO2.',
      impact: 'medium',
      category: 'energy'
    },
    {
      id: 3,
      title: 'Giảm tiêu thụ thịt đỏ',
      description: 'Giảm tiêu thụ thịt đỏ và thay thế bằng các nguồn protein thực vật như đậu, đậu phụ hoặc tempeh.',
      impact: 'high',
      category: 'diet'
    },
    {
      id: 4,
      title: 'Tắt thiết bị điện khi không sử dụng',
      description: 'Tắt hoàn toàn các thiết bị điện thay vì để chế độ chờ để tiết kiệm năng lượng.',
      impact: 'medium',
      category: 'energy'
    },
    {
      id: 5,
      title: 'Sử dụng túi vải khi đi mua sắm',
      description: 'Mang theo túi vải khi đi mua sắm để giảm sử dụng túi nhựa dùng một lần.',
      impact: 'low',
      category: 'lifestyle'
    },
  ];

  // Display fallback suggestions if there's an error or no suggestions yet
  const displayedSuggestions = suggestions.length > 0 ? suggestions : fallbackSuggestions;

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactText = (impact) => {
    switch (impact) {
      case 'high':
        return 'Tác động cao';
      case 'medium':
        return 'Tác động trung bình';
      case 'low':
        return 'Tác động thấp';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gợi Ý Lối Sống Xanh</h2>
        <button 
          onClick={refreshSuggestions}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Đang tải...' : 'Làm mới gợi ý'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Có lỗi xảy ra: {error}</p>
        </div>
      )}
      
      {/* Weather Widget */}
      {weatherData && (
        <div className="mb-6">
          <WeatherWidget 
            weatherData={weatherData} 
            loading={loading} 
            onRefresh={refreshSuggestions} 
          />
        </div>
      )}
      
      <div className="space-y-4">
        {loading ? (
          // Loading skeleton
          Array(3).fill().map((_, index) => (
            <div key={`skeleton-${index}`} className="border rounded-lg p-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
              <div className="mt-3 flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))
        ) : (
          displayedSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800">{suggestion.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                {getImpactText(suggestion.impact)}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{suggestion.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">Danh mục: {suggestion.category}</span>
              <button 
                onClick={() => markSuggestionCompleted(suggestion.id)}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                Đánh dấu đã thực hiện
              </button>
            </div>
          </div>
        )))}

      </div>
      
      {/* AI Badge */}
      <div className="mt-8 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          </svg>
          Được hỗ trợ bởi AI
        </span>
      </div>
    </div>
  );
};

export default SuggestionList;