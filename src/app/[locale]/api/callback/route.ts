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
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.json({ error: "Failed to authenticate" }, { status: 400 });
    }

    return NextResponse.redirect(`${url.origin}/${locale}`);
  } catch (err) {
    console.error("Error during authentication process:", err);
    return NextResponse.json({ error: "An error occurred during the authentication process" }, { status: 500 });
  }
}
