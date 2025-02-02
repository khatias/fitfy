import React from "react";
import { createClient } from "@/utils/supabase/server";

import { ProductType } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";

interface Params {
  id: string;
}

export default async function Category({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  if (!id) {
    return <div>Invalid category ID.</div>;
  }

  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      ` 
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
      `
    )
    .eq("product_category_id", id);

  if (error) {
    console.log(error);
    return <div>Error fetching product details. Please try again later.</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found for this category.</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-black pb-20">
      <div className="lg:grid grid-cols-5 max-w-[1300px] m-auto lg:pt-10 gap-8 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product as ProductType} />
        ))}
      </div>
    </div>
  );
}
