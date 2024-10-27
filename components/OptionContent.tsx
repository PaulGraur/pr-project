"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface OptionContentProps {
  option: { title: string; content: string };
  onClose: () => void;
}

const OptionContent: React.FC<OptionContentProps> = ({ option, onClose }) => {
  const router = useRouter();
  const [selectedContractor, setSelectedContractor] = useState<string | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setIsFileUploaded(true);
    } else {
      alert("Будь ласка, завантажте файл у форматі PDF.");
    }
  };

  const handleSubmitData = () => {
    if (selectedContractor && isFileUploaded) {
      setShowSuccessMessage(true);
      setSelectedContractor(null);
      setFile(null);
      setIsFileUploaded(false);
      setFeedback("");
      setRating(0);
    } else {
      alert("Будь ласка, оберіть контрагента та завантажте файл.");
    }
  };

  const contractors = ["Контрагент 1", "Контрагент 2", "Контрагент 3"];

  const renderContent = () => {
    switch (option.title) {
      case "Фіксація договору":
        return (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Оберіть контрагента:
            </label>
            <select
              value={selectedContractor || ""}
              onChange={(e) => setSelectedContractor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-[32px] focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Оберіть...</option>
              {contractors.map((contractor, index) => (
                <option key={index} value={contractor}>
                  {contractor}
                </option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold mt-4 mb-2">
              Завантажте файл (PDF):
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-[32px] overflow-hidden">
              <label className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 transition">
                <span className="text-gray-700">
                  {file ? file.name : "Файл не вибрано"}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="bg-blue-500 text-white px-3 py-2 rounded-r-lg">
                  Обрати файл
                </span>
              </label>
            </div>
            {isFileUploaded && (
              <p className="text-green-500 mt-2 font-semibold">
                Файл завантажено: {file?.name}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <p className="text-gray-600 mb-6 text-center">{option.content}</p>

      {renderContent()}

      <button
        onClick={handleSubmitData}
        className="w-full bg-green-500 text-white mt-6 py-2 rounded-[32px] shadow-lg hover:bg-green-600 transition duration-300"
      >
        Відправити дані
      </button>

      {showSuccessMessage && (
        <div className="text-center mt-4">
          <p className="text-green-600 text-lg font-semibold">
            Дані успішно додано!
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-green-500 text-white px-5 py-2 rounded-[32px] shadow-lg hover:bg-green-600 transition duration-300"
          >
            Закрити
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionContent;
