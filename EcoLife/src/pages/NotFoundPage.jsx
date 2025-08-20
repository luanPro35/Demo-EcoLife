import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Trang không tìm thấy</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;