import React from "react";
import Image from "next/image";
import { getMyProduct } from "@/utils/fetchDatas/fetchProductData";
import { ProductType } from "@/types/product";

export default async function MyProducts() {
  const data = await getMyProduct();

  console.log(data);

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const currentLocale = "en"; 

  return (
    <div >
    
      {Array.isArray(data) && data.length > 0 ? (
        <div className="grid lg:grid-cols-4">
          {data.map((product: ProductType) => (
            <div key={product.id} className="w-full h-auto mb-6">
              <div className="w-full h-52 overflow-hidden">
                {product.primary_image && isValidImageUrl(product.primary_image) ? (
                  <Image
                    src={product.primary_image}
                    alt="Product Image"
                    width={200}
                    height={200}
                    priority
                    className="w-full h-full object-cover"
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
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
