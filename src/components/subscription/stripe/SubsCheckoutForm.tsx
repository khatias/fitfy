"use client";

import React, { JSX, useState, useEffect } from "react";
import { createCheckoutSession } from "../../../app/actions/stripe";
import { supabase } from "@/utils/supabase/supabaseClient";

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
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile and stripe_customer_id
    const fetchUserProfile = async () => {
      const userResponse = await supabase.auth.getUser();
      const userId = userResponse.data.user?.id;

      if (userId) {
        const { data, error } = await supabase
          .from("profiles")
          .select("stripe_customer_id")
          .eq("user_id", userId)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
        } else if (data?.stripe_customer_id) {
          setStripeCustomerId(data.stripe_customer_id);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const formAction = async (): Promise<void> => {
    setLoading(true);

    const formData = new FormData();
    formData.append("uiMode", uiMode);
    formData.append("priceId", priceId);
    formData.append("locale", locale);
    formData.append("purchaseType", "subscription");

    // Append the Stripe customer ID if available
    if (stripeCustomerId) {
      formData.append("stripeCustomerId", stripeCustomerId);
    }

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
        className="block bg-black hover:bg-slate-700 transition-all text-white rounded-md px-10 py-4 mt-6 text-center"
        onClick={formAction}
        disabled={loading || !stripeCustomerId}
      >
        {loading ? "Processing..." : "Join Now"}
      </button>
    </>
  );
}
