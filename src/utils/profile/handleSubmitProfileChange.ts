import { Profile } from "../../types/profile";
export async function handleSubmitProfileChange(
    formData: Profile,
    setIsEditing: (val: boolean) => void,
    setLoading: (val: boolean) => void
  ) {
    setLoading(true);
    try {
      const res = await fetch("api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
  
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
  