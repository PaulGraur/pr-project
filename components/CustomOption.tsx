import React from "react";

interface CustomOptionProps {
  title: string;
  onClick: () => void;
  className?: string;
}

const CustomOption: React.FC<CustomOptionProps> = ({
  title,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} flex justify-center items-center cursor-pointer text-gray-800 hover:text-white font-semibold transition-all duration-300 rounded-[32px] transform hover:scale-105 mini:h-[128px]`}
    >
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
};

export default CustomOption;
