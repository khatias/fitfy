"use server";
import { createClient } from "../supabase/server";

export async function createBlog(formData: FormData) {
  const supabase = await createClient();

  const title_en = formData.get("title_en") as string;
  const title_ka = formData.get("title_ka") as string;
  const status = formData.get("status") as string;
  const content_ka = formData.get("content_ka") as string;
  const content_en = formData.get("content_en") as string;
  const description_ka = formData.get("description_ka") as string;
  const description_en = formData.get("description_en") as string;
  const featured_image = formData.get("featured_image") as string;
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;
  console.log(formData);
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        title_en,
        title_ka,
        content_en,
        content_ka,
        description_en,
        description_ka,
        featured_image,
        user_id,
        status
      })
      .single();

    if (error) {
      console.error("Error inserting into Supabase:", error);
      return {
        success: false,
        message: "Failed to insert product into the database.",
      };
    }

    console.log("Product inserted into Supabase:", data);

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error("Error creating product:", error);

    return {
      success: false,
      message: "Error creating product. Please try again.",
    };
  }
}
