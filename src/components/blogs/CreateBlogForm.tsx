"use client";
import React, { useState } from "react";
import { uploadFile } from "@/utils/files/uploadFile";
import { createBlog } from "@/utils/blogs/blogCreator";
import { useTranslations } from "next-intl";
import Input from "../inputs/Input";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import FormLanguageToggle from "../toggle/FormLanguageToggle";

export function CreateBlogForm() {
  const [formData, setFormData] = useState({
    title_en: "",
    title_ka: "",
    content_en: "",
    content_ka: "",
    description_en: "",
    description_ka: "",
    status: "Draft",
    featured_image: null as File | string | null,
  });
  const t = useTranslations("Blog");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showGeorgian, setShowGeorgian] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const uploadedImageUrl = await uploadFile(file, "blogs");
        setFormData((prev) => ({ ...prev, featured_image: uploadedImageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: { [key: string]: string } = {};

    [
      "title_en",
      "title_ka",
      "content_en",
      "content_ka",
      "description_en",
      "description_ka",
    ].forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        validationErrors[field] = `${field.replace("_", " ")} is required.`;
      }
    });

    if (!formData.featured_image) {
      validationErrors.featured_image = "Image is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) formDataToSubmit.append(key, value as string | Blob);
    });

    try {
      const response = await createBlog(formDataToSubmit);
      if (response?.success) {
        setSuccessMessage(t("successMessage"));
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        console.error("Error:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex  justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-85 overflow-y-auto ">
      <div className="bg-white relative dark:bg-gray-800 p-8 rounded-lg w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center pb-6">
          {t("createYourArticle")}
        </h2>
        <div className="flex justify-between pb-4 items-center">
          <FormLanguageToggle
            showGeorgian={showGeorgian}
            setShowGeorgian={setShowGeorgian}
          />
          <Link
            href="/blog"
            className="inline-flex absolute top-6 right-6 items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-300 rounded-full transition duration-300 ease-in-out"
          >
            <span className="text-black font-bold">X</span>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 overflow-y-auto max-h-[60vh] scroll-auto pr-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <Input
                label={showGeorgian ? "სათაური" : "Title"}
                type="text"
                name={showGeorgian ? "title_ka" : "title_en"}
                value={showGeorgian ? formData.title_ka : formData.title_en}
                onChange={handleInputChange}
                error={errors[showGeorgian ? "title_ka" : "title_en"]}
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("status")}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleSelectChange}
                className="w-full p-4 border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700  text-gray-700 dark:text-gray-300 focus:ring-indigo-500 dark:border-gray-600"
              >
                <option value="Draft"> {t("draft")}</option>
                <option value="Published"> {t("published")}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {showGeorgian ? "კონტენტი" : "Content"}
            </label>
            <textarea
              name={showGeorgian ? "content_ka" : "content_en"}
              value={showGeorgian ? formData.content_ka : formData.content_en}
              onChange={handleInputChange}
              rows={6}
              className="w-full p-4 border rounded-lg  shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-indigo-500 dark:border-gray-600"
            />
            {errors[showGeorgian ? "content_ka" : "content_en"] && (
              <span className="text-red-500 text-sm">
                {errors[showGeorgian ? "content_ka" : "content_en"]}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {showGeorgian ? "აღწერა" : "Description"}
            </label>
            <textarea
              name={showGeorgian ? "description_ka" : "description_en"}
              value={
                showGeorgian ? formData.description_ka : formData.description_en
              }
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-indigo-500 dark:border-gray-600"
            />
            {errors[showGeorgian ? "description_ka" : "description_en"] && (
              <span className="text-red-500 text-sm">
                {errors[showGeorgian ? "description_ka" : "description_en"]}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("chooseFile")}
            </label>
            <div className="mt-2 flex items-center">
              <label
                htmlFor="image"
                className="relative cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-gray-500 dark:text-gray-400 transition duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1H7zm5.328 9.223a.75.75 0 101.15-.966l-3.215-4.018a.75.75 0 00-1.036 0L4.328 13.257a.75.75 0 001.15.966l2.76-3.45A.75.75 0 008 10.75V14a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-3.25a.75.75 0 00-.542-.677z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("chooseFile")}
                </span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {formData.featured_image && (
            <div className="mt-4">
              <Image
                src={
                  typeof formData.featured_image === "string"
                    ? formData.featured_image
                    : ""
                }
                alt="Featured Image"
                width={500}
                height={300}
                className="object-cover"
              />
            </div>
          )}

          {successMessage && (
            <div className="mt-4 text-black text-center font-semibold">
              {successMessage}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto py-3 px-6 bg-customRed text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
            >
              {t("saveBlog")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
