"use server";
import { createClient } from "../supabase/server";

export async function updateCartItemQuantity(
  cartItemId: string,
  newQuantity: number
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("cart_item")
    .update({ quantity: newQuantity })
    .eq("id", cartItemId);

  if (error) {
    console.error("Failed to update quantity:", error.message);
  } else {
    console.log("Quantity updated successfully!");
  }
}


