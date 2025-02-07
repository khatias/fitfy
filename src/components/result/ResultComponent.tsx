import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
function ResultComponent() {
  const t = useTranslations("result");
  return (
    <div className="min-h-[81vh] flex flex-col items-center justify-center px-6 py-10 bg-white dark:bg-gray-900">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {t("thank")}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          {t("orderConf")}
        </p>

        <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/orders"
            className="w-full sm:w-auto bg-customRed hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg text-lg transition text-center"
          >
            {t("seeOrders")}
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto bg-black hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-300 font-bold py-3 px-6 rounded-lg text-lg transition text-center"
          >
            {t("contShopping")}
          </Link>
        </div>

        <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          <p className="mb-2">{t("ordershavebeensent")}</p>
          <p>
            {t("HaveQuestions")}
            <Link
              href="/contact"
              className="text-customRed hover:underline font-medium"
            >
              {t("contactUs")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultComponent;
