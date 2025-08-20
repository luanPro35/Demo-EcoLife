import { io } from "socket.io-client";

// Get the backend URL from environment variables or use a default
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket() first.");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const subscribeToChat = (callback) => {
  if (!socket) return;

  socket.on("new_message", callback);

  // Return unsubscribe function
  return () => {
    socket.off("new_message", callback);
  };
};

export const sendMessage = (messageData) => {
  if (!socket) return;

  socket.emit("send_message", messageData);
};

export const joinChatRoom = (roomId) => {
  if (!socket) return;

  socket.emit("join_room", roomId);
};

export const leaveChatRoom = (roomId) => {
  if (!socket) return;

  socket.emit("leave_room", roomId);
};

export const subscribeToNotifications = (callback) => {
  if (!socket) return;

  socket.on("new_notification", callback);

  // Return unsubscribe function
  return () => {
    socket.off("new_notification", callback);
  };
};

export const subscribeToActivityFeed = (callback) => {
  if (!socket) return;

  socket.on("new_activity", callback);

  // Return unsubscribe function
  return () => {
    socket.off("new_activity", callback);
  };
};
