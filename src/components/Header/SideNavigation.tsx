import React, { useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ isOpen, onClose }) => {
  const sideNavRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Header");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      ref={sideNavRef}
      className={`fixed top-0 right-0 w-full h-full bg-white transition-transform transform z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        ${
          isOpen ? "duration-300 ease-in-out" : "duration-300 ease-in-out"
        } // Smooth transitions
        `}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
      <ul className="pt-16 flex flex-col px-4">
        <li className="border-b border-gray-200 w-full py-4">
          <Link
            href={`/products`}
            className="text-lg font-medium text-gray-800 hover:text-indigo-500 transition-colors duration-300 block"
            onClick={handleLinkClick}
          >
            {t("products")}
          </Link>
        </li>
        <li className="border-b border-gray-200 w-full py-4">
          <Link
            href={`/about`}
            className="text-lg font-medium text-gray-800 hover:text-indigo-500 transition-colors duration-300 block"
            onClick={handleLinkClick}
          >
             {t("aboutUs")}
          </Link>
        </li>
        <li className="border-b border-gray-200 w-full py-4">
          <Link
            href={`/blog`}
            className="text-lg font-medium text-gray-800 hover:text-indigo-500 transition-colors duration-300 block"
            onClick={handleLinkClick}
          >
            {t("blog")}  
          </Link>
        </li>
        <li className="border-b border-gray-200 w-full py-4">
          <Link
            href={`/privacy-policy`}
            className="text-lg font-medium text-gray-800 hover:text-indigo-500 transition-colors duration-300 block"
            onClick={handleLinkClick}
          >
          {t("privacyPolicy")}
          </Link>
        </li>
        <li className="border-b border-gray-200 w-full py-4">
          <Link
            href={`/contact`}
            className="text-lg font-medium text-gray-800 hover:text-indigo-500 transition-colors duration-300 block"
            onClick={handleLinkClick}
          >
          {t("contact")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavigation;
