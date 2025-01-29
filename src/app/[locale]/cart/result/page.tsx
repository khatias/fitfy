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
    console.log("metadata",checkoutSession.metadata)

  const productIdsString = checkoutSession.metadata?.product_ids;
  if (!productIdsString) {
    throw new Error("No product IDs found in the session metadata.");
  }

  const productIds = productIdsString.split(",");

  console.log("productIds:", productIds);
  console.log("productIdsString:", productIdsString);

  const userResponse = await supabase.auth.getUser();
  const userId = userResponse.data.user?.id;

  if (!userId) throw new Error("User is not authenticated.");


  const { error: clearCartError } = await supabase
    .from("cart_item")
    .delete()
    .in("product_id", productIds); // Use the product IDs for deletion

  if (clearCartError) {
    console.error("Error clearing the cart:", clearCartError);
    throw new Error("Failed to clear the cart.");
  }


  return (
    <div className="container">
    <h1>Thank you for your purchase!</h1>
    <p>Your order is confirmed. </p>
    
    <Link href="/">Go to home</Link>
    </div>
  );
}


