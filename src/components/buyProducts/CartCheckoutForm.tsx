"use client";

import React, { useState } from "react";
import { JSX } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";

interface CartItemType {
  id: string | number;
  stripe_price_id: string;
  quantity: number;
  name: string;
  image: string;
  price: number;
  product_id: string | number;
}

interface CheckoutFormProps {
  uiMode: "hosted";
  locale: string;
  cartItems: CartItemType[];
}

export default function CheckoutFormCart({
  uiMode,
  locale,
  cartItems,
}: CheckoutFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const formAction = async (): Promise<void> => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("uiMode", uiMode);
      formData.append("locale", locale);
      formData.append("purchaseType", "cart");
      formData.append(
        "lineItems",
        JSON.stringify(
          cartItems.map((product) => ({
            id: product.id,
            price: product.stripe_price_id,
            quantity: product.quantity,
            product_id:product.product_id
          }))
        )
      );

      const { url } = await createCheckoutSession(formData);

      if (url) {
        window.location.assign(url);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className={`px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={formAction}
        disabled={loading}
        data-cy="buy-button"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-t-4 border-green-300 border-solid rounded-full animate-spin"></div>
            <span className="ml-3">Processing...</span>
          </span>
        ) : (
          "Checkout"
        )}
      </button>
    </div>
  );
}
