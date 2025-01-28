"use server";
import Stripe from "stripe";
import { createClient } from "../supabase/server";

export async function createProduct(formData: FormData) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = await createClient();

  const name = formData.get("name") as string;

  const price = Number(formData.get("price"));
  const product_gender_id = Number(formData.get("gender"));
  const product_category_id = Number(formData.get("category"));
  const product_condition_id = Number(formData.get("condition"));
  const product_color_id = Number(formData.get("color"));
  const product_material_id = Number(formData.get("material"));
  const userResponse = await supabase.auth.getUser();
  const description = formData.get("description") as string;
  const user_id = userResponse.data?.user?.id;
  const vintage = formData.get("vintage") as string;
  const size = formData.get("size") as string;
  const primary_image = formData.get("primary_image") as string;
  const images = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("image_")) {
      images.push(value); // this will give you the image files
    }
  }
console.log(images)
console.log(formData)
  try {
    const stripeProduct = await stripe.products.create({
      name,

      images: [primary_image],
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
        description,
        vintage,
        size,
        primary_image,
        images,
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
