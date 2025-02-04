import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/types/profile";

export async function getUserProfile(): Promise<Profile> {
  const supabase = await createClient();
  const { data: userResponse } = await supabase.auth.getUser();
  const user = userResponse?.user;

  return {
    first_name: user?.user_metadata?.firstName || "",
    last_name: user?.user_metadata?.lastName || "",
    user_name:
      user?.user_metadata?.userName || user?.user_metadata?.user_name || "",
    location: user?.user_metadata?.location || "",
    phone_number: user?.user_metadata?.phone_number || "",
    birthday: user?.user_metadata?.birthday || "",
    email: user?.email || "",
    avatar_url: user?.user_metadata?.avatar_url || null,
    lastSignInAt: user?.last_sign_in_at || null,

      address_street: user?.user_metadata?.address?.street || "",
      address_city: user?.user_metadata?.address?.city || "",
      address_state: user?.user_metadata?.address?.state || "",
      address_postal_code: user?.user_metadata?.address?.postalCode || "",
      address_country: user?.user_metadata?.address?.country || "",
    
  };
}
