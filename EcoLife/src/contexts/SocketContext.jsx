import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import {
  initSocket,
  getSocket,
  disconnectSocket,
  subscribeToChat,
  subscribeToNotifications as socketSubscribeToNotifications,
  subscribeToActivityFeed,
  joinChatRoom,
  leaveChatRoom,
} from "../services/socket";

// Create the context
const SocketContext = createContext(null);

// Create a provider component
export const SocketProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [isConnected, setIsConnected] = useState(false);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    if (!user) {
      // If no user, disconnect socket
      disconnectSocket();
      setIsConnected(false);
      return;
    }

    try {
      // Initialize socket connection
      const socket = initSocket();

      // Set up connection event listeners
      socket.on("connect", () => {
        console.log("Socket connected");
        setIsConnected(true);
        setSocketError(null);

        // Authenticate the user with the socket server
        socket.emit("authenticate", { userId: user.uid });
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setIsConnected(false);
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setSocketError(error.message);
        setIsConnected(false);
      });

      // Cleanup on unmount
      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        disconnectSocket();
      };
    } catch (error) {
      console.error("Error initializing socket:", error);
      setSocketError(error.message);
    }
  }, [user]);

  // Subscribe to chat messages
  const subscribeToMessages = (callback) => {
    return subscribeToChat(callback);
  };

  // Subscribe to notifications
  const subscribeToNotifications = (callback) => {
    return socketSubscribeToNotifications(callback);
  };

  // Subscribe to activity feed
  const subscribeToActivity = (callback) => {
    return subscribeToActivityFeed(callback);
  };

  // Send a chat message
  const sendMessage = (messageData) => {
    try {
      const socket = getSocket();
      socket.emit("send_message", messageData);
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  // Join a chat room
  const joinRoom = (roomId) => {
    try {
      joinChatRoom(roomId);
    } catch (error) {
      console.error("Error joining room:", error);
      throw error;
    }
  };

  // Leave a chat room
  const leaveRoom = (roomId) => {
    try {
      leaveChatRoom(roomId);
    } catch (error) {
      console.error("Error leaving room:", error);
      throw error;
    }
  };

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        socketError,
        subscribeToMessages,
        subscribeToNotifications,
        subscribeToActivity,
        sendMessage,
        joinRoom,
        leaveRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Create a hook to use the socket context
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
