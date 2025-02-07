'use client'
import React from "react";
import { FaShoppingCart, FaCreditCard, FaArrowLeft, FaHome } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
interface Order {
  created_at: string;
  price: number;
  payment_id: string;
  stripe_price_id: string;
  name_ka: string;
  name: string;
}

interface OrderDetailItemProps {
  order: Order;
}

const OrderDetailItem: React.FC<OrderDetailItemProps> = ({ order }) => {
      const pathname = usePathname();
      const currentLocale = pathname.split("/")[1];
      const t = useTranslations("Orders");
      const getLocalizedText = (enText: string, kaText: string = "") => {
        return currentLocale === "en" ? enText : kaText;
      };
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12">
      <div className="max-w-3xl mx-auto w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
        {t("orderDetails")}
        </h1>

        <div className="space-y-8">
          <div className="flex items-start">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 mr-4">
              <FaShoppingCart className="text-gray-600 dark:text-gray-400" size={30} />
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
              {getLocalizedText(
                          order.name || "",
                          order.name_ka || ""
                        )}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
              {t("orderON")} {new Date(order?.created_at).toLocaleDateString()}
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2">
                ${(order.price / 100).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 mr-4">
              <FaCreditCard className="text-gray-600 dark:text-gray-400" size={30} />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
              {t("paymentInformation")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Payment ID: <span>{order.payment_id}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Stripe Price ID: <span>{order.stripe_price_id}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              href="/orders"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
            >
              <FaArrowLeft className="inline-block mr-2" size={16} />
              {t("backtomyORders")}
            </Link>

            <Link
              href="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
            >
              <FaHome className="inline-block mr-2" size={16} />
              {t("HomePAge")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItem;
