"use client";

import React from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import { handleLogout } from "@/utils/auth/handleLogout";
function Banner() {
  const t = useTranslations("Header");
  return (
    <div className=" w-full py-1 bg-gray-100 dark:bg-gray-700">
      <div className="flex items-center justify-between m-auto max-w-[1440px] px-6">
        <ThemeSwitcher />

        <span className="text-xs font-medium">{t("headerBanner")}</span>
        <div className="flex items-center space-x-6">
          <LanguageSwitcher />
          <span className="h-6 w-0.5 bg-gray-300 dark:bg-gray-600"></span>{" "}
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-white hover:bg-customRed transition-colors duration-300 px-1 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-customRed focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
