import React from "react";
import SearchBar from "../components/search/SearchBar";

const SearchPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      <SearchBar />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <p>Search results will appear here.</p>
      </div>
    </div>
  );
};

export default SearchPage;
