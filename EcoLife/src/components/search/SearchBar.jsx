import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, initialValue = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      // If onSearch callback is provided, use it
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        // Otherwise, navigate to search results page
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm sản phẩm, hoạt động, v.v."
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-800"
      >
        <span className="sr-only">Tìm kiếm</span>
      </button>
    </form>
  );
};

export default SearchBar;
