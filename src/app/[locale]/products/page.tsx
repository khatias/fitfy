"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { supabase } from "@/utils/supabase/supabaseClient";
import { ProductType, Category, Color, Material } from "@/types/product";

export default function Products() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [filter, setFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const [sortByPrice, setSortByPrice] = useState<string>("");

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: categoryData },
          { data: colorData },
          { data: materialData },
        ] = await Promise.all([
          supabase.from("product_category").select("*"),
          supabase.from("product_color").select("*"),
          supabase.from("product_material").select("*"),
        ]);

        setCategories(categoryData || []);
        setColors(colorData || []);
        setMaterials(materialData || []);

        let query = supabase.from("products")
          .select(`*, product_category:product_category_id (category_ka, category_en, product_category_id),
                    product_condition:product_condition_id (condition_ka, condition_en, product_condition_id),
                    product_material:product_material_id (material_ka, material_en, product_material_id),
                    product_color:product_color_id (color_en, color_ka, product_color_id)`);

        if (filter) query = query.ilike("name", `%${filter}%`);
        if (selectedCategories.length > 0)
          query = query.in("product_category_id", selectedCategories);
        if (selectedColors.length > 0)
          query = query.in("product_color_id", selectedColors);
        if (selectedMaterials.length > 0)
          query = query.in("product_material_id", selectedMaterials);

        if (sortByPrice === "lowToHigh") {
          query = query.order("price", { ascending: true });
        } else if (sortByPrice === "highToLow") {
          query = query.order("price", { ascending: false });
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching products:", error);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    filter,
    selectedCategories,
    selectedColors,
    selectedMaterials,
    sortByPrice,
  ]);

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

      <div className="mb-4">
        <label className="block font-bold mb-2">Categories:</label>
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <label key={category.product_category_id}>
              <input
                type="checkbox"
                value={category.product_category_id}
                onChange={handleSelectionChange(
                  "category",
                  setSelectedCategories
                )}
              />
              <span>{category.category_en || category.category_ka}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-2">Colors:</label>
        <div className="flex flex-wrap">
          {colors.map((color) => (
            <label key={color.product_color_id}>
              <input
                type="checkbox"
                value={color.product_color_id}
                onChange={handleSelectionChange("color", setSelectedColors)}
              />
              <span>{color.color_en || color.color_ka}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-2">Materials:</label>
        <div className="flex flex-wrap">
          {materials.map((material) => (
            <label key={material.product_material_id}>
              <input
                type="checkbox"
                value={material.product_material_id}
                onChange={handleSelectionChange(
                  "material",
                  setSelectedMaterials
                )}
              />
              <span>{material.material_en || material.material_ka}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="products-container grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
