"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import flag_GE from "../assets/svgs/ge.svg";
import flag_US from "../assets/svgs/us.svg";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentLocale = pathname.split("/")[1];
  const languages = [
    { code: "en", label: "EN", flag: flag_US },
    { code: "ka", label: "KA", flag: flag_GE },
  ];

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
      >
        <Image
          className="w-6 h-6 rounded-full"
          src={currentLanguage?.flag}
          alt="Current language flag"
        />
        <span className="font-medium text-gray-700  dark:text-white">
          {currentLanguage?.label}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-lg py-2 w-36 z-10 border border-gray-200 dark:bg-gray-700 dark:text- dark:border-none">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="flex items-center space-x-2 cursor-pointer  px-4 py-2 hover:bg-gray-100 transition-colors rounded-lg"
              onClick={() => handleLanguageChange(lang.code)}
            >
              <Image
                className="w-5 h-5 rounded-full"
                src={lang.flag}
                alt={`${lang.label} flag`}
              />
              <span className="font-medium text-gray-600  dark:text-white">
                {lang.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
