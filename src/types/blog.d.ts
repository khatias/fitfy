export interface BlogPostType {
    id: number;
    title_en: string;
    title_ka: string;
    description_en: string;
    description_ka: string;
    content_en: string;
    content_ka: string;
    featured_image?: string;
    user_id: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    username?:string
  }
  