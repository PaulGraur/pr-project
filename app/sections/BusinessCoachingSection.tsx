"use client";
import React, { useState } from "react";

interface Coaching {
  id: number;
  title: string;
  description: string;
  category: string;
  rating: number;
  feedbacks: string[];
  date: string;
  isRegistered: boolean;
  questions: { question: string; answers: string[] }[];
}

const sampleCoachings: Coaching[] = [
  {
    id: 1,
    title: "Стратегічне мислення",
    description: "Навички розробки та впровадження стратегічних планів.",
    category: "Стратегія",
    rating: 4.6,
    feedbacks: ["Чудова програма для розвитку стратегії!"],
    date: "2024-11-15",
    isRegistered: false,
    questions: [
      {
        question: "Як розвивати стратегічне мислення?",
        answers: ["Практика та аналіз ринкових трендів."],
      },
    ],
  },
  {
    id: 2,
    title: "Фінансове управління",
    description: "Основи управління фінансами для бізнесу.",
    category: "Фінанси",
    rating: 4.4,
    feedbacks: ["Дуже допомогло у веденні бізнесу!"],
    date: "2024-12-10",
    isRegistered: false,
    questions: [],
  },
  {
    id: 3,
    title: "Клієнтоорієнтованість",
    description: "Підходи для покращення взаємодії з клієнтами.",
    category: "Клієнти",
    rating: 4.9,
    feedbacks: ["Рекомендую для всіх, хто працює з клієнтами!"],
    date: "2024-11-25",
    isRegistered: false,
    questions: [],
  },
];

const categories = ["Всі", "Стратегія", "Фінанси", "Клієнти"];

const BusinessCoachingSection: React.FC = () => {
  const [coachings, setCoachings] = useState<Coaching[]>(sampleCoachings);
  const [expandedCoachingIds, setExpandedCoachingIds] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Всі");
  const [newFeedback, setNewFeedback] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState("rating");

  const toggleCoachingExpansion = (id: number) => {
    setExpandedCoachingIds((prev) =>
      prev.includes(id) ? prev.filter((expId) => expId !== id) : [...prev, id]
    );
  };

  const handleAddFeedback = (coachingId: number) => {
    const updatedCoachings = coachings.map((coaching) =>
      coaching.id === coachingId && newFeedback.trim()
        ? { ...coaching, feedbacks: [...coaching.feedbacks, newFeedback] }
        : coaching
    );
    setCoachings(updatedCoachings);
    setNewFeedback("");
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const handleRegister = (coachingId: number) => {
    const updatedCoachings = coachings.map((coaching) =>
      coaching.id === coachingId
        ? { ...coaching, isRegistered: true }
        : coaching
    );
    setCoachings(updatedCoachings);
    alert("Ви зареєстровані на коучинг!");
  };

  const handleAddQuestion = (coachingId: number) => {
    const updatedCoachings = coachings.map((coaching) =>
      coaching.id === coachingId && newQuestion.trim()
        ? {
            ...coaching,
            questions: [
              ...coaching.questions,
              { question: newQuestion, answers: [] },
            ],
          }
        : coaching
    );
    setCoachings(updatedCoachings);
    setNewQuestion("");
  };

  const filteredCoachings = coachings.filter((coaching) =>
    selectedCategory === "Всі" ? true : coaching.category === selectedCategory
  );

  const sortedCoachings = [...filteredCoachings].sort((a, b) => {
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <section className="container">
      <div className="bg-gray-50 p-6 rounded-[32px] shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Бізнес Коучинг
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          Розвиток навичок та компетенцій для успіху в бізнесі.
        </p>

        <div className="flex flex-wrap gap-[14px] justify-center mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-[32px]"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded-[32px]"
          >
            <option value="rating">Сортувати за рейтингом</option>
            <option value="title">Сортувати за назвою</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCoachings.map((coaching) => (
            <div
              key={coaching.id}
              className="p-4 border border-gray-300 rounded-[32px] hover:shadow-lg transition cursor-pointer relative"
              onClick={() => toggleCoachingExpansion(coaching.id)}
            >
              <h3 className="text-lg font-semibold text-blue-700">
                {coaching.title}
              </h3>
              <p className="text-gray-600 mt-2">{coaching.description}</p>
              <p className="text-yellow-600 mt-2">Рейтинг: {coaching.rating}</p>
              <p className="text-gray-500 mt-2">Дата: {coaching.date}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(coaching.id);
                }}
                className={`absolute top-2 right-2 ${
                  favorites.includes(coaching.id)
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {favorites.includes(coaching.id) ? "★" : "☆"}
              </button>

              {expandedCoachingIds.includes(coaching.id) && (
                <div className="mt-6 p-4 bg-white rounded-[32px] shadow-lg">
                  <h3 className="text-xl font-bold text-blue-700">
                    {coaching.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{coaching.description}</p>
                  <p className="text-gray-500 mt-2">
                    Дата проведення: {coaching.date}
                  </p>
                  {coaching.isRegistered ? (
                    <p className="text-green-600 font-semibold mt-4">
                      Ви зареєстровані на цей коучинг
                    </p>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(coaching.id);
                      }}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-[32px] hover:bg-green-600 transition duration-300"
                    >
                      Зареєструватися
                    </button>
                  )}

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Відгуки:</h4>
                    {coaching.feedbacks.map((feedback, index) => (
                      <p key={index} className="text-gray-600 border-b py-1">
                        {feedback}
                      </p>
                    ))}
                    <textarea
                      value={newFeedback}
                      onChange={(e) => setNewFeedback(e.target.value)}
                      className="w-full mt-4 p-2 border rounded-[32px]"
                      placeholder="Залиште ваш відгук..."
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddFeedback(coaching.id);
                      }}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-[32px] hover:bg-blue-600 transition duration-300"
                    >
                      Додати відгук
                    </button>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">
                      Питання та відповіді:
                    </h4>
                    {coaching.questions.map((q, idx) => (
                      <div key={idx} className="border-b py-2">
                        <p className="font-semibold">{q.question}</p>
                        {q.answers.map((ans, idx2) => (
                          <p key={idx2} className="text-gray-600 pl-4">
                            - {ans}
                          </p>
                        ))}
                      </div>
                    ))}
                    <textarea
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full mt-2 p-2 border rounded-[32px]"
                      placeholder="Задайте питання..."
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddQuestion(coaching.id);
                      }}
                      className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-[32px] hover:bg-purple-600 transition duration-300"
                    >
                      Додати питання
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCoachingExpansion(coaching.id);
                    }}
                    className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-[32px] hover:bg-gray-400 transition duration-300"
                  >
                    Закрити
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessCoachingSection;
