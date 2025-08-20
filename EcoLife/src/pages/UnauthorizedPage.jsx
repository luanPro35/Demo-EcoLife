import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Truy cập bị từ chối
        </h1>
        <p className="text-gray-600 mb-6">
          Bạn không có quyền truy cập vào trang này. Nếu bạn tin rằng đây là một
          lỗi, vui lòng liên hệ với quản trị viên.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Quay về trang chủ
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Liên hệ hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
