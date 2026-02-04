/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";


import { PlansAPI } from "@/lib/api";
import { TravelFormProps } from "@/types/travelPlan.interface";
import { UpdatePlanFormType, updatePlanSchema } from "@/zod/plan/plan.validator";

export default function PlanFormAdmin({ plan, onCancel, onSaved }: TravelFormProps) {
 
  const defaultValues: UpdatePlanFormType = {
    title: (plan.title ?? "") as UpdatePlanFormType["title"],
    destination: (plan.destination ?? "") as UpdatePlanFormType["destination"],
    startDate: plan.startDate ? plan.startDate.slice(0, 10) : "",
    endDate: plan.endDate ? plan.endDate.slice(0, 10) : "",
    
    budgetMin:
      plan.budgetMin !== null && plan.budgetMin !== undefined
        ? String(plan.budgetMin)
        : "",
    budgetMax:
      plan.budgetMax !== null && plan.budgetMax !== undefined
        ? String(plan.budgetMax)
        : "",
    
    travelType: (plan.travelType as UpdatePlanFormType["travelType"]) ?? "SOLO",
    description: (plan.description ?? "") as UpdatePlanFormType["description"],
    visibility: (plan.visibility as UpdatePlanFormType["visibility"]) ?? "PUBLIC",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdatePlanFormType>({
    resolver: zodResolver(updatePlanSchema),
    defaultValues,
  });


  const onSubmit: SubmitHandler<UpdatePlanFormType> = async (values) => {
    try {
      const payload: any = {
        ...values,
        
        budgetMin: values.budgetMin === "" ? undefined : Number(values.budgetMin),
        budgetMax: values.budgetMax === "" ? undefined : Number(values.budgetMax),
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
      // console.error(err);
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
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 md:p-5">

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Edit Plan: {plan.title || plan.destination}
      </h2>

      <button
        onClick={onCancel}
        className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        Cancel
      </button>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">

      {/* Grid 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Title */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>

          <input
            type="text"
            placeholder="Trip to Cox’s Bazar"
            {...register("title")}
            className={`w-full rounded-md px-3 py-2 border
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-1 focus:ring-orange-400
              ${
                errors.title
                  ? "border-red-300"
                  : "border-gray-300 dark:border-gray-600"
              }`}
          />

          {errors.title && (
            <p className="text-red-500 text-xs mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Destination */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Destination
          </label>

          <input
            type="text"
            {...register("destination")}
            placeholder="Cox’s Bazar, Bangladesh"
            className={`w-full rounded-md px-3 py-2 border
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-1 focus:ring-orange-400
              ${
                errors.destination
                  ? "border-red-300"
                  : "border-gray-300 dark:border-gray-600"
              }`}
          />

          {errors.destination && (
            <p className="text-red-500 text-xs mt-1">
              {errors.destination.message}
            </p>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Start */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>

          <input
            type="date"
            {...register("startDate")}
            className={`w-full rounded-md px-3 py-2 border
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-1 focus:ring-orange-400
              ${
                errors.startDate
                  ? "border-red-300"
                  : "border-gray-300 dark:border-gray-600"
              }`}
          />

          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* End */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>

          <input
            type="date"
            {...register("endDate")}
            className={`w-full rounded-md px-3 py-2 border
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-1 focus:ring-orange-400
              ${
                errors.endDate
                  ? "border-red-300"
                  : "border-gray-300 dark:border-gray-600"
              }`}
          />

          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      {/* Selects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Travel Type */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Travel Type
          </label>

          <select
            {...register("travelType")}
            className="w-full rounded-md px-3 py-2 border
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-1 focus:ring-orange-400"
          >
            <option value="SOLO">Solo</option>
            <option value="FAMILY">Family</option>
            <option value="FRIENDS">Friends</option>
            <option value="COUPLE">Couple</option>
            <option value="GROUP">Group</option>
          </select>
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Visibility
          </label>

          <select
            {...register("visibility")}
            className="w-full rounded-md px-3 py-2 border
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-1 focus:ring-orange-400"
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>

        <textarea
          rows={3}
          {...register("description")}
          placeholder="Short description about your travel plan..."
          className={`w-full rounded-md px-3 py-2 border
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-1 focus:ring-orange-400
            ${
              errors.description
                ? "border-red-300"
                : "border-gray-300 dark:border-gray-600"
            }`}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-2">

        <button
          type="button"
          onClick={onCancel}
          className="
            px-4 py-2 text-xs md:text-sm
            border border-gray-300 dark:border-gray-600
            rounded-md
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-800
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            px-4 py-2 text-xs md:text-sm
            bg-orange-400 hover:bg-orange-500
            text-white
            rounded-md shadow
            disabled:opacity-60
          "
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </form>
  </div>
);

}
