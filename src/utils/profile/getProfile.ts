import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/types/profile";

export async function getProfile(): Promise<Profile> {
  const supabase = await createClient();
  const { data: userResponse } = await supabase.auth.getUser();
  const user = userResponse?.user;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user?.id)
    .single();
  if (profileError) {
    console.log("failed to fetch profile info");
  }

  return profile;
}
