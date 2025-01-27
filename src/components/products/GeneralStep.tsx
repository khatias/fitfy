// GeneralStep.tsx
"use client";
import React from "react";
interface GeneralStepProps {
  formData: {
    name: string;
    price: string;
    brand: string;
    description: string;
    category: string;
    image: string | null;
    productType: number | null;
  };
  handleProductTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GeneralStep({
  formData,
  handleProductTypeChange,
  handleInputChange,

  handleUploadImage,

}: GeneralStepProps) {
  return (
    <div>
      <p>What type of item are you selling?</p>
      <div className="flex space-x-4">
        <div className="border py-3 px-4 flex items-center gap-2 mt-2">
          <input
            type="radio"
            id="men"
            name="productType"
            value="2"
            checked={formData.productType === 2}
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
            name="productType"
            value="1"
            checked={formData.productType === 1}
            onChange={handleProductTypeChange}
          />
          <label htmlFor="women" className="mr-2">
            Womenswear
          </label>
        </div>
      </div>
      <div>
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
            value={formData.name}
            onChange={handleInputChange}
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
            placeholder="Enter the price"
            value={formData.price}
            onChange={handleInputChange}
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
            placeholder="Enter the brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="w-full p-3 rounded border"
            onChange={handleUploadImage}
            required
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
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
}
