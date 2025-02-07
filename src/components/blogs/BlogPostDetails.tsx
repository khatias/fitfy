"use client";
import React from "react";
import Image from "next/image";
import { BlogPostType } from "@/types/blog";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface BlogPostDetailsProps {
  blogPost: BlogPostType;
}

const BlogPostDetails: React.FC<BlogPostDetailsProps> = ({ blogPost }) => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const t = useTranslations("Blog");
  const getLocalizedText = (enText: string, kaText: string = "") => {
    return currentLocale === "en" ? enText : kaText;
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        {getLocalizedText(blogPost.title_en || "", blogPost.title_ka || "")}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {getLocalizedText(
          blogPost.description_en || "",
          blogPost.description_ka || ""
        )}
      </p>

      {blogPost.featured_image && (
        <div className="relative w-full mb-8  overflow-hidden rounded-lg">
          <Image
            src={blogPost.featured_image}
            alt={blogPost.title_en}
            width={800}
            height={500}
            quality={100}
            style={{ objectFit: "contain" }}
            className="rounded-lg w-full h-auto"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-dark mx-auto mb-8">
        <p>
       
          {getLocalizedText(
            blogPost.content_en || "",
            blogPost.content_ka || ""
          )}
        </p>
      </div>

      <div className="flex items-center mt-8 border-t pt-4 border-gray-200 dark:border-gray-700">
        {blogPost.avatar_url && (
          <Image
            src={blogPost.avatar_url}
            alt="Author Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            {blogPost.first_name || "Unknown"} {blogPost.last_name || ""}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t("author")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;
