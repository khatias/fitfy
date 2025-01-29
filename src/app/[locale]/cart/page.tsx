"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getCartData } from "@/utils/fetchDatas/fetchProductData";
import { updateCartItemQuantity } from "@/utils/cart/updateCartItemQuantity";
import { removeCartItem } from "@/utils/cart/RemoveFromCart";
import CheckoutFormCart from "@/components/buyProducts/CartCheckoutForm";

interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  name: string;
  image: string;
  price: number;
  stripe_price_id: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const locale = "en";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCartData();
        if (data && "cart_item" in data && Array.isArray(data.cart_item)) {
          setCartItems(data.cart_item);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItemQuantity(id, newQuantity);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (id: string) => {
    await removeCartItem(id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto py-10 px-6 2xl:px-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">
          Your cart is empty. Add some products to it!
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 border border-gray-200 p-5 rounded-lg shadow-sm bg-white"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-md object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500">
                  Price: <span className="font-semibold">${item.price}</span>
                </p>
                <p className="text-gray-500">
                  Quantity:{" "}
                  <span className="font-semibold">{item.quantity}</span>
                </p>
              </div>

              {/* Quantity Controls & Remove Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
                >
                  -
                </button>

                <span className="text-lg font-medium">{item.quantity}</span>

                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  +
                </button>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-4 py-2 bg-black text-white rounded-lg transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-end">
            <CheckoutFormCart
              uiMode="hosted"
              locale={locale}
              cartItems={cartItems}
            />
          </div>
        </div>
      )}
    </div>
  );
}
