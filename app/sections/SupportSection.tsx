"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  sender: "user" | "support" | "system";
  content: string;
}

const SupportSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "system", content: "Підключення до підтримки..." },
    { id: 2, sender: "support", content: "Вітаємо! Чим можемо допомогти?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineStatus, setOnlineStatus] = useState(true);

  // Зміна типізації для об'єкта quickReplies
  const quickReplies: Record<string, string> = {
    "Як швидко я отримаю відповідь?":
      "Ми відповідаємо протягом декількох хвилин у робочий час.",
    "Які послуги ви надаєте?":
      "Ми надаємо послуги підтримки клієнтів, технічну допомогу та консультації.",
    "Як звернутися до менеджера?":
      "Ви можете звернутися до менеджера через цей чат або за телефоном на нашому сайті.",
  };

  const handleSendMessage = (content: string, sender: "user" | "support") => {
    const message: Message = {
      id: Date.now(),
      sender,
      content,
    };

    setMessages((prev) => [...prev, message]);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply, "user");
    setTimeout(() => {
      const replyContent =
        quickReplies[reply] ||
        "Дякуємо за ваше повідомлення! Ми скоро з вами зв'яжемося.";
      handleSendMessage(replyContent, "support");
    }, 1000);
  };

  const handleUserMessage = () => {
    if (newMessage.trim() === "") return;
    handleSendMessage(newMessage, "user");

    setTimeout(() => {
      handleSendMessage(
        "Дякуємо за ваше повідомлення! Ми скоро з вами зв'яжемося.",
        "support"
      );
    }, 1000);
    setNewMessage("");
  };

  const characterLimit = 200;

  return (
    <section className="container">
      <div className="rounded-[32px] bg-gray-50 p-6 shadow-lg">
        <div className="text-center mb-4 text-sm text-gray-500">
          <span className="font-semibold">
            {onlineStatus ? "Підтримка онлайн" : "Підтримка офлайн"}
          </span>
        </div>

        <div className="h-80 overflow-y-auto mb-4 p-2 bg-white rounded-[32px] shadow-inner">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-2 p-2 rounded-[32px] ${
                message.sender === "user"
                  ? "bg-blue-100 text-right"
                  : message.sender === "support"
                  ? "bg-green-100 text-left"
                  : "bg-gray-200 text-center text-gray-700"
              }`}
            >
              {message.sender !== "system" && (
                <div className="text-xs font-semibold mb-1">
                  {message.sender === "user" ? "Ви" : "Підтримка"}
                </div>
              )}
              <p>{message.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Швидкі відповіді:</p>
          <div className="flex space-x-2">
            {Object.keys(quickReplies).map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="text-[12px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Напишіть повідомлення..."
            maxLength={characterLimit}
            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleUserMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
          >
            Надіслати
          </button>
        </div>
        <div className="text-right text-xs text-gray-400 mt-1">
          {newMessage.length}/{characterLimit} символів
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
