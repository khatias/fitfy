"use server";
import Stripe from "stripe";

export async function createProduct(formData: FormData) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get('price'));

  try {
    const stripeProduct = await stripe.products.create({
      name,
      description,
      images: [image],
    });
    console.log({ stripeProduct });
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price,
      currency: "usd",
    });
    console.log({ stripePrice });
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
