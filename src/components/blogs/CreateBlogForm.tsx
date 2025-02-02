"use client";
import React, { useState } from "react";
import { uploadFile } from "@/utils/files/uploadFile";
import { createBlog } from "@/utils/blogs/blogCreator";

export function CreateBlogForm() {
    const [formData, setFormData] = useState<{
        title_en: string;
        title_ka: string;
        content_en: string;
        content_ka: string;
        status: string;
        featured_image: File | string | null; // Change this to accept string as well
        tags: string[];
      }>({
        title_en: "",
        title_ka: "",
        content_en: "",
        content_ka: "",
        status: "",
        featured_image: null,
        tags: [],
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
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const uploadedImageUrl = await uploadFile(file, "blogs");
        setFormData((prev) => ({
          ...prev,
          featured_image: uploadedImageUrl, // assuming it's the correct field name
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const validationErrors: { [key: string]: string } = {};
  
    // Validate title
    if (!formData.title_en) {
      validationErrors.title_en = "Title is required in English.";
    }
    if (!formData.title_ka) {
      validationErrors.title_ka = "Title is required in Georgian.";
    }
  
    // Validate content
    if (!formData.content_en) {
      validationErrors.content_en = "Content is required in English.";
    }
    if (!formData.content_ka) {
      validationErrors.content_ka = "Content is required in Georgian.";
    }
  
    // Validate image
    if (!formData.featured_image) {
      validationErrors.featured_image = "Image is required.";
    }
  
    // Validate tags (optional example, adjust according to your form)
    if (formData.tags.length === 0) {
      validationErrors.tags = "At least one tag is required.";
    }
  
    // If there are errors, set them and return to prevent submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    // Clear previous errors
    setErrors({});
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title_en", formData.title_en);
    formDataToSubmit.append("title_ka", formData.title_ka);
    formDataToSubmit.append("content_en", formData.content_en);
    formDataToSubmit.append("content_ka", formData.content_ka);
    formDataToSubmit.append("status", formData.status);
  
    if (formData.featured_image) {
      formDataToSubmit.append("featured_image", formData.featured_image);
    }
    formData.tags.forEach((tag, index) => {
      formDataToSubmit.append(`tag_${index + 1}`, tag);
    });
  
    try {
      const response = await createBlog(formDataToSubmit);
      if (response?.success) {
        console.log("good");
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
    <div className="lg:w-[576px] lg:h-[490px] justify-between">
      <form onSubmit={handleSubmit}>
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

        <div className="space-y-4">
          {/* Title Input */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor={showGeorgian ? "title_ka" : "title_en"}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id={showGeorgian ? "title_ka" : "title_en"}
              name={showGeorgian ? "title_ka" : "title_en"}
              className={`w-full p-3 rounded border ${
                errors[showGeorgian ? "title_ka" : "title_en"]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder={
                showGeorgian ? "შეიყვანე პროდუქტის სახელი" : "Enter title"
              }
              value={showGeorgian ? formData.title_ka : formData.title_en}
              onChange={handleInputChange}
            />
            {errors[showGeorgian ? "title_ka" : "title_en"] && (
              <span className="text-red-500 text-sm">
                {errors[showGeorgian ? "title_ka" : "title_en"]}
              </span>
            )}
          </div>

          {/* Image Input */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="featured_image"
              className={`w-full p-3 rounded border ${
                errors.featured_image ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleUploadImage}
            />
            {errors.featured_image && (
              <span className="text-red-500 text-sm">
                {errors.featured_image}
              </span>
            )}
          </div>

          {/* Content Input */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor={showGeorgian ? "content_ka" : "content_en"}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id={showGeorgian ? "content_ka" : "content_en"}
              name={showGeorgian ? "content_ka" : "content_en"}
              className={`w-full p-4 rounded-lg border ${
                errors[showGeorgian ? "content_ka" : "content_en"]
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder={
                showGeorgian
                  ? "შეიყვანეთ მოკლე აღწერა პროდუქტის შესახებ"
                  : "Write content"
              }
              value={showGeorgian ? formData.content_ka : formData.content_en}
              onChange={handleInputChange}
            ></textarea>
            {errors[showGeorgian ? "content_ka" : "content_en"] && (
              <span className="text-red-500 text-sm">
                {errors[showGeorgian ? "content_ka" : "content_en"]}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
