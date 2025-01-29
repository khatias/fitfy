import { createClient } from "@/utils/supabase/server";
import CartItem from "@/components/cart/CartItem";
import CheckoutFormCart from "@/components/buyProducts/CartCheckoutForm";

export default async function cart() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return <div>Please log in to view your cart.</div>;
  }

  const locale = "en";
  const { data: cart, error: cartError } = await supabase
    .from("cart")
    .select(
      "id, cart_item (id, quantity, product_id, name, image, price, stripe_price_id)"
    )
    .eq("user_id", user.id)
    .single();

  if (cartError || !cart) {
    return <div>Your cart is empty.</div>;
  }

  const { cart_item: cartItems } = cart;

  if (!Array.isArray(cartItems)) {
    return <div>Error: Cart items are not in the expected format.</div>;
  }

  return (
    <div className="container mx-auto py-8 2xl:px-20 pt-1">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some products to it!</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-4 text-right">
            <div className="mt-6 flex justify-end">
              <CheckoutFormCart
                uiMode="hosted"
                locale={locale}
                cartItems={cartItems}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
