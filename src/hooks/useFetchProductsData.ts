// hooks/useFetchData.ts
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { ProductType, Category, Color, Material } from "@/types/product";

const useFetchProductsData = (
  filter: string,
  selectedCategories: string[],
  selectedColors: string[],
  selectedMaterials: string[],
  sortByPrice: string
) => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories, colors, and materials
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

        // Now fetch products based on filters and price range
        let query = supabase
          .from("products")
          .select(
            `*, product_category:product_category_id (category_ka, category_en, product_category_id),
              product_condition:product_condition_id (condition_ka, condition_en, product_condition_id),
              product_material:product_material_id (material_ka, material_en, product_material_id),
              product_color:product_color_id (color_en, color_ka, product_color_id)`
          );

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
  }, [filter, selectedCategories, selectedColors, selectedMaterials, sortByPrice]);

  return { products, categories, colors, materials };
};

export default useFetchProductsData;
