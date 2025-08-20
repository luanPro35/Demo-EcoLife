import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuthContext } from "../../contexts/AuthContext";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useAuthContext();

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);

        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Không thể tải danh sách người dùng");
        setLoading(false);
      }
    };

    if (currentUser && currentUser.role === "admin") {
      fetchUsers();
    }
  }, [currentUser]);

  // Change user role
  const changeUserRole = async (userId, newRole) => {
    try {
      // In a real implementation, this would use Firebase Admin SDK to set custom claims
      // For demo purposes, we'll just update the Firestore document
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, {
        role: newRole,
        updatedAt: new Date(),
      });

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, role: newRole, updatedAt: new Date() }
            : user
        )
      );

      console.log(`User ${userId} role changed to ${newRole}`);
    } catch (err) {
      console.error("Error changing user role:", err);
      setError("Không thể thay đổi vai trò người dùng");
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Truy cập bị từ chối</h2>
          <p>Bạn không có quyền truy cập trang quản lý người dùng.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Quản lý người dùng
        </h1>
        <p className="text-gray-600">
          Quản lý và phân quyền cho người dùng trong hệ thống
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
          <div className="col-span-3">Người dùng</div>
          <div className="col-span-2">Email</div>
          <div className="col-span-2">Vai trò</div>
          <div className="col-span-2">Ngày tạo</div>
          <div className="col-span-2">Đăng nhập gần nhất</div>
          <div className="col-span-1">Hành động</div>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="col-span-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <span className="text-primary-600 font-medium">
                    {(user.displayName || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {user.displayName || "Chưa đặt tên"}
                  </div>
                  <div className="text-sm text-gray-500">{user.id}</div>
                </div>
              </div>
            </div>

            <div className="col-span-2 text-gray-700">{user.email}</div>

            <div className="col-span-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-800"
                    : user.role === "moderator"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.role === "admin" && "Quản trị viên"}
                {user.role === "moderator" && "Điều phối viên"}
                {user.role === "user" && "Người dùng"}
              </span>
            </div>

            <div className="col-span-2 text-gray-600">
              {formatDate(user.createdAt)}
            </div>

            <div className="col-span-2 text-gray-600">
              {formatDate(user.lastLogin)}
            </div>

            <div className="col-span-1">
              {user.id !== currentUser.uid && (
                <select
                  value={user.role}
                  onChange={(e) => changeUserRole(user.id, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                >
                  <option value="user">Người dùng</option>
                  <option value="moderator">Điều phối viên</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Tổng cộng: {users.length} người dùng</p>
      </div>
    </div>
  );
};

export default UserManagementPage;
