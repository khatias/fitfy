import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  // const locale = url.pathname.split("/")[1];

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      return NextResponse.json(
        { error: "Failed to authenticate" },
        { status: 400 }
      );
    }

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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);

      if (!profile) {
        const newProfile = {
          user_id: user.user.id,
          email: user.user.email,
          first_name: "",
          last_name: "",
          avatar_url: null,
        };

        const { error: insertProfileError } = await supabase
          .from("profiles")
          .insert([newProfile]);

        if (insertProfileError) {
          console.error("Profile creation failed:", insertProfileError);
          return NextResponse.json(
            { error: "Failed to create profile" },
            { status: 500 }
          );
        }

        console.log("Profile created successfully for user:", user.user.id);

        try {
          const customer = await stripe.customers.create({
            email: user.user.email,
          });

          const { error: updateError } = await supabase
            .from("profiles")
            .update({ stripe_customer_id: customer.id })
            .eq("user_id", user.user.id);

          if (updateError) {
            console.error("Failed to link Stripe customer:", updateError);
            return NextResponse.json(
              { error: "Failed to link Stripe customer" },
              { status: 500 }
            );
          }

          console.log("Stripe customer created:", customer.id);
        } catch (stripeError: unknown) {
          if (stripeError instanceof Error) {
            console.error("Stripe customer creation failed:", stripeError.message);
            return NextResponse.json(
              {
                error: `Failed to create Stripe customer: ${stripeError.message}`,
              },
              { status: 500 }
            );
          } else {
            console.error("Unexpected error during Stripe customer creation:", stripeError);
            return NextResponse.json(
              { error: "An unknown error occurred during Stripe customer creation." },
              { status: 500 }
            );
          }
        }
      } else {
        console.log("Profile already exists for user:", user.user.id);
      }
    } else {
      console.log("Profile already exists for user:", user.user.id);
    }

    console.log("OAuth login and profile creation successful!");

    return NextResponse.redirect(`https://fitify-app-chi.vercel.app/en`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during authentication process:", err.message);
      return NextResponse.json(
        { error: `An error occurred during the authentication process: ${err.message}` },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error during authentication process:", err);
      return NextResponse.json(
        { error: "An unknown error occurred during the authentication process." },
        { status: 500 }
      );
    }
  }
}
