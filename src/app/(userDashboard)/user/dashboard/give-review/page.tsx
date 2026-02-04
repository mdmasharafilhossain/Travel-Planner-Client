/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE } from "@/lib/baseApi";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/shared/Loader";
import { ReviewTravelPlan } from "@/types/review.interface";

export default function GiveReviewPage() {
  const { user } = useAuth();
  
  const [trips, setTrips] = useState<ReviewTravelPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchReviewable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchReviewable() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/dashboard/user`, {
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setTrips([]);
      } else {
        setTrips(json.reviewableTrips || []);
      }
    } catch (err) {
      setTrips([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Please login to see your reviewable trips.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 space-y-4 bg-gray-100 dark:bg-gray-900 min-h-screen">

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Give Review
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            These are trips where you were accepted and the tour is completed.
          </p>
        </div>

        <Link
          href="/user/dashboard"
          className="text-xs px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No completed trips pending review.
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {trips.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {p.title || p.destination}
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(p.startDate).toLocaleDateString()} -{" "}
                  {new Date(p.endDate).toLocaleDateString()}
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Host: {p.host?.fullName || "Host"}
                </div>
              </div>

              <Link
                href={`/travel-plans/${p.id}`}
                className="text-xs px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Go & Give Review
              </Link>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
