"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe/stripe";

export async function createCheckoutSession(
  data: FormData
): Promise<{ client_secret: string | null; url: string | null }> {
  const uiMode = data.get("uiMode") as Stripe.Checkout.SessionCreateParams.UiMode;
  const locale = (data.get("locale") || "en") as string;
  const purchaseType = data.get("purchaseType") as "subscription" | "cart";
  const origin: string = (await headers()).get("origin") || process.env.NEXT_PUBLIC_SITE_URL!;

  // Validate purchase type
  if (!["subscription", "cart"].includes(purchaseType)) {
    throw new Error("Invalid purchase type. Must be 'subscription' or 'cart'.");
  }

  // Handle subscription purchase type
  if (purchaseType === "subscription") {
    return handleSubscriptionPurchase(data, uiMode, locale, origin);
  }

  // Handle cart purchase type
  if (purchaseType === "cart") {
    return handleCartPurchase(data, uiMode, locale, origin);
  }

  // Fallback
  throw new Error("Invalid purchase type.");
}

// Handle subscription purchase type
async function handleSubscriptionPurchase(
  data: FormData,
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode,
  locale: string,
  origin: string
): Promise<{ client_secret: string | null; url: string | null }> {
  const priceId = data.get("priceId") as string;

  if (!priceId) {
    throw new Error("Price ID is required for subscriptions but was not provided.");
  }

  const successUrl = `${origin}/${locale}/pricing/result?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/${locale}/subscribe/cancel`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    ui_mode: uiMode,
  });

  return { client_secret: checkoutSession.client_secret, url: checkoutSession.url };
}

// Handle cart purchase type
async function handleCartPurchase(
  data: FormData,
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode,
  locale: string,
  origin: string
): Promise<{ client_secret: string | null; url: string | null }> {
  const lineItemsRaw = data.get("lineItems");
  if (!lineItemsRaw) {
    throw new Error("Line items are required for cart purchases but were not provided.");
  }

  let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let productIds: number[] = [];

  try {
    const parsedLineItems = JSON.parse(lineItemsRaw as string) as {
      price: string;
      quantity: number;
      id: string; 
      product_id:number;
    }[];

    lineItems = parsedLineItems.map((item) => ({
      price: item.price,
      quantity: item.quantity,
    }));

    productIds = parsedLineItems.map((item) => item.product_id); 
  } catch {
    throw new Error("Invalid line items format. Must be a valid JSON string.");
  }

  if (uiMode === "embedded") {
    throw new Error("Embedded UI mode is not supported for cart purchases.");
  }

  const successUrl = `${origin}/${locale}/cart/result?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/${locale}/cart`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    ui_mode: uiMode,
    metadata: { product_ids: productIds.join(",") }, 
  });

  return { client_secret: checkoutSession.client_secret, url: checkoutSession.url };
}
