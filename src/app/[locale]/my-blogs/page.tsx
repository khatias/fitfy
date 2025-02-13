"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BlogPostType } from "@/types/blog";
import { usePathname } from "next/navigation";

const MyBlogs: React.FC = () => {
  const pathname = usePathname();
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 
  const t = useTranslations("Blog");
  const currentLocale = pathname.split("/")[1];

  useEffect(() => {
    const fetchMyBlogPosts = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setError("User not authenticated or failed to fetch user.");
          return;
        }

        const userId = user.id;

        const { data: blogData, error: blogError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("user_id", userId);

        if (blogError) {
          setError("Error fetching blog posts: " + blogError.message);
          return;
        }

        if (!blogData || blogData.length === 0) {
          setBlogPosts([]);
        } else {
          setBlogPosts(blogData);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError("An unexpected error occurred: " + err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);

      if (error) {
        setError("Error deleting blog post: " + error.message);
      } else {
        setBlogPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== postId)
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("An unexpected error occurred: " + err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };
  const getLocalizedText = (enText: string, kaText: string = "") => {
    return currentLocale === "en" ? enText : kaText;
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow bg-gray-100 dark:bg-gray-900 pt-10 pb-10 min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500 dark:border-gray-300"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-6">{error}</div>;
  }

  return (
    <div className="max-w-[1300px] mx-auto p-6 font-sans min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-300 mt-10 mb-10">
        {t("myblogstitle")}
      </h1>

      {blogPosts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t("noBlogs")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg flex flex-col justify-between overflow-hidden transition-transform duration-300 hover:scale-105 shadow-md dark:shadow-none"
            >
              <Link href={`/blog/${post.id}`}>
                {post.featured_image && (
                  <div className="relative h-[350px] w-full">
                    <Image
                      src={post.featured_image}
                      alt={post.title_en}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                      className="rounded-t-lg border-b-2 border-b-gray-100"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-customAmber transition duration-300">
                    {getLocalizedText(post.title_en || "", post.title_ka || "")}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                    {getLocalizedText(
                      post.description_en || "",
                      post.description_ka || ""
                    )}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col items-start mt-4 mb-2 px-6 gap-2">
                <Link
                  href={`/my-blogs/${post.id}`}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md px-3 py-1 text-sm transition duration-200 ease-in-out"
                >
                  {t("editBlog")}
                </Link>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md px-3 py-1 text-sm transition duration-200 ease-in-out"
                >
                  {t("deleteBlog")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
