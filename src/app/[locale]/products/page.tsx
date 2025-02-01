"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import FilterComponent from "@/components/filter/FilterComponent";
import useFetchProductsData from "@/hooks/useFetchProductsData";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
export default function Products() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Declare visibility state at the top
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Initialize filters from URL query parameters
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortByPrice, setSortByPrice] = useState(
    searchParams.get("sortByPrice") || ""
  );

  const { products, categories, colors, materials } = useFetchProductsData(
    filter,
    selectedCategories,
    selectedColors,
    selectedMaterials,
    sortByPrice
  );

  // Sync URL parameters with React state on initial render
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 2xl:px-20 pt-10">
      <div>
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={filter}
              onChange={handleFilterChange}
              className="bg-customGray h-12 dark:bg-gray-800  transition-all duration-300 ease-in-out border border-gray-300 focus:ring-1 pl-12 pr-4 w-full text-sm dark:text-white placeholder-gray-500 dark:border-gray-700 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>
      <div className="sortandfilterbox grid grid-cols-2">
        <div>
          <select
            onChange={handleSortChange}
            value={sortByPrice}
            className="border rounded p-2 w-full h-14 uppercase font-medium text-center  -tracking-tighter dark:border-gray-700"
          >
            <option disabled value="">
              Sort
            </option>
            <option value="lowToHigh"> Low to High</option>
            <option value="highToLow"> High to Low</option>
          </select>
        </div>
        <div>
          <button
            className="border w-full h-14 font-medium uppercase -tracking-tighter dark:border-gray-700"
            onClick={toggleFilterVisibility}
          >
            Filter
          </button>
        </div>
      </div>

      {isFilterVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md overflow-y-auto h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
              <button
                onClick={toggleFilterVisibility}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {" "}
              <FilterComponent
                label="Categories"
                options={categories.map((category) => ({
                  id: category.product_category_id,
                  name: category.category_en || category.category_ka,
                }))}
                type="category"
                selectedValues={selectedCategories}
                onSelectionChange={handleSelectionChange(
                  "categories",
                  setSelectedCategories
                )}
              />
              <FilterComponent
                label="Colors"
                options={colors.map((color) => ({
                  id: color.product_color_id,
                  name: color.color_en || color.color_ka,
                }))}
                type="color"
                selectedValues={selectedColors}
                onSelectionChange={handleSelectionChange(
                  "colors",
                  setSelectedColors
                )}
              />
              <FilterComponent
                label="Materials"
                options={materials.map((material) => ({
                  id: material.product_material_id,
                  name: material.material_en || material.material_ka,
                }))}
                type="material"
                selectedValues={selectedMaterials}
                onSelectionChange={handleSelectionChange(
                  "materials",
                  setSelectedMaterials
                )}
              />
            </div>
            <div className="mt-6 flex justify-end ">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
                onClick={handleClearFilters}
              >
                Clearl
              </button>
              <button
                className="px-6 py-2 bg-customRed text-white rounded-md hover:bg-blue-700"
                onClick={toggleFilterVisibility}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 products-container grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-[#f5f6f8] dark:bg-black pt-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
