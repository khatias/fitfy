"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import FilterComponent from "@/components/filter/FilterComponent";
import useFetchProductsData from "@/hooks/useFetchProductsData";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

export default function Products() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("ProductForm");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortByPrice, setSortByPrice] = useState(
    searchParams.get("sortByPrice") || ""
  );
  const currentLocale = pathname.split("/")[1];
  const { products, categories, colors, materials } = useFetchProductsData(
    filter,
    selectedCategories,
    selectedColors,
    selectedMaterials,
    sortByPrice
  );

  useEffect(() => {
    const categoriesFromUrl = searchParams.getAll("categories");
    const colorsFromUrl = searchParams.getAll("colors");
    const materialsFromUrl = searchParams.getAll("materials");

    setSelectedCategories(categoriesFromUrl || []);
    setSelectedColors(colorsFromUrl || []);
    setSelectedMaterials(materialsFromUrl || []);
  }, [searchParams]);

  const updateURL = (key: string, value: string, add = true) => {
    const newParams = new URLSearchParams(window.location.search);

    if (key === "categories" || key === "colors" || key === "materials") {
      if (add) {
        newParams.append(key, value);
      } else {
        const values = newParams.getAll(key).filter((v) => v !== value);
        newParams.delete(key);
        values.forEach((v) => newParams.append(key, v));
      }
    } else {
      newParams.set(key, value);
    }

    window.history.replaceState(
      null,
      "",
      `${pathname}?${newParams.toString()}`
    );
  };
  const getLocalizedText = (enText: string, kaText: string = "") => {
    return currentLocale === "en" ? enText : kaText;
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    updateURL("filter", newFilter);
  };

  const handleSelectionChange = (
    type: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      setter((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
      updateURL(type, value, checked);
    };
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    setSortByPrice(newSort);
    updateURL("sortByPrice", newSort);
  };

  const handleClearFilters = () => {
    setFilter("");
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSortByPrice("");
    setIsFilterVisible(false);

    const newParams = new URLSearchParams();
    window.history.replaceState(
      null,
      "",
      `${pathname}?${newParams.toString()}`
    );
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  if (!products || !categories || !colors || !materials) {
    return (
      <div className="flex items-center justify-center flex-grow bg-gray-100 dark:bg-gray-900 pt-10 pb-10 min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500 dark:border-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-black pb-20 ">
      <div className="lg:grid grid-cols-[1fr_4fr] max-w-[1300px] m-auto lg:pt-10 gap-8  ">
        <div className="py-8 pt-10 lg:pt-0">
          <div>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t("search")}
                value={filter}
                onChange={handleFilterChange}
                className="bg-customGray h-12 dark:bg-gray-800 transition-all duration-300 ease-in-out border border-gray-300 focus:ring-1 pl-12 pr-4 w-full text-sm dark:text-white placeholder-gray-500 dark:border-gray-700 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="sortandfilterbox grid grid-cols-2 lg:grid-cols-1 lg:mb-8">
            <div>
              <select
                onChange={handleSortChange}
                value={sortByPrice}
                className="border rounded p-2 w-full h-14 uppercase text-[16px] font-medium text-center -tracking-tighter dark:border-gray-700 lg:text-left"
              >
                <option disabled value="">
                  {t("sort")}
                </option>
                <option value="lowToHigh">{t("lowtohigh")}</option>
                <option value="highToLow">{t("hightolow")}</option>
              </select>
            </div>
            <div>
              <button
                className="border w-full h-14 font-medium uppercase -tracking-tighter bg-white dark:border-gray-700 lg:hidden"
                onClick={toggleFilterVisibility}
              >
                {t("filter")}
              </button>
            </div>
          </div>

          <div className="lg:block hidden">
            <div className="space-y-4">
              <FilterComponent
                label={t("category")}
                options={categories.map((category) => ({
                  id: category.product_category_id,
                  name: getLocalizedText(
                    category.category_en || "",
                    category.category_ka || ""
                  ),
                }))}
                type="category"
                selectedValues={selectedCategories}
                onSelectionChange={handleSelectionChange(
                  "categories",
                  setSelectedCategories
                )}
              />

              <FilterComponent
                label={t("color")}
                options={colors.map((color) => ({
                  id: color.product_color_id,
                  name: getLocalizedText(
                    color.color_en || "",
                    color.color_ka || ""
                  ),
                }))}
                type="color"
                selectedValues={selectedColors}
                onSelectionChange={handleSelectionChange(
                  "colors",
                  setSelectedColors
                )}
              />
              <FilterComponent
                label={t("material")}
                options={materials.map((material) => ({
                  id: material.product_material_id,
                  name: getLocalizedText(
                    material.material_en || "",
                    material.material_ka || ""
                  ),
                }))}
                type="material"
                selectedValues={selectedMaterials}
                onSelectionChange={handleSelectionChange(
                  "materials",
                  setSelectedMaterials
                )}
              />
            </div>
          </div>

          {isFilterVisible && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex items-center justify-center ">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md overflow-y-auto h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {t("filter")}
                  </h2>
                  <button
                    onClick={toggleFilterVisibility}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <FilterComponent
                    label={t("category")}
                    options={categories.map((category) => ({
                      id: category.product_category_id,
                      name: getLocalizedText(
                        category.category_en || "",
                        category.category_ka || ""
                      ),
                    }))}
                    type="category"
                    selectedValues={selectedCategories}
                    onSelectionChange={handleSelectionChange(
                      "categories",
                      setSelectedCategories
                    )}
                  />
                  <FilterComponent
                    label={t("color")}
                    options={colors.map((color) => ({
                      id: color.product_color_id,
                      name: getLocalizedText(
                        color.color_en || "",
                        color.color_ka || ""
                      ),
                    }))}
                    type="color"
                    selectedValues={selectedColors}
                    onSelectionChange={handleSelectionChange(
                      "colors",
                      setSelectedColors
                    )}
                  />
                  <FilterComponent
                    label={t("material")}
                    options={materials.map((material) => ({
                      id: material.product_material_id,
                      name: getLocalizedText(
                        material.material_en || "",
                        material.material_ka || ""
                      ),
                    }))}
                    type="material"
                    selectedValues={selectedMaterials}
                    onSelectionChange={handleSelectionChange(
                      "materials",
                      setSelectedMaterials
                    )}
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
                    onClick={handleClearFilters}
                  >
                    {t("clearFilter")}
                  </button>
                  <button
                    className="px-6 py-2 bg-customRed text-white rounded-md hover:bg-blue-700"
                    onClick={toggleFilterVisibility}
                  >
                    {t("filter")}
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleClearFilters}
            className="relative  py-3 mt-6 overflow-hidden font-medium text-gray-900 bg-transparent rounded-sm group hover:bg-white transition duration-300 ease-in-out hover:px-4"
          >
            <span className="absolute inset-0 w-0 h-0 transition-all duration-500 ease-out bg-white rounded-lg group-hover:w-full group-hover:h-full"></span>
            <span className="relative text-gray-900 group-hover:text-black">
              {t("clearFilter")}
            </span>
          </button>
        </div>

        <div className="lg:flex flex-col flex-1 ">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 px-6 lg:px-0">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
