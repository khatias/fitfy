"use client";
import { useEffect, useState } from "react";
import React from "react";
import { getMyProduct } from "@/utils/fetchDatas/fetchProductData";
import { ProductType } from "@/types/product";
import Image from "next/image";
import DeleteProduct from "@/components/buttons/DeleteProductButton";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function MyProducts() {
  const [myProducts, setMyProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Products");
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
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  const handleProductDelete = (productId: number) => {
    setMyProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow bg-gray-100 dark:bg-gray-900 pt-10 pb-10 min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500 dark:border-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-grow bg-gray-100 dark:bg-gray-900 pt-10 pb-10">
      {myProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[1300px] mx-auto">
          {myProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition duration-300 hover:shadow-lg flex flex-col"
            >
              <div className="relative  w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={product.primary_image || "/path/to/default/image.jpg"}
                  alt={product.name || "Product image"}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="mt-2 text-sm font-bold text-gray-800 dark:text-gray-300">
                ₾{" "}
                {product?.price !== undefined
                  ? (product.price / 100).toFixed(2)
                  : "0.00"}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <DeleteProduct id={product.id} onDelete={handleProductDelete} />
                <Link href={`/my-products/${product.id}`}>
                  <button className="py-2 px-4 bg-black hover:bg-gray-800 text-white rounded-md transition duration-300">
                  {t("edit")}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No products found.
        </p>
      )}
    </div>
  );
}
