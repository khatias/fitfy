import { supabase } from "../supabase/supabaseClient";

export const handleGoogleLogin = async (e: React.MouseEvent) => {
  e.preventDefault();
  const locale = window.location.pathname.split("/")[1];
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${window.location.origin}/${locale}/api/callback`,
    },
  });

  if (error) {
    console.error("GitHub login error:", error);
  }
};
