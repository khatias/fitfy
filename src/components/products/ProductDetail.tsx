"use client";

import React from "react";
import { ProductType } from "@/types/product";
import { usePathname } from "next/navigation";
import Image from "next/image";

const ProductDetails: React.FC<{ product: ProductType }> = ({ product }) => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const getLocalizedText = (enText: string, kaText: string = "") => {
    return currentLocale === "en" ? enText : kaText;
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      <div className="relative w-full h-72">
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

      <h2 className="text-xl font-semibold">
        {getLocalizedText(product?.name || "", product.name_ka || "")}
      </h2>

      <div className="space-y-3">
        <p>
          <strong>Material:</strong>{" "}
          {getLocalizedText(
            product.product_material?.material_en || "",
            product.product_material?.material_ka || ""
          )}
        </p>

        <p>
          <strong>Condition:</strong>{" "}
          {getLocalizedText(
            product.product_condition?.condition_en || "",
            product.product_condition?.condition_ka || ""
          )}
        </p>

        <p>
          <strong>Price:</strong> ₾{product.price}
        </p>

        <p>
          <strong>Brand:</strong> {product.brand}
        </p>

        <p>
          <strong>Vintage:</strong> {product.vintage ? "Yes" : "No"}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {getLocalizedText(
            product.product_category?.category_en || "",
            product.product_category?.category_ka || ""
          )}
        </p>

        <p>
          <strong>Color:</strong>{" "}
          {getLocalizedText(
            product.product_color?.color_en || "",
            product.product_color?.color_ka || ""
          )}
        </p>
      </div>

      <div>
        <h3 className="font-medium text-lg">Additional Images:</h3>
        {product.images?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {product.images.map((image, index) =>
              isValidImageUrl(image) ? (
                <div key={index} className="relative w-full h-32">
                  <Image
                    src={image}
                    alt={`Additional Image ${index + 1}`}
                    width={200}
                    height={200}
                    priority
                    
                  />
                </div>
              ) : (
                <p key={index} className="text-red-500 text-center">
                  Invalid image URL
                </p>
              )
            )}
          </div>
        ) : (
          <p>No additional images available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
