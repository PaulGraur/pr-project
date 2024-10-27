"use client";
import React, { useState } from "react";
import CustomOption from "./CustomOption";
import Modal from "./Modal";

const options = [
  {
    title: "Фіксація договору",
    content: "Вибір контрагента та завантаження файлу у форматі PDF.",
  },
  {
    title: "Аутсорсинг",
    content: "Можливості аутсорсингу для підвищення ефективності.",
  },
  {
    title: "Клієнтська підтримка",
    content: "Підтримка та безпека для клієнтів.",
  },
  {
    title: "Інститут професіоналів",
    content: "Розвиток співробітників та створення команди професіоналів.",
  },
  {
    title: "Бізнес коучинг",
    content: "Можливості бізнес коучингу для особистісного росту.",
  },
  {
    title: "Маркетплейс",
    content: "Доступні продукти та послуги на платформі.",
  },
  { title: "Форум", content: "Спільнота для обміну досвідом та обговорення." },
  {
    title: "Безпека розрахунків",
    content: "Заходи безпеки для фінансових операцій.",
  },
];

const OptionSection = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const closeModal = () => {
    setSelectedOption(null);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">
        Безпечна платформа для досягнення цілей
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
        {options.map((option, index) => (
          <CustomOption
            key={index}
            title={option.title}
            onClick={() => handleOptionClick(option)}
          />
        ))}
      </div>
      {selectedOption && (
        <Modal title={selectedOption.title} onClose={closeModal}>
          <p>{selectedOption.content}</p>
        </Modal>
      )}
    </div>
  );
};

export default OptionSection;
