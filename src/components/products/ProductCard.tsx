"use client";
import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/product";
import { usePathname } from "next/navigation";

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

  return (
    <div className="border   p-4 flex flex-col max-w-xs bg-white">
      <div className=" w-full h-52 overflow-hidden  ">
        {product.primary_image && isValidImageUrl(product.primary_image) ? (
          <Image
            src={product.primary_image}
            alt="Product Image"
            width={200}
            height={200}
            priority
            className=" w-full h-full object-cover"
          />
        ) : (
          <p className="text-red-500 flex items-center justify-center h-full">
            Invalid primary image
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-col items-start">
        <h2 className="text-lg font-semibold text-gray-800">
          {currentLocale === "en" ? product.name : product.name_ka}
        </h2>
        <p className="text-sm text-gray-500">
          {currentLocale === "en"
            ? product.product_material?.material_en
            : product.product_material?.material_ka}
        </p>
        <p className="text-sm text-gray-500">
          {currentLocale === "en"
            ? product.product_condition?.condition_en
            : product.product_condition?.condition_ka}
        </p>
        <p className="mt-2 text-lg font-bold text-gray-800">₾{product.price}</p>
      </div>
      <div className="mt-4 w-full">
        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-slate-800 transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
