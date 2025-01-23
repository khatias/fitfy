import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
   
    const supabase = await createClient();


    const { data: session, error: sessionError } = await supabase.auth.getSession();
    console.log("Session data:", session);

    if (sessionError) {
      console.error("Session error:", sessionError);
      return NextResponse.json({ error: "Failed to retrieve session data" }, { status: 400 });
    }


    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error("Sign-out error:", signOutError);
      return NextResponse.json({ error: "Failed to log out" }, { status: 400 });
    }

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Unexpected error during logout:", err);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
