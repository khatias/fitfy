"use server"
import { createClient } from "../supabase/server";
export async function deleteProduct(productId: number) {
    const supabase = await createClient();

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq('id', productId);

      if (error) throw error;



      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, error };
    }
  }
      
  