"use client";
import React, { useState, useEffect } from "react";
import { fetchCategories } from "@/utils/fetchDatas/fetchProductData";
import { usePathname } from "next/navigation";
import { Category } from "@/types/product";
import { Link } from "@/i18n/routing";

function HeaderBottom() {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const getLocalizedText = (enText: string, kaText: string = "") => {
    return currentLocale === "en" ? enText : kaText;
  };

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories || []);
    };
    getCategories();
  }, []);

  return (
    <div className="hidden lg:flex m-auto max-w-[1300px] h-10 px-6 border-b border-gray-200 bg-white dark:bg-black">
      <nav aria-label="Product Categories" className="w-full">
        <ul className="flex items-start justify-center space-x-12  w-full">
          <li className="py-1 group relative">
            <Link
              href={`/products`}
              className="text-sm font-medium text-gray-800 dark:text-gray-200 pb-3 hover:text-customRed transition-all duration-300 ease-in-out relative"
            >
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li
              className="py-1 group relative"
              key={category.product_category_id}
            >
              <Link
                href={`/category/${category.product_category_id}`}
                className="text-sm font-medium text-gray-800 dark:text-gray-200 pb-3 hover:text-customRed transition-all duration-300 ease-in-out relative"
              >
                {getLocalizedText(
                  category.category_en || "",
                  category.category_ka || ""
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default HeaderBottom;
