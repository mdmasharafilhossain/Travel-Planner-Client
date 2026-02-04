/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/shared/Loader";
import { API_BASE } from "@/lib/baseApi";
import { MatchesTravelPlan } from "@/types/matches.interface";

export default function MatchesPage() {
  const { user } = useAuth();

  const [upcomingPlans, setUpcomingPlans] = useState<MatchesTravelPlan[]>([]);
  const [matchesByPlan, setMatchesByPlan] = useState<Record<string, MatchesTravelPlan[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchMatches();
  }, [user]);

  async function fetchMatches() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/dashboard/user`, {
        credentials: "include",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setUpcomingPlans(json.upcomingPlans || []);
        setMatchesByPlan(json.matchesByPlan || {});
      }
    } catch (err) {
      // ignore
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
            Please login to view matched travelers.
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
            Matched Travelers
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            See travelers whose plans match your upcoming trips.
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
          <p className="text-gray-700 dark:text-gray-300">
            Loading matches...
          </p>
        </div>
      ) : upcomingPlans.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You have no upcoming plans to match with others.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {upcomingPlans.map((plan) => {
            const matches: MatchesTravelPlan[] =
              (matchesByPlan[plan.id] || []) as any;

            return (
              <div
                key={plan.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      For your plan: {plan.title || plan.destination}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(plan.startDate).toLocaleDateString()} -{" "}
                      {new Date(plan.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  <Link
                    href={`/travel-plans/${plan.id}`}
                    className="text-xs px-3 py-1 rounded-md bg-orange-500 text-white hover:bg-orange-600"
                  >
                    View My Plan
                  </Link>
                </div>

                {matches.length === 0 ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    No matching travelers found for this plan yet.
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">

                    {matches.map((m) => (
                      <div
                        key={m.id}
                        className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900 flex gap-3 items-start"
                      >
                        <Image
                          width={80}
                          height={80}
                          src={
                            m.host.profileImage ||
                            "https://i.ibb.co.com/jvLMWbX0/image.png"
                          }
                          className="w-10 h-10 rounded-full object-cover"
                          alt={m.host.fullName || "Traveler"}
                        />

                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {m.host.fullName || "Traveler"}
                            </div>

                            {m.host.isVerifiedBadge && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-100 dark:border-blue-700">
                                Verified
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {m.title || m.destination}
                          </div>

                          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(m.startDate).toLocaleDateString()} -{" "}
                            {new Date(m.endDate).toLocaleDateString()}
                          </div>

                          <Link
                            href={`/travel-plans/${m.id}`}
                            className="mt-2 inline-block text-[11px] px-2 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                          >
                            View their plan
                          </Link>
                        </div>
                      </div>
                    ))}

                  </div>
                )}
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}
