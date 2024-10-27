"use client";
import React, { useState } from "react";
import { FiUser, FiMail, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import Modal from "@/components/Modal";

const ContactUsSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="container">
      <div className="bg-white py-20 px-6 rounded-[32px]">
        <div className="w-[100%] bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-8 rounded-[32px] shadow-lg max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
            Зв'яжіться з нами
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-1">
                Ім'я
              </label>
              <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow focus-within:ring-2 focus-within:ring-green-500 transition duration-300">
                <FiUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="flex-grow bg-transparent outline-none placeholder-gray-400 text-gray-700"
                  placeholder="Введіть ваше ім'я"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow focus-within:ring-2 focus-within:ring-green-500 transition duration-300">
                <FiMail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow bg-transparent outline-none placeholder-gray-400 text-gray-700"
                  placeholder="Введіть ваш email"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-1">
                Повідомлення
              </label>
              <div className="flex items-start bg-white border rounded-2xl px-4 py-3 shadow focus-within:ring-2 focus-within:ring-green-500 transition duration-300">
                <FiMessageSquare className="text-gray-400 mt-1 mr-2" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="flex-grow bg-transparent outline-none placeholder-gray-400 text-gray-700"
                  placeholder="Напишіть ваше повідомлення..."
                  rows={4}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-full hover:from-green-600 hover:to-blue-600 shadow-lg transition duration-300 transform hover:scale-105"
            >
              Відправити
            </button>
          </form>
          {isSubmitted && (
            <Modal title="Повідомлення надіслано" onClose={closeModal}>
              <div className="flex flex-col items-center">
                <FiCheckCircle className="text-green-500 text-5xl mb-4" />
                <p className="text-gray-700 text-center mb-4">
                  Дякуємо за ваше повідомлення! Ми зв'яжемося з вами найближчим
                  часом.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
                >
                  Закрити
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
