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

export async function fetchConditions() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_condition").select("*");

  if (error) {
    console.error("Error fetching conditions:", error);
    return [];
  } else {
    console.log("Conditions:", data);
    return data; 
  }
}


export async function fetchMaterials() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_material").select("*");

  if (error) {
    console.error("Error fetching materials:", error);
    return [];
  } else {
    console.log("Materials:", data);
    return data; 
  }
}


export async function fetchColors() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_color").select("*");

  if (error) {
    console.error("Error fetching colors:", error);
    return [];
  } else {
    console.log("colors:", data);
    return data; 
  }
}