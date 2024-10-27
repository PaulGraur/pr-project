"use client";
import React, { useState } from "react";
import { FaStar, FaFilter, FaSort, FaThumbsUp } from "react-icons/fa";

interface Partner {
  id: number;
  name: string;
  type: string;
  description: string;
  trustScore: number;
  reviews: Review[];
}

interface Review {
  id: number;
  reviewer: string;
  comment: string;
  rating: number;
  likes: number;
}

const samplePartners: Partner[] = [
  {
    id: 1,
    name: "Партнер 1",
    type: "Логістика",
    description: "Надійний партнер для транспортних рішень.",
    trustScore: 4.7,
    reviews: [
      {
        id: 1,
        reviewer: "Контрагент 1",
        comment: "Супер партнер!",
        rating: 5,
        likes: 3,
      },
    ],
  },
  {
    id: 2,
    name: "Партнер 2",
    type: "ІТ-послуги",
    description: "Професійне забезпечення для вашого бізнесу.",
    trustScore: 4.3,
    reviews: [
      {
        id: 2,
        reviewer: "Контрагент 2",
        comment: "Хороший сервіс!",
        rating: 4,
        likes: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Партнер 3",
    type: "Фінанси",
    description: "Консультації та підтримка в фінансових питаннях.",
    trustScore: 4.9,
    reviews: [
      {
        id: 3,
        reviewer: "Контрагент 3",
        comment: "Відмінний сервіс!",
        rating: 5,
        likes: 5,
      },
    ],
  },
  {
    id: 4,
    name: "Партнер 4",
    type: "Юридичні послуги",
    description: "Юридична допомога для бізнесу.",
    trustScore: 4.2,
    reviews: [
      {
        id: 4,
        reviewer: "Контрагент 4",
        comment: "Допомогли розібратись з контрактами.",
        rating: 4,
        likes: 2,
      },
    ],
  },
  {
    id: 5,
    name: "Партнер 5",
    type: "Маркетинг",
    description: "Рекламні та маркетингові послуги.",
    trustScore: 4.5,
    reviews: [
      {
        id: 5,
        reviewer: "Контрагент 5",
        comment: "Збільшили наші продажі!",
        rating: 4,
        likes: 4,
      },
    ],
  },
  {
    id: 6,
    name: "Партнер 6",
    type: "HR послуги",
    description: "Найм та розвиток персоналу.",
    trustScore: 4.0,
    reviews: [
      {
        id: 6,
        reviewer: "Контрагент 6",
        comment: "Допомогли знайти кваліфікованих співробітників.",
        rating: 4,
        likes: 1,
      },
    ],
  },
];

const MarketplaceSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>(samplePartners);
  const [expandedPartnerIds, setExpandedPartnerIds] = useState<number[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [filter, setFilter] = useState<string>("Все");
  const [sortBy, setSortBy] = useState<"trustScore" | "name" | null>(null);

  const togglePartnerExpansion = (partnerId: number) => {
    setExpandedPartnerIds((prev) =>
      prev.includes(partnerId)
        ? prev.filter((id) => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const handleAddReview = (partnerId: number) => {
    const partner = partners.find((p) => p.id === partnerId);
    if (partner && newReview.trim() && rating > 0) {
      const updatedReview = {
        id: Date.now(),
        reviewer: "Анонім",
        comment: newReview,
        rating,
        likes: 0,
      };

      const updatedPartners = partners.map((p) =>
        p.id === partner.id
          ? { ...p, reviews: [...p.reviews, updatedReview] }
          : p
      );

      setPartners(updatedPartners);
      setNewReview("");
      setRating(0);
    }
  };

  const handleLikeReview = (partnerId: number, reviewId: number) => {
    const updatedPartners = partners.map((p) => {
      if (p.id === partnerId) {
        return {
          ...p,
          reviews: p.reviews.map((review) =>
            review.id === reviewId
              ? { ...review, likes: review.likes + 1 }
              : review
          ),
        };
      }
      return p;
    });
    setPartners(updatedPartners);
  };

  const handleFilterChange = (type: string) => {
    setFilter(type);
  };

  const handleSortChange = (sortOption: "trustScore" | "name") => {
    setSortBy(sortOption);
    const sortedPartners = [...partners].sort((a, b) =>
      sortOption === "trustScore"
        ? b.trustScore - a.trustScore
        : a.name.localeCompare(b.name)
    );
    setPartners(sortedPartners);
  };

  const filteredPartners = partners.filter(
    (partner) => filter === "Все" || partner.type === filter
  );

  return (
    <section className="container">
      <div className="p-6 max-w-5xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 rounded-[32px] shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Маркетплейс Безпечного Партнерства
        </h2>

        <div className="flex flex-col justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleFilterChange("Все")}
              className={`px-3 py-1 rounded-lg font-semibold ${
                filter === "Все"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => handleFilterChange("Логістика")}
              className={`px-3 py-1 rounded-lg font-semibold ${
                filter === "Логістика"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Логістика
            </button>
            <button
              onClick={() => handleFilterChange("ІТ-послуги")}
              className={`px-3 py-1 rounded-lg font-semibold ${
                filter === "ІТ-послуги"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              ІТ-послуги
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <FaSort />
            <button
              onClick={() => handleSortChange("trustScore")}
              className="text-gray-700"
            >
              За рейтингом
            </button>
            <button
              onClick={() => handleSortChange("name")}
              className="text-gray-700"
            >
              За назвою
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
              onClick={() => togglePartnerExpansion(partner.id)}
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {partner.name}
              </h3>
              <p className="text-gray-500">{partner.type}</p>
              <p className="text-gray-700 mt-2">{partner.description}</p>
              <p className="text-green-600 mt-2 font-semibold">
                Рейтинг довіри: {partner.trustScore}
              </p>

              {expandedPartnerIds.includes(partner.id) && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                  <h4 className="text-xl font-semibold text-blue-700">
                    Відгуки:
                  </h4>
                  <div className="space-y-4">
                    {partner.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-3 bg-white rounded-lg shadow-sm relative"
                      >
                        <p className="font-semibold">{review.reviewer}:</p>
                        <p>{review.comment}</p>
                        <p>Оцінка: {review.rating} / 5</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeReview(partner.id, review.id);
                          }}
                          className="absolute top-3 right-3 text-green-500 flex items-center"
                        >
                          <FaThumbsUp className="mr-1" /> {review.likes}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="Напишіть відгук..."
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddReview(partner.id);
                      }}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Додати відгук
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
