import React from "react";
import { motion } from "framer-motion";

const CustomOption = ({ title, onClick }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer text-center transition hover:bg-blue-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </motion.div>
  );
};

export default CustomOption;
