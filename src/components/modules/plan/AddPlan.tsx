/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PlansAPI } from "../../../lib/api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import PlanForm from "./PlanForm";

export default function AddPlan() {
  const router = useRouter();

  async function onSubmit(data: any) {
    try {
      await PlansAPI.create({ ...data, budgetMin: Number(data.budgetMin || 0), budgetMax: Number(data.budgetMax || 0) });
      Swal.fire("Saved", "Plan created", "success");
      router.push("/travel-plans");
    } catch (err: any) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  }

  return (
    
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-orange-500 to-orange-700 text-transparent bg-clip-text">
  Create Travel Plan
</h2>

        <PlanForm onSubmit={onSubmit} />
      </div>
  );
}
