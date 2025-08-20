import React, { useState } from "react";

const Leaderboard = () => {
  // Mock data for leaderboard
  const [leaderboardData, setLeaderboardData] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      points: 2500,
      level: 15,
      badges: 12,
      avatar: "https://via.placeholder.com/50",
      position: 1,
      trend: "up",
    },
    {
      id: 2,
      name: "Trần Thị B",
      points: 2350,
      level: 14,
      badges: 10,
      avatar: "https://via.placeholder.com/50",
      position: 2,
      trend: "up",
    },
    {
      id: 3,
      name: "Lê Văn C",
      points: 2200,
      level: 13,
      badges: 9,
      avatar: "https://via.placeholder.com/50",
      position: 3,
      trend: "down",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      points: 2100,
      level: 12,
      badges: 8,
      avatar: "https://via.placeholder.com/50",
      position: 4,
      trend: "same",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      points: 2000,
      level: 12,
      badges: 7,
      avatar: "https://via.placeholder.com/50",
      position: 5,
      trend: "up",
    },
    {
      id: 6,
      name: "Vũ Thị F",
      points: 1950,
      level: 11,
      badges: 6,
      avatar: "https://via.placeholder.com/50",
      position: 6,
      trend: "down",
    },
    {
      id: 7,
      name: "Đỗ Văn G",
      points: 1800,
      level: 10,
      badges: 5,
      avatar: "https://via.placeholder.com/50",
      position: 7,
      trend: "same",
    },
    {
      id: 8,
      name: "Bùi Thị H",
      points: 1750,
      level: 10,
      badges: 4,
      avatar: "https://via.placeholder.com/50",
      position: 8,
      trend: "up",
    },
  ]);

  const [currentUser, setCurrentUser] = useState({
    id: 9,
    name: "Bạn",
    points: 1500,
    level: 8,
    badges: 3,
    avatar: "https://via.placeholder.com/50",
    position: 12,
    trend: "up",
  });

  const [timeFrame, setTimeFrame] = useState("all"); // all, month, week

  // Filter leaderboard based on time frame
  const filteredLeaderboard = leaderboardData.filter((user) => {
    // In a real app, you would filter based on the time frame
    // For now, we'll just return all users
    return true;
  });

  // Sort leaderboard by points
  const sortedLeaderboard = [...filteredLeaderboard].sort(
    (a, b) => b.points - a.points
  );

  // Add current user to leaderboard if not already there
  const leaderboardWithUser = sortedLeaderboard.some(
    (user) => user.id === currentUser.id
  )
    ? sortedLeaderboard
    : [...sortedLeaderboard, currentUser].sort((a, b) => b.points - a.points);

  const getPositionColor = (position) => {
    switch (position) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200";
      case 3:
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-white text-gray-800 border-gray-200";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return (
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        );
      case "down":
        return (
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14"
            />
          </svg>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bảng xếp hạng</h1>
        <p className="text-gray-600">
          Xem ai là người tích cực nhất trong cộng đồng EcoLife
        </p>
      </div>

      {/* Time frame selector */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeFrame === "all"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } border border-gray-200`}
            onClick={() => setTimeFrame("all")}
          >
            Tất cả
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeFrame === "month"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } border-t border-b border-gray-200`}
            onClick={() => setTimeFrame("month")}
          >
            Tháng này
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeFrame === "week"
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } border border-gray-200`}
            onClick={() => setTimeFrame("week")}
          >
            Tuần này
          </button>
        </div>
      </div>

      {/* Leaderboard list */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
          <div className="col-span-1">Hạng</div>
          <div className="col-span-5">Người dùng</div>
          <div className="col-span-2 text-center">Điểm</div>
          <div className="col-span-2 text-center">Cấp độ</div>
          <div className="col-span-2 text-center">Huy hiệu</div>
        </div>

        {leaderboardWithUser.map((user, index) => (
          <div
            key={user.id}
            className={`grid grid-cols-12 gap-4 p-4 items-center ${
              user.id === currentUser.id ? "bg-blue-50" : "hover:bg-gray-50"
            } ${
              index < leaderboardWithUser.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <div className="col-span-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${getPositionColor(
                  user.position
                )}`}
              >
                {user.position}
              </div>
            </div>
            <div className="col-span-5 flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                {user.id === currentUser.id && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Bạn
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-2 text-center font-medium text-gray-900">
              {user.points.toLocaleString()}
            </div>
            <div className="col-span-2 text-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {user.level}
              </span>
            </div>
            <div className="col-span-2 text-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {user.badges}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* User stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {currentUser.position}
          </div>
          <div className="text-gray-600">Vị trí của bạn</div>
          <div className="mt-2 flex justify-center">
            {getTrendIcon(currentUser.trend)}
            <span className="ml-1 text-sm text-gray-500">
              So với tuần trước
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {currentUser.points.toLocaleString()}
          </div>
          <div className="text-gray-600">Tổng điểm</div>
          <div className="mt-2 text-sm text-gray-500">+250 điểm tuần này</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {currentUser.level}
          </div>
          <div className="text-gray-600">Cấp độ</div>
          <div className="mt-2 text-sm text-gray-500">
            Cần thêm 500 điểm để lên cấp
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
