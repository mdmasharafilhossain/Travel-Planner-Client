/* eslint-disable @typescript-eslint/no-explicit-any */
// app/payment/init/page.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function PaymentInitPage() {
  const { register, handleSubmit } = useForm<{ plan: string; phone?: string }>();
  const router = useRouter();

  async function onSubmit(data: { plan: string; phone?: string }) {
    try {
      const res = await axios.post(`${API}/api/payments/init-subscription`, data, { withCredentials: true });
      const { paymentUrl } = res.data.data;
      // Redirect user to payment gateway
      router.push(paymentUrl) ;
    } catch (err: any) {
      Swal.fire("Payment init failed", err?.response?.data?.message || err.message, "error");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Choose subscription</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <select {...register("plan")} className="w-full border p-2 rounded">
          <option value="monthly">Monthly — BDT {process.env.NEXT_PUBLIC_PRICE_MONTHLY || "299"}</option>
          <option value="yearly">Yearly — BDT {process.env.NEXT_PUBLIC_PRICE_YEARLY || "2999"}</option>
          <option value="verified_badge">Verified Badge — BDT {process.env.NEXT_PUBLIC_PRICE_VERIFIED_BADGE || "199"}</option>
        </select>

        <div>
          <label className="block text-sm">Phone (required for SSLCommerz)</label>
          <input {...register("phone")} className="w-full border p-2 rounded" placeholder="017xxxxxxxx" />
        </div>

        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Proceed to Payment</button>
      </form>
    </div>
  );
}
