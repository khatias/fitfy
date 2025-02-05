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
import { Category, Material, Condition, Color } from "@/types/product";
import { formDataType } from "@/types/formData";
import { Modal } from "../modals/Modal";

import { useProfile } from "@/utils/profile/getProfileCient";
import { supabase } from "@/utils/supabase/supabaseClient";

export function CreateProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isVintage, setIsVintage] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const profile = useProfile();
  const productCount = profile.profile?.product_count ?? 0;

  console.log(productCount);
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    name_ka: "",
    price: "",
    brand: "",
    description_en: "",
    description_ka: "",
    category: "",
    material: "",
    image: null,
    productType: null,
    condition: "",
    color: "",
    size: "",
    images: [],
  });

  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const t = useTranslations("createProductForm");
  const te = useTranslations("FormErrors");
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

        const validUploadedUrls = uploadedImageUrls.filter(
          (url) => url !== null
        ) as string[];

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...validUploadedUrls],
        }));
      } catch (error) {
        console.error("Error processing images:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors: { [key: string]: string } = {};

    // Validate required fields
    if (!formData.name) errors.name = te("nameError");
    if (!formData.name_ka) errors.name = te("nameError");
    if (!formData.price) errors.price = te("pricenotError");
    if (!formData.brand) errors.brand = te("brandError");
    if (!formData.description_en) errors.description = te("descriptionError");
    if (!formData.category) errors.category = te("categoryError");
    if (!formData.material) errors.material = te("materialError");
    if (!formData.condition) errors.condition = te("conditionError");
    if (!formData.color) errors.color = te("colorError");
    if (!formData.size) errors.size = te("sizeError");

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("name_ka", formData.name_ka);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("brand", formData.brand);
    formDataToSubmit.append("description_en", formData.description_en);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("material", formData.material);
    formDataToSubmit.append("condition", formData.condition);
    formDataToSubmit.append("gender", formData.productType?.toString() || "");
    formDataToSubmit.append("color", formData.color);
    formDataToSubmit.append("vintage", String(isVintage));
    formDataToSubmit.append("size", formData.size);
    formDataToSubmit.append("description_ka", formData.description_ka);

    if (formData.image) {
      formDataToSubmit.append("primary_image", formData.image);
    }
    formData.images.forEach((image, index) => {
      formDataToSubmit.append(`image_${index + 1}`, image);
    });
    if (productCount <= 0) {
      setShowLimitModal(true);
      return;
    } else {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.log(userError);
        return;
      }

      const userId = user.id;
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ product_count: productCount - 1 })
        .eq("user_id", userId);

      if (updateError) {
        console.log(updateError);
      }
    }

    const response = await createProduct(formDataToSubmit);

    if (response?.success) {
      console.log("Product created successfully");
      setShowSuccessModal(true);
    } else {
      console.log("Error:", response?.message || "Unknown error");
    }
  };

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  return (
    <div className="w-full m-auto mt-10 max-w-[900px] px-6 min-h-screen mb-20">
      <h2 className="text-2xl font-bold text-center mb-6 lg:mb-14">
        {t("title")}
      </h2>

      {Object.values(formErrors).length > 0 && (
        <div className="text-red-500 text-sm mb-4 flex items-center justify-center gap-2">
          {Object.values(formErrors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="lg:flex lg:justify-between gap-8 mb-10">
        <div className="flex items-center justify-start gap-8 lg:flex-col lg:items-start lg:min-w-[280px]">
          {["general", "details", "images"].map((stepLabel, index) => {
            const stepIndex = index + 1;
            return (
              <button
                key={stepLabel}
                onClick={() => setStep(stepIndex)}
                className={`w-10 h-10 rounded-full transition-colors duration-300 lg:w-auto lg:h-auto ${
                  step === stepIndex
                    ? "bg-black text-white font-semibold border-2 border-gray-200 lg:bg-gray-200 lg:text-black lg:rounded-none lg:min-w-full lg:py-2"
                    : "bg-white border-2 border-gray-200 text-black lg:border-none lg:px-6 lg:py-2"
                } flex items-center justify-center lg:justify-start lg:items-start lg:pl-2`}
              >
                <span
                  className={`text-md lg:hidden ${
                    step === stepIndex ? "text-white" : "text-black"
                  }`}
                >
                  {stepIndex}
                </span>
                <span className="hidden lg:block">{t(stepLabel)}</span>
              </button>
            );
          })}
        </div>

        <div className="lg:w-[576px]">
          {step === 1 && (
            <GeneralStep
              formData={formData}
              handleProductTypeChange={handleProductTypeChange}
              handleInputChange={handleInputChange}
              handleUploadImage={handleUploadImage}
            />
          )}

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

          {step === 3 && (
            <div className="flex flex-col justify-between items-end">
              <ImagesStep
                formData={formData}
                handleUploadImage={handleUploadImage}
                handleMultipleImageUpload={handleMultipleImageUpload}
              />
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-16 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
                >
                  {t("submit")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between space-x-4 mt-8 lg:justify-end">
        {step !== 3 && step > 1 && (
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            {t("previous")}
          </button>
        )}

        {step !== 3 && (
          <button
            onClick={nextStep}
            disabled={step === 3}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            {t("next")}
          </button>
        )}
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success!"
        message="Your product has been created successfully."
        buttonText="Go to Products"
        link="/products"
      />
      <Modal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        title="Limit Reached"
        message="You have reached your product limit."
        buttonText="Upgrade Plan"
        link="/subscription"
      />
    </div>
  );
}
