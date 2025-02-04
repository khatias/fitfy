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
  const locale = ( params?.locale) || "en";


  return (
    <div>
      <h2>Sell More. Earn More.</h2>
      <p>Choose a plan that gives your fashion brand the visibility it deserves.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">Basic Seller</h2>
          <p className="text-lg font-semibold">₾30/month</p>
          <ul>
            <li>List 15 products per month</li>
            <li>Standard listing visibility</li>
          </ul>
          <SubsCheckoutForm
            uiMode="hosted"
            locale={locale}
            priceId="price_1QoUX7GEhEAIciCgj1XPqOuH"
            planName="Basic Seller"
          />
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">Premium Seller</h2>
          <p className="text-lg font-semibold">₾60/month</p>
          <ul>
            <li>List up to 50 products per month</li>
            <li>Priority product placement in products</li>
            <li>Featured in category pages</li>
          </ul>
          <SubsCheckoutForm
            uiMode="hosted"
            locale={locale}
            priceId="price_1QoVTSGEhEAIciCgPNcA3xjM"
            planName="Premium Seller"
          />
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold">Brand Partner</h2>
          <p className="text-lg font-semibold">₾100/month</p>
          <ul>
            <li>List up to 1000 products per month</li>
            <li>Homepage feature placement</li>
            <li>Featured in category pages</li>
            <li>Priority product placement in products</li>
          </ul>
          <SubsCheckoutForm
            uiMode="hosted"
            locale={locale}
            priceId="price_1QoVaJGEhEAIciCgLrs1B3ie"
            planName="Brand Partner"
          />
        </div>
      </div>
    </div>
  );
}
