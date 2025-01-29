"use client";
import { useState } from "react";
import Image from "next/image";
import { updateCartItemQuantity } from "@/utils/cart/updateCartItemQuantity";
import { removeCartItem } from "@/utils/cart/RemoveFromCart";

import { Link } from "@/i18n/routing";
interface CartItemProps {
  item: {
    quantity: number;
    id: string;
    name: string;
    image: string;
    price: number;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { name, quantity: initialQuantity, id, image, price } = item;
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isItemVisible, setIsItemVisible] = useState(true);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItemQuantity(id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleRemoveItem = async () => {
    setIsRemoved(true);
    await removeCartItem(id);
  };

  const handleCloseModal = () => {
    setIsItemVisible(false);
    setIsRemoved(false);
  };

  if (!isItemVisible) return null;

  return (
    <>
      {!isRemoved ? (
        <div className="border p-4 rounded-md">
          <div className="flex items-center justify-between">
            <Image
              src={image || "/placeholder.png"}
              alt={name}
              width={64}
              height={64}
              className="object-cover rounded"
            />
            <div>
              <h2 className="font-bold">{name}</h2>
              <p className="text-sm text-gray-500">${price/100}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleRemoveItem}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-out">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">
                {name} has been removed from your cart.
              </p>
              <button
                className="text-lg font-bold text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>
            <p className="mt-2">
              Would you like to{" "}
              <button className="text-blue-500 hover:underline">
                <Link href="/products">go to the shop and find your item?</Link>
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
