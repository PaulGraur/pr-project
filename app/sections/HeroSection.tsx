"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/images/AV-S.jpg";

const HeroSection: React.FC = () => {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container">
      <div className="mx-auto flex flex-col gap-[20px] lg:flex-row items-center justify-center rounded-[32px] bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-20 px-6 text-center md:text-left">
        <div className="w-[100%] lg:w-1/2 mb-10 md:mb-0">
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
          <Image src={Logo} alt="logo" className="rounded-[32px]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
