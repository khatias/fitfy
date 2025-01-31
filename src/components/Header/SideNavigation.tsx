import React, { useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ isOpen, onClose }) => {
  const sideNavRef = useRef<HTMLDivElement>(null);

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
    onClose(); // Close sidebar when a link is clicked
  };

  return (
    <div
      ref={sideNavRef}
      className={`fixed top-0 right-0 w-full h-full bg-black text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white"
      >
        Close
      </button>
      <ul className="pt-16 flex flex-col gap-6 px-4">
        <li>
          <Link
            href={`/products`}
            className="text-lg hover:text-gray-400"
            onClick={handleLinkClick}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href={`/about`}
            className="text-lg hover:text-gray-400"
            onClick={handleLinkClick}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href={`/blog`}
            className="text-lg hover:text-gray-400"
            onClick={handleLinkClick}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href={`/privacy-policy`}
            className="text-lg hover:text-gray-400"
            onClick={handleLinkClick}
          >
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavigation;
