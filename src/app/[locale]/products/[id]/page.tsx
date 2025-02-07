import React from "react";
import { createClient } from "@/utils/supabase/server";
import ProductDetails from "@/components/products/ProductDetail";
import { ProductType } from "@/types/product";
import NotFound from "@/components/NotFound/NotFound";

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

  if (!product && error) {
    return <NotFound />;
  }
  const { data: profileData, error: profileError } = await supabase
  .from("profiles")
  .select("first_name, last_name, avatar_url")
  .eq("user_id", product.user_id)
  .single();

if (profileError) {
  console.error(profileError);
  return <div>Error fetching profile details. Please try again later.</div>;
}
const productData = {
  ...product,
  first_name: profileData?.first_name,
  last_name: profileData?.last_name,
  avatar_url: profileData?.avatar_url,
};

  return (
    <div className="">
      <ProductDetails product={productData as ProductType} />
    </div>
  );
}
