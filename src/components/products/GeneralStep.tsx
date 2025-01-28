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

  const handleToggle = () => {
    setShowGeorgian(!showGeorgian);
  };

  return (
    <div className="lg:w-[576px] lg:h-[490px] justify-between">
      {/* Toggle Language Button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`mt-2 p-3 rounded-full text-sm font-semibold shadow-md mb-2 ${
          showGeorgian
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        } transition-all duration-300 transform `}
      >
        {showGeorgian ? "Switch to English" : "Switch to Georgian"}
      </button>
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

      <div className="space-y-4">
        {/* Name Input */}
        <div className="flex flex-col space-y-2">
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
            className={`w-full p-3 rounded border ${
              errors[showGeorgian ? "name_ka" : "name"]
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder={
              showGeorgian ? "შეიყვანე პროდუქტის სახელი" : t("nameplacholder")
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

        {/* Price Input */}
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

        {/* Brand Input */}
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

        {/* Image Input */}
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

        {/* Description Input */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor={showGeorgian ? "description_ka" : "description_en"}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("description")}
          </label>
          <textarea
            id={showGeorgian ? "description_ka" : "description_en"}
            name={showGeorgian ? "description_ka" : "description_en"}
            className={`w-full p-4 rounded-lg border ${
              errors[showGeorgian ? "description_ka" : "description_en"]
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={
              showGeorgian
                ? "შეიყვანეთ მოკლე აღწერა პროდუქტის შესახებ"
                : t("descriptionplacholder")
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
