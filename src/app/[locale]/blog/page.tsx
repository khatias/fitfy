"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePathname, useSearchParams } from "next/navigation";
import { BlogPostType } from "@/types/blog";

const Page: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const t = useTranslations("Blog");
  const currentLocale = pathname.split("/")[1];
  
  const getLocalizedText = (enText: string, kaText: string = "") => {
    return currentLocale === "en" ? enText : kaText;
  };

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

        const blogPostsWithProfiles: BlogPostType[] = await Promise.all(
          blogData.map(async (post) => {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("first_name, last_name, avatar_url, username")
              .eq("user_id", post.user_id)
              .single();

            return {
              ...post,
              first_name: profileData?.first_name,
              last_name: profileData?.last_name,
              avatar_url: profileData?.avatar_url,
              username: profileData?.username,
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

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const newUrl = new URL(pathname, window.location.origin);
    newUrl.searchParams.set("search", query);
    window.history.pushState({}, "", newUrl.toString());
  };

  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      // Searching in the title and description based on the current locale
      (currentLocale === "en" &&
        post.title_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (currentLocale === "en" &&
        post.description_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (currentLocale === "ka" &&
        post.title_ka.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (currentLocale === "ka" &&
        post.description_ka.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <div className="text-center text-gray-600 py-6">Loading...</div>;
  }

  return (
    <div className="max-w-[1300px] mx-auto p-6 font-sans min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-300 mt-10 mb-10">
        {t("title")}
      </h1>

      <div className="flex justify-center mb-6">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search blog posts..."
            className="border border-gray-300 dark:border-gray-700 rounded-xl p-3 pl-10 w-full bg-[#f2f3f4] dark:bg-gray-800 text-[#ababab] dark:text-[#e4e4e4] focus:outline-none focus:ring-1 focus:ring-red-500 transition duration-300 shadow-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ababab] dark:text-[#e4e4e4] pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filteredBlogPosts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No blog posts available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBlogPosts.map((post) => (
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
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-customAmber transition duration-300">
                    {getLocalizedText(post.title_en || "", post.title_ka || "")}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                    {getLocalizedText(
                      post.description_en || "",
                      post.description_ka || ""
                    )}
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
                        {post.username || "Unknown"} {post.last_name || ""}
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
