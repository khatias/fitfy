import React, { JSX } from "react";
import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe/stripe";
import { Link } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/server";
export default async function ProductResultPage(props: {
  searchParams: Promise<{ session_id: string }>;
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  if (!searchParams.session_id) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <p className="text-xl text-red-500">
          Invalid session ID. Please try again.
        </p>
      </div>
    );
  }

  try {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(searchParams.session_id, {
        expand: ["line_items", "payment_intent", "subscription"],
      });

    const paymentIntent =
      checkoutSession.payment_intent as Stripe.PaymentIntent | null;
    const subscription =
      checkoutSession.subscription as Stripe.Subscription | null;

    if (!paymentIntent && !subscription) {
      return (
        <div className="flex items-center justify-center h-screen bg-red-100">
          <p className="text-xl text-red-500">
            Payment Intent or Subscription not found. Please contact support.
          </p>
        </div>
      );
    }

    let formattedAmount = "0.00";
    if (paymentIntent) {
      formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GEL",
      }).format(paymentIntent.amount / 100);
    } else if (subscription?.items?.data?.[0]?.plan?.amount) {
      formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GEL",
      }).format(subscription.items.data[0].plan.amount / 100);
    }

    if (checkoutSession.payment_status === "paid" && subscription) {
      const productId = subscription.items.data[0]?.price.product;
      const subscriptionStatus = subscription.status;

      if (typeof productId !== "string") {
        console.error("Invalid product ID:", productId);
        return (
          <div className="flex items-center justify-center h-screen bg-red-100">
            <p className="text-xl text-red-500">
              Subscription details are missing. Please contact support.
            </p>
          </div>
        );
      }

      const product = await stripe.products.retrieve(productId);
      const productName = product.name;

      const { data: user, error: sessionError } = await supabase.auth.getUser();
      if (sessionError || !user?.user?.id) {
        console.error("Error fetching user session:", sessionError);
        return (
          <div className="flex items-center justify-center h-screen bg-red-100">
            <p className="text-xl text-red-500">
              User session not found. Please log in again.
            </p>
          </div>
        );
      }
      console.log(productName);
      const userId = user.user.id;
      let product_count = 0;
      if (productName === "Fitify Basic Seller") product_count = 15;
      else if (productName === "Fittify  Premium Seller") product_count = 50;
      else if (productName === "Brand Partner") product_count = 1000;

      const { error } = await supabase
        .from("profiles")
        .update({
          subscription_plan: productId,
          subscription_name: productName,
          subscription_status: subscriptionStatus,
          product_count: product_count,
        })
        .eq("user_id", userId);

      if (error) {
        console.error("Error updating subscription in the database:", error);
      }
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="p-12 rounded-3xl shadow-sm bg-white max-w-lg w-full text-center">
          <div className="flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 8a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Subscription Successful!
          </h1>
          <p className="text-2xl text-gray-700 mb-6 leading-relaxed">
            Thank you for subscribing. You&apos;re all set to enjoy the
            benefits!
          </p>
          <p className="text-xl text-gray-700 mb-6">
            You will be charged{" "}
            <span className="font-semibold text-red-600">
              {formattedAmount}
            </span>
          </p>
          <p className="text-gray-600 mb-8 text-sm">
            For any questions, please contact our{" "}
            <Link href="/contact" className="text-red-500 hover:underline">
              support team
            </Link>
            .
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 ease-in-out"
          >
            Go to the homepage
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error retrieving session:", error);
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <p className="text-xl text-red-500">
          An unexpected error occurred. Please try again later.
        </p>
      </div>
    );
  }
}
