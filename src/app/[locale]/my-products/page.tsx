"use client";
import { useEffect, useState } from "react";
import React from "react";
import { getMyProduct } from "@/utils/fetchDatas/fetchProductData";
import { ProductType } from "@/types/product";
import Image from "next/image";
import DeleteProduct from "@/components/buttons/DeleteProductButton";

export default function MyProducts() {
  const [myProducts, setMyProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const data = await getMyProduct();
        if (Array.isArray(data)) {
          setMyProducts(data);
        } else {
          setMyProducts([]);
        }
      } catch (error) {
        console.error("Error fetching myProducts data:", error);
      }
    };

    fetchMyProducts();
  }, []);

  const handleProductDelete = (productId: number) => {
    setMyProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <div className="flex items-center justify-center flex-grow bg-gray-100 dark:bg-gray-900 pt-10">
      {myProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {myProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
            >
              <Image
                src={product.primary_image || "/path/to/default/image.jpg"}
                alt={product.name || "Product image"}
                width={500}
                height={500}
                className="w-full h-48 object-cover rounded-md"
              />

              <h3 className="mt-4 text-xl font-semibold text-center">
                {product.name}
              </h3>
              <p className="mt-2 font-bold text-lg text-center">
                ${product.price}
              </p>

              <DeleteProduct id={product.id} onDelete={handleProductDelete} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}
