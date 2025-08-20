import React from 'react';
import SuggestionList from '../components/suggestions/SuggestionList';

const SuggestionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Gợi ý Eco-Friendly</h1>
      <p className="text-gray-600 mb-6">
        Dưới đây là những gợi ý giúp bạn cải thiện lối sống thân thiện với môi trường và giảm dấu chân carbon.
      </p>
      <SuggestionList />
    </div>
  );
};

export default SuggestionsPage;