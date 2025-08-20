import { useState, useEffect, useCallback } from "react";
// import momoLogo from '../../assets/images/momo-logo.png';

const MomoPayment = ({ amount, orderId, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Create Momo payment request
  useEffect(() => {
    const createMomoPayment = async () => {
      try {
        setLoading(true);

        // Call API to create Momo payment
        const response = await fetch("/api/create-momo-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            orderId,
            orderInfo: `Thanh toán đơn hàng #${orderId} - EcoLife`,
            returnUrl:
              window.location.origin +
              `/payment/callback?orderId=${orderId}&method=momo`,
            notifyUrl: window.location.origin + "/api/momo-callback",
          }),
        });

        if (!response.ok) {
          throw new Error("Không thể tạo yêu cầu thanh toán Momo");
        }

        const data = await response.json();

        if (data.qrCodeUrl) {
          setQrCode(data.qrCodeUrl);
        }

        if (data.payUrl) {
          setPaymentUrl(data.payUrl);
        }

        // Start checking payment status
        startCheckingPaymentStatus(orderId);
      } catch (err) {
        console.error("Momo payment error:", err);
        onError({
          message: "Không thể khởi tạo thanh toán Momo",
          details: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    createMomoPayment();
  }, [amount, orderId, onError, startCheckingPaymentStatus]);

  // Check payment status periodically
  const startCheckingPaymentStatus = useCallback(
    (orderId) => {
      setCheckingStatus(true);

      const checkInterval = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/check-payment-status?orderId=${orderId}&method=momo`
          );

          if (!response.ok) {
            throw new Error("Không thể kiểm tra trạng thái thanh toán");
          }

          const data = await response.json();

          if (data.status === "success") {
            clearInterval(checkInterval);
            setCheckingStatus(false);
            onSuccess(data.paymentDetails);
          } else if (data.status === "failed") {
            clearInterval(checkInterval);
            setCheckingStatus(false);
            onError({
              message: "Thanh toán thất bại",
              details:
                data.message ||
                "Vui lòng thử lại hoặc chọn phương thức thanh toán khác",
            });
          }
          // Continue checking if status is 'pending'
        } catch (err) {
          console.error("Error checking payment status:", err);
          // Don't stop checking on error, just log it
        }
      }, 5000); // Check every 5 seconds

      // Clean up interval
      return () => clearInterval(checkInterval);
    },
    [setCheckingStatus, onSuccess, onError]
  );

  // Handle redirect to Momo app/website
  const handleMomoRedirect = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
        <p className="text-gray-600">Đang khởi tạo thanh toán Momo...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-6">
          {/* Momo logo placeholder */}
          <div className="h-12 w-12 bg-gray-300 rounded flex items-center justify-center text-gray-600">
            Momo
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Thanh toán qua Momo
          </h3>
          <p className="text-gray-600">
            Số tiền:{" "}
            <span className="font-medium">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(amount)}
            </span>
          </p>
        </div>

        {qrCode && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2 text-center">
              Quét mã QR bằng ứng dụng Momo
            </p>
            <div className="flex justify-center">
              <img src={qrCode} alt="Momo QR Code" className="h-64 w-64" />
            </div>
          </div>
        )}

        {paymentUrl && (
          <button
            onClick={handleMomoRedirect}
            className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            Thanh toán với Momo
          </button>
        )}

        {checkingStatus && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              Đang kiểm tra trạng thái thanh toán...
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Lưu ý: Vui lòng không đóng trang này cho đến khi thanh toán hoàn tất
          </p>
        </div>
      </div>
    </div>
  );
};

export default MomoPayment;
