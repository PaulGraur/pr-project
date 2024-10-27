"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-[32px] p-8 w-full max-w-lg mx-4 relative shadow-lg transform transition-all"
        initial={{ y: "-50vh" }}
        animate={{ y: 0 }}
        exit={{ y: "50vh" }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-center text-2xl font-bold text-green-700 mb-4">{title}</h2>
        <div className="text-gray-700 text-lg">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
