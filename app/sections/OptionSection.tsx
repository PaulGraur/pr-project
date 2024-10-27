"use client";
import React, { useState } from "react";
import Link from "next/link";
import CustomOption from "@/components/CustomOption";
import Modal from "@/components/Modal";
import OptionContent from "@/components/OptionContent";

interface Option {
  title: string;
  content: string;
  link?: string;
}

const options: Option[] = [
  {
    title: "Фіксація договору",
    content: "Вибір контрагента та завантаження файлу у форматі PDF.",
  },
  {
    title: "Аутсорсинг",
    content: "Можливості аутсорсингу для підвищення ефективності.",
    link: "/outsourcing-page",
  },
  {
    title: "Клієнтська підтримка",
    content: "Підтримка та безпека для клієнтів.",
    link: "/support-page",
  },
  {
    title: "Інститут професіоналів",
    content: "Розвиток співробітників та створення команди професіоналів.",
    link: "/institute-professionals",
  },
  {
    title: "Бізнес коучинг",
    content: "Можливості бізнес коучингу для особистісного росту.",
    link: "/business-coaching",
  },
  {
    title: "Маркетплейс",
    content: "Доступні продукти та послуги на платформі.",
    link: "/marketplace-page",
  },
  {
    title: "Форум",
    content: "Спільнота для обміну досвідом та обговорення.",
    link: "/forum-page",
  },
  {
    title: "Безпека розрахунків",
    content: "Заходи безпеки для фінансових операцій.",
    link: "/payment-security",
  },
];

const OptionSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    if (!option.link) {
      setSelectedOption(option);
    }
  };

  const closeModal = () => {
    setSelectedOption(null);
  };

  return (
    <section className="container">
      <div className="flex flex-col items-center text-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 py-20 px-6 rounded-[32px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {options.map((option, index) =>
            option.link ? (
              <Link href={option.link} key={index}>
                <CustomOption
                  title={option.title}
                  onClick={() => {}}
                  className="bg-gradient-to-br from-green-300 via-blue-200 to-purple-300 text-center p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
                />
              </Link>
            ) : (
              <CustomOption
                key={index}
                title={option.title}
                onClick={() => handleOptionClick(option)}
                className="bg-gradient-to-br from-green-300 via-blue-200 to-purple-300 text-center p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
              />
            )
          )}
        </div>
        {selectedOption && (
          <Modal title={selectedOption.title} onClose={closeModal}>
            <OptionContent option={selectedOption} onClose={closeModal} />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default OptionSection;
