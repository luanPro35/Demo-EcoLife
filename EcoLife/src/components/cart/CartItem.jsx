import React from 'react';
import { useCartContext } from '../../contexts/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartContext();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="py-6 flex flex-col sm:flex-row">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0">
        <img 
          src={item.image || 'https://via.placeholder.com/150'} 
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-1 ml-0 sm:ml-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
          <p className="font-semibold text-primary-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
          </p>
        </div>
        
        {item.variant && (
          <p className="text-sm text-gray-600 mt-1">Phân loại: {item.variant}</p>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border rounded-md">
            <button 
              onClick={handleDecrement}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <input 
              type="number" 
              min="1" 
              value={item.quantity} 
              onChange={handleQuantityChange}
              className="w-12 text-center border-0 focus:ring-0"
            />
            <button 
              onClick={handleIncrement}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-2">
          Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;