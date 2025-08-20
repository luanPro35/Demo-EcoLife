import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
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
} from 'chart.js';

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

const Dashboard = () => {
  // Mock data - would be replaced with actual user data from Firebase
  const [carbonData, setCarbonData] = useState({
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'Carbon Footprint (kg CO2)',
        data: [5.2, 4.8, 6.1, 3.9, 4.5, 2.8, 3.2],
        backgroundColor: 'rgba(0, 178, 46, 0.6)',
        borderColor: 'rgba(0, 178, 46, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [habitData, setHabitData] = useState({
    labels: ['Di chuyển xanh', 'Tiết kiệm năng lượng', 'Chế độ ăn bền vững', 'Giảm rác thải'],
    datasets: [
      {
        label: 'Tỷ lệ thói quen xanh',
        data: [65, 40, 80, 55],
        backgroundColor: [
          'rgba(0, 178, 46, 0.6)',
          'rgba(0, 196, 224, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(0, 178, 46, 1)',
          'rgba(0, 196, 224, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [monthlyData, setMonthlyData] = useState({
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        label: 'Carbon Footprint (kg CO2)',
        data: [150, 140, 135, 120, 110, 105, 100, 95, 90, 85, 80, 75],
        fill: false,
        borderColor: 'rgba(0, 178, 46, 1)',
        tension: 0.1
      },
    ],
  });

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Carbon Footprint Hàng Ngày',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tỷ Lệ Thói Quen Xanh',
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Xu Hướng Carbon Footprint Theo Tháng',
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Carbon Footprint Hàng Ngày</h3>
          <Bar data={carbonData} options={barOptions} />
        </div>
        
        <div className="card p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tỷ Lệ Thói Quen Xanh</h3>
          <Pie data={habitData} options={pieOptions} />
        </div>
      </div>
      
      <div className="card p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Xu Hướng Carbon Footprint Theo Tháng</h3>
        <Line data={monthlyData} options={lineOptions} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card p-6 bg-green-50 border-l-4 border-green-500 rounded-xl shadow-md">
          <div className="flex items-center">
            <div className="p-4 rounded-full bg-green-100 mr-5">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p className="text-base text-gray-600">Carbon Footprint Hôm Nay</p>
              <p className="text-2xl font-bold text-gray-800">3.2 kg CO2</p>
              <p className="text-sm text-green-600">-12% so với trung bình</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Điểm Số Hiện Tại</p>
              <p className="text-xl font-bold text-gray-800">785 điểm</p>
              <p className="text-xs text-blue-600">+45 điểm tuần này</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-yellow-50 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Huy Hiệu Đạt Được</p>
              <p className="text-xl font-bold text-gray-800">8 huy hiệu</p>
              <p className="text-xs text-yellow-600">2 huy hiệu mới</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;