"use client";
import React, { useState, useEffect } from "react";
import { uploadFile } from "@/utils/files/uploadFile";
import { createProduct } from "@/utils/products/productCreator";
import { useTranslations } from "next-intl";
import {
  fetchCategories,
  fetchMaterials,
  fetchConditions,
  fetchColors,
} from "@/utils/fetchDatas/fetchProductData";
import { GeneralStep } from "./GeneralStep";
import { ProductDetailsStep } from "./ProductDetailsStep";
import { ImagesStep } from "./ImagesStep";

export function CreateProductForm() {
  interface Category {
    product_category_id: number;
    category_name: string;
    category_en: string;
    category_ka: string;
  }
  interface Material {
    product_material_id: number;
    material_name: string;
    material_en: string;
    material_ka: string;
  }
  interface Condition {
    product_condition_id: number;
    condition_name: string;
    condition_en: string;
    condition_ka: string;
  }
  interface Color {
    product_color_id: number;
    color_name: string;
    color_en: string;
    color_ka: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isVintage, setIsVintage] = useState(false); // State for vintage checkbox

  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    brand: string;
    description: string;
    category: string;
    image: string | null;
    productType: number | null;
    material: string;
    condition: string;
    color: string;
    size: string;
    images: string[]; // Fixed typing for images to an array of strings
  }>({
    name: "",
    price: "",
    brand: "",
    description: "",
    category: "",
    material: "",
    image: null,
    productType: null,
    condition: "",
    color: "",
    size: "",
    images: [], // Initialize images as an empty array
  });

  const [step, setStep] = useState(1);
  const t = useTranslations("createProductForm");
  useEffect(() => {
    const getProductDetails = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories || []);

      const fetchedMaterials = await fetchMaterials();
      setMaterials(fetchedMaterials || []);

      const fetchedConditions = await fetchConditions();
      setConditions(fetchedConditions || []);

      const fetchedColors = await fetchColors();
      setColors(fetchedColors || []);
    };
    getProductDetails();
  }, []);

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      productType: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Single image upload handler
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const uploadedImageUrl = await uploadFile(file, "products");
        setFormData((prev) => ({
          ...prev,
          image: uploadedImageUrl, // Store the primary image URL
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Multiple image upload handler
  const handleMultipleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      try {
        const uploadedImageUrls = await Promise.all(
          files.map(async (file) => {
            try {
              const uploadedImageUrl = await uploadFile(file, "products");
              return uploadedImageUrl;
            } catch (error) {
              console.error("Error uploading image:", error);
              return null;
            }
          })
        );

        // Filter out any null values (in case of upload failure)
        const validUploadedUrls = uploadedImageUrls.filter(
          (url) => url !== null
        ) as string[];

        // Correctly add each image URL to the images array
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...validUploadedUrls], // No need for a stringified array
        }));
      } catch (error) {
        console.error("Error processing images:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.image) {
      console.log("Please upload an image");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("brand", formData.brand);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("material", formData.material);
    formDataToSubmit.append("condition", formData.condition);
    formDataToSubmit.append("gender", formData.productType?.toString() || "");
    formDataToSubmit.append("color", formData.color);
    formDataToSubmit.append("vintage", String(isVintage));
    formDataToSubmit.append("size", formData.size);

    if (formData.image) {
      formDataToSubmit.append("primary_image", formData.image);
    }
    formData.images.forEach((image, index) => {
      formDataToSubmit.append(`image_${index + 1}`, image);
    });

    const response = await createProduct(formDataToSubmit);

    if (response?.success) {
      console.log("Product created successfully");
    } else {
      console.log("Error:", response?.message || "Unknown error");
    }
  };

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  return (
    <div className="w-full m-auto container max-w-5xl">
      <h2 className="text-2xl text-center font-bold mb-6">{t("title")}</h2>
      <div className="lg:flex  m-auto lg:justify-between max-w-5xl ">
        <div className="flex items-center justify-start gap-8 pb-8 lg:flex-col lg:items-start lg:min-w-60">
          <button
            onClick={() => setStep(1)}
            className={`w-10 h-10 rounded-full transition-colors duration-300 lg:w-auto lg:h-auto   ${
              step === 1
                ? "bg-black border-[1px] border-gray-200  lg:bg-gray-200 lg:rounded-none lg: py-2 lg:border-none lg:min-w-full lg:font-semibold "
                : "bg-white border-2 border-gray-200 lg:border-none   lg:px-6 py-2 "
            } flex items-center justify-center lg:justify-start lg:items-start lg:pl-2`}
          >
            <span
              className={`text-md lg:hidden ${
                step === 1 ? "text-white" : "text-black "
              }`}
            >
              1
            </span>
            <span className="hidden lg:block">General info</span>
          </button>
          <button
            onClick={() => setStep(2)}
            className={`w-10 h-10 rounded-full transition-colors duration-300 lg:w-auto lg:h-auto ${
              step === 2
                ? "bg-black border-[1px] border-gray-200  lg:bg-gray-200 lg:rounded-none lg:py-2 lg:border-none lg:min-w-full lg:font-semibold"
                : "bg-white border-2 border-gray-200 lg:border-none "
            } flex items-center justify-center lg:justify-start lg:items-start lg:pl-2`}
          >
            <span
              className={`text-md lg:hidden ${
                step === 2 ? "text-white" : "text-black"
              }`}
            >
              2
            </span>
            <span className="hidden lg:block">Product Details</span>
          </button>
          <button
            onClick={() => setStep(3)}
            className={`w-10 h-10 rounded-full transition-colors duration-300 lg:w-auto lg:h-auto${
              step === 3
                ? "bg-black border-[1px] border-gray-200  lg:bg-gray-200 lg:rounded-none lg:py-2 lg:border-none lg:min-w-full lg:font-semibold"
                : "bg-white border-2 border-gray-200 lg:border-none "
            } flex items-center justify-center lg:justify-start lg:items-start lg:pl-2`}
          >
            <span
              className={`text-md lg:hidden ${
                step === 3 ? "text-white" : "text-black "
              }`}
            >
              3
            </span>
            <span className="hidden lg:block">Images</span>
          </button>
        </div>

        {/* Step 1: Item Type */}
        {step === 1 && (
          <GeneralStep
            formData={formData}
            handleProductTypeChange={handleProductTypeChange}
            handleInputChange={handleInputChange}
            handleUploadImage={handleUploadImage}
          />
        )}

        {/* Step 2: Product Details */}
        {step === 2 && (
          <ProductDetailsStep
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleProductTypeChange={handleProductTypeChange}
            handleInputChange={handleInputChange}
            handleUploadImage={handleUploadImage}
            isVintage={isVintage}
            setIsVintage={setIsVintage}
            categories={categories}
            materials={materials}
            conditions={conditions}
            colors={colors}
          />
        )}

        {/* Step 3: Images */}
        {step === 3 && (
          <div className="flex flex-col lg:w-[576px] lg:h-[490px] justify-between items-end">
            <ImagesStep
              formData={formData}
              handleUploadImage={handleUploadImage}
              handleMultipleImageUpload={handleMultipleImageUpload}
            />
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-16 py-3 bg-black text-white rounded-sm"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex space-x-4 mt-8  lg:justify-end">
        {step !== 3 && step > 1 && (
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 bg-black text-white rounded-sm"
          >
            Previous
          </button>
        )}

        {step !== 3 && (
          <button
            onClick={nextStep}
            disabled={step === 3}
            className="px-4 py-2 bg-black text-white rounded-sm"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
