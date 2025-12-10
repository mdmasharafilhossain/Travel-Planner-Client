/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import { API_BASE } from "@/lib/baseApi";



type Review = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  author: {
    fullName?: string;
    email?: string;
  };
  target: {
    fullName?: string;
    email?: string;
  };
};

export default function AdminReviewPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
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
      console.error(err);
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
      console.error(err);
    }
  }

  if (!user || user.role !== "ADMIN") {
    return <p className="text-red-600">Admin access only</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Review Management</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2">Author</th>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Rating</th>
              <th className="px-3 py-2">Comment</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No reviews found
                </td>
              </tr>
            ) : (
              reviews.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2 text-xs">
                    {r.author.fullName || r.author.email}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {r.target.fullName || r.target.email}
                  </td>
                  <td className="px-3 py-2 font-semibold">
                    {r.rating} ★
                  </td>
                  <td className="px-3 py-2 text-xs max-w-xs truncate">
                    {r.comment || "-"}
                  </td>
                  <td className="px-3 py-2 text-xs">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
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
    </div>
  );
}
