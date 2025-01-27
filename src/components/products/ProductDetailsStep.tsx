// ProductDetailsStep.tsx
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
}

export function ProductDetailsStep({
  formData,

  handleSelectChange,

  materials,
  conditions,
  colors,
  categories
}: GeneralStepProps) {
  return (
    <div className="space-y-6">
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
                    <option
                    key={category.product_category_id}
                    value={category.product_category_id}
                    >
                    {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
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
            <option
              key={material.product_material_id}
              value={material.product_material_id}
            >
              {material.material_name}
            </option>
          ))}
        </select>
      </div>

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
            <option
              key={condition.product_condition_id}
              value={condition.product_condition_id}
            >
              {condition.condition_name}
            </option>
          ))}
        </select>
      </div>

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
    </div>
  );
}
