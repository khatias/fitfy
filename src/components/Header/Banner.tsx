"use client";

import React from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";

function Banner() {
  const t = useTranslations("Header");
  return (
    <div className=" w-full py-1 bg-gray-100 dark:bg-gray-700">
      <div className="flex items-center justify-between m-auto max-w-[1440px] px-6">
        <ThemeSwitcher />

        <span className="text-xs font-medium">{t("headerBanner")}</span>
        <div className="flex items-center space-x-6">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Banner;
