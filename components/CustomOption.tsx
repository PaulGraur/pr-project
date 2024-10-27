"use client";
import React from "react";
import { motion } from "framer-motion";

interface CustomOptionProps {
  title: string;
  onClick: () => void;
}

const CustomOption: React.FC<CustomOptionProps> = ({ title, onClick }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md cursor-pointer text-center transition-all transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-green-400"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <h3 className="text-xl font-medium text-green-700">{title}</h3>
    </motion.div>
  );
};

export default CustomOption;
