"use client";
import React from "react";
import { Material, Condition, Color, Category } from "@/types/product";

interface GeneralStepProps {
  formData: {
    name: string;
    price: string;
    brand: string;
    description: string;
    category: string;
    material: string;
    color: string;
    condition: string;
    image: string | null;
    productType: number | null;
    size: string;
  };
  handleProductTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
  materials: Material[];
  conditions: Condition[];
  colors: Color[];
  isVintage: boolean; // Added this prop
  setIsVintage: React.Dispatch<React.SetStateAction<boolean>>; // Added this prop
}

export function ProductDetailsStep({
  formData,
  handleSelectChange,
  handleInputChange,
  materials,
  conditions,
  colors,
  categories,
  isVintage,

  setIsVintage, // Destructured prop
}: GeneralStepProps) {
  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <label htmlFor="category" className="block font-medium">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleSelectChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="">Select a category</option>
          {categories.map((category: Category) => (
            <option key={category.product_category_id} value={category.product_category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* Material */}
      <div>
        <label htmlFor="material" className="block font-medium">
          Material
        </label>
        <select
          id="material"
          name="material"
          onChange={handleSelectChange}
          value={formData.material}
          className="w-full p-3 rounded border"
        >
          <option value="">Select a Material</option>
          {materials.map((material: Material) => (
            <option key={material.product_material_id} value={material.product_material_id}>
              {material.material_name}
            </option>
          ))}
        </select>
      </div>

      {/* Condition */}
      <div>
        <label htmlFor="condition" className="block font-medium">
          Condition
        </label>
        <select
          id="condition"
          name="condition"
          onChange={handleSelectChange}
          value={formData.condition}
          className="w-full p-3 rounded border"
        >
          <option value="">Select Condition</option>
          {conditions.map((condition) => (
            <option key={condition.product_condition_id} value={condition.product_condition_id}>
              {condition.condition_name}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <label htmlFor="color" className="block font-medium">
          Color
        </label>
        <select
          id="color"
          name="color"
          onChange={handleSelectChange}
          value={formData.color}
          className="w-full p-3 rounded border"
        >
          <option value="">Select Color</option>
          {colors.map((color) => (
            <option key={color.product_color_id} value={color.product_color_id}>
              {color.color_name}
            </option>
          ))}
        </select>
      </div>

      {/* Vintage Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="vintage"
          name="vintage"
          checked={isVintage}
          onChange={() => setIsVintage(!isVintage)}
          className="h-5 w-5 border-gray-300 rounded"
        />
        <label htmlFor="vintage" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Is Vintage
        </label>
      </div>
      <div className="flex flex-col space-y-2">
          <label
            htmlFor="size"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            size
          </label>
          <input
            id="size"
            name="size"
            className="w-full p-3 rounded border"
            placeholder="Enter product size"
            value={formData.size}
            onChange={handleInputChange}
            required
          />
        </div>
    </div>
  );
}
