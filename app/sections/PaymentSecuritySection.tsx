"use client";
import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

interface Feedback {
  id: number;
  user: string;
  message: string;
  rating: number;
}

const initialFAQs: FAQItem[] = [
  {
    question: "Чи безпечно здійснювати оплату?",
    answer: "Так, ми використовуємо найсучасніші методи шифрування.",
  },
  {
    question: "Як ви захищаєте мої дані?",
    answer: "Ваші дані зберігаються з дотриманням усіх стандартів безпеки.",
  },
  {
    question: "Що робити, якщо транзакція не вдалася?",
    answer: "Зверніться до підтримки, ми вирішимо вашу проблему.",
  },
];

const PaymentSecuritySection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleAddFeedback = () => {
    if (newFeedback.trim() === "") return;

    const feedback: Feedback = {
      id: Date.now(),
      user: "Anonymous",
      message: newFeedback,
      rating,
    };

    setFeedbacks((prev) =>
      sortOrder === "newest" ? [feedback, ...prev] : [...prev, feedback]
    );
    setNewFeedback("");
    setRating(5);
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFeedbacks = feedbacks.sort((a, b) =>
    sortOrder === "newest" ? b.id - a.id : a.id - b.id
  );

  return (
    <section className="container">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-[32px] shadow-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
          Безпека розрахунків
        </h2>
        <p className="text-gray-700 mb-8 text-center">
          Безпека розрахунків на платформі забезпечується гарантією платформи.
          Платіж здійснюється на платформу, що забезпечує захист від невиконання
          чи неякісного виконання зобов'язань.
        </p>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            Пошук по FAQ
          </h3>
          <input
            type="text"
            placeholder="Пошук..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-[32px] focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          />
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-white rounded-[32px] shadow-md">
                  <p className="font-semibold">{faq.question}</p>
                  <p className="text-gray-600 mt-1">{faq.answer}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Питань не знайдено.</p>
            )}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            Додати відгук про безпеку
          </h3>
          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            className="w-full p-3 border rounded-[32px] focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
            placeholder="Поділіться своїм досвідом..."
          />
          <div className="flex items-center mb-4">
            <p className="mr-3 text-gray-600">Рейтинг:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`mr-1 ${
                  rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleAddFeedback}
            className="bg-green-500 text-white px-4 py-2 rounded-[32px] hover:bg-green-600 transition duration-300"
          >
            Надіслати відгук
          </button>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            Відгуки користувачів
          </h3>
          <div className="flex justify-end items-center mb-4">
            <p className="mr-2 text-gray-600">Сортувати за:</p>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "newest" | "oldest")
              }
              className="border rounded-[32px] p-2"
            >
              <option value="newest">Новіші</option>
              <option value="oldest">Старіші</option>
            </select>
          </div>
          <div className="space-y-4">
            {sortedFeedbacks.length > 0 ? (
              sortedFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-4 bg-white rounded-[32px] shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{feedback.user}</p>
                    <p className="flex items-center text-yellow-500">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-1">{feedback.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                Відгуки відсутні. Будьте першим, хто залишить відгук!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSecuritySection;
