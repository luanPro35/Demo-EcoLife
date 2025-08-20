import React, { useState } from "react";

const PointsRewards = () => {
  // Mock data for user points and rewards
  const [userPoints, setUserPoints] = useState({
    total: 1500,
    weekly: 250,
    monthly: 800,
  });

  const [rewards, setRewards] = useState([
    {
      id: 1,
      title: "Giảm 10% cho đơn hàng tiếp theo",
      points: 500,
      description: "Sử dụng điểm để nhận giảm giá cho các sản phẩm xanh",
      claimed: false,
      icon: "🎟️",
    },
    {
      id: 2,
      title: "Miễn phí vận chuyển",
      points: 300,
      description: "Miễn phí vận chuyển cho đơn hàng từ 500.000đ",
      claimed: true,
      icon: "🚚",
    },
    {
      id: 3,
      title: "Sản phẩm thân thiện môi trường",
      points: 1000,
      description: "Nhận một sản phẩm thân thiện môi trường miễn phí",
      claimed: false,
      icon: "🎁",
    },
    {
      id: 4,
      title: "Thẻ thành viên VIP",
      points: 2000,
      description: "Thẻ thành viên VIP với nhiều ưu đãi đặc biệt",
      claimed: false,
      icon: "💳",
    },
  ]);

  const handleClaimReward = (rewardId) => {
    if (userPoints.total >= rewards.find((r) => r.id === rewardId).points) {
      setRewards((prev) =>
        prev.map((reward) =>
          reward.id === rewardId ? { ...reward, claimed: true } : reward
        )
      );

      setUserPoints((prev) => ({
        ...prev,
        total: prev.total - rewards.find((r) => r.id === rewardId).points,
      }));
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Điểm thưởng & Phần thưởng
        </h1>
        <p className="text-gray-600">
          Kiếm điểm bằng cách thực hiện các hoạt động xanh và đổi điểm lấy phần
          thưởng
        </p>
      </div>

      {/* Points summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {userPoints.total.toLocaleString()}
          </div>
          <div className="text-gray-600">Tổng điểm</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {userPoints.weekly.toLocaleString()}
          </div>
          <div className="text-gray-600">Điểm tuần này</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {userPoints.monthly.toLocaleString()}
          </div>
          <div className="text-gray-600">Điểm tháng này</div>
        </div>
      </div>

      {/* How to earn points */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Cách kiếm điểm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mr-3">🚲</div>
            <div>
              <h3 className="font-medium text-gray-900">Đi xe đạp</h3>
              <p className="text-sm text-gray-600">+10 điểm mỗi km</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mr-3">💡</div>
            <div>
              <h3 className="font-medium text-gray-900">Tiết kiệm điện</h3>
              <p className="text-sm text-gray-600">+5 điểm mỗi kWh tiết kiệm</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl mr-3">🥗</div>
            <div>
              <h3 className="font-medium text-gray-900">Ăn chay</h3>
              <p className="text-sm text-gray-600">+20 điểm mỗi bữa</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mr-3">♻️</div>
            <div>
              <h3 className="font-medium text-gray-900">Tái chế</h3>
              <p className="text-sm text-gray-600">
                +15 điểm mỗi kg rác tái chế
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Đổi điểm lấy phần thưởng
        </h2>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                reward.claimed
                  ? "bg-gray-100 border-gray-200"
                  : userPoints.total >= reward.points
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4">{reward.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900">{reward.title}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {reward.points.toLocaleString()} điểm
                    </span>
                  </div>
                </div>
              </div>

              <div>
                {reward.claimed ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Đã đổi
                  </span>
                ) : userPoints.total >= reward.points ? (
                  <button
                    onClick={() => handleClaimReward(reward.id)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Đổi điểm
                  </button>
                ) : (
                  <div className="text-right">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{
                          width: `${getProgressPercentage(
                            userPoints.total,
                            reward.points
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      Còn thiếu {reward.points - userPoints.total} điểm
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points history */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Lịch sử điểm</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Đi xe đạp 5km</p>
              <p className="text-sm text-gray-600">15/08/2023 08:30</p>
            </div>
            <span className="font-medium text-green-600">+50 điểm</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Tiết kiệm 2kWh điện</p>
              <p className="text-sm text-gray-600">14/08/2023 19:15</p>
            </div>
            <span className="font-medium text-green-600">+10 điểm</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Ăn chay 3 bữa</p>
              <p className="text-sm text-gray-600">14/08/2023 12:00</p>
            </div>
            <span className="font-medium text-green-600">+60 điểm</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Tái chế 1kg rác</p>
              <p className="text-sm text-gray-600">13/08/2023 10:45</p>
            </div>
            <span className="font-medium text-green-600">+15 điểm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsRewards;
