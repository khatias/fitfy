"use server";
import { createClient } from "../supabase/server";
export async function removeCartItem(cartItemId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("cart_item")
    .delete()
    .eq("id", cartItemId);
  if (error) {
    console.error("Failed to remove cart item:", error.message);
  } else {
    console.log("Cart item removed successfully!");
  }
}
