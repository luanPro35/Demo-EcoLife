import React, { useState, useEffect } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminDashboard = () => {
  // Mock data for admin dashboard
  const [userGrowthData, setUserGrowthData] = useState({
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Người dùng mới",
        data: [12, 19, 15, 25, 30, 28, 35, 40, 45, 50, 55, 60],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Người dùng hoạt động",
        data: [8, 12, 10, 18, 22, 20, 25, 30, 35, 40, 45, 50],
        backgroundColor: "rgba(0, 178, 46, 0.6)",
        borderColor: "rgba(0, 178, 46, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [activityDistributionData, setActivityDistributionData] = useState({
    labels: [
      "Di chuyển xanh",
      "Tiết kiệm năng lượng",
      "Chế độ ăn bền vững",
      "Giảm rác thải",
      "Trồng cây",
      "Tái chế",
    ],
    datasets: [
      {
        label: "Phân bố hoạt động",
        data: [30, 25, 20, 15, 7, 3],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [carbonReductionData, setCarbonReductionData] = useState({
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Tổng lượng carbon giảm (kg CO2)",
        data: [120, 150, 180, 210, 250, 280, 320, 360, 400, 450, 500, 550],
        fill: false,
        borderColor: "rgba(0, 178, 46, 1)",
        tension: 0.1,
      },
    ],
  });

  const [userEngagementData, setUserEngagementData] = useState({
    labels: [
      "Hoạt động hàng ngày",
      "Hoạt động hàng tuần",
      "Hoạt động hàng tháng",
    ],
    datasets: [
      {
        data: [65, 40, 25],
        backgroundColor: [
          "rgba(0, 178, 46, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(0, 178, 46, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tăng trưởng người dùng",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Phân bố hoạt động người dùng",
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Xu hướng giảm carbon toàn hệ thống",
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mức độ tương tác người dùng",
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bảng điều khiển quản trị
        </h1>
        <p className="text-gray-600">Thống kê và phân tích toàn hệ thống</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-6 bg-white rounded-xl shadow-lg">
          <Bar data={userGrowthData} options={barOptions} />
        </div>

        <div className="card p-6 bg-white rounded-xl shadow-lg">
          <Pie data={activityDistributionData} options={pieOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-6 bg-white rounded-xl shadow-lg">
          <Line data={carbonReductionData} options={lineOptions} />
        </div>

        <div className="card p-6 bg-white rounded-xl shadow-lg">
          <Doughnut data={userEngagementData} options={doughnutOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="card p-6 bg-blue-50 border-l-4 border-blue-500 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-blue-100 mr-5">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-base text-gray-600">Tổng người dùng</p>
              <p className="text-2xl font-bold text-gray-800">1,245</p>
              <p className="text-sm text-blue-600">+12% so với tháng trước</p>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-green-50 border-l-4 border-green-500 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-green-100 mr-5">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-base text-gray-600">Tổng carbon giảm</p>
              <p className="text-2xl font-bold text-gray-800">550 kg CO2</p>
              <p className="text-sm text-green-600">+8% so với tháng trước</p>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-yellow-100 mr-5">
              <svg
                className="w-8 h-8 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-base text-gray-600">Hoạt động hoàn thành</p>
              <p className="text-2xl font-bold text-gray-800">3,876</p>
              <p className="text-sm text-yellow-600">+5% so với tháng trước</p>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-purple-50 border-l-4 border-purple-500 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-purple-100 mr-5">
              <svg
                className="w-8 h-8 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-base text-gray-600">Thời gian trung bình</p>
              <p className="text-2xl font-bold text-gray-800">12 ngày</p>
              <p className="text-sm text-purple-600">Duy trì thói quen xanh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
