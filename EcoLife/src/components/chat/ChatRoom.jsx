import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSocketContext } from "../../contexts/SocketContext";

const ChatRoom = () => {
  const { user } = useAuthContext();
  const { isConnected, subscribeToMessages, sendMessage } = useSocketContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Subscribe to chat messages
  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = subscribeToMessages((message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Join the general chat room
    // In a real app, you might join specific rooms based on context
    // socket.emit("join_room", "general");

    return () => {
      if (unsubscribe) unsubscribe();
      // socket.emit("leave_room", "general");
    };
  }, [isConnected, subscribeToMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !user) return;

    const messageData = {
      text: newMessage,
      userId: user.uid,
      userName: user.displayName || user.email.split("@")[0],
      timestamp: new Date().toISOString(),
    };

    sendMessage(messageData);
    setNewMessage("");
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="border-b p-4">
        <div>
          <h2 className="text-xl font-bold">Phòng Chat</h2>
          <div className="flex items-center mt-1">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? "Đã kết nối" : "Đang kết nối..."}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.userId === user?.uid ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.userId === user?.uid
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.userId !== user?.uid && (
                    <div className="text-xs font-semibold mb-1">
                      {message.userName}
                    </div>
                  )}
                  <div className="text-sm">{message.text}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            disabled={!isConnected}
          />
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-2 rounded-r-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            disabled={!newMessage.trim() || !isConnected}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
