import { Profile } from "../../types/profile";
import { supabase } from "../supabase/supabaseClient";

export async function handleSubmitProfileChange(
  formData: Profile,
  setIsEditing: (val: boolean) => void,
  setLoading: (val: boolean) => void
) {
  setLoading(true);
  try {
    const { data: user, error: sessionError } = await supabase.auth.getUser();

    if (sessionError) {
      console.error("Error fetching user:", sessionError.message);
      alert("Error fetching user data.");
      return;
    }

    if (!user) {
      console.error("No user found.");
      alert("No user found.");
      return;
    }

    const { data: updateData, error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_name: formData.user_name,
        location: formData.location,
        phone_number: formData.phone_number,
        avatar_url: formData.avatar_url,
        address_street: formData.address_street,
        address_city: formData.address_city,
        address_state: formData.address_state,
        address_postal_code: formData.address_postal_code,
        address_country: formData.address_country,
      })
      .eq("user_id", user.user.id);

    if (updateError) {
      console.error("Error updating profile:", updateError.message);
      alert(`Failed to update profile: ${updateError.message}`);
      return;
    }

    if (updateData) {
      console.log("Updated profile data:", updateData);
    }

    setIsEditing(false);
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
}
