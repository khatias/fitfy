import React, { JSX } from "react";
import type { Metadata } from "next";
import SubsCheckoutForm from "@/components/subscription/stripe/SubsCheckoutForm";

export const metadata: Metadata = {
  title: "Pricing",
};

export default async function IndexPage(props: {
  params: Promise<{ locale?: string }>;
}): Promise<JSX.Element> {
  const params = await props.params;
  const locale = params?.locale || "en";

  return (
    <div className="py-12 bg-gray-100 dark:bg-gray-800 h-screen">
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Sell More. Earn More.
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Choose a plan that gives your fashion brand the visibility it
            deserves.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <div className="border flex flex-col justify-between p-6 rounded-lg shadow-sm bg-white dark:bg-gray-700 transition duration-300 hover:scale-105">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Basic Seller
            </h2>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              ₾30/month
            </p>
            <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
              <li>List 15 products per month</li>
              <li>Standard listing visibility</li>
            </ul>
            <div className="mt-6">
              <SubsCheckoutForm
                uiMode="hosted"
                locale={locale}
                priceId="price_1QoUX7GEhEAIciCgj1XPqOuH"
                planName="Basic Seller"
              />
            </div>
          </div>

          <div className="border flex flex-col justify-between  p-6 rounded-lg shadow-md bg-white dark:bg-gray-700 transition duration-300 hover:scale-105">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Premium Seller
            </h2>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              ₾60/month
            </p>
            <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
              <li>List up to 50 products per month</li>
              <li>Priority product placement in products</li>
              <li>Featured in category pages</li>
            </ul>
            <div className="mt-6">
              <SubsCheckoutForm
                uiMode="hosted"
                locale={locale}
                priceId="price_1QoVTSGEhEAIciCgPNcA3xjM"
                planName="Premium Seller"
              />
            </div>
          </div>

          <div className="border p-6 rounded-lg shadow-md bg-white dark:bg-gray-700 transition duration-300 hover:scale-105">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Brand Partner
            </h2>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              ₾100/month
            </p>
            <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
              <li>List up to 1000 products per month</li>
              <li>Homepage feature placement</li>
              <li>Featured in category pages</li>
              <li>Priority product placement in products</li>
            </ul>
            <div className="mt-6">
              <SubsCheckoutForm
                uiMode="hosted"
                locale={locale}
                priceId="price_1QoVaJGEhEAIciCgLrs1B3ie"
                planName="Brand Partner"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
