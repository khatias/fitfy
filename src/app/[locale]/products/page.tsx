import React from "react";
import { createClient } from "@/utils/supabase/server";
import ProductCard from "@/components/products/ProductCard";
import { ProductType } from "@/types/product";
import { addToCart } from "@/utils/cart/AddToCart";

export default async function Products() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select(`
      *,
      product_category:product_category_id (
         category_ka, category_en, product_category_id
        ),
        product_condition:product_condition_id (
          condition_ka, condition_en, product_condition_id
        ),
        product_material:product_material_id (
          material_ka, material_en, product_material_id
        ),
        product_color:product_color_id (
          color_en, color_ka,  product_color_id
        )
    `);

  if (error) {
    console.error("Error fetching products with category:", error);
  } else {
    console.log("Products with categories:", data);
  }

  return (
    <div className="container mx-auto py-8 2xl:px-20 pt-10">
      <div className="products-container grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((product: ProductType) => (
          <ProductCard key={product.id} product={product}  addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
