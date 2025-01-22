import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

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
        console.error("Login error:", signInError.message);
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
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error("Sign-up error:", signUpError.message);
        return NextResponse.json(
          { error: signUpError.message },
          { status: 400 }
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
