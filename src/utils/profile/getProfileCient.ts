import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Profile } from "@/types/profile";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: user, error: sessionError } = await supabase.auth.getUser();
      if (sessionError || !user?.user) {
        return null;
      }
      const userProfile: Profile = {
        firstName: user.user.user_metadata.firstName,
        lastName: user.user.user_metadata.lastName,
        userName: user.user.user_metadata.userName,
        location: user.user.user_metadata.location,
        phoneNumber: user.user.user_metadata.phoneNumber,
        birthday: user.user.user_metadata.birthday,
        email: user.user.user_metadata.email,
        avatar_url: user.user.user_metadata.avatar_url,
        lastSignInAt: user.user.last_sign_in_at ?? null,
        address: user.user.user_metadata.address,
      };
      setProfile(userProfile);
    };

    fetchProfile();
  }, []);

  return profile; // Return profile so it can be used in other components
}
