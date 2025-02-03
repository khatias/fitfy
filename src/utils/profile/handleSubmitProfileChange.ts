import { Profile } from "../../types/profile";
import { supabase } from "../supabase/supabaseClient";

export async function handleSubmitProfileChange(
  formData: Profile,
  setIsEditing: (val: boolean) => void,
  setLoading: (val: boolean) => void
) {
  setLoading(true);
  try {
    // Make API call to update profile on the server
    const res = await fetch("api/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    console.log(formData);

    // Fetch the authenticated user
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

    
    const { data:data ,error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: formData.firstName,
        last_name: formData.lastName,
        user_name: formData.userName,
        location: formData.location,
        phone_number: formData.phoneNumber,
        avatar_url: formData.avatar_url,
        address_street: formData.address.street,
        address_city: formData.address.city,
        address_state: formData.address.state,
        address_postal_code: formData.address.postalCode,
        address_country: formData.address.country,
      })
      .eq("user_id", user.user.id);
console.log(user.user.id)
    if (updateError) {
      console.error("Error updating profile:", updateError.message);
      alert(`Failed to update profile: ${updateError.message}`);
    }
if(data){
  console.log(data)
}
    // If update is successful, show success message
    if (res.ok) {
      alert("Profile updated successfully!");
      setIsEditing(false);
    } else {
      console.error("Error updating profile:", result.error);
      alert(`Failed to update profile: ${result.error || "Unknown error"}`);
    }
  } catch (err) {
    console.error("Network error:", err);
    alert("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
}
