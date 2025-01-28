"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { formDataType } from "@/types/formData";

interface GeneralStepProps {
  formData: formDataType;
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
  const t = useTranslations("GeneralStep");
  const te = useTranslations("FormErrors");
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateField = (
    name: string,
    value: string | number | File | null
  ) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value || value.toString().trim() === "") {
          error = te("required");
        }
        break;
      case "price":
        if (value === "") {
          error = te("required");
        } else if (Number(value) <= 0) {
          error = te("priceError");
        } else {
          error = "";
        }
        break;
      case "brand":
        if (!value || value.toString().trim() === "") {
          error = te("required");
        }
        break;
      case "description":
        if (!value || value.toString().trim().length < 10) {
          error = te("required");
        }
        break;
      case "image":
        if (!value) {
          error = te("imageError");
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className="lg:w-[576px] lg:h-[490px] justify-between">
      <p>{t("question")}</p>
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
            {t("menswear")}
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
            {t("womenswear")}
          </label>
        </div>
      </div>
      <div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full p-3 rounded border ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={t("nameplacholder")}
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="price"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("price")}
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className={`w-full p-3 rounded border ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={t("priceplacholder")}
            value={formData.price}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="brand"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("brand")}
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className={`w-full p-3 rounded border ${
              errors.brand ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={t("brandplacholder")}
            value={formData.brand}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.brand && (
            <span className="text-red-500 text-sm">{errors.brand}</span>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("image")}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className={`w-full p-3 rounded border ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
            onChange={handleUploadImage}
            onBlur={handleBlur}
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("description")}
          </label>
          <textarea
            id="description"
            name="description"
            className={`w-full p-3 rounded border ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={t("descriptionplacholder")}
            value={formData.description}
            onChange={handleInputChange}
            onBlur={handleBlur}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
      </div>
    </div>
  );
}
