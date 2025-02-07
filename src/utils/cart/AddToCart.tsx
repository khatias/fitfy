import { supabase } from "@/utils/supabase/supabaseClient";
import { ProductType } from "@/types/product";

export const addToCart = async (product: ProductType): Promise<string> => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Please log in to continue");
    }

    const user_id = user.id;
    console.log(user_id);

    let { data: existingCart } = await supabase
      .from("cart")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (!existingCart) {
      console.log("No existing cart found. Creating a new one...");

      // If no cart is found, create a new one
      const { data: newCart, error: newCartError } = await supabase
        .from("cart")
        .insert({ user_id })
        .select();

      if (newCartError) {
        throw new Error(newCartError.message);
      }

      // Update the existingCart to the newly created cart
      existingCart = newCart[0];
      console.log("New cart created:", existingCart);
    }

    // Ensure the existingCart is valid before proceeding
    if (!existingCart?.id) {
      throw new Error("Failed to create or find a valid cart.");
    }

    // Check if the product already exists in the cart
    const { data: existingCartItem, error: cartItemError } = await supabase
      .from("cart_item")
      .select("id, quantity")
      .eq("cart_id", existingCart.id) // Ensure we're using the correct cart ID
      .eq("product_id", product.id)
      .single();

    // If the cart item doesn't exist, create a new cart item
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
      // Insert the new product into the cart_item table
      const { error: insertError } = await supabase.from("cart_item").insert({
        name: product.name,
        cart_id: existingCart.id, // Use existingCart.id here
        product_id: product.id,
        quantity: 1,
        stripe_product_id: product.stripe_product_id,
        stripe_price_id: product.stripe_price_id,
        image: product.primary_image,
        price: product.price,
        name_ka: product.name_ka,
      });

      if (insertError) {
        throw new Error(
          "Error adding product to cart_items: " + insertError.message
        );
      }
    }

    return `Great choice! ${product.name} has been added to your cart. Head to your cart to review and complete your order.`;
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
