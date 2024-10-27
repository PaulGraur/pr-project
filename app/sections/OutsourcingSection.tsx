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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [filter, setFilter] = useState<string>("Все");

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  const handleAddReview = () => {
    if (selectedService && newReview.trim() && newRating > 0) {
      const updatedReviews = [
        ...selectedService.reviews,
        {
          id: Date.now(),
          reviewer: "Анонім",
          comment: newReview,
          rating: newRating,
          likes: 0,
        },
      ];
      const updatedService = { ...selectedService, reviews: updatedReviews };
      setServices((prev) =>
        prev.map((service) =>
          service.id === selectedService.id ? updatedService : service
        )
      );
      setNewReview("");
      setNewRating(0);
    }
  };

  const handleLikeReview = (reviewId: number) => {
    if (selectedService) {
      const updatedReviews = selectedService.reviews.map((review) =>
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      );
      setSelectedService({ ...selectedService, reviews: updatedReviews });
    }
  };

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

  const filteredServices = services.filter(
    (service) => filter === "Все" || service.category === filter
  );

  return (
    <section className="container">
      <div className="bg-gray-50 p-8 rounded-[32px] shadow-lg max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Послуги Аутсорсингу
        </h2>

        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center space-x-2">
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
              onClick={() => handleFilterChange("Технічна підтримка")}
              className={`px-3 py-1 rounded-lg font-semibold ${
                filter === "Технічна підтримка"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Технічна підтримка
            </button>
            <button
              onClick={() => handleFilterChange("Маркетинг")}
              className={`px-3 py-1 rounded-lg font-semibold ${
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
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
              onClick={() => handleSelectService(service)}
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {service.name}
              </h3>
              <p className="text-gray-500">{service.category}</p>
              <p className="text-gray-700 mt-2">{service.description}</p>
              <p className="text-green-600 mt-2 font-semibold">
                Рейтинг: {service.rating} <FaStar className="inline" />
              </p>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-blue-700">
              {selectedService.name}
            </h3>
            <p className="text-gray-600">{selectedService.description}</p>
            <p className="text-green-600 mt-2 font-semibold">
              Рейтинг: {selectedService.rating} <FaStar className="inline" />
            </p>

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-blue-700">Відгуки:</h4>
              <div className="space-y-4">
                {selectedService.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-3 bg-gray-100 rounded-lg shadow-sm relative"
                  >
                    <p className="font-semibold">{review.reviewer}:</p>
                    <p>{review.comment}</p>
                    <p>Оцінка: {review.rating} / 5</p>
                    <button
                      onClick={() => handleLikeReview(review.id)}
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
                  onClick={handleAddReview}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Додати відгук
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OutsourcingSection;
