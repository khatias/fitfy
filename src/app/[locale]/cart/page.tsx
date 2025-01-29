// src/app/cart/page.tsx
import { createClient } from "@/utils/supabase/server";
import CartItem from "@/components/cart/CartItem";

export default async function cart() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return <div>Please log in to view your cart.</div>;
  }

  const { data: cart, error: cartError } = await supabase
    .from("cart")
    .select("id, cart_item (id, quantity, product_id, name, image, price)")
    .eq("user_id", user.id)
    .single();

  if (cartError || !cart) {
    return <div>Your cart is empty.</div>;
  }

  const { cart_item } = cart;
  console.log(typeof cart.cart_item);
  return (
    <div className="container mx-auto py-8 2xl:px-20 pt-1">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart_item.length === 0 ? (
        <p>Your cart is empty. Add some products to it!</p>
      ) : (
        <div className="space-y-4">
          {cart_item.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-4 text-right">
            <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
