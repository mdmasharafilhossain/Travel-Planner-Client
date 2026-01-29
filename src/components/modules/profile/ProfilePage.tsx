/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import Image from "next/image";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { AuthAPI } from "@/lib/api";

export default function ProfilePage() {
  const { user, loading, setUser } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin h-8 w-8 border-4 border-orange-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  const u = user;

  async function handleProfileUpdated(updated: any) {
    if (!updated) return;

    try {
      const res = await AuthAPI.me();
      const fresh = res.data?.data || res.data?.user || res.data || null;

      if (fresh) {
        setUser(fresh as any);
        return;
      }
    } catch (err) {
      try {
        const safe = { ...(user || {}) };

        for (const k of Object.keys(updated)) {
          const val = (updated as any)[k];

          if (val === null) {
            (safe as any)[k] = val;
          } else if (typeof val === "object") {
            try {
              (safe as any)[k] = JSON.parse(JSON.stringify(val));
            } catch {}
          } else {
            (safe as any)[k] = val;
          }
        }

        setUser(safe as any);
        return;
      } catch {}
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="p-6 sm:flex sm:items-start sm:gap-6">

          {/* Avatar */}
          <div className="shrink-0">
            {u?.profileImage ? (
              <Image
                src={u.profileImage}
                alt={u.fullName || u.email}
                width={112}
                height={112}
                className="rounded-full object-cover border border-gray-200 dark:border-gray-600"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold border border-orange-200">
                {u?.fullName
                  ? String(u.fullName).charAt(0).toUpperCase()
                  : "U"}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-4 sm:mt-0 flex-1">

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {u?.fullName || "Unnamed User"}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {u?.email}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">

                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium border border-gray-200 dark:border-gray-600">
                    Role: {u?.role ?? "USER"}
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                      u?.isPremium
                        ? "bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
                        : "bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {u?.isPremium ? "Premium" : "Free"}
                  </span>

                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => setEditOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-linear-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition"
                >
                  Edit profile
                </button>

                <button
                  onClick={() => setPwdOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:shadow-sm transition"
                >
                  Change password
                </button>

              </div>
            </div>

            {/* Location + Date */}
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">

              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Current location
                </div>
                <div className="mt-1">
                  {u?.currentLocation ?? "—"}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Member since
                </div>
                <div className="mt-1">
                  {u?.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "—"}
                </div>
              </div>

            </div>

            {/* Bio */}
            <div className="mt-4">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Bio
              </div>
              <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {u?.bio ?? (
                  <span className="text-gray-500 dark:text-gray-400">
                    No bio provided.
                  </span>
                )}
              </div>
            </div>

            {/* Interests */}
            <div className="mt-4">

              <div className="text-xs text-gray-500 dark:text-gray-400">
                Travel interests
              </div>

              <div className="mt-2 flex flex-wrap gap-2">

                {Array.isArray(u?.travelInterests) &&
                u.travelInterests.length > 0 ? (
                  u.travelInterests.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">—</span>
                )}

              </div>
            </div>

            {/* Countries */}
            <div className="mt-4">

              <div className="text-xs text-gray-500 dark:text-gray-400">
                Visited countries
              </div>

              <div className="mt-2 flex flex-wrap gap-2">

                {Array.isArray(u?.visitedCountries) &&
                u.visitedCountries.length > 0 ? (
                  u.visitedCountries.map((c: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">—</span>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated:{" "}
            {u?.updatedAt
              ? new Date(u.updatedAt).toLocaleString()
              : "—"}
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setEditOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <ProfileForm
                defaultValues={u}
                onSuccess={(updated) => {
                  handleProfileUpdated(updated);
                  setEditOpen(false);
                }}
                onCancel={() => setEditOpen(false)}
              />
            </div>
          </div>

        </div>
      )}

      {/* Password Modal */}
      {pwdOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPwdOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <ChangePasswordForm
                userId={u?.id}
                onSuccess={() => {
                  Swal.fire("Success", "Password changed", "success");
                  setPwdOpen(false);
                }}
                onCancel={() => setPwdOpen(false)}
              />
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
