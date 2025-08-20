import React, { useState, useEffect, useRef } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import { useAuthContext } from "../../contexts/AuthContext";

const NotificationCenter = () => {
  const { isConnected, subscribeToNotifications } = useSocketContext();
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);

  // Subscribe to notifications
  useEffect(() => {
    if (!isConnected || !user) return;

    const unsubscribe = subscribeToNotifications((notification) => {
      // Add new notification to the beginning of the list
      setNotifications((prev) => [
        {
          ...notification,
          id: Date.now(), // Simple ID generation
          read: false,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);

      // Increase unread count
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isConnected, user, subscribeToNotifications]);

  // Close notification center when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
    setUnreadCount(0);
  };

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  // Format time for display
  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) {
      return "Vừa xong";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
    }
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Thông báo</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  Đánh dấu đã đọc tất cả
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>Không có thông báo nào</p>
              </div>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-primary-600 hover:text-primary-800 ml-2"
                        >
                          Đánh dấu đã đọc
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 text-center">
            <button
              className="text-sm text-primary-600 hover:text-primary-800"
              onClick={() => setIsOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
