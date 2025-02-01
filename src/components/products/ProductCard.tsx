"use client";
import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/product";
import { usePathname } from "next/navigation";
import { addToCart } from "@/utils/cart/AddToCart";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const handleAddToCart = async () => {
    const message = await addToCart(product);
    console.log(message);
  };

  return (
    <div className="border px-4 w-full bg-white dark:bg-[#111418]  dark:border-gray-800 overflow-hidden">
      <div className="n">
        {product.primary_image && isValidImageUrl(product.primary_image) ? (
          <div className="relative w-full h-52 overflow-hidden rounded-lg">
            <Image
              src={product.primary_image}
              alt="Product Image"
              width={800}
              height={80}
              quality={100}
              priority
              className="object-contain w-full h-full rounded-t-lg"
            />
          </div>
        ) : (
          <p className="text-red-500 flex items-center justify-center h-full">
            Invalid primary image
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-col items-start">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
          {currentLocale === "en" ? product.name : product.name_ka}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {currentLocale === "en"
            ? product.product_material?.material_en
            : product.product_material?.material_ka}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {currentLocale === "en"
            ? product.product_condition?.condition_en
            : product.product_condition?.condition_ka}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-800 dark:text-gray-300">₾{product.price}</p>
      </div>
      <div className="">
        <button
          onClick={handleAddToCart}
          className="text-gray-700 dark:text-gray-300 py-2  font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
