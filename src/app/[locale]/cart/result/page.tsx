import type { Stripe } from "stripe";
import { createClient } from "@/utils/supabase/server";
import { stripe } from "@/lib/stripe/stripe";
import type { JSX } from "react";
import { Link } from "@/i18n/routing";

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

  // Get all line items (contains product and quantity details)
  const lineItems = checkoutSession.line_items?.data || [];

  // Extract product quantities using Stripe price IDs
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

  // Fetch product details using the Stripe price_id (which should be mapped in Supabase)
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

  // Prepare order data for insertion
  const ordersData = products.map((product) => ({
    stripe_price_id: product.stripe_price_id,
    user_id: userId,
    name: product.name,
    name_: product.name_ka,
    price: product.price,
    image: product.primary_image,
    product_id: product.id,
    quantity: productQuantities[product.stripe_price_id] || 1, // Assign correct quantity
    session_id: checkoutSession.id, // Storing session_id for tracking
    created_at: new Date(), // Adding timestamp
  }));

  console.log("Orders Data:", ordersData);

  // Insert order records
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert(ordersData);

  if (orderError) {
    console.error("Error adding the order:", orderError);
    throw new Error("Failed to add the order.");
  }

  console.log("Order added:", orderData);

  return (
    <div className="container">
      <h1>Thank you for your purchase!</h1>
      <p>Your order is confirmed.</p>

      <Link href="/">Go to home</Link>
    </div>
  );
}
