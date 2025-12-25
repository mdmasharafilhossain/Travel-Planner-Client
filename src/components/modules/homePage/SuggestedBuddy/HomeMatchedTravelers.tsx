/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { API_BASE } from "@/lib/baseApi";
import { MatchedPlan, MatchesByPlan } from "@/types/matches.interface";






export default function HomeMatchedTravelers() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<MatchedPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchMatches();
  }, [user]);

  async function fetchMatches() {
    try {
      const res = await fetch(`${API_BASE}/api/dashboard/user`, {
        credentials: "include",
      });
      const json = await res.json();

      if (!json.success) return;

      const matchesByPlan: MatchesByPlan = json.matchesByPlan || {};

     
      const uniqueMap = new Map<string, MatchedPlan>();

      Object.values(matchesByPlan).forEach((plans) => {
        plans.forEach((plan) => {
          if (!uniqueMap.has(plan.host.id)) {
            uniqueMap.set(plan.host.id, plan);
          }
        });
      });

      setMatches(Array.from(uniqueMap.values()).slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  if (!user) return null;


  if (loading) return null;

  return (
    <section className="py-20 bg-white border-t">
  <div className="container mx-auto px-6">

    {/* Centered Title */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Recommended Travel Buddies
      </h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        Travelers who match your destination, interests, and travel style
      </p>
    </div>

    {matches.length === 0 ? (
      /* Empty State */
      <div
        className="flex flex-col items-center justify-center text-center 
                   py-16 border rounded-2xl bg-gray-50"
      >
        <p className="text-gray-600 text-sm mb-6">
          No travel buddies matched yet.
        </p>

        <Link
          href="/explore"
          className="px-6 py-3 rounded-lg bg-orange-500 text-white 
                     text-sm font-semibold hover:bg-orange-600 transition"
        >
          🔍 Search Travel Buddy
        </Link>
      </div>
    ) : (
      /* Cards */
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches.slice(0, 3).map((plan) => (
          <div
            key={plan.host.id}
            className="group bg-gray-50 border rounded-2xl p-6 
                       hover:-translate-y-1 hover:shadow-xl 
                       transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <Image
                src={
                  plan.host.profileImage ||
                  "https://i.ibb.co.com/jvLMWbX0/image.png"
                }
                width={48}
                height={48}
                className="rounded-full object-cover ring-2 ring-orange-100"
                alt={plan.host.fullName || "Traveler"}
              />

              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {plan.host.fullName || "Traveler"}
                  {plan.host.isVerifiedBadge && (
                    <span className="text-xs px-2 py-0.5 
                                     bg-green-100 text-green-700 rounded-full">
                      Verified
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-500">
                  Destination: {plan.destination}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 text-sm text-gray-600">
              Travel Type:{" "}
              <span className="font-semibold text-gray-800">
                {plan.travelType}
              </span>
            </div>

            {/* CTA */}
            <Link
              href={`/travel-plans/${plan.id}`}
              className="inline-flex items-center justify-center mt-6 
                         w-full text-sm font-semibold px-4 py-3 
                         rounded-lg bg-orange-500 text-white 
                         hover:bg-orange-600 transition"
            >
              View Plan →
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
</section>

  );
}
