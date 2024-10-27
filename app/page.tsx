"use client";
import React, { useState, useEffect } from "react";
import OptionSection from "@/app/sections/OptionSection";
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
        <div>
          <OptionSection />
        </div>
      ) : (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
}
