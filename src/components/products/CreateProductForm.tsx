"use client";
import React, { useState, useEffect } from "react";
import { uploadFile } from "@/utils/files/uploadFile";
import { createProduct } from "@/utils/products/productCreator";
import {
  fetchCategories,
  fetchMaterials,
  fetchConditions,
  fetchColors,
} from "@/utils/fetchDatas/fetchProductData";
import { GeneralStep } from "./GeneralStep";
import { ProductDetailsStep } from "./ProductDetailsStep";

export function CreateProductForm() {
  interface Category {
    product_category_id: number;
    category_name: string;
  }
  interface Material {
    product_material_id: number;
    material_name: string;
  }
  interface Condition {
    product_condition_id: number;
    condition_name: string;
  }
  interface Color {
    product_color_id: number;
    color_name: string;
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
    size:string; 
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
    size:"",
  });
  const [step, setStep] = useState(1);

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

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const uploadedImageUrl = await uploadFile(file, "products");
        setFormData((prev) => ({
          ...prev,
          image: uploadedImageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
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
    <div className="w-full m-auto container">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={step === 4}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>

      <h2 className="text-2xl text-center font-bold mb-6">Sell an item</h2>

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
          isVintage={isVintage} // Passed isVintage
          setIsVintage={setIsVintage} // Passed setIsVintage
          categories={categories}
          materials={materials}
          conditions={conditions}
          colors={colors}
        />
      )}

      {/* Additional Steps */}
      {step === 3 && <div>Step 3</div>}
      {step === 4 && <div>Step 4</div>}

      {/* Submit Button */}
      {step === 4 && (
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-16 py-3 bg-purple-800 text-white rounded-md hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
