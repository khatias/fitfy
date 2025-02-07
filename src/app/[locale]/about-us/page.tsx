'use client'
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
const AboutUs = () => {
  const t = useTranslations("About");
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 max-w-screen-xl mx-auto h-[80vh]">
      <div className="px-6 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between lg:flex-col lg:justify-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-6 transition-colors duration-300 lg:text-center">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 transition-colors duration-300">
              {t("welcome")}{" "}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 transition-colors duration-300">
              {t("about1")}{" "}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 transition-colors duration-300">
              {t("about2")}{" "}
            </p>
            <div className="flex justify-center">
              <Link
                href="/"
                className="bg-black hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              >
                {t("sss")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
