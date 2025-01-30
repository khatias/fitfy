import React from "react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { FaShoppingCart, FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { Link } from "@/i18n/routing";
interface Params {
    id: string;
  }
export default async function OrderDetailsPage({
    params,
}: {
  params: Promise<Params>;
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

  return (
    <div >
      <div >
        <h1 >
          Order Details
        </h1>

        <div className="space-y-6">
          <div >
            <FaShoppingCart
        
              size={30}
            />
            <div>
              <h2 >
                {order.name}
              </h2>
              <p >
                Ordered on: {new Date(order?.created_at).toLocaleDateString()}
              </p>
              <p >
                ${(order.price / 100).toFixed(2)}
              </p>
            </div>
          </div>

          <div >
            <FaCreditCard
              className="text-gray-600 dark:text-gray-400"
              size={30}
            />
            <div>
              <h3 >
                Payment Information
              </h3>
              <p >
                Payment ID:{" "}
                <span >
                  {order.payment_id}
                </span>
              </p>
              <p >
                Stripe Price ID:
                <span >
                  {order.stripe_price_id}
                </span>
              </p>
            </div>
          </div>

          <div >
            <Link
              href="/orders"
            >
              <FaCheckCircle className="inline-block mr-2" size={16} />
              Back to My Orders
            </Link>

            <Link
              href="/"
            >
              <FaCheckCircle className="inline-block mr-2" size={16} />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
