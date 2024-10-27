"use client";
import React from "react";
import SupportSection from "@/app/sections/SupportSection";

const ClientSupportPage: React.FC = () => {
  return (
    <section className="container mt-[60px]">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
        Клієнтська підтримка
      </h2>
      <SupportSection />
    </section>
  );
};

export default ClientSupportPage;
