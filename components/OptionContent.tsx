import React, { useState } from "react";

interface OptionContentProps {
  option: { title: string; content: string };
  onClose: () => void;
}

const OptionContent: React.FC<OptionContentProps> = ({ option, onClose }) => {
  const [selectedContractor, setSelectedContractor] = useState<string | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
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

  const handleSelectContractor = (contractor: string) => {
    setSelectedContractor(contractor);
  };

  const handleSubmit = () => {
    if (selectedContractor && isFileUploaded) {
      setShowSuccessMessage(true);
    } else {
      alert("Будь ласка, оберіть контрагента та завантажте файл.");
    }
  };

  const contractors = ["Контрагент 1", "Контрагент 2", "Контрагент 3"];

  return (
    <div>
      {showSuccessMessage ? (
        <div className="text-center">
          <p className="text-green-600 text-lg font-semibold">
            Дані успішно додано!
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
          >
            Закрити
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-6">{option.content}</p>

          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2">
              Оберіть контрагента:
            </label>
            <select
              onChange={(e) => handleSelectContractor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            >
              <option value="">Оберіть...</option>
              {contractors.map((contractor, index) => (
                <option key={index} value={contractor}>
                  {contractor}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2">
              Завантажте файл (PDF):
            </label>
            <div className="flex items-center">
              <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer shadow-md hover:bg-blue-600 transition duration-300">
                Обрати файл
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {isFileUploaded && (
                <span className="text-gray-700 ml-4">{file?.name}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-5 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 transform hover:scale-105"
          >
            Підтвердити
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionContent;
