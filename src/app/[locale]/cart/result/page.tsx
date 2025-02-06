import type { Stripe } from "stripe";
import { createClient } from "@/utils/supabase/server";
import { stripe } from "@/lib/stripe/stripe";
import type { JSX } from "react";

import ResultComponent from "@/components/result/ResultComponent";

export default async function ResultPage(props: {
  searchParams: Promise<{ session_id: string }>;
}): Promise<JSX.Element> {
  const supabase = await createClient();

  const searchParams = await props.searchParams;
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  console.log("metadata", checkoutSession.metadata);

  const lineItems = checkoutSession.line_items?.data || [];

  const productQuantities: Record<string, number> = {};
  const stripePriceIds: string[] = [];

  lineItems.forEach((item) => {
    const priceId = item.price?.id as string;
    const quantity = item.quantity || 1;

    if (priceId) {
      productQuantities[priceId] = quantity;
      stripePriceIds.push(priceId);
    }
  });

  console.log("Product Quantities:", productQuantities);
  console.log("Stripe Price IDs:", stripePriceIds);

  const { data: products, error: productError } = await supabase
    .from("products")
    .select("id, name, primary_image, price, name_ka, stripe_price_id")
    .in("stripe_price_id", stripePriceIds);

  if (productError || !products) {
    console.error("Failed to fetch product details:", productError);
    throw new Error("Failed to fetch product details.");
  }

  console.log("Fetched products:", products);

  const userResponse = await supabase.auth.getUser();
  const userId = userResponse.data.user?.id;

  if (!userId) throw new Error("User is not authenticated.");

  const ordersData = products.map((product) => ({
    stripe_price_id: product.stripe_price_id,
    user_id: userId,
    name: product.name,
    name_ka: product.name_ka,
    price: product.price,
    image: product.primary_image,
    product_id: product.id,
    quantity: productQuantities[product.stripe_price_id] || 1,
    session_id: checkoutSession.id,
    created_at: new Date(),
  }));

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert(ordersData);

  if (orderError) {
    console.error("Error adding the order:", orderError);
    throw new Error("Failed to add the order.");
  }

  console.log("Order added:", orderData);

  return (
    // <div className="min-h-[81vh] flex flex-col items-center justify-center px-6 py-10 bg-white dark:bg-gray-900">
    //   <div className="max-w-lg text-center">
    //     <h1 className="text-3xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
    //       Thank You for Your Purchase!
    //     </h1>
    //     <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
    //       Your order has been confirmed.
    //     </p>

    //     <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
    //       <Link
    //         href="/orders"
    //         className="w-full sm:w-auto bg-customRed hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg text-lg transition text-center"
    //       >
    //         See My Orders
    //       </Link>
    //       <Link
    //         href="/"
    //         className="w-full sm:w-auto bg-black hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-300 font-bold py-3 px-6 rounded-lg text-lg transition text-center"
    //       >
    //         Continue Shopping
    //       </Link>
    //     </div>

    //     <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
    //       <p className="mb-2">
    //         Order details have been sent to your email address.
    //       </p>
    //       <p>
    //         Have questions?{" "}
    //         <Link
    //           href="/contact"
    //           className="text-customRed hover:underline font-medium"
    //         >
    //           Contact us
    //         </Link>
    //         .
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <ResultComponent />
  );
}
