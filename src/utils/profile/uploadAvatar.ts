import { supabase } from "@/utils/supabase/supabaseClient";

export async function uploadAvatar(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  // Get the public URL after successful upload
  const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(data.path);
  return publicUrl;  // Return the URL of the uploaded avatar
}
