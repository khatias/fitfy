'use client'
import React from "react";
import { useTranslations } from "next-intl";

function Banner() {
  const t = useTranslations("Header");
  return (
    <div className="flex items-center justify-center m-auto w-full py-3 bg-gray-100 dark:bg-gray-700">
      <span className="text-xs font-medium">{t("headerBanner")}</span>
    </div>
  );
}

export default Banner;
