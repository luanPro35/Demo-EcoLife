import React from "react";
import { Link } from "react-router-dom";
import Weather from "../components/weather/Weather";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
            <span className="block">Sống xanh hơn</span>
            <span className="block text-primary-600 mt-2">
              vì một tương lai bền vững
            </span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8 md:text-2xl md:max-w-3xl">
            EcoLife giúp bạn theo dõi thói quen hàng ngày và đề xuất những cách
            để sống bền vững hơn, góp phần bảo vệ môi trường.
          </p>
          <div className="mt-8">
            <Weather />
          </div>
          <div className="mt-8 max-w-lg mx-auto sm:flex sm:justify-center md:mt-10">
            <div className="rounded-xl shadow-lg">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 md:py-5 md:text-xl md:px-12"
              >
                Bắt đầu ngay
              </Link>
            </div>
            <div className="mt-4 rounded-xl shadow-lg sm:mt-0 sm:ml-6">
              <Link
                to="/about"
                className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-xl text-primary-600 bg-white hover:bg-gray-50 md:py-5 md:text-xl md:px-12"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-lg text-primary-600 font-semibold tracking-wide uppercase">
              Tính năng
            </h2>
            <p className="mt-3 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Cách tốt hơn để sống xanh
            </p>
            <p className="mt-6 max-w-3xl text-2xl text-gray-500 lg:mx-auto">
              EcoLife cung cấp các công cụ để theo dõi, phân tích và cải thiện
              tác động môi trường của bạn.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 text-white">
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <div className="ml-20">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">
                    Theo dõi hoạt động
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Ghi lại các hoạt động hàng ngày của bạn như di chuyển, tiêu
                    thụ năng lượng và thói quen ăn uống để tính toán carbon
                    footprint.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 text-white">
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="ml-20">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">
                    Phân tích dữ liệu
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Xem biểu đồ và thống kê chi tiết về carbon footprint của bạn
                    theo thời gian và so sánh với mục tiêu.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 text-white">
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div className="ml-20">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">
                    Gợi ý cá nhân hóa
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Nhận các gợi ý cá nhân hóa dựa trên thói quen của bạn để
                    giúp bạn sống bền vững hơn và giảm carbon footprint.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-md bg-primary-500 text-white">
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-20">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">
                    Hệ thống huy hiệu
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Kiếm huy hiệu và thành tích khi bạn đạt được các mục tiêu
                    sống xanh và cải thiện thói quen của mình.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Sẵn sàng bắt đầu?</span>
            <span className="block text-primary-600">
              Đăng ký miễn phí ngay hôm nay.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Đăng ký ngay
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
