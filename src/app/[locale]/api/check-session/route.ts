import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

interface RequestBody {
  sessionId: string;
}

export async function POST(request: Request) {
  const { sessionId }: RequestBody = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log(session);
    if (session.payment_status === "paid") {
      // Update your database to mark the user as subscribed
      // await updateUserSubscriptionStatus(session.client_reference_id, 'active');
    }

    return NextResponse.json({ session });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // Fallback error handling if the error is not an instance of Error
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 400 }
    );
  }
}
