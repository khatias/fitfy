import React from "react";
import { createClient } from "@/utils/supabase/server";
import BlogPostDetails from "@/components/blogs/BlogPostDetails";
import { BlogPostType } from "@/types/blog";
import NotFound from "@/components/NotFound/NotFound";

interface Params {
  id: string;
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: postData, error: postError } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (postError || !postData) {
    
    return (
    <NotFound/>
    );
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, last_name, avatar_url")
    .eq("user_id", postData.user_id)
    .single();

  if (profileError) {
    console.error(profileError);
    return <div>Error fetching profile details. Please try again later.</div>;
  }

  const blogPost = {
    ...postData,
    first_name: profileData?.first_name,
    last_name: profileData?.last_name,
    avatar_url: profileData?.avatar_url,
  };

  return (
    <div className="max-w-[1300px] mx-auto p-6 font-sans min-h-screen">
      <BlogPostDetails blogPost={blogPost as BlogPostType} />
    </div>
  );
}
