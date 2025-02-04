import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: Request): Promise<NextResponse> {
  const supabase = await createClient();
  try {
    const { data: user, error: sessionError } = await supabase.auth.getUser();
    if (sessionError) {
      console.error("Error retrieving user:", sessionError);
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 400 }
      );
    }

    if (!user || !user.user.id) {
      console.error("User ID is missing from the session.");
      return NextResponse.json(
        { error: "User ID is missing" },
        { status: 400 }
      );
    }

    console.log("User ID:", user.user.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("user_id", user.user.id)
      .single();

    console.log("Customer data:", data);
    console.log("Error fetching customer data:", error);

    if (error || !data?.stripe_customer_id) {
      return NextResponse.json(
        { error: "Stripe customer ID not found for the user" },
        { status: 400 }
      );
    }

    const customerId = data.stripe_customer_id;

    console.log("Customer ID:", customerId);

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${request.headers.get("origin")}`,
    });
    console.log(session)
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Error creating portal session" },
      { status: 500 }
    );
  }
}
