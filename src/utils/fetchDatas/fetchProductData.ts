"use server";
import { createClient } from "../supabase/server";

export async function fetchCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_category").select("*");

  if (error) {
    console.error("Error fetching category:", error);
    return [];
  } else {
    console.log("Categories:", data);
    return data;
  }
}
