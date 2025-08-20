import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-3">${product.price.toFixed(2)}</p>
      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
      <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-300 ease-in-out">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
