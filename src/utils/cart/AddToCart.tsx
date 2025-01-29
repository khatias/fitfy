import { createClient } from "../supabase/server";
import { ProductType } from "@/types/product";

export const addToCart = async (product: ProductType): Promise<string> => {
  "use server";

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Please log in to continue");
    }
    const user_id = user.id;
    console.log(user_id);
    const { data: existingCart, error: existingCartError } = await supabase
      .from("cart")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (existingCartError) {
      const { data: newCart, error: newCartError } = await supabase
        .from("cart")
        .insert({ user_id })
        .select();

      if (newCartError) {
        throw new Error(newCartError.message);
      }

      const existingCart = newCart[0];
      console.log(existingCart);
    }
    // Check if the product already exists in the cart
    const { data: existingCartItem, error: cartItemError } = await supabase
      .from("cart_item")
      .select("id, quantity")
      .eq("cart_id", existingCart?.id)
      .eq("product_id", product.id)
      .single();

    // Check if the error code is "PGRST116", which indicates that no matching cart item was found.
    // This is expected behavior when the product is not in the cart yet, so I don't treat it as a failure.
    // For any other error, I throw an error to handle unexpected issues.
    if (cartItemError && cartItemError.code !== "PGRST116") {
      throw new Error("Error checking cart item: " + cartItemError.message);
    }
    // Update the quantity if the product exists
    if (existingCartItem) {
      const { error: updateError } = await supabase
        .from("cart_item")
        .update({ quantity: existingCartItem.quantity + 1 })
        .eq("id", existingCartItem.id);

      if (updateError) {
        throw new Error(
          "Error updating cart item quantity: " + updateError.message
        );
      }
    } else {
      const { error: insertError } = await supabase.from("cart_item").insert({
        name: product.name,
        cart_id: existingCart?.id,
        product_id: product.id,
        quantity: 1,
        stripe_product_id: product.stripe_product_id,
        stripe_price_id: product.stripe_price_id,
        image: product.primary_image,
      });

      if (insertError) {
        throw new Error(
          "Error adding product to cart_items: " + insertError.message
        );
      }
    }

    return ` Great choice! ${product.name} has been added to your cart. Head to your cart to review and complete your orde`;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error adding product to cart:", err.message);
      return "Error adding product to cart: " + err.message;
    } else {
      console.error("Unexpected error adding product to cart:", err);
      return "Unexpected error adding product to cart";
    }
  }
};
