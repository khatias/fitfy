import { supabase } from "../supabase/supabaseClient";

interface FormData {
  password: string;
}

export const handleConfirmPassword = async (
  formData: FormData
): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      throw new Error(`Error resetting password: ${error.message}`);
    }

    console.log("Password updated successfully:", data);
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
};
