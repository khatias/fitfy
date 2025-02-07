"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { FaCheckCircle, FaBoxOpen } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
interface Order {
  id: string;
  name: string;
  quantity: number;
  image?: string;
  name_ka: string;
}

interface OrderItemProps {
  orders: Order[];
}

const OrderItem: React.FC<OrderItemProps> = ({ orders }) => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const t = useTranslations("Orders");
  const getLocalizedText = (enText: string, kaText: string = "") => {
    return currentLocale === "en" ? enText : kaText;
  };
  return (
    <div className="flex min-h-screen">
      <div className="max-w-[1300px] mx-auto w-full px-6 py-10 dark:bg-gray-800 rounded-md">
        {orders?.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700"
              >
                <div className="flex items-center space-x-6">
                  {order.image && (
                    <Image
                      src={
                        order.image?.startsWith("http")
                          ? order.image
                          : "/placeholder.jpg"
                      }
                      alt={order.name || "Default alt text"}
                      width={80}
                      height={80}
                      className="object-cover rounded-md"
                    />
                  )}
                  <div>
                    <div className="flex flex-col items-start space-y-2">
                      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {getLocalizedText(
                          order.name || "",
                          order.name_ka || ""
                        )}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t("quantity")} {order.quantity}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center justify-center max-w-52 text-white bg-gray-900 dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-500 py-2 px-4 rounded-md w-full transition duration-300"
                  >
                    <FaCheckCircle className="inline-block mr-2" size={16} />
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 min-h-screen">
            <FaBoxOpen className="text-gray-500 dark:text-gray-400" size={50} />
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-4">
              {t("noOrders")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
