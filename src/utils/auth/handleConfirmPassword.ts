import { supabase } from "../supabase/supabaseClient";

interface FormData {
  password: string;
}

export const handleConfirmPassword = async (
  formData: FormData
): Promise<string | null> => {
  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    return error.message;
  }

  return null;
};
