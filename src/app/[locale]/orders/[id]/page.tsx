import React from "react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

import ORderDetailITem from "@/components/orders/ORderDetailITem";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <div>Invalid product ID.</div>;
  }

  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !order) {
    notFound();
  }

  return <ORderDetailITem order={order} />;
}
