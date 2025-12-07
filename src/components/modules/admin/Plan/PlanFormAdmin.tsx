/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { PlansAPI } from "@/lib/api";
import {TravelFormProps, TravelFormValues } from "@/types/travelPlan.interface";
import { useRouter } from "next/navigation";




export default function PlanFormAdmin({ plan, onCancel, onSaved }: TravelFormProps) {
  const router = useRouter();   
  const { register, handleSubmit, formState, reset } = useForm<TravelFormValues>({
    defaultValues: {
      title: plan.title || "",
      destination: plan.destination,
      startDate: plan.startDate.slice(0, 10),
      endDate: plan.endDate.slice(0, 10),
      budgetMin:
        plan.budgetMin !== null && plan.budgetMin !== undefined
          ? String(plan.budgetMin)
          : "",
      budgetMax:
        plan.budgetMax !== null && plan.budgetMax !== undefined
          ? String(plan.budgetMax)
          : "",
      travelType: plan.travelType,
      description: plan.description || "",
      visibility: plan.visibility,
    },
  });

  const onSubmit = async (values: TravelFormValues) => {
    try {
      const payload: any = {
        ...values,
        budgetMin:
          values.budgetMin === "" ? undefined : Number(values.budgetMin),
        budgetMax:
          values.budgetMax === "" ? undefined : Number(values.budgetMax),
      };

      const res = await PlansAPI.update(plan.id, payload);
      const updated = res.data?.plan ?? res.data;

      await Swal.fire({
        icon: "success",
        title: "Updated",
        text: res.data?.message || "Plan updated successfully",
        confirmButtonColor: "#fb923c",
      });

      onSaved(updated);
       
      reset(values);
    } catch (err: any) {
      console.error(err);
      await Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update plan",
        confirmButtonColor: "#fb923c",
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Edit Plan: {plan.title || plan.destination}
        </h2>
        <button
          onClick={onCancel}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              {...register("destination")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              {...register("endDate")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Minimum Budget</label>
            <input
              type="number"
              {...register("budgetMin")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Maximum Budget</label>
            <input
              type="number"
              {...register("budgetMax")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Travel Type</label>
            <select
              {...register("travelType")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              <option value="SOLO">Solo</option>
              <option value="FAMILY">Family</option>
              <option value="FRIENDS">Friends</option>
              <option value="COUPLE">Couple</option>
              <option value="GROUP">Group</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Visibility</label>
            <select
              {...register("visibility")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            rows={3}
            {...register("description")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs md:text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="px-4 py-2 text-xs md:text-sm bg-orange-400 hover:bg-orange-500 text-white rounded-md shadow"
          >
            {formState.isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
