// ProductDetailsStep.tsx
"use client";
import React, { useState } from "react";
import { Material, Condition, Color, Category } from "@/types/product";
import { useTranslations } from "next-intl";
import { formDataType } from "@/types/formData";
import Select from "../inputs/Select";

interface ProductDetailsStepProps {
  formData: formDataType;
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
  isVintage: boolean;
  setIsVintage: React.Dispatch<React.SetStateAction<boolean>>;
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
  setIsVintage,
}: ProductDetailsStepProps) {
  const locale = window.location.pathname.split("/")[1];
  const t = useTranslations("ProductForm");
  const te = useTranslations("FormErrors");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string | number | null) => {
    let error = "";

    if (!value) {
      error = te("required");
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <div className="space-y-6  justify-between">
      <Select
        label={t("category")}
        name="category"
        value={formData.category}
        options={categories.map((category) => ({
          value: category.product_category_id,
          label: locale === "en" ? category.category_en : category.category_ka,
        }))}
        onChange={handleSelectChange}
        onBlur={handleBlur}
        error={errors.category}
      />

      <Select
        label={t("material")}
        name="material"
        value={formData.material}
        options={materials.map((material) => ({
          value: material.product_material_id,
          label: locale === "en" ? material.material_en : material.material_ka,
        }))}
        onChange={handleSelectChange}
        onBlur={handleBlur}
        error={errors.material}
      />

      <Select
        label={t("condition")}
        name="condition"
        value={formData.condition}
        options={conditions.map((condition) => ({
          value: condition.product_condition_id,
          label:
            locale === "en" ? condition.condition_en : condition.condition_ka,
        }))}
        onChange={handleSelectChange}
        onBlur={handleBlur}
        error={errors.condition}
      />

      <Select
        label={t("color")}
        name="color"
        value={formData.color}
        options={colors.map((color) => ({
          value: color.product_color_id,
          label: locale === "en" ? color.color_en : color.color_ka,
        }))}
        onChange={handleSelectChange}
        onBlur={handleBlur}
        error={errors.color}
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="vintage"
          name="vintage"
          checked={isVintage}
          onChange={() => setIsVintage(!isVintage)}
          className="h-5 w-5 border-gray-300 rounded"
        />
        <label
          htmlFor="vintage"
          className="block text-sm font-medium transition-all duration-300"
        >
          {t("vintage")}
        </label>
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="size"
          className="block text-sm font-medium transition-all duration-300"
        >
          {t("size")}
        </label>
        <input
          id="size"
          name="size"
          className="w-full p-3 rounded border"
          placeholder={t("sizeplaceholder")}
          value={formData.size}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        {errors.size && <span className="text-red-500">{errors.size}</span>}
      </div>
    </div>
  );
}
