"use client";
import React, { useState } from "react";
import Link from "next/link";
import CustomOption from "@/components/CustomOption";
import Modal from "@/components/Modal";
import OptionContent from "@/components/OptionContent";

interface Option {
  title: string;
  content: string;
}

const options: Option[] = [
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

const OptionSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    if (option.title !== "Форум" && option.title !== "Клієнтська підтримка") {
      setSelectedOption(option);
    }
  };

  const closeModal = () => {
    setSelectedOption(null);
  };

  return (
    <section className="flex flex-col items-center mt-[40px] xl:mt-[100px]">
      <div className="container flex flex-col items-center">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-10">
          Безпечна платформа для досягнення цілей
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {options.map((option, index) =>
            option.title === "Форум" ? (
              <Link href="/forum-page" key={index}>
                <CustomOption title={option.title} onClick={() => {}} />
              </Link>
            ) : option.title === "Клієнтська підтримка" ? (
              <Link href="/support-page" key={index}>
                <CustomOption title={option.title} onClick={() => {}} />
              </Link>
            ) : (
              <CustomOption
                key={index}
                title={option.title}
                onClick={() => handleOptionClick(option)}
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
