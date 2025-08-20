import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import ProductCard from "../components/products/ProductCard"; // Assuming ProductCard is used for display

// Mock search results - replace with actual API call
const mockSearchResults = [
  {
    id: 1,
    name: "Eco-friendly Water Bottle",
    price: 25,
    description: "Reusable and stylish water bottle.",
    imageUrl: "/path/to/bottle.jpg",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 30,
    description: "Soft and sustainable t-shirt.",
    imageUrl: "/path/to/tshirt.jpg",
  },
  {
    id: 3,
    name: "Recycled Notebook",
    price: 10,
    description: "Notebook made from recycled paper.",
    imageUrl: "/path/to/notebook.jpg",
  },
];

const SearchResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (query) {
        const filteredResults = mockSearchResults.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } else {
        setResults([]);
      }
      setLoading(false);
    }, 500); // Simulate network delay
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>
      <SearchBar />

      <div className="mt-8">
        {loading ? (
          <p>Loading results...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
