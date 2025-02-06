"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getCartData } from "@/utils/fetchDatas/fetchProductData";
import { updateCartItemQuantity } from "@/utils/cart/updateCartItemQuantity";
import { removeCartItem } from "@/utils/cart/RemoveFromCart";
import CheckoutFormCart from "@/components/buyProducts/CartCheckoutForm";
import Loader from "@/components/Loader/Loader";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
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
  const t = useTranslations("Cart");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = "en";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getCartData();
        if (data && "cart_item" in data && Array.isArray(data.cart_item)) {
          setCartItems(data.cart_item);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
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

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price / 100) * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 h-screen">
      <div className="max-w-[1300px] mx-auto">
        {loading ? (
          <Loader />
        ) : cartItems.length === 0 ? (
          <div className="flex items-center justify-center flex-col gap-4">
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              {t("CartIsEmpty")}
            </p>
            <Link className="flex gap-2" href="/products">
              {" "}
              {t("shopNow")} <ArrowRightIcon className="w-6 h-6" />
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-700 flex flex-col md:flex-row items-center md:items-start"
                >
                  <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 mr-4 md:mr-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow md:flex-grow-0 md:w-1/2 ">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-300">
                      {" "}
                      {item.price !== undefined
                        ? (item.price / 100).toFixed(2)
                        : "0.00"}
                    </p>
                  </div>

                  <div className="flex  items-center  justify-center md:justify-start mt-2 md:mt-0 w-full md:w-auto">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-base font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-2 md:mt-0 md:ml-auto w-full md:w-auto">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 font-medium px-3 py-1 rounded-md transition w-full md:w-auto"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <span className="text-lg font-medium text-gray-800 dark:text-white">
                Total:
              </span>
              <span className="text-lg font-bold text-gray-800 dark:text-white">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <CheckoutFormCart
                uiMode="hosted"
                locale={locale}
                cartItems={cartItems}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
