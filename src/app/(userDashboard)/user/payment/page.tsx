/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { API_BASE } from "@/lib/baseApi";
import LoaderWrapper from "@/lib/LoaderWrapper";

export default function PaymentInitPage() {
  const { register, handleSubmit } = useForm<{
    plan: string;
    phone?: string;
    coupon?: string;
  }>();

  const router = useRouter();
  const { user } = useAuth();

  async function onSubmit(data: {
    plan: string;
    phone?: string;
    coupon?: string;
  }) {
    try {
      const res = await axios.post(
        `${API_BASE}/api/payments/init-subscription`,
        data,
        { withCredentials: true }
      );

      const { paymentUrl } = res.data.data;

      router.push(paymentUrl);
    } catch (err: any) {
      Swal.fire(
        "Payment init failed",
        err?.response?.data?.message || err.message,
        "error"
      );
    }
  }

  if (
    user?.premiumExpiresAt &&
    new Date(user.premiumExpiresAt) > new Date()
  ) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          You are already a{" "}
          <span className="font-bold text-orange-500">premium user!</span>
        </h2>

        <p className="text-gray-700 dark:text-gray-300">
          Your premium subscription is valid until{" "}
          <strong>
            {new Date(user.premiumExpiresAt).toLocaleDateString()}
          </strong>
          .
        </p>
      </div>
    );
  }

  return (
    <LoaderWrapper>
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700">

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Choose subscription
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <select
            {...register("plan")}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 rounded"
          >
            <option value="monthly">
              Monthly — BDT{" "}
              {process.env.NEXT_PUBLIC_PRICE_MONTHLY || "299"}
            </option>

            <option value="yearly">
              Yearly — BDT{" "}
              {process.env.NEXT_PUBLIC_PRICE_YEARLY || "2999"}
            </option>
          </select>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Phone (required for SSLCommerz)
            </label>

            <input
              {...register("phone")}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 rounded"
              placeholder="017xxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Coupon Code{" "}
              <span className="text-gray-400 dark:text-gray-500">
                (optional)
              </span>
            </label>

            <input
              {...register("coupon")}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 rounded"
              placeholder="TRAVEL10"
            />

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Use <strong>TRAVEL10</strong> to get 10% discount
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition"
          >
            Proceed to Payment
          </button>

        </form>
      </div>
    </LoaderWrapper>
  );
}
