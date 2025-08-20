import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const { resetPassword } = useAuthContext();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Quên mật khẩu</h2>
        <p className="text-center text-gray-600 mb-6">
          Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
        </p>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {message && (
            <p className="text-green-500 text-center mb-4">{message}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Gửi yêu cầu
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Nhớ lại mật khẩu?{" "}
          <Link to="/login" className="text-primary-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
