"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import FilterComponent from "@/components/filter/FilterComponent";
import useFetchProductsData from "@/hooks/useFetchProductsData";

export default function Products() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    // Parse categories, colors, materials from query params
    const categoriesFromUrl = searchParams.getAll("categories");
    const colorsFromUrl = searchParams.getAll("colors");
    const materialsFromUrl = searchParams.getAll("materials");

    // Update states with values from URL
    setSelectedCategories(categoriesFromUrl || []);
    setSelectedColors(colorsFromUrl || []);
    setSelectedMaterials(materialsFromUrl || []);
  }, [searchParams]); // Re-run whenever searchParams changes

  // Update URL parameters and state when filters are changed
  const updateURL = (key: string, value: string, add = true) => {
    const newParams = new URLSearchParams(window.location.search);

    if (key === "categories" || key === "colors" || key === "materials") {
      if (add) {
        newParams.append(key, value);
      } else {
        // Remove the value if unchecked
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

  if (!products || !categories || !colors || !materials) {
    return <div>Loading...</div>;
  }
  const handleClearFilters = () => {
    // Reset all filters to their default values
    setFilter("");
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSortByPrice("");

    // Remove all query parameters from the URL
    const newParams = new URLSearchParams();
    window.history.replaceState(
      null,
      "",
      `${pathname}?${newParams.toString()}`
    );
  };

  return (
    <div className="container mx-auto py-8 2xl:px-20 pt-10">
      <input
        type="text"
        placeholder="Search products..."
        value={filter}
        onChange={handleFilterChange}
        className="border rounded p-2 mb-4 w-full"
      />

      <div className="mb-4">
        <label className="block font-bold mb-2">Sort by Price:</label>
        <select
          onChange={handleSortChange}
          value={sortByPrice}
          className="border rounded p-2"
        >
          <option value="">Select</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Category filter */}
      <FilterComponent
        label="Categories"
        options={categories.map((category) => ({
          id: category.product_category_id,
          name: category.category_en || category.category_ka,
        }))}
        type="category"
        selectedValues={selectedCategories}
        onSelectionChange={(event) =>
          handleSelectionChange("categories", setSelectedCategories)(event)
        }
        // Ensure the checkbox is checked if selectedCategories contains the option
      />

      {/* Color filter */}
      <FilterComponent
        label="Colors"
        options={colors.map((color) => ({
          id: color.product_color_id,
          name: color.color_en || color.color_ka,
        }))}
        type="color"
        selectedValues={selectedColors}
        onSelectionChange={(event) =>
          handleSelectionChange("colors", setSelectedColors)(event)
        }
      />

      {/* Material filter */}
      <FilterComponent
        label="Materials"
        options={materials.map((material) => ({
          id: material.product_material_id,
          name: material.material_en || material.material_ka,
        }))}
        type="material"
        selectedValues={selectedMaterials}
        onSelectionChange={(event) =>
          handleSelectionChange("materials", setSelectedMaterials)(event)
        }
      />
      <button
        onClick={handleClearFilters}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
      >
        Clear All Filters
      </button>

      <div className="products-container grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
