"use client";

import React, { JSX, useState } from "react";
import { createCheckoutSession } from "../../../app/actions/stripe";

interface CheckoutFormProps {
  uiMode: "hosted";
  locale: string;
}

interface CheckoutFormProps {
    uiMode: "hosted";
    locale: string;
    priceId: string;
    planName: string;
  }
  
  export default function SubsCheckoutForm({
    uiMode,
    locale,
    priceId,
    planName,
  }: CheckoutFormProps): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
  
    const formAction = async (): Promise<void> => {
      setLoading(true);
  
      const formData = new FormData();
      formData.append("uiMode", uiMode);
      formData.append("priceId", priceId);
      formData.append("locale", locale);
      formData.append("purchaseType", "subscription");
  
      const { url } = await createCheckoutSession(formData);
  
      if (url) {
        window.location.assign(url);
      }
  
      setLoading(false);
    };
  
    return (
      <>
        <h3>{planName}</h3>
        <button
          className="block bg-pink-300 hover:bg-pink-800 transition-all text-white rounded-md px-10 py-4 mt-6 text-center"
          onClick={formAction}
          disabled={loading}
        >
          Join Now
        </button>
      </>
    );
  }
  