"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface AuthFormProps {
  onAuthSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const validateInputs = () => {
    if (!username) return "Ім'я користувача не може бути порожнім";
    if (password.length < 6) return "Пароль має містити щонайменше 6 символів";
    if (isRegistering && password !== confirmPassword)
      return "Паролі не співпадають";
    if (isRegistering && !isAgreed)
      return "Ви повинні погодитися з умовами використання";
    return "";
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMessage = validateInputs();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    if (isRegistering) {
      const existingUsername = localStorage.getItem("username");
      if (existingUsername === username) {
        setError("Користувач з таким ім'ям вже існує.");
        return;
      }
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setError("");
      setInfo("Реєстрація успішна! Тепер увійдіть до системи.");
      setIsRegistering(false);
    } else {
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");
      if (username === storedUsername && password === storedPassword) {
        setError("");
        setInfo("");
        onAuthSuccess();
      } else {
        setError("Неправильне ім'я користувача або пароль.");
      }
    }
  };

  return (
    <div className="container flex justify-center items-center">
      <form
        onSubmit={handleAuth}
        className="bg-white p-8 rounded-[32px] shadow-2xl w-full max-w-md transform transition-all hover:shadow-3xl"
      >
        <h2 className="text-3xl font-extrabold text-center text-gradient bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-8">
          {isRegistering ? "Реєстрація" : "Вхід"}
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {info && <p className="text-green-600 text-center mb-4">{info}</p>}

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Ім'я користувача
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-[32px] focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-300"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-700 font-semibold mb-2">
            Пароль
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-[32px] focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[56px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={24} />
            ) : (
              <AiOutlineEye size={24} />
            )}
          </button>
        </div>

        {isRegistering && (
          <>
            <div className="mb-6 relative">
              <label className="block text-gray-700 font-semibold mb-2">
                Підтвердження пароля
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-[32px] focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[56px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </button>
            </div>

            <div className="mb-6 flex items-center">
              <div
                className={`w-24 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                  isAgreed ? "bg-green-500" : ""
                }`}
                onClick={() => setIsAgreed(!isAgreed)}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isAgreed ? "translate-x-6" : ""
                  }`}
                />
              </div>
              <label className="ml-3 text-gray-700">
                Я погоджуюся з умовами використання та підтверджую підтримку
                платформи.
              </label>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isRegistering && !isAgreed} 
          className={`w-full font-bold py-3 rounded-[32px] transition duration-300 shadow-md hover:shadow-lg ${
            isRegistering && !isAgreed
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
          }`}
        >
          {isRegistering ? "Зареєструватися" : "Увійти"}
        </button>

        <p
          className="text-center text-blue-600 mt-6 cursor-pointer hover:underline"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError("");
            setInfo("");
          }}
        >
          {isRegistering
            ? "Вже маєте обліковий запис? Увійти"
            : "Ще не маєте облікового запису? Зареєструватися"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
