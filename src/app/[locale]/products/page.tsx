"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import FilterComponent from "@/components/filter/FilterComponent";
import useFetchProductsData from "@/hooks/useFetchProductsData";

export default function Products() {
  const [filter, setFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortByPrice, setSortByPrice] = useState<string>("");

  const pathname = usePathname();

  const { products, categories, colors, materials } = useFetchProductsData(
    filter,
    selectedCategories,
    selectedColors,
    selectedMaterials,
    sortByPrice
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("filter", newFilter);
    window.history.replaceState(
      null,
      "",
      `${pathname}?${newParams.toString()}`
    );
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

      const newParams = new URLSearchParams(window.location.search);

      if (type === "category") {
        if (checked) {
          newParams.append("categories", value);
        } else {
          newParams.delete("categories", value);
        }
      }

      if (type === "color") {
        if (checked) {
          newParams.append("colors", value);
        } else {
          newParams.delete("colors", value);
        }
      }

      if (type === "material") {
        if (checked) {
          newParams.append("materials", value);
        } else {
          newParams.delete("materials", value);
        }
      }

      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${newParams.toString()}`
      );
    };
  };
  // Handle sorting
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    setSortByPrice(newSort);
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("sortByPrice", newSort);
    window.history.replaceState(
      null,
      "",
      `${pathname}?${newParams.toString()}`
    );
  };

  if (!products || !categories || !colors || !materials) {
    return <div>Loading...</div>;
  }

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
          handleSelectionChange("category", setSelectedCategories)(event)
        }
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
          handleSelectionChange("color", setSelectedColors)(event)
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
          handleSelectionChange("material", setSelectedMaterials)(event)
        }
      />

      {/* Product list */}
      <div className="products-container grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
