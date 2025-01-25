import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/types/profile";

export async function getUserProfile(): Promise<Profile> {
  const supabase = await createClient();
  const { data: userResponse } = await supabase.auth.getUser();
  const user = userResponse?.user;

  return {
    firstName: user?.user_metadata?.firstName || "",
    lastName: user?.user_metadata?.lastName || "",
    userName:
      user?.user_metadata?.userName || user?.user_metadata?.user_name || "",
    location: user?.user_metadata?.location || "",
    phoneNumber: user?.user_metadata?.phone_number || "",
    birthday: user?.user_metadata?.birthday || "",
    email: user?.email || "",
    avatar_url: user?.user_metadata?.avatar_url || null,
    lastSignInAt: user?.last_sign_in_at || null,
    address: {
      street: user?.user_metadata?.address?.street || "",
      city: user?.user_metadata?.address?.city || "",
      state: user?.user_metadata?.address?.state || "",
      postalCode: user?.user_metadata?.address?.postalCode || "",
      country: user?.user_metadata?.address?.country || "",
    },
  };
}
