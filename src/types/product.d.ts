export interface Category {
  product_category_id: number;
  category_name: string;
  category_en: string;
  category_ka: string;
}

export interface Material {
  product_material_id: number;
  material_name: string;
  material_en: string;
  material_ka: string;
}

export interface Condition {
  product_condition_id: number;
  condition_name: string;
  condition_en: string;
  condition_ka: string;
}

export interface Color {
  product_color_id: number;
  color_name: string;
  color_en: string;
  color_ka: string;
}
interface ProductType {
  id: number;
  created_at?: string;
  price?: number;
  user_id?: string;
  stripe_price_id?: string;
  stripe_product_id?: string;
  name?: string;
  name_ka?: string;
  material_en: string;
  material_ka: string;
  vintage?: boolean;
  product_category_id?: number;
  product_category?: ProductCategory | null;
  product_condition_id?: number;
  product_condition?: ProductCondition | null;
  product_material_id?: number;
  product_material?: ProductMaterial | null;
  product_color_id?: number;
  product_color?: ProductColor | null;
  primary_image?: string 
  images?: string[];
  brand?:string
}
