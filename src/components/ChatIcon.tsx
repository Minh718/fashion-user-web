import React, { useState } from "react";
import { FaComments, FaTimes, FaRobot, FaHeadset } from "react-icons/fa";

const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatType, setChatType] = useState("bot");

  const toggleChat = () => setIsOpen(!isOpen);

  const ChatBox = () => (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">{chatType === "bot" ? "Chat Bot" : "Chat Admin"}</h3>
        <button onClick={toggleChat} className="text-white hover:text-gray-200 transition-colors">
          <FaTimes size={20} />
        </button>
      </div>
      <div className="h-64 overflow-y-auto p-4 bg-gray-100">
        {/* Chat messages would go here */}
        <p className="text-gray-700">Welcome to the chat! How can I assist you today?</p>
      </div>
      <div className="p-4 bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-center p-2 bg-gray-200">
        <button
          onClick={() => setChatType("bot")}
          className={`mx-2 px-4 py-2 rounded-full ${chatType === "bot" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
        >
          <FaRobot className="inline-block mr-2" /> Bot
        </button>
        <button
          onClick={() => setChatType("admin")}
          className={`mx-2 px-4 py-2 rounded-full ${chatType === "admin" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
        >
          <FaHeadset className="inline-block mr-2" /> Admin
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && <ChatBox />}
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Open chat"
      >
        <FaComments size={24} />
      </button>
    </div>
  );
};

export default ChatIcon;