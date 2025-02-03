import React, { JSX } from "react";
import type { Metadata } from "next";
import SubsCheckoutForm from "@/components/subscription/stripe/SubsCheckoutForm";
export const metadata: Metadata = {
  title: "subscription",
};

export default async function IndexPage({
    params,
}: {
  params: { locale?: string };
}): Promise<JSX.Element> {
  const locale = (await params?.locale) || "en";
  return (
    <div>
      <div>
        <h2>Sell More. Earn More.</h2>
        <p>
          Choose a plan that gives your fashion brand the visibility it
          deserves.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="border p-4 rounded-lg ">
          <h2 className="text-xl font-bold">Basic Seller</h2>
          <p className="text-lg font-semibold">$9.99/month</p>
          <ul>
            <li>List 15 products per month</li>
            <li>Standard listing visibility</li>
            <SubsCheckoutForm uiMode="hosted"
  locale={locale}
  priceId="price_1QoUX7GEhEAIciCgj1XPqOuH"
  planName="Basic Seller"/>
          </ul>
        </div>

        <div className="border p-4 rounded-lg ">
          <h2 className="text-xl font-bold">Premium Seller</h2>
          <p className="text-lg font-semibold">$29.99/month</p>
          <ul>
            <li>List up to 50 products per month</li>
            <li>Priority product placement in products</li>
            <li>Featured in category pages</li>
          </ul>
        </div>

        <div className="border p-4 rounded-lg ">
          <h2 className="text-xl font-bold">Brand Partner</h2>
          <p className="text-lg font-semibold">$79.99/month</p>
          <ul>
            <li>Unlimited product listings</li>
            <li>Homepage feature placement</li>
            <li>Featured in category pages</li>
            <li>Priority product placement in products</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
