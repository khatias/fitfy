"use client";
import React, { useState } from "react";
import { Material, Condition, Color, Category } from "@/types/product";
import { useTranslations } from "next-intl";
import { formDataType } from "@/types/formData";

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
  const t = useTranslations("ProductDetailsStep");
  const te = useTranslations("FormErrors");
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation function, similar to how it's done in GeneralStep
  const validateField = (name: string, value: string | number | null) => {
    let error = "";

    if (name === "category" && !value) {
      error = te("required");
    }
    if (name === "material" && !value) {
      error = te("required");
    }
    if (name === "condition" && !value) {
      error = te("required");
    }
    if (name === "color" && !value) {
      error = te("required");
    }
    if (name === "size" && !value) {
      error = te("required");
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <div className="space-y-6 lg:w-[576px] lg:h-[490px] justify-between">
      {/* Category */}
      <div>
        <label htmlFor="category" className="block font-medium">
          {t("category")}
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          required
          className="w-full border rounded p-2"
        >
          <option value="">{t("selectcategory")}</option>
          {categories.map((category: Category) => (
            <option
              key={category.product_category_id}
              value={category.product_category_id}
            >
              {locale === "en" ? category.category_en : category.category_ka}
            </option>
          ))}
        </select>
        {errors.category && <span className="text-red-500">{errors.category}</span>}
      </div>

      {/* Material */}
      <div>
        <label htmlFor="material" className="block font-medium">
          {t("material")}
        </label>
        <select
          id="material"
          name="material"
          onChange={handleSelectChange}
          onBlur={handleBlur}
          value={formData.material}
          className="w-full p-3 rounded border"
        >
          <option value="">{t("selectmaterial")}</option>
          {materials.map((material: Material) => (
            <option
              key={material.product_material_id}
              value={material.product_material_id}
            >
              {locale === "en" ? material.material_en : material.material_ka}
            </option>
          ))}
        </select>
        {errors.material && <span className="text-red-500">{errors.material}</span>}
      </div>

      {/* Condition */}
      <div>
        <label htmlFor="condition" className="block font-medium">
          {t("condition")}
        </label>
        <select
          id="condition"
          name="condition"
          onChange={handleSelectChange}
          onBlur={handleBlur}
          value={formData.condition}
          className="w-full p-3 rounded border"
        >
          <option value="">{t("selectcondition")}</option>
          {conditions.map((condition) => (
            <option
              key={condition.product_condition_id}
              value={condition.product_condition_id}
            >
              {locale === "en"
                ? condition.condition_en
                : condition.condition_ka}
            </option>
          ))}
        </select>
        {errors.condition && <span className="text-red-500">{errors.condition}</span>}
      </div>

      {/* Color */}
      <div>
        <label htmlFor="color" className="block font-medium">
          {t("color")}
        </label>
        <select
          id="color"
          name="color"
          onChange={handleSelectChange}
          onBlur={handleBlur}
          value={formData.color}
          className="w-full p-3 rounded border"
        >
          <option value="">{t("selectcolor")}</option>
          {colors.map((color) => (
            <option key={color.product_color_id} value={color.product_color_id}>
              {locale === "en" ? color.color_en : color.color_ka}
            </option>
          ))}
        </select>
        {errors.color && <span className="text-red-500">{errors.color}</span>}
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
        <label
          htmlFor="vintage"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("vintage")}
        </label>
      </div>

      {/* Size */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="size"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
