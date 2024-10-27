"use client";
import React, { useState, useEffect } from "react";
import HeroSection from "@/app/sections/HeroSection";
import OptionSection from "@/app/sections/OptionSection";
import ContactUsSection from "@/app/sections/ContactUsSection";

import AuthForm from "@/components/AuthForm";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col gap-[100px]">
          <HeroSection />
          <OptionSection />
          <ContactUsSection />
        </div>
      ) : (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
}
