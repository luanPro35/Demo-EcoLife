import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { useAuthContext } from "../contexts/AuthContext";

// Import payment components
import PaypalPayment from "../components/payment/PaypalPayment.jsx";
import StripePayment from "../components/payment/StripePayment.jsx";
import MomoPayment from "../components/payment/MomoPayment";

const PaymentPage = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentMethod = searchParams.get("method");
  const { currentUser } = useAuthContext();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, processing, success, failed
  const [paymentError, setPaymentError] = useState(null);

  // Get order details from Firestore
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderRef = doc(db, "orders", orderId);
        const orderDoc = await getDoc(orderRef);

        if (!orderDoc.exists()) {
          setError("Không tìm thấy đơn hàng");
          navigate("/orders");
          return;
        }

        const orderData = { id: orderDoc.id, ...orderDoc.data() };

        // Check if the current user is the owner of this order
        if (orderData.userId !== currentUser?.uid) {
          setError("Bạn không có quyền truy cập đơn hàng này");
          navigate("/orders");
          return;
        }

        setOrder(orderData);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Không thể tải thông tin đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && orderId) {
      fetchOrder();
    } else if (!currentUser) {
      navigate("/login");
    }
  }, [orderId, navigate, currentUser]);

  // Handle payment success
  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      setPaymentStatus("success");

      // Update order status in Firestore
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "paid",
        paymentDetails: paymentDetails,
        updatedAt: new Date(),
      });

      // Redirect to order details page
      setTimeout(() => {
        navigate(`/orders/${orderId}?payment=success`);
      }, 2000);
    } catch (err) {
      console.error("Error updating order status:", err);
      setPaymentError(
        "Thanh toán thành công nhưng không thể cập nhật trạng thái đơn hàng"
      );
    }
  };

  // Handle payment error
  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    setPaymentError(
      error.message || "Có lỗi xảy ra trong quá trình thanh toán"
    );
    setPaymentStatus("failed");
  };

  // Render payment component based on method
  const renderPaymentComponent = () => {
    if (!order) return null;

    switch (paymentMethod) {
      case "paypal":
        return (
          <PaypalPayment
            amount={order.totalAmount}
            orderId={order.id}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        );
      case "stripe":
        return (
          <StripePayment
            amount={order.totalAmount}
            orderId={order.id}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        );
      case "momo":
        return (
          <MomoPayment
            amount={order.totalAmount}
            orderId={order.id}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        );
      default:
        return (
          <div className="text-center p-6">
            <p className="text-red-500">Phương thức thanh toán không hợp lệ</p>
            <button
              onClick={() => navigate(`/orders/${orderId}`)}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Quay lại đơn hàng
            </button>
          </div>
        );
    }
  };
  // Render page content
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Thanh toán đơn hàng
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <p>{error}</p>
            <button
              onClick={() => navigate("/orders")}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Quay lại đơn hàng của tôi
            </button>
          </div>
        ) : (
          <div>
            {order && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Thông tin đơn hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600">Mã đơn hàng:</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ngày đặt hàng:</p>
                    <p className="font-medium">
                      {new Date(order.createdAt?.toDate()).toLocaleDateString(
                        "vi-VN"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tổng tiền:</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.totalAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phương thức thanh toán:</p>
                    <p className="font-medium">
                      {paymentMethod === "paypal" && "PayPal"}
                      {paymentMethod === "stripe" &&
                        "Thẻ tín dụng/ghi nợ (Stripe)"}
                      {paymentMethod === "momo" && "Ví MoMo"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
              {paymentStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-green-600 mb-2">
                    Thanh toán thành công!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Cảm ơn bạn đã mua hàng tại EcoLife. Đơn hàng của bạn đang
                    được xử lý.
                  </p>
                  <button
                    onClick={() => navigate(`/orders/${orderId}`)}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Xem chi tiết đơn hàng
                  </button>
                </div>
              ) : paymentStatus === "failed" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-red-600 mb-2">
                    Thanh toán thất bại
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {paymentError ||
                      "Có lỗi xảy ra trong quá trình thanh toán."}
                  </p>
                  <p className="text-gray-600 mb-6">
                    Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Thử lại
                    </button>
                    <button
                      onClick={() => navigate(`/checkout?orderId=${orderId}`)}
                      className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Quay lại thanh toán
                    </button>
                  </div>
                </div>
              ) : (
                renderPaymentComponent()
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
