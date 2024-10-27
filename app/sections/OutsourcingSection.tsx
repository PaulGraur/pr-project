"use client";
import React, { useState } from "react";
import { FaStar, FaThumbsUp, FaFilter } from "react-icons/fa";

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: Review[];
}

interface Review {
  id: number;
  reviewer: string;
  comment: string;
  rating: number;
  likes: number;
}

const sampleServices: Service[] = [
  {
    id: 1,
    name: "IT Support",
    category: "Технічна підтримка",
    description: "Професійні послуги IT підтримки для вашого бізнесу.",
    rating: 4.5,
    reviews: [
      {
        id: 1,
        reviewer: "Клієнт 1",
        comment: "Відмінний сервіс!",
        rating: 5,
        likes: 2,
      },
    ],
  },
  {
    id: 2,
    name: "HR Outsourcing",
    category: "Ресурси",
    description: "Послуги з найму та розвитку персоналу.",
    rating: 4.2,
    reviews: [
      {
        id: 2,
        reviewer: "Клієнт 2",
        comment: "Допомогли знайти кращих співробітників.",
        rating: 4,
        likes: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Маркетинг аутсорсинг",
    category: "Маркетинг",
    description: "Розробка стратегій та рекламних кампаній.",
    rating: 4.7,
    reviews: [
      {
        id: 3,
        reviewer: "Клієнт 3",
        comment: "Підняли наші продажі!",
        rating: 5,
        likes: 4,
      },
    ],
  },
];

const OutsourcingSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>(sampleServices);
  const [expandedServiceIds, setExpandedServiceIds] = useState<number[]>([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [filter, setFilter] = useState<string>("Все");

  const toggleServiceExpansion = (serviceId: number) => {
    setExpandedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAddReview = (serviceId: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (service && newReview.trim() && newRating > 0) {
      const updatedReview = {
        id: Date.now(),
        reviewer: "Анонім",
        comment: newReview,
        rating: newRating,
        likes: 0,
      };
      const updatedServices = services.map((s) =>
        s.id === service.id
          ? { ...s, reviews: [...s.reviews, updatedReview] }
          : s
      );
      setServices(updatedServices);
      setNewReview("");
      setNewRating(0);
    }
  };

  const handleLikeReview = (serviceId: number, reviewId: number) => {
    const updatedServices = services.map((s) => {
      if (s.id === serviceId) {
        return {
          ...s,
          reviews: s.reviews.map((review) =>
            review.id === reviewId
              ? { ...review, likes: review.likes + 1 }
              : review
          ),
        };
      }
      return s;
    });
    setServices(updatedServices);
  };

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

  const filteredServices = services.filter(
    (service) => filter === "Все" || service.category === filter
  );

  return (
    <section className="container">
      <div className="bg-gray-50 p-6 rounded-[32px] shadow-lg mx-auto">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Послуги Аутсорсингу
        </h2>

        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center space-x-2">
            <button
              onClick={() => handleFilterChange("Все")}
              className={`px-3 py-1 rounded-[32px] font-semibold ${
                filter === "Все"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => handleFilterChange("Технічна підтримка")}
              className={`px-3 py-1 rounded-[32px] font-semibold ${
                filter === "Технічна підтримка"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Технічна підтримка
            </button>
            <button
              onClick={() => handleFilterChange("Маркетинг")}
              className={`px-3 py-1 rounded-[32px] font-semibold ${
                filter === "Маркетинг"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Маркетинг
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-4 bg-white rounded-[32px] shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
              onClick={() => toggleServiceExpansion(service.id)}
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {service.name}
              </h3>
              <p className="text-gray-500">{service.category}</p>
              <p className="text-gray-700 mt-2">{service.description}</p>
              <p className="text-green-600 mt-2 font-semibold">
                Рейтинг: {service.rating} <FaStar className="inline" />
              </p>

              {expandedServiceIds.includes(service.id) && (
                <div className="mt-4 p-4 bg-gray-100 rounded-[32px] shadow-inner">
                  <h4 className="text-xl font-semibold text-blue-700">
                    Відгуки:
                  </h4>
                  <div className="space-y-4">
                    {service.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-3 bg-white rounded-[32px] shadow-sm relative"
                      >
                        <p className="font-semibold">{review.reviewer}:</p>
                        <p>{review.comment}</p>
                        <p>Оцінка: {review.rating} / 5</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeReview(service.id, review.id);
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
                      className="w-full p-3 border rounded-[32px] focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="Напишіть відгук..."
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddReview(service.id);
                      }}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-[32px] hover:bg-green-600 transition duration-300"
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

export default OutsourcingSection;
