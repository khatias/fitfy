import React from "react";
import { createClient } from "@/utils/supabase/server";
import ProductDetails from "@/components/products/ProductDetail";
import { ProductType } from "@/types/product";

interface Params {
  id: string;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  if (!id) {
    return <div>Invalid product ID.</div>;
  }
  const supabase = await createClient();

  const { data: product, error } = await supabase
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
    .eq("id", id)

    .single();

  if (error) {
    return <div>Error fetching product details. Please try again later.</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="">
      <ProductDetails product={product as ProductType} />
    </div>
  );
}
