"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Header");
  return (
    <footer className="bg-black p-4 text-center text-sm text-white md:text-left md:p-6 md:text-base">
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="mb-4 md:mb-0 w-full md:w-1/3">
          <h3 className="font-semibold mb-2 text-gray-300"> {t("aboutUs")}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {t("aboutcontent")}
          </p>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="font-semibold mb-2 text-gray-300">{t("quilLink")}</h3>
          <div className="flex flex-col md:flex-row">
            <Link
              href="/home"
              className="mr-4 hover:underline text-white text-sm"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="/about"
              className="mr-4 hover:underline  text-white text-sm"
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/contact"
              className="hover:underline text-white text-sm"
            >
              {t("contact")}
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/4 pt-4 lg:pt-0">
          <h3 className="font-semibold mb-2 text-gray-300"> {t("contact")}</h3>
          <p className="text-sm text-gray-400">
            {t("email")}: sikharulidzekhatiaa@gmail.com
          </p>
          <p className="text-sm text-gray-400">
            {" "}
            {t("phone")}: +1 123 456 7890
          </p>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto mt-4 md:mt-0  md:text-left text-gray-400">
        <p>
          &copy; {currentYear} Fitify. {t("rigtsReserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
