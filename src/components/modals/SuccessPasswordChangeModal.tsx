"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface SuccessPasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessPasswordChangeModal: React.FC<SuccessPasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl relative text-center transform transition-transform duration-300 scale-95 hover:scale-105">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute w-8 h-8 top-2 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <XMarkIcon />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Password Changed Successfully
        </h2>
        <p className="text-gray-500 mb-4">
          Your password has been updated successfully.
        </p>

    
          <Link href="/login">Go to Login</Link>
   
      </div>
    </div>
  );
};

export default SuccessPasswordChangeModal;
