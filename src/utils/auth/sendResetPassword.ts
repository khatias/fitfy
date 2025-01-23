import { supabase } from "../supabase/supabaseClient";

export const sendResetPassword = async (email: string): Promise<void> => {
  const locale = window.location.pathname.split("/")[1];

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${locale}/reset-password`,
    });

    if (error) {
      console.error("Error resetting password:", error.message);
    } else {
      console.log("Password reset email sent:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};
