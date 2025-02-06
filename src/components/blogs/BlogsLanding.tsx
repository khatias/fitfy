"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { BlogPostType } from "@/types/blog";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { getLocalizedText } from "@/utils/localization/localization";
import Loader from "../Loader/Loader";

function BlogsLanding() {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .limit(5);

        if (error) {
          throw error;
        }

        setBlogPosts(data as BlogPostType[]);
      } catch (error: unknown) {
        console.error("Error fetching blog posts:", error);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400">Error loading blog posts: {error.message}</div>;
  }

  if (!blogPosts || blogPosts.length === 0) {
    return <div className="text-gray-800 dark:text-gray-300">No blog posts found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-6 my-8 lg:mx-0">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800  rounded-lg transition-transform transform shadow-sm dark:shadow-lg"
        >
          {post.featured_image && (
            <div className="relative w-full mb-4 overflow-hidden rounded-lg">
              <Image
                src={post.featured_image}
                alt={post.title_en}
                width={500}
                height={200}
                style={{ objectFit: "cover" }}
                className=" w-full max-h-60 object-top"
              />
            </div>
          )}
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
            {getLocalizedText(currentLocale, post.title_en || "", post.title_ka || "")}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default BlogsLanding;
