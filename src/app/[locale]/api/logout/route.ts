import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return NextResponse.json(
        { error: "Failed to retrieve user data" },
        { status: 400 }
      );
    }

    console.log("User data:", user);

    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error("Sign-out error:", signOutError);
      return NextResponse.json({ error: "Failed to log out" }, { status: 400 });
    }

    return NextResponse.json({ message: "Logged out successfully", user });
  } catch (err) {
    console.error("Unexpected error during logout:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
