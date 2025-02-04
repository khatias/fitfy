import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { formDataType } from "@/types/formData";
import FormLanguageToggle from "../toggle/FormLanguageToggle";
import ImageUpload from "../inputs/ImageUploadInput";
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
  const t = useTranslations("ProductForm");
  const te = useTranslations("FormErrors");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showGeorgian, setShowGeorgian] = useState(false);

  const validateField = (
    name: string,
    value: string | number | File | null
  ) => {
    let error = "";
    switch (name) {
      case "name":
      case "name_ka":
        if (!value || value.toString().trim() === "") {
          error = te("required");
        }
        break;
      case "price":
        if (value === "") {
          error = te("required");
        } else if (Number(value) <= 0) {
          error = te("priceError");
        }
        break;
      case "brand":
        if (!value || value.toString().trim() === "") {
          error = te("required");
        }
        break;
      case "description":
      case "description_ka":
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
    <div className="w-full  justify-between">
 

      <p className="mb-4 text-xl font-medium text-gray-900 dark:text-gray-100">
        {t("question")}
      </p>

      <div className="mt-4 flex space-x-8 pb-6">
        
        <label className="inline-flex items-center relative cursor-pointer">
          <input
            type="radio"
            id="men"
            name="productType"
            value="2"
            checked={formData.productType === 2}
            onChange={handleProductTypeChange}
            className="peer sr-only"
          />
          <div className="w-5 h-5  bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-500 flex items-center justify-center transition duration-300 peer-checked:bg-customRed peer-checked:border-customRed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white hidden peer-checked:block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414l3.293 3.293 7.707-7.707a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="ml-2 text-gray-700 dark:text-gray-300 transition duration-300 hover:text-customRed dark:hover:bg-pink-200">
            {t("menswear")}
          </span>
        </label>

        <label className="inline-flex items-center relative cursor-pointer">
          <input
            type="radio"
            id="women"
            name="productType"
            value="1"
            checked={formData.productType === 1}
            onChange={handleProductTypeChange}
            className="peer sr-only"
          />
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-500 flex items-center justify-center transition duration-300 peer-checked:bg-customRed peer-checked:border-customRed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white hidden peer-checked:block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414l3.293 3.293 7.707-7.707a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="ml-2 text-gray-700 dark:text-gray-300 transition duration-300 hover:text-customRed dark:hover:text-pink-200">
            {t("womenswear")}
          </span>
        </label>
      </div>
      <div className="space-y-4">
      <FormLanguageToggle
        showGeorgian={showGeorgian}
        setShowGeorgian={setShowGeorgian}
      />
        <div className="flex flex-col space-y-1">
          <label
            htmlFor={showGeorgian ? "name_ka" : "name"}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("name")}
          </label>
          <input
            type="text"
            id={showGeorgian ? "name_ka" : "name"}
            name={showGeorgian ? "name_ka" : "name"}
            className={`w-full p-3 rounded-md border ${
              errors[showGeorgian ? "name_ka" : "name"]
                ? "border-red-500 animate-shake focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-500"
            } transition-all duration-300 focus:outline-none appearance-none`}
            placeholder={
              showGeorgian ? "შეიყვანე პროდუქტის სახელი" : "Enter Product Name"
            }
            value={showGeorgian ? formData.name_ka : formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors[showGeorgian ? "name_ka" : "name"] && (
            <span className="text-red-500 text-sm">
              {errors[showGeorgian ? "name_ka" : "name"]}
            </span>
          )}
        </div>
        <div className="flex w-full justify-between gap-x-3">
        <div className="flex flex-col space-y-1 w-full ">
          <label
            htmlFor="price"
            className="block text-sm font-medium transition-all duration-300"
          >
            {t("price")}
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className={`w-full p-3 rounded-md border
        ${
          errors.price
            ? "border-red-500 animate-shake focus:ring-red-500"
            : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-500"
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
        <div className="flex flex-col space-y-1 w-full">
          <label
            htmlFor="brand"
            className="block text-sm font-medium transition-all duration-300"
          >
            {t("brand")}
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className={`w-full p-3 rounded-md border ${
              errors.brand
                ? "border-red-500 animate-shake focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-500"
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
        <ImageUpload
          labelText={t("chooseImage")}
          onChange={handleUploadImage}
          onBlur={handleBlur}
          error={errors.image}
        />

        <div className="flex flex-col space-y-1">
          <label
            htmlFor={showGeorgian ? "description_ka" : "description_en"}
            className="block text-sm font-medium transition-all duration-300"
          >
            {t("description")}
          </label>
          <textarea
            id={showGeorgian ? "description_ka" : "description_en"}
            name={showGeorgian ? "description_ka" : "description_en"}
            className={`w-full p-3 rounded-md border ${
              errors[showGeorgian ? "description_ka" : "description_en"]
                ? "border-red-500"
                : "border-gray-300"
            }                 : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-500`}
            placeholder={
              showGeorgian
                ? "შეიყვანეთ მოკლე აღწერა პროდუქტის შესახებ"
                : "Enter a brief description of the product"
            }
            value={
              showGeorgian ? formData.description_ka : formData.description_en
            }
            onChange={handleInputChange}
            onBlur={handleBlur}
          ></textarea>
          {errors[showGeorgian ? "description_ka" : "description_en"] && (
            <span className="text-red-500 text-sm">
              {errors[showGeorgian ? "description_ka" : "description_en"]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
