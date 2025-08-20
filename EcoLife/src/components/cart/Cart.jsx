import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { 
    cartItems, 
    loading, 
    error, 
    clearCart, 
    calculateTotal,
    calculateTotalItems 
  } = useCartContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <Link 
          to="/products" 
          className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Giỏ hàng của bạn ({calculateTotalItems()})</h2>
        <button 
          onClick={clearCart}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Xóa tất cả
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-600">Tổng tiền:</span>
          <span className="text-2xl font-bold text-primary-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotal())}
          </span>
        </div>

        <div className="flex justify-between space-x-4">
          <Link 
            to="/products" 
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex-1 text-center"
          >
            Tiếp tục mua sắm
          </Link>
          <Link 
            to="/checkout" 
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex-1 text-center"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;