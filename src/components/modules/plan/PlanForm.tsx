/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PlanForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlanSchema, PlanFormType } from "@/zod/plan/plan.validator";
import ShareInput from "../InputHandler/ShareInput";

export default function PlanForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: any;
  onSubmit: (d: PlanFormType) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormType>({
    resolver: zodResolver(createPlanSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Create / Edit Plan</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add plan details and set dates, budget and travel type.
          </p>
        </div>
      </div>

      {/* Basic fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShareInput
          label="Title"
          register={register("title")}
          error={errors.title?.message as any}
        />
        <ShareInput
          label="Destination"
          register={register("destination")}
          error={errors.destination?.message as any}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Start Date</label>
          <input
            {...register("startDate")}
            type="date"
            className={`w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
              errors.startDate ? "border-red-300" : "border-gray-200"
            }`}
          />
          {errors.startDate && (
            <p className="text-xs text-red-500 mt-1">{errors.startDate?.message as any}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">End Date</label>
          <input
            {...register("endDate")}
            type="date"
            className={`w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
              errors.endDate ? "border-red-300" : "border-gray-200"
            }`}
          />
          {errors.endDate && (
            <p className="text-xs text-red-500 mt-1">{errors.endDate?.message as any}</p>
          )}
        </div>
      </div>

      {/* Travel type & description */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Travel Type</label>
          <div className="inline-flex gap-2 flex-wrap">
            <select
              {...register("travelType")}
              className="rounded-lg border border-gray-200 p-2 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="SOLO">Solo</option>
              <option value="FAMILY">Family</option>
              <option value="FRIENDS">Friends</option>
              <option value="COUPLE">Couple</option>
              <option value="GROUP">Group</option>
            </select>
          </div>
          {errors.travelType && (
            <p className="text-xs text-red-500 mt-1">{errors.travelType?.message as any}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className={`w-full rounded-lg border p-3 resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
              errors.description ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="Short description about this plan..."
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description?.message as any}</p>
          )}
        </div>
      </div>

      {/* Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Budget Min (BDT)</label>
          <input
            {...register("budgetMin")}
            type="number"
            className={`w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
              errors.budgetMin ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="0"
          />
          {errors.budgetMin && (
            <p className="text-xs text-red-500 mt-1">{errors.budgetMin?.message as any}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Budget Max (BDT)</label>
          <input
            {...register("budgetMax")}
            type="number"
            className={`w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
              errors.budgetMax ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="0"
          />
          {errors.budgetMax && (
            <p className="text-xs text-red-500 mt-1">{errors.budgetMax?.message as any}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Tip:</span> Keep dates and budget realistic.
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center gap-3 rounded-md px-4 py-2 text-white font-medium transition ${
            isSubmitting
              ? "bg-orange-400 cursor-wait"
              : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="3" className="opacity-20"></circle>
                <path d="M22 12a10 10 0 00-10-10" strokeWidth="3" className="opacity-100"></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Plan</span>
          )}
        </button>
      </div>
    </form>
  );
}
