import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface SuccessProductCreationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessProductCreation: React.FC<SuccessProductCreationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl relative text-center transform transition-transform duration-300 scale-95 hover:scale-105">
      <h3 className="text-xl font-semibold mb-4">Product Created Successfully!</h3>
        <p className="mt-4 text-center text-gray-700">Your product has been added to the products.</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="absolute w-8 h-8 top-2 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
               <XMarkIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
