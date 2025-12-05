/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PlanForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlanSchema, PlanFormType } from "@/zod/plan/plan.validator";
import ShareInput from "../InputHandler/ShareInput";





export default function PlanForm({ defaultValues, onSubmit }: { defaultValues?: any; onSubmit: (d: PlanFormType) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors } } = useForm<PlanFormType>({ resolver: zodResolver(createPlanSchema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 bg-white p-4 rounded shadow">
      <ShareInput label="Title" register={register("title")} error={errors.title?.message as any} />
      <ShareInput label="Destination" register={register("destination")} error={errors.destination?.message as any} />
      <div className="grid grid-cols-2 gap-3">
        <ShareInput label="Start Date" type="date" register={register("startDate")} error={errors.startDate?.message as any} />
        <ShareInput label="End Date" type="date" register={register("endDate")} error={errors.endDate?.message as any} />
      </div>
      <div>
        <label className="block text-sm mb-1">Travel Type</label>
        <select {...register("travelType")} className="w-full border p-2 rounded">
          <option value="SOLO">Solo</option>
          <option value="FAMILY">Family</option>
          <option value="FRIENDS">Friends</option>
          <option value="COUPLE">Couple</option>
          <option value="GROUP">Group</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea {...register("description")} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm mb-1">Budget Min</label>
        <input {...register("budgetMin")} type="number" className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm mb-1">Budget Max</label>
        <input {...register("budgetMax")} type="number" className="w-full border p-2 rounded" />
      </div>
      <button className="py-2 px-4 bg-indigo-600 text-white rounded">Save Plan</button>
    </form>
  );
}
