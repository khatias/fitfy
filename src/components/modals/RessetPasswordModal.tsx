"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
interface ResetPasswordModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  email,
  isOpen,
  onClose,
}) => {
  const getEmailDomain = () => {
    const domain = email.split("@")[1];
    return domain ? `https://${domain}` : "#";
  };
  const t = useTranslations("Auth");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl relative text-center transform transition-transform duration-300 scale-95 hover:scale-105">
        <button
          onClick={onClose}
          className="absolute w-8 h-8 top-2 right-4  text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <XMarkIcon />
        </button>

        <p className="text-lg text-gray-700 mb-6 mt-4 ">
          {t("modalTitle1")} <strong className="pr-2">{email}</strong>
          {t("modalTitle2")}
          <a
            href={getEmailDomain()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline px-2"
          >
            inbox
          </a>
          {t("modalTitle3")}
        </p>
        <p className="text-md text-gray-500 mb-8">{t("modalText")}</p>
        <button onClick={onClose}>
          <Link href="/login"> {t("backtologin")} </Link>
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
