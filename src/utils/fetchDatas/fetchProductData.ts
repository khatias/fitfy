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

export async function getCartData (){
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return (userError)
  }


  const { data: cart, error: cartError } = await supabase
    .from("cart")
    .select(
      "id, cart_item (id, quantity, product_id, name, image, price, stripe_price_id)"
    )
    .eq("user_id", user.id)
    .single();

  if (cartError || !cart) {
    return (cartError);
  }

 return cart

}