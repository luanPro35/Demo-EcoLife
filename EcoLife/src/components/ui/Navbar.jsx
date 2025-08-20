import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
// import { useCartContext } from "../contexts/CartContext";
import Login from "./Login";
import CartIcon from "../cart/CartIcon";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-3xl mr-3">🌱</span>
                <span className="font-bold text-2xl text-primary-600">
                  EcoLife
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-2 pt-1 border-b-2 text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/activity"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-2 pt-1 border-b-2 text-base font-medium"
              >
                Hoạt Động
              </Link>
              <Link
                to="/leaderboard"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-2 pt-1 border-b-2 text-base font-medium"
              >
                Bảng Xếp Hạng
              </Link>
              <Link
                to="/products"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-2 pt-1 border-b-2 text-base font-medium"
              >
                Sản Phẩm
              </Link>
              <Link
                to="/suggestions"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-2 pt-1 border-b-2 text-base font-medium"
              >
                Gợi Ý
              </Link>
              <Link
                to="/badges"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-2 pt-1 border-b-2 text-base font-medium"
              >
                Huy Hiệu
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="mr-4">
              <Link
                to="/cart"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-primary-700 inline-flex items-center px-2 pt-1 border-b-2 text-base font-medium"
              >
                Cart
              </Link>
            </div>
            {user ? (
              <div className="flex items-center">
                {user && (
                  <Link
                    to="/orders"
                    className="text-gray-500 hover:text-primary-700 px-3 py-2 text-sm font-medium"
                  >
                    Đơn hàng
                  </Link>
                )}
                <span className="text-sm text-gray-700 mr-2">
                  Xin chào, {user.displayName || "Người dùng"}
                </span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User profile"
                />
                <button
                  onClick={handleLogout}
                  className="ml-4 text-gray-500 hover:text-primary-700 px-3 py-2 text-sm font-medium"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-500 hover:text-primary-700 px-3 py-2 text-sm font-medium"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="ml-4 btn-primary"
                >
                  Đăng Ký
                </button>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-300 hover:text-gray-800"
            >
              Dashboard
            </Link>
            <Link
              to="/activity"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-300 hover:text-gray-800"
            >
              Hoạt Động
            </Link>
            <Link
              to="/leaderboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-300 hover:text-gray-800"
            >
              Bảng Xếp Hạng
            </Link>
            <Link
              to="/products"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-300 hover:text-gray-800"
            >
              Sản Phẩm
            </Link>
            <Link
              to="/cart"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-300 hover:text-gray-800"
            >
              Giỏ Hàng
            </Link>
            <Link
              to="/suggestions"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-300 hover:text-gray-800"
            >
              Gợi Ý
            </Link>
            <Link
              to="/badges"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-300 hover:text-gray-800"
            >
              Huy Hiệu
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt="User profile"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.displayName || "Người dùng"}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
                <Link
                  to="/orders"
                  className="ml-auto text-gray-500 hover:text-primary-700 px-3 py-2 text-sm font-medium"
                >
                  Đơn hàng
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-primary-700 px-3 py-2 text-sm font-medium"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex flex-col px-4 space-y-3">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="block text-center text-gray-500 hover:text-primary-700 px-3 py-2 text-base font-medium"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="block text-center btn-primary"
                >
                  Đăng Ký
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </nav>
  );
};

export default Navbar;
