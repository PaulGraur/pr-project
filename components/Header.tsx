"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/av-logo.png";

const Header: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

  return (
    <header className="px-4 pt-4">
      <div className="rounded-[20px] bg-white w-full p-4 flex justify-between items-center text-white shadow-md">
        <div>
          <Link href={"/"}>
            <Image src={Logo} alt="Logo" className="w-[100px]" />
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Вийти
        </button>
      </div>
    </header>
  );
};

export default Header;
