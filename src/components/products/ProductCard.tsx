"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types/product";
import { usePathname } from "next/navigation";
import { addToCart } from "@/utils/cart/AddToCart";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Modal } from "../modals/Modal";
interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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
    setIsModalOpen(true);
  };

  const t = useTranslations("Products");

  return (
    <div className="border px-4 w-full bg-white dark:bg-[#111418] dark:border-gray-800 overflow-hidden flex flex-col h-full justify-between">
      <Link href={`/products/${product.id}`} className="w-full">
        <div className="n">
          {product.primary_image && isValidImageUrl(product.primary_image) ? (
            <div className="relative w-full min-h-52 overflow-hidden rounded-lg">
              <Image
                src={product.primary_image}
                alt={"Product Image"}
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
        <div className="mt-4 flex flex-col items-start justify-between min-h-36">
          <h2 className="text-[16px] font-semibold text-gray-800 dark:text-gray-300">
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
          <p className="mt-2 text-sm font-bold text-gray-800 dark:text-gray-300">
            ₾{" "}
            {product?.price !== undefined
              ? (product.price / 100).toFixed(2)
              : "0.00"}
          </p>
        </div>
      </Link>

      {/* Add to Cart button */}
      <div>
        <button
          onClick={handleAddToCart}
          className="text-gray-700 dark:text-gray-300 py-2 font-medium transition duration-200 "
        >
          {t("addtocart")}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t("successTitle")}
          message={t("successMessage")}
          buttonText={t("goToProducts")}
          link="/products"
        />
      )}
    </div>
  );
};

export default ProductCard;
