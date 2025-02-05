"use client";

import React from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";

function Banner() {
  const t = useTranslations("Header");
  return (
    <div className=" w-full max-h-10 bg-red-100 dark:bg-gray-700">
      <div className="flex items-center justify-between m-auto max-w-[1300px] px-6">
        <ThemeSwitcher />

        <span className="text-xs font-medium text-center">{t("headerBanner")}</span>
        <div className="flex items-center ">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Banner;
