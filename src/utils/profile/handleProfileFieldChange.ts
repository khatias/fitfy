import { Profile } from "@/types/profile";
export function handleProfileFieldChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<Profile>>
) {
  const { name, value } = e.target;

  if (name.startsWith("address.")) {
    const addressField = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [addressField]: value,
      },

      
    }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
}
