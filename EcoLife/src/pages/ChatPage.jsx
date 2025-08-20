import React from "react";
import ChatRoom from "../components/chat/ChatRoom";
import { useTranslation } from "react-i18next";

const ChatPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("chat")}</h1>
        <p className="text-gray-600">
          Trò chuyện với cộng đồng người dùng EcoLife
        </p>
      </div>

      <ChatRoom />
    </div>
  );
};

export default ChatPage;
