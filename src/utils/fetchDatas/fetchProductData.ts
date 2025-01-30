"use server";
import { createClient } from "../supabase/server";
import { ProductType } from "@/types/product";
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

export async function getCartData() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return userError;
  }

  const { data: cart, error: cartError } = await supabase
    .from("cart")
    .select(
      "id, cart_item (id, quantity, product_id, name, image, price, stripe_price_id)"
    )
    .eq("user_id", user.id)
    .single();

  if (cartError || !cart) {
    return cartError;
  }
  return cart;
}

export async function getMyProduct() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return userError;
  }
  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_category:product_category_id (
       category_ka, category_en, product_category_id
      ),
      product_condition:product_condition_id (
        condition_ka, condition_en, product_condition_id
      ),
      product_material:product_material_id (
        material_ka, material_en, product_material_id
      ),
      product_color:product_color_id (
        color_en, color_ka,  product_color_id
      )
    `
    )
    .eq("user_id", user.id);

  if (error) {
    return error;
  }
  return product;
}

export const getMyProductById = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_category:product_category_id (
       category_ka, category_en, product_category_id
      ),
      product_condition:product_condition_id (
        condition_ka, condition_en, product_condition_id
      ),
      product_material:product_material_id (
        material_ka, material_en, product_material_id
      ),
      product_color:product_color_id (
        color_en, color_ka,  product_color_id
      )
    `
    )
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
};
export const updateProduct = async (product: ProductType) => {
  const supabase = await createClient();

  // Logging for debugging
  console.log('Updating product:', product);

  const { error } = await supabase
    .from("products")
    .update({
      name: product.name,
      name_ka: product.name_ka,
      price: product.price,
      description_en: product.description_en,
      description_ka: product.description_ka,
      primary_image: product.primary_image,
      product_gender_id: product.product_gender_id,
      product_category_id: product.product_category_id, 
      product_material_id: product.product_material_id, 
      product_color_id: product.product_color_id, 
      product_condition_id: product.product_condition_id, 
    })
    .eq("id", product.id);

  if (error) {
    console.error("Error updating product:", error);
    return null;
  }

  // Re-fetch product after update to check if the category was updated
  const updatedProduct = await getMyProductById(product.id);

  if (updatedProduct) {
    console.log('Updated product successfully:', updatedProduct);
  } else {
    console.log('Failed to fetch updated product');
  }

  return product;
};

