"use client";
import React from "react";

const HeroSection: React.FC = () => {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center rounded-[20px] mt-[40px] bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-20 px-6 text-center md:text-left">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Ваша безпечна платформа для досягнення цілей
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Об’єднуйтеся з надійними партнерами, користуйтеся інструментами
            підтримки та забезпечуйте безпеку всіх фінансових операцій на одній
            платформі.
          </p>
          <button
            onClick={handleScrollToContact}
            className="inline-block bg-white text-green-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Зв’язатися з нами
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/hero-image.png"
            alt="Hero Image"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
