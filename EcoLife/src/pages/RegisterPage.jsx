import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const { signUp } = useAuthContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      await signUp(email, password, displayName);
      navigate("/"); // Redirect to home page after successful registration
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="displayName"
            >
              Tên hiển thị
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="displayName"
              type="text"
              placeholder="Nhập tên hiển thị của bạn"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Đăng ký
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-primary-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
