/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import { API_BASE } from "@/lib/baseApi";
import LoaderWrapper from "@/lib/LoaderWrapper";
import { ReviewPage } from "@/types/review.interface";

export default function AdminReviewPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "ADMIN") fetchReviews();
  }, [user]);

  async function fetchReviews() {
    try {
      const res = await fetch(`${API_BASE}/api/reviews/admin/all`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) setReviews(json.reviews);
    } catch (err) {
      // console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirm = await Swal.fire({
      title: "Delete review?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d1d5db",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE}/api/reviews/admin/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();

      if (json.success) {
        Swal.fire("Deleted", "Review removed successfully", "success");
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      // console.error(err);
    }
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="max-w-md mx-auto px-4 py-16 dark:bg-gray-900">
        <div className="rounded-xl border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/40 p-4 text-sm text-red-700 dark:text-red-300">
          Admin access only. Please login with an admin account.
        </div>
      </div>
    );
  }

  return (
    <LoaderWrapper>
      <div className="container mx-auto px-4 py-10 dark:bg-gray-900">

    
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Review Management
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage user reviews and remove inappropriate content.
          </p>
        </div>

      
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

       
          <div className="hidden md:block overflow-x-auto">

            <table className="min-w-full text-sm">

              <thead className="bg-orange-300 dark:bg-orange-900/40 text-gray-700 dark:text-gray-200 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Author</th>
                  <th className="px-6 py-3 text-left">Target</th>
                  <th className="px-6 py-3 text-left">Rating</th>
                  <th className="px-6 py-3 text-left">Comment</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">

                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      <div className="animate-spin h-6 w-6 border-4 border-orange-500 dark:border-orange-400 border-t-transparent rounded-full mx-auto" />
                    </td>
                  </tr>
                ) : reviews.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-gray-500 dark:text-gray-400"
                    >
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >

                      <td className="px-6 py-3 text-xs text-gray-800 dark:text-gray-200">
                        {r.author.fullName || r.author.email}
                      </td>

                      <td className="px-6 py-3 text-xs text-gray-800 dark:text-gray-200">
                        {r.target.fullName || r.target.email}
                      </td>

                      <td className="px-6 py-3 font-semibold text-orange-600 dark:text-orange-400">
                        {r.rating} ★
                      </td>

                      <td className="px-6 py-3 text-xs text-gray-700 dark:text-gray-300 max-w-xs truncate">
                        {r.comment || "—"}
                      </td>

                      <td className="px-6 py-3 text-xs text-gray-600 dark:text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden p-4 space-y-4">

            {loading ? (
              <div className="text-center py-6">
                <div className="animate-spin h-6 w-6 border-4 border-orange-500 dark:border-orange-400 border-t-transparent rounded-full mx-auto" />
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                No reviews found.
              </p>
            ) : (
              reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 shadow-sm"
                >

                  <div className="flex justify-between mb-2">

                    <div>
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {r.author.fullName || r.author.email}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        → {r.target.fullName || r.target.email}
                      </p>
                    </div>

                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      {r.rating} ★
                    </span>

                  </div>

                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                    {r.comment || "No comment"}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => handleDelete(r.id)}
                      className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </LoaderWrapper>
  );
}
