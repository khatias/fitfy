"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import flag_GE from "../assets/svgs/ge.svg";
import flag_US from "../assets/svgs/us.svg";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1];
  const languages = [
    { code: "en", label: "EN", flag: flag_US },
    { code: "ka", label: "KA", flag: flag_GE },
  ];

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Show the flag of the current language only */}
      <button
        onClick={() => handleLanguageChange(currentLocale === "en" ? "ka" : "en")}
        className="flex items-center space-x-2"
      >
        <Image
          className="w-4 h-4 rounded-full"
          src={currentLanguage?.flag}
          alt={`${currentLanguage?.label} flag`}
        />
        <span className="font-medium text-gray-700 dark:text-white">
          {currentLanguage?.label}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
