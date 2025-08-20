import React, { useState } from "react";

const Badges = () => {
  // Mock data - would be replaced with actual user badges from Firebase
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "Người Mới Bắt Đầu",
      description: "Hoàn thành đăng ký và nhập hoạt động đầu tiên",
      icon: "🌱",
      earned: true,
      earnedDate: "2023-06-15",
      category: "beginner",
    },
    {
      id: 2,
      name: "Người Đi Xe Đạp",
      description: "Sử dụng xe đạp làm phương tiện di chuyển 10 lần",
      icon: "🚲",
      earned: true,
      earnedDate: "2023-06-28",
      category: "transportation",
    },
    {
      id: 3,
      name: "Người Tiết Kiệm Năng Lượng",
      description: "Giảm 20% lượng điện tiêu thụ trong một tháng",
      icon: "💡",
      earned: true,
      earnedDate: "2023-07-10",
      category: "energy",
    },
    {
      id: 4,
      name: "Người Ăn Chay",
      description: "Duy trì chế độ ăn chay trong 7 ngày liên tiếp",
      icon: "🥗",
      earned: false,
      progress: 4,
      total: 7,
      category: "diet",
    },
    {
      id: 5,
      name: "Người Giảm Rác Thải",
      description: "Không sử dụng đồ nhựa dùng một lần trong 14 ngày",
      icon: "♻️",
      earned: false,
      progress: 8,
      total: 14,
      category: "waste",
    },
    {
      id: 6,
      name: "Người Truyền Cảm Hứng",
      description: "Mời 5 người bạn tham gia ứng dụng",
      icon: "🌟",
      earned: false,
      progress: 2,
      total: 5,
      category: "social",
    },
    {
      id: 7,
      name: "Chuyên Gia Xanh",
      description: "Duy trì thói quen xanh trong 30 ngày liên tiếp",
      icon: "🏆",
      earned: false,
      progress: 18,
      total: 30,
      category: "expert",
    },
    {
      id: 8,
      name: "Người Bảo Vệ Trái Đất",
      description: "Giảm carbon footprint xuống dưới 50% so với mức trung bình",
      icon: "🌍",
      earned: true,
      earnedDate: "2023-08-05",
      category: "environment",
    },
  ]);

  const [filter, setFilter] = useState("all"); // all, earned, not-earned

  const filteredBadges = badges.filter((badge) => {
    if (filter === "all") return true;
    if (filter === "earned") return badge.earned;
    if (filter === "not-earned") return !badge.earned;
    return true;
  });

  const getCategoryColor = (category) => {
    const colors = {
      beginner: "bg-blue-100 text-blue-800",
      transportation: "bg-green-100 text-green-800",
      energy: "bg-yellow-100 text-yellow-800",
      diet: "bg-red-100 text-red-800",
      waste: "bg-purple-100 text-purple-800",
      social: "bg-pink-100 text-pink-800",
      expert: "bg-indigo-100 text-indigo-800",
      environment: "bg-teal-100 text-teal-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Huy Hiệu Của Bạn</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === "all"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("earned")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === "earned"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Đã đạt
          </button>
          <button
            onClick={() => setFilter("not-earned")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === "not-earned"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Đang tiến
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`border rounded-lg p-4 text-center transition-all duration-300 hover:shadow-md ${
              badge.earned
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="text-4xl mb-2">{badge.icon}</div>
            <h3 className="font-semibold text-gray-800">{badge.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{badge.description}</p>

            <div className="mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                  badge.category
                )}`}
              >
                {badge.category === "beginner" && "Người mới"}
                {badge.category === "transportation" && "Di chuyển"}
                {badge.category === "energy" && "Năng lượng"}
                {badge.category === "diet" && "Chế độ ăn"}
                {badge.category === "waste" && "Rác thải"}
                {badge.category === "social" && "Xã hội"}
                {badge.category === "expert" && "Chuyên gia"}
                {badge.category === "environment" && "Môi trường"}
              </span>
            </div>

            {badge.earned ? (
              <div className="mt-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Đã đạt được
                <span className="ml-1">({badge.earnedDate})</span>
              </div>
            ) : (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-500 h-2.5 rounded-full"
                    style={{
                      width: `${(badge.progress / badge.total) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {badge.progress}/{badge.total}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Badge statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {badges.filter((b) => b.earned).length}
          </div>
          <div className="text-gray-600">Huy hiệu đã đạt</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {badges.filter((b) => !b.earned).length}
          </div>
          <div className="text-gray-600">Huy hiệu đang tiến</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {Math.round(
              (badges.filter((b) => b.earned).length / badges.length) * 100
            )}
            %
          </div>
          <div className="text-gray-600">Tỷ lệ hoàn thành</div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
