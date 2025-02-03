"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useTranslations } from "next-intl";
import { BlogPostType } from "@/types/blog";
import { uploadFile } from "@/utils/files/uploadFile";

const EditBlog = ({ params }: { params: Promise<{ id: string }> }) => {
  const [formData, setFormData] = useState<BlogPostType>({
    id: 0,
    title_en: "",
    title_ka: "",
    description_en: "",
    description_ka: "",
    content_en: "",
    content_ka: "",
    featured_image: "",
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [id, setId] = useState<string | null>(null);
  const [showGeorgian, setShowGeorgian] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("Blog");
  const te = useTranslations("General");

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      const id = resolvedParams.id;
      setId(id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const { data, error } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("id", id)
            .single();

          if (error) {
            setErrors({ fetch: "Error fetching the blog post." });
            return;
          }

          if (data) {
            setFormData({
              id: data.id,
              title_en: data.title_en,
              title_ka: data.title_ka,
              description_en: data.description_en,
              description_ka: data.description_ka,
              content_en: data.content_en,
              content_ka: data.content_ka,
              featured_image: data.featured_image,
            });
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Error occurred while fetching the blog post:", err);
            setErrors({
              fetch:
                "An unexpected error occurred while fetching the blog post: " +
                err.message,
            });
          } else {
            setErrors({
              fetch:
                "An unexpected error occurred while fetching the blog post.",
            });
          }
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const uploadedImageUrl = await uploadFile(file, "blogs");
        setFormData((prev) => ({
          ...prev,
          featured_image: uploadedImageUrl || undefined,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title_en, description_en } = formData;

    if (!title_en || !description_en) {
      setErrors({ form: "Title and Description are required." });
      return;
    }

    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          title_en: formData.title_en,
          title_ka: formData.title_ka,
          description_en: formData.description_en,
          description_ka: formData.description_ka,
          content_en: formData.content_en,
          content_ka: formData.content_ka,
          featured_image: formData.featured_image,
        })
        .eq("id", id);

      if (error) {
        setErrors({ form: "Error updating the blog post." });
        return;
      }

      setIsModalOpen(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors({
          form: `An unexpected error occurred while updating the blog post: ${err.message}`,
        });
      } else {
        setErrors({
          form: "An unexpected error occurred while updating the blog post.",
        });
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-[1300px] mx-auto p-6 font-sans min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-300 mt-10 mb-10">
        {t("editTblogTitle")}
      </h1>
      <div className="flex justify-end mb-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
          {showGeorgian ? "KA" : "EN"}
        </label>
        <button
          type="button"
          onClick={() => setShowGeorgian(!showGeorgian)}
          className={`w-14 h-7 rounded-full relative transition duration-300 ${
            showGeorgian ? "bg-red-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute w-5 h-5 rounded-full bg-white shadow-sm left-1 top-1 transition duration-300 ${
              showGeorgian ? "translate-x-7" : ""
            }`}
          />
        </button>
      </div>

      {errors.fetch && <div className="text-red-600">{errors.fetch}</div>}
      {errors.form && <div className="text-red-600">{errors.form}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            {te("title")}
          </label>
          <input
            type="text"
            id="title"
            value={showGeorgian ? formData.title_ka : formData.title_en}
            onChange={(e) =>
              setFormData({
                ...formData,
                [showGeorgian ? "title_ka" : "title_en"]: e.target.value,
              })
            }
            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            {t("description")}
          </label>
          <textarea
            id="description"
            value={
              showGeorgian ? formData.description_ka : formData.description_en
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                [showGeorgian ? "description_ka" : "description_en"]:
                  e.target.value,
              })
            }
            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            rows={4}
            required
          />
        </div>

        
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            {t("content")}
          </label>
          <textarea
            id="content"
            value={
              showGeorgian ? formData.content_ka : formData.content_en
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                [showGeorgian ? "content_ka" : "content_en"]:
                  e.target.value,
              })
            }
            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t("upload_image")}
          </label>
          <input type="file" onChange={handleUploadImage} className="mt-2" />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t("save_changes")}
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold">{te("success")}</h3>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {te("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
