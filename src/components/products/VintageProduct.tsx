"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { fetchVintageProducts } from "@/utils/fetchDatas/fetchProductData";
import { ProductType } from "@/types/product";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";

const VintageProductCard: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const data = await fetchVintageProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching Vintage data:", error);
      }
    };

    fetchMyProducts();
  }, []);

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const offsetWidth = sliderRef.current.offsetWidth;
      const scrollWidth = sliderRef.current.scrollWidth;

      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + offsetWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    // Check scroll position when products are loaded
    checkScrollPosition();
  }, [products]);

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleScroll = (direction: number) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth * 0.8;
      sliderRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="flex space-x-7 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 md:px-0"
        onScroll={checkScrollPosition} // Update scroll position when scrolling manually
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden bg-white dark:bg-[#111418] dark:border-gray-800 shadow-sm hover:shadow-md transition duration-200 flex flex-col h-full snap-start shrink-0 w-[360px] md:w-[300px]" // Added responsive width
          >
            <Link
              href={`/products/${product.id}`}
              className="flex-grow relative"
            >
              <div>
                {product.primary_image &&
                isValidImageUrl(product.primary_image) ? (
                  <div className="relative w-full  overflow-hidden rounded-t-lg">
                    <Image
                      src={product.primary_image}
                      alt={product.name || "Product image"}
                      width={800}
                      height={600}
                      quality={90}
                      priority={product.id < 5}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                    <div className="ml-6 md:ml-0 absolute inset-0 bg-black/20 flex items-center justify-center rounded-t-lg transition duration-300 hover:bg-black/40">
                      <h2 className="text-lg font-semibold text-white transition duration-300 hover:scale-105">
                        {currentLocale === "en"
                          ? product.name
                          : product.name_ka}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center h-48 rounded-t-lg">
                    <p className="text-gray-500 dark:text-gray-400">No Image</p>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleScroll(-1)}
        className={`absolute  md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full opacity-70 hover:opacity-90 z-10 transition duration-300 ${
          isAtStart ? "hidden" : ""
        }`}
      >
        {"<"}
      </button>
      <button
        onClick={() => handleScroll(1)}
        className={`absolute -right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full opacity-70 hover:opacity-90 z-10 transition duration-300 ${
          isAtEnd ? "hidden" : ""
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default VintageProductCard;
