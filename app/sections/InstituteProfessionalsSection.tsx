"use client";
import React, { useState } from "react";

interface Training {
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

const sampleTrainings: Training[] = [
  {
    id: 1,
    title: "Лідерство та комунікації",
    description: "Розвиток навичок ефективного лідерства та комунікації.",
    category: "Лідерство",
    rating: 4.5,
    feedbacks: ["Чудовий тренінг!"],
    date: "2024-11-15",
    isRegistered: false,
    questions: [
      {
        question: "Які основні навички розглядаються?",
        answers: ["Комунікації, командна робота."],
      },
    ],
  },
  {
    id: 2,
    title: "Тайм-менеджмент",
    description: "Як правильно планувати та розподіляти свій час.",
    category: "Тайм-менеджмент",
    rating: 4.2,
    feedbacks: ["Дуже корисно!"],
    date: "2024-12-05",
    isRegistered: false,
    questions: [],
  },
  {
    id: 3,
    title: "Управління проектами",
    description: "Основи управління проектами для покращення результативності.",
    category: "Проекти",
    rating: 4.8,
    feedbacks: ["Рекомендую!"],
    date: "2024-11-20",
    isRegistered: false,
    questions: [],
  },
];

const categories = ["Всі", "Лідерство", "Тайм-менеджмент", "Проекти"];

const projectList = [
  {
    name: "Безпечне партнерство",
    colorClass: "bg-blue-100",
    textColorClass: "text-blue-700",
  },
  {
    name: "МоПоМо",
    colorClass: "bg-green-100",
    textColorClass: "text-green-700",
  },
  {
    name: "Обнімашки",
    colorClass: "bg-yellow-100",
    textColorClass: "text-yellow-700",
  },
  {
    name: "Консультації Сергій",
    colorClass: "bg-purple-100",
    textColorClass: "text-purple-700",
  },
  {
    name: "Консультації Войтек",
    colorClass: "bg-pink-100",
    textColorClass: "text-pink-700",
  },
  {
    name: "Шлях до партнерства",
    colorClass: "bg-indigo-100",
    textColorClass: "text-indigo-700",
  },
];

const InstituteProfessionalsSection: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>(sampleTrainings);
  const [expandedTrainingIds, setExpandedTrainingIds] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Всі");
  const [newFeedback, setNewFeedback] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState("rating");

  const toggleTrainingExpansion = (id: number) => {
    setExpandedTrainingIds((prev) =>
      prev.includes(id) ? prev.filter((expId) => expId !== id) : [...prev, id]
    );
  };

  const handleAddFeedback = (trainingId: number) => {
    const updatedTrainings = trainings.map((training) =>
      training.id === trainingId && newFeedback.trim()
        ? { ...training, feedbacks: [...training.feedbacks, newFeedback] }
        : training
    );
    setTrainings(updatedTrainings);
    setNewFeedback("");
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const handleRegister = (trainingId: number) => {
    const updatedTrainings = trainings.map((training) =>
      training.id === trainingId
        ? { ...training, isRegistered: true }
        : training
    );
    setTrainings(updatedTrainings);
    alert("Ви зареєстровані на тренінг!");
  };

  const handleAddQuestion = (trainingId: number) => {
    const updatedTrainings = trainings.map((training) =>
      training.id === trainingId && newQuestion.trim()
        ? {
            ...training,
            questions: [
              ...training.questions,
              { question: newQuestion, answers: [] },
            ],
          }
        : training
    );
    setTrainings(updatedTrainings);
    setNewQuestion("");
  };

  const filteredTrainings = trainings.filter((training) =>
    selectedCategory === "Всі" ? true : training.category === selectedCategory
  );

  const sortedTrainings = [...filteredTrainings].sort((a, b) => {
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <section className="container">
      <div className="bg-gray-50 p-6 rounded-[32px] shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Інститут професіоналів
        </h2>

        <p className="text-gray-700 mb-4 text-center">
          Розвиток навичок та компетенцій для професійного зростання.
        </p>

        <div className="bg-white p-6 rounded-[32px] shadow-lg mx-auto mb-[40px]">
          <h3 className="text-2xl font-semibold text-green-700 mb-4 text-center">
            Проєкти МоМо на платформу:
          </h3>

          <ul className="space-y-3 list-none">
            {projectList.map((project, index) => (
              <li
                key={index}
                className={`flex items-center p-3 ${
                  project.colorClass
                } rounded-[32px] shadow-sm hover:${project.colorClass.replace(
                  "100",
                  "200"
                )} transition duration-200`}
              >
                <span className={`${project.textColorClass} font-medium`}>
                  {project.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

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
          {sortedTrainings.map((training) => (
            <div
              key={training.id}
              className="p-4 border border-gray-300 rounded-[32px] hover:shadow-lg transition cursor-pointer relative"
              onClick={() => toggleTrainingExpansion(training.id)}
            >
              <h3 className="text-lg font-semibold text-blue-700">
                {training.title}
              </h3>
              <p className="text-gray-600 mt-2">{training.description}</p>
              <p className="text-yellow-600 mt-2">Рейтинг: {training.rating}</p>
              <p className="text-gray-500 mt-2">Дата: {training.date}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(training.id);
                }}
                className={`absolute top-2 right-2 ${
                  favorites.includes(training.id)
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {favorites.includes(training.id) ? "★" : "☆"}
              </button>

              {expandedTrainingIds.includes(training.id) && (
                <div className="mt-6 p-4 bg-white rounded-[32px] shadow-lg">
                  <h3 className="text-xl font-bold text-blue-700">
                    {training.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{training.description}</p>
                  <p className="text-gray-500 mt-2">
                    Дата проведення: {training.date}
                  </p>
                  {training.isRegistered ? (
                    <p className="text-green-600 font-semibold mt-4">
                      Ви зареєстровані на цей тренінг
                    </p>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(training.id);
                      }}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-[32px] hover:bg-green-600 transition duration-300"
                    >
                      Зареєструватися
                    </button>
                  )}

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Відгуки:</h4>
                    {training.feedbacks.map((feedback, index) => (
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
                        handleAddFeedback(training.id);
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
                    {training.questions.map((q, idx) => (
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
                        handleAddQuestion(training.id);
                      }}
                      className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-[32px] hover:bg-purple-600 transition duration-300"
                    >
                      Додати питання
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTrainingExpansion(training.id);
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

export default InstituteProfessionalsSection;
