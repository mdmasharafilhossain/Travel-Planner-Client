/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { z } from "zod";
import { UserAPI } from "@/lib/api";
import Swal from "sweetalert2";
import { updateUserSchema, UpdateUserType } from "@/zod/profile.validator";
import { PhotoUpload } from "@/components/shared/PhotoUpload/PhotoUpload";



export default function ProfileForm({
  defaultValues,
  onSuccess,
  onCancel,
}: {
  defaultValues?: any;
  onSuccess: (updated: any) => void;
  onCancel?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      bio: defaultValues?.bio ?? "",
      profileImage: defaultValues?.profileImage ?? "",
      travelInterests: defaultValues?.travelInterests ?? [],
      visitedCountries: defaultValues?.visitedCountries ?? [],
      currentLocation: defaultValues?.currentLocation ?? "",
    },
  });

  async function onSubmit(data: UpdateUserType) {
    if (!defaultValues?.id) {
      Swal.fire("Error", "No user id available", "error");
      return;
    }

 let profileImageUrl = "";

if (data.profileImage && data.profileImage.length > 0) {
  const uploadResponse = await PhotoUpload(data.profileImage[0]);
  profileImageUrl = uploadResponse?.data?.display_url ;
}
    // Convert comma-separated strings into arrays if user passed strings
    const payload: any = { ...data, profileImage:profileImageUrl };

    // If fields are strings (user may have typed comma-separated), normalize to arrays
    if (typeof (payload.travelInterests as any) === "string") {
      payload.travelInterests = (payload.travelInterests as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (typeof (payload.visitedCountries as any) === "string") {
      payload.visitedCountries = (payload.visitedCountries as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    try {
      const res = await UserAPI.updateProfile(defaultValues.id, payload);
      const updated = res.data?.data || res.data?.user || res.data ||  payload;
      Swal.fire({
        title: "Saved",
        text: "Profile updated successfully.",
        icon: "success",
        confirmButtonColor: "#f97316",
      });
      onSuccess(updated);
    } catch (err: any) {
      Swal.fire("Error", err?.response?.data?.message || err.message || "Failed to update profile", "error");
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Edit profile</h3>
          <p className="text-sm text-gray-500 mt-1">Update your name, bio and other public info.</p>
        </div>
        <button className="text-gray-500" onClick={() => onCancel?.()}>✕</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full name</label>
          <input {...register("fullName")} className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-orange-300" />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{String(errors.fullName.message)}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Profile image URL</label>
          <input  type="file" {...register("profileImage")} className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-orange-300" />
          {errors.profileImage && <p className="text-xs text-red-500 mt-1">{String(errors.profileImage.message)}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Current location</label>
          <input {...register("currentLocation")} className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-orange-300" />
          {errors.currentLocation && <p className="text-xs text-red-500 mt-1">{String(errors.currentLocation.message)}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Bio</label>
          <textarea {...register("bio")} rows={4} className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-orange-300" />
          {errors.bio && <p className="text-xs text-red-500 mt-1">{String(errors.bio.message)}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Travel interests (comma separated)</label>
          <input defaultValue={Array.isArray(defaultValues?.travelInterests) ? defaultValues.travelInterests.join(", ") : (defaultValues?.travelInterests || "")} {...register("travelInterests" as any)} className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="hiking, photography" />
          {errors.travelInterests && <p className="text-xs text-red-500 mt-1">{String(errors.travelInterests.message)}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Visited countries (comma separated)</label>
          <input defaultValue={Array.isArray(defaultValues?.visitedCountries) ? defaultValues.visitedCountries.join(", ") : (defaultValues?.visitedCountries || "")} {...register("visitedCountries" as any)} className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="Bangladesh, India" />
          {errors.visitedCountries && <p className="text-xs text-red-500 mt-1">{String(errors.visitedCountries.message)}</p>}
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button type="button" onClick={() => onCancel?.()} className="px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-linear-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition">
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
