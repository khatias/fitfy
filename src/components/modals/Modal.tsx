import React from "react";
import { Link } from "@/i18n/routing";
import { XMarkIcon } from "@heroicons/react/20/solid";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
  link?: string; // Optional link prop
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
  link,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl relative text-center transform transition-transform duration-300 scale-95 hover:scale-105">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2">{message}</p>

        {link ? (
          <Link href={link} className="mt-4 px-4 py-2 bg-black text-white rounded inline-block">
            {buttonText}
          </Link>
        ) : (
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-black text-white rounded"
          >
            {buttonText}
          </button>
          
        )}
          <button
            onClick={onClose}
            className="absolute w-8 h-8 top-2 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
               <XMarkIcon />
          </button>
      </div>
    </div>
  );
};
