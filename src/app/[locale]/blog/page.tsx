"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface BlogPost {
  id: number;
  title_en: string;
  description_en: string;
  featured_image?: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

const Page: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const t = useTranslations("Blog");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data: blogData, error: blogError } = await supabase
          .from("blog_posts")
          .select("*");

        if (blogError) {
          console.error("Error fetching blog posts:", blogError);
          return;
        }

        if (!blogData) {
          setBlogPosts([]);
          return;
        }

        const blogPostsWithProfiles: BlogPost[] = await Promise.all(
          blogData.map(async (post) => {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("first_name, last_name, avatar_url")
              .eq("user_id", post.user_id)
              .single();

            return {
              ...post,
              first_name: profileData?.first_name,
              last_name: profileData?.last_name,
              avatar_url: profileData?.avatar_url,
            };
          })
        );

        setBlogPosts(blogPostsWithProfiles);
      } catch (err) {
        console.error("Error fetching blog posts or profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 py-6">Loading...</div>;
  }

  return (
    <div className="max-w-[1300px] mx-auto p-6 font-sans min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-300 mt-10 mb-10">
        {t("title")}
      </h1>

      {blogPosts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No blog posts available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg flex flex-col justify-between overflow-hidden transition-transform duration-300 hover:scale-105 shadow-md dark:shadow-none">
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-blue-600 transition duration-300">
                    {post.title_en}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                    {post.description_en}
                  </p>
                  <div className="flex items-center gap-3 border-t pt-3 mt-4 border-gray-200 dark:border-gray-700">
                    {post.avatar_url && (
                      <Image
                        src={post.avatar_url}
                        alt="Author Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">
                        {post.first_name || "Unknown"} {post.last_name || ""}
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">
                        Author
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
