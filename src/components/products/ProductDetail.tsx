"use client";

import React, { useState } from "react";
import { ProductType } from "@/types/product";
import { usePathname } from "next/navigation";
import { addToCart } from "@/utils/cart/AddToCart";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ProductDetails: React.FC<{ product: ProductType }> = ({ product }) => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const t = useTranslations("Products");
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
  const handleAddToCart = async () => {
    const message = await addToCart(product);
    console.log(message);
  };

  const images = product.primary_image
    ? [product.primary_image, ...(product.images || [])]
    : product.images || [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleImageClick = (image: string) => {
    const index = images.indexOf(image);
    setActiveImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1300px] py-12 px-4 lg:px-0  dark:text-white">
      <div className="lg:flex lg:space-x-8">
        <div className="lg:w-1/2">
          {images?.length ? (
            <div
              className="relative"
              onClick={() => handleImageClick(images[activeImageIndex])}
            >
              <div className="relative w-full mb-6 lg:mb-4 overflow-hidden rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 group">
                {isValidImageUrl(images[activeImageIndex]) ? (
                  <Image
                    src={images[activeImageIndex]}
                    alt={`Image ${activeImageIndex + 1}`}
                    width={800}
                    height={400}
                    quality={100}
                    priority
                    className="object-contain w-full h-full rounded-xl cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-600 rounded-xl flex items-center justify-center h-[400px]">
                    <p className="text-red-500 text-center p-4">
                      Invalid image URL
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex justify-center mt-4 space-x-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeImageIndex === index
                        ? "bg-black dark:bg-white"
                        : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-500 dark:hover:bg-gray-400"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">No images available</p>
          )}

          <div className="mt-6 hidden md:flex space-x-4 justify-center lg:flex-row lg:space-x-0 lg:justify-start gap-4 overflow-x-auto overflow-y-hidden">
            {product.images?.map((image, index) =>
              isValidImageUrl(image) ? (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className="w-20 h-20 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 ease-in-out hover:scale-105 hover:border-gray-300 relative group"
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out"></div>
                </button>
              ) : (
                <div
                  key={index}
                  className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center border border-gray-200 dark:border-gray-600"
                >
                  <p className="text-red-500 text-center text-xs">
                    Invalid URL
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="lg:w-1/2 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 lg:p-8">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
            {getLocalizedText(product?.name || "", product.name_ka || "")}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {getLocalizedText(
              product.product_category?.category_en || "",
              product.product_category?.category_ka || ""
            )}
          </p>

          <div className="p-6 rounded-lg space-y-4 mb-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
            <p className="text-xl font-extrabold text-gray-900 dark:text-white tracking-wide">
              {product?.price !== undefined
                ? (product.price / 100).toFixed(2)
                : "0.00"}
              ₾
            </p>

            <p className="text-gray-700 text-sm font-semibold dark:text-gray-300">
              {getLocalizedText(
                product.product_condition?.condition_en || "",
                product.product_condition?.condition_ka || ""
              )}
            </p>

            <p className="text-gray-700 text-sm font-semibold dark:text-gray-300">
              {getLocalizedText(
                product.product_material?.material_en || "",
                product.product_material?.material_ka || ""
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <p className="text-gray-800 text-sm dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">
                  Vintage:
                </strong>
                <span className="ml-1 px-2 py-1 text-xs font-bold rounded-md bg-gray-200 dark:bg-gray-600">
                  {product.vintage ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-gray-700 text-sm font-semibold flex items-center gap-2 dark:text-gray-300">
                🎨
                {getLocalizedText(
                  product.product_color?.color_en || "",
                  product.product_color?.color_ka || ""
                )}
              </p>
            </div>
          </div>

          <div className="px-6">
            <p className="text-gray-700 text-sm font-medium dark:text-gray-300">
              {getLocalizedText(
                product.description_en || "",
                product.description_ka || ""
              )}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm mt-6">
            <Image
              src={product.avatar_url || "/default-avatar.png"}
              alt="Seller Avatar"
              width={64}
              height={64}
              className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.first_name || "Unknown"} {product.last_name || ""}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
                {t("seller")}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={handleAddToCart}
              className="mt-6 px-6 py-3 bg-customAmber text-white font-medium rounded-md shadow-lg hover:bg-amber-700 active:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors duration-300"
            >
              {t("addtocart")}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden max-w-7xl max-h-screen">
            <div className="absolute top-4 right-2 z-10">
              <button
                onClick={handleCloseModal}
                className="text-black dark:text-white text-4xl hover:text-gray-300 focus:outline-none"
              >
                &times;
              </button>
            </div>

            <div className="relative p-4 lg:h-[80vh] lg:flex items-center justify-center mx-auto min-w-[1300px]">
              <Image
                src={images[activeImageIndex]}
                alt={`Fullscreen Image ${activeImageIndex + 1}`}
                width={1000}
                height={500}
                className="object-contain max-w-full max-h-full"
                priority
              />

              <div className="absolute  left-0  lg:translate-y-full items-center  flex  justify-between w-full px-8">
                <button
                  onClick={handlePrev}
                  className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 w-12 focus:outline-none"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNext}
                  className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 w-12 focus:outline-none"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
