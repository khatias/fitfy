"use server";
import Stripe from "stripe";
import { createClient } from "../supabase/server";

export async function createProduct(formData: FormData) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  const price = Number(formData.get("price"));
  const product_gender_id = Number(formData.get("gender"));
  const product_category_id = Number(formData.get("category"));
  const product_condition_id = Number(formData.get("condition"));
  const product_color_id = Number(formData.get("color"));
  const product_material_id = Number(formData.get("material"));
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  try {
    const stripeProduct = await stripe.products.create({
      name,

      images: [image],
    });
    console.log({ stripeProduct });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price,
      currency: "usd",
    });

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        price,
        product_category_id,
        product_condition_id,
        product_color_id,
        product_material_id,
        user_id,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
        product_gender_id,
      })
      .single();

    if (error) {
      console.error("Error inserting into Supabase:", error);
      return {
        success: false,
        message: "Failed to insert product into the database.",
      };
    }

    console.log("Product inserted into Supabase:", data);

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error("Error creating product:", error);

    return {
      success: false,
      message: "Error creating product. Please try again.",
    };
  }
}
