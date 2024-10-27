"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "@/images/av-logo.png";

const navigationLinks = [
  { title: "Головна", href: "/" },
  { title: "Аутсорсинг", href: "/outsourcing-page" },
  { title: "Клієнтська підтримка", href: "/support-page" },
  { title: "Інститут професіоналів", href: "/institute-professionals" },
  { title: "Бізнес коучинг", href: "/business-coaching" },
  { title: "Маркетплейс", href: "/marketplace-page" },
  { title: "Форум", href: "/forum-page" },
  { title: "Безпека розрахунків", href: "/payment-security" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="px-4 pt-4">
      <div className="rounded-[32px] bg-white w-full p-4 flex justify-between items-center shadow-md">
        <div>
          <Link href={"/"}>
            <Image src={Logo} alt="Logo" className="w-[100px]" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none z-[1000] relative"
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="hidden md:block text-black px-4 py-2 rounded-[32px]"
          >
            Вийти
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed z-50 right-0 top-0 h-full w-3/4 bg-white p-6 text-black shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* <button
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FiX size={24} />
        </button> */}
        <nav className="flex flex-col divide-y divide-gray-300 mt-4">
          {navigationLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              <div
                className="text-base text-gray-700 py-4 hover:text-blue-500 transition duration-300"
                onClick={toggleMenu}
              >
                {link.title}
              </div>
            </Link>
          ))}
        </nav>
        <button
          onClick={() => {
            handleLogout();
            toggleMenu();
          }}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-[32px] shadow-lg hover:bg-red-600 transition duration-300"
        >
          Вийти
        </button>
      </div>
    </header>
  );
};

export default Header;
