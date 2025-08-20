import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { useCartContext } from './CartContext';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { clearCart } = useCartContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load orders from API or localStorage on mount
  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  // Fetch user orders from API
  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // In a real app, this would be an API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
      // const data = await response.json();
      // setOrders(data);

      // For now, we'll use localStorage as a mock
      const savedOrders = localStorage.getItem(`orders_${user.uid}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Không thể tải đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new order
  const createOrder = async (orderData) => {
    if (!user) {
      setError('Bạn cần đăng nhập để đặt hàng');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      // Generate a unique order ID
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create new order object
      const newOrder = {
        id: orderId,
        userId: user.uid,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // In a real app, this would be an API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newOrder),
      // });
      // const data = await response.json();

      // For now, we'll use localStorage as a mock
      const updatedOrders = [...orders, newOrder];
      setOrders(updatedOrders);
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(updatedOrders));

      // Clear the cart after successful order
      clearCart();

      return newOrder;
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Không thể tạo đơn hàng. Vui lòng thử lại.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    if (!user) return false;

    try {
      setLoading(true);
      setError(null);

      // In a real app, this would be an API call
      // await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ status: 'cancelled' }),
      // });

      // For now, we'll update localStorage
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() } 
          : order
      );
      
      setOrders(updatedOrders);
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(updatedOrders));

      return true;
    } catch (err) {
      console.error('Error cancelling order:', err);
      setError('Không thể hủy đơn hàng. Vui lòng thử lại.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get order by ID
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId) || null;
  };

  const value = {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    cancelOrder,
    getOrderById,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};