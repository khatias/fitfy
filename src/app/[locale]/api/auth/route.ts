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

      const newProfile = {
        user_id: user?.id,
        email: user?.email,
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
