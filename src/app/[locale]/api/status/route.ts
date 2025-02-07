import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      return new Response(JSON.stringify({ authenticated: true }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return new Response(
      JSON.stringify({ error: "Error checking authentication status" }),
      { status: 500 }
    );
  }
}
 