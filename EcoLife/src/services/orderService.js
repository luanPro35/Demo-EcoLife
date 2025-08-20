import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

class OrderService {
  constructor() {
    this.ordersRef = collection(db, "orders");
  }

  // Create a new order
  async createOrder(orderData) {
    try {
      const orderId = doc(collection(db, "orders")).id;
      const order = {
        id: orderId,
        ...orderData,
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "orders", orderId), order);
      return { success: true, orderId };
    } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, error: error.message };
    }
  }

  // Get order by ID
  async getOrder(orderId) {
    try {
      const orderDoc = await getDoc(doc(db, "orders", orderId));
      if (orderDoc.exists()) {
        return { success: true, order: orderDoc.data() };
      }
      return { success: false, error: "Order not found" };
    } catch (error) {
      console.error("Error getting order:", error);
      return { success: false, error: error.message };
    }
  }

  // Get orders by user
  async getUserOrders(userId, limitCount = 50) {
    try {
      const q = query(
        this.ordersRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, orders };
    } catch (error) {
      console.error("Error getting user orders:", error);
      return { success: false, error: error.message };
    }
  }

  // Get all orders (admin only)
  async getAllOrders(limitCount = 100) {
    try {
      const q = query(
        this.ordersRef,
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, orders };
    } catch (error) {
      console.error("Error getting all orders:", error);
      return { success: false, error: error.message };
    }
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status,
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error updating order status:", error);
      return { success: false, error: error.message };
    }
  }

  // Add payment info to order
  async addPaymentInfo(orderId, paymentInfo) {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        paymentInfo,
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error adding payment info:", error);
      return { success: false, error: error.message };
    }
  }

  // Subscribe to real-time order updates
  subscribeToOrders(userId, callback) {
    const q = query(
      this.ordersRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    });
  }

  // Subscribe to all orders (admin only)
  subscribeToAllOrders(callback) {
    const q = query(this.ordersRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    });
  }

  // Cancel order
  async cancelOrder(orderId, reason) {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: "cancelled",
        cancellationReason: reason,
        cancelledAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error cancelling order:", error);
      return { success: false, error: error.message };
    }
  }

  // Process refund
  async processRefund(orderId, refundAmount) {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        refundStatus: "processing",
        refundAmount,
        refundRequestedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error processing refund:", error);
      return { success: false, error: error.message };
    }
  }
}

export default new OrderService();
