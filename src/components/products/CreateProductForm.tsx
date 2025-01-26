// Client Side (CreateProductForm)
"use client";
import React, { useState } from "react";
import { uploadFile } from "@/utils/files/uploadFile";
import { createProduct } from "@/utils/products/productCreator";

export function CreateProductForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    if (imageUrl) {
      formData.append("image", imageUrl);
    }

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

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-zinc-100 rounded-md">
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Create Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
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
