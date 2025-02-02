"use client";
import React, { useState } from "react";
import Image from "next/image";
import { uploadFile } from "@/utils/files/uploadFile";
import { createBlog } from "@/utils/blogs/blogCreator";

export function CreateBlogForm() {
  const [formData, setFormData] = useState<{
    title_en: string;
    title_ka: string;
    content_en: string;
    content_ka: string;
    description_en: string;
    description_ka: string;
    status: string;
    featured_image: File | string | null;
  }>({
    title_en: "",
    title_ka: "",
    content_en: "",
    content_ka: "",
    description_en: "",
    description_ka: "",
    status: "Draft",
    featured_image: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showGeorgian, setShowGeorgian] = useState(false);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the updated field
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name]; // Remove the error for the specific field
      }
      return newErrors;
    });
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
        const uploadedImageUrl = await uploadFile(file, "blogs");
        setFormData((prev) => ({
          ...prev,
          featured_image: uploadedImageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors: { [key: string]: string } = {};

    if (!formData.title_en) {
      validationErrors.title_en = "Title is required in English.";
    }

    if (!formData.title_ka) {
      validationErrors.title_ka = "Title is required in Georgian.";
    }

    if (!formData.content_en) {
      validationErrors.content_en = "Content is required in English.";
    }
    if (!formData.content_ka) {
      validationErrors.content_ka = "Content is required in Georgian.";
    }
    if (!formData.description_en) {
      validationErrors.description_en = "Content is required in English.";
    }
    if (!formData.description_ka) {
      validationErrors.description_ka = "Content is required in Georgian.";
    }

    if (!formData.featured_image) {
      validationErrors.featured_image = "Image is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title_en", formData.title_en);
    formDataToSubmit.append("title_ka", formData.title_ka);
    formDataToSubmit.append("content_en", formData.content_en);
    formDataToSubmit.append("content_ka", formData.content_ka);
    formDataToSubmit.append("description_en", formData.description_en);
    formDataToSubmit.append("description_ka", formData.description_ka);

    formDataToSubmit.append("status", formData.status);

    if (formData.featured_image) {
      formDataToSubmit.append("featured_image", formData.featured_image);
    }

    try {
      const response = await createBlog(formDataToSubmit);
      if (response?.success) {
        console.log("Blog created successfully");
      } else {
        console.log("Error:", response?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleToggle = () => {
    setShowGeorgian(!showGeorgian);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Create New Post
        </h2>

        <button
          type="button"
          onClick={handleToggle}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-300 text-lg"
        >
          {showGeorgian ? "Switch to English" : "Switch to Georgian"}
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor={showGeorgian ? "title_ka" : "title_en"}
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id={showGeorgian ? "title_ka" : "title_en"}
              name={showGeorgian ? "title_ka" : "title_en"}
              value={showGeorgian ? formData.title_ka : formData.title_en}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
            {errors[showGeorgian ? "title_ka" : "title_en"] && (
              <span className="text-red-500 text-sm">
                {errors[showGeorgian ? "title_ka" : "title_en"]}
              </span>
            )}
            {/* Display error for the other language */}
            {!showGeorgian && errors.title_ka && (
              <span className="text-red-500 text-sm">{errors.title_ka}</span>
            )}
            {showGeorgian && errors.title_en && (
              <span className="text-red-500 text-sm">{errors.title_en}</span>
            )}
          </div>

          <div>
            <label
              htmlFor={showGeorgian ? "content_ka" : "content_en"}
              className="block text-sm font-medium text-gray-700"
            >
              content
            </label>
            <textarea
              id={showGeorgian ? "content_ka" : "content_en"}
              name={showGeorgian ? "content_ka" : "content_en"}
              value={showGeorgian ? formData.content_ka : formData.content_en}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
            {errors[showGeorgian ? "content_ka" : "content_en"] && (
              <span className="text-red-500 text-sm">
                {errors[showGeorgian ? "content_ka" : "content_en"]}
              </span>
            )}
            {/* Display error for the other language */}
            {!showGeorgian && errors.content_ka && (
              <span className="text-red-500 text-sm">{errors.title_ka}</span>
            )}
            {showGeorgian && errors.title_en && (
              <span className="text-red-500 text-sm">{errors.contetn_en}</span>
            )}
          </div>

          <div>
            <label
              htmlFor={showGeorgian ? "description_ka" : "description_en"}
              className="block text-sm font-medium text-gray-700"
            >
              description
            </label>
            <textarea
              id={showGeorgian ? "description_ka" : "description_en"}
              name={showGeorgian ? "description_ka" : "description_en"}
              value={
                showGeorgian ? formData.description_ka : formData.description_en
              }
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
            {errors[showGeorgian ? "description_ka" : "description_en"] && (
              <span className="text-red-500 text-sm">
                {errors[showGeorgian ? "description_ka" : "descrition_en"]}
              </span>
            )}
            {/* Display error for the other language */}
            {!showGeorgian && errors.description_ka && (
              <span className="text-red-500 text-sm">
                {errors.description_ka}
              </span>
            )}
            {showGeorgian && errors.title_en && (
              <span className="text-red-500 text-sm">
                {errors.description_en}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="image"
                className="relative cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 hover:bg-gray-50 transition duration-300 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-gray-500 transition duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1H7zm5.328 9.223a.75.75 0 101.15-.966l-3.215-4.018a.75.75 0 00-1.036 0L4.328 13.257a.75.75 0 001.15.966l2.76-3.45A.75.75 0 008 10.75V14a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-3.25a.75.75 0 00-.542-.677z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700 transition duration-300">
                  Choose a file
                </span>
                <input
                  type="file"
                  id="image"
                  name="featured_image"
                  onChange={handleUploadImage}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
              {formData.featured_image &&
                typeof formData.featured_image === "string" && (
                  <div className="ml-4 flex-shrink-0">
                    <Image
                      src={formData.featured_image}
                      alt="Image preview"
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
            </div>
            {errors.featured_image && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.featured_image}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-300 text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
