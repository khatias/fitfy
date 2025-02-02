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
    <div className="hidden lg:flex m-auto max-w-[1300px] lg:py-2 px-6 border-b border-gray-200 bg-white dark:bg-black">
      <nav aria-label="Product Categories" className="w-full">
        <ul className="flex items-center justify-between space-x-24 w-full">
          {categories.map((category) => (
            <li className="py-3 group relative" key={category.product_category_id}> 
              <Link
           href={`/category/${category.product_category_id}`}

                className="text-base font-medium text-gray-800 dark:text-gray-200 pb-3 hover:text-customRed transition-all duration-300 ease-in-out relative"
              >
                {getLocalizedText(
                  category.category_en || "",
                  category.category_ka || ""
                )}
                <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-transparent group-hover:bg-customRed transition-colors duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default HeaderBottom;
