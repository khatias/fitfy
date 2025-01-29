// src/app/cart/page.tsx

"use client";

import Image from "next/image";

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
  const { name, quantity, id, image, price } = item;
  console.log(id);

  return (
    <>
      <div>{item.name}</div>
      <div className="flex items-center justify-between border p-4 rounded-md">
        <Image
          src={image || "/placeholder.png"}
          alt={name}
          width={64}
          height={64}
          className="object-cover rounded"
        />
        <div>
          <h2 className="font-bold">{name}</h2>
          <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          disabled={quantity <= 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span>{quantity}</span>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          +
        </button>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          Remove
        </button>
      </div>
    </>
  );
}
