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
  serverTimestamp,
  updateDoc,
  addDoc,
} from "firebase/firestore";

class PaymentService {
  constructor() {
    this.paymentsRef = collection(db, "payments");
    this.transactionsRef = collection(db, "transactions");
  }

  // Initialize payment with different providers
  async initializePayment(paymentData) {
    try {
      const {
        amount,
        currency = "VND",
        provider = "momo",
        orderId,
        userId,
        description,
        items,
      } = paymentData;

      const paymentId = doc(collection(db, "payments")).id;

      const payment = {
        id: paymentId,
        ...paymentData,
        amount,
        currency,
        provider,
        orderId,
        userId,
        description,
        items,
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "payments", paymentId), payment);
      return { success: true, paymentId };
    } catch (error) {
      console.error("Error initializing payment:", error);
      return { success: false, error: error.message };
    }
  }

  // Process Momo payment
  async processMomoPayment(paymentData) {
    try {
      const response = await fetch("/api/payments/momo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          orderId: paymentData.orderId,
          orderInfo: paymentData.description,
          returnUrl: window.location.origin + "/payment/success",
          notifyUrl: window.location.origin + "/api/webhooks/momo",
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error processing Momo payment:", error);
      return { success: false, error: error.message };
    }
  }

  // Process ZaloPay payment
  async processZaloPayPayment(paymentData) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch("/api/payments/zalopay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          orderId: paymentData.orderId,
          description: paymentData.description,
          returnUrl: window.location.origin + "/payment/success",
          cancelUrl: window.location.origin + "/payment/cancel",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result || typeof result !== "object") {
        throw new Error("Invalid response format");
      }

      return result;
    } catch (error) {
      console.error("Error processing ZaloPay payment:", error);

      if (error.name === "AbortError" || error.message.includes("network")) {
        console.log("Retrying ZaloPay payment...");
        return this.processZaloPayPayment(paymentData);
      }

      return { success: false, error: error.message };
    }
  }

  // Process VNPay payment
  async processVNPayPayment(paymentData) {
    try {
      const response = await fetch("/api/payments/vnpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          orderId: paymentData.orderId,
          orderDescription: paymentData.description,
          returnUrl: window.location.origin + "/payment/success",
          ipAddr: window.location.hostname,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error processing VNPay payment:", error);
      return { success: false, error: error.message };
    }
  }

  // Process Stripe payment
  async processStripePayment(paymentData) {
    try {
      const response = await fetch("/api/payments/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: paymentData.currency || "vnd",
          orderId: paymentData.orderId,
          description: paymentData.description,
          successUrl: window.location.origin + "/payment/success",
          cancelUrl: window.location.origin + "/payment/cancel",
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error processing Stripe payment:", error);
      return { success: false, error: error.message };
    }
  }

  // Verify payment status
  async verifyPayment(paymentId, provider) {
    try {
      const response = await fetch(`/api/payments/verify/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      });

      const result = await response.json();

      // Update payment status in database
      if (result.success) {
        await updateDoc(doc(db, "payments", paymentId), {
          status: result.status,
          updatedAt: serverTimestamp(),
        });
      }

      return result;
    } catch (error) {
      console.error("Error verifying payment:", error);
      return { success: false, error: error.message };
    }
  }

  // Get payment history
  async getPaymentHistory(userId, limitCount = 50) {
    try {
      const q = query(
        this.paymentsRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const payments = [];
      querySnapshot.forEach((doc) => {
        payments.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, payments };
    } catch (error) {
      console.error("Error getting payment history:", error);
      return { success: false, error: error.message };
    }
  }

  // Create transaction record
  async createTransaction(transactionData) {
    try {
      const transaction = {
        ...transactionData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(this.transactionsRef, transaction);
      return { success: true, transactionId: docRef.id };
    } catch (error) {
      console.error("Error creating transaction:", error);
      return { success: false, error: error.message };
    }
  }

  // Get transaction details
  async getTransaction(transactionId) {
    try {
      const transactionDoc = await getDoc(
        doc(db, "transactions", transactionId)
      );
      if (transactionDoc.exists()) {
        return { success: true, transaction: transactionDoc.data() };
      }
      return { success: false, error: "Transaction not found" };
    } catch (error) {
      console.error("Error getting transaction:", error);
      return { success: false, error: error.message };
    }
  }

  // Refund payment
  async refundPayment(paymentId, amount, reason) {
    try {
      const response = await fetch("/api/payments/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
          amount,
          reason,
        }),
      });

      const result = await response.json();

      if (result.success) {
        await this.createTransaction({
          type: "refund",
          paymentId,
          amount,
          reason,
          status: "completed",
        });
      }

      return result;
    } catch (error) {
      console.error("Error processing refund:", error);
      return { success: false, error: error.message };
    }
  }

  // Get payment methods available
  getAvailablePaymentMethods() {
    return [
      {
        id: "momo",
        name: "MoMo Wallet",
        icon: "/assets/momo-logo.png",
        description: "Pay with MoMo e-wallet",
        supported: true,
      },
      {
        id: "zalopay",
        name: "ZaloPay",
        icon: "/assets/zalopay-logo.png",
        description: "Pay with ZaloPay e-wallet",
        supported: true,
      },
      {
        id: "vnpay",
        name: "VNPay",
        icon: "/assets/vnpay-logo.png",
        description: "Pay with VNPay gateway",
        supported: true,
      },
      {
        id: "stripe",
        name: "Stripe",
        icon: "/assets/stripe-logo.png",
        description: "Pay with Stripe",
        supported: true,
      },
      {
        id: "cod",
        name: "Cash on Delivery",
        icon: "/assets/cod-logo.png",
        description: "Pay when you receive",
        supported: true,
      },
    ];
  }
}

export default new PaymentService();
