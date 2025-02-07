import React from "react";
import { createClient } from "@/utils/supabase/server";
import OrderItem from "@/components/orders/OrderITem";

export default async function Orders() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return <div>Please log in to view your orders.</div>;
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching orders:", error);
    return <div>Error loading orders.</div>;
  }

  return <OrderItem orders={orders} />;
}
