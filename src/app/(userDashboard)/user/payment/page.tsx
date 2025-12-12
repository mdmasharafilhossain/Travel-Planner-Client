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
  const { register, handleSubmit } = useForm<{ plan: string; phone?: string }>();
  const router = useRouter();
const {user} = useAuth();
  async function onSubmit(data: { plan: string; phone?: string }) {
    try {
      const res = await axios.post(`${API_BASE}/api/payments/init-subscription`, data, { withCredentials: true });
      const { paymentUrl } = res.data.data;
      
      router.push(paymentUrl) ;
    } catch (err: any) {
      Swal.fire("Payment init failed", err?.response?.data?.message || err.message, "error");
    }
  }

  if(user?.premiumExpiresAt && new Date(user.premiumExpiresAt) > new Date()){
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center">
        <h2 className="text-xl font-semibold mb-4">You are already a premium user!</h2>
        <p>Your premium subscription is valid until <strong>{new Date(user.premiumExpiresAt).toLocaleDateString()}</strong>.</p>
      </div>
    );
  }

  return (
    <LoaderWrapper>
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Choose subscription</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <select {...register("plan")} className="w-full border p-2 rounded">
          <option value="monthly">Monthly — BDT {process.env.NEXT_PUBLIC_PRICE_MONTHLY || "299"}</option>
          <option value="yearly">Yearly — BDT {process.env.NEXT_PUBLIC_PRICE_YEARLY || "2999"}</option>
          
        </select>

        <div>
          <label className="block text-sm">Phone (required for SSLCommerz)</label>
          <input {...register("phone")} className="w-full border p-2 rounded" placeholder="017xxxxxxxx" />
        </div>

        <button type="submit" className="w-full py-2 bg-orange-500 text-white rounded">Proceed to Payment</button>
      </form>
    </div>
    </LoaderWrapper>
  );

}
