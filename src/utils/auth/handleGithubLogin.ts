import { supabase } from "../supabase/supabaseClient";

export const handleGithubLogin = async (e: React.MouseEvent) => {
  e.preventDefault();
  const locale = window.location.pathname.split("/")[1];
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/${locale}/api/callback`,
    },
  });

  if (error) {
    console.error("GitHub login error:", error);
  }
};
