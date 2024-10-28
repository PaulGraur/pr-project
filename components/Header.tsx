"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen || showAuthModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, showAuthModal]);

  return (
    <header className="px-4 pt-4">
      <div className="rounded-[32px] bg-white w-full p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Link href={"/"} className="ml-[12px] font-bold text-[20px]">
            Synergy
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex gap-[12px] md:hidden">
            <button
              onClick={() => {
                if (isAuthenticated) {
                  toggleMenu();
                } else {
                  setShowAuthModal(true);
                }
              }}
              className="text-black focus:outline-none z-[1000] relative"
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="hidden md:block text-black px-4 py-2 rounded-[32px]"
            >
              Вийти
            </button>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isMenuOpen || showAuthModal ? "block" : "hidden"
        }`}
        onClick={() => {
          setIsMenuOpen(false);
          setShowAuthModal(false);
        }}
      ></div>

      <div
        className={`fixed z-50 right-0 top-0 h-full w-3/4 bg-white p-6 text-black shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
          className="mt-6 text-black px-8 py-2 rounded-[32px] shadow-lg hover:bg-red-600 transition duration-300"
        >
          Вийти
        </button>
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Для доступу до меню, будь ласка, увійдіть або зареєструйтесь
            </h3>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAuthModal(false)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
