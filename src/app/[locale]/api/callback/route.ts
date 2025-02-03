import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const locale = url.pathname.split("/")[1];

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    // Exchange the authorization code for a session (this step completes the OAuth flow)
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      return NextResponse.json({ error: "Failed to authenticate" }, { status: 400 });
    }

    // Wait for the session to be set and get the user
    const { data: user, error: sessionError } = await supabase.auth.getUser();

    if (sessionError) {
      console.error("Error retrieving user:", sessionError);
      return NextResponse.json({ error: "Failed to get user" }, { status: 400 });
    }

    // Check if user exists and has a valid user.id
    if (!user || !user.user.id) {
      console.error("User ID is missing from the session.");
      return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
    }

    // Fetch the user's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);

      if (!profile) {
        // If profile doesn't exist, create one
        const newProfile = {
          user_id: user.user.id,
          email: user.user.email,
          first_name: "", // Default value for first name
          last_name: "",  // Default value for last name
          avatar_url: null // Avatar URL from user metadata
        };


        const { error: insertProfileError } = await supabase
          .from("profiles")
          .insert([newProfile]);

        if (insertProfileError) {
          console.error("Profile creation failed:", insertProfileError);
          return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
        }

        console.log("Profile created successfully for user:", user.user.id);
      } else {
        // If the profileError isn't PGRST100, log the error and return
        console.error("Unknown profile fetch error:", profileError);
        return NextResponse.json({ error: "Failed to fetch user profile",  });
      }
    } else {
      console.log("Profile already exists for user:", user.user.id);
    }

    // Successfully authenticated and profile creation if necessary
    console.log("Google login and profile creation successful!");

    // Redirect user back to the locale's main page
    return NextResponse.redirect(`${url.origin}/${locale}`);
  } catch (err) {
    console.error("Error during authentication process:", err);
    return NextResponse.json({ error: "An error occurred during the authentication process" }, { status: 500 });
  }
}
