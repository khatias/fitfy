import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const action = String(formData.get("action"));

    const supabase = await createClient();

    if (action === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        return NextResponse.json(
          { error: signInError.message },
          { status: 400 }
        );
      }

      return NextResponse.json({
        message: "Login successful",
        redirectTo: `/`,
      });
    }

    if (action === "signup") {
      const {
        data: { user },
        error: signUpError,
      } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        return NextResponse.json(
          { error: signUpError.message },
          { status: 400 }
        );
      }

      if (!user) {
        return NextResponse.json(
          { error: "Failed to create user." },
          { status: 500 }
        );
      }

      const newProfile = {
        user_id: user.id,
        email: user.email,
        first_name: "",
        last_name: "",
        avatar_url: null,
      };

      const { error: insertProfileError } = await supabase
        .from("profiles")
        .insert([newProfile]);

      if (insertProfileError) {
        return NextResponse.json(
          { error: `Profile creation failed: ${insertProfileError.message}` },
          { status: 500 }
        );
      }

      // Now, create a Stripe customer
      try {
        const customer = await stripe.customers.create({
          email: user.email, // Use the user's email to create the Stripe customer
        });

        // Optionally store the Stripe customer ID in Supabase
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ stripe_customer_id: customer.id })
          .eq("user_id", user.id);

        if (updateError) {
          return NextResponse.json(
            { error: `Failed to link Stripe customer: ${updateError.message}` },
            { status: 500 }
          );
        }

        console.log("Stripe customer created:", customer.id);
      } catch (error) {
        // Handle stripeError with proper type checking
        if (error instanceof Error) {
          console.error("Stripe customer creation failed:", error);
          return NextResponse.json(
            { error: `Failed to create Stripe customer: ${error.message}` },
            { status: 500 }
          );
        }

        // Fallback error handling if error is not an instance of Error
        console.error("Unknown error during Stripe customer creation:", error);
        return NextResponse.json(
          { error: "An unexpected error occurred during Stripe customer creation." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Sign-up successful.",
        redirectTo: `/`,
      });
    }

    return NextResponse.json(
      { error: "Invalid action specified." },
      { status: 400 }
    );
  } catch (err) {
    console.error("Internal server error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
