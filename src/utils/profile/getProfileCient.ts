import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Profile } from "@/types/profile";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: user, error: sessionError } = await supabase.auth.getUser();

      if (sessionError || !user?.user) {
        console.error("Error fetching user:", sessionError?.message);
        setLoading(false);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        setLoading(false);
        return;
      }

      setProfile(profileData);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return { profile, loading };
}
