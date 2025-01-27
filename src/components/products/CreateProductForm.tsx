"use client";
import React, { useState, useEffect } from "react";
import { uploadFile } from "@/utils/files/uploadFile";
import { createProduct } from "@/utils/products/productCreator";

import { fetchCategories } from "@/utils/fetchDatas/fetchProductData";
export function CreateProductForm() {
  interface Category {
    product_category_id: number;
    category_name: string;
  }
  const [productType, setProductType] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const fetchedCategories = (await fetchCategories()) || [];
      setCategories(fetchedCategories);
    };
    getProductDetails();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    if (imageUrl) {
      formData.append("image", imageUrl);
    }

    formData.append("productType", productType?.toString() || "");

    const response = await createProduct(formData);

    if (response?.success) {
      console.log("Product created successfully");
    } else {
      console.log("Error:", response?.message || "Unknown error");
    }
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const uploadedImageUrl = await uploadFile(file, "products");
        setImageUrl(uploadedImageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductType(Number(e.target.value));
  };

  return (
    <div className="w-full m-auto container ">
      {/* form title */}
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl text-center font-bold mb-6">Sell an item</h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Give your wardrobe a second life. List in minutes. Ship for free.
          Start earning effortlessly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col mt-6 ">
        {/* product gender */}
        <div className="flex space-x-6">
          <div>
            <p>What type of item are you selling?</p>
            <div className="flex space-x-4 ">
              <div className="border py-3 px-4 flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  id="men"
                  name="gender"
                  value="2"
                  checked={productType === 2}
                  onChange={handleProductTypeChange}
                />

                <label htmlFor="men" className="mr-2">
                  Menswear
                </label>
              </div>
              <div className="border py-3 px-4 flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  id="women"
                  name="gender"
                  value="1" // ID for Women
                  checked={productType === 1}
                  onChange={handleProductTypeChange}
                />

                <label htmlFor="women" className="mr-2">
                  Womenswear
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 rounded border"
            placeholder="Enter the product name"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="price"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full p-3 rounded border"
            placeholder="Enter the product price"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="brand"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="w-full p-3 rounded border"
            placeholder="Enter the product brand"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select a category</option>{" "}
            {/* Placeholder option */}
            {categories.map((category) => (
              <option
                key={category.product_category_id}
                value={category.product_category_id}
              >
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="file_input"
            onChange={handleUploadImage}
            className="w-full p-3 rounded border"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-3 rounded border"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-16 py-3 bg-purple-800 text-white rounded-md hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
